import Image from "next/image";
import { CTAButton } from "@/components/design-system/CTAButton";
import { TrustBar } from "@/components/design-system/TrustBar";
import { SITE_SETTINGS } from "@/lib/mock";

export function Hero() {
  return (
    <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
      <Image
        src="/hero-logistics.png"
        alt="Premium 1 Logistics operations - Warehouses, vehicles, and cargo handling in Ghana and West Africa"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-slate-900/60" />
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-20 md:py-28 text-center">
        <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white tracking-tight leading-tight">
          {SITE_SETTINGS.tagline}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-2xl mx-auto">
          Reliable, transparent, and fast. We deliver end-to-end logistics solutions with full documentation readiness—from Ghana across West Africa to international corridors.
        </p>
        <TrustBar items={["Documentation Ready"]} className="mt-6 justify-center text-slate-300" />
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <CTAButton href="/quote" variant="primary" size="lg">Request a Quote</CTAButton>
          <CTAButton href="/quote" variant="light" size="lg">
            Book Shipment
          </CTAButton>
          <CTAButton href={SITE_SETTINGS.social.whatsapp} variant="secondary" size="lg" external>WhatsApp</CTAButton>
          <CTAButton href={`tel:${SITE_SETTINGS.phone}`} variant="ghost" size="lg" external className="text-white hover:bg-white/20">Call</CTAButton>
        </div>
      </div>
    </section>
  );
}
