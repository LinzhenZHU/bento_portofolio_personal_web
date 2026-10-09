type CloseButtonProps = {
  onClick?: () => void;
  className?: string;
};

export function CloseButton({ onClick, className = "absolute right-0 top-0" }: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`${className} flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring`}
      aria-label="Close"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
}
