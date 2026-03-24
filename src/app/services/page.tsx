import Image from "next/image";
import { Container, Section, ServiceCard, CTAButton } from "@/components/design-system";
import { PageHero } from "@/components/page/PageHero";
import { MOCK_SERVICES } from "@/lib/mock";
import { CheckCircle2, Layers, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Logistics Services | Premium 1 Logistics LTD",
  description:
    "Freight forwarding, customs clearance, warehousing, door-to-door delivery, and supply chain support across Ghana and West Africa.",
};

const reasons = [
  "Named operations contact per account",
  "Quotations with clear assumptions and exclusions",
  "Corridor experience from Tema to landlocked ECOWAS",
  "Documentation archived per shipment for audit",
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Every mode, every milestone—one accountable team"
        description="From the first booking to proof of delivery, we stitch together forwarding, clearance, storage, and haulage so you are not juggling disconnected vendors."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        backgroundImage="/services-hero.webp"
      />

      <Section background="cream" className="!pt-12 !pb-16 md:!pb-20">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-4 border-b border-slate-200/80">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">Full stack</p>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-[var(--ink)]">
                Seven service lines, infinite combinations
              </h2>
              <p className="mt-3 text-slate-600 text-lg">
                Select a card for workflows, FAQs, and how we differentiate on that product.
              </p>
            </div>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:gap-3 transition-all"
            >
              Not sure where to start? Request a scoped quote →
            </Link>
          </div>
        </Container>
      </Section>

      <Section background="cream" className="!pt-0 !pb-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {MOCK_SERVICES.map((s) => (
              <ServiceCard
                key={s.id}
                name={s.name}
                slug={s.slug}
                description={s.description}
                icon={s.icon}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-3xl bg-[var(--navy)] text-white p-10 md:p-12 overflow-hidden shadow-2xl shadow-slate-900/10">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/20 via-transparent to-transparent opacity-50" />
                <div className="absolute inset-0 hero-grid opacity-10" aria-hidden />
                
                <div className="relative z-10">
                  <Layers className="text-[var(--accent)] mb-8" size={40} strokeWidth={1.5} />
                  <h3 className="font-display font-bold text-2xl md:text-3xl mb-4">The Premium 1 Advantage</h3>
                  <p className="text-white/70 leading-relaxed text-lg mb-8">
                    Most clients combine clearance + haulage, or forwarding + warehousing. Tell us your pain point—we map the smallest, most efficient set of services to fix it.
                  </p>
                  
                  <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-4 bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] flex-shrink-0">
                        <span className="font-bold text-sm">01</span>
                      </div>
                      <p className="text-sm font-medium">Single SLA across all bundled services</p>
                    </div>
                    <div className="flex items-center gap-4 bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] flex-shrink-0">
                        <span className="font-bold text-sm">02</span>
                      </div>
                      <p className="text-sm font-medium">One dedicated operations owner</p>
                    </div>
                  </div>

                  <CTAButton href="/how-we-operate" variant="primary" className="w-full sm:w-auto">
                    Explore our process
                  </CTAButton>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-px bg-[var(--accent)]" />
                <span className="text-xs font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
                  Why teams choose us
                </span>
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-[var(--ink)] leading-[1.1] tracking-tight mb-8">
                Execution you can brief your CFO on.
              </h2>
              <div className="space-y-8">
                {reasons.map((r, i) => (
                  <div key={r} className="flex gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-colors duration-300">
                      <CheckCircle2 className="text-[var(--accent)] group-hover:text-white transition-colors" size={20} />
                    </div>
                    <div>
                      <p className="text-[var(--ink)] font-semibold text-lg mb-1 group-hover:text-[var(--accent)] transition-colors">{r}</p>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {i === 0 && "No bouncing between departments. Your assigned expert knows your cargo, your compliance history, and your deadlines."}
                        {i === 1 && "We separate our margin from pass-through charges. You see exactly what we earn versus what the market bills."}
                        {i === 2 && "Deep familiarity with Tema, Takoradi, and the complex transit bonds required for landlocked neighbors."}
                        {i === 3 && "Every milestone and document is captured in a clean audit trail, ready for your compliance team."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="cream" className="overflow-hidden">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-[var(--ink)] mb-6 tracking-tight">
              Premium 1 vs the status quo
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Not every shipment needs a premium operator—but when documentation, corridors, or OTIF stakes are high, the gaps show up fast. Here is how we are built differently.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Background glow for the Premium column */}
            <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-gradient-to-b from-[var(--accent)]/5 via-[var(--accent)]/10 to-[var(--accent)]/5 rounded-3xl blur-2xl pointer-events-none" />

            <div className="relative grid md:grid-cols-2 gap-8 md:gap-0">
              {/* Typical Forwarder Column */}
              <div className="rounded-3xl md:rounded-r-none border border-slate-200 bg-white/50 p-8 md:p-12 md:pr-16 z-10 opacity-70 hover:opacity-100 transition-opacity">
                <h3 className="font-display font-bold text-xl text-slate-500 mb-8 pb-4 border-b border-slate-200">
                  Typical forwarder
                </h3>
                <ul className="space-y-8">
                  {[
                    ["Accountability", "Rotating desk; context lost between shifts"],
                    ["Quotation", "Lump-sum quotes; surprises at destination"],
                    ["Corridor", "Often re-brokered at border"],
                    ["Data", "Ad-hoc WhatsApp only"],
                    ["Commercial", "Transactional only"],
                  ].map(([title, desc]) => (
                    <li key={title}>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{title}</p>
                      <p className="text-slate-600">{desc}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Premium 1 Column */}
              <div className="rounded-3xl border-2 border-[var(--accent)]/30 bg-white p-8 md:p-12 shadow-2xl shadow-[var(--accent)]/10 z-20 md:-ml-8 transform md:scale-[1.03]">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] rounded-t-3xl" />
                <h3 className="font-display font-bold text-2xl text-[var(--ink)] mb-8 pb-4 border-b border-slate-100 flex items-center justify-between">
                  Premium 1
                  <Sparkles className="text-[var(--accent)]" size={20} />
                </h3>
                <ul className="space-y-8">
                  {[
                    ["Accountability", "Named ops owner per file; single thread end-to-end"],
                    ["Quotation", "Line items + assumptions; re-rate triggers spelled out"],
                    ["Corridor", "ECOWAS transit bonds & escorts in-house"],
                    ["Data", "Milestone codes + close-out packs"],
                    ["Commercial", "Quarterly steering on volume accounts"],
                  ].map(([title, desc]) => (
                    <li key={title} className="relative">
                      <div className="absolute -left-6 top-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-1">{title}</p>
                      <p className="text-[var(--ink)] font-medium leading-relaxed">{desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-24 max-w-5xl mx-auto rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-xl shadow-slate-900/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-hover)] to-[var(--accent)]" />
            <div className="absolute -top-24 -right-20 w-72 h-72 bg-[var(--accent)]/10 rounded-full blur-[80px]" />

            <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">Pricing clarity</p>
                <h3 className="font-display font-bold text-3xl text-[var(--ink)] leading-tight">How we price</h3>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  You see exactly what is market cost and what is our service fee before you commit.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Transparent", "No hidden fees", "Lane-specific"].map((tag) => (
                    <span key={tag} className="px-3 py-1.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-xs font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-8 grid md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">What you pay for</p>
                  <p className="mt-2 text-[var(--ink)] font-medium leading-relaxed">
                    Service fee + pass-through charges (THC, duties, storage, carrier surcharges), separated line by line.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">How quotes are built</p>
                  <p className="mt-2 text-[var(--ink)] font-medium leading-relaxed">
                    Quotes are lane-specific and time-bound, so you are not locked into stale assumptions.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 md:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">For repeat customers</p>
                  <p className="mt-2 text-[var(--ink)] font-medium leading-relaxed">
                    Volume shipments can move to predictable retainer-style pricing. If you share a past invoice, we can benchmark and explain where savings can come from.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

    </>
  );
}
