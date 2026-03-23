"use client";

import { useState } from "react";
import type { SiteData, WorkTabId } from "@/data/types";
import LaptopLayout from "../components/LaptopLayout";
import MobileLayout from "../components/MobileLayout";
import { ThemeToggle } from "../components/theme-toggle";

type ExpandedSection = "work" | "about" | null;

export default function ClientPage({ siteData }: { siteData: SiteData }) {
  const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);
  const [workActiveTab, setWorkActiveTab] = useState<WorkTabId>("publication");

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ThemeToggle />
      {/* Mobile Layout */}
      <div className="block md:hidden">
        <MobileLayout
          siteData={siteData}
          expandedSection={expandedSection}
          setExpandedSection={setExpandedSection}
          workActiveTab={workActiveTab}
          setWorkActiveTab={setWorkActiveTab}
        />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
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
