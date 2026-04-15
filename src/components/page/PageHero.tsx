import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/design-system/Container";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  crumbs?: Crumb[];
  variant?: "dark" | "light";
  className?: string;
  backgroundImage?: string;
}

export function PageHero({ eyebrow, title, description, crumbs, variant = "dark", className, backgroundImage }: PageHeroProps) {
  const isDark = variant === "dark" || !!backgroundImage;
  return (
    <div
      className={cn(
        "relative overflow-hidden pb-14 pt-[calc(5rem+env(safe-area-inset-top,0px))] md:pb-28 md:pt-32",
        !backgroundImage && isDark && "bg-[var(--navy)] mesh-hero",
        !backgroundImage && !isDark && "bg-white mesh-hero-light",
        isDark ? "text-white" : "text-[var(--ink)]",
        className
      )}
    >
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            className="object-cover pointer-events-none"
            priority
            sizes="100vw"
            quality={80}
          />
          {/* 30% overlay for inner page hero images */}
          <div className="absolute inset-0 bg-[#0B1F3A]/30 pointer-events-none" aria-hidden />
        </>
      )}

      {isDark && <div className={cn("absolute inset-0 hero-grid pointer-events-none", backgroundImage && "opacity-20")} aria-hidden />}
      <Container className="relative z-10">
        {crumbs && crumbs.length > 0 && (
          <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm mb-6 md:mb-8" aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && (
                  <ChevronRight
                    size={14}
                    className={cn("flex-shrink-0 opacity-50", isDark ? "text-white" : "text-slate-500")}
                  />
                )}
                {c.href ? (
                  <Link
                    href={c.href}
                    className={cn(
                      "hover:underline underline-offset-4",
                      isDark ? "text-white/70 hover:text-white" : "text-slate-500 hover:text-[var(--accent)]"
                    )}
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className={isDark ? "text-white/90" : "text-slate-800"}>{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.2em] mb-4",
              isDark ? "text-[var(--accent)]" : "text-[var(--accent)]"
            )}
          >
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-4xl font-display text-[1.75rem] font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl md:leading-[1.08] lg:text-[3.25rem]">
          {title}
        </h1>
        <p
          className={cn(
            "mt-4 md:mt-6 text-base md:text-xl max-w-2xl leading-relaxed",
            isDark ? "text-white/75" : "text-slate-600"
          )}
        >
          {description}
        </p>
      </Container>
    </div>
  );
}
