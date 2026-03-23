"use client";

import { useState, useCallback, useRef, useEffect, RefObject } from "react";

export type PanelSizes = {
  topHeight: number;
  topLeftWidth: number;
  bottomLeftWidth: number;
  bottomRightTopHeight: number;
};

type DividerType =
  | "horizontal-main"
  | "vertical-top"
  | "vertical-bottom"
  | "horizontal-bottom-right"
  | null;

const CONSTRAINTS = {
  minTopHeight: 15,
  maxTopHeight: 40,
  minLeftWidth: 30,
  maxLeftWidth: 70,
  minAboutHeight: 30,
  maxAboutHeight: 70,
};

const LERP_FACTOR = 0.15;

export const DEFAULT_PANEL_SIZES: PanelSizes = {
  topHeight: 25,
  topLeftWidth: 55,
  bottomLeftWidth: 40,
  bottomRightTopHeight: 75,
};

type UseResizablePanelsOptions = {
  /** When false, panel ratios stay fixed at defaults and dividers do not drag */
  enabled?: boolean;
};

export function useResizablePanels(
  containerRef: RefObject<HTMLDivElement | null>,
  options: UseResizablePanelsOptions = {},
) {
  const { enabled = true } = options;
  const [sizes, setSizes] = useState<PanelSizes>(DEFAULT_PANEL_SIZES);
  const targetSizes = useRef<PanelSizes>({ ...DEFAULT_PANEL_SIZES });
  const rafId = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState<DividerType>(null);

  const handleMouseDown = useCallback(
    (divider: NonNullable<DividerType>) => {
      return (e: React.MouseEvent) => {
        if (!enabled) return;
        e.preventDefault();
        setIsDragging(divider);
      };
    },
    [enabled],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      if (isDragging === "horizontal-main") {
        const newTopHeight = ((e.clientY - rect.top) / rect.height) * 100;
        targetSizes.current.topHeight = Math.min(
          CONSTRAINTS.maxTopHeight,
          Math.max(CONSTRAINTS.minTopHeight, newTopHeight),
        );
      } else if (isDragging === "vertical-top") {
        const newLeftWidth = ((e.clientX - rect.left) / rect.width) * 100;
        targetSizes.current.topLeftWidth = Math.min(
          CONSTRAINTS.maxLeftWidth,
          Math.max(CONSTRAINTS.minLeftWidth, newLeftWidth),
        );
      } else if (isDragging === "vertical-bottom") {
        const newLeftWidth = ((e.clientX - rect.left) / rect.width) * 100;
        targetSizes.current.bottomLeftWidth = Math.min(
          CONSTRAINTS.maxLeftWidth,
          Math.max(CONSTRAINTS.minLeftWidth, newLeftWidth),
        );
      } else if (isDragging === "horizontal-bottom-right") {
        const topOffset = (targetSizes.current.topHeight / 100) * rect.height;
        const bottomHeight = rect.height - topOffset;
        const mouseY = e.clientY - rect.top - topOffset;
        const newAboutHeight = (mouseY / bottomHeight) * 100;
        targetSizes.current.bottomRightTopHeight = Math.min(
          CONSTRAINTS.maxAboutHeight,
          Math.max(CONSTRAINTS.minAboutHeight, newAboutHeight),
        );
      }
    },
    [isDragging, containerRef],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  // Animation loop: lerp sizes toward target for damping effect
  useEffect(() => {
    if (!isDragging) {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      setSizes({ ...targetSizes.current });
      return;
    }

    const animate = () => {
      setSizes((prev) => {
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
        return {
          topHeight: lerp(
            prev.topHeight,
            targetSizes.current.topHeight,
            LERP_FACTOR,
          ),
          topLeftWidth: lerp(
            prev.topLeftWidth,
            targetSizes.current.topLeftWidth,
            LERP_FACTOR,
          ),
          bottomLeftWidth: lerp(
            prev.bottomLeftWidth,
            targetSizes.current.bottomLeftWidth,
            LERP_FACTOR,
          ),
          bottomRightTopHeight: lerp(
            prev.bottomRightTopHeight,
            targetSizes.current.bottomRightTopHeight,
            LERP_FACTOR,
          ),
        };
      });
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [isDragging]);

  // Global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = isDragging.startsWith("horizontal")
        ? "row-resize"
        : "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    sizes,
    isDragging,
    handleMouseDown,
    resizeEnabled: enabled,
  };
}
