"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setup = searchParams.get("setup") === "1";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    const supabase = createClient();
    if (!supabase) {
      setErr("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and ANON_KEY, or use ADMIN_AUTH_DISABLED=true.");
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setErr(error.message);
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[var(--navy)] flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <h1 className="font-display font-bold text-2xl text-[var(--ink)]">Admin sign in</h1>
        <p className="mt-2 text-sm text-slate-600">Premium 1 Logistics operations dashboard</p>

        {setup && (
          <div className="mt-4 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent)]/35 text-[var(--navy)] text-sm p-4">
            <strong>Setup required:</strong> Add Supabase URL and anon key, create a user in Supabase Auth, or set{" "}
            <code className="bg-white/75 px-1 rounded">ADMIN_AUTH_DISABLED=true</code> for local demo only.
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-premium"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-premium"
              required
              autoComplete="current-password"
            />
          </div>
          {err && <p className="text-sm text-red-600">{err}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[var(--accent)] text-white font-semibold hover:bg-[var(--accent-hover)] disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <Link href="/" className="mt-6 block text-center text-sm text-[var(--accent)] hover:underline">
          ← Back to website
        </Link>
      </div>
    </div>
  );
}

export default function AdminAuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--navy)]" />}>
      <LoginForm />
    </Suspense>
  );
}
