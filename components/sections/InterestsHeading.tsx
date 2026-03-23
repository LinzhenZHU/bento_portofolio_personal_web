"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Reports the right edge of “Interests” to `--theme-cloud-left` and travel distance
 * `--theme-cloud-travel` for ThemeCloudDrift (viewport coordinates, updated on resize/scroll).
 */
export function InterestsHeading() {
  /** Text span only — block `h3` would stretch full column width and `right` would match the panel edge (near the theme icon on mobile). */
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const r = el.getBoundingClientRect();
      const right = r.right;
      const travel = Math.max(0, window.innerWidth - right) + 96;
      document.documentElement.style.setProperty("--theme-cloud-left", `${right}px`);
      document.documentElement.style.setProperty("--theme-cloud-travel", `${travel}px`);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, []);

  return (
    <h3
      id="interests-heading"
      className="heading-section-sm w-fit max-w-full shrink-0"
    >
      <span ref={ref} className="inline-block">
        Interests
      </span>
    </h3>
  );
}
