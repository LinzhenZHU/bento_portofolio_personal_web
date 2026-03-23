import type { AboutData, AboutSocialLinks } from "@/data/types";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/** Solid “school” / mortarboard silhouette (matches filled weight of LinkedIn & GitHub) */
function GoogleScholarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const ITEMS: {
  key: keyof AboutSocialLinks;
  label: string;
  Icon: typeof LinkedInIcon;
}[] = [
  { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon },
  { key: "googleScholar", label: "Google Scholar", Icon: GoogleScholarIcon },
  { key: "github", label: "GitHub", Icon: GitHubIcon },
];

type AboutSocialLinksProps = {
  links?: AboutData["socialLinks"];
  className?: string;
};

export function AboutSocialLinks({ links, className = "" }: AboutSocialLinksProps) {
  if (!links) return null;

  const visible = ITEMS.filter(({ key }) => {
    const href = links[key];
    return typeof href === "string" && href.trim().length > 0;
  });

  if (visible.length === 0) return null;

  return (
    <div
      className={`flex flex-wrap items-center gap-3 sm:gap-4 ${className}`}
      role="navigation"
      aria-label="Profile links"
    >
      {visible.map(({ key, label, Icon }) => (
        <a
          key={key}
          href={links[key]!.trim()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-foreground transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Icon
            className={
              key === "googleScholar"
                ? "h-7 w-7 sm:h-8 sm:w-8"
                : "h-6 w-6 sm:h-7 sm:w-7"
            }
          />
        </a>
      ))}
    </div>
  );
}
