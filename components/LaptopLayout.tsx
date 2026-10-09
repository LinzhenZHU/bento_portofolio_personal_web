"use client";

import React, { useState, useCallback, useRef } from "react";
import type { SiteData, WorkTabId } from "@/data/types";
import {
  HeroSection,
  SkillsSection,
  WorkSection,
  AboutSection,
  ContactSection,
  getClipFrom,
} from "./sections";
import { useResizablePanels } from "./hooks";
import ExpandedOverlay from "./sections/ui/ExpandedOverlay";

type ResizableLayoutProps = {
  siteData: SiteData;
  expandedSection: "work" | "about" | null;
  setExpandedSection: (section: "work" | "about" | null) => void;
  workActiveTab: WorkTabId;
  setWorkActiveTab: (tab: WorkTabId) => void;
};

export default function ResizableLayout({
  siteData,
  expandedSection,
  setExpandedSection,
  workActiveTab,
  setWorkActiveTab,
}: ResizableLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null);

  // Refs for panel containers (used to capture bounding rect for expansion)
  const workPanelRef = useRef<HTMLDivElement>(null);
  const aboutPanelRef = useRef<HTMLDivElement>(null);

  const handleWorkExpand = useCallback(() => {
    if (expandedSection === "work") {
      setExpandedSection(null);
    } else {
      const rect = workPanelRef.current?.getBoundingClientRect();
      if (rect) setSourceRect(rect);
      setExpandedSection("work");
    }
  }, [expandedSection, setExpandedSection]);

  const handleAboutExpand = useCallback(() => {
    if (expandedSection === "about") {
      setExpandedSection(null);
    } else {
      const rect = aboutPanelRef.current?.getBoundingClientRect();
      if (rect) setSourceRect(rect);
      setExpandedSection("about");
    }
  }, [expandedSection, setExpandedSection]);

  const clipFrom = getClipFrom(sourceRect);

  // Keep panel dimensions and the optional resize controls together.
  const { sizes, isDragging, handleMouseDown, resizeEnabled } =
    useResizablePanels(containerRef, { enabled: false });

  return (
    <div
      ref={containerRef}
      className="relative h-dvh min-h-[680px] w-full overflow-hidden"
      style={{
        "--overview-height": `clamp(188px, ${sizes.topHeight}%, 224px)`,
        "--contact-height": `clamp(144px, ${100 - sizes.bottomRightTopHeight}%, 168px)`,
      } as React.CSSProperties}
    >
      {/* ===== TOP SECTION (Hero | Skills) ===== */}
      <div
        className="absolute left-0 right-0 top-0 flex"
        style={{ height: "var(--overview-height)" }}
      >
        {/* Hero Section */}
        <div
          className="panel-scroll relative h-full"
          style={{ width: `${sizes.topLeftWidth}%` }}
        >
          <div className="entry-content h-full p-5 xl:p-6">
            <HeroSection data={siteData.hero} />
          </div>
        </div>

        {/* Vertical Divider (Top Section) */}
        <div
          className={`relative z-10 flex h-full w-0 items-center justify-center ${
            resizeEnabled ? "group cursor-col-resize" : "pointer-events-none"
          }`}
          onMouseDown={
            resizeEnabled ? handleMouseDown("vertical-top") : undefined
          }
        >
          <div
            className={`entry-line-y absolute h-full origin-top bg-foreground ${
              resizeEnabled
                ? isDragging === "vertical-top"
                  ? "w-1 bg-muted-foreground"
                  : "w-px group-hover:w-1 group-hover:bg-muted-foreground"
                : "w-px"
            }`}
          />
        </div>

        {/* Skills Section */}
        <div
          className="panel-scroll relative h-full"
          style={{ width: `${100 - sizes.topLeftWidth}%` }}
        >
          <div className="entry-content h-full p-5 xl:p-6">
            <SkillsSection data={siteData.skills} />
          </div>
        </div>
      </div>

      {/* Horizontal Divider (Main - between Top and Bottom) */}
      <div
        className={`absolute left-0 right-0 z-10 flex h-0 items-center justify-center ${
          resizeEnabled ? "group cursor-row-resize" : "pointer-events-none"
        }`}
        style={{ top: "var(--overview-height)" }}
        onMouseDown={
          resizeEnabled ? handleMouseDown("horizontal-main") : undefined
        }
      >
        <div
          className={`entry-line-x absolute w-full origin-left bg-foreground ${
            resizeEnabled
              ? isDragging === "horizontal-main"
                ? "h-1 bg-muted-foreground"
                : "h-px group-hover:h-1 group-hover:bg-muted-foreground"
              : "h-px"
          }`}
        />
      </div>

      {/* ===== BOTTOM SECTION (Work | About + Contact) ===== */}
      <div
        className="absolute bottom-0 left-0 right-0 flex"
        style={{ height: "calc(100% - var(--overview-height))" }}
      >
        {/* Work Section (Left) */}
        <div
          ref={workPanelRef}
          className="panel-scroll relative h-full focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
          tabIndex={0}
          role="region"
          aria-label="Research and work"
          style={{ width: `${sizes.bottomLeftWidth}%` }}
        >
          <div className="entry-content min-h-full px-5 pb-5 xl:px-6 xl:pb-6">
            <WorkSection
              data={siteData.projectCategories}
              activeTab={workActiveTab}
              onActiveTabChange={setWorkActiveTab}
              onExpand={handleWorkExpand}
            />
          </div>
        </div>

        {/* Vertical Divider (Bottom Section) */}
        <div
          className={`relative z-10 flex h-full w-0 items-center justify-center ${
            resizeEnabled ? "group cursor-col-resize" : "pointer-events-none"
          }`}
          onMouseDown={
            resizeEnabled ? handleMouseDown("vertical-bottom") : undefined
          }
        >
          <div
            className={`entry-line-y absolute h-full origin-top bg-foreground ${
              resizeEnabled
                ? isDragging === "vertical-bottom"
                  ? "w-1 bg-muted-foreground"
                  : "w-px group-hover:w-1 group-hover:bg-muted-foreground"
                : "w-px"
            }`}
          />
        </div>

        {/* Right Section (About + Contact) */}
        <div
          className="relative h-full"
          style={{ width: `${100 - sizes.bottomLeftWidth}%` }}
        >
          {/* About Section */}
          <div
            ref={aboutPanelRef}
            className="panel-scroll absolute left-0 right-0 top-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
            tabIndex={0}
            role="region"
            aria-label="About me"
            style={{ height: "calc(100% - var(--contact-height))" }}
          >
            <div className="entry-content h-full p-5 xl:p-6">
              <AboutSection
                data={siteData.about}
                onExpand={handleAboutExpand}
              />
            </div>
          </div>

          {/* Horizontal Divider (About/Contact) */}
          <div
            className={`absolute left-0 right-0 z-10 flex h-0 items-center justify-center ${
              resizeEnabled ? "group cursor-row-resize" : "pointer-events-none"
            }`}
            style={{ bottom: "var(--contact-height)" }}
            onMouseDown={
              resizeEnabled
                ? handleMouseDown("horizontal-bottom-right")
                : undefined
            }
          >
            <div
              className={`entry-line-x absolute w-full origin-left bg-foreground ${
                resizeEnabled
                  ? isDragging === "horizontal-bottom-right"
                    ? "h-1 bg-muted-foreground"
                    : "h-px group-hover:h-1 group-hover:bg-muted-foreground"
                  : "h-px"
              }`}
            />
          </div>

          {/* Contact Section */}
          <div
            className="panel-scroll absolute bottom-0 left-0 right-0"
            style={{ height: "var(--contact-height)" }}
          >
            <div className="entry-content h-full p-5 xl:px-6">
              <ContactSection
                data={siteData.contact}
                socialLinks={siteData.about.socialLinks}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Expanded overlays */}
      <ExpandedOverlay
        isOpen={expandedSection === "work"}
        clipFrom={clipFrom}
        padding="px-8 pb-8"
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
        padding="px-8 pb-8"
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
