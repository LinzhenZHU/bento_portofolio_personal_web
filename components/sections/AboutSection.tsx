import type { AboutData } from "@/data/types";
import { CloseButton } from "./ui/CloseButton";
import { SectionHeading_Clickable } from "./ui/SectionHeading_Clickable";

type AboutSectionProps = {
  data: AboutData;
  onExpand?: () => void;
  isExpanded?: boolean;
};

export function AboutSection({
  data,
  onExpand,
  isExpanded = false,
}: AboutSectionProps) {
  if (isExpanded) {
    return (
      <div className="relative min-h-full">
        <div className="sticky top-0 z-10 flex justify-end bg-background">
          <CloseButton onClick={onExpand} className="shrink-0" />
        </div>

        {/* Mobile: stacked layout / Desktop: side-by-side */}
        <div className="mx-auto flex max-w-5xl flex-col gap-6 pb-8 pt-4 md:flex-row md:items-center md:gap-10">
          <div className="flex shrink-0 items-center justify-center md:w-56">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.image}
              alt={data.imageAlt}
              className="h-40 w-40 object-contain sm:h-56 sm:w-56"
            />
          </div>
          <div className="min-w-0 flex-1">
            <SectionHeading_Clickable onClick={onExpand}>
              {`About Me`}
            </SectionHeading_Clickable>
            <p className="max-w-[65ch] whitespace-pre-line text-base leading-relaxed text-foreground md:text-lg">
              {data.text}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="flex items-center justify-between">
        <SectionHeading_Clickable onClick={onExpand}>
          {`About Me`}
        </SectionHeading_Clickable>
      </div>

      <div className="mt-3 flow-root sm:mt-4">
        <div className="relative float-left mb-2 mr-4 hidden h-24 w-24 sm:block lg:hidden xl:mr-5 xl:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.image}
            alt={data.imageAlt}
            className="h-full w-full object-contain"
          />
        </div>
        <div>
          <p className="max-w-[65ch] text-base leading-6 text-foreground 2xl:text-[17px] 2xl:leading-relaxed">
            {data.text.split(/\n\s*\n/).slice(0, 2).join(" ")}
          </p>
          {onExpand && (
            <button type="button" onClick={onExpand} className="mt-2 min-h-11 rounded-sm text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
              Full bio &amp; education <span aria-hidden="true">↗</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
