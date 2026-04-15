import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { StatsBar } from "@/components/sections/StatsBar";
import { ProcessPreview } from "@/components/sections/ProcessPreview";
import { TestimonialsPreview } from "@/components/sections/TestimonialsPreview";
import { CTABanner } from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <>
      <ParallaxHero />
      <StatsBar />
      <ServicesPreview />
      <ProcessPreview />
      <TestimonialsPreview />
      <CTABanner />
    </>
  );
}
