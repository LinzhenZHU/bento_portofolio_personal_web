"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Reports the center point of the whole Skills panel to `--theme-cloud-left`,
 * plus travel distance `--theme-cloud-travel` for ThemeCloudDrift.
 */
export function InterestsHeading() {
  const ref = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const headingEl = ref.current;
    if (!headingEl) return;
    const panelEl = headingEl.closest("[data-skills-panel]") as HTMLElement | null;
    const targetEl = panelEl ?? headingEl;

    const update = () => {
      const r = targetEl.getBoundingClientRect();
      const centerX = r.left + r.width / 2;
      const travel = Math.max(0, window.innerWidth - centerX) + 96;
      document.documentElement.style.setProperty("--theme-cloud-left", `${centerX}px`);
      document.documentElement.style.setProperty("--theme-cloud-travel", `${travel}px`);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(targetEl);
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
      ref={ref}
      id="interests-heading"
      className="heading-section-sm w-fit max-w-full shrink-0"
    >
      <span className="inline-block">Interests</span>
    </h3>
  );
}
