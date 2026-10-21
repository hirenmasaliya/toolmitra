"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
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
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  Star,
  Users,
  CheckCircle2,
  MousePointerClick,
  Cpu,
  Mail,
  Plus,
  ArrowRight
} from "lucide-react";

// --- DATA ---
const tools = [
  { name: "GST Calculator", description: "Calculate GST inclusive and exclusive amounts instantly.", category: "Business", icon: "calculator", href: "/tools/gst-calculator", color: "googleBlue", tag: "Popular" },
  { name: "Profit Calculator", description: "Calculate profit, cost price and margins with ease.", category: "Business", icon: "chart", href: "/tools/profit-calculator", color: "googleRed" },
  { name: "Discount Calculator", description: "Find discounts and final selling prices in seconds.", category: "Business", icon: "percent", href: "/tools/discount-calculator", color: "googleYellow" },
  { name: "Age Calculator", description: "Calculate your exact age in years, months and days.", category: "Calculators", icon: "calendar", href: "/tools/age-calculator", color: "googleGreen" },
  { name: "EMI Calculator", description: "Estimate monthly loan payments and total interest.", category: "Calculators", icon: "wallet", href: "/tools/emi-calculator", color: "googleBlue", tag: "New" },
  { name: "QR Code Generator", description: "Create QR codes for links, text and other info.", category: "Utilities", icon: "qr", href: "/tools/qr-code-generator", color: "googleRed" },
  { name: "Image Compressor", description: "Reduce image file sizes directly in your browser.", category: "Utilities", icon: "image", href: "/tools/image-compressor", color: "googleYellow" },
  { name: "Image to PDF", description: "Convert your images into a PDF document quickly.", category: "Utilities", icon: "file", href: "/tools/image-to-pdf", color: "googleGreen" },
];

const categories = ["All Tools", "Business", "Calculators", "Utilities"];

const faqs = [
  { q: "Are these tools completely free to use?", a: "Yes! All tools on ToolMitra are 100% free to use. There are no paywalls, hidden fees, or premium subscriptions required." },
  { q: "Do I need to create an account?", a: "No account or registration is required. You can start using any tool immediately without handing over your email address or personal details." },
  { q: "Is my data and information secure?", a: "Absolutely. Our calculators and utilities process your inputs locally right inside your web browser. We do not store or send your calculation data to our servers." },
  { q: "Can I request a new tool?", a: "We are always expanding our toolbox! Feel free to reach out to us via our contact page if you have a specific calculator or utility you'd like to see." }
];

// --- GOOGLE STYLE COLOR MAPPING ---
const colorStyles: Record<string, string> = {
  googleBlue: "bg-[#E8F0FE] text-[#1A73E8]",
  googleRed: "bg-[#FCE8E6] text-[#EA4335]",
  googleYellow: "bg-[#FEF7E0] text-[#F9AB00]",
  googleGreen: "bg-[#E6F4EA] text-[#34A853]",
};

const iconMap: Record<string, any> = {
  calculator: Calculator, chart: BarChart3, percent: Percent, calendar: CalendarDays,
  wallet: Wallet, qr: QrCode, image: ImageIcon, file: FileText,
};

// --- ANIMATION VARIANTS ---
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

// --- COMPONENTS ---

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      className="border-b border-gray-100 last:border-0 overflow-hidden"
      initial={false}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-[#1A73E8]"
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <motion.span 
          animate={{ rotate: isOpen ? 45 : 0 }}
          className={`ml-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? "bg-[#E8F0FE] text-[#1A73E8]" : "bg-gray-50 text-gray-500"}`}
        >
          <Plus className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="text-gray-600 leading-relaxed pb-6 pr-12">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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
    <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#E8F0FE] selection:text-[#1A73E8] overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative isolate pt-24 pb-16 lg:pt-36 lg:pb-24 flex justify-center items-center">
        
        {/* 3D Animated Background Elements (Google Colors) */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[10%] top-[20%] -z-10 h-32 w-32 rounded-full bg-gradient-to-tr from-[#1A73E8] to-[#669DF6] blur-[2px] shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.2),_10px_20px_30px_rgba(26,115,232,0.3)] opacity-40"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-[15%] top-[15%] -z-10 h-24 w-24 rounded-full bg-gradient-to-tr from-[#EA4335] to-[#F28B82] blur-[1px] shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.15),_10px_20px_30px_rgba(234,67,53,0.3)] opacity-40"
        />
        <motion.div 
          animate={{ x: [0, 20, 0], y: [0, 15, 0] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute left-[20%] bottom-[10%] -z-10 h-40 w-40 rounded-[40px] rotate-12 bg-gradient-to-tr from-[#F9AB00] to-[#FDE293] blur-[2px] shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.1),_10px_20px_30px_rgba(249,171,0,0.2)] opacity-30"
        />
        <motion.div 
          animate={{ y: [0, -25, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute right-[20%] bottom-[20%] -z-10 h-20 w-20 rounded-full bg-gradient-to-tr from-[#34A853] to-[#81C995] blur-[1px] shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.2),_5px_15px_25px_rgba(52,168,83,0.3)] opacity-40"
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 w-full">
          <motion.div 
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="mx-auto max-w-4xl text-center flex flex-col items-center"
          >
            <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-600 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
              <Sparkles className="h-4 w-4 text-[#F9AB00]" />
              <span>10+ Free Google-style Tools</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl lg:text-[5rem] leading-[1.1]">
              Tools that work <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A73E8] via-[#EA4335] to-[#F9AB00]">
                beautifully.
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-gray-500 font-light">
              Calculate, convert, and create with clean, material-designed utilities. Zero clutter. Zero cost. Just instant results.
            </motion.p>

            {/* Google Search Bar Style */}
            <motion.div variants={fadeUp} className="mx-auto mt-10 w-full max-w-2xl">
              <div className="group relative flex items-center rounded-full bg-white px-4 py-3 shadow-[0_2px_15px_rgba(0,0,0,0.08)] transition-all duration-300 focus-within:shadow-[0_8px_30px_rgba(26,115,232,0.15)] border border-gray-100 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                <Search className="h-6 w-6 text-gray-400 ml-2" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tools, calculators, utilities..."
                  className="h-12 w-full bg-transparent px-4 text-lg text-gray-900 outline-none placeholder:text-gray-400"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="mr-2 text-gray-400 hover:text-gray-600">
                    ✕
                  </button>
                )}
              </div>
            </motion.div>

            {/* Social Proof */}
            <motion.div variants={fadeUp} className="mt-12 flex flex-wrap justify-center items-center gap-6 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
                      <Users className="h-3 w-3 text-gray-400" />
                    </div>
                  ))}
                </div>
                <span><strong className="text-gray-900">5,000+</strong> users</span>
              </div>
              <div className="h-4 w-[1px] bg-gray-300 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#34A853]" />
                <span>100% Secure & Local</span>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 2. TOOLS GRID SECTION */}
      <section id="tools" className="relative z-10 py-16 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          
          {/* Material Tabs */}
          <div className="flex justify-center mb-12 overflow-x-auto pb-4 no-scrollbar">
            <div className="inline-flex gap-2 p-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-6 py-2.5 text-sm font-medium transition-all duration-200 rounded-full ${
                    activeCategory === category 
                      ? "bg-[#E8F0FE] text-[#1A73E8]" 
                      : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence>
              {filteredTools.map((tool) => {
                const ToolIcon = iconMap[tool.icon] || Zap;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    key={tool.name}
                  >
                    <Link
                      href={tool.href}
                      className="group flex flex-col h-full rounded-3xl bg-white p-7 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${colorStyles[tool.color]} transition-transform duration-300 group-hover:scale-110`}>
                          <ToolIcon className="h-7 w-7" strokeWidth={1.5} />
                        </div>
                        {tool.tag && (
                          <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${colorStyles[tool.color]}`}>
                            {tool.tag}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed flex-grow">
                        {tool.description}
                      </p>
                      <div className="mt-6 flex items-center text-sm font-medium text-[#1A73E8] opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        Use Tool <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filteredTools.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mt-12 rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-6 py-24 text-center"
            >
              <Search className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-6 text-xl font-medium text-gray-900">No tools found</h3>
              <p className="mt-2 text-gray-500">Try searching for something else like "calculator".</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* 3. FEATURES / MATERIAL CARDS */}
      <section className="bg-gray-50 py-24 rounded-[3rem] mx-4 lg:mx-10 my-10 border border-gray-100">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Why choose ToolMitra?</h2>
            <p className="mt-4 text-lg text-gray-500">Google-inspired simplicity. Powerful results.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "No loading screens or server delays. Tools run instantly right in your browser.", color: "text-[#F9AB00]", bg: "bg-[#FEF7E0]" },
              { icon: ShieldCheck, title: "Private by Design", desc: "Your data never leaves your device. All calculations happen locally for absolute security.", color: "text-[#34A853]", bg: "bg-[#E6F4EA]" },
              { icon: Globe, title: "Always Available", desc: "Access your favorite tools from any device, anywhere in the world, with zero downtime.", color: "text-[#1A73E8]", bg: "bg-[#E8F0FE]" },
            ].map((feature, idx) => (
              <motion.div 
                whileHover={{ y: -5 }}
                key={feature.title} 
                className="rounded-[2rem] bg-white p-8 shadow-sm border border-gray-100"
              >
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bg} ${feature.color}`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-medium text-gray-900">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">Simple, intuitive, and highly effective.</h2>
              <p className="text-lg text-gray-500 mb-10">We believe software should get out of your way. Our tools are designed with clear interfaces so you can get your answers in seconds.</p>
              
              <div className="space-y-8">
                {[
                  { icon: MousePointerClick, title: "Select a tool", desc: "Find exactly what you need from our categorized grid.", color: "bg-[#EA4335] text-white" },
                  { icon: Cpu, title: "Input values", desc: "Enter your numbers in our clean, material-designed inputs.", color: "bg-[#F9AB00] text-white" },
                  { icon: CheckCircle2, title: "Instant Result", desc: "Get real-time updates as you type. No submit buttons required.", color: "bg-[#34A853] text-white" }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-5">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-md ${step.color}`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{step.title}</h4>
                      <p className="mt-1 text-gray-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Abstract 3D/Material Mockup */}
            <div className="relative h-full min-h-[400px] rounded-[3rem] bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden p-8">
               <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
               <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-full max-w-sm bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-[#E8F0FE] flex items-center justify-center">
                      <Calculator className="h-5 w-5 text-[#1A73E8]"/>
                    </div>
                    <div className="h-4 w-24 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-12 w-full bg-gray-50 rounded-xl border border-gray-100 flex items-center px-4">
                      <div className="h-3 w-16 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="h-12 w-full bg-gray-50 rounded-xl border border-gray-100 flex items-center px-4">
                      <div className="h-3 w-20 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="h-16 w-full bg-[#34A853] rounded-xl flex items-center justify-center shadow-md shadow-green-200">
                      <div className="h-4 w-24 bg-white/80 rounded-full"></div>
                    </div>
                  </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Questions? We have answers.</h2>
          </div>
          <div className="rounded-[2rem] bg-white border border-gray-200 p-6 sm:p-10 shadow-sm">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA / NEWSLETTER */}
      <section className="py-24 px-5 bg-white">
        <div className="mx-auto max-w-5xl rounded-[3rem] bg-[#F8FAFC] border border-gray-200 px-6 py-16 sm:p-20 text-center relative overflow-hidden">
          {/* Subtle Google Colors Decorative blur */}
          <div className="absolute top-0 left-0 h-full w-full opacity-30 pointer-events-none">
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#1A73E8] blur-[100px]"></div>
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#EA4335] blur-[100px]"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Get notified about new tools
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-gray-500">
              Join our newsletter. No spam, just a simple email when we launch something new.
            </p>
            
            <form className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full rounded-full border border-gray-200 bg-white py-3.5 pl-12 pr-4 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent transition-all"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="rounded-full bg-[#1A73E8] px-8 py-3.5 font-medium text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A73E8]"
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