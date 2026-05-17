export type BlogCategoryId =
  | "ai-news"
  | "ai-tips"
  | "finance"
  | "personal-branding"
  | "lifestyle";

export type CategoryMeta = {
  id: BlogCategoryId;
  path: string;
  label: string;
  title: string;
  description: string;
  tagline: string;
  image: string;
  /** CSS object-position for category banner */
  imagePosition?: string;
};

export const categories: Record<BlogCategoryId, CategoryMeta> = {
  "ai-news": {
    id: "ai-news",
    path: "/ai-news",
    label: "AI News",
    title: "The latest in AI, design, and digital craft",
    description:
      "Breaking ideas, tool releases, and thoughtful takes on where intelligent software is headed.",
    tagline: "Stay ahead of the curve without the hype cycle.",
    image: "https://storage.efferd.com/creative/beams.webp",
  },
  "ai-tips": {
    id: "ai-tips",
    path: "/ai-tips",
    label: "AI Tips",
    title: "Practical AI workflows for everyday builders",
    description:
      "Prompts, shortcuts, and tool stacks that help you ship faster with less friction.",
    tagline: "Actionable workflows you can use today.",
    image: "https://storage.efferd.com/creative/light-rays.webp",
  },
  finance: {
    id: "finance",
    path: "/finance",
    label: "Finance",
    title: "Money moves for creators and founders",
    description:
      "Wealth habits, investing lenses, and financial clarity for the long game.",
    tagline: "Build wealth with intention, not anxiety.",
    image: "https://storage.efferd.com/creative/hyperspeed.webp",
  },
  "personal-branding": {
    id: "personal-branding",
    path: "/personal-branding",
    label: "Personal Branding",
    title: "Stand out with a voice that compounds",
    description:
      "Positioning, storytelling, and distribution for a brand people remember.",
    tagline: "Your story is your moat.",
    image: "https://storage.efferd.com/creative/threads.webp",
  },
  lifestyle: {
    id: "lifestyle",
    path: "/lifestyle",
    label: "Lifestyle",
    title: "Design a life that fuels the work",
    description:
      "Routines, mindset, and balance for sustainable creative momentum.",
    tagline: "Sustainable energy beats burnout sprints.",
    image: "/lifestyle-banner.jpg",
    imagePosition: "center 40%",
  },
};

export const categoryList = Object.values(categories);

export function getCategory(id: BlogCategoryId): CategoryMeta {
  return categories[id];
}

export function getCategoryByPath(path: string): CategoryMeta | undefined {
  return categoryList.find((c) => c.path === path);
}
