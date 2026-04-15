"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/design-system/Container";
import { CTAButton } from "@/components/design-system/CTAButton";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SITE_SETTINGS } from "@/lib/mock";
import { ArrowRight, MessageCircle } from "lucide-react";

export function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const centered = (progress - 0.5) * 2;
      setOffset(centered * 28);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[var(--navy)] py-16 text-white sm:py-20 md:py-28 lg:py-32">
      <div className="absolute inset-0 -top-16 -bottom-16" style={{ transform: `translateY(${offset}px)` }} aria-hidden>
        <Image
          src="/hero-slide-1.webp"
          alt="Logistics background"
          fill
          className="object-cover pointer-events-none"
          sizes="100vw"
          quality={75}
        />
      </div>
      
      <div className="absolute inset-0 bg-[#0B1F3A]/40 pointer-events-none" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)] via-[var(--navy)]/60 to-transparent pointer-events-none" aria-hidden />
      <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" aria-hidden />
      
      <Container className="relative z-10">
        <AnimateOnScroll animation="pop-up" className="mx-auto max-w-4xl px-0 text-center">
          <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Ready to move <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">your cargo?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-light leading-relaxed text-white/70 sm:mt-8 sm:text-lg md:text-xl lg:text-2xl">
            Request a quote, book a shipment, or reach us on WhatsApp for immediate support.
          </p>
          <div className="mx-auto mt-8 flex max-w-md flex-col items-stretch justify-center gap-3 sm:mt-12 sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:gap-6">
            <CTAButton href="/quote" variant="primary" size="lg" className="group w-full justify-center rounded-full px-8 py-3.5 text-base shadow-xl shadow-[var(--accent)]/20 sm:w-auto sm:px-10 sm:py-4 sm:text-lg">
              Request a Quote <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </CTAButton>
            <CTAButton href={SITE_SETTINGS.social.whatsapp} variant="light" size="lg" external className="group w-full justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-base backdrop-blur-md hover:bg-white/20 sm:w-auto sm:px-10 sm:py-4 sm:text-lg">
              <MessageCircle className="mr-2" size={20} /> WhatsApp Us
            </CTAButton>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}