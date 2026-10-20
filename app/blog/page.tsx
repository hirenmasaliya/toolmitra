import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/app/lib/guides";

export const metadata: Metadata = { 
  title: "Guides | Your App Name", 
  description: "Practical guides on GST, profit margin, and discounts to help you grow your business." 
};

export default function GuidesIndex() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 md:py-20">
      {/* Page Header */}
      <header className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Practical Guides
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl">
          Everything you need to know about calculating GST, managing profit margins, and applying discounts effectively.
        </p>
      </header>

      {/* Guides Grid/List */}
      <div className="grid gap-6 sm:grid-cols-2">
        {guides.length > 0 ? (
          guides.map((g) => (
            <Link 
              key={g.slug} 
              // Changed from /blog/${g.slug} to /guides/${g.slug}
              href={`/blog/${g.slug}`} 
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
            >
              <div>
                {/* Optional Metadata (Requires updating your guides object) */}
                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span>Recently updated</span>
                  <span>&middot;</span>
                  <span>5 min read</span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-brand">
                  {g.title}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600 line-clamp-3">
                  {g.summary}
                </p>
              </div>

              {/* Call to action */}
              <div className="mt-6 flex items-center text-sm font-semibold text-brand transition-colors group-hover:text-brand-dark">
                Read guide 
                <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-slate-500">Check back soon for new guides!</p>
        )}
      </div>
    </main>
  );
}