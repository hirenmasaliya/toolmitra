export type Tool = {
  slug: string; name: string; short: string; category: "Business" | "Everyday" | "Utilities";
  title: string; description: string; how: string[]; formula?: string;
  faq: { q: string; a: string }[]; related: string[];
};
