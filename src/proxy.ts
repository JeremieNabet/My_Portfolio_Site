import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/i18n";

function detectLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") || "";
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase().slice(0, 2))
    .find((code) => ["fr", "en", "he", "iw"].includes(code));

  if (preferred === "en") return "us";
  if (preferred === "he" || preferred === "iw") return "he";
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (isLocale(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  const locale = pathname === "/" ? detectLocale(request) : defaultLocale;
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, pathname === "/" ? 307 : 308);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
