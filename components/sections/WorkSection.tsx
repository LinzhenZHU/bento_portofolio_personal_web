"use client";

import { useMemo, useState } from "react";
import type { ProjectCategory, WorkTabId } from "@/data/types";
import { CloseButton } from "./ui/CloseButton";
import { FullscreenExpandIcon } from "./ui/FullscreenExpandIcon";
import { ProjectCard } from "./ui/ProjectCard";

const WORK_TABS: { id: WorkTabId; label: string }[] = [
  { id: "publication", label: "Publications" },
  { id: "honorAward", label: "Honors & Awards" },
  { id: "service", label: "Service" },
];

function tabForGroup(g: ProjectCategory): WorkTabId {
  return g.workTab ?? "publication";
}

type WorkSectionProps = {
  data: ProjectCategory[];
  onExpand?: () => void;
  isExpanded?: boolean;
  /** Lifted from `ClientPage` so collapsed + overlay share the same tab */
  activeTab?: WorkTabId;
  onActiveTabChange?: (tab: WorkTabId) => void;
};

export function WorkSection({
  data,
  onExpand,
  isExpanded = false,
  activeTab: activeTabProp,
  onActiveTabChange,
}: WorkSectionProps) {
  const [internalTab, setInternalTab] = useState<WorkTabId>("publication");
  const controlled = typeof onActiveTabChange === "function";
  const activeTab =
    controlled && activeTabProp !== undefined ? activeTabProp : internalTab;
  const setActiveTab = controlled ? onActiveTabChange! : setInternalTab;

  const activeLabel =
    WORK_TABS.find((t) => t.id === activeTab)?.label ?? "Work";

  const filteredGroups = useMemo(
    () => data.filter((g) => tabForGroup(g) === activeTab),
    [data, activeTab],
  );

  return (
    <div className={`relative min-h-full pb-4 ${isExpanded ? "mx-auto max-w-6xl" : ""}`}>
      <div className="sticky top-0 z-10 mb-3 flex items-center justify-between gap-2 border-b border-border bg-background py-2">
        <nav
          className="flex min-w-0 flex-1 flex-wrap justify-start gap-x-3 gap-y-1 sm:gap-x-5"
          aria-label="Work sections"
        >
          {WORK_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveTab(tab.id)}
                className="group relative inline-flex min-h-10 cursor-pointer items-center overflow-hidden rounded-sm px-2 py-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span
                  className={`absolute inset-0 origin-left bg-foreground transition-transform duration-300 ease-out ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                  aria-hidden
                />
                <span
                  className={`relative z-10 text-left text-sm font-bold leading-snug transition-colors duration-300 sm:text-base ${
                    isActive
                      ? "text-background"
                      : "text-muted-foreground group-hover:text-background"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </nav>
        {isExpanded ? <CloseButton onClick={onExpand} className="shrink-0" /> : onExpand ? (
          <button
            type="button"
            onClick={onExpand}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            aria-label="Expand to fullscreen"
          >
            <FullscreenExpandIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        ) : null}
      </div>

      <h3 className="heading-section">{activeLabel}</h3>
      {activeTab === "publication" && (
        <p className="mt-2 text-meta">Published and accepted work. * Equal contribution.</p>
      )}

      {filteredGroups.length === 0 ? (
        <p className="mt-4 text-meta">No entries in this section yet.</p>
      ) : (
        filteredGroups.map((group) => (
          <div
            key={`${group.workTab ?? "publication"}-${group.category}`}
            className="mb-4"
          >
            <p className="mt-2 text-meta">{group.category}</p>
            <div
              className={`mt-4 ${isExpanded ? "grid grid-cols-1 items-start gap-5 lg:grid-cols-2" : "space-y-4"}`}
            >
              {group.projects.map((project) => (
                <ProjectCard
                  key={`${group.category}-${project.title}`}
                  {...project}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
