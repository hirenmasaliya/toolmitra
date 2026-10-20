"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Calculator,
  BarChart3,
  Percent,
  CalendarDays,
  Wallet,
  QrCode,
  Image as ImageIcon,
  FileText,
  Search,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  ChevronDown,
  Star,
  Users,
  CheckCircle2,
  MousePointerClick,
  Cpu,
  Mail,
  Plus
} from "lucide-react";

// --- DATA ---
const tools = [
  { name: "GST Calculator", description: "Calculate GST inclusive and exclusive amounts instantly.", category: "Business", icon: "calculator", href: "/tools/gst-calculator", color: "blue", tag: "Popular" },
  { name: "Profit Calculator", description: "Calculate profit, cost price and profit margins.", category: "Business", icon: "chart", href: "/tools/profit-calculator", color: "emerald" },
  { name: "Discount Calculator", description: "Find discounts and final selling prices in seconds.", category: "Business", icon: "percent", href: "/tools/discount-calculator", color: "orange" },
  { name: "Age Calculator", description: "Calculate your exact age in years, months and days.", category: "Calculators", icon: "calendar", href: "/tools/age-calculator", color: "violet" },
  { name: "EMI Calculator", description: "Estimate monthly loan payments and total interest.", category: "Calculators", icon: "wallet", href: "/tools/emi-calculator", color: "pink", tag: "New" },
  { name: "QR Code Generator", description: "Create QR codes for links, text and other information.", category: "Utilities", icon: "qr", href: "/tools/qr-code-generator", color: "cyan" },
  { name: "Image Compressor", description: "Reduce image file sizes directly in your browser.", category: "Utilities", icon: "image", href: "/tools/image-compressor", color: "amber" },
  { name: "Image to PDF", description: "Convert your images into a convenient PDF document.", category: "Utilities", icon: "file", href: "/tools/image-to-pdf", color: "rose" },
];

const categories = ["All Tools", "Business", "Calculators", "Utilities"];

const faqs = [
  { q: "Are these tools completely free to use?", a: "Yes! All tools on ToolMitra are 100% free to use. There are no paywalls, hidden fees, or premium subscriptions required." },
  { q: "Do I need to create an account?", a: "No account or registration is required. You can start using any tool immediately without handing over your email address or personal details." },
  { q: "Is my data and information secure?", a: "Absolutely. Our calculators and utilities process your inputs locally right inside your web browser. We do not store or send your calculation data to our servers." },
  { q: "Can I request a new tool?", a: "We are always expanding our toolbox! Feel free to reach out to us via our contact page if you have a specific calculator or utility you'd like to see." }
];

// --- STYLES & MAPPING ---
const colorStyles: Record<string, string> = {
  blue: "bg-blue-50/80 text-blue-600 ring-blue-500/20 shadow-blue-500/10",
  emerald: "bg-emerald-50/80 text-emerald-600 ring-emerald-500/20 shadow-emerald-500/10",
  orange: "bg-orange-50/80 text-orange-600 ring-orange-500/20 shadow-orange-500/10",
  violet: "bg-violet-50/80 text-violet-600 ring-violet-500/20 shadow-violet-500/10",
  pink: "bg-pink-50/80 text-pink-600 ring-pink-500/20 shadow-pink-500/10",
  cyan: "bg-cyan-50/80 text-cyan-600 ring-cyan-500/20 shadow-cyan-500/10",
  amber: "bg-amber-50/80 text-amber-600 ring-amber-500/20 shadow-amber-500/10",
  rose: "bg-rose-50/80 text-rose-600 ring-rose-500/20 shadow-rose-500/10",
};

const iconMap: Record<string, any> = {
  calculator: Calculator, chart: BarChart3, percent: Percent, calendar: CalendarDays,
  wallet: Wallet, qr: QrCode, image: ImageIcon, file: FileText,
};

// --- COMPONENTS ---

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200/60 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-blue-600"
      >
        <span className="text-lg font-semibold text-slate-900">{question}</span>
        <span className={`ml-6 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 transition-transform duration-300 ${isOpen ? "rotate-45 bg-blue-50 text-blue-600" : "text-slate-400"}`}>
          <Plus className="h-4 w-4" />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="text-slate-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Tools");

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchesCategory = activeCategory === "All Tools" || tool.category === activeCategory;
      const matchesSearch = !query || tool.name.toLowerCase().includes(query) || tool.description.toLowerCase().includes(query) || tool.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <main className="min-h-screen selection:bg-blue-200 selection:text-blue-900 overflow-hidden bg-slate-50 text-slate-900 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[800px] w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
        <div className="absolute right-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-[100px] translate-x-1/2 -translate-y-1/4"></div>
        <div className="absolute left-0 top-[200px] -z-10 h-[500px] w-[500px] rounded-full bg-indigo-400/10 blur-[100px] -translate-x-1/2"></div>

        <div className="mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-8 lg:px-10 lg:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/50 backdrop-blur-md px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-inset ring-slate-100">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>Over 10+ free tools available</span>
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl lg:text-[5rem] drop-shadow-sm">
              Every tool you need.
              <span className="mt-2 block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent pb-2">
                All in one place.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Calculate, convert and create with beautifully designed tools that make your everyday work faster and easier. No clutter, just results.
            </p>

            {/* Premium Search Bar */}
            <div className="mx-auto mt-10 max-w-2xl">
              <div className="group relative flex items-center gap-3 rounded-full bg-white/70 backdrop-blur-xl border border-white p-2 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 focus-within:shadow-[0_8px_30px_rgba(59,130,246,0.15)] focus-within:ring-2 focus-within:ring-blue-500/20">
                <Search className="ml-4 h-6 w-6 shrink-0 text-slate-400 transition-colors group-focus-within:text-blue-500" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search GST, EMI, QR codes..."
                  className="h-14 w-full bg-transparent text-lg text-slate-900 outline-none placeholder:text-slate-400"
                />
                <a
                  href="#tools"
                  className="hidden shrink-0 items-center justify-center rounded-full bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-600 sm:flex"
                >
                  Find Tools
                </a>
              </div>
            </div>

            {/* Social Proof Banner */}
            <div className="mt-14 flex flex-col items-center justify-center gap-4 border-t border-slate-200/60 pt-8 sm:flex-row sm:gap-8">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`h-8 w-8 rounded-full border-2 border-slate-50 bg-slate-200 flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 z-[${10-i}]`}>
                      <Users className="h-3 w-3 text-slate-500" />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-medium text-slate-600">
                  <strong className="text-slate-900">5,000+</strong> users
                </div>
              </div>
              <div className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block"></div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <div className="text-sm font-medium text-slate-600">Free forever</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TOOLS GRID SECTION */}
      <section id="tools" className="relative z-10 scroll-mt-24 pb-24 pt-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          
          <div className="flex justify-center mb-12">
            <div className="inline-flex overflow-hidden rounded-full border border-slate-200 bg-white/50 p-1 backdrop-blur-md shadow-sm">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-6 py-2.5 text-sm font-semibold transition-all duration-300 rounded-full ${
                    activeCategory === category ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTools.map((tool) => {
              const ToolIcon = iconMap[tool.icon] || Zap;
              return (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="group relative flex flex-col rounded-[2rem] bg-white p-7 ring-1 ring-slate-200/50 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:ring-blue-100"
                >
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white to-slate-50/50 opacity-0 transition-opacity group-hover:opacity-100 -z-10"></div>
                  {tool.tag && (
                    <span className="absolute right-6 top-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                      {tool.tag}
                    </span>
                  )}
                  <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ring-inset shadow-sm transition-transform duration-300 group-hover:scale-110 ${colorStyles[tool.color]}`}>
                    <ToolIcon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight transition-colors group-hover:text-blue-600">
                    {tool.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
                    {tool.description}
                  </p>
                </Link>
              );
            })}
          </div>

          {filteredTools.length === 0 && (
            <div className="mt-12 rounded-[2rem] border border-dashed border-slate-300 bg-white/50 backdrop-blur-sm px-6 py-24 text-center">
              <Search className="mx-auto h-12 w-12 text-slate-300" />
              <h3 className="mt-6 text-xl font-bold text-slate-900">No tools found</h3>
              <p className="mt-2 text-slate-500">We couldn't find anything matching "{search}".</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">How ToolMitra Works</h2>
            <p className="mt-4 text-lg text-slate-500">Skip the complex setups. Get your answers in three simple steps.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {[
              { icon: MousePointerClick, title: "1. Select your tool", desc: "Search or browse our categories to find the exact calculator or utility you need." },
              { icon: Cpu, title: "2. Input your data", desc: "Enter your numbers or upload your files securely. Everything processes instantly in your browser." },
              { icon: CheckCircle2, title: "3. Get results instantly", desc: "View, copy, or download your results immediately without signing up or watching ads." }
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center p-8 rounded-3xl bg-slate-50 ring-1 ring-slate-100">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-inner">
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURES / WHY US */}
      <section className="border-t border-slate-200/60 bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "No loading screens or server delays. Tools run instantly right in your browser." },
              { icon: ShieldCheck, title: "Private by Design", desc: "Your data never leaves your device. All calculations happen locally for absolute security." },
              { icon: Globe, title: "Always Available", desc: "Access your favorite tools from any device, anywhere in the world, with zero downtime." },
            ].map((feature) => (
              <div key={feature.title} className="group rounded-3xl p-8 transition-colors bg-white/5 border border-white/10 hover:bg-white/10">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400 ring-1 ring-inset ring-blue-500/30 transition-transform group-hover:scale-110">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-white">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-slate-500">Everything you need to know about our tools and services.</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6 sm:p-10 ring-1 ring-slate-100 shadow-sm">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA / NEWSLETTER */}
      <section className="py-24 px-5">
        <div className="mx-auto max-w-5xl rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-16 sm:p-20 text-center shadow-2xl shadow-blue-900/20 relative overflow-hidden">
          {/* Decorative background circles */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Stay updated on new tools
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-blue-100">
              We add new calculators and utilities every month. Join our newsletter to get notified the moment a new tool drops. No spam, ever.
            </p>
            
            <form className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full rounded-full border-0 bg-white py-4 pl-12 pr-4 text-slate-900 shadow-sm ring-1 ring-inset ring-white/20 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-300 outline-none"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="rounded-full bg-slate-900 px-8 py-4 font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

    </main>
  );
}