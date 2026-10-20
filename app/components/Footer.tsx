import Link from "next/link";

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
        className="inline-flex text-sm leading-6 text-slate-500 transition-colors hover:text-blue-600"
      >
        {children}
      </Link>
    </li>
  );
}

export default function Footer() {
  const year = 2026;

  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Main footer */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:py-16">
          {/* Brand information */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              aria-label="ToolMitra homepage"
              className="inline-flex items-center gap-2.5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="m13 2-3 8H5l6 12 3-9h5L13 2Z" />
                </svg>
              </span>

              <span className="text-xl font-extrabold tracking-tight text-slate-950">
                Tool<span className="text-blue-600">Mitra</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">
              Your everyday destination for free online calculators and
              useful digital tools. Calculate, explore and get things done
              with simple, practical solutions.
            </p>

            <Link
              href="/tools"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Explore free tools
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Popular tools */}
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Popular Tools
            </h2>
            <ul className="mt-5 space-y-3">
              {toolLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Company
            </h2>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>

            <h3 className="mt-8 text-sm font-bold text-slate-900">
              Categories
            </h3>
            <ul className="mt-4 space-y-3">
              <FooterLink href="/tools">Business Calculators</FooterLink>
              <FooterLink href="/tools">Everyday Calculators</FooterLink>
              <FooterLink href="/tools">Online Utilities</FooterLink>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Legal & Policies
            </h2>
            <ul className="mt-5 space-y-3">
              {legalLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>

            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-900">
                Free. Simple. Useful.
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Tools designed to make everyday tasks easier.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-slate-200 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-slate-500">
            © {year} ToolMitra. All rights reserved.
          </p>

          <p className="text-xs leading-5 text-slate-500">
            Made to make everyday tasks easier.
          </p>

          <Link
            href="/tools"
            className="text-xs font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Discover all tools →
          </Link>
        </div>
      </div>
    </footer>
  );
}