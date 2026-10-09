"use client";

import { useState, useRef } from "react";
import type { SiteData, WorkTabId } from "@/data/types";
import {
  HeroSection,
  SkillsSection,
  WorkSection,
  AboutSection,
  ContactSection,
  SectionHeading_Clickable,
  getClipFrom,
} from "./sections";
import ExpandedOverlay from "./sections/ui/ExpandedOverlay";
import { FullscreenExpandIcon } from "./sections/ui/FullscreenExpandIcon";

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
      {/* Mobile column layout */}
      <div
        className="grid min-h-[calc(100dvh-4rem)]"
        style={{
          gridTemplateRows:
            "minmax(240px, 1.2fr) minmax(220px, 1fr) auto auto auto",
        }}
      >
        {/* Hero Section */}
        <div className="border-b border-border px-6 py-6">
          <HeroSection data={siteData.hero} />
        </div>

        {/* Skills Section */}
        <div className="overflow-hidden border-b border-border px-6 py-6">
          <SkillsSection data={siteData.skills} />
        </div>

        {/* Work Section */}
        <div
          ref={workRef}
          className="flex items-center justify-between border-b border-border bg-background px-6 py-3"
        >
          <h3 className="heading-section-sm">Research & Work</h3>
          <button
            type="button"
            onClick={handleWorkExpand}
            className="flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            aria-label="Expand work section"
          >
            <FullscreenExpandIcon className="h-5 w-5" />
          </button>
        </div>

        {/* About Section */}
        <div
          ref={aboutRef}
          className="flex items-center justify-between border-b border-border bg-background px-6 py-3"
        >
          <SectionHeading_Clickable onClick={handleAboutExpand}>
            About Me
          </SectionHeading_Clickable>
          <button type="button" onClick={handleAboutExpand} aria-label="Expand about section" className="flex h-11 w-11 items-center justify-center rounded-full text-xl hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            +
          </button>
        </div>

        {/* Contact Section */}
        <div className="bg-background px-6 py-6">
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
