import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { guides } from "@/app/lib/guides";

type Props = {
  params: Promise<{ slug: string }>;
};

// 1. Metadata generation works exactly as you had it
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);

  if (!guide) {
    return { title: "Guide Not Found" };
  }

  return {
    title: `${guide.title} | Your App Name`,
    description: guide.summary,
  };
}

// 2. Static params generation remains the same
export function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

// 3. Extract the data-dependent content into a separate async component
async function GuideContent({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  return (
    <>
      <header className="mb-10 border-b border-slate-200 pb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          {guide.summary}
        </p>
      </header>

      <article className="prose prose-slate prose-lg max-w-none">
        {guide.body.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </article>
    </>
  );
}

// 4. The main page component acts as the instant loading shell
export default function GuidePage({ params }: Props) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 md:py-20">
      {/* Static Shell / Breadcrumb Navigation renders instantly */}
      <nav className="mb-8 text-sm font-medium text-slate-500">
        <Link href="/blog" className="hover:text-brand transition-colors">
          &larr; Back to Guides
        </Link>
      </nav>

      {/* Dynamic content is wrapped in Suspense */}
      <Suspense fallback={<div className="animate-pulse">Loading guide...</div>}>
        <GuideContent params={params} />
      </Suspense>
    </main>
  );
}