import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { 
  ChevronRight, 
  Sparkles, 
  Plus, 
  ArrowRight, 
  CheckCircle2, 
  Calculator as CalcIcon, 
  Info,
  ShieldCheck,
  Zap,
  Code2
} from "lucide-react";

import { getTool, tools, SITE } from "@/app/lib/tools";
import Calculator from "@/app/components/Calculators";
import AdSlot from "@/app/components/AdSlot";

// --- CUSTOM GOOGLE 3D, GRID & ANIMATION STYLES ---
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
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-3d-float {
    animation: float 10s ease-in-out infinite;
    transform-style: preserve-3d;
  }
  .animate-3d-float-reverse {
    animation: float-reverse 12s ease-in-out infinite;
    transform-style: preserve-3d;
  }
  .animate-float-icon {
    animation: float-icon 14s ease-in-out infinite;
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    opacity: 0;
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
`;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);

  if (!tool) return {};

  const canonical = `/tools/${tool.slug}`;

  return {
    title: `${tool.title} | ToolMitra`,
    description: tool.description,
    alternates: { canonical },
    openGraph: {
      title: `${tool.title} | ToolMitra`,
      description: tool.description,
      url: canonical,
      siteName: "ToolMitra",
      type: "website",
    },
  };
}

function PageSkeleton() {
  return (
    <main className="min-h-screen bg-white px-4 py-12">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-4 w-48 rounded-full bg-[#f1f3f4]" />
        <div className="mt-8 h-12 max-w-lg rounded-2xl bg-[#f1f3f4]" />
        <div className="mt-4 h-6 max-w-2xl rounded-full bg-[#f1f3f4]" />
        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="h-[500px] rounded-[2rem] bg-white border border-[#dadce0] google-shadow" />
          <div className="h-64 rounded-[2rem] bg-white border border-[#dadce0] google-shadow" />
        </div>
      </div>
    </main>
  );
}

export default function ToolPage({ params }: PageProps) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ToolPageContent params={params} />
    </Suspense>
  );
}

async function ToolPageContent({ params }: PageProps) {
  const { slug } = await params;
  const tool = getTool(slug);

  if (!tool) notFound();

  const relatedTools = tool.related
    .map((relatedSlug) => getTool(relatedSlug))
    .filter((item) => item !== undefined);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: tool.name,
        description: tool.description,
        url: `${SITE}/tools/${tool.slug}`,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      },
      ...(tool.faq.length ? [{
          "@type": "FAQPage",
          mainEntity: tool.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }] : []),
    ],
  };

  return (
    <main className="min-h-screen bg-white pb-24 font-sans text-[#202124] selection:bg-[#e8f0fe] selection:text-[#1a73e8] overflow-x-hidden relative">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      {/* --- BREADCRUMBS --- */}
      <div className="bg-white border-b border-[#dadce0] relative z-20">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm font-medium text-[#5f6368]">
            <Link href="/" className="hover:text-[#1a73e8] transition-colors rounded-md px-2 py-1 -ml-2 hover:bg-[#f8f9fa]">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/tools" className="hover:text-[#1a73e8] transition-colors rounded-md px-2 py-1 hover:bg-[#f8f9fa]">Tools</Link>
            <ChevronRight className="h-4 w-4" />
            <span aria-current="page" className="text-[#202124] px-2 py-1">{tool.name}</span>
          </nav>
        </div>
      </div>

      {/* --- HERO SECTION WITH 3D ELEMENTS --- */}
      <section className="relative isolate mx-auto max-w-6xl px-4 pb-12 pt-12 sm:px-6 sm:pt-16">
        {/* Detailed White Background Grid */}
        <div className="absolute inset-0 -z-20 bg-dotted-grid opacity-50"></div>
        
        {/* Abstract 3D Google-colored Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none flex justify-center">
          <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-gradient-to-tr from-[#1a73e8] to-[#8ab4f8] opacity-[0.08] blur-3xl animate-3d-float"></div>
          <div className="absolute top-[20%] right-[10%] w-48 h-48 rounded-3xl rotate-12 bg-gradient-to-tr from-[#ea4335] to-[#f28b82] opacity-[0.06] blur-2xl animate-3d-float-reverse"></div>
          <div className="absolute bottom-[-10%] right-[30%] w-72 h-72 rounded-full bg-gradient-to-tr from-[#fbbc05] to-[#fde293] opacity-[0.08] blur-3xl animate-3d-float"></div>
          
          {/* Detailed 3D Floating Icons */}
          <div className="absolute top-[15%] right-[15%] rounded-2xl bg-white p-4 google-shadow-md animate-float-icon border border-[#dadce0]">
            <CalcIcon className="h-6 w-6 text-[#1a73e8]" strokeWidth={1.5} />
          </div>
          <div className="absolute top-[60%] left-[10%] rounded-2xl bg-white p-4 google-shadow-md animate-float-icon border border-[#dadce0]" style={{ animationDelay: "2s" }}>
            <Zap className="h-6 w-6 text-[#fbbc05]" strokeWidth={1.5} />
          </div>
        </div>

        <div className="max-w-3xl relative z-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#dadce0] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#5f6368] google-shadow">
            <Sparkles className="h-3.5 w-3.5 text-[#1a73e8]" />
            Free Online Utility
          </div>

          <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-[#202124] leading-[1.15]">
            {tool.name}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#5f6368] sm:text-xl">
            {tool.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium text-[#202124]">
            <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#dadce0] google-shadow">
              <CheckCircle2 className="h-4 w-4 text-[#34a853]" /> Free to use
            </span>
            <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#dadce0] google-shadow">
              <ShieldCheck className="h-4 w-4 text-[#1a73e8]" /> Secure & Private
            </span>
            <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#dadce0] google-shadow">
              <Zap className="h-4 w-4 text-[#fbbc05]" /> Instant results
            </span>
          </div>
        </div>
      </section>

      {/* --- MAIN CALCULATOR & SIDEBAR --- */}
      <section className="relative z-20 mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        
        {/* Left Column (Tool + Instructions) */}
        <div className="min-w-0 space-y-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          
          {/* Active Calculator Component Wrapper */}
          <div className="rounded-[2.5rem] bg-white p-2 border border-[#dadce0] google-shadow transition-shadow hover:google-shadow-hover">
             <Calculator slug={tool.slug} />
          </div>

          {/* How to use */}
          <section className="rounded-[2.5rem] border border-[#dadce0] bg-white p-8 sm:p-10 google-shadow">
            <h2 className="text-3xl font-bold text-[#202124] flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[#e8f0fe] border border-[#1a73e8]/20 text-[#1a73e8]">
                <CalcIcon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              How to use
            </h2>

            <ol className="mt-10 space-y-6 relative before:absolute before:inset-y-0 before:left-5 before:w-px before:bg-[#dadce0]">
              {tool.how.map((step, index) => (
                <li key={`${index}-${step}`} className="relative flex gap-6">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border-2 border-[#1a73e8] text-[1.1rem] font-bold text-[#1a73e8] shadow-sm">
                    {index + 1}
                  </span>
                  <span className="pt-1.5 text-[1.1rem] leading-relaxed text-[#5f6368]">
                    {step}
                  </span>
                </li>
              ))}
            </ol>

            {tool.formula && (
              <div className="mt-12 rounded-3xl border border-[#dadce0] bg-white p-8 relative overflow-hidden">
                {/* Decorative formula background */}
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#fce8e6] opacity-50 blur-3xl"></div>
                
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#ea4335] flex items-center gap-2">
                  <Code2 className="h-4 w-4" /> Mathematical Formula
                </h3>
                <code className="mt-4 block text-lg font-mono text-[#202124] bg-[#f8f9fa] p-5 rounded-2xl border border-[#dadce0]">
                  {tool.formula}
                </code>
              </div>
            )}
          </section>
        </div>

        {/* Right Column (Info + Ads) */}
        <aside className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          
          <section className="rounded-[2rem] border border-[#dadce0] bg-white p-8 google-shadow">
            <h2 className="text-xl font-bold text-[#202124] flex items-center gap-3">
              <Info className="h-6 w-6 text-[#1a73e8]" strokeWidth={1.5} /> About this tool
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-[#5f6368]">
              Use this free utility to calculate results instantly. Designed for speed, privacy, and accuracy directly in your browser.
            </p>

            <div className="mt-8 space-y-5 border-t border-[#dadce0] pt-6 text-[1.05rem]">
              <div className="flex justify-between items-center">
                <span className="text-[#5f6368]">Cost</span>
                <span className="rounded-full bg-[#e6f4ea] px-3 py-1 font-semibold text-[#137333] text-sm border border-[#ceead6]">100% Free</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#5f6368]">Account</span>
                <span className="font-medium text-[#202124]">Not required</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#5f6368]">Data Security</span>
                <span className="font-medium text-[#202124]">Local processing</span>
              </div>
            </div>
          </section>

          {/* Ad Slot - Added key to force remount on navigation to prevent adsbygoogle errors */}
          <div className="sticky top-6 rounded-[2rem] overflow-hidden google-shadow bg-white border border-[#dadce0]">
             <AdSlot key={`ad-${tool.slug}`} />
          </div>

        </aside>
      </section>

      {/* --- FAQS --- */}
      {tool.faq.length > 0 && (
        <section className="mx-auto mt-24 max-w-4xl px-4 sm:px-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-[#202124]">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 h-1 w-16 bg-[#1a73e8] mx-auto rounded-full"></div>
          </div>

          <div className="rounded-[2.5rem] bg-white border border-[#dadce0] google-shadow">
            {tool.faq.map((item, i) => (
              <details key={item.q} className={`group ${i !== tool.faq.length - 1 ? 'border-b border-[#dadce0]' : ''}`}>
                <summary className="flex cursor-pointer list-none items-center justify-between p-6 sm:px-8 sm:py-7 hover:bg-[#f8f9fa] transition-colors rounded-[2.5rem]">
                  <span className="text-[1.1rem] font-medium text-[#202124] pr-4">{item.q}</span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-open:bg-[#e8f0fe] group-open:text-[#1a73e8] group-open:rotate-45 text-[#5f6368] border border-[#dadce0] group-hover:border-[#1a73e8]/30 bg-white">
                    <Plus className="h-5 w-5" />
                  </span>
                </summary>
                <div className="px-6 sm:px-8 pb-8 pt-2">
                  <div className="h-px w-full bg-[#dadce0] mb-4 opacity-50"></div>
                  <p className="text-[#5f6368] leading-relaxed text-[1.05rem]">
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* --- RELATED TOOLS --- */}
      {relatedTools.length > 0 && (
        <section className="mx-auto mt-32 max-w-6xl px-4 sm:px-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-[#dadce0]">
            <h2 className="text-3xl font-bold text-[#202124]">Related Tools</h2>
            <Link href="/tools" className="inline-flex items-center gap-2 rounded-full bg-white border border-[#dadce0] px-6 py-2.5 text-sm font-medium text-[#1a73e8] transition-all hover:bg-[#f8f9fa] hover:google-shadow">
              Browse all tools <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((relatedTool) => (
              <Link
                key={relatedTool.slug}
                href={`/tools/${relatedTool.slug}`}
                className="group flex flex-col rounded-[2.5rem] bg-white p-8 border border-[#dadce0] google-shadow transition-all duration-300 hover:-translate-y-2 hover:border-[#1a73e8] hover:google-shadow-hover"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-medium text-[#202124] group-hover:text-[#1a73e8] transition-colors pr-4">
                    {relatedTool.name}
                  </h3>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border border-[#dadce0] text-[#5f6368] transition-colors group-hover:bg-[#e8f0fe] group-hover:text-[#1a73e8] group-hover:border-[#1a73e8]/30">
                    <ArrowRight className="h-5 w-5 -rotate-45 transition-transform group-hover:rotate-0" />
                  </div>
                </div>
                <p className="flex-1 text-[1.05rem] leading-relaxed text-[#5f6368]">
                  {relatedTool.description}
                </p>
                
                {/* Interactive Action Detail inside the related card */}
                <div className="mt-8 inline-flex items-center w-fit rounded-full px-4 py-2 text-sm font-medium bg-[#f8f9fa] text-[#5f6368] opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-[#e8f0fe] group-hover:text-[#1a73e8]">
                  Open Tool
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}