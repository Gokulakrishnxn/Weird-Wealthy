import { NextResponse } from "next/server";
import {
  buildRetrievalContext,
  getFeaturedPostHints,
} from "@/lib/chatbot/context";
import { MINTY_SYSTEM_PROMPT } from "@/lib/chatbot/minty-prompt";
import { getBotReply } from "@/lib/chatbot/responses";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const MAX_HISTORY = 12;

export async function POST(request: Request) {
  let body: { messages?: ChatMessage[] };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = (body.messages ?? []).filter(
    (m) =>
      m &&
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.trim()
  );

  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) {
    return NextResponse.json({ error: "No user message" }, { status: 400 });
  }

  const query = lastUser.content.trim();
  const retrieval = buildRetrievalContext(query);
  const contextBlock = retrieval
    ? retrieval
    : `## Sample articles on site\n${getFeaturedPostHints()}`;

  const systemWithContext = `${MINTY_SYSTEM_PROMPT}\n\n---\n${contextBlock}`;

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  if (!apiKey) {
    const fallback = getBotReply(query);
    return NextResponse.json({
      content: fallback.text,
      source: "fallback",
    });
  }

  const history = messages.slice(-MAX_HISTORY).map((m) => ({
    role: m.role,
    content: m.content,
  }));

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.65,
        max_tokens: 600,
        messages: [
          { role: "system", content: systemWithContext },
          ...history,
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("OpenAI error:", res.status, errText);
      const fallback = getBotReply(query);
      return NextResponse.json({
        content: fallback.text,
        source: "fallback",
      });
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };

    const content =
      data.choices?.[0]?.message?.content?.trim() ||
      getBotReply(query).text;

    return NextResponse.json({
      content,
      source: "openai",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    const fallback = getBotReply(query);
    return NextResponse.json({
      content: fallback.text,
      source: "fallback",
    });
  }
}
