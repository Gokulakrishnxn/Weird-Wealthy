import type { Database } from "./types";

export type AuthorRow = Database["public"]["Tables"]["authors"]["Row"];

/** Fallback author profile when Supabase is not configured (local UI preview). */
export const PREVIEW_AUTHOR: AuthorRow = {
  id: "00000000-0000-0000-0000-000000000001",
  user_id: null,
  name: "Preview Author",
  slug: "preview-author",
  bio: "Local preview mode — connect Supabase to manage real author profiles.",
  avatar_url: null,
  twitter_url: null,
  linkedin_url: null,
  website_url: null,
  role: "author",
  is_active: true,
  created_at: "2025-01-01T00:00:00.000Z",
  updated_at: "2025-01-01T00:00:00.000Z",
};
