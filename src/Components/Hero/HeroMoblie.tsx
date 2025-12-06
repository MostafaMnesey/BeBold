import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { TypewriterText } from "@/Components/Text/Text";

type Props = {
  locale: "en" | "ar";
  isRTL: boolean;
};

export default function HeroMoblie({ locale, isRTL }: Props) {
  const t = useTranslations("hero");

  return (
    <section className="relative z-10 min-h-[92vh] w-full overflow-hidden">
      <div className="mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-4 py-10">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-white/70 text-xs tracking-[0.25em] uppercase"
        >
          {t("subtitle")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-3 text-white text-3xl font-semibold leading-tight"
        >
          {t("title")}{" "}
          <span className="text-mainOrange">
            <TypewriterText
              text={`${t("BeBold")}`}
              speed={250}
              deleteSpeed={250}
            />
          </span>{" "}
          {t("titleEnd")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-4 text-white/75 text-sm leading-relaxed"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-6 flex flex-col gap-3"
        >
          <Link
            href={`/${locale}/Contact`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-mainOrange px-6 py-3 text-white font-semibold hover:opacity-90 transition"
          >
            {t("ctaPrimary")}
            <Icon icon="mdi:arrow-top-left" className="text-xl" />
          </Link>

          <Link
            href={`/${locale}/work`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-white font-semibold hover:bg-white/10 transition"
          >
            {t("ctaSecondary")}
            <Icon icon="mdi:eye-outline" className="text-xl" />
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-6 text-white/55 text-xs"
        >
          {t("closing")}
        </motion.p>
      </div>
    </section>
  );
}
