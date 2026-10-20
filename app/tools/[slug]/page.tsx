
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getTool, tools, SITE } from "@/app/lib/tools";
import Calculator from "@/app/components/Calculators";
import AdSlot from "@/app/components/AdSlot";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-4 w-36 rounded bg-slate-200" />
        <div className="mt-8 h-10 max-w-lg rounded bg-slate-200" />
        <div className="mt-4 h-5 max-w-2xl rounded bg-slate-200" />
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="h-96 rounded-3xl bg-white" />
          <div className="h-64 rounded-2xl bg-white" />
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
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
      },
      ...(tool.faq.length
        ? [{
            "@type": "FAQPage",
            mainEntity: tool.faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          }]
        : []),
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50/70 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/tools" className="hover:text-blue-600">All tools</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="font-medium text-slate-800">{tool.name}</span>
          </nav>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-6 sm:pt-14">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Free online tool · No signup required
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            {tool.name}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            {tool.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
            <span>✓ Free to use</span>
            <span>✓ Instant calculations</span>
            <span>✓ Mobile friendly</span>
          </div>
        </div>
      </section>

      <section
        id="calculator"
        className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px]"
      >
        <div className="min-w-0">
          <Calculator slug={tool.slug} />

          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">
              How to use {tool.name.toLowerCase()}
            </h2>

            <ol className="mt-4 space-y-3">
              {tool.how.map((step, index) => (
                <li key={`${index}-${step}`} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                    {index + 1}
                  </span>
                  <span className="pt-0.5 text-sm leading-6 text-slate-600">
                    {step}
                  </span>
                </li>
              ))}
            </ol>

            {tool.formula && (
              <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                <h3 className="text-sm font-bold text-slate-900">Formula used</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{tool.formula}</p>
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-bold text-slate-900">About this tool</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Use this free ToolMitra tool to calculate results, understand the formula, and explore related business utilities.
            </p>

            <div className="mt-4 space-y-3 border-t border-slate-100 pt-4 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-slate-500">Price</span>
                <span className="font-semibold text-emerald-700">Free</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-slate-500">Account</span>
                <span className="font-semibold text-slate-800">Not required</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-slate-500">Platform</span>
                <span className="font-semibold text-slate-800">Web browser</span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Advertisement
            </p>
            <AdSlot />
          </section>
        </aside>
      </section>

      {tool.faq.length > 0 && (
        <section className="mx-auto mt-12 max-w-4xl px-4 sm:px-6">
          <h2 className="mb-5 text-2xl font-bold tracking-tight text-slate-950">
            Frequently asked questions
          </h2>

          <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 sm:px-6">
            {tool.faq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
                  <span>{item.q}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {relatedTools.length > 0 && (
        <section className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-bold text-slate-950">Related tools</h2>
            <Link href="/tools" className="text-sm font-semibold text-blue-700 hover:text-blue-800">
              Browse all tools →
            </Link>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((relatedTool) => (
              <Link
                key={relatedTool.slug}
                href={`/tools/${relatedTool.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-950/5"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-700">
                    {relatedTool.name}
                  </h3>
                  <span className="text-slate-400 group-hover:text-blue-600">→</span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                  {relatedTool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
