import Link from "next/link";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
  onClick?: () => void;
}

const variants = {
  primary:
    "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] shadow-lg shadow-[var(--accent)]/25",
  secondary: "bg-[var(--navy)] text-white hover:bg-[var(--navy-light)]",
  outline: "border-2 border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white",
  ghost: "text-[var(--ink)] hover:bg-black/5",
  light: "border-2 border-white/80 text-white hover:bg-white hover:text-[var(--navy)]",
};

const sizes = {
  sm: "px-4 py-2.5 text-sm rounded-lg",
  md: "px-6 py-3.5 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-xl",
};

export function CTAButton({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  external,
  onClick,
}: CTAButtonProps) {
  const base = cn(
    "inline-flex items-center justify-center font-semibold transition-all duration-200 btn-hover-lift",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={base}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={base} onClick={onClick}>
      {children}
    </button>
  );
}
