import Link from "next/link";
import { Container } from "@/components/design-system/Container";
import { CTAButton } from "@/components/design-system/CTAButton";
import { siteConfig } from "@/lib/siteConfig";
import { Building2, Calendar, CheckCircle, Shield } from "lucide-react";

export function HomeTrustStrip() {
  return (
    <section className="py-10 border-y border-slate-200/80 bg-white">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          <div className="flex items-center gap-3 text-sm font-semibold text-[var(--ink)]">
            <Shield className="text-[var(--accent)] flex-shrink-0" size={22} />
            Licensed customs brokerage · Tema & Takoradi coverage
          </div>
          <div className="flex-1 flex flex-wrap gap-3 justify-center lg:justify-end">
            {siteConfig.clientLogos.map((c) => (
              <div
                key={c.name}
                className="flex h-12 min-w-[100px] items-center justify-center rounded-xl bg-slate-100 px-4 text-xs font-display font-bold text-slate-500 border border-slate-200/80"
                title={c.name}
              >
                {c.abbr}
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-xs text-slate-400 mt-6">
          Representative clients & partners — logos anonymised for confidentiality where required.
        </p>
      </Container>
    </section>
  );
}

export function HomeVerticals() {
  return (
    <section 
      className="py-20 md:py-28 text-white relative overflow-hidden bg-fixed bg-center bg-cover"
      style={{ backgroundImage: "url('/verticals-bg-dark.webp')" }}
    >
      {/* 18% Overlay */}
      <div className="absolute inset-0 bg-[#0B1F3A]/18" aria-hidden />
      <div className="absolute inset-0 hero-grid opacity-10" aria-hidden />
      <Container className="relative z-10">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">Industries</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight">Built for your sector</h2>
          <p className="mt-4 text-white/65 text-lg">
            Deep playbooks per vertical—documentation patterns, risk profiles, and KPI language your board understands.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.verticals.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:bg-white/10 transition-colors"
            >
              <Building2 className="text-[var(--accent)] mb-4" size={26} />
              <h3 className="font-display font-bold text-lg">{v.title}</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function HomeCalendlyCTA() {
  return (
    <section className="py-16 md:py-20 bg-[var(--surface-warm)] border-y border-slate-200/60">
      <Container>
        <div className="rounded-3xl bg-white border border-slate-200/80 p-10 md:p-14 flex flex-col lg:flex-row lg:items-center gap-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-[var(--accent)] mb-4">
              <Calendar size={22} />
              <span className="text-xs font-bold uppercase tracking-wider">Need help deciding?</span>
            </div>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[var(--ink)]">
              Not sure which shipping option fits you best?
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed max-w-xl">
              Book a quick 15-minute call and we will guide you through the easiest option for your shipment, timeline,
              and budget.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-[var(--accent)] flex-shrink-0" />
                Friendly, no-pressure advice
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-[var(--accent)] flex-shrink-0" />
                Clear next steps before you pay anything
              </li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 lg:flex-col lg:items-stretch">
            <CTAButton href={siteConfig.calendlyUrl} external size="lg" className="justify-center">
              Book a free 15-min call
            </CTAButton>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold border-2 border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-colors"
            >
              Or request a quick quote →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
