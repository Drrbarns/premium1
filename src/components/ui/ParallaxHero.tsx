"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/design-system/CTAButton";
import { cn } from "@/lib/utils";

const HERO_IMAGES = [
  "/hero-logistics.webp",
  "/hero-slide-2.webp",
  "/hero-slide-1.webp",
];

export function ParallaxHero() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-[var(--navy)] sm:min-h-[90vh] md:min-h-[100vh]">
      {/* Background Images with Crossfade */}
      {HERO_IMAGES.map((src, idx) => {
        const isCurrent = idx === currentIdx;
        const isPrev = idx === (currentIdx - 1 + HERO_IMAGES.length) % HERO_IMAGES.length;
        
        return (
          <div
            key={src}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1500ms] ease-in-out",
              isCurrent ? "opacity-100 z-10" : isPrev ? "opacity-100 z-0" : "opacity-0 -z-10"
            )}
          >
            <Image
              src={src}
              alt={`Logistics hero background ${idx + 1}`}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        );
      })}

      {/* Uniform 20% Overlay */}
      <div className="absolute inset-0 bg-[var(--navy)]/20 z-10" />

      {/* Main Content */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl min-w-0 flex-col items-center px-4 pb-14 pt-[calc(5.5rem+env(safe-area-inset-top,0px))] text-center sm:px-6 md:pb-24 md:pt-32 lg:px-8">
        
        {/* Floating Accent Badge */}
        <div className="animate-fade-up mb-6 inline-flex max-w-[min(100%,22rem)] flex-wrap items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md sm:mb-8 sm:max-w-none sm:gap-3 sm:px-5 sm:py-2.5">
          <span className="flex h-2 w-2 shrink-0 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="text-center text-[10px] font-semibold uppercase tracking-wider text-white/80 sm:text-xs sm:tracking-widest md:text-sm">
            Global Supply Chain Excellence
          </span>
        </div>

        {/* Hero Typography */}
        <h1 className="animate-fade-up mx-auto max-w-5xl font-display text-[1.65rem] font-bold leading-[1.12] tracking-tight text-white sm:text-4xl sm:leading-[1.1] md:text-5xl md:leading-[1.08] lg:text-6xl xl:text-[5.25rem] xl:leading-[1.05]" style={{ animationDelay: "100ms" }}>
          Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[#60E0D4]">Your Freight</span>
          <br className="hidden sm:block" /> Moves With Confidence.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-base font-light leading-relaxed text-white/70 sm:mt-8 sm:text-lg md:text-xl" style={{ animationDelay: "200ms" }}>
          Freight forwarding, customs clearance, door-to-door delivery, and ship agency — executed transparently, compliantly, and precisely on schedule.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex w-full max-w-md flex-col items-stretch justify-center gap-3 animate-fade-up sm:mt-12 sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:gap-5 md:gap-6" style={{ animationDelay: "300ms" }}>
          <CTAButton href="/quote" variant="primary" size="lg" className="btn-hover-lift w-full justify-center space-x-2 px-6 py-3.5 text-sm sm:w-auto sm:px-8 sm:py-4 sm:text-base">
            <span>Request a Quote</span>
            <ArrowRight size={18} />
          </CTAButton>
          <CTAButton href="/contact" variant="outline" size="lg" className="btn-hover-lift w-full justify-center bg-white/5 px-6 py-3.5 text-sm backdrop-blur-sm sm:w-auto sm:px-8 sm:py-4 sm:text-base border-white/20 text-white hover:bg-white/10">
            Speak to a Specialist
          </CTAButton>
        </div>

        {/* Key Stats / Trust Indicators below hero */}
      </div>
      
      {/* Decorative Slide Indicators */}
      <div className="absolute left-8 md:left-12 bottom-1/2 -translate-y-1/2 z-20 flex flex-col gap-3 hidden lg:flex">
        {HERO_IMAGES.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentIdx(i)}
            className={cn(
              "w-1.5 rounded-full transition-all duration-300",
              i === currentIdx ? "h-8 bg-[var(--accent)]" : "h-2 bg-white/20 hover:bg-white/40"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
