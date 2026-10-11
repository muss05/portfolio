"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "@/components/ui/Icons";

export const THEME_STORAGE_KEY = "theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const isDarkNow = () => document.documentElement.classList.contains("dark");

export function ThemeToggle() {
  // Server render assumes the default (dark); the inline head script has already set the real class.
  const isDark = useSyncExternalStore(subscribe, isDarkNow, () => true);

  function toggle() {
    const next = isDark ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
      className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-border-strong hover:text-fg"
    >
      {isDark ? <Sun /> : <Moon />}
    </button>
  );
}

/** Runs before paint to avoid a theme flash; also marks JS as available for reveal animations. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");}catch(e){}var d=document.documentElement;d.classList.add("js");d.classList.toggle("dark",t!=="light");})();`;
