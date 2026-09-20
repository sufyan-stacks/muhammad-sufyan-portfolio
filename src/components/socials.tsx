"use client";

import type { IconType } from "react-icons";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { socials as socialLinks, type SocialLinkItem } from "@/lib/site";

const iconMap = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
  x: FaXTwitter,
  instagram: FaInstagram,
} satisfies Record<string, IconType>;

export function SocialLink({ item, className = "" }: { item: SocialLinkItem; className?: string }) {
  const Icon = iconMap[item.icon] ?? FaXTwitter;
  const label = item.ariaLabel ?? item.label;

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center p-1 hover:text-accent ${className}`.trim()}
    >
      <Icon className="size-4" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </a>
  );
}

export function SocialLinks({ items = socialLinks, className = "" }: { items?: readonly SocialLinkItem[]; className?: string }) {
  const uniqueItems = items.filter((item, index, list) => list.findIndex((candidate) => candidate.id === item.id) === index);

  return (
    <div className={`flex flex-wrap items-center gap-4 md:gap-6 ${className}`.trim()}>
      {uniqueItems.map((item) => (
        <SocialLink key={item.id} item={item} />
      ))}
    </div>
  );
}
