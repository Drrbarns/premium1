"use client";

import { useState } from "react";
export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (trap) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: trap || undefined }),
      });
      if (res.ok) {
        setStatus("ok");
        setForm({ name: "", email: "", phone: "", company: "", message: "" });
      } else setStatus("err");
    } catch {
      setStatus("err");
    }
  };

  if (status === "ok") {
    return (
      <div className="rounded-2xl bg-[var(--accent-soft)] border border-[var(--accent)]/30 p-8 text-[var(--navy)]">
        <p className="font-display font-bold text-xl">Message sent successfully</p>
        <p className="mt-2 text-slate-600">We typically reply within {process.env.NEXT_PUBLIC_RESPONSE_SLA_HOURS || "24"} hours on business days.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm font-bold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors inline-flex items-center gap-2">
          ← Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute opacity-0 w-px h-px overflow-hidden"
        value={trap}
        onChange={(e) => setTrap(e.target.value)}
      />
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-[var(--ink)] mb-1">Name *</label>
          <input
            className="input-premium"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[var(--ink)] mb-1">Email *</label>
          <input
            type="email"
            className="input-premium"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[var(--ink)] mb-1">Phone</label>
          <input
            className="input-premium"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[var(--ink)] mb-1">Company</label>
          <input
            className="input-premium"
            value={form.company}
            onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-[var(--ink)] mb-1">Message *</label>
        <textarea
          className="input-premium min-h-[140px]"
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          required
          minLength={10}
          placeholder="How can we help?"
        />
      </div>
      {status === "err" && <p className="text-sm text-red-600">Could not send. Email us directly or use WhatsApp.</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] disabled:opacity-60 btn-hover-lift"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
