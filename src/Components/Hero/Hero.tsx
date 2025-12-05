"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { TypewriterText } from "@/Components/Text/Text";

type Locale = "en" | "ar";

export default function Hero() {
  const t = useTranslations("hero");
  const params = useParams();
  const locale = (params.locale as Locale) ?? "en";
  const isRTL = locale === "ar";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.14, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
  };

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="relative z-20 min-h-screen flex items-center space-y-2"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="w-full container mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32">
        <div className=" mx-auto grid grid-cols-1 leading-3 sm:space-y-0 md:grid-cols-2 gap-10 text-start">
          {/* Title block */}
          <div className=" flex flex-col items-center justify-center md:justify-start">
            <motion.div variants={titleVariants} className="mb-8">
              {/* Typewriter line */}
              <TypewriterText
                text="Be Bold"
                loop
                speed={95}
                deleteSpeed={45}
                pause={900}
                className="text-[#EB5723] font-extrabold text-[60px] sm:text-[44px] md:text-[56px] leading-tight"
              />

              {/* Main headline */}
              <h1 className="mt-3 text-white font-extrabold tracking-tight leading-[1.02] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block my-2 ">{t("title")}</span>

                {/* Accent gradient line */}
                <span className="block bg-gradient-to-r from-[#EB5723] via-orange-400 to-[#FF6B00] bg-clip-text text-transparent animate-gradient">
                  {t("titleMiddle") ?? ""}
                </span>

                <span className="block">{t("titleEnd")}</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 max-w-4xl mx-auto leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>
          </div>

          {/* Description */}
          <div className="flex flex-col items-center justify-center">
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-white/75 mb-6 max-w-3xl mx-auto leading-relaxed"
            >
              {t("description")}
            </motion.p>

            {/* Closing */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              {t("closing")}
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center my-10 justify-center gap-4"
            >
              <Link href={`/${locale}/Contact`}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="
                    group relative px-8 py-4 rounded-full
                    bg-gradient-to-r from-[#EB5723] to-orange-500
                    text-white font-semibold text-lg
                    shadow-[0_10px_35px_rgba(235,87,35,0.35)]
                    hover:shadow-[0_16px_45px_rgba(235,87,35,0.48)]
                    transition-all duration-300
                    overflow-hidden
                  "
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t("ctaPrimary")}
                    <Icon
                      icon="mdi:arrow-right"
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isRTL ? "rotate-180" : ""
                      } group-hover:translate-x-1`}
                    />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </Link>

              <Link href={`/${locale}/About`}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="
                    px-8 py-4 rounded-full
                    bg-white/10 backdrop-blur-xl
                    border border-white/20
                    text-white font-semibold text-lg
                    hover:bg-white/15 hover:border-white/30
                    transition-all duration-300
                  "
                >
                  {t("ctaSecondary")}
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute  py-20 place-self-center   flex flex-col items-center gap-2"
        >
          <span className="text-white/60 text-sm ">{t("scrollText")}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon
              icon="mdi:chevron-down"
              className="w-6 h-6 text-white/60"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  );
}

