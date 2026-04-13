import { Container } from "@/components/design-system";
import { CTAButton } from "@/components/design-system/CTAButton";
import { PageHero } from "@/components/page/PageHero";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import {
  ArrowRight,
  ClipboardCheck,
  Clock,
  FileCheck2,
  FileText,
  Headphones,
  Lock,
  MessageSquare,
  Package,
  Radar,
  ShieldCheck,
  Truck,
} from "lucide-react";

const steps = [
  {
    icon: Package,
    title: "Submit inquiry",
    description:
      "Use our quote form or WhatsApp with origin, destination, commodity class, dimensions, weight, and target ETA. Attach commercial invoice drafts or packing lists if available — we use them to flag clearance risks early.",
    highlight: "Typical response: within 24 hrs",
  },
  {
    icon: FileCheck2,
    title: "Receive quote",
    description:
      "Within 24–48 business hours you get a written quotation with line items (freight, local charges, documentation, optional insurance). We note assumptions so there are no surprises when cargo is ready.",
    highlight: "Transparent, itemised pricing",
  },
  {
    icon: ClipboardCheck,
    title: "Book & document",
    description:
      "Confirm booking, submit final documents, and receive a shipment file reference. We coordinate IDF, declarations, carrier releases, and any inspection appointments in parallel.",
    highlight: "One file reference for everything",
  },
  {
    icon: Radar,
    title: "Track & deliver",
    description:
      "Milestone updates by email or WhatsApp — departure, arrival, cleared, out for delivery, POD. Exceptions are escalated with options, not just alerts.",
    highlight: "Real-time milestone visibility",
  },
];

const commitments = [
  {
    icon: ShieldCheck,
    title: "Regulatory alignment",
    body: "Licensed operations with broker-led review on every declaration. We decline work we cannot execute compliantly.",
  },
  {
    icon: FileText,
    title: "Document control",
    body: "Versioned paperwork per shipment: invoices, B/Ls, permits, and correspondence stored against your file reference.",
  },
  {
    icon: MessageSquare,
    title: "Transparent pricing",
    body: "Quotes spell out what is included, what is pass-through, and what triggers re-rating (e.g. weight variances).",
  },
  {
    icon: Headphones,
    title: "Responsive desk",
    body: "Business hours coverage for planning; active shipments get escalation paths including after-hours for critical milestones.",
  },
];

const slas = [
  {
    metric: "First quote response",
    target: "24–48 hrs",
    note: "Business days, complete cargo data",
    icon: Clock,
  },
  {
    metric: "Document gap review",
    target: "Same day",
    note: "If inquiry received before 14:00 GMT",
    icon: FileText,
  },
  {
    metric: "Milestone updates",
    target: "Per leg",
    note: "Export, main carriage, arrival, cleared, delivered",
    icon: Radar,
  },
];

const systems = [
  {
    title: "Operations stack",
    description:
      "Shipment records live in a central TMS with milestone codes (M1–M5) from booking to POD. Client comms are logged against file references so nothing lives only in a personal inbox.",
    stat: "M1–M5",
    statLabel: "Milestone tracking",
  },
  {
    title: "Warehouse integration",
    description:
      "Warehousing sites sync inventory events through a WMS integration — your stock view matches ours in real time.",
    stat: "Live",
    statLabel: "Inventory sync",
  },
  {
    title: "Enterprise governance",
    description:
      "Accounts above agreed annual volume receive quarterly steering with OTIF, dwell, and cost-per-TEU trends. Missed SLAs trigger service credits per contract schedule.",
    stat: "QBR",
    statLabel: "Quarterly reviews",
  },
];

export const metadata = {
  title: "How We Operate | Premium 1 Logistics LTD",
  description:
    "Our logistics workflow: inquiry, quote, booking, delivery — and the standards we hold ourselves to.",
};

export default function HowWeOperatePage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="How we operate — clear steps, accountable people"
        description="No black boxes. You always know where your file sits, who owns it, and what happens next — from first quote to signed POD."
        crumbs={[{ label: "Home", href: "/" }, { label: "How We Operate" }]}
        backgroundImage="/hero-slide-2.webp"
      />

      {/* ── Process Journey ── */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-slate-200 to-transparent hidden lg:block" aria-hidden />

        <Container>
          <AnimateOnScroll animation="fade-up" className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
              End-to-end process
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)]">
              Four phases every shipment
              <br className="hidden md:block" />
              <span className="text-slate-400">passes through</span>
            </h2>
            <p className="mt-5 text-slate-500 leading-relaxed">
              Larger programmes may add design workshops or pilot lanes — these
              four phases cover the majority of freight, clearance, and
              distribution work we execute.
            </p>
          </AnimateOnScroll>

          <div className="relative space-y-16 lg:space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;
              return (
                <AnimateOnScroll
                  key={step.title}
                  animation={isEven ? "slide-right" : "slide-left"}
                  delay={i * 120}
                  className="lg:mb-0"
                >
                  <div
                    className={`relative lg:grid lg:grid-cols-2 lg:gap-20 items-center ${
                      i < steps.length - 1 ? "lg:pb-20" : ""
                    }`}
                  >
                    {/* Timeline node (desktop) */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-6 flex-col items-center z-10">
                      <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-display font-bold text-lg shadow-lg shadow-[var(--accent)]/25">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      {i < steps.length - 1 && (
                        <div className="w-px h-[calc(100%+2rem)] bg-slate-200 mt-3" />
                      )}
                    </div>

                    {/* Content side */}
                    <div
                      className={`${
                        isEven
                          ? "lg:col-start-1 lg:pr-16 lg:text-right"
                          : "lg:col-start-2 lg:pl-16"
                      }`}
                    >
                      {/* Mobile step number */}
                      <div className="lg:hidden flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-display font-bold text-sm shadow-md shadow-[var(--accent)]/20">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className="h-px flex-1 bg-slate-200" />
                      </div>

                      <h3 className="font-display font-bold text-2xl text-[var(--ink)]">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-slate-500 leading-relaxed">
                        {step.description}
                      </p>
                      <span className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-[var(--accent)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                        {step.highlight}
                      </span>
                    </div>

                    {/* Visual side */}
                    <div
                      className={`mt-8 lg:mt-0 ${
                        isEven
                          ? "lg:col-start-2 lg:pl-16"
                          : "lg:col-start-1 lg:row-start-1 lg:pr-16"
                      }`}
                    >
                      <div className="relative rounded-2xl border border-slate-200/80 bg-[var(--surface-warm)] p-8 md:p-10 group hover:shadow-xl hover:shadow-slate-900/5 hover:border-[var(--accent)]/20 transition-all duration-500">
                        <span className="absolute top-4 right-5 font-display font-bold text-6xl text-slate-900/[0.03] select-none">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/60 flex items-center justify-center text-[var(--accent)] shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-500">
                          <Icon size={26} strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Behind the Scenes (Dark) ── */}
      <section className="relative py-24 md:py-32 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: "url('/hero-slide-1.webp')" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[var(--navy)]/35" aria-hidden />
        <div className="absolute inset-0 hero-grid opacity-[0.06]" aria-hidden />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none" aria-hidden />

        <Container className="relative">
          <AnimateOnScroll animation="fade-up" className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
              Systems
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl">
              What runs behind
              <span className="text-white/40"> the scenes</span>
            </h2>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-6">
            {systems.map((sys, i) => (
              <AnimateOnScroll
                key={sys.title}
                animation="fade-up"
                delay={i * 100}
              >
                <div className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 h-full">
                  <div className="mb-6">
                    <span className="font-display font-bold text-3xl text-[var(--accent)]">
                      {sys.stat}
                    </span>
                    <span className="block text-xs uppercase tracking-wider text-white/40 mt-1">
                      {sys.statLabel}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg mb-3">
                    {sys.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {sys.description}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Commitments ── */}
      <section className="relative py-24 md:py-32 bg-[var(--surface-warm)] overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-[0.12]" aria-hidden />
        <div className="absolute -left-28 top-16 w-80 h-80 bg-[var(--accent)]/10 rounded-full blur-[90px] pointer-events-none" aria-hidden />
        <div className="absolute -right-24 bottom-10 w-96 h-96 bg-[var(--navy)]/8 rounded-full blur-[100px] pointer-events-none" aria-hidden />
        <Container>
          <div className="relative grid lg:grid-cols-5 gap-10 lg:gap-12 items-start">
            <AnimateOnScroll animation="slide-right" className="lg:col-span-2">
              <div className="lg:sticky lg:top-28">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
                  Our commitments
                </p>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)] leading-tight">
                  What &ldquo;process you can trust&rdquo;
                  <span className="block text-slate-400">means in practice</span>
                </h2>
                <p className="mt-5 text-slate-500 leading-relaxed max-w-md">
                  These are operating standards - not marketing lines. Each commitment ties to a control point in our day-to-day file execution.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {["Compliance-first", "Documented handoffs", "Escalation ready"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
              {commitments.map(({ icon: Icon, title, body }, i) => (
                <AnimateOnScroll
                  key={title}
                  animation="fade-up"
                  delay={i * 90}
                >
                  <div className="group relative rounded-3xl border border-slate-200/80 bg-white p-7 md:p-8 shadow-lg shadow-slate-900/[0.04] hover:shadow-2xl hover:shadow-slate-900/[0.08] hover:border-[var(--accent)]/30 transition-all duration-500 h-full overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent)]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[var(--accent)]/[0.08] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative mb-6 flex items-start justify-between gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[var(--surface-warm)] border border-slate-200/70 text-[var(--accent)] flex items-center justify-center group-hover:bg-[var(--accent-soft)] group-hover:border-[var(--accent)]/25 transition-colors">
                        <Icon size={22} strokeWidth={1.7} />
                      </div>
                      <span className="font-display font-bold text-4xl leading-none text-slate-100 group-hover:text-[var(--accent)]/20 transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-[var(--ink)] leading-tight">
                      {title}
                    </h3>
                    <p className="mt-3 text-slate-500 text-sm md:text-[15px] leading-relaxed">
                      {body}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Service Standards ── */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* SLA metrics */}
            <div className="lg:col-span-3">
              <AnimateOnScroll animation="fade-up">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
                  Service levels
                </p>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)] mb-3">
                  Service expectations
                </h2>
                <p className="text-slate-500 leading-relaxed mb-10 max-w-lg">
                  SLAs are guidelines — complex commodities or peak port periods
                  may shift timelines. Your quote will call out any lane-specific
                  constraints.
                </p>
              </AnimateOnScroll>

              <div className="space-y-4">
                {slas.map((row, i) => {
                  const SlaIcon = row.icon;
                  return (
                    <AnimateOnScroll
                      key={row.metric}
                      animation="fade-up"
                      delay={i * 80}
                    >
                      <div className="group flex items-start gap-5 rounded-2xl border border-slate-200/80 bg-[var(--surface-warm)] p-6 hover:bg-white hover:shadow-lg hover:shadow-slate-900/5 hover:border-[var(--accent)]/20 transition-all duration-500">
                        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white border border-slate-200/60 text-[var(--accent)] flex items-center justify-center shadow-sm">
                          <SlaIcon size={20} strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                            <h4 className="font-display font-bold text-[var(--ink)]">
                              {row.metric}
                            </h4>
                            <span className="text-sm font-bold text-[var(--accent)] font-display">
                              {row.target}
                            </span>
                          </div>
                          <p className="text-sm text-slate-400 mt-1">
                            {row.note}
                          </p>
                        </div>
                      </div>
                    </AnimateOnScroll>
                  );
                })}
              </div>
            </div>

            {/* Data & confidentiality */}
            <AnimateOnScroll
              animation="slide-left"
              className="lg:col-span-2 lg:sticky lg:top-32"
            >
              <div className="rounded-3xl bg-[var(--navy)] text-white p-8 md:p-10 relative overflow-hidden">
                <div className="absolute inset-0 hero-grid opacity-[0.08]" aria-hidden />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--accent)]/10 rounded-full blur-[60px] pointer-events-none" aria-hidden />

                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                    <Lock className="text-[var(--accent)]" size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-4">
                    Data & confidentiality
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed">
                    Commercial terms, supplier names, and contract pricing shared
                    for quoting are used only for execution and held on a
                    need-to-know basis within operations.
                  </p>
                  <p className="text-white/65 text-sm leading-relaxed mt-4">
                    Ask for our mutual NDA template for tender work.
                  </p>

                  <div className="mt-8 pt-6 border-t border-white/10 flex items-start gap-3">
                    <ClipboardCheck
                      className="text-[var(--accent)] flex-shrink-0 mt-0.5"
                      size={18}
                    />
                    <p className="text-sm text-white/55">
                      Audit trails: request a shipment close-out pack with key
                      documents and milestone timestamps.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative py-24 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: "url('/hero-slide-2.webp')" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[var(--navy)]/40" aria-hidden />
        <div className="absolute inset-0 hero-grid opacity-[0.06]" aria-hidden />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--accent)]/8 rounded-full blur-[100px] pointer-events-none" aria-hidden />

        <Container className="relative text-center">
          <AnimateOnScroll animation="fade-up">
            <Truck
              className="mx-auto text-[var(--accent)] mb-6"
              size={36}
              strokeWidth={1.5}
            />
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white max-w-xl mx-auto">
              Experience the process on
              <span className="text-white/40"> your next lane</span>
            </h2>
            <p className="mt-4 text-white/55 max-w-md mx-auto leading-relaxed">
              One form starts the clock — we respond with a structured,
              itemised quote so you know exactly what you&apos;re paying for.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <CTAButton href="/quote" variant="primary" size="lg">
                Request a quote
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
