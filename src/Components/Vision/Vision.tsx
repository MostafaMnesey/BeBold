"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Section from "../Section/Section";
import { useParams } from "next/navigation";

type Locale = "en" | "ar";

const VisionSection: React.FC = () => {
  const t = useTranslations("vision");
  const tape = t.raw("tape") as string[];
  const params = useParams();
  const locale = (params.locale as Locale) ?? "en";
  const isRTL = locale === "ar";

  return (
    <Section>
      <section className="relative  bg-neutral-950  rounded-lg py-20 md:py-28  shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-mainOrange/30 transition-all overflow-hidden">
        {/* BG */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_rgba(235,87,35,0.20),_transparent_55%),radial-gradient(circle_at_80%_70%,_rgba(255,255,255,0.05),_transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.35 }}
            className="text-center mb-10 md:mb-14"
          >
            <p className="text-xs md:text-sm tracking-[0.32em] text-mainOrange uppercase">
              {t("title")}
            </p>
            <h2 className="mt-4 text-2xl md:text-4xl lg:text-5xl font-semibold text-white leading-snug">
              {t("subtitle")}
            </h2>
          </motion.div>

          {/* Moving tape (marquee-ish) */}
          <div className="relative mb-10 md:mb-14 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950" />
            <motion.div
              initial={{ x: isRTL ? "-10%" : "10%" }}
              animate={{ x: isRTL ? "10%" : "-10%" }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="whitespace-nowrap text-white/10 text-sm md:text-base tracking-[0.35em] uppercase"
            >
              {[...tape, ...tape].map((word, i) => (
                <span key={`${word}-${i}`} className="mx-6">
                  {word}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Big side word */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.35 }}
              className={`lg:col-span-5 ${isRTL ? "lg:order-2" : ""}`}
            >
              <div
                className={`
                  relative rounded-[28px] overflow-hidden
                  border border-white/10 bg-white/[0.04] backdrop-blur-2xl
                  shadow-[0_22px_70px_-45px_rgba(0,0,0,0.95)]
                  p-6 md:p-8
                `}
              >
                {/* Accent corner */}
                <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-mainOrange/30 group-hover:bg-white/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />

                <div className="text-white/25 text-[64px] md:text-[84px] font-semibold leading-none select-none">
                  VISION
                </div>
                <div className="mt-3 text-white/60 text-sm md:text-base leading-relaxed">
                  {t("paragraph1")}
                </div>

                {/* small accent */}
                <div className="mt-6 h-px w-20 bg-gradient-to-r from-mainOrange group-hover:from-white/50 transition-all  via-mainOrange/40 to-transparent" />
              </div>
            </motion.div>

            {/* Quote block */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              viewport={{ once: true, amount: 0.35 }}
              className={`lg:col-span-7 ${isRTL ? "lg:order-1" : ""}`}
            >
              <div
                className="
                  relative rounded-[28px] overflow-hidden
                  border border-white/10
                  bg-gradient-to-br from-white/[0.08] to-white/[0.03]
                  backdrop-blur-2xl
                  shadow-[0_22px_70px_-45px_rgba(0,0,0,0.95)]
                  p-6 md:p-10
                "
              >
                {/* top bar */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-2 w-2 rounded-full bg-mainOrange" />
                  <span className="text-xs tracking-[0.28em] uppercase text-white/60">
                    Our Vision
                  </span>
                </div>

                <div className="relative">
                  {/* Quote marks */}
                  <div
                    className={`absolute -top-8 ${
                      isRTL ? "right-0" : "left-0"
                    } text-[72px] text-white/10 select-none leading-none`}
                  >
                    “
                  </div>

                  <p className="relative text-xl md:text-3xl font-semibold text-white leading-relaxed">
                    {t("paragraph2")}
                  </p>

                  <div className="mt-8 flex items-center gap-3">
                    <div className="h-px w-20 bg-gradient-to-r from-mainOrange via-[#EB5723]/40 to-transparent" />
                    <span className="text-sm text-white/55">BE BOLD</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Section>
  );
};

export default VisionSection;
