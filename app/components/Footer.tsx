import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const toolLinks = [
  { label: "GST Calculator", href: "/tools/gst-calculator" },
  { label: "Profit Calculator", href: "/tools/profit-calculator" },
  { label: "Discount Calculator", href: "/tools/discount-calculator" },
  { label: "Age Calculator", href: "/tools/age-calculator" },
  { label: "EMI Calculator", href: "/tools/emi-calculator" },
  { label: "All Tools", href: "/tools" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Guides & Articles", href: "/blog" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="inline-flex text-[0.95rem] text-[#5f6368] transition-all hover:text-[#1a73e8] hover:translate-x-1"
      >
        {children}
      </Link>
    </li>
  );
}

export default function Footer() {
  const year = 2026;

  return (
    <footer className="mt-auto border-t border-[#dadce0] bg-[#f8f9fa] font-sans selection:bg-[#e8f0fe] selection:text-[#1a73e8]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Main footer */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand information (Spans 4 columns) */}
          <div className="lg:col-span-4 pr-4">
            <Link
              href="/"
              aria-label="ToolMitra homepage"
              className="group inline-flex items-center gap-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#e8f0fe] text-[#1a73e8] transition-colors group-hover:bg-[#d2e3fc]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="m13 2-3 8H5l6 12 3-9h5L13 2Z" />
                </svg>
              </span>

              <span className="text-2xl font-bold tracking-tight text-[#202124]">
                Tool<span className="text-[#1a73e8]">Mitra</span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-[1.05rem] leading-relaxed text-[#5f6368]">
              Your everyday destination for free online calculators and
              useful digital tools. Calculate, explore and get things done
              with simple, practical solutions.
            </p>

            <Link
              href="/tools"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white border border-[#dadce0] px-6 py-3 text-[0.95rem] font-medium text-[#1a73e8] transition-all hover:bg-[#f1f3f4] hover:shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/40"
            >
              Explore free tools
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Popular tools (Spans 2 columns) */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h2 className="text-[1.05rem] font-semibold text-[#202124]">
              Popular Tools
            </h2>
            <ul className="mt-6 space-y-4">
              {toolLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Company & Categories (Spans 2 columns) */}
          <div className="lg:col-span-2">
            <h2 className="text-[1.05rem] font-semibold text-[#202124]">
              Company
            </h2>
            <ul className="mt-6 space-y-4">
              {companyLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>

            <h3 className="mt-10 text-[1.05rem] font-semibold text-[#202124]">
              Categories
            </h3>
            <ul className="mt-6 space-y-4">
              <FooterLink href="/tools">Business Calculators</FooterLink>
              <FooterLink href="/tools">Everyday Calculators</FooterLink>
              <FooterLink href="/tools">Online Utilities</FooterLink>
            </ul>
          </div>

          {/* Legal & Promo Card (Spans 3 columns) */}
          <div className="lg:col-span-3">
            <h2 className="text-[1.05rem] font-semibold text-[#202124]">
              Legal & Policies
            </h2>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-4 sm:flex-col sm:gap-x-0">
              {legalLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>

            {/* Google Material 3 Information Card */}
            <div className="mt-10 rounded-3xl border border-[#dadce0] bg-white p-6 shadow-sm transition-shadow hover:shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)]">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fce8e6] text-[#ea4335]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <p className="text-[1.05rem] font-medium text-[#202124]">
                  Free. Simple. Useful.
                </p>
              </div>
              <p className="text-[0.95rem] leading-relaxed text-[#5f6368]">
                Tools designed with privacy in mind to make your everyday tasks easier.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-[#dadce0] py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.9rem] text-[#5f6368]">
            &copy; {year} ToolMitra. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-8">
            <p className="text-[0.9rem] text-[#5f6368] hidden md:block">
              Made to make everyday tasks easier.
            </p>

            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-[#1a73e8] transition-colors hover:text-[#1557b0] hover:underline underline-offset-4"
            >
              Discover all tools <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}