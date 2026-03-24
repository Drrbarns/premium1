import Image from "next/image";
import { Container, Section, CTAButton } from "@/components/design-system";
import { PageHero } from "@/components/page/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SITE_SETTINGS } from "@/lib/mock";
import { siteConfig } from "@/lib/siteConfig";
import { ArrowRight, Clock, Globe, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";

export const metadata = {
  title: "Contact | Premium 1 Logistics LTD",
  description: "Contact Premium 1 Logistics — phone, WhatsApp, email, and quote requests.",
};

const cards = [
  {
    icon: Phone,
    label: "Phone Support",
    value: SITE_SETTINGS.phone,
    desc: "Call us for immediate assistance during business hours.",
    href: `tel:${SITE_SETTINGS.phone}`,
    action: "Call now",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Operations Desk",
    desc: "Instant messaging for active shipments and fast queries.",
    href: SITE_SETTINGS.social.whatsapp,
    action: "Open chat",
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: SITE_SETTINGS.email,
    desc: "General enquiries, partnerships, and document submissions.",
    href: `mailto:${SITE_SETTINGS.email}`,
    action: "Send email",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: "Accra, Ghana",
    desc: SITE_SETTINGS.address,
    href: "https://maps.google.com/?q=Accra+Ghana",
    action: "Get directions",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Speak with a logistics specialist"
        description={`Whether you have a live shipment, a tender, or a corridor you are exploring — we aim to respond within ${siteConfig.responseSlaHours} hours on business days and assign a named contact.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        backgroundImage="/hero-slide-1.png"
      />

      {/* ── Quick Contact Methods ── */}
      <section className="relative py-16 md:py-24 bg-[var(--surface-warm)] overflow-hidden">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, i) => (
              <AnimateOnScroll key={card.label} animation="fade-up" delay={i * 80}>
                <a
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  className="group flex flex-col h-full rounded-3xl bg-white border border-slate-200/80 p-8 hover:shadow-xl hover:shadow-slate-900/5 hover:border-[var(--accent)]/30 transition-all duration-500 overflow-hidden relative"
                >
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  
                  <div className="w-12 h-12 rounded-2xl bg-[var(--surface-warm)] text-[var(--accent)] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-500">
                    <card.icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[var(--ink)] mb-1">
                    {card.label}
                  </h3>
                  <p className="text-sm font-semibold text-[var(--accent)] mb-3">
                    {card.value}
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                    {card.desc}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                    {card.action} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Main Contact Area ── */}
      <section className="relative py-12 md:py-24 bg-[var(--surface-warm)] overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-[120px] pointer-events-none" aria-hidden />
        
        <Container className="relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Form Side */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <AnimateOnScroll animation="slide-right">
                <div className="rounded-3xl bg-white border border-slate-200/80 shadow-xl shadow-slate-900/5 p-8 md:p-12 lg:p-14 relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] rounded-t-3xl" />
                  
                  <div className="mb-10">
                    <h2 className="font-display font-bold text-3xl md:text-4xl text-[var(--ink)] mb-4 tracking-tight">
                      Send us a message
                    </h2>
                    <p className="text-slate-500 text-lg leading-relaxed">
                      For general enquiries, media, or partnership discussions. Need rates? It&apos;s faster to use our dedicated{" "}
                      <a href="/quote" className="text-[var(--accent)] font-semibold hover:underline decoration-[var(--accent)]/30 underline-offset-4 transition-all">
                        quote request form
                      </a>.
                    </p>
                  </div>
                  
                  <ContactForm />
                </div>
              </AnimateOnScroll>
            </div>

            {/* Info Side */}
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
              <AnimateOnScroll animation="fade-up" delay={100}>
                {/* Office Image Card */}
                <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 group">
                  <Image 
                    src="/contact-office.png" 
                    alt="Premium 1 Logistics office" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    sizes="(max-width: 1024px) 100vw, 50vw" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/90 via-[var(--navy)]/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe size={16} className="text-[var(--accent)]" />
                      <span className="font-bold text-xs uppercase tracking-wider text-[var(--accent)]">Ghana HQ</span>
                    </div>
                    <p className="font-display font-bold text-2xl">Accra Operations Center</p>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-up" delay={150}>
                {/* Operating Hours Card */}
                <div className="rounded-3xl bg-[var(--navy)] text-white p-8 border border-white/10 shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 hero-grid opacity-10" aria-hidden />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/20 rounded-full blur-[40px] pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center flex-shrink-0 border border-[var(--accent)]/10">
                      <Clock size={24} strokeWidth={1.5} />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-baseline gap-3 mb-4">
                        <h3 className="font-display font-bold text-xl text-white">Operating hours</h3>
                        <span className="text-[var(--accent)] text-xs font-bold tracking-widest uppercase">GMT</span>
                      </div>
                      <div className="space-y-2.5 text-sm">
                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                          <span className="font-medium text-white/80">Mon – Fri</span>
                          <span className="font-display font-bold text-white">8:00 – 18:00</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                          <span className="font-medium text-white/80">Saturday</span>
                          <span className="font-display font-bold text-white">9:00 – 14:00</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="font-medium text-white/80">Sunday</span>
                          <span className="font-semibold italic text-white/40">Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fade-up" delay={200}>
                {/* Map Card */}
                <div className="rounded-3xl overflow-hidden h-[240px] shadow-lg border border-slate-200/80 bg-white p-2">
                  <div className="w-full h-full rounded-2xl overflow-hidden relative group bg-slate-100">
                    <iframe
                      title="Office location"
                      src={siteConfig.mapEmbedUrl}
                      className="w-full h-full border-0 filter grayscale-[20%] contrast-110 opacity-90 group-hover:filter-none group-hover:opacity-100 transition-all duration-700"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
            
          </div>
        </Container>
      </section>

      {/* ── First Message Guide (Dark) ── */}
      <section className="relative py-24 md:py-32 bg-[var(--navy)] text-white overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-10" aria-hidden />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[var(--accent)]/10 rounded-full blur-[100px] pointer-events-none" aria-hidden />
        
        <Container className="relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimateOnScroll animation="slide-right">
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-6 tracking-tight">
                What to include in your <span className="text-[var(--accent)]">first message</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                Help us give you an accurate answer on the first reply. Whether emailing or messaging us, providing these details accelerates the process.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Origin and destination (city / port / ICD)",
                  "Commodity type, approximate weight and volume",
                  "Target delivery window and Incoterms if known",
                  "Any permits, L/C, or inspection requirements",
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-center rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center font-bold text-sm shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-white/90 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="slide-left">
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-10 md:p-14 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--accent)]/20 rounded-full blur-[50px]" />
                <Send className="text-[var(--accent)] mb-8" size={40} strokeWidth={1.5} />
                <h3 className="font-display font-bold text-3xl mb-5">
                  Need a structured quote?
                </h3>
                <p className="text-white/60 leading-relaxed mb-10 text-lg">
                  For the fastest turnaround, use our multi-step quote form. It captures cargo, routing, and contact details in one thread so operations can build your quote immediately.
                </p>
                <CTAButton href="/quote" variant="primary" size="lg" className="w-full sm:w-auto">
                  Open quote form <ArrowRight className="ml-2 w-5 h-5" />
                </CTAButton>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>
    </>
  );
}
