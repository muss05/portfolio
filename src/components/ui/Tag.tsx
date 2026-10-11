import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-surface/60 px-2.5 py-1 text-xs font-medium text-muted">
      {children}
    </span>
  );
}

const statusStyles = {
  completed: { label: "Completed", className: "text-success border-success/40 bg-success/10" },
  "in-progress": { label: "In progress", className: "text-warning border-warning/40 bg-warning/10" },
  planned: { label: "Planned", className: "text-cyan border-cyan/40 bg-cyan/10" },
} as const;

export function StatusBadge({ status }: { status: keyof typeof statusStyles }) {
  const { label, className } = statusStyles[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${className}`}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {label}
    </span>
  );
}
