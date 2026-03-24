import Image from "next/image";
import { Container, Section, CTAButton } from "@/components/design-system";
import { PageHero } from "@/components/page/PageHero";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { CAREERS_ROLES } from "@/lib/richContent";
import { siteConfig } from "@/lib/siteConfig";
import { ArrowRight, Briefcase, ChevronRight, Heart, TrendingUp, Users } from "lucide-react";

export const metadata = {
  title: "Careers | Premium 1 Logistics LTD",
  description: "Join Premium 1 Logistics — brokers, operators, and corridor specialists in Ghana.",
};

const perks = [
  { icon: TrendingUp, title: "Corridor exposure", body: "Work on live files across Tema, ECOWAS transit, and international main carriage." },
  { icon: Users, title: "Flat teams", body: "Senior brokers sit next to coordinators — no siloed call centres or distant management." },
  { icon: Heart, title: "Real benefits", body: "Comprehensive health cover, professional dues (where applicable), and training budget for certifications." },
  { icon: Briefcase, title: "Clear growth", body: "Structured paths from coordinator → team lead → function head based on performance, not tenure." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build logistics careers that mean something"
        description="We hire people who like fixing problems at borders, berths, and warehouses — not slide decks. If that is you, we want to talk."
        crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        backgroundImage="/hero-slide-2.webp"
      />

      {/* ── Culture & Perks ── */}
      <section className="relative py-24 md:py-32 bg-[var(--surface-warm)] overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
            <AnimateOnScroll animation="slide-right">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
                Our Culture
              </p>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)] mb-6">
                Operators first, <span className="text-slate-400">bureaucracy second.</span>
              </h2>
              <div className="prose-page">
                <p>
                  At Premium 1, you won&apos;t be a cog in a massive multinational machine. You will have real ownership of client files, direct access to leadership, and the autonomy to make decisions that keep supply chains moving.
                </p>
                <p>
                  We value grit, attention to detail, and a deep understanding of the West African logistics landscape. If you thrive under pressure and take pride in delivering when others make excuses, you&apos;ll fit right in.
                </p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="slide-left">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                <Image src="/careers-culture.webp" alt="Premium 1 Logistics team and workplace" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/40 to-transparent pointer-events-none" />
              </div>
            </AnimateOnScroll>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map(({ icon: Icon, title, body }, i) => (
              <AnimateOnScroll key={title} animation="fade-up" delay={i * 100}>
                <div className="group h-full rounded-3xl border border-slate-200/80 bg-white p-8 hover:shadow-xl hover:shadow-slate-900/5 hover:border-[var(--accent)]/30 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="w-12 h-12 rounded-2xl bg-[var(--surface-warm)] text-[var(--accent)] flex items-center justify-center mb-6 group-hover:bg-[var(--accent)] group-hover:text-white transition-colors duration-500">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[var(--ink)] mb-3">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{body}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Open Roles ── */}
      <section className="relative py-24 md:py-32 bg-white overflow-hidden">
        <Container>
          <div className="max-w-3xl mb-16">
            <AnimateOnScroll animation="fade-up">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
                Current Openings
              </p>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)] mb-4">
                Join the team
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Roles update frequently. Send your CV and cover letter to{" "}
                <a href={`mailto:${siteConfig.careersEmail}`} className="text-[var(--accent)] font-semibold hover:underline decoration-[var(--accent)]/30 underline-offset-4 transition-all">
                  {siteConfig.careersEmail}
                </a>{" "}
                with the role title in the subject line. We respond within five business days.
              </p>
            </AnimateOnScroll>
          </div>

          <div className="grid gap-4 max-w-4xl">
            {CAREERS_ROLES.map((r, i) => (
              <AnimateOnScroll key={r.title} animation="fade-up" delay={i * 80}>
                <div className="group rounded-2xl border border-slate-200/80 bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg hover:shadow-slate-900/5 hover:border-[var(--accent)]/30 transition-all duration-300">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-2">
                      <h3 className="font-display font-bold text-xl text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                        {r.title}
                      </h3>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-md">
                        {r.type}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
                      {r.summary}
                    </p>
                  </div>
                  <CTAButton 
                    href={`mailto:${siteConfig.careersEmail}?subject=${encodeURIComponent("Application: " + r.title)}`} 
                    external 
                    variant="outline" 
                    className="flex-shrink-0 whitespace-nowrap"
                  >
                    Apply now <ArrowRight className="ml-2 w-4 h-4" />
                  </CTAButton>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Speculative CTA (Dark) ── */}
      <section className="relative py-24 md:py-32 bg-[var(--navy)] text-white overflow-hidden text-center">
        <div className="absolute inset-0 hero-grid opacity-10" aria-hidden />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--accent)]/10 rounded-full blur-[100px] pointer-events-none" aria-hidden />
        
        <Container className="relative">
          <AnimateOnScroll animation="pop-up">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">
              Don&apos;t see a perfect fit?
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              Speculative applications are welcome. Tell us which corridor or function excites you — we create roles for exceptional operators who can drive the business forward.
            </p>
            <CTAButton href={`mailto:${siteConfig.careersEmail}`} external variant="primary" size="lg">
              Email your CV
            </CTAButton>
          </AnimateOnScroll>
        </Container>
      </section>
    </>
  );
}
