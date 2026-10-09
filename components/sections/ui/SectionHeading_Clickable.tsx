type SectionHeadingProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export function SectionHeading_Clickable({
  children,
  onClick,
}: SectionHeadingProps) {
  return (
    <h3 className="heading-section-sm">
      <button type="button" onClick={onClick} className="group relative inline-block min-h-11 cursor-pointer overflow-hidden py-1 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
        <span className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-300 ease-out group-hover:scale-x-100" />
        <span className="heading-section-sm relative z-10 text-foreground transition-colors duration-300 group-hover:text-background">
          {children}
        </span>
      </button>
    </h3>
  );
}
