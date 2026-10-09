import type { HeroData } from "@/data/types";
import RotatingText from "@/components/ReactBits/RotatingText";

type HeroSectionProps = {
  data: HeroData;
};

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <div className="flex h-full min-h-0 flex-col justify-center">
      <h1 className="heading-display">{data.greeting}</h1>
      <RotatingText
        texts={data.titles}
        mainClassName="text-2xl font-semibold leading-tight sm:text-3xl xl:text-4xl"
        staggerFrom={"random"}
        initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 1.1, filter: "blur(4px)" }}
        staggerDuration={0.02}
        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
        transition={{ type: "tween", duration: 1.0, ease: "easeOut" }}
        rotationInterval={4000}
      />
      {data.links && (
        <nav aria-label="Academic links" className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          {data.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="rounded-sm underline decoration-border underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
