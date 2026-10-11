import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-sm text-gradient">404</p>
      <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">This page doesn&apos;t exist</h1>
      <p className="mt-3 max-w-md text-muted">The link may be broken or the page may have moved.</p>
      <Link href="/" className={buttonClasses("primary", "mt-8")}>
        Back to the portfolio
      </Link>
    </main>
  );
}
