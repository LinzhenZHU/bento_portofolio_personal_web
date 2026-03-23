"use client";

import type { CSSProperties } from "react";

/**
 * Wireframe triangle only (theme toggle). Clouds live in ThemeCloudDrift (full-width path).
 */
export function ThemeTriangleDecor() {
  const triH = "clamp(0.5rem,2vh,1.167rem)";
  return (
    <div className="relative z-[101] inline-flex h-9 shrink-0 translate-x-9 items-end justify-end">
      {/* Road baseline */}
      <div
        className="pointer-events-none absolute -bottom-1 -left-4 -right-4 h-px bg-foreground/35 [-webkit-mask-image:linear-gradient(90deg,transparent,black_18%,black_82%,transparent)] [mask-image:linear-gradient(90deg,transparent,black_18%,black_82%,transparent)]"
        aria-hidden
      />
      {/* Moving lane dashes (left -> right) */}
      <div
        className="animate-theme-road-lane motion-reduce:animate-none pointer-events-none absolute -bottom-1 -left-4 -right-4 h-px opacity-80 blur-[0.3px] [background-image:repeating-linear-gradient(90deg,currentColor_0,currentColor_12px,transparent_12px,transparent_32px)] text-foreground [-webkit-mask-image:linear-gradient(90deg,transparent,black_18%,black_82%,transparent)] [mask-image:linear-gradient(90deg,transparent,black_18%,black_82%,transparent)]"
        aria-hidden
      />
      <TriangleSvg
        className="relative z-10 w-auto text-foreground/80"
        style={{ height: triH }}
      />
    </div>
  );
}

function TriangleSvg({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const B = 100;
  const rad15 = (15 * Math.PI) / 180;
  const rad10 = (10 * Math.PI) / 180;
  const den =
    Math.cos(rad15) + (Math.sin(rad15) * Math.cos(rad10)) / Math.sin(rad10);
  const k = B / den;
  const H = k * Math.sin(rad15);
  const px = k * Math.cos(rad15);

  return (
    <svg
      className={className}
      style={style}
      viewBox={`0 0 ${B} ${H}`}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMaxYMax meet"
    >
      <path
        d={`M 0 ${H} L ${B} ${H} L ${px} 0 Z`}
        fillOpacity={0.2}
        stroke="currentColor"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
