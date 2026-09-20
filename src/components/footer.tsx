import { SocialLinks } from "@/components/socials";
import { person } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-14 md:py-16">
      <div className="container-page flex flex-col gap-10">
        <a
          href={`mailto:${person.email}`}
          className="font-display text-display [overflow-wrap:anywhere] transition-colors duration-150 hover:text-accent"
        >
          {person.email}
        </a>
        <div className="flex flex-col gap-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            {person.name}, {person.location}
          </p>
          <SocialLinks className="gap-x-6" />
          <p className="text-subtle">&copy; {year} {person.name}</p>
        </div>
      </div>
    </footer>
  );
}
