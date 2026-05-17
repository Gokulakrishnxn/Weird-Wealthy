import { getAuthorSlug } from "./authors";
import type { BlogCategoryId } from "./categories";
import type { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [
  {
    slug: "design-systems-that-scale",
    category: "ai-news",
    title: "Design Systems That Scale",
    description:
      "Learn how to build and maintain scalable design systems that empower teams to move faster while staying consistent.",
    image: "https://storage.efferd.com/creative/beams.webp",
    createdAt: "2025-08-25",
    author: "Ava Mitchell",
    readTime: "7 min read",
  },
  {
    slug: "psychology-of-color-in-ui",
    category: "ai-news",
    title: "The Psychology of Color in UI",
    description:
      "Explore how different colors influence user perception, emotion, and conversion in digital product design.",
    image: "https://storage.efferd.com/creative/plasma.webp",
    createdAt: "2025-07-14",
    author: "Liam Carter",
    readTime: "5 min read",
  },
  {
    slug: "designing-with-ai-tools",
    category: "ai-news",
    title: "Designing With AI Tools",
    description:
      "A practical look at how AI tools are shaping UI/UX workflows—from ideation to final delivery.",
    image: "https://storage.efferd.com/creative/light-rays.webp",
    createdAt: "2025-02-28",
    author: "Olivia Brooks",
    readTime: "8 min read",
  },
  {
    slug: "dark-mode-done-right",
    category: "ai-tips",
    title: "Dark Mode Done Right",
    description:
      "Tips and tricks to design beautiful and functional dark mode experiences that users will love.",
    image: "https://storage.efferd.com/creative/dark-veil.webp",
    createdAt: "2025-05-20",
    author: "Maya Chen",
    readTime: "4 min read",
  },
  {
    slug: "figma-hacks-for-power-users",
    category: "ai-tips",
    title: "Figma Hacks for Power Users",
    description:
      "Hidden features, shortcuts, and workflows in Figma that can dramatically speed up your design process.",
    image: "https://storage.efferd.com/creative/color-bends.webp",
    createdAt: "2025-03-09",
    author: "James Walker",
    readTime: "5 min read",
  },
  {
    slug: "future-of-ui-animation",
    category: "ai-tips",
    title: "The Future of UI Animation",
    description:
      "From motion guidelines to advanced prototyping—discover where UI animation is headed in 2025.",
    image: "https://storage.efferd.com/creative/hyperspeed.webp",
    createdAt: "2025-04-15",
    author: "Chloe Ramirez",
    readTime: "10 min read",
  },
  {
    slug: "designing-for-mobile-first",
    category: "ai-tips",
    title: "Designing for Mobile-First",
    description:
      "Best practices for mobile-first design, from layout decisions to performance optimization.",
    image: "https://storage.efferd.com/creative/floating-lines.webp",
    createdAt: "2025-03-22",
    author: "Isabella White",
    readTime: "7 min read",
  },
  {
    slug: "minimalism-vs-maximalism",
    category: "finance",
    title: "Minimalism vs Maximalism",
    description:
      "A deep dive into two opposing design philosophies and how to decide which fits your product.",
    image: "https://storage.efferd.com/creative/pixel-blast.webp",
    createdAt: "2025-04-01",
    author: "Benjamin Scott",
    readTime: "6 min read",
  },
  {
    slug: "microinteractions-that-delight",
    category: "finance",
    title: "Microinteractions That Delight",
    description:
      "Discover how subtle animations and interactions can enhance usability and bring joy to your users.",
    image: "https://storage.efferd.com/creative/ripple-grid.webp",
    createdAt: "2025-06-30",
    author: "Sophia Kim",
    readTime: "6 min read",
  },
  {
    slug: "typography-that-speaks",
    category: "personal-branding",
    title: "Typography That Speaks",
    description:
      "How to select and pair typefaces that enhance readability, hierarchy, and brand personality.",
    image: "https://storage.efferd.com/creative/threads.webp",
    createdAt: "2025-05-02",
    author: "Noah Patel",
    readTime: "9 min read",
  },
  {
    slug: "accessibility-beyond-compliance",
    category: "personal-branding",
    title: "Accessibility Beyond Compliance",
    description:
      "Practical steps to make your UI accessible, not just legally compliant, but genuinely inclusive for everyone.",
    image: "https://storage.efferd.com/creative/silk.webp",
    createdAt: "2025-06-18",
    author: "Ethan Rodriguez",
    readTime: "8 min read",
  },
  {
    slug: "the-art-of-prototyping",
    category: "lifestyle",
    title: "The Art of Prototyping",
    description:
      "How to create prototypes that effectively communicate your ideas and speed up stakeholder feedback.",
    image: "https://storage.efferd.com/creative/orb.webp",
    createdAt: "2025-02-14",
    author: "Daniel Green",
    readTime: "6 min read",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: BlogCategoryId): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getPostsByAuthorSlug(authorSlug: string): BlogPost[] {
  return blogPosts.filter(
    (post) => getAuthorSlug(post.author) === authorSlug
  );
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}

/** Slugs reserved for site routes — exclude from [slug] static generation conflicts */
export const reservedSlugs = [
  "ai-news",
  "ai-tips",
  "finance",
  "personal-branding",
  "lifestyle",
  "newsletter",
  "about",
  "blog",
];
