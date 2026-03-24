import { cn } from "@/lib/utils";

interface HeadingProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
  size?: "xl" | "lg" | "md" | "sm";
  className?: string;
}

const sizeClasses = {
  xl: "text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight",
  lg: "text-2xl sm:text-3xl font-semibold tracking-tight",
  md: "text-xl sm:text-2xl font-semibold",
  sm: "text-lg font-semibold",
};

export function Heading({ children, as: Tag = "h2", size = "lg", className }: HeadingProps) {
  return <Tag className={cn(sizeClasses[size], className)}>{children}</Tag>;
}
