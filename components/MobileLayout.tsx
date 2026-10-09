"use client";

import { useState, useRef } from "react";
import type { SiteData, WorkTabId } from "@/data/types";
import {
  HeroSection,
  SkillsSection,
  WorkSection,
  AboutSection,
  ContactSection,
  getClipFrom,
} from "./sections";
import ExpandedOverlay from "./sections/ui/ExpandedOverlay";

const workLinks: { id: WorkTabId; label: string }[] = [
  { id: "publication", label: "Publications" },
  { id: "honorAward", label: "Honors & Awards" },
  { id: "service", label: "Service" },
];

type MobileLayoutProps = {
  siteData: SiteData;
  expandedSection: "work" | "about" | null;
  setExpandedSection: (section: "work" | "about" | null) => void;
  workActiveTab: WorkTabId;
  setWorkActiveTab: (tab: WorkTabId) => void;
};

export default function MobileLayout({
  siteData,
  expandedSection,
  setExpandedSection,
  workActiveTab,
  setWorkActiveTab,
}: MobileLayoutProps) {
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null);

  const workRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWorkExpand = () => {
    if (expandedSection === "work") {
      setExpandedSection(null);
    } else {
      const rect = workRef.current?.getBoundingClientRect();
      if (rect) setSourceRect(rect);
      setExpandedSection("work");
    }
  };

  const handleAboutExpand = () => {
    if (expandedSection === "about") {
      setExpandedSection(null);
    } else {
      const rect = aboutRef.current?.getBoundingClientRect();
      if (rect) setSourceRect(rect);
      setExpandedSection("about");
    }
  };

  const clipFrom = getClipFrom(sourceRect);

  return (
    <div ref={containerRef} className="relative">
      {/* Content determines the height; spare viewport space stays below it. */}
      <div className="min-h-dvh">
        {/* Hero Section */}
        <div className="border-b border-border px-6 py-8 sm:px-8 sm:py-10">
          <HeroSection data={siteData.hero} />
        </div>

        {/* Keep the research introduction readable without opening a dialog. */}
        <div ref={aboutRef} className="border-b border-border px-6 py-6 sm:px-8">
          <AboutSection data={siteData.about} onExpand={handleAboutExpand} />
        </div>

        {/* Work Section */}
        <div
          ref={workRef}
          className="border-b border-border bg-background px-6 py-6 sm:px-8"
        >
          <h3 className="heading-section-sm">Research & Work</h3>
          <nav aria-label="Explore research" className="mt-3 flex flex-wrap gap-2">
            {workLinks.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setWorkActiveTab(id);
                  handleWorkExpand();
                }}
                className="min-h-11 rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {label} <span aria-hidden="true">↗</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Interests and the bounded appearance controls */}
        <div className="overflow-hidden border-b border-border px-6 py-5 sm:px-8">
          <SkillsSection data={siteData.skills} />
        </div>

        {/* Contact Section */}
        <div className="bg-background px-6 py-6 sm:px-8">
          <ContactSection
            data={siteData.contact}
            socialLinks={siteData.about.socialLinks}
          />
        </div>
      </div>

      {/* Expanded overlays */}
      <ExpandedOverlay
        isOpen={expandedSection === "work"}
        clipFrom={clipFrom}
        uniqueKey="work-expanded"
      >
        <WorkSection
          data={siteData.projectCategories}
          activeTab={workActiveTab}
          onActiveTabChange={setWorkActiveTab}
          onExpand={handleWorkExpand}
          isExpanded={true}
        />
      </ExpandedOverlay>

      <ExpandedOverlay
        isOpen={expandedSection === "about"}
        clipFrom={clipFrom}
        uniqueKey="about-expanded"
      >
        <AboutSection
          data={siteData.about}
          onExpand={handleAboutExpand}
          isExpanded={true}
        />
      </ExpandedOverlay>
    </div>
  );
}
