"use client";

import React, { useState, useEffect } from "react";
import type { Metadata } from "next";
import Link from "next/link";
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
  Sparkles,
  Plus,
  Zap
} from "lucide-react";

import { tools as allTools, categories, SITE } from "@/app/lib/tools";

// --- CUSTOM 3D, GRID & GOOGLE MATERIAL ANIMATION STYLES ---
const styles = `
  @keyframes float {
    0% { transform: translateY(0px) rotateX(0deg) rotateY(0deg) scale(1); }
    50% { transform: translateY(-20px) rotateX(15deg) rotateY(15deg) scale(1.05); }
    100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg) scale(1); }
  }
  @keyframes float-reverse {
    0% { transform: translateY(0px) rotateX(0deg) rotateY(0deg) scale(1); }
    50% { transform: translateY(20px) rotateX(-15deg) rotateY(-15deg) scale(0.95); }
    100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg) scale(1); }
  }
  @keyframes float-icon {
    0% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-15px) rotate(10deg); }
    66% { transform: translateY(10px) rotate(-5deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-3d-float {
    animation: float 8s ease-in-out infinite;
    transform-style: preserve-3d;
  }
  .animate-3d-float-reverse {
    animation: float-reverse 10s ease-in-out infinite;
    transform-style: preserve-3d;
  }
  .animate-float-icon {
    animation: float-icon 12s ease-in-out infinite;
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }
  
  /* Pure White Background Grid Detail */
  .bg-dotted-grid {
    background-image: radial-gradient(#dadce0 1px, transparent 1px);
    background-size: 24px 24px;
  }

  /* Authentic Google Material Shadows */
  .google-shadow {
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
  }
  .google-shadow-md {
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 2px 6px 2px rgba(60,64,67,0.15);
  }
  .google-shadow-hover {
    box-shadow: 0 1px 3px 0 rgba(60,64,67,0.3), 0 4px 8px 3px rgba(60,64,67,0.15);
  }
  .google-shadow-floating {
    box-shadow: 0 8px 24px -4px rgba(60,64,67,0.15), 0 2px 6px 0 rgba(60,64,67,0.2);
  }
`;

// --- DATA & MAPPINGS ---
const categoryIcons = {
  Business: Briefcase,
  Finance: CreditCard,
  Everyday: Calculator,
  Health: HeartPulse,
  Text: Type,
  Utilities: Wrench,
  Developer: Code2,
} as const;

// Authentic Google Brand Colors for dynamic detailing
const googleColors = [
  { text: "text-[#1a73e8]", bg: "bg-[#e8f0fe]", border: "border-[#1a73e8]", hoverBorder: "hover:border-[#1a73e8]" }, // Blue
  { text: "text-[#ea4335]", bg: "bg-[#fce8e6]", border: "border-[#ea4335]", hoverBorder: "hover:border-[#ea4335]" }, // Red
  { text: "text-[#fbbc05]", bg: "bg-[#fef7e0]", border: "border-[#fbbc05]", hoverBorder: "hover:border-[#fbbc05]" }, // Yellow
  { text: "text-[#34a853]", bg: "bg-[#e6f4ea]", border: "border-[#34a853]", hoverBorder: "hover:border-[#34a853]" }, // Green
];

const searchTools = allTools.map((tool) => {
  const Icon = categoryIcons[tool.category as keyof typeof categoryIcons] ?? Calculator;
  return {
    name: tool.name,
    description: tool.short,
    href: `/tools/${tool.slug}`,
    category: tool.category,
    icon: <Icon className="h-6 w-6 text-[#1a73e8]" />,
  };
});

const faqs = [
  { q: "Are these tools free to use?", a: "Yes. ToolMitra provides free online calculators and utilities without requiring a paid subscription. No hidden fees or limits." },
  { q: "Do I need to create an account?", a: "No account is required. You can jump right in and start using the tools immediately without handing over personal information." },
  { q: "Is my data secure?", a: "Absolutely. Tools designed for browser-only processing handle your input locally. Your sensitive numbers and files never leave your device." },
  { q: "Which calculators are available?", a: "You can find GST, profit margin, discount, markup, EMI, SIP, FD, interest, percentage, age, date difference, unit conversion and BMI calculators, along with text, image, QR code and developer utilities." },
  { q: "How do I find a specific tool?", a: "Search by tool name in the global search bar, or browse the specific categories below to find exactly what you need." },
];

const steps = [
  { icon: MousePointerClick, title: "1. Choose a tool", desc: "Search all available calculators and utilities or browse by category.", colorIndex: 0 },
  { icon: Cpu, title: "2. Enter your data", desc: "Enter values or select files according to the tool's instructions.", colorIndex: 3 },
  { icon: CheckCircle2, title: "3. Get your result", desc: "View your calculation or generated output and use the available copy or download options.", colorIndex: 1 },
];

// --- COMPONENTS ---

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-[#dadce0] rounded-2xl mb-4 overflow-hidden bg-white transition-shadow duration-300 hover:google-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-[#f8f9fa]"
      >
        <span className="text-[1.1rem] font-medium text-[#202124]">{question}</span>
        <span className={`ml-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "bg-[#e8f0fe] text-[#1a73e8] rotate-45" : "bg-white border border-[#dadce0] text-[#5f6368]"}`}>
          <Plus className="h-5 w-5" />
        </span>
      </button>
      <div className={`transition-all duration-300 ease-in-out px-6 ${isOpen ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="h-px w-full bg-[#dadce0] mb-4 opacity-50"></div>
        <p className="text-[#5f6368] leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function ToolsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categoryCounts = categories.map((category) => ({
    name: category,
    count: allTools.filter((tool) => tool.category === category).length,
  }));

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-white font-sans text-[#202124] selection:bg-[#e8f0fe] selection:text-[#1a73e8] overflow-hidden">
      <style>{styles}</style>

      {/* --- HERO SECTION --- */}
      <section className="relative isolate overflow-hidden bg-white px-4 pb-16 pt-24 sm:px-6 lg:pb-24 lg:pt-32">
        {/* Detailed White Background Grid */}
        <div className="absolute inset-0 -z-20 bg-dotted-grid opacity-50"></div>

        {/* Abstract 3D Google-colored Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none flex justify-center">
          <div className="absolute top-[5%] left-[5%] w-40 h-40 rounded-full bg-gradient-to-tr from-[#1a73e8] to-[#8ab4f8] opacity-[0.1] blur-3xl animate-3d-float"></div>
          <div className="absolute top-[15%] right-[10%] w-32 h-32 rounded-3xl rotate-12 bg-gradient-to-tr from-[#ea4335] to-[#f28b82] opacity-[0.08] blur-2xl animate-3d-float-reverse"></div>
          <div className="absolute bottom-[10%] left-[20%] w-48 h-48 rounded-full bg-gradient-to-tr from-[#fbbc05] to-[#fde293] opacity-[0.1] blur-3xl animate-3d-float"></div>
          <div className="absolute top-[40%] right-[15%] w-36 h-36 rounded-full bg-gradient-to-tr from-[#34a853] to-[#81c995] opacity-[0.08] blur-2xl animate-3d-float-reverse"></div>

          {/* Detailed 3D Floating Icons */}
          <div className="absolute top-[25%] left-[15%] rounded-2xl bg-white p-4 google-shadow-md animate-float-icon opacity-80 border border-[#dadce0]">
            <Calculator className="h-8 w-8 text-[#1a73e8]" strokeWidth={1.5} />
          </div>
          <div className="absolute top-[60%] right-[20%] rounded-2xl bg-white p-4 google-shadow-md animate-float-icon opacity-80 border border-[#dadce0]" style={{ animationDelay: "2s" }}>
            <ImageIcon className="h-8 w-8 text-[#ea4335]" strokeWidth={1.5} />
          </div>
          <div className="absolute bottom-[15%] left-[30%] rounded-2xl bg-white p-4 google-shadow-md animate-float-icon opacity-80 border border-[#dadce0]" style={{ animationDelay: "4s" }}>
            <Code2 className="h-8 w-8 text-[#34a853]" strokeWidth={1.5} />
          </div>
        </div>

        <div className="mx-auto max-w-4xl text-center flex flex-col items-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium text-[#5f6368] border border-[#dadce0] google-shadow animate-fade-in-up">
            <Sparkles className="h-4 w-4 text-[#1a73e8]" />
            <span>{allTools.length}+ free online tools</span>
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-[#202124] sm:text-6xl lg:text-7xl leading-[1.15] animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            All{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1a73e8] via-[#ea4335] to-[#fbbc05]">
              Free Online Tools
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#5f6368] sm:text-xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Calculate, convert, create and simplify everyday tasks with beautifully designed, privacy-first tools. Everything you need, directly in your browser.
          </p>
        </div>

        {/* Elevated Google Search Bar Component */}
        <div className="mx-auto mt-12 w-full max-w-3xl relative z-50 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <div className="rounded-full bg-white p-2 border border-[#dadce0] transition-shadow hover:shadow-[0_12px_32px_-4px_rgba(60,64,67,0.2)] focus-within:shadow-[0_12px_32px_-4px_rgba(60,64,67,0.2)]">
            <SearchTools tools={searchTools} />
          </div>
        </div>

        {/* Categories Chips */}
        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          {categoryCounts.map((category) => (
            <a
              key={category.name}
              href={`#category-${category.name.toLowerCase()}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#5f6368] border border-[#dadce0] transition-all hover:bg-[#f8f9fa] hover:text-[#202124] hover:google-shadow focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/40"
            >
              {category.name}
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f1f3f4] border border-[#dadce0] text-[10px] font-bold text-[#202124]">
                {category.count}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* --- ALL TOOLS GRID SECTION --- */}
      <section className="bg-white py-16 sm:py-24 border-t border-[#dadce0] relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          <div className="mb-20 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#202124] sm:text-4xl">
              Explore All Tools
            </h2>
            <div className="mt-4 h-1 w-16 bg-[#1a73e8] mx-auto rounded-full"></div>
          </div>

          <div className="space-y-24">
            {categoryCounts.map((category, catIndex) => {
              const categoryTools = allTools.filter((tool) => tool.category === category.name);
              if (categoryTools.length === 0) return null;

              const CategoryIcon = categoryIcons[category.name as keyof typeof categoryIcons] ?? Calculator;
              const theme = googleColors[catIndex % googleColors.length];

              return (
                <section key={category.name} id={`category-${category.name.toLowerCase()}`} className="scroll-mt-32">
                  <div className="mb-8 flex items-center gap-4 border-b border-[#dadce0] pb-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${theme.bg} ${theme.text} border ${theme.border}`}>
                      <CategoryIcon className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-[#202124]">
                        {category.name}
                      </h3>
                      <p className="mt-0.5 text-sm font-medium text-[#5f6368]">
                        {category.count} {category.count === 1 ? "tool" : "tools"} available
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {categoryTools.map((tool, index) => {
                      const Icon = categoryIcons[tool.category as keyof typeof categoryIcons] ?? Calculator;
                      const cardTheme = googleColors[index % googleColors.length];

                      return (
                        <Link
                          key={tool.slug}
                          href={`/tools/${tool.slug}`}
                          className={`group relative flex h-full flex-col rounded-3xl bg-white p-7 border border-[#dadce0] google-shadow transition-all duration-300 hover:-translate-y-2 hover:google-shadow-hover ${cardTheme.hoverBorder} animate-fade-in-up`}
                          style={{ animationDelay: `${(index * 0.05).toFixed(2)}s` }}
                        >
                          <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${cardTheme.bg} ${cardTheme.text} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                            <Icon className="h-6 w-6" strokeWidth={1.5} />
                          </div>

                          <h4 className="text-xl font-medium text-[#202124] group-hover:text-[#1a73e8] transition-colors">
                            {tool.name}
                          </h4>

                          <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5f6368]">
                            {tool.short}
                          </p>

                          {/* Action Pill detail inside card */}
                          <div className={`mt-6 inline-flex items-center w-fit rounded-full px-4 py-2 text-sm font-medium ${cardTheme.bg} ${cardTheme.text} opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0`}>
                            Open Tool <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
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

      {/* --- HOW IT WORKS --- */}
      <section className="bg-white py-24 border-t border-[#dadce0] relative overflow-hidden">
        {/* Subtle background detail */}
        <div className="absolute inset-0 -z-10 bg-dotted-grid opacity-30"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-[#202124]">How ToolMitra Works</h2>
            <p className="mt-4 text-lg text-[#5f6368]">No signups. No complex setups. Just three simple steps.</p>
          </div>

          <div className="relative grid gap-12 lg:grid-cols-3">
            {/* Connecting line detail (desktop only) */}
            <div className="hidden lg:block absolute top-12 left-[15%] right-[15%] h-px border-t-2 border-dashed border-[#dadce0] z-0"></div>

            {steps.map((step, idx) => {
              const theme = googleColors[step.colorIndex];
              return (
                <div key={step.title} className="relative z-10 flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-white border border-[#dadce0] google-shadow transition-transform duration-300 hover:-translate-y-2">
                  <div className={`mb-6 flex h-24 w-24 items-center justify-center rounded-full ${theme.bg} ${theme.text} border-4 border-white shadow-[0_0_0_1px_rgba(218,220,224,1)]`}>
                    <step.icon className="h-10 w-10" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-[#202124]">{step.title}</h3>
                  <p className="text-[#5f6368] leading-relaxed px-4">{step.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* --- FAQS --- */}
      <section className="bg-white py-24 border-t border-[#dadce0]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-[#202124]">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-[#5f6368]">Everything you need to know about our tools.</p>
          </div>
          <div className="bg-white">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="bg-white py-24 px-4 sm:px-6 border-t border-[#dadce0]">
        <div className="mx-auto max-w-5xl rounded-[3rem] bg-white px-6 py-16 sm:p-20 text-center relative overflow-hidden border border-[#dadce0] google-shadow-floating">

          {/* Abstract background shapes inside white CTA for detail */}
          <div className="absolute inset-0 bg-dotted-grid opacity-30"></div>
          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-[#e8f0fe] opacity-50 blur-3xl animate-3d-float"></div>
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#fce8e6] opacity-50 blur-3xl animate-3d-float-reverse"></div>

          <div className="relative z-10">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#e8f0fe] border border-[#1a73e8]/20 google-shadow">
              <Mail className="h-10 w-10 text-[#1a73e8]" strokeWidth={1.5} />
            </div>

            <h2 className="text-4xl font-bold tracking-tight text-[#202124] sm:text-5xl">
              Stay updated on new tools
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-lg text-[#5f6368]">
              Discover new calculators and utilities as ToolMitra grows. Explore our collection whenever you need a quick, reliable answer.
            </p>

            <Link
              href="#category-business"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#1a73e8] px-8 py-4 font-medium text-white shadow-sm transition-all hover:bg-[#1557b0] hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:ring-offset-2"
            >
              Explore all tools
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}