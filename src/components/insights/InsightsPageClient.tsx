"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { InsightPost } from "@/lib/pageContent";
import { ArrowRight, Clock } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const ALL = "All Topics";

export function InsightsPageClient({ posts, featured }: { posts: InsightPost[]; featured: InsightPost }) {
  const categories = useMemo(() => {
    const s = new Set(posts.map((p) => p.category));
    return [ALL, ...Array.from(s)];
  }, [posts]);
  const [cat, setCat] = useState(ALL);

  const filtered = useMemo(() => {
    if (cat === ALL) return posts.filter((p) => p.id !== featured.id);
    return posts.filter((p) => p.id !== featured.id && p.category === cat);
  }, [cat, posts, featured.id]);

  return (
    <>
      <AnimateOnScroll animation="fade-up" className="flex flex-wrap items-center gap-3 mb-12">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              c === cat
                ? "bg-[var(--navy)] text-white shadow-md shadow-[var(--navy)]/20"
                : "bg-white border border-slate-200 text-slate-600 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            }`}
          >
            {c}
          </button>
        ))}
      </AnimateOnScroll>
      
      <AnimateOnScroll animation="fade-up">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)] mb-10">
          {cat === ALL ? "Latest articles" : cat}
        </h2>
      </AnimateOnScroll>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filtered.map((p, i) => (
          <AnimateOnScroll key={p.id} animation="fade-up" delay={i * 80}>
            <article className="flex flex-col h-full rounded-3xl bg-white border border-slate-200/80 overflow-hidden hover:shadow-xl hover:shadow-slate-900/5 hover:border-[var(--accent)]/30 transition-all duration-500 group relative">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              
              <div className="p-8 md:p-10 flex flex-col flex-1">
                <span className="inline-block w-fit px-3 py-1 rounded-md bg-[var(--accent-soft)] text-[var(--accent)] text-xs font-bold uppercase tracking-wider mb-5">
                  {p.category}
                </span>
                
                <h3 className="font-display font-bold text-xl lg:text-2xl text-[var(--ink)] leading-snug group-hover:text-[var(--accent)] transition-colors mb-4">
                  <Link href={`/insights/${p.slug}`} className="after:absolute after:inset-0">
                    {p.title}
                  </Link>
                </h3>
                
                <p className="text-slate-600 leading-relaxed flex-1 mb-8">
                  {p.excerpt}
                </p>
                
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-sm font-medium text-slate-500 mb-6">
                  <span>{p.published_at}</span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={16} className="text-[var(--accent)]" />
                    {p.readTime}
                  </span>
                </div>
                
                <div className="inline-flex items-center gap-2 text-sm font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors mt-auto">
                  Read more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          </AnimateOnScroll>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-300 py-20 text-center">
          <p className="text-slate-500 text-lg">No articles in this category yet.</p>
        </div>
      )}
    </>
  );
}
