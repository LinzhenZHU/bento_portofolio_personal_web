import type { AboutSocialLinks as AboutSocialLinksData, ContactEntry } from "@/data/types";
import { AboutSocialLinks } from "./ui/AboutSocialLinks";

/** Solid filled envelope — same paths as Heroicons 24/solid EnvelopeIcon */
function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
      <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
    </svg>
  );
}

function isEmailEntry(entry: ContactEntry) {
  return (
    entry.href.startsWith("mailto:") ||
    entry.type.toLowerCase() === "email"
  );
}

type ContactSectionProps = {
  data: ContactEntry[];
  socialLinks?: AboutSocialLinksData;
};

export function ContactSection({ data, socialLinks }: ContactSectionProps) {
  return (
    <div className="h-full">
      <h3 className="heading-section-sm">Contact Me</h3>
      <div className="mt-4 space-y-2">
        {data.map((entry) => (
          <a
            key={entry.value}
            href={entry.href}
            className="group flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            {isEmailEntry(entry) ? (
              <MailIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
            ) : null}
            <span>{entry.value}</span>
          </a>
        ))}
      </div>
      <AboutSocialLinks links={socialLinks} className="mt-6" />
    </div>
  );
}
