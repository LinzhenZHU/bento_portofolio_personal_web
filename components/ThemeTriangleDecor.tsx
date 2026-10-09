"use client";

/**
 * Wireframe triangle only (theme toggle). Clouds live in ThemeCloudDrift (full-width path).
 */
export function ThemeTriangleDecor() {
  return (
    <div className="relative inline-flex h-8 w-full items-end justify-end">
      {/* Road baseline */}
      <div
        className="pointer-events-none absolute -bottom-2 -left-4 -right-4 h-px bg-foreground/35 [-webkit-mask-image:linear-gradient(90deg,transparent,black_18%,black_82%,transparent)] [mask-image:linear-gradient(90deg,transparent,black_18%,black_82%,transparent)]"
        aria-hidden
      />
      {/* Moving lane dashes (left -> right) */}
      <div
        className="animate-theme-road-lane motion-reduce:animate-none pointer-events-none absolute -bottom-2 -left-4 -right-4 h-px opacity-80 blur-[0.3px] [background-image:repeating-linear-gradient(90deg,currentColor_0,currentColor_12px,transparent_12px,transparent_32px)] text-foreground [-webkit-mask-image:linear-gradient(90deg,transparent,black_18%,black_82%,transparent)] [mask-image:linear-gradient(90deg,transparent,black_18%,black_82%,transparent)]"
        aria-hidden
      />
      <TriangleSvg
        className="relative h-4 w-full text-foreground/80"
      />
    </div>
  );
}

function TriangleSvg({
  className,
}: {
  className?: string;
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
