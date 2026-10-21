import type { Metadata } from "next";
import Link from "next/link";
import { 
  Info, 
  Users, 
  Wrench, 
  Calculator, 
  FileText, 
  Globe2, 
  Target, 
  Zap, 
  Eye, 
  MapPin, 
  ShieldCheck, 
  HeartHandshake, 
  AlertTriangle, 
  MessageSquarePlus,
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "About ToolMitra",
  description:
    "ToolMitra offers free, fast online tools for everyday and business use in India. No sign-up, runs in your browser, built for mobile.",
};

// --- CUSTOM GOOGLE MATERIAL 3 ANIMATIONS & SHADOWS ---
const styles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    opacity: 0;
  }
  .google-shadow {
    box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
  }
  .google-shadow-hover {
    box-shadow: 0 1px 3px 0 rgba(60,64,67,0.3), 0 4px 8px 3px rgba(60,64,67,0.15);
  }
  .bg-dotted-grid {
    background-image: radial-gradient(#dadce0 1px, transparent 1px);
    background-size: 24px 24px;
  }
`;

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-[#202124] selection:bg-[#e8f0fe] selection:text-[#1a73e8] overflow-hidden relative pb-24">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 -z-10 bg-dotted-grid opacity-40"></div>

      {/* --- HERO SECTION --- */}
      <section className="mx-auto max-w-4xl px-4 pt-20 pb-12 sm:px-6 sm:pt-28 text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="inline-flex items-center gap-2 rounded-full border border-[#dadce0] bg-white px-5 py-2 text-sm font-medium text-[#1a73e8] google-shadow mb-6">
          <Info className="h-4 w-4" />
          <span>About Us</span>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-[#202124]">
          Meet Tool<span className="text-[#1a73e8]">Mitra</span>
        </h1>
        
        <p className="mx-auto mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-[#5f6368]">
          ToolMitra offers free, fast online tools for everyday and business use in India. Every tool runs directly in your browser, needs no sign-up, and is built to be beautifully clear on any device.
        </p>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-8">
        
        {/* --- MISSION CARD --- */}
        <section className="rounded-[2.5rem] border border-[#dadce0] bg-white p-8 sm:p-12 google-shadow animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#e8f0fe] text-[#1a73e8]">
              <Users className="h-8 w-8" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#202124]">Why ToolMitra exists</h2>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-[#5f6368]">
                <strong>"Mitra" means friend</strong>, and that is our guiding idea. Many online calculators and converters are cluttered with pop-ups, forced log-ins, and confusing interfaces. We wanted tools that give you the answer quickly, show how it was worked out, and respect your time.
              </p>
            </div>
          </div>
        </section>

        {/* --- 2-COLUMN GRID: WHAT WE DO & APPROACH --- */}
        <div className="grid gap-8 md:grid-cols-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          
          {/* What you can do here */}
          <section className="rounded-[2.5rem] border border-[#dadce0] bg-white p-8 sm:p-10 google-shadow transition-shadow hover:google-shadow-hover">
            <h2 className="text-xl font-bold text-[#202124] flex items-center gap-3 mb-6">
              <Wrench className="h-6 w-6 text-[#ea4335]" />
              What you can do here
            </h2>
            <p className="text-[#5f6368] mb-6 text-[1.05rem]">
              Our tools cover common needs for individuals, students, freelancers, and small businesses:
            </p>
            <ul className="space-y-4">
              {[
                { icon: Calculator, text: "Financial calculators (EMI, SIP, interest)" },
                { icon: FileText, text: "Tax and GST-related calculations" },
                { icon: Globe2, text: "Unit, date, and number converters" },
                { icon: Zap, text: "Text, image, and document utilities" }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[#202124] font-medium">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fce8e6] text-[#ea4335]">
                    <item.icon className="h-4 w-4" />
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </section>

          {/* Our Approach */}
          <section className="rounded-[2.5rem] border border-[#dadce0] bg-white p-8 sm:p-10 google-shadow transition-shadow hover:google-shadow-hover">
            <h2 className="text-xl font-bold text-[#202124] flex items-center gap-3 mb-6">
              <Target className="h-6 w-6 text-[#34a853]" />
              Our Approach
            </h2>
            <p className="text-[#5f6368] mb-6 text-[1.05rem]">
              We build one tool at a time, test the maths, and explain how each result is calculated.
            </p>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <Target className="h-6 w-6 text-[#34a853] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#202124] block">Accuracy first</strong>
                  <span className="text-[#5f6368] text-sm">Checked against standard methods before going live.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Eye className="h-6 w-6 text-[#1a73e8] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#202124] block">Transparent results</strong>
                  <span className="text-[#5f6368] text-sm">We show the formulas and steps behind the answer.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Zap className="h-6 w-6 text-[#fbbc05] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#202124] block">Simple and fast</strong>
                  <span className="text-[#5f6368] text-sm">Lightweight pages that load instantly on mobile.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-[#ea4335] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#202124] block">Made for India</strong>
                  <span className="text-[#5f6368] text-sm">Rupee formatting and the Indian number system (lakh/crore).</span>
                </div>
              </li>
            </ul>
          </section>
        </div>

        {/* --- 3-COLUMN PILLARS --- */}
        <div className="grid gap-6 md:grid-cols-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          
          <div className="rounded-[2rem] border border-[#dadce0] bg-[#f8f9fa] p-8 text-center transition-transform hover:-translate-y-1">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e6f4ea] text-[#34a853] mb-5">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-[#202124] mb-3">Privacy & Data</h3>
            <p className="text-sm text-[#5f6368] leading-relaxed">
              Tools run directly in your browser. What you type is processed on your device and is never stored on our servers. No account needed.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#dadce0] bg-[#f8f9fa] p-8 text-center transition-transform hover:-translate-y-1">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f0fe] text-[#1a73e8] mb-5">
              <HeartHandshake className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-[#202124] mb-3">Free to use</h3>
            <p className="text-sm text-[#5f6368] leading-relaxed">
              ToolMitra is free for everyone. While we may show non-intrusive ads to cover costs, the core tools will always stay accessible.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#dadce0] bg-[#f8f9fa] p-8 text-center transition-transform hover:-translate-y-1">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fef7e0] text-[#fbbc05] mb-5">
              <AlertTriangle className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-[#202124] mb-3">A note on accuracy</h3>
            <p className="text-sm text-[#5f6368] leading-relaxed">
              Designed for reliable estimates, but results are for general info. For legal/financial decisions, please confirm with a professional.
            </p>
          </div>

        </div>

        {/* --- BOTTOM CTA (FEEDBACK) --- */}
        <section className="rounded-[2.5rem] bg-[#e8f0fe] p-8 sm:p-12 text-center border border-[#d2e3fc] relative overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          {/* Abstract circles */}
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white opacity-40 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#aecbfa] opacity-30 blur-3xl"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#1a73e8] google-shadow mb-6">
              <MessageSquarePlus className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold text-[#202124] mb-4">Feedback and suggestions</h2>
            <p className="text-[1.1rem] text-[#5f6368] mb-8 leading-relaxed">
              Found a mistake, or want a tool we have not built yet? We would love to hear from you. Many of our best tools started as requests from users like you.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 rounded-full bg-[#1a73e8] px-8 py-3.5 font-medium text-white shadow-sm transition-all hover:bg-[#1557b0] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:ring-offset-2"
            >
              Get in touch
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}