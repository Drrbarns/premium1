import { Container } from "@/components/design-system";
import { CTAButton } from "@/components/design-system/CTAButton";
import { PageHero } from "@/components/page/PageHero";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { MOCK_COVERAGE } from "@/lib/mock";
import { TRANSIT_BANDS } from "@/lib/richContent";
import {
  ArrowRight,
  Clock3,
  Globe,
  MapPin,
  MapPinned,
  MoveRight,
  Plane,
  Radar,
  Route,
  ShieldCheck,
  Ship,
  Truck,
} from "lucide-react";

export const metadata = {
  title: "Coverage & Routes | Premium 1 Logistics LTD",
  description:
    "Logistics coverage across Ghana, the West Africa corridor, and international trade lanes.",
};

const regionIcons = [MapPinned, Route, Globe];

const corridors = [
  {
    from: "Tema / Takoradi",
    to: "Ouagadougou / Bamako",
    mode: "Road + transit",
    note: "Bonded transit, escorts as required",
    icon: Truck,
  },
  {
    from: "Tema",
    to: "Accra ICD / Kumasi",
    mode: "Road",
    note: "Container drays, loose cargo",
    icon: Truck,
  },
  {
    from: "Lagos / Lomé",
    to: "Ghana",
    mode: "Sea / road",
    note: "Feeder and cross-border",
    icon: Ship,
  },
  {
    from: "Asia / Europe",
    to: "Ghana",
    mode: "Sea / air",
    note: "FCL, LCL, charter for project",
    icon: Plane,
  },
];

export default function CoveragePage() {
  return (
    <>
      <PageHero
        eyebrow="Coverage"
        title="Where we move cargo — local depth, regional reach"
        description="Ghana is our home base. We routinely coordinate into ECOWAS landlocked states and book international main carriage on major trade lanes."
        crumbs={[{ label: "Home", href: "/" }, { label: "Coverage" }]}
        backgroundImage="/hero-slide-2.webp"
      />

      {/* ── Network Architecture ── */}
      <section className="relative py-24 md:py-32 bg-[var(--surface-warm)] overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-[0.1]" aria-hidden />
        <div className="absolute -left-24 top-10 w-80 h-80 rounded-full bg-[var(--accent)]/10 blur-[90px] pointer-events-none" aria-hidden />
        <Container className="relative">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            <AnimateOnScroll animation="slide-right" className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
                Our network
              </p>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)] leading-tight">
                Three tiers of coverage,
                <span className="block text-slate-400">one operations standard</span>
              </h2>
              <p className="mt-5 text-slate-500 leading-relaxed max-w-md">
                Local depth in Ghana, corridor execution across ECOWAS, and global main-carriage coordination through trusted line and airline partners.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  { icon: MapPinned, label: "Domestic execution", note: "Ports, ICDs, warehouse and final-mile coordination in Ghana." },
                  { icon: Route, label: "Regional corridors", note: "Transit planning into landlocked markets with bond and border governance." },
                  { icon: Globe, label: "International lanes", note: "Ocean and air main leg bookings with lane-specific control." },
                ].map(({ icon: Icon, label, note }) => (
                  <div key={label} className="rounded-2xl border border-slate-200/70 bg-white px-4 py-3.5 flex gap-3 items-start">
                    <Icon size={16} className="text-[var(--accent)] mt-0.5 shrink-0" />
                    <p className="text-sm text-slate-600 leading-relaxed">
                      <span className="font-semibold text-[var(--ink)]">{label}: </span>
                      {note}
                    </p>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>

            <div className="lg:col-span-8 grid md:grid-cols-2 gap-5">
              {MOCK_COVERAGE.map((c, i) => {
                const Icon = regionIcons[i] || Globe;
                const isPrimary = i === 0;
                return (
                  <AnimateOnScroll key={c.region} animation="fade-up" delay={i * 90} className={isPrimary ? "md:col-span-2" : ""}>
                    <div
                      className={`group h-full rounded-3xl border p-7 md:p-8 transition-all duration-500 overflow-hidden relative ${
                        isPrimary
                          ? "bg-[var(--navy)] text-white border-white/10 shadow-2xl shadow-slate-900/20"
                          : "bg-white border-slate-200/80 hover:border-[var(--accent)]/30 hover:shadow-xl hover:shadow-slate-900/[0.06]"
                      }`}
                    >
                      <div className={`absolute inset-0 ${isPrimary ? "hero-grid opacity-[0.08]" : "opacity-0 group-hover:opacity-100 hero-grid [background-size:36px_36px]"} transition-opacity`} aria-hidden />
                      <div className="relative">
                        <div className="flex items-center justify-between gap-4 mb-5">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isPrimary ? "bg-white/10 text-[var(--accent)]" : "bg-[var(--accent-soft)] text-[var(--accent)]"}`}>
                            <Icon size={21} strokeWidth={1.6} />
                          </div>
                          <span className={`text-[10px] uppercase tracking-[0.16em] font-semibold ${isPrimary ? "text-white/45" : "text-slate-400"}`}>
                            {c.tagline}
                          </span>
                        </div>
                        <h3 className={`font-display font-bold text-2xl mb-2 ${isPrimary ? "text-white" : "text-[var(--ink)]"}`}>
                          {c.region}
                        </h3>
                        <p className={`text-sm leading-relaxed mb-6 ${isPrimary ? "text-white/70" : "text-slate-500"}`}>
                          {c.detail}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {c.cities.map((city) => (
                            <span
                              key={city}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm ${
                                isPrimary
                                  ? "bg-white/10 border border-white/15 text-white/85"
                                  : "bg-[var(--surface-warm)] border border-slate-200/70 text-slate-600"
                              }`}
                            >
                              <MapPin size={12} className="text-[var(--accent)]" strokeWidth={2} />
                              {city}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AnimateOnScroll>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Corridor Board + Transit Bands ── */}
      <section className="relative py-24 md:py-32 bg-[var(--navy)] text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-[0.35]"
          style={{ backgroundImage: "url('/hero-slide-2.webp')" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[var(--navy)]/70" aria-hidden />
        <div className="absolute inset-0 hero-grid opacity-[0.08]" aria-hidden />
        <Container className="relative">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <AnimateOnScroll animation="slide-right" className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
                Sample corridors
              </p>
              <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight">
                Lanes we run
                <span className="text-white/45"> frequently</span>
              </h2>
              <p className="mt-4 text-white/60 leading-relaxed max-w-md">
                These are representative flows across domestic, regional, and international movements. Each live quote includes lane-specific assumptions.
              </p>

              <div className="mt-8 space-y-4">
                {corridors.map((route, i) => {
                  const ModeIcon = route.icon;
                  return (
                    <div key={route.from + route.to} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/10 text-[var(--accent)] flex items-center justify-center shrink-0">
                          <ModeIcon size={18} strokeWidth={1.6} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1.5">
                            <span className="font-display font-bold text-white">{route.from}</span>
                            <MoveRight size={15} className="text-[var(--accent)] shrink-0" />
                            <span className="font-display font-bold text-white">{route.to}</span>
                          </div>
                          <p className="text-xs uppercase tracking-wider text-white/45 mb-1">{route.mode}</p>
                          <p className="text-sm text-white/65">{route.note}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AnimateOnScroll>

            <div className="lg:col-span-7">
              <AnimateOnScroll animation="fade-up" className="mb-7">
                <div className="inline-flex items-center gap-2">
                  <Radar size={16} className="text-[var(--accent)]" />
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Transit intelligence</p>
                </div>
                <h3 className="mt-3 font-display font-bold text-2xl md:text-3xl text-white">
                  Typical transit bands by lane
                </h3>
              </AnimateOnScroll>

              <div className="grid sm:grid-cols-2 gap-4">
                {TRANSIT_BANDS.map((band, i) => (
                  <AnimateOnScroll key={band.lane} animation="fade-up" delay={i * 70}>
                    <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-5 h-full backdrop-blur-sm hover:bg-white/[0.09] transition-colors">
                      <p className="font-display font-bold text-base leading-snug text-white mb-4">{band.lane}</p>
                      <div className="flex gap-3 mb-4 flex-wrap">
                        {band.sea !== "—" && (
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-sm font-semibold text-white">
                            <Ship size={13} className="text-[var(--accent)]" /> {band.sea}
                          </span>
                        )}
                        {band.air !== "—" && (
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-sm font-semibold text-white">
                            <Plane size={13} className="text-[var(--accent)]" /> {band.air}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white/45 leading-relaxed">{band.note}</p>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Operating Principles ── */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-[var(--accent)]/[0.06] blur-[90px]" aria-hidden />
        <Container>
          <AnimateOnScroll animation="fade-up" className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
              How we run coverage
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)]">
              Commercial clarity meets
              <span className="text-slate-400"> route reality</span>
            </h2>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Route feasibility first",
                body: "We validate infrastructure, permits, and handling constraints before quoting so execution risk is visible early.",
              },
              {
                icon: Clock3,
                title: "Time-band transparency",
                body: "Transit timelines are provided as practical bands with lane assumptions, not optimistic headline dates.",
              },
              {
                icon: Truck,
                title: "Single-thread accountability",
                body: "Even where partner agents are used, you keep one quote, one operations thread, and one escalation owner.",
              },
            ].map(({ icon: Icon, title, body }, i) => (
              <AnimateOnScroll key={title} animation="fade-up" delay={i * 100}>
                <div className="group rounded-3xl border border-slate-200/80 bg-[var(--surface-warm)] p-8 h-full hover:bg-white hover:border-[var(--accent)]/30 hover:shadow-2xl hover:shadow-slate-900/[0.06] transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/70 text-[var(--accent)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon size={22} strokeWidth={1.6} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[var(--ink)] mb-2">{title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{body}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative py-24 md:py-28 bg-[var(--navy)] overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-[0.06]" aria-hidden />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--accent)]/8 rounded-full blur-[100px] pointer-events-none" aria-hidden />

        <Container className="relative text-center">
          <AnimateOnScroll animation="fade-up">
            <Globe
              className="mx-auto text-[var(--accent)] mb-6"
              size={36}
              strokeWidth={1.5}
            />
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white max-w-xl mx-auto">
              Don&apos;t see your lane?
              <span className="text-white/40"> We likely cover it</span>
            </h2>
            <p className="mt-4 text-white/50 max-w-md mx-auto leading-relaxed">
              We partner with vetted agents on lanes we don&apos;t self-perform.
              You still get one quote and one operations thread — we manage the
              handoffs.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <CTAButton href="/quote" variant="primary" size="lg">
                Request coverage check
                <ArrowRight className="ml-2 w-4 h-4" />
              </CTAButton>
              <CTAButton href="/contact" variant="light" size="lg">
                Talk to our team
              </CTAButton>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>
    </>
  );
}
