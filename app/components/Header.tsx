"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Tools", href: "/tools" },
    { label: "Guides", href: "/blog" },
    { label: "About", href: "/about" },
  ];

  const isActive = (href: string) =>
    href === "/tools"
      ? pathname === "/tools" || pathname.startsWith("/tools/")
      : pathname === href;

  return (
    <header 
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]" : "border-b border-[#dadce0]"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Brand */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="group flex shrink-0 items-center gap-3"
          aria-label="ToolMitra homepage"
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

          <span className="text-[1.35rem] font-bold tracking-tight text-[#202124]">
            Tool<span className="text-[#1a73e8]">Mitra</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-full px-5 py-2.5 text-[0.95rem] font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-[#e8f0fe] text-[#1a73e8]"
                  : "text-[#5f6368] hover:bg-[#f1f3f4] hover:text-[#202124]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/tools"
            className="hidden items-center gap-2 rounded-full bg-[#1a73e8] px-6 py-2.5 text-[0.95rem] font-medium text-white transition-all hover:bg-[#1557b0] hover:shadow-[0_1px_3px_1px_rgba(60,64,67,0.15),0_1px_2px_0_rgba(60,64,67,0.3)] sm:inline-flex"
          >
            Explore Tools
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-12 w-12 items-center justify-center rounded-full text-[#5f6368] transition-colors hover:bg-[#f1f3f4] md:hidden"
          >
            {menuOpen ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="m18 6-12 12M6 6l12 12" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation floating card */}
      {menuOpen && (
        <div className="absolute left-0 top-[72px] w-full px-4 pb-4 md:hidden">
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="rounded-[1.5rem] bg-white p-3 shadow-[0_8px_24px_-4px_rgba(60,64,67,0.15),0_2px_6px_0_rgba(60,64,67,0.2)] border border-[#dadce0]"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`rounded-full px-5 py-3.5 text-[0.95rem] font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-[#e8f0fe] text-[#1a73e8]"
                      : "text-[#5f6368] hover:bg-[#f1f3f4] hover:text-[#202124]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-1 border-t border-[#dadce0]"></div>

              <Link
                href="/tools"
                onClick={() => setMenuOpen(false)}
                className="mt-1 flex items-center justify-center gap-2 rounded-full bg-[#1a73e8] px-5 py-3.5 text-[0.95rem] font-medium text-white transition hover:bg-[#1557b0]"
              >
                Explore All Tools
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}