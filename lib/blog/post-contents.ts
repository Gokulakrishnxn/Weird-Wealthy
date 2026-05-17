import type { PostContent } from "@/lib/blog/post-content-types";
import { partA } from "@/lib/blog/content/part-a";
import { partB } from "@/lib/blog/content/part-b";

export const postContents: Record<string, PostContent> = {
  ...partA,
  ...partB,
};
