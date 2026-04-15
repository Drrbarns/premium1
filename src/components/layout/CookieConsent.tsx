"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "p1l_cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[100] p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:flex md:items-end md:justify-center md:p-6">
      <div className="pointer-events-auto max-w-3xl w-full rounded-2xl border border-slate-200 bg-white shadow-2xl p-6 md:flex md:items-center md:gap-8">
        <p className="text-sm text-slate-600 leading-relaxed flex-1">
          We use essential cookies to run this site and optional analytics to improve it. See our{" "}
          <Link href="/privacy" className="text-[var(--accent)] font-semibold hover:underline">
            Privacy
          </Link>{" "}
          and{" "}
          <Link href="/cookies" className="text-[var(--accent)] font-semibold hover:underline">
            Cookie
          </Link>{" "}
          policies.
        </p>
        <button
          type="button"
          onClick={accept}
          className="mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-xl bg-[var(--navy)] text-white text-sm font-semibold hover:bg-[var(--navy-light)] whitespace-nowrap"
        >
          Accept essential
        </button>
      </div>
    </div>
  );
}
