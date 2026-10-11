"use client";

import { useEffect } from "react";
import { buttonClasses } from "@/components/ui/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-sm text-gradient">Something went wrong</p>
      <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">This page hit an unexpected error</h1>
      <p className="mt-3 max-w-md text-muted">Please try again. If it keeps happening, reload the page.</p>
      <button type="button" onClick={reset} className={buttonClasses("primary", "mt-8")}>
        Try again
      </button>
    </main>
  );
}
