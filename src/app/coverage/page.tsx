import { Container } from "@/components/design-system";
import { CTAButton } from "@/components/design-system/CTAButton";
import { PageHero } from "@/components/page/PageHero";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { MOCK_COVERAGE } from "@/lib/mock";
import { TRANSIT_BANDS } from "@/lib/richContent";
import {
  ArrowRight,
  Globe,
  MapPin,
  MapPinned,
  MoveRight,
  Plane,
  Route,
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
        backgroundImage="/hero-slide-2.png"
      />

      {/* ── Region Coverage ── */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <Container>
          <AnimateOnScroll animation="fade-up" className="max-w-2xl mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
              Our network
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)]">
              Three tiers of coverage,
              <br className="hidden md:block" />
              <span className="text-slate-400">one accountable team</span>
            </h2>
          </AnimateOnScroll>

          {/* Featured region (Ghana) */}
          <AnimateOnScroll animation="fade-up" className="mb-8">
            <div className="group relative rounded-3xl border border-slate-200/80 bg-[var(--surface-warm)] p-8 md:p-12 overflow-hidden hover:shadow-xl hover:shadow-slate-900/5 hover:border-[var(--accent)]/20 transition-all duration-500">
              <span className="absolute top-6 right-8 font-display font-bold text-[120px] leading-none text-slate-900/[0.02] select-none hidden md:block">
                01
              </span>
              <div className="relative grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
                      <MapPinned size={24} strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {MOCK_COVERAGE[0].tagline}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-3xl text-[var(--ink)] mb-4">
                    {MOCK_COVERAGE[0].region}
                  </h3>
                  <p className="text-slate-500 leading-relaxed">
                    {MOCK_COVERAGE[0].detail}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                    Key locations
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {MOCK_COVERAGE[0].cities.map((city) => (
                      <span
                        key={city}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200/80 text-sm font-medium text-[var(--ink)] shadow-sm"
                      >
                        <MapPin
                          size={14}
                          className="text-[var(--accent)]"
                          strokeWidth={2}
                        />
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Remaining regions */}
          <div className="grid md:grid-cols-2 gap-6">
            {MOCK_COVERAGE.slice(1).map((c, i) => {
              const Icon = regionIcons[i + 1];
              return (
                <AnimateOnScroll
                  key={c.region}
                  animation="fade-up"
                  delay={(i + 1) * 100}
                >
                  <div className="group relative rounded-3xl border border-slate-200/80 bg-[var(--surface-warm)] p-8 md:p-10 overflow-hidden hover:shadow-xl hover:shadow-slate-900/5 hover:border-[var(--accent)]/20 transition-all duration-500 h-full">
                    <span className="absolute top-4 right-6 font-display font-bold text-[80px] leading-none text-slate-900/[0.02] select-none">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-11 h-11 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
                          <Icon size={22} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          {c.tagline}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-2xl text-[var(--ink)] mb-3">
                        {c.region}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6">
                        {c.detail}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {c.cities.map((city) => (
                          <span
                            key={city}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200/60 text-sm text-slate-600"
                          >
                            <MapPin
                              size={12}
                              className="text-[var(--accent)]"
                              strokeWidth={2}
                            />
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
        </Container>
      </section>

      {/* ── Transit Times ── */}
      <section className="relative py-24 md:py-32 bg-[var(--navy)] text-white overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-[0.06]" aria-hidden />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none" aria-hidden />

        <Container className="relative">
          <AnimateOnScroll animation="fade-up" className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
              Transit estimates
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl">
              Typical transit bands
              <span className="text-white/40"> by lane</span>
            </h2>
            <p className="mt-4 text-white/50 leading-relaxed">
              Ranges are indicative — weather, berth availability, examinations,
              and border queues move dates. Your quote will include lane-specific
              assumptions.
            </p>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TRANSIT_BANDS.map((band, i) => (
              <AnimateOnScroll
                key={band.lane}
                animation="fade-up"
                delay={i * 80}
              >
                <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 h-full flex flex-col">
                  <h4 className="font-display font-bold text-base text-white mb-5 leading-snug">
                    {band.lane}
                  </h4>

                  <div className="flex gap-3 mb-5 flex-wrap">
                    {band.sea !== "—" && (
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/5">
                        <Ship size={14} className="text-[var(--accent)]" />
                        <div>
                          <span className="block text-xs text-white/40">
                            Sea
                          </span>
                          <span className="text-sm font-semibold text-white">
                            {band.sea}
                          </span>
                        </div>
                      </div>
                    )}
                    {band.air !== "—" && (
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/5">
                        <Plane size={14} className="text-[var(--accent)]" />
                        <div>
                          <span className="block text-xs text-white/40">
                            Air
                          </span>
                          <span className="text-sm font-semibold text-white">
                            {band.air}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-white/40 leading-relaxed mt-auto">
                    {band.note}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Key Corridors ── */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <Container>
          <AnimateOnScroll animation="fade-up" className="max-w-2xl mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
              Sample corridors
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)]">
              Lanes we run
              <span className="text-slate-400"> often</span>
            </h2>
            <p className="mt-4 text-slate-500 leading-relaxed">
              Not exhaustive — tell us your origin and destination and we will
              confirm feasibility and transit norms.
            </p>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 gap-6">
            {corridors.map((route, i) => {
              const ModeIcon = route.icon;
              return (
                <AnimateOnScroll
                  key={route.from + route.to}
                  animation="fade-up"
                  delay={i * 80}
                >
                  <div className="group relative rounded-2xl border border-slate-200/80 bg-[var(--surface-warm)] p-7 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5 hover:border-[var(--accent)]/20 transition-all duration-500 h-full overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white border border-slate-200/60 text-[var(--accent)] flex items-center justify-center shadow-sm">
                        <ModeIcon size={20} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className="font-display font-bold text-[var(--ink)]">
                            {route.from}
                          </span>
                          <MoveRight
                            size={16}
                            className="text-[var(--accent)] flex-shrink-0"
                          />
                          <span className="font-display font-bold text-[var(--ink)]">
                            {route.to}
                          </span>
                        </div>
                        <span className="inline-block px-2.5 py-1 rounded-md bg-[var(--accent-soft)] text-[var(--accent)] text-xs font-semibold mb-3">
                          {route.mode}
                        </span>
                        <p className="text-sm text-slate-400">{route.note}</p>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
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
