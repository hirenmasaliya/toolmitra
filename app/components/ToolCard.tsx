import Link from "next/link";
import { Tool } from "@/types";
export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/tools/${tool.slug}`} className="card block transition-colors hover:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40">
      <h3 className="font-semibold text-slate-900">{tool.name}</h3>
      <p className="mt-1 text-sm text-slate-500">{tool.short}</p>
    </Link>
  );
}
