import type { SkillsData } from "@/data/types";
import FallingText from "@/components/ReactBits/FallingText";
import { InterestsHeading } from "./InterestsHeading";

type SkillsSectionProps = {
  data: SkillsData;
};

export function SkillsSection({ data }: SkillsSectionProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden [--falling-text-size:1.3rem] md:[--falling-text-size:1.4rem] xl:[--falling-text-size:1.5rem]">
      <InterestsHeading />
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
