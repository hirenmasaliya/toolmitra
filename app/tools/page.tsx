import type { Metadata } from "next";
import SearchTools from "../components/SearchTools";
import {
  Calculator,
  Briefcase,
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
  ChevronDown
} from "lucide-react";

// 1. PROPER SEO METADATA IMPLEMENTATION
export const metadata: Metadata = {
  title: "All Free Online Tools & Calculators | ToolMitra",
  description: "Browse our complete collection of free online calculators and utilities. Calculate GST, EMI, profit margins, compress images, and generate QR codes instantly.",
  keywords: [
    "free online tools",
    "GST calculator",
    "profit calculator",
    "EMI calculator",
    "QR code generator",
    "image compressor",
    "business calculators"
  ],
  openGraph: {
    title: "All Free Online Tools & Calculators | ToolMitra",
    description: "Explore our collection of free calculators and utilities designed to simplify your everyday business, finance, and design tasks.",
    url: "https://yourdomain.com/tools",
    siteName: "ToolMitra",
    images: [
      {
        url: "https://yourdomain.com/og-image-tools.jpg", // Update with your actual OG image URL
        width: 1200,
        height: 630,
        alt: "ToolMitra Online Tools Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Free Online Tools | ToolMitra",
    description: "Browse free online calculators and utilities to simplify your everyday tasks.",
    images: ["https://yourdomain.com/og-image-tools.jpg"], // Update with your actual OG image URL
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
  alternates: {
    canonical: "https://yourdomain.com/tools", // Ensure this matches your production URL
  },
};

const tools = [
  {
    name: "GST Calculator",
    description: "Calculate GST, CGST, SGST, and IGST instantly.",
    href: "/tools/gst-calculator",
    category: "Business",
    icon: <Briefcase className="h-6 w-6 text-blue-500" />,
  },
  {
    name: "Profit Calculator",
    description: "Calculate profit, cost, and profit margin.",
    href: "/tools/profit-calculator",
    category: "Business",
    icon: <Calculator className="h-6 w-6 text-emerald-500" />,
  },
  {
    name: "Discount Calculator",
    description: "Calculate discounts and final prices easily.",
    href: "/tools/discount-calculator",
    category: "Business",
    icon: <Percent className="h-6 w-6 text-indigo-500" />,
  },
  {
    name: "Age Calculator",
    description: "Calculate your age in years, months, and days.",
    href: "/tools/age-calculator",
    category: "Calculator",
    icon: <Clock className="h-6 w-6 text-orange-500" />,
  },
  {
    name: "EMI Calculator",
    description: "Estimate monthly loan payments and interest.",
    href: "/tools/emi-calculator",
    category: "Finance",
    icon: <CreditCard className="h-6 w-6 text-purple-500" />,
  },
  {
    name: "QR Code Generator",
    description: "Generate QR codes for links and text seamlessly.",
    href: "/tools/qr-code-generator",
    category: "Utility",
    icon: <QrCode className="h-6 w-6 text-slate-700" />,
  },
  {
    name: "Image Compressor",
    description: "Reduce image file sizes online without quality loss.",
    href: "/tools/image-compressor",
    category: "Image",
    icon: <ImageIcon className="h-6 w-6 text-pink-500" />,
  },
  {
    name: "Image to PDF",
    description: "Convert images into a PDF document quickly.",
    href: "/tools/image-to-pdf",
    category: "Image",
    icon: <FileText className="h-6 w-6 text-red-500" />,
  },
];

const faqs = [
  { q: "Are these tools completely free to use?", a: "Yes! All tools on ToolMitra are 100% free to use. There are no paywalls, hidden fees, or premium subscriptions required." },
  { q: "Do I need to create an account?", a: "No account or registration is required. You can start using any tool immediately without handing over your email address or personal details." },
  { q: "Is my data and information secure?", a: "Absolutely. Our calculators and utilities process your inputs locally right inside your web browser. We do not store or send your calculation data to our servers." },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      
      {/* Hero & Search Section */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:pt-24 lg:pb-16">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            All <span className="text-blue-600">Free Online Tools</span>
          </h1>
          <p className="text-lg text-slate-600 sm:text-xl leading-relaxed">
            Explore our collection of free calculators and utilities designed to simplify your everyday business, finance, and design tasks.
          </p>
        </div>

        {/* Client Component for Interactive Search */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8 relative z-10">
          <SearchTools tools={tools} />
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-white py-20 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">How ToolMitra Works</h2>
            <p className="mt-4 text-lg text-slate-500">Skip the complex setups. Get your answers in three simple steps.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: MousePointerClick, title: "1. Select your tool", desc: "Search or browse our categories to find the exact calculator or utility you need." },
              { icon: Cpu, title: "2. Input your data", desc: "Enter your numbers or upload your files securely. Everything processes instantly in your browser." },
              { icon: CheckCircle2, title: "3. Get results instantly", desc: "View, copy, or download your results immediately without signing up or watching ads." }
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-slate-50 ring-1 ring-slate-100 transition-shadow hover:shadow-md">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <step.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO-Friendly FAQ Section (Using native details/summary for zero JS) */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group rounded-2xl bg-white p-6 ring-1 ring-slate-200 open:ring-blue-200 open:shadow-sm transition-all">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-900 list-none">
                  <span className="text-lg">{faq.q}</span>
                  <span className="ml-6 flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-500 group-open:bg-blue-50 group-open:text-blue-600">
                    <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                  </span>
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed pr-8">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA / Newsletter */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="mx-auto max-w-5xl rounded-3xl bg-slate-900 px-6 py-16 sm:p-20 text-center shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Stay updated on new tools
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
              We add new calculators and utilities regularly. Join our newsletter to get notified the moment a new tool drops.
            </p>
            
            <form className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full rounded-xl border-0 bg-white/10 py-3.5 pl-12 pr-4 text-white placeholder:text-slate-400 focus:bg-white focus:text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="rounded-xl bg-blue-600 px-8 py-3.5 font-semibold text-white transition-colors hover:bg-blue-500 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
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