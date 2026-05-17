import { categoryList } from "@/lib/blog/categories";
import { subscribeHref } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";
import { MINTY_NAME } from "@/lib/chatbot/minty-prompt";

export type BotReply = {
  text: string;
};

export const chatQuickReplies = [
  "What can you help with?",
  "Best AI articles?",
  "Subscribe to newsletter",
  "Topics you cover",
] as const;

export function getBotReply(input: string): BotReply {
  const q = input.toLowerCase().trim();

  if (!q) {
    return {
      text: "Shoot me a question—blog, startups, AI, money, or where to start on the site.",
    };
  }

  if (
    q.includes("newsletter") ||
    q.includes("subscribe") ||
    q.includes("email")
  ) {
    return {
      text: `One email a week on AI, finance, branding, and building wealth—no noise. Sign up at ${subscribeHref}.`,
    };
  }

  if (
    q.includes("about") ||
    q.includes("who are you") ||
    q.includes("what is weird") ||
    q.includes("mission") ||
    q.includes("minty")
  ) {
    return {
      text: `I'm ${MINTY_NAME}, the guide for ${siteConfig.name}—a journal for builders at the intersection of design, AI, money, and creative life. Practical stories, not hype. More at /about.`,
    };
  }

  if (q.includes("help") || q.includes("what can you")) {
    return {
      text: "I can explain topics we cover, suggest what to read, or help you navigate the site. Ask about AI, startups, money, branding, or productivity.",
    };
  }

  if (
    q.includes("blog") ||
    q.includes("stories") ||
    q.includes("articles") ||
    q.includes("read")
  ) {
    return {
      text: "The full archive lives at /blog—or tell me a topic and I'll narrow it down.",
    };
  }

  if (
    q.includes("topic") ||
    q.includes("cover") ||
    q.includes("categories") ||
    q.includes("sections")
  ) {
    return {
      text: `We publish across ${categoryList.map((c) => c.label).join(", ")}. Ask about any of those and I'll point you the right way.`,
    };
  }

  if (q.includes("ai")) {
    return {
      text: "AI news and practical tips—workflows, tools, and takes that aren't breathless hype. Check /ai-news and /ai-tips.",
    };
  }

  if (q.includes("finance") || q.includes("money") || q.includes("wealth")) {
    return {
      text: "Money habits, investing mindset, and building wealth with intention—not get-rich-quick stuff. See /finance.",
    };
  }

  if (q.includes("brand")) {
    return {
      text: "Personal branding for founders and creators—audience, trust, and showing up consistently. See /personal-branding.",
    };
  }

  if (q.includes("lifestyle") || q.includes("life")) {
    return {
      text: "Lifestyle design for sustainable creativity—energy, routines, and the life around your work. See /lifestyle.",
    };
  }

  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return {
      text: `Hey—I'm ${MINTY_NAME}. Ask me about the journal, topics, or where to start reading.`,
    };
  }

  if (q.includes("contact") || q.includes("hello@")) {
    return {
      text: `Email the team at ${siteConfig.email}. They actually read it.`,
    };
  }

  return {
    text: "Not sure on that one yet. Try asking about the blog, a topic, or the newsletter—or rephrase and I'll take another pass.",
  };
}

export const welcomeMessage: BotReply = {
  text: `Hey—I'm ${MINTY_NAME}, your guide to ${siteConfig.name}. Ask about startups, AI, money, productivity, or where to read on the site.`,
};
