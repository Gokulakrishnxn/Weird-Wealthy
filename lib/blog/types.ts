import type { BlogCategoryId } from "./categories";

export type BlogPost = {
  slug: string;
  category: BlogCategoryId;
  title: string;
  description: string;
  author: string;
  /** Optional override; defaults to generated portrait from author name */
  authorAvatar?: string;
  createdAt: string;
  readTime: string;
  image: string;
};
