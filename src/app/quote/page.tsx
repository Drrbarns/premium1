"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/design-system/Container";
import { PageHero } from "@/components/page/PageHero";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SITE_SETTINGS } from "@/lib/mock";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  MapPin,
  MessageCircle,
  Package,
  Send,
  Ship,
  User,
} from "lucide-react";

const STEPS = [
  { id: "origin", title: "Route", icon: MapPin, subtitle: "Origin & destination" },
  { id: "cargo", title: "Cargo", icon: Package, subtitle: "Details & dimensions" },
  { id: "method", title: "Method", icon: Ship, subtitle: "Mode & requirements" },
  { id: "docs", title: "Contact", icon: User, subtitle: "Your details" },
];

const benefits = [
  "Line-item quotations where applicable",
  "Named operations contact on confirmation",
  "24–48h response on complete enquiries",
  "Corridor experience: Ghana & ECOWAS",
];

export default function QuotePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [trap, setTrap] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    origin: "",
    destination: "",
    cargo_type: "",
    dimensions: "",
    weight: "",
    quantity: "",
    method: "sea",
    requirements: "",
    name: "",
    company: "",
    email: "",
    phone: "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (trap) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: form.origin,
          destination: form.destination,
          cargo: { type: form.cargo_type, dimensions: form.dimensions, weight: form.weight, quantity: form.quantity },
          method: form.method,
          requirements: form.requirements,
          full_name: form.name,
          company_name: form.company,
          email: form.email,
          phone: form.phone,
          website: trap || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.inquiry_no) {
        try {
          sessionStorage.setItem("lastInquiryId", data.id || "");
          sessionStorage.setItem("lastInquiryDemo", data.demo ? "1" : "0");
        } catch {
          /* */
        }
        router.push(`/quote/thanks?no=${encodeURIComponent(data.inquiry_no)}`);
        return;
      }
      alert(data.error || "Something went wrong. Email us or use WhatsApp.");
    } catch {
      alert("Something went wrong. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const progress = Math.round(((step + 1) / STEPS.length) * 100);

  return (
    <>
      <PageHero
        eyebrow="Quote request"
        title="Request a structured quotation"
        description="Four short steps (~3 minutes). The more complete your inputs, the faster we respond — with fewer clarification rounds."
        crumbs={[{ label: "Home", href: "/" }, { label: "Quote" }]}
        backgroundImage="/hero-logistics.png"
      />

      <section className="relative py-20 md:py-28 bg-[var(--surface-warm)]">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-8 order-2 lg:order-1">
              <AnimateOnScroll animation="slide-right">
                <div className="rounded-3xl bg-white border border-slate-200/80 shadow-2xl shadow-slate-900/5 overflow-hidden">
                  
                  {/* Progress Header */}
                  <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-200">
                      <div
                        className="h-full bg-[var(--accent)] transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 md:gap-4 mt-2">
                      {STEPS.map((s, i) => {
                        const Icon = s.icon;
                        const active = i === step;
                        const done = i < step;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setStep(i)}
                            className={`flex items-center gap-3 rounded-2xl px-3.5 sm:px-4 py-3 text-left transition-all min-w-0 basis-[calc(50%-0.25rem)] sm:basis-auto sm:min-w-[140px] ${
                              active
                                ? "bg-[var(--navy)] text-white shadow-lg shadow-[var(--navy)]/20"
                                : done
                                  ? "bg-[var(--accent-soft)] text-[var(--ink)] border border-[var(--accent)]/20"
                                  : "bg-white border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-[var(--ink)]"
                            }`}
                          >
                            <span
                              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                                active ? "bg-white/15 text-[var(--accent)]" : done ? "bg-[var(--accent)] text-white" : "bg-slate-100 text-slate-400"
                              }`}
                            >
                              {done && !active ? <CheckCircle2 size={20} /> : <Icon size={20} />}
                            </span>
                            <span className="min-w-0">
                              <span className={`block text-xs font-bold uppercase tracking-wider mb-0.5 ${active ? 'text-white/60' : 'opacity-60'}`}>
                                Step {i + 1}
                              </span>
                              <span className="block font-display font-bold truncate">{s.title}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Form Body */}
                  <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6">
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden
                      className="absolute opacity-0 w-px h-px overflow-hidden"
                      value={trap}
                      onChange={(e) => setTrap(e.target.value)}
                    />
                    
                    {step === 0 && (
                      <div className="space-y-6 animate-fade-up">
                        <div>
                          <label className="block text-sm font-semibold text-[var(--ink)] mb-2">Origin</label>
                          <input
                            type="text"
                            value={form.origin}
                            onChange={(e) => update("origin", e.target.value)}
                            className="input-premium"
                            placeholder="City, port, or full address"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[var(--ink)] mb-2">Destination</label>
                          <input
                            type="text"
                            value={form.destination}
                            onChange={(e) => update("destination", e.target.value)}
                            className="input-premium"
                            placeholder="Delivery point or port"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="space-y-6 animate-fade-up">
                        <div>
                          <label className="block text-sm font-semibold text-[var(--ink)] mb-2">Cargo type</label>
                          <input
                            type="text"
                            value={form.cargo_type}
                            onChange={(e) => update("cargo_type", e.target.value)}
                            className="input-premium"
                            placeholder="e.g. General cargo, machinery, chemicals"
                          />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-[var(--ink)] mb-2">Dimensions (L×W×H cm)</label>
                            <input
                              type="text"
                              value={form.dimensions}
                              onChange={(e) => update("dimensions", e.target.value)}
                              className="input-premium"
                              placeholder="e.g. 120x80x100"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-[var(--ink)] mb-2">Weight (kg)</label>
                            <input
                              type="text"
                              value={form.weight}
                              onChange={(e) => update("weight", e.target.value)}
                              className="input-premium"
                              placeholder="e.g. 1500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[var(--ink)] mb-2">Quantity</label>
                          <input
                            type="text"
                            value={form.quantity}
                            onChange={(e) => update("quantity", e.target.value)}
                            className="input-premium"
                            placeholder="Packages, pallets, or TEU"
                          />
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6 animate-fade-up">
                        <div>
                          <label className="block text-sm font-semibold text-[var(--ink)] mb-3">Shipping method</label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {(["sea", "air", "road"] as const).map((m) => (
                              <label
                                key={m}
                                className={`cursor-pointer rounded-2xl border-2 px-4 py-5 text-center transition-all ${
                                  form.method === m
                                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] shadow-md"
                                    : "border-slate-200 hover:border-[var(--accent)]/40 hover:bg-slate-50 text-slate-500"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="method"
                                  value={m}
                                  checked={form.method === m}
                                  onChange={() => update("method", m)}
                                  className="sr-only"
                                />
                                <span className={`block font-display font-bold text-lg capitalize ${form.method === m ? 'text-[var(--ink)]' : ''}`}>
                                  {m}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[var(--ink)] mb-2">
                            Requirements & timeline
                          </label>
                          <textarea
                            value={form.requirements}
                            onChange={(e) => update("requirements", e.target.value)}
                            className="input-premium min-h-[140px] resize-y"
                            placeholder="Incoterms, target ETA, special handling, permits…"
                            rows={4}
                          />
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-6 animate-fade-up">
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="sm:col-span-2">
                            <label className="block text-sm font-semibold text-[var(--ink)] mb-2">Full name *</label>
                            <input
                              type="text"
                              value={form.name}
                              onChange={(e) => update("name", e.target.value)}
                              className="input-premium"
                              required
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-sm font-semibold text-[var(--ink)] mb-2">Company</label>
                            <input
                              type="text"
                              value={form.company}
                              onChange={(e) => update("company", e.target.value)}
                              className="input-premium"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-[var(--ink)] mb-2">Email *</label>
                            <input
                              type="email"
                              value={form.email}
                              onChange={(e) => update("email", e.target.value)}
                              className="input-premium"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-[var(--ink)] mb-2">Phone *</label>
                            <input
                              type="tel"
                              value={form.phone}
                              onChange={(e) => update("phone", e.target.value)}
                              className="input-premium"
                              required
                            />
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex gap-3 text-sm text-slate-600">
                          <Send size={18} className="text-[var(--accent)] flex-shrink-0" />
                          <p>
                            Document upload can be enabled when your storage buckets are connected. For now, attach
                            files via follow-up email or WhatsApp after submission.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-8 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={prev}
                        disabled={step === 0}
                        className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-0 disabled:pointer-events-none transition-all"
                      >
                        <ChevronLeft size={20} /> Back
                      </button>
                      
                      {step < STEPS.length - 1 ? (
                        <button
                          type="button"
                          onClick={next}
                          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold bg-[var(--navy)] text-white hover:bg-slate-800 transition-all btn-hover-lift shadow-lg shadow-slate-900/20"
                        >
                          Continue to {STEPS[step + 1].title} <ChevronRight size={20} />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={submitting}
                          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-all btn-hover-lift shadow-lg shadow-[var(--accent)]/30 disabled:opacity-60"
                        >
                          <Send size={20} />
                          {submitting ? "Submitting…" : "Submit quote request"}
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Sidebar Column */}
            <aside className="lg:col-span-4 space-y-6 order-1 lg:order-2 lg:sticky lg:top-32">
              <AnimateOnScroll animation="slide-left" delay={100}>
                <div className="rounded-3xl bg-[var(--navy)] text-white p-8 md:p-10 relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 hero-grid opacity-10" aria-hidden />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/20 rounded-full blur-[40px] pointer-events-none" aria-hidden />
                  
                  <FileText className="relative text-[var(--accent)] mb-6" size={32} />
                  <h2 className="font-display font-bold text-2xl relative mb-6">What happens next</h2>
                  
                  <ol className="space-y-5 relative text-sm text-white/80">
                    <li className="flex gap-4 items-start">
                      <span className="w-6 h-6 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">1</span>
                      <span className="leading-relaxed text-base">Operations reviews your lane, commodity, and mode.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="w-6 h-6 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">2</span>
                      <span className="leading-relaxed text-base">We email a written quote or ask targeted follow-ups.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="w-6 h-6 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">3</span>
                      <span className="leading-relaxed text-base">On acceptance, you receive a file reference and checklist.</span>
                    </li>
                  </ol>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="slide-left" delay={200}>
                <div className="rounded-3xl bg-white border border-slate-200/80 p-8 shadow-lg shadow-slate-900/5">
                  <h3 className="font-display font-bold text-xl text-[var(--ink)] mb-6">You will get</h3>
                  <ul className="space-y-4 mb-8">
                    {benefits.map((b) => (
                      <li key={b} className="flex gap-3 text-slate-600">
                        <CheckCircle2 className="text-[var(--accent)] flex-shrink-0 w-5 h-5 mt-0.5" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-6 border-t border-slate-100">
                    <a
                      href={SITE_SETTINGS.social.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#25D366]/10 text-[#128C7E] font-bold hover:bg-[#25D366]/20 transition-colors"
                    >
                      <MessageCircle size={20} />
                      WhatsApp us instead
                    </a>
                  </div>
                </div>
              </AnimateOnScroll>
            </aside>
            
          </div>
        </Container>
      </section>
    </>
  );
}
