import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient text-white shadow-[0_8px_30px_-8px_rgba(124,58,237,0.55)] hover:shadow-[0_10px_36px_-6px_rgba(124,58,237,0.7)]",
  secondary: "border border-border-strong bg-card text-fg hover:border-purple/60",
  ghost: "text-muted hover:text-fg",
};

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  external?: boolean;
  children: ReactNode;
}

/** Anchor styled as a button. `external` opens in a new tab safely. */
export function ButtonLink({ variant = "primary", external, className = "", children, ...props }: ButtonLinkProps) {
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a className={buttonClasses(variant, className)} {...externalProps} {...props}>
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
