import { Spinner } from "@/components/ui/Icons";

export default function Loading() {
  return (
    <div role="status" className="flex min-h-dvh items-center justify-center gap-3 text-muted">
      <Spinner size={20} /> Loading portfolio…
    </div>
  );
}
