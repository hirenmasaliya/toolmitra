
import type { Metadata } from "next";
import SearchTools from "../components/SearchTools";
import {
  Briefcase,
  Calculator,
  Percent,
  Clock,
  CreditCard,
  QrCode,
  Image as ImageIcon,
  FileText,
  MousePointerClick,
  Cpu,
  CheckCircle2,
  Mail,
  ChevronDown,
  HeartPulse,
  Type,
  Code2,
  Wrench,
  ArrowRight,
} from "lucide-react";

import Link from "next/link";
import { tools as allTools, categories, SITE } from "@/app/lib/tools";

// Map categories to icons for the tool cards and search component.
const categoryIcons = {
  Business: Briefcase,
  Finance: CreditCard,
  Everyday: Calculator,
  Health: HeartPulse,
  Text: Type,
  Utilities: Wrench,
  Developer: Code2,
} as const;

// Adapt the shared Tool data to the existing SearchTools component.
const searchTools = allTools.map((tool) => {
  const Icon =
    categoryIcons[tool.category as keyof typeof categoryIcons] ??
    Calculator;

  return {
    name: tool.name,
    description: tool.short,
    href: `/tools/${tool.slug}`,
    category: tool.category,
    icon: <Icon className="h-6 w-6 text-blue-600" />,
  };
});

export const metadata: Metadata = {
  title: "All Free Online Tools & Calculators | ToolMitra",
  description:
    "Explore free online tools and calculators. Calculate GST, profit, EMI, SIP, FD interest, BMI and percentages. Convert text, generate QR codes and compress images.",
  keywords: [
    "free online tools",
    "GST calculator India",
    "profit margin calculator",
    "EMI calculator",
    "SIP calculator",
    "FD calculator",
    "percentage calculator",
    "unit converter",
    "QR code generator",
    "image compressor",
    "JSON formatter",
    "word counter",
  ],
  alternates: {
    canonical: `${SITE}/tools`,
  },
  openGraph: {
    title: "All Free Online Tools & Calculators | ToolMitra",
    description:
      "Free calculators and utilities for business, finance, everyday calculations, text and developer tasks.",
    url: `${SITE}/tools`,
    siteName: "ToolMitra",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE}/og-image-tools.jpg`,
        width: 1200,
        height: 630,
        alt: "ToolMitra free online tools and calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Tools & Calculators | ToolMitra",
    description:
      "Explore free calculators, converters and productivity tools on ToolMitra.",
    images: [`${SITE}/og-image-tools.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const faqs = [
  {
    q: "Are these tools free to use?",
    a: "Yes. ToolMitra provides free online calculators and utilities without requiring a paid subscription.",
  },
  {
    q: "Do I need to create an account?",
    a: "No account is required to use the tools that are available on ToolMitra.",
  },
  {
    q: "Is my data secure?",
    a: "Tools designed for browser-only processing can handle your input locally. Check each tool's functionality and privacy details to confirm how its data is processed.",
  },
  {
    q: "Which calculators are available?",
    a: "You can find GST, profit margin, discount, markup, EMI, SIP, FD, interest, percentage, age, date difference, unit conversion and BMI calculators, along with text, image, QR code and developer utilities.",
  },
  {
    q: "How do I find a specific tool?",
    a: "Search by tool name or browse the available categories to find the calculator or utility you need.",
  },
];

const steps = [
  {
    icon: MousePointerClick,
    title: "1. Choose a tool",
    desc: "Search all available calculators and utilities or browse by category.",
  },
  {
    icon: Cpu,
    title: "2. Enter your data",
    desc: "Enter values or select files according to the tool's instructions.",
  },
  {
    icon: CheckCircle2,
    title: "3. Get your result",
    desc: "View your calculation or generated output and use the available copy or download options.",
  },
];

export default function ToolsPage() {
  const categoryCounts = categories.map((category) => ({
    name: category,
    count: allTools.filter((tool) => tool.category === category).length,
  }));

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      {/* Hero and search */}
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 lg:pb-16 lg:pt-24">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-5 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            {allTools.length}+ useful online tools
          </span>

          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            All{" "}
            <span className="text-blue-600">
              Free Online Tools
            </span>
          </h1>

          <p className="text-lg leading-relaxed text-slate-600 sm:text-xl">
            Calculate, convert, create and simplify everyday tasks with
            free online tools for business, finance, health, text and
            development.
          </p>
        </div>

        <div className="relative z-10 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <SearchTools tools={searchTools} />
        </div>

        {/* Browse categories */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categoryCounts.map((category) => (
            <a
              key={category.name}
              href={`#category-${category.name.toLowerCase()}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
            >
              {category.name}
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">
                {category.count}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* All tools grouped by category */}
      <section className="border-y border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Explore All Tools
            </h2>
            <p className="mt-3 text-slate-600">
              Browse {allTools.length} tools across{" "}
              {categories.length} categories.
            </p>
          </div>

          <div className="space-y-14">
            {categoryCounts.map((category) => {
              const categoryTools = allTools.filter(
                (tool) => tool.category === category.name
              );

              if (categoryTools.length === 0) return null;

              const CategoryIcon =
                categoryIcons[
                  category.name as keyof typeof categoryIcons
                ] ?? Calculator;

              return (
                <section
                  key={category.name}
                  id={`category-${category.name.toLowerCase()}`}
                  className="scroll-mt-24"
                >
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <CategoryIcon className="h-5 w-5" />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                          {category.name} Tools
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {category.count}{" "}
                          {category.count === 1 ? "tool" : "tools"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {categoryTools.map((tool) => {
                      const Icon =
                        categoryIcons[
                          tool.category as keyof typeof categoryIcons
                        ] ?? Calculator;

                      return (
                        <Link
                          key={tool.slug}
                          href={`/tools/${tool.slug}`}
                          className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-950/5"
                        >
                          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                            <Icon className="h-6 w-6" />
                          </div>

                          <h4 className="font-bold text-slate-900 group-hover:text-blue-700">
                            {tool.name}
                          </h4>

                          <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                            {tool.short}
                          </p>

                          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                            Use tool
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              How ToolMitra Works
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Find a tool and get started in three simple steps.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.title}
                className="flex flex-col items-center rounded-2xl bg-white p-8 text-center ring-1 ring-slate-200 transition hover:shadow-md"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <step.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-slate-500">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition open:shadow-sm open:ring-blue-200"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180" />
                </summary>

                <p className="mt-4 pr-2 leading-relaxed text-slate-600">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-slate-900 px-6 py-12 text-center shadow-xl sm:px-16 sm:py-16">
          <div className="relative z-10">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-blue-300">
              <Mail className="h-6 w-6" />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Stay updated on new tools
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
              Discover new calculators and utilities as ToolMitra grows.
              Explore our collection whenever you need a quick answer.
            </p>

            <Link
              href="#category-business"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-500"
            >
              Explore tools
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
