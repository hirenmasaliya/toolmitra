export type ToolCategory =
  | "Business"
  | "Finance"
  | "Everyday"
  | "Health"
  | "Text"
  | "Utilities"
  | "Developer";

export type Tool = {
  slug: string;
  name: string;
  short: string;
  category: ToolCategory;
  title: string;
  description: string;
  how: string[];
  formula?: string;
  example?: string; // worked example shown on the tool page
  tips?: string[]; // practical notes shown on the tool page
  faq: { q: string; a: string }[];
  related: string[];
};