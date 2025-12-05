import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n";

const nextIntlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
  localeDetection: true,
  localePrefix: "as-needed",
});

export function middleware(request: Parameters<typeof nextIntlMiddleware>[0]) {
  return nextIntlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};

