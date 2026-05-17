export type PostBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "callout"; title?: string; text: string };

export type PostContent = PostBlock[];
