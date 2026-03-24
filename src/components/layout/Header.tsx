"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CTAButton } from "@/components/design-system/CTAButton";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/how-we-operate", label: "Process" },
  { href: "/coverage", label: "Coverage" },
  { href: "/track", label: "Track" },
  { href: "/insights", label: "Insights" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-[var(--navy)]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-3" 
          : "bg-[var(--navy)]/40 backdrop-blur-sm border-b border-transparent py-5 md:py-6"
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 xl:px-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center"
          >
            <Image
              src="/premium1-logo.png"
              alt="Premium 1 Logistics LTD"
              width={220}
              height={90}
              className="h-10 w-auto md:h-12 transition-transform group-hover:scale-[1.02]"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors px-2"
            >
              Contact
            </Link>
            <CTAButton href="/quote" variant="primary" size="sm" className="!rounded-full px-6">
              Get a Quote
            </CTAButton>
          </div>

          <button
            className="lg:hidden p-2 rounded-full text-white hover:bg-white/10 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {open && (
          <div className="absolute top-full left-0 right-0 bg-[var(--navy)]/95 backdrop-blur-xl border-b border-white/10 p-6 shadow-2xl lg:hidden animate-fade-down">
            <nav className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="py-3 px-4 rounded-xl text-white/90 hover:bg-white/10 font-medium transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="py-3 px-4 rounded-xl text-white/90 hover:bg-white/10 font-medium transition-colors"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
            </nav>
            <div className="mt-6 pt-6 border-t border-white/10">
              <CTAButton href="/quote" variant="primary" size="md" className="w-full justify-center !rounded-xl">
                Request a Quote
              </CTAButton>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
