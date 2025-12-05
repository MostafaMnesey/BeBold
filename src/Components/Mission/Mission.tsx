"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Section from "../Section/Section";

const MissionSection: React.FC = () => {
  const t = useTranslations("mission");

  const cards = [
    {
      id: 1,
      label: "01",
      title: t("purposefulGrowth"),
      text: t("paragraph1"),
    },
    {
      id: 2,
      label: "02",
      title: t("partnershipNotJustService"),
      text: t("paragraph2"),
    },
    {
      id: 3,
      label: "03",
      title: t("makingBrandsMatter"),
      text: t("paragraph3"),
    },
  ];

  return (
    <Section>
      <section className="relative  bg-neutral-950  rounded-lg py-20 md:py-28  shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-mainOrange/30 transition-all overflow-hidden">
        {/* subtle gradient background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(235,87,35,0.2),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.04),_transparent_55%)]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
          {/* Section header */}
          <div className="flex flex-col items-center text-center gap-4 mb-12 md:mb-16">
            <p className="text-lg tracking-[0.25em] text-[#EB5723] uppercase">
              {t("title")}
            </p>
            <h2 className="text-2xl md:text-4xl font-semibold text-white max-w-2xl leading-snug">
              {t("subtitle")}
            </h2>
          </div>

          {/* Cards */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-3">
            {cards.map((card, idx) => (
              <motion.article
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                viewport={{ once: true, amount: 0.3 }}
                className="
                group relative flex flex-col h-full
                rounded-3xl border border-white/10
                bg-white/5 backdrop-blur-xl
                px-5 py-6 md:px-6 md:py-7
                shadow-[0_18px_60px_-30px_rgba(0,0,0,0.9)]
                transition-all duration-300
                hover:border-[#EB5723]/70
                hover:bg-white/10
                hover:shadow-[0_18px_60px_-30px_rgba(235,87,35,0.9)]
                transform-gpu will-change-transform
                hover:-translate-y-1
                hover:scale-[1.03] md:hover:scale-[1.05]
                hover:z-10
              "
              >
                {/* Accent gradient blob */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_top,_rgba(235,87,35,0.14),_transparent_60%)]" />

                <div className="relative z-10 flex flex-col gap-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] tracking-[0.34em] text-white/60 uppercase">
                      {t("brandStory")}
                    </span>
                    <span className="text-xs font-medium text-white/60">
                      {card.label}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-semibold text-white">
                    {card.title}
                  </h3>

                  <p className="mt-1 text-sm md:text-[15px] leading-relaxed text-white/80">
                    {card.text}
                  </p>

                  {/* underline accent */}
                  <div className="mt-4 h-px w-10 rounded-full bg-gradient-to-r from-[#EB5723] via-[#EB5723]/40 to-transparent group-hover:w-16 transition-all duration-300" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Section>
  );
};

export default MissionSection;
