export type LinkItem = { href: string; label: string };

export type SpecRow = { label: string; value: string; note?: string };

export type ContentSection = {
  eyebrow?: string;
  title: string;
  body: string;
  bullets?: string[];
  links?: LinkItem[];
};

export type FaqItem = { question: string; answer: string };

export type SeoPage = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  primaryQuery: string;
  kind: "product" | "solution" | "service" | "technical" | "city" | "corporate" | "hub";
  index: boolean;
  accent?: "blue" | "cyan" | "orange";
  specs?: SpecRow[];
  sections: ContentSection[];
  faqs: FaqItem[];
  related: LinkItem[];
};
