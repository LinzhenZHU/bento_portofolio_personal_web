"use client";

import { Cloud, CloudFog } from "lucide-react";
import { useEffect, useState } from "react";

type SkyVariant = {
  count: 1 | 2;
  y1: number;
  y2: number;
  gap: number;
  durationSec: number;
  delaySec: number;
  secondFog: boolean;
};

function pickSkyVariant(): SkyVariant {
  const count: 1 | 2 = Math.random() < 0.42 ? 2 : 1;
  const jitter = () => (Math.random() - 0.5) * 6;
  return {
    count,
    y1: jitter(),
    y2: count === 2 ? jitter() : 0,
    gap: 14 + Math.random() * 20,
    durationSec: 9 + Math.random() * 7,
    delaySec: Math.random() * 3,
    secondFog: Math.random() < 0.55,
  };
}

/**
 * Full-viewport-width band under the header chrome: Lucide clouds drift
 * from fully off-screen left to fully off-screen right (path passes above the theme triangle).
 */
export function ThemeCloudDrift() {
  const [variant, setVariant] = useState<SkyVariant | null>(null);

  useEffect(() => {
    setVariant(pickSkyVariant());
  }, []);

  const v = variant ?? {
    count: 1 as const,
    y1: 0,
    y2: 0,
    gap: 18,
    durationSec: 11,
    delaySec: 0,
    secondFog: false,
  };

  return (
    <div
      className="pointer-events-none fixed right-0 top-2 z-[95] h-9 overflow-x-hidden [left:var(--theme-cloud-left,0px)]"
      aria-hidden
    >
      <div className="relative h-full w-full">
        <div
          className="motion-reduce:animate-none absolute left-0 top-1/2 flex items-center text-foreground/38 will-change-transform animate-theme-cloud-cross"
          style={{
            animationDuration: `${v.durationSec}s`,
            animationDelay: `${v.delaySec}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          <span style={{ transform: `translateY(${v.y1}px)` }}>
            <Cloud className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.65} />
          </span>
          {v.count === 2 ? (
            <span
              className="text-foreground/32"
              style={{
                marginLeft: v.gap,
                transform: `translateY(${v.y2}px) scale(0.92)`,
              }}
            >
              {v.secondFog ? (
                <CloudFog className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.65} />
              ) : (
                <Cloud className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.45} />
              )}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
