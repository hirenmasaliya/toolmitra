import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/app/lib/guides";
export const metadata: Metadata = { title: "Guides", description: "Practical guides on GST, profit margin and discounts." };
export default function Blog() {
  return (<div className="mx-auto max-w-3xl px-4 py-10"><h1 className="text-3xl font-bold">Guides</h1>
    <div className="mt-6 space-y-4">{guides.map((g) => (<Link key={g.slug} href={`/blog/${g.slug}`} className="card block hover:border-brand"><h2 className="font-semibold">{g.title}</h2><p className="mt-1 text-sm text-slate-500">{g.summary}</p></Link>))}</div></div>);
}
