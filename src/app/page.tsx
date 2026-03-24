import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { StatsBar } from "@/components/sections/StatsBar";
import { ProcessPreview } from "@/components/sections/ProcessPreview";
import { TestimonialsPreview } from "@/components/sections/TestimonialsPreview";
import { CTABanner } from "@/components/sections/CTABanner";
import { HomeTrustStrip, HomeVerticals, HomeCalendlyCTA } from "@/components/sections/HomeRichSections";

export default function Home() {
  return (
    <>
      <ParallaxHero />
      <StatsBar />
      <HomeVerticals />
      <ServicesPreview />
      <ProcessPreview />
      <TestimonialsPreview />
      <HomeTrustStrip />
      <HomeCalendlyCTA />
      <CTABanner />
    </>
  );
}
