import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { NextResponse } from "next/server";
import {
  buildRetrievalContext,
  getFeaturedPostHints,
} from "@/lib/chatbot/context";
import { getGroqClient, GROQ_MODEL } from "@/lib/chatbot/groq";
import { MINTY_SYSTEM_PROMPT } from "@/lib/chatbot/minty-prompt";
import { getBotReply } from "@/lib/chatbot/responses";
import type {
  ChatHistoryMessage,
  ChatRequestBody,
  ChatResponseBody,
} from "@/lib/chatbot/types";

export const runtime = "nodejs";

const MAX_HISTORY = 12;
const MAX_MESSAGE_LENGTH = 2000;

function isValidHistoryEntry(
  entry: unknown
): entry is ChatHistoryMessage {
  if (!entry || typeof entry !== "object") return false;
  const m = entry as ChatHistoryMessage;
  return (
    (m.role === "user" || m.role === "assistant") &&
    typeof m.content === "string" &&
    m.content.trim().length > 0
  );
}

function parseRequestBody(body: unknown): ChatRequestBody | null {
  if (!body || typeof body !== "object") return null;

  const { message, history } = body as ChatRequestBody;

  if (typeof message !== "string" || !message.trim()) return null;

  const parsedHistory = Array.isArray(history)
    ? history.filter(isValidHistoryEntry).slice(-MAX_HISTORY)
    : undefined;

  return {
    message: message.trim().slice(0, MAX_MESSAGE_LENGTH),
    history: parsedHistory,
  };
}

export async function POST(request: Request) {
  let rawBody: unknown;

  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const body = parseRequestBody(rawBody);
  if (!body) {
    return NextResponse.json(
      { error: "Request must include a non-empty message string" },
      { status: 400 }
    );
  }

  const { message, history = [] } = body;

  const retrieval = buildRetrievalContext(message);
  const contextBlock = retrieval
    ? retrieval
    : `## Sample articles on site\n${getFeaturedPostHints()}`;

  const systemWithContext = `${MINTY_SYSTEM_PROMPT}\n\n---\n${contextBlock}`;

  const groq = getGroqClient();

  if (!groq) {
    const fallback = getBotReply(message);
    return NextResponse.json<ChatResponseBody>({
      reply: fallback.text,
    });
  }

  const chatMessages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemWithContext },
    ...history.map((m) => ({
      role: m.role,
      content: m.content.trim().slice(0, MAX_MESSAGE_LENGTH),
    })),
    { role: "user", content: message },
  ];

  try {
    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: chatMessages,
      temperature: 0.65,
      max_tokens: 600,
    });

    const reply =
      completion.choices[0]?.message?.content?.trim() ||
      getBotReply(message).text;

    return NextResponse.json<ChatResponseBody>({ reply });
  } catch (error) {
    console.error("Groq API error:", error);
    const fallback = getBotReply(message);
    return NextResponse.json<ChatResponseBody>({
      reply: fallback.text,
    });
  }
}
