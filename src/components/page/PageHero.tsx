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
        "relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28",
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
          <nav className="flex flex-wrap items-center gap-2 text-sm mb-8" aria-label="Breadcrumb">
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
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] leading-[1.08] tracking-tight max-w-4xl">
          {title}
        </h1>
        <p
          className={cn(
            "mt-6 text-lg md:text-xl max-w-2xl leading-relaxed",
            isDark ? "text-white/75" : "text-slate-600"
          )}
        >
          {description}
        </p>
      </Container>
    </div>
  );
}
