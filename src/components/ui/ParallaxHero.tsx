"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { CTAButton } from "@/components/design-system/CTAButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "@/lib/heroSlides";

const AUTO_ADVANCE_MS = 5000;

export function ParallaxHero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.4);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setSlide((s) => (s + 1) % HERO_SLIDES.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(t);
  }, []);

  const goTo = (index: number) => setSlide(index);
  const prev = () => setSlide((s) => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const next = () => setSlide((s) => (s + 1) % HERO_SLIDES.length);

  return (
    <section className="relative min-h-[76vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        ref={imageRef}
        className="absolute inset-0 -top-24 -bottom-24"
        style={{ transform: `translateY(${offset * 0.4}px)` }}
      >
        {HERO_SLIDES.map((item, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              i === slide ? "opacity-100 z-[1]" : "opacity-0 z-0 pointer-events-none"
            }`}
            aria-hidden={i !== slide}
          >
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover scale-105"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy)]/75 via-[var(--navy)]/55 to-[var(--navy)]/70" />

      {/* Content: two separate regions so text never sits behind buttons */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center flex-1 justify-center pt-16 pb-8">
        {/* Slide content only – centered in this block */}
        <div className="relative w-full text-center flex-shrink-0 min-h-[200px] sm:min-h-[240px] flex flex-col items-center justify-center">
          {HERO_SLIDES.map((item, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${
                i === slide
                  ? "opacity-100 visible z-10"
                  : "opacity-0 invisible z-0 pointer-events-none"
              }`}
              aria-hidden={i !== slide}
            >
              <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15] max-w-3xl mx-auto drop-shadow-lg">
                {item.headline}
              </h1>
              {item.subtext && (
                <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                  {item.subtext}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* CTAs – below slide text */}
        <div className="w-full flex-shrink-0 pt-8 sm:pt-10 pb-4 text-center">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <CTAButton href="/quote" variant="primary" size="md" className="btn-hover-lift text-sm sm:text-base">
              Request a Quote
            </CTAButton>
            <CTAButton href="/quote" variant="light" size="md" className="btn-hover-lift text-sm sm:text-base">
              Book Shipment
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === slide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
