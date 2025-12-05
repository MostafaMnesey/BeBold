import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "ar"] as const;

type Locale = (typeof locales)[number];

function isLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale ?? "en";

  if (!isLocale(resolvedLocale)) {
    throw new Error(`Unsupported locale: ${resolvedLocale}`);
  }

  return {
    locale: resolvedLocale,
    messages: (await import(`./src/Lang/${resolvedLocale}.json`)).default,
  };
});

