"use client";

import Link from "next/link";

export function StickyQuoteCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-4 bg-[var(--navy)]/98 backdrop-blur border-t border-white/10 shadow-2xl">
      <Link
        href="/quote"
        className="block w-full py-3.5 text-center font-semibold bg-[var(--accent)] text-white rounded-xl hover:bg-[var(--accent-hover)] transition-colors shadow-lg shadow-[var(--accent)]/30"
      >
        Request a Quote
      </Link>
    </div>
  );
}
