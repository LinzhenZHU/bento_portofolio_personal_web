import Image from "next/image";
import type { Project } from "@/data/types";

export function ProjectCard({
  title,
  image,
  authors,
  description,
  techStack,
  href,
  links,
}: Project) {
  const resources = links ?? (href ? [{ label: "Project page", href }] : []);

  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl border border-border bg-card text-card-foreground transition-colors hover:border-muted-foreground/50">
      {image && (
        <div className="relative aspect-2/1 w-full overflow-hidden">
          <Image src={image} alt={title} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" />
        </div>
      )}
      <div className="space-y-3 p-4 sm:p-5">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {techStack?.map((tech) => (
            <span key={tech} className="text-[13px] font-medium text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>
        <h4 className="text-[17px] font-semibold leading-snug sm:text-lg">
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
              {title}
            </a>
          ) : title}
        </h4>
        {authors && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {authors.split(/(Zhu, L\.)/).map((part, index) =>
              part === "Zhu, L." ? <strong key={index} className="font-semibold text-foreground">{part}</strong> : part,
            )}
          </p>
        )}
        {description && <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>}
        {resources.length > 0 && (
          <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
            {resources.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="rounded-sm text-sm font-medium underline decoration-border underline-offset-4 transition-colors hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
