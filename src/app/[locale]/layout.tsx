import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import Navbar from "../../Components/Navbar";
import AOSWrapper from "../../Components/aos";
import { Cairo, Inter } from "next/font/google";
import Footer from "../../Components/Footer/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-en",
  display: "swap",
  preload: true,
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-ar",
  display: "swap",
  preload: true,
});

const SUPPORTED_LOCALES = ["en", "ar"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

function isSupportedLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) notFound();

  let messages: Record<string, string>;
  try {
    messages = (await import(`../../Lang/${locale}.json`)).default;
  } catch {
    notFound();
  }

  const isRTL = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      className={`${inter.variable} ${cairo.variable} scroll-smooth`}
    >
      {/* مهم: لازم الـ variables يتطبقوا هنا */}
      <body className={`${inter.variable} ${cairo.variable} font-ar`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AOSWrapper>
            <Navbar />
            {children}
            <Footer />
          </AOSWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
