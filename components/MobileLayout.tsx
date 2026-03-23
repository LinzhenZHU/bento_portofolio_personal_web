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
    <div ref={containerRef} className="relative h-dvh overflow-hidden">
      {/* Mobile column layout */}
      <div
        className="grid h-full"
        style={{
          gridTemplateRows:
            "minmax(0, 2.5fr) minmax(0, 2.5fr) minmax(0, 0.7fr) minmax(0, 0.7fr) minmax(0, 1.5fr)",
        }}
      >
        {/* Hero Section */}
        <div className="overflow-hidden border-b border-black px-6 py-6">
          <HeroSection data={siteData.hero} />
        </div>

        {/* Skills Section */}
        <div className="overflow-hidden border-b border-black px-6 py-6">
          <SkillsSection data={siteData.skills} />
        </div>

        {/* Work Section */}
        <div
          ref={workRef}
          className="flex items-center justify-between overflow-hidden border-b border-black bg-white px-6 py-2"
        >
          <h3 className="heading-section-sm">Work</h3>
          <button
            type="button"
            onClick={handleWorkExpand}
            className="text-black transition-opacity hover:opacity-70"
            aria-label="Expand work section"
          >
            <FullscreenExpandIcon className="h-5 w-5" />
          </button>
        </div>

        {/* About Section */}
        <div
          ref={aboutRef}
          className="flex cursor-pointer items-center justify-between overflow-hidden border-b border-black bg-white px-6 transition-colors duration-200 hover:bg-gray-50"
        >
          <SectionHeading_Clickable onClick={handleAboutExpand}>
            About Me
          </SectionHeading_Clickable>
          <div onClick={handleAboutExpand} className="text-xl">
            +
          </div>
        </div>

        {/* Contact Section */}
        <div className="overflow-hidden bg-white px-6 py-6">
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
