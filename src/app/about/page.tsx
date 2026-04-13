import Image from "next/image";
import { Container, Section, CTAButton } from "@/components/design-system";
import { PageHero } from "@/components/page/PageHero";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { MOCK_STATS } from "@/lib/mock";
import {
  Anchor,
  Award,
  BadgeCheck,
  CheckCircle2,
  Globe2,
  Shield,
  Target,
  Users,
} from "lucide-react";
import { TEAM_LEADERS } from "@/lib/richContent";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = {
  title: "About Us | Premium 1 Logistics LTD",
  description:
    "Premium 1 Logistics — corporate freight partner in Ghana and West Africa. Mission, values, capabilities, and coverage.",
};

const pillars = [
  {
    icon: Target,
    title: "Outcome-driven",
    body: "Every lane and mode choice is weighed against your delivery date, landed cost, and compliance exposure — not generic templates.",
  },
  {
    icon: Shield,
    title: "Compliance first",
    body: "Classification, permits, and documentation are treated as operational risks we manage proactively, not afterthoughts at the gate.",
  },
  {
    icon: Globe2,
    title: "Corridor-native",
    body: "Deep familiarity with Tema, Takoradi, regional ports, and landlocked ECOWAS destinations means fewer surprises at borders.",
  },
  {
    icon: Users,
    title: "Single thread",
    body: "You work with a dedicated operations contact who owns your file from quote through proof of delivery.",
  },
];

const milestones = [
  { year: "2010", text: "Founded with focus on corporate import consolidation and customs brokerage." },
  { year: "2014", text: "Expanded inland haulage and project cargo for mining and construction sectors." },
  { year: "2018", text: "Launched integrated warehousing and distribution for FMCG clients." },
  { year: "2022", text: "Formalised supply-chain advisory for clients scaling across West Africa." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Built for serious shippers in Ghana and beyond"
        description="We combine hands-on port and corridor experience with the discipline corporate teams expect: clear quotes, accountable execution, and documentation you can audit."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        backgroundImage="/hero-slide-1.webp"
      />

      {/* ── Story & Mission ── */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimateOnScroll animation="slide-right">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
                Our story
              </p>
              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[var(--ink)] tracking-tight leading-tight mb-8">
                From brokerage to <span className="text-slate-400">end-to-end logistics.</span>
              </h2>
              <div className="prose-page space-y-5 text-lg">
                <p>
                  Premium 1 Logistics started where many international shipments touch Ghana: customs clearance and port
                  coordination. Clients asked us to stay on the file after release — to book trucks, store stock, and manage
                  the next leg. We built the capabilities to match.
                </p>
                <p>
                  Today we serve manufacturers, traders, NGOs, and project owners who need one accountable partner across
                  freight forwarding, clearance, warehousing, and inland distribution. Our team blends senior brokers with
                  young operators trained on modern tracking and reporting tools.
                </p>
                <p>
                  Whether you are landing your first container in Tema or routing project cargo to Ouagadougou, we structure
                  the work so you always know who to call and what happens next.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="slide-left" className="relative">
              <div className="relative aspect-[4/5] sm:aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/about-story.webp" alt="Port and logistics operations" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)] via-[var(--navy)]/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                  <h3 className="font-display font-bold text-2xl mb-4">Our Mission</h3>
                  <p className="text-white/80 leading-relaxed text-lg">
                    Maximise reliability and minimise total landed cost for our clients through expert documentation, honest
                    communication, and execution that stands up to audit.
                  </p>
                </div>
              </div>
              
              {/* Floating Stat Card */}
              <div className="absolute -bottom-8 -left-8 md:-left-12 bg-white rounded-2xl p-6 shadow-xl border border-slate-100 hidden sm:flex gap-6 items-center">
                <div className="w-14 h-14 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
                  <Award size={28} />
                </div>
                <div>
                  <p className="font-display font-bold text-3xl text-[var(--ink)]">15+</p>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Years Active</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* ── Principles ── */}
      <section className="relative py-24 md:py-32 bg-[var(--surface-warm)] overflow-hidden">
        <Container>
          <AnimateOnScroll animation="fade-up" className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">How we work</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)]">Principles, not platitudes</h2>
            <p className="mt-4 text-slate-500 text-lg leading-relaxed">
              Four commitments every team member is measured against — from the first quote to final POD.
            </p>
          </AnimateOnScroll>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => (
              <AnimateOnScroll key={pillar.title} animation="fade-up" delay={i * 100}>
                <div className="group h-full rounded-3xl border border-slate-200/80 bg-white p-8 hover:shadow-xl hover:shadow-slate-900/5 hover:border-[var(--accent)]/30 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="w-14 h-14 rounded-2xl bg-[var(--surface-warm)] text-[var(--accent)] flex items-center justify-center mb-6 group-hover:bg-[var(--accent)] group-hover:text-white transition-colors duration-500">
                    <pillar.icon size={26} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[var(--ink)] mb-3">{pillar.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{pillar.body}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Capabilities & Stats (Dark) ── */}
      <section className="relative py-24 md:py-32 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: "url('/hero-slide-1.webp')" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[var(--navy)]/30" aria-hidden />
        <div className="absolute inset-0 hero-grid opacity-[0.06]" aria-hidden />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent)]/10 rounded-full blur-[120px] pointer-events-none" aria-hidden />
        
        <Container className="relative">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimateOnScroll animation="slide-right">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-4">Capabilities</p>
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-8">What we execute in-house</h2>
              <ul className="space-y-5 mb-10">
                {[
                  "Freight forwarding — air, sea, FCL, LCL, and multimodal",
                  "Customs clearance and transit bonds for ECOWAS corridors",
                  "Warehousing, inventory control, pick-pack-ship",
                  "Inland haulage, project cargo, and last-mile delivery",
                  "Door-to-door programmes with single accountability",
                  "Supply-chain diagnostics and network design",
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[var(--accent)] flex-shrink-0" strokeWidth={2} />
                    <span className="leading-relaxed text-white/80 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <CTAButton href="/services" variant="primary" size="lg">Explore services</CTAButton>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="slide-left">
              <div className="rounded-3xl bg-[var(--navy)]/45 border border-white/15 backdrop-blur-md p-8 md:p-10 shadow-2xl shadow-slate-900/30">
                <div className="flex items-center justify-between gap-4 mb-8">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-1">Performance cockpit</p>
                    <h3 className="font-display font-bold text-2xl md:text-3xl text-white">Operational scorecards</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[var(--accent)]">
                    <BadgeCheck size={22} strokeWidth={1.7} />
                  </div>
                </div>

                <div className="space-y-5">
                  {MOCK_STATS.map((s, i) => (
                    <div key={s.label} className="rounded-2xl bg-white/[0.06] border border-white/10 p-5">
                      <div className="flex items-baseline justify-between gap-4 mb-2">
                        <p className="text-sm uppercase tracking-wider text-white/65 font-medium">{s.label}</p>
                        <p className="font-display text-3xl font-bold text-[var(--accent)] tabular-nums">
                          {s.prefix}{s.end}{s.suffix}
                        </p>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[var(--accent)]/80 to-[var(--accent)]"
                          style={{ width: `${[62, 78, 54, 86][i % 4]}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-7 pt-6 border-t border-white/10 flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-white/80">
                    SLA-focused execution
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-white/80">
                    Named file ownership
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wide text-white/80">
                    Audit-ready documentation
                  </span>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* ── Leadership ── */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--accent)]/5 rounded-full blur-[150px] pointer-events-none" aria-hidden />
        <Container className="relative z-10">
          <AnimateOnScroll animation="fade-up" className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">People</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[var(--ink)] tracking-tight">
              The operators behind <span className="text-[var(--accent)]">your file</span>
            </h2>
            <p className="mt-5 text-slate-500 text-lg leading-relaxed">
              Our leadership still touches live shipments — so standards stay grounded in port and border reality.
            </p>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {TEAM_LEADERS.map((m, i) => (
              <AnimateOnScroll key={m.name} animation="fade-up" delay={i * 120}>
                <div className="group relative h-full">
                  <div className="relative rounded-3xl overflow-hidden bg-[var(--navy)] aspect-[3/4] flex flex-col justify-end p-8 md:p-10">
                    <Image
                      src="/team-person-bg.webp"
                      alt="Leadership portrait background"
                      fill
                      className="object-cover object-[62%_center] group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-[var(--navy)]/72" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)] via-[var(--navy)]/70 to-transparent" />
                    <div className="absolute inset-0 hero-grid opacity-[0.06]" aria-hidden />
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--accent)]/12 rounded-full blur-[50px] group-hover:w-56 group-hover:h-56 transition-all duration-700 pointer-events-none" />

                    {/* Large initials watermark */}
                    <div className="absolute top-6 left-8 font-display font-black text-[7rem] md:text-[8rem] leading-none text-white/[0.03] group-hover:text-[var(--accent)]/[0.06] transition-colors duration-700 select-none pointer-events-none">
                      {m.name.split(" ").map((x) => x[0]).join("")}
                    </div>

                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-6 group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-all duration-500">
                        <span className="font-display font-bold text-xl text-white">
                          {m.name.split(" ").map((x) => x[0]).join("")}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-2xl text-white mb-1">{m.name}</h3>
                      <p className="text-[var(--accent)] text-sm font-bold uppercase tracking-wider mb-5">{m.role}</p>
                      <p className="text-white/70 text-sm leading-relaxed mb-6">{m.bio}</p>
                      <div className="flex items-center gap-2 pt-5 border-t border-white/10">
                        <Anchor size={14} className="text-[var(--accent)] shrink-0" />
                        <p className="text-xs font-medium text-white/50 uppercase tracking-wide">{m.cred}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Timeline — Horizontal */}
          <AnimateOnScroll animation="fade-up">
            <div className="rounded-3xl bg-[var(--surface-warm)] border border-slate-200/60 p-10 md:p-14 overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">Our journey</p>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-[var(--ink)]">Company milestones</h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="w-8 h-px bg-[var(--accent)]" />
                  <span className="font-medium">2010 — Present</span>
                </div>
              </div>

              <div className="relative">
                {/* Horizontal connecting line */}
                <div className="hidden md:block absolute top-[22px] left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--accent)] via-[var(--accent)]/60 to-slate-200" />

                <div className="grid md:grid-cols-4 gap-8 md:gap-6">
                  {milestones.map((m, i) => (
                    <div key={m.year} className="relative group">
                      {/* Dot */}
                      <div className="hidden md:flex w-11 h-11 rounded-full bg-white border-[3px] border-[var(--accent)] items-center justify-center mb-6 relative z-10 group-hover:bg-[var(--accent)] transition-colors duration-500 shadow-md">
                        <span className="text-xs font-bold text-[var(--accent)] group-hover:text-white transition-colors">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <span className="font-display font-bold text-3xl text-[var(--ink)] block mb-2 group-hover:text-[var(--accent)] transition-colors">{m.year}</span>
                      <p className="text-sm text-slate-500 leading-relaxed">{m.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* ── Licences & Compliance ── */}
      <section className="relative py-24 md:py-32 bg-[var(--surface-warm)]">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-stretch">
            <AnimateOnScroll animation="slide-right" className="h-full flex">
              <div className="w-full flex-1 rounded-3xl border border-slate-200/70 bg-white p-8 md:p-10 shadow-xl shadow-slate-900/5 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)]" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center shadow-sm">
                    <BadgeCheck size={28} strokeWidth={1.5} />
                  </div>
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)]">Licences & memberships</h2>
                </div>
                <p className="text-slate-500 text-lg leading-relaxed mb-8">
                  We maintain active registrations with Ghana Customs and international freight bodies. Reference numbers are available on request for tenders and partner verification.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                  <div className="rounded-2xl border border-slate-200/70 bg-[var(--surface-warm)] px-4 py-3">
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Status</p>
                    <p className="text-sm font-bold text-[var(--ink)]">Active</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200/70 bg-[var(--surface-warm)] px-4 py-3">
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Registrations</p>
                    <p className="text-sm font-bold text-[var(--ink)]">{siteConfig.licenses.length} listed</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200/70 bg-[var(--surface-warm)] px-4 py-3">
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Review cycle</p>
                    <p className="text-sm font-bold text-[var(--ink)]">Annual</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {siteConfig.licenses.map((l, i) => (
                    <div
                      key={l.name}
                      className="rounded-2xl border border-slate-200/70 bg-[var(--surface-warm)] p-5 flex items-start justify-between gap-4 group hover:border-[var(--accent)]/35 hover:bg-white transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-500 text-xs font-bold flex items-center justify-center group-hover:border-[var(--accent)]/30 group-hover:text-[var(--accent)] transition-colors">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div>
                          <p className="font-display font-bold text-lg text-[var(--ink)]">{l.name}</p>
                          <p className="text-sm text-slate-400 mt-1">{l.issuer}</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1.5 rounded-full shrink-0 mt-0.5">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="slide-left" className="h-full flex">
              <div className="w-full flex-1 rounded-3xl bg-[var(--navy)] text-white p-10 md:p-12 relative overflow-hidden shadow-2xl flex flex-col">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-[60px]" aria-hidden />
                <Shield className="text-[var(--accent)] mb-6 relative z-10" size={36} strokeWidth={1.5} />
                <h3 className="font-display font-bold text-2xl mb-6 relative z-10">Data, audit & insurance</h3>
                <ul className="space-y-5 text-white/75 leading-relaxed relative z-10">
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span>Cargo liability and E&amp;O coverages reviewed annually; certificates available under NDA for tenders.</span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span>Shipment files retained per statutory minimums with encrypted backups.</span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span>Client-specific NDAs and MSAs supported for enterprise programmes.</span>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span>Working toward ISO 9001 alignment on key process maps.</span>
                  </li>
                </ul>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>
    </>
  );
}
