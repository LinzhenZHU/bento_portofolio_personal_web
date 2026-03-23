"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeCloudDrift } from "./ThemeCloudDrift";
import { ThemeTriangleDecor } from "./ThemeTriangleDecor";

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
      />
    </svg>
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div aria-hidden>
        <div className="fixed right-[calc(1rem+2.25rem+0.5rem)] top-4 z-[100] h-9 min-w-[5.5rem] rounded-sm bg-muted/40" />
        <div className="fixed right-4 top-2 z-[100] h-9 w-9 rounded-sm bg-muted/40" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <ThemeCloudDrift />
      {/* Triangle + road: own vertical position (top-4) — does not follow button */}
      <div className="fixed right-[calc(1rem+2.25rem+0.5rem)] top-4 z-[100] flex h-9 items-end justify-end">
        <ThemeTriangleDecor />
      </div>
      {/* Button: same vertical band as clouds (top-2) */}
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="fixed right-4 top-2 z-[101] flex h-9 w-9 shrink-0 items-center justify-center rounded-none border-0 bg-transparent p-0 text-foreground transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
      </button>
    </>
  );
}
