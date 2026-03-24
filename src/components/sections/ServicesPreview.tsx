import { Container } from "@/components/design-system/Container";
import { ServiceCard } from "@/components/design-system/ServiceCard";
import { CTAButton } from "@/components/design-system/CTAButton";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { MOCK_SERVICES } from "@/lib/mock";

export function ServicesPreview() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[var(--surface-warm)]">
      {/* Premium background effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--navy)]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 md:mb-20">
          <AnimateOnScroll animation="fade-up" className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-[var(--accent)]" />
              <span className="text-xs font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
                Capabilities
              </span>
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[var(--ink)] tracking-tight leading-[1.1]">
              End-to-end logistics for <span className="text-slate-400">serious shippers.</span>
            </h2>
          </AnimateOnScroll>
          
          <AnimateOnScroll animation="fade-up" delay={100} className="flex-shrink-0 pb-2">
            <CTAButton href="/services" variant="outline" className="!rounded-full px-8">
              View all services
            </CTAButton>
          </AnimateOnScroll>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {MOCK_SERVICES.slice(0, 6).map((s, i) => (
            <AnimateOnScroll key={s.id} animation="pop-up" delay={i * 100}>
              <ServiceCard 
                name={s.name} 
                slug={s.slug} 
                description={s.description} 
                icon={s.icon} 
                variant="light"
                className="h-full"
              />
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}