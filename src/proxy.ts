import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

function preferredLocale(request: NextRequest) {
  const accepted = request.headers.get("accept-language")?.toLowerCase() ?? "";
  const languages = accepted.split(",").map((value) => value.trim().split(";", 1)[0]);
  if (languages.some((value) => value === "fr" || value.startsWith("fr-"))) return "fr";
  if (languages.some((value) => value === "ru" || value.startsWith("ru-"))) return "ru";
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameLocale = pathname.split("/")[1];
  const pathnameHasLocale = pathnameLocale && isLocale(pathnameLocale);

  if (pathname.startsWith("/api")) return NextResponse.next();

  if (pathnameLocale === defaultLocale && (pathname === "/en" || pathname === "/en/")) {
    return NextResponse.redirect(new URL("/", request.url), 308);
  }

  const locale = pathnameHasLocale ? pathnameLocale : preferredLocale(request);
  if (!pathnameHasLocale && locale !== defaultLocale) {
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  const headers = new Headers(request.headers);
  headers.set("x-locale", locale);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
