import { Container } from "@/components/design-system/Container";
import { CTAButton } from "@/components/design-system/CTAButton";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { FileText, ClipboardCheck, Ship, MapPin } from "lucide-react";

const steps = [
  { icon: FileText, title: "Submit Inquiry", description: "Share your cargo details, origin, destination, and requirements via our quote form." },
  { icon: ClipboardCheck, title: "Receive Quote", description: "Our team reviews and sends a detailed quotation within 24–48 hours." },
  { icon: Ship, title: "Book & Document", description: "Confirm booking and upload required documents. We handle customs and clearance." },
  { icon: MapPin, title: "Track & Deliver", description: "Monitor your shipment and receive delivery confirmation." },
];

export function ProcessPreview() {
  return (
    <section 
      className="relative overflow-hidden bg-cover bg-center bg-scroll py-20 text-white md:bg-fixed md:py-28 lg:py-32"
      style={{ backgroundImage: "url('/hero-slide-2.webp')" }}
    >
      <div className="absolute inset-0 bg-[#0B1F3A]/60" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,31,58,0.8)_100%)]" aria-hidden />
      <div className="absolute inset-0 hero-grid opacity-[0.08]" aria-hidden />
      
      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <AnimateOnScroll animation="fade-up" className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-[var(--accent)]" />
              <span className="text-xs font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
                Our process
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl">
              A transparent approach <br className="hidden md:block" />
              <span className="text-white/60">from quote to delivery.</span>
            </h2>
          </AnimateOnScroll>
          
          <AnimateOnScroll animation="fade-up" delay={100} className="flex-shrink-0 pb-2">
            <CTAButton href="/how-we-operate" variant="primary" className="!rounded-full px-8 border border-[var(--accent)]/20">
              See full process
            </CTAButton>
          </AnimateOnScroll>
        </div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-white/10 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-transparent w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
          </div>
          
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <AnimateOnScroll key={i} animation="fade-up" delay={i * 150} className="relative group z-10">
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[var(--accent)]/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-[var(--accent)]/10 sm:rounded-3xl sm:p-8 md:hover:-translate-y-2">
                  
                  {/* Step Number Background */}
                  <div className="pointer-events-none absolute right-4 top-3 select-none font-display text-[3.5rem] font-black leading-none text-white/[0.04] transition-colors duration-500 group-hover:text-[var(--accent)]/[0.1] sm:right-6 sm:top-4 sm:text-[5rem] lg:text-[6rem]">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-[var(--accent)] mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-white shadow-lg">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-[var(--accent)] transition-colors">
                      {step.title}
                    </h3>
                    
                    <p className="text-white/70 leading-relaxed text-[15px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}