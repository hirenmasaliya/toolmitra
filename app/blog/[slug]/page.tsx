import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "@/app/lib/guides";
export const generateStaticParams = () => guides.map((g) => ({ slug: g.slug }));
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = guides.find((x) => x.slug === params.slug); return g ? { title: g.title, description: g.summary } : {};
}
export default function Guide({ params }: { params: { slug: string } }) {
  const g = guides.find((x) => x.slug === params.slug); if (!g) notFound();
  return (<article className="mx-auto max-w-3xl px-4 py-10"><h1 className="text-3xl font-bold">{g.title}</h1>
    {g.body.map((p, i) => <p key={i} className="mt-4 leading-7">{p}</p>)}
    <Link href={`/tools/${g.tool}`} className="btn mt-8">Try the calculator</Link></article>);
}
