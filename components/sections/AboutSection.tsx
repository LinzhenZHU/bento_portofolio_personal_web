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
          <div className="flex shrink-0 items-center justify-center md:w-1/3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.image}
              alt={data.imageAlt}
              className="h-40 w-40 object-contain sm:h-56 sm:w-56 md:h-auto md:w-full"
            />
          </div>
          <div className="min-w-0 flex-1">
            <SectionHeading_Clickable onClick={onExpand}>
              {`About Me`}
            </SectionHeading_Clickable>
            <p className="whitespace-pre-line text-body leading-relaxed text-foreground md:text-lg md:leading-relaxed">
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

      <div className="mt-3 flex items-start gap-3 sm:mt-4 sm:gap-4 xl:gap-6">
        <div className="relative h-24 w-24 shrink-0 sm:h-32 sm:w-32 xl:h-40 xl:w-40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.image}
            alt={data.imageAlt}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-base leading-relaxed text-foreground lg:text-lg">{data.text.split(/\n\s*\n/)[0]}</p>
          {onExpand && (
            <button type="button" onClick={onExpand} className="mt-4 rounded-sm text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
              Full bio &amp; education <span aria-hidden="true">↗</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
