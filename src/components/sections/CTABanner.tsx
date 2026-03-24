import Image from "next/image";
import { Container } from "@/components/design-system/Container";
import { CTAButton } from "@/components/design-system/CTAButton";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SITE_SETTINGS } from "@/lib/mock";

export function CTABanner() {
  return (
    <section className="relative py-24 md:py-28 text-white overflow-hidden bg-[var(--navy)]">
      {/* Background Image */}
      <Image
        src="/hero-logistics.png"
        alt="Logistics background"
        fill
        className="object-cover pointer-events-none"
        sizes="100vw"
        quality={75}
      />
      
      {/* 40% Overlay */}
      <div className="absolute inset-0 bg-[#0B1F3A]/60 pointer-events-none" aria-hidden />
      
      {/* Subtle grid pattern for texture */}
      <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" aria-hidden />
      
      <Container className="relative z-10">
        <AnimateOnScroll animation="pop-up" className="text-center max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">Ready to Move Your Cargo?</h2>
          <p className="mt-6 text-white/70 text-lg md:text-xl leading-relaxed">
            Request a quote, book a shipment, or reach us on WhatsApp for immediate support.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <CTAButton href="/quote" variant="primary" size="lg" className="btn-hover-lift">
              Request a Quote
            </CTAButton>
            <CTAButton href={SITE_SETTINGS.social.whatsapp} variant="light" size="lg" external className="btn-hover-lift">
              WhatsApp
            </CTAButton>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
