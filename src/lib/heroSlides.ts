export type HeroSlide = {
  headline: string;
  subtext: string;
  image: string;
  imageAlt: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    headline: "Freight Forwarding, Customs Clearance, Doors to Door & Ship Agency",
    subtext:
      "Reliable, transparent, and fast. We deliver end-to-end logistics with full documentation readiness for international trade.",
    image: "/insights-featured.webp",
    imageAlt: "Logistics professionals coordinating live shipment operations",
  },
  {
    headline: "Freight Forwarding, Customs Clearance & Door-to-Door Delivery",
    subtext:
      "One trusted partner from origin to destination. Air, sea, and road—with the expertise and capacity to move your cargo.",
    image: "/hero-slide-2.webp",
    imageAlt: "Port at sunset — vessels, cranes, and active cargo handling",
  },
  {
    headline: "Ready When You Are—Quotes, Tracking & Support",
    subtext:
      "Request a quote, track your shipment, or reach out to our team. We keep you informed at every step.",
    image: "/hero-slide-1.webp",
    imageAlt: "Container ship and port operations — global maritime freight",
  },
];
