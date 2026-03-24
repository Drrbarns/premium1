"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AnimationType = "fade-up" | "fade-in" | "pop-up" | "slide-left" | "slide-right" | "scale-in";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function AnimateOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  className,
  once = true,
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const animationClasses = {
    "fade-up": isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
    "fade-in": isVisible ? "opacity-100" : "opacity-0",
    "pop-up": isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4",
    "slide-left": isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
    "slide-right": isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
    "scale-in": isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        animationClasses[animation],
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
