import { categoryList } from "@/lib/blog/categories";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const aboutFaqs = [
  {
    question: "What is Weird & Wealthy?",
    answer:
      "Weird & Wealthy is an independent digital journal for builders, designers, and founders. We publish practical stories at the intersection of design, artificial intelligence, personal finance, personal branding, and creative lifestyle—helping you turn unconventional ideas into lasting wealth and meaningful work.",
  },
  {
    question: "Who is Weird & Wealthy for?",
    answer:
      "Our readers are entrepreneurs, product designers, engineers, creators, and ambitious professionals who want clear thinking—not hype. If you care about AI tools, money habits, brand craft, and building a life that supports deep work, this journal is for you.",
  },
  {
    question: "What topics does Weird & Wealthy cover?",
    answer: `We publish in five core areas: ${categoryList.map((c) => c.label).join(", ")}. Every article is edited for clarity and actionable insight.`,
  },
  {
    question: "How often does Weird & Wealthy publish?",
    answer:
      "We release new stories regularly across the site and send one curated weekly newsletter with the best ideas on AI, finance, branding, and lifestyle—so you can stay informed without drowning in noise.",
  },
  {
    question: "How do I subscribe to Weird & Wealthy?",
    answer:
      "Visit our newsletter page to join the weekly email. It is free, focused, and easy to leave anytime. Subscribers get early access to standout stories and practical frameworks you can use immediately.",
  },
] as const;

export function getAboutPageJsonLd() {
  const aboutUrl = absoluteUrl("/about");

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      email: siteConfig.email,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
      sameAs: [],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      publisher: { "@id": `${siteConfig.url}/#organization` },
      inLanguage: siteConfig.language,
    },
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${aboutUrl}#webpage`,
      url: aboutUrl,
      name: `About ${siteConfig.name}`,
      description: siteConfig.description,
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      about: { "@id": `${siteConfig.url}/#organization` },
      inLanguage: siteConfig.language,
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://storage.efferd.com/creative/ripple-grid.webp",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: aboutUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: aboutFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];
}
