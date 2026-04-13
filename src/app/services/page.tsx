import Image from "next/image";
import { Container, Section, ServiceCard, CTAButton } from "@/components/design-system";
import { PageHero } from "@/components/page/PageHero";
import { MOCK_SERVICES } from "@/lib/mock";
import { CheckCircle2, Layers, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Logistics Services | Premium 1 Logistics LTD",
  description:
    "Freight forwarding, ship agency, customs clearance, warehousing, door-to-door delivery, and supply chain support across Ghana and West Africa.",
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
                Eight service lines, infinite combinations
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

      <Section background="white" className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: "url('/services-hero.webp')" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[var(--navy)]/30" aria-hidden />
        <div className="absolute inset-0 hero-grid opacity-[0.08]" aria-hidden />
        <Container className="relative">
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
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-[1.1] tracking-tight mb-8">
                Execution you can brief your CFO on.
              </h2>
              <div className="space-y-8">
                {reasons.map((r, i) => (
                  <div key={r} className="flex gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-colors duration-300">
                      <CheckCircle2 className="text-[var(--accent)] group-hover:text-white transition-colors" size={20} />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg mb-1 group-hover:text-[var(--accent)] transition-colors">{r}</p>
                      <p className="text-white/75 text-sm leading-relaxed">
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

          <div className="mt-24 max-w-6xl mx-auto relative">
            <div className="absolute -top-10 left-10 right-10 h-24 bg-[var(--accent)]/10 blur-[70px] pointer-events-none" aria-hidden />
            <div className="relative rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_30px_80px_-40px_rgba(2,6,23,0.35)] overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-hover)] to-[var(--accent)]" />

              <div className="grid xl:grid-cols-12">
                <div className="xl:col-span-4 bg-[var(--navy)] text-white p-8 md:p-10 xl:p-12 relative overflow-hidden">
                  <div className="absolute inset-0 hero-grid opacity-[0.08]" aria-hidden />
                  <div className="absolute -right-20 -top-20 w-52 h-52 rounded-full bg-[var(--accent)]/20 blur-[70px]" aria-hidden />
                  <div className="relative">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-3">Pricing clarity</p>
                    <h3 className="font-display font-bold text-3xl leading-tight">How we price</h3>
                    <p className="mt-4 text-white/75 leading-relaxed">
                      We separate market costs from our operating fee so commercial decisions stay clear before booking.
                    </p>
                    <div className="mt-7 space-y-3">
                      {["Transparent structure", "No hidden add-ons", "Lane-specific validity"].map((tag) => (
                        <div key={tag} className="flex items-center gap-3 text-sm text-white/90">
                          <span className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_0_4px_rgba(46,196,182,0.18)]" />
                          <span>{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="xl:col-span-8 p-6 md:p-8 xl:p-10 bg-[var(--surface-warm)]/35">
                  <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">What you pay for</p>
                      <p className="text-[var(--ink)] leading-relaxed">
                        Service fee plus pass-through charges (THC, duties, storage, line surcharges), itemized line by line.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 mb-2">How quotes are built</p>
                      <p className="text-[var(--ink)] leading-relaxed">
                        Quotations are lane-specific and time-bound with assumptions called out, so there is no stale pricing ambiguity.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-slate-200/80 bg-white p-6 md:p-7 shadow-sm">
                    <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">For repeat customers</p>
                      <span className="text-xs font-semibold text-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1.5 rounded-full">
                        Volume-friendly
                      </span>
                    </div>
                    <p className="text-[var(--ink)] leading-relaxed">
                      Recurring volumes can move to predictable retainer-style pricing. Share a previous invoice and we will benchmark,
                      flag savings opportunities, and show where service-level improvements drive value.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

    </>
  );
}
