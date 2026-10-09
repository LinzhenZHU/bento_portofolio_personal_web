"use client";

import { useEffect, useState } from "react";
import type { SiteData, WorkTabId } from "@/data/types";
import LaptopLayout from "../components/LaptopLayout";
import MobileLayout from "../components/MobileLayout";

type ExpandedSection = "work" | "about" | null;

export default function ClientPage({ siteData }: { siteData: SiteData }) {
  const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);
  const [workActiveTab, setWorkActiveTab] = useState<WorkTabId>("publication");

  useEffect(() => {
    if (!expandedSection) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpandedSection(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [expandedSection]);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <MobileLayout
          siteData={siteData}
          expandedSection={expandedSection}
          setExpandedSection={setExpandedSection}
          workActiveTab={workActiveTab}
          setWorkActiveTab={setWorkActiveTab}
        />
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <LaptopLayout
          siteData={siteData}
          expandedSection={expandedSection}
          setExpandedSection={setExpandedSection}
          workActiveTab={workActiveTab}
          setWorkActiveTab={setWorkActiveTab}
        />
      </div>
    </div>
  );
}
