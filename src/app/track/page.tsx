import Image from "next/image";
import { Container, Section, CTAButton } from "@/components/design-system";
import { PageHero } from "@/components/page/PageHero";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { TrackLookup } from "@/components/track/TrackLookup";
import {
  BarChart3,
  Bell,
  CheckCircle2,
  Clock,
  Code2,
  FileSearch,
  FileText,
  Lock,
  Map,
  Package,
  ShieldCheck,
  Smartphone,
  Truck,
  Zap,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Track Shipments | Premium 1 Logistics LTD",
  description:
    "Client visibility portal for milestones, documents, and POD — rolling out for account holders.",
};

const roadmap = [
  {
    phase: "Phase 1 (Live)",
    title: "Proactive Comms",
    items: [
      "Milestone emails & WhatsApp digests",
      "Named ops contact per file",
      "Document close-out packs on request",
      "Exception alerts with options",
    ],
  },
  {
    phase: "Phase 2 (Q2 2025)",
    title: "Client Portal",
    items: [
      "Secure web login with shipment list",
      "Download cleared docs & PODs",
      "Push notifications for customs events",
      "Live vessel and truck ETA feeds",
    ],
  },
  {
    phase: "Phase 3 (Q3 2025)",
    title: "Enterprise Integrations",
    items: [
      "API webhooks for your ERP/TMS",
      "Role-based access for finance vs. ops",
      "SLA dashboard for enterprise accounts",
      "Carbon emissions reporting per lane",
    ],
  },
];

const features = [
  {
    icon: Bell,
    title: "Leg-based updates",
    description:
      "We push updates for key milestones: Sailed, Arrived at port, Under clearance, Released, Out for delivery, and POD.",
  },
  {
    icon: FileSearch,
    title: "Document vault",
    description:
      "Stop searching through email threads. Request a zipped close-out pack with all invoices, B/Ls, and declarations tied to your file.",
  },
  {
    icon: Smartphone,
    title: "WhatsApp ops line",
    description:
      "A dedicated channel for active files. It keeps the noise down, response times up, and urgent issues visible to the right people immediately.",
  },
  {
    icon: Package,
    title: "Single file reference",
    description:
      "Every booking gets one master reference. Quote it on any communication, and our team instantly pulls the full context.",
  },
];

export default function TrackPage() {
  return (
    <>
      <PageHero
        eyebrow="Visibility"
        title="Shipment visibility built for operators, not gimmicks"
        description="We are rolling out a secure client area for active account holders. Until your login is provisioned, you get the same milestones through email and WhatsApp with full audit trails."
        crumbs={[{ label: "Home", href: "/" }, { label: "Track" }]}
        backgroundImage="/hero-logistics.webp"
      />

      {/* ── Live Tracking Lookup ── */}
      <section className="relative py-16 md:py-20 bg-[var(--surface-warm)]">
        <Container>
          <div className="max-w-3xl mx-auto">
            <AnimateOnScroll animation="fade-up">
              <h2 className="font-display font-bold text-2xl md:text-3xl text-[var(--ink)] text-center mb-2">
                Track Your Shipment
              </h2>
              <p className="text-center text-slate-500 mb-8">
                Enter your shipment or inquiry reference number to see real-time status and milestones.
              </p>
              <TrackLookup />
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* ── Active Tracking Experience ── */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimateOnScroll animation="fade-up" className="order-2 lg:order-1">
              <div className="relative rounded-3xl border border-slate-200/80 bg-[var(--surface-warm)] p-2">
                <div className="rounded-2xl overflow-hidden relative aspect-[4/3] bg-white border border-slate-100 shadow-inner">
                  {/* Faux Interface */}
                  <div className="absolute top-0 left-0 right-0 h-14 bg-slate-50 border-b border-slate-100 flex items-center px-6 justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="h-6 w-32 bg-slate-200 rounded-md" />
                  </div>
                  <div className="p-8 pt-20">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <p className="text-xs font-bold uppercase text-[var(--accent)] tracking-wider">
                          File Ref: P1-8842-GH
                        </p>
                        <h4 className="text-xl font-display font-bold text-[var(--ink)] mt-1">
                          Shanghai → Tema DC
                        </h4>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-sm font-semibold">
                        In Transit
                      </span>
                    </div>

                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[var(--accent)] before:to-slate-200">
                      {[
                        { time: "Oct 12, 08:00", text: "Vessel departed origin", active: true },
                        { time: "Oct 28, 14:30", text: "Arrived at Tema anchorage", active: true },
                        { time: "Oct 30, 09:15", text: "Customs clearance initiated", active: true },
                        { time: "Est. Nov 02", text: "Out for final delivery", active: false },
                      ].map((step, i) => (
                        <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-200 shrink-0 md:order-1 md:group-odd:-ml-5 md:group-even:-mr-5 shadow-sm z-10"
                            style={{ backgroundColor: step.active ? 'var(--accent)' : '#e2e8f0' }}
                          >
                            {step.active ? <CheckCircle2 size={16} className="text-white" /> : <Clock size={14} className="text-slate-400" />}
                          </div>
                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                            <p className="font-semibold text-sm text-[var(--ink)]">{step.text}</p>
                            <p className="text-xs text-slate-500 mt-1">{step.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="slide-left" className="order-1 lg:order-2 lg:pl-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
                What you get today
              </p>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)] mb-6">
                No more guessing where your cargo is.
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-8">
                While our self-serve portal is in development, we run a tight, proactive ops desk. We don&apos;t wait for you to ask; we push the updates you need, when you need them.
              </p>

              <div className="space-y-6">
                {features.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
                        <Icon size={20} strokeWidth={2} />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-[var(--ink)] text-lg">
                          {feature.title}
                        </h4>
                        <p className="text-slate-500 text-sm leading-relaxed mt-1">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* ── Security & Integration (Dark) ── */}
      <section className="relative py-24 md:py-32 bg-[var(--navy)] text-white overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-10" aria-hidden />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none" aria-hidden />

        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl">
              Enterprise-grade <span className="text-[var(--accent)]">data compliance</span>
            </h2>
            <p className="mt-4 text-white/60 leading-relaxed text-lg">
              When the portal goes live, it will meet the strict security and integration requirements of global procurement teams.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Lock,
                title: "Security First",
                desc: "Verified company domains, optional 2FA, and strict role separation. Junior staff never see commercial rates. Penetration testing required before GA.",
              },
              {
                icon: Code2,
                title: "API Webhooks",
                desc: "Don't want to log in? We will push milestones directly into your ERP or TMS (SAP, Oracle, CargoWise) via secure webhooks.",
              },
              {
                icon: ShieldCheck,
                title: "Audit Trails",
                desc: "Immutable logs of every document uploaded, customs status change, and milestone achieved. Vital for compliance and insurance claims.",
              },
            ].map((item, i) => (
              <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center mb-6">
                    <item.icon size={24} />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Roadmap ── */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <AnimateOnScroll animation="fade-up">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="text-[var(--accent)]" size={28} />
                <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)]">
                  Visibility Roadmap
                </h2>
              </div>
              <p className="text-slate-500 max-w-xl text-lg">
                We are actively building the digital tools our high-volume clients have requested, phasing rollouts to ensure stability.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={100}>
              <CTAButton variant="outline" href="/contact">
                Request Beta Access
              </CTAButton>
            </AnimateOnScroll>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {roadmap.map((col, i) => {
              const isActive = i === 0;
              return (
                <AnimateOnScroll key={col.phase} animation="fade-up" delay={i * 100}>
                  <div
                    className={`relative rounded-3xl border p-8 md:p-10 h-full transition-all duration-300 ${
                      isActive
                        ? "bg-[var(--surface-warm)] border-[var(--accent)]/30 shadow-lg shadow-[var(--accent)]/5"
                        : "bg-white border-slate-200/80 hover:border-[var(--accent)]/30 hover:shadow-md"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                        Current
                      </div>
                    )}
                    <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${isActive ? 'text-[var(--accent)]' : 'text-slate-400'}`}>
                      {col.phase}
                    </p>
                    <h3 className="font-display font-bold text-2xl text-[var(--ink)] mb-6">
                      {col.title}
                    </h3>
                    <ul className="space-y-4">
                      {col.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2
                            size={18}
                            className={`flex-shrink-0 mt-0.5 ${isActive ? 'text-[var(--accent)]' : 'text-slate-300'}`}
                          />
                          <span className={`text-sm ${isActive ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Bottom CTA ── */}
      <Section background="muted" className="text-center">
        <Container>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)] max-w-2xl mx-auto">
            Ready to experience reliable logistics?
          </h2>
          <p className="mt-4 text-slate-600 max-w-lg mx-auto text-lg">
            Let&apos;s start with a single shipment. Request a quote and see our proactive communication in action.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <CTAButton href="/quote" variant="primary" size="lg">
              Get a quote
            </CTAButton>
            <CTAButton href="/contact" variant="outline" size="lg">
              Contact sales
            </CTAButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
