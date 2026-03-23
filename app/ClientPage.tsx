"use client";

import { useState } from "react";
import type { SiteData, WorkTabId } from "@/data/types";
import MobileLayout from "../components/MobileLayout";
import LaptopLayout from "../components/LaptopLayout";

type ExpandedSection = "work" | "about" | null;

export default function ClientPage({ siteData }: { siteData: SiteData }) {
  const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);
  const [workActiveTab, setWorkActiveTab] = useState<WorkTabId>("publication");

  return (
    <div className="min-h-screen bg-white text-black">
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
