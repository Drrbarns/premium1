import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/design-system/Container";
import { SITE_SETTINGS } from "@/lib/mock";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/how-we-operate", label: "How We Operate" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
  { href: "/insights", label: "Insights & News" },
];

const resourceLinks = [
  { href: "/track", label: "Track Shipment" },
  { href: "/quote", label: "Request a Quote" },
  { href: "/coverage", label: "Coverage Area" },
  { href: "/testimonials", label: "Client Success" },
];

const serviceLinks = [
  { href: "/services/freight-forwarding", label: "Freight Forwarding" },
  { href: "/services/customs-clearance", label: "Customs Clearance" },
  { href: "/services/warehousing-distribution", label: "Warehousing" },
  { href: "/services/door-to-door-delivery", label: "Door-to-Door" },
  { href: "/services", label: "View All Services" },
];

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
];

export function Footer() {
  return (
    <footer className="relative bg-[var(--navy)] text-slate-300 overflow-hidden border-t border-white/5">
      {/* Decorative Background Elements */}
      <div
        className="absolute inset-0 opacity-[0.03] hero-grid pointer-events-none"
        style={{ backgroundSize: "64px 64px" }}
        aria-hidden
      />
      <div className="absolute top-0 right-0 w-[420px] h-[420px] md:w-[600px] md:h-[600px] rounded-full bg-[var(--accent)]/5 blur-[120px] md:blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[340px] h-[340px] md:w-[500px] md:h-[500px] rounded-full bg-white/5 blur-[100px] md:blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Main Footer Content */}
        <div className="pt-14 md:pt-16 pb-10 md:pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 pr-0 lg:pr-4">
            <Link href="/" className="inline-flex items-center mb-6">
              <Image
                src="/premium1-logo.png"
                alt="Premium 1 Logistics LTD"
                width={623}
                height={569}
                className="h-14 w-auto md:h-20"
              />
            </Link>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-md">
              {SITE_SETTINGS.tagline} End-to-end freight, clearance, and distribution tailored for serious shippers.
            </p>
            
            {/* Contact Info */}
            <ul className="space-y-4 text-sm mb-8">
              <li className="flex items-center gap-3 text-slate-300">
                <Phone size={18} className="text-[var(--accent)]" />
                <a href={`tel:${SITE_SETTINGS.phone}`} className="hover:text-white transition-colors">
                  {SITE_SETTINGS.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Mail size={18} className="text-[var(--accent)] flex-shrink-0" />
                <span className="flex flex-col gap-1">
                  <a href={`mailto:${SITE_SETTINGS.email}`} className="hover:text-white transition-colors">
                    {SITE_SETTINGS.email}
                  </a>
                  <a href={`mailto:${SITE_SETTINGS.operationsEmail}`} className="hover:text-white transition-colors">
                    {SITE_SETTINGS.operationsEmail}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <MapPin size={18} className="text-[var(--accent)] flex-shrink-0 mt-1" />
                <span className="max-w-[260px]">{SITE_SETTINGS.address}</span>
              </li>
            </ul>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-6">Company</h4>
              <ul className="space-y-4">
                {companyLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-slate-400 hover:text-[var(--accent)] transition-colors inline-flex items-center group">
                      <span className="group-hover:translate-x-1 transition-transform">{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-6">Services</h4>
              <ul className="space-y-4">
                {serviceLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-slate-400 hover:text-[var(--accent)] transition-colors inline-flex items-center group">
                      <span className="group-hover:translate-x-1 transition-transform">{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-6">Resources</h4>
              <ul className="space-y-4">
                {resourceLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-slate-400 hover:text-[var(--accent)] transition-colors inline-flex items-center group">
                      <span className="group-hover:translate-x-1 transition-transform">{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-7 md:py-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-5 md:gap-6">
          <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center lg:justify-start text-sm">
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="text-slate-500 hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <a href={SITE_SETTINGS.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[var(--accent)] hover:text-white transition-colors">
              <Linkedin size={18} />
            </a>
            <a href={SITE_SETTINGS.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[var(--accent)] hover:text-white transition-colors">
              <Facebook size={18} />
            </a>
            <a href={SITE_SETTINGS.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[var(--accent)] hover:text-white transition-colors">
              <Instagram size={18} />
            </a>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pb-7 md:pb-8 text-center lg:text-left text-xs text-slate-600 flex flex-col md:flex-row justify-between items-center gap-2">
          <span>© {new Date().getFullYear()} {SITE_SETTINGS.company_name}. All rights reserved.</span>
          <span>Designed for Ghana, West Africa & International Trade.</span>
        </div>
      </Container>
    </footer>
  );
}