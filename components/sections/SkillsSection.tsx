import type { SkillsData } from "@/data/types";
import FallingText from "@/components/ReactBits/FallingText";
import { InterestsHeading } from "./InterestsHeading";
import { ThemeToggle } from "../theme-toggle";

type SkillsSectionProps = {
  data: SkillsData;
};

export function SkillsSection({ data }: SkillsSectionProps) {
  return (
    <div
      data-skills-panel
      className="flex h-full flex-col overflow-hidden [--falling-text-size:1.125rem] xl:[--falling-text-size:1.25rem]"
    >
      <div className="flex shrink-0 items-center justify-between gap-2">
        <InterestsHeading />
        <ThemeToggle />
      </div>
      <FallingText
        className="min-h-10 flex-1"
        text={data.skills}
        highlightWords={data.highlights}
        highlightClass="highlighted"
        trigger="click"
        backgroundColor="transparent"
        wireframes={false}
        gravity={0.56}
        fontSize="var(--falling-text-size)"
        mouseConstraintStiffness={0.9}
      />
    </div>
  );
}
