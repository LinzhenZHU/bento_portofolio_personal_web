"use client";

import { Cloud, CloudFog } from "lucide-react";

/**
 * Decorative clouds stay inside the appearance controls beside Interests.
 */
export function ThemeCloudDrift() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-2 h-9 overflow-hidden"
      aria-hidden
    >
      <div className="relative h-full w-full">
        <div
          className="motion-reduce:animate-none absolute left-0 top-1/2 flex items-center gap-5 text-foreground/38 animate-theme-cloud-cross"
        >
          <Cloud className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.65} />
          <CloudFog className="h-5 w-5 text-foreground/32" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}
