"use client";

import React from "react";
import { useParams } from "next/navigation";
import HeroMobile from "./HeroMoblie";
import HeroDesktop from "./HeroDesktop";

type Locale = "en" | "ar";

export default function Hero() {
  const params = useParams();
  const locale = (params.locale as Locale) ?? "en";
  const isRTL = locale === "ar";

  return (
    <section dir={isRTL ? "rtl" : "ltr"}>
      <div className="block md:hidden">
        <HeroMobile locale={locale} isRTL={isRTL} />
      </div>

      <div className="hidden md:block">
        <HeroDesktop locale={locale} isRTL={isRTL} />
      </div>
    </section>
  );
}
