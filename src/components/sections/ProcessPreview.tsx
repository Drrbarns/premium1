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
      className="relative py-24 md:py-32 overflow-hidden bg-fixed bg-center bg-cover text-white"
      style={{ backgroundImage: "url('/process-bg.webp')" }}
    >
      <div className="absolute inset-0 bg-[#0B1F3A]/18" aria-hidden />
      <div className="absolute inset-0 hero-grid opacity-10" aria-hidden />
      
      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <AnimateOnScroll animation="fade-up" className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-[var(--accent)]" />
              <span className="text-xs font-semibold tracking-[0.2em] text-[var(--accent)] uppercase">
                Our process
              </span>
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight leading-[1.1]">
              A transparent approach <br className="hidden md:block" />
              <span className="text-white/60">from quote to delivery.</span>
            </h2>
          </AnimateOnScroll>
          
          <AnimateOnScroll animation="fade-up" delay={100} className="flex-shrink-0 pb-2">
            <CTAButton href="/how-we-operate" variant="primary" className="!rounded-full px-8 border border-white/20">
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
                <div className="flex flex-col h-full rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-8 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1">
                  
                  {/* Step Number Background */}
                  <div className="absolute top-4 right-6 text-[6rem] font-display font-black leading-none text-white/[0.03] group-hover:text-[var(--accent)]/[0.1] transition-colors duration-500 pointer-events-none select-none">
                    0{i + 1}
                  </div>

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-[var(--accent)] mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-white">
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