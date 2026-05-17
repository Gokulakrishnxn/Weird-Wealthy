export type ChatRole = "user" | "assistant";

export type ChatHistoryMessage = {
  role: ChatRole;
  content: string;
};

/** POST /api/chat — latest user turn (required) */
export type ChatRequestBody = {
  message: string;
  /** Prior turns for multi-turn context (optional) */
  history?: ChatHistoryMessage[];
};

/** POST /api/chat — assistant reply */
export type ChatResponseBody = {
  reply: string;
};

export type ChatErrorBody = {
  error: string;
};
