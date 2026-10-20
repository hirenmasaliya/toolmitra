"use client";
import { useState } from "react";
import ToolCard from "./ToolCard";

export default function SearchTools({ tools, limit }: { tools: any[]; limit?: number }) {
  const [q, setQ] = useState("");
  
  const f = tools.filter((t) => {
    // Safely combine name with either 'short' or 'description' to prevent undefined errors
    const searchContent = t.name + " " + (t.short || t.description || "");
    return searchContent.toLowerCase().includes(q.toLowerCase());
  });

  return (
    <div>
      <input 
        className="w-full max-w-md rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm" 
        placeholder="Search free online tools…" 
        aria-label="Search tools" 
        value={q} 
        onChange={(e) => setQ(e.target.value)} 
      />
      
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(limit && !q ? f.slice(0, limit) : f).map((t) => {
          // Fix the 404 Error: Extract the slug from the href so ToolCard links correctly
          const actualSlug = t.slug || (t.href ? t.href.replace("/tools/", "") : t.name);
          
          // Normalize the tool object so ToolCard receives exactly what it expects
          const normalizedTool = {
            ...t,
            slug: actualSlug,
            short: t.short || t.description
          };

          return (
            <ToolCard 
              key={actualSlug} // Fix the React missing key warning
              tool={normalizedTool} 
            />
          );
        })}
      </div>

      {f.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 py-12 text-center">
          <p className="text-slate-500">
            No tool matches “{q}”. Try searching for “GST” or “QR”.
          </p>
        </div>
      )}
    </div>
  );
}