"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

export default function SearchTools({ tools, limit }: { tools: any[]; limit?: number }) {
  const [q, setQ] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const f = tools.filter((t) => {
    const searchContent = t.name + " " + (t.short || t.description || "");
    return searchContent.toLowerCase().includes(q.toLowerCase());
  });

  const displayTools = limit && !q ? f.slice(0, limit) : f;

  return (
    <div className="relative w-full flex items-center" ref={wrapperRef}>
      {/* Search Icon */}
      <Search className="ml-4 h-6 w-6 shrink-0 text-[#9aa0a6]" />
      
      {/* Input */}
      <input 
        className="w-full bg-transparent px-4 py-3 text-[1.1rem] text-[#202124] placeholder:text-[#9aa0a6] outline-none" 
        placeholder="Search free online tools (e.g., GST, EMI)..." 
        aria-label="Search tools" 
        value={q} 
        onChange={(e) => {
          setQ(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)} 
      />
      
      {/* Absolute Dropdown Results */}
      {isOpen && q.length > 0 && (
        <div className="absolute left-0 top-full mt-4 w-full z-50 max-h-[400px] overflow-y-auto rounded-2xl bg-white border border-[#dadce0] shadow-[0_8px_24px_-4px_rgba(60,64,67,0.15),0_2px_6px_0_rgba(60,64,67,0.2)]">
          {f.length > 0 ? (
            <ul className="flex flex-col p-2 m-0 list-none">
              {displayTools.map((t) => {
                const actualSlug = t.slug || (t.href ? t.href.replace("/tools/", "") : t.name);
                
                return (
                  <li key={actualSlug}>
                    <Link
                      href={`/tools/${actualSlug}`}
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-[#f8f9fa] transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex flex-col text-left">
                        <span className="font-medium text-[#202124] group-hover:text-[#1a73e8] transition-colors">
                          {t.name}
                        </span>
                        <span className="text-sm text-[#5f6368] line-clamp-1">
                          {t.short || t.description}
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-[#1a73e8] opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="p-6 text-center text-[#5f6368]">
              No tool matches "{q}". Try searching for "GST" or "QR".
            </div>
          )}
        </div>
      )}
    </div>
  );
}