import type { PostContent } from "@/lib/blog/post-content-types";
import { postContents } from "@/lib/blog/post-contents";

export function getPostContent(slug: string): PostContent | undefined {
  return postContents[slug];
}
