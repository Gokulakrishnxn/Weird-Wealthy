import OpenAI from "openai";

export const GROQ_MODEL =
  process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";

const GROQ_BASE_URL = "https://api.groq.com/openai/v1";

export function getGroqClient(): OpenAI | null {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) return null;

  return new OpenAI({
    apiKey,
    baseURL: GROQ_BASE_URL,
  });
}
