import Link from "next/link";
import { Container } from "@/components/design-system/Container";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function SiteCTA() {
  return (
    <section className="bg-[var(--surface-warm)] py-12 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/40 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <Container className="relative">
        <AnimateOnScroll animation="fade-up">
          <div className="rounded-3xl bg-[var(--navy)] text-white p-10 md:p-16 relative overflow-hidden shadow-2xl shadow-[var(--navy)]/10">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-[0.06] hero-grid pointer-events-none" aria-hidden />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[var(--accent)]/10 blur-[120px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12">
              <div className="max-w-xl">
                <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-5 tracking-tight">
                  Ready to streamline <br className="hidden sm:block" /> your logistics?
                </h2>
                <p className="text-white/75 text-lg leading-relaxed">
                  Partner with the experts in West African freight and supply chain solutions.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[var(--accent)] text-white font-bold hover:bg-[var(--accent-hover)] transition-all shadow-lg shadow-[var(--accent)]/20 hover:shadow-xl hover:-translate-y-1 text-lg"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
