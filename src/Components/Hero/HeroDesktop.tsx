import React from "react";
import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { TypewriterText } from "@/Components/Text/Text";

type Props = {
  locale: "en" | "ar";
  isRTL: boolean;
};

export default function HeroDesktop({ locale, isRTL }: Props) {
  const t = useTranslations("hero");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative z-10 h-screen w-full overflow-hidden">
      <div className="mx-auto flex h-full max-w-7xl items-center px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex w-full flex-col gap-7"
        >
          <motion.p
            variants={itemVariants}
            className="text-white/70 text-sm tracking-[0.25em] uppercase"
          >
            {t("subtitle")}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-white text-4xl md:text-6xl font-semibold leading-tight"
          >
            {t("title")}{" "}
            <span className="text-mainOrange">
              <TypewriterText text="Be Bold" />
            </span>{" "}
            {t("titleEnd")}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-white/75 max-w-2xl text-base md:text-lg leading-relaxed"
          >
            {t("description")}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-2 flex flex-wrap items-center gap-3"
          >
            <Link
              href={`/${locale}/contact`}
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

          <motion.p variants={itemVariants} className="text-white/55 text-sm">
            {t("closing")}
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll label */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/55 text-sm flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-mainOrange" />
        {t("scrollText")}
      </div>
    </section>
  );
}
