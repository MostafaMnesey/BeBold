"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Section from "../Section/Section";

type MissionT = {
  title: string;
  subtitle: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  brandStory: string;
  purposefulGrowth: string;
  partnershipNotJustService: string;
  makingBrandsMatter: string;
};

export default function Mission() {
  const t = useTranslations("mission");
  const locale = useLocale();
  const isAr = locale.startsWith("ar");

  const items = [
    t("brandStory"),
    t("purposefulGrowth"),
    t("partnershipNotJustService"),
    t("makingBrandsMatter"),
  ];

  return (
    <Section>
      <section dir={isAr ? "rtl" : "ltr"} className="relative">
        <div className="mx-auto max-w-6xl px-4">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
            className="text-3xl md:text-4xl font-semibold text-white"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="mt-3 text-white/75 max-w-3xl leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
              className="
                rounded-3xl border border-white/10
                bg-white/[0.06] backdrop-blur-2xl
                p-6 md:p-8
                shadow-[0_22px_70px_-48px_rgba(0,0,0,0.9)]
                transform-gpu
              "
            >
              <p className="text-white/80 leading-relaxed">{t("paragraph1")}</p>
              <p className="mt-4 text-white/80 leading-relaxed">
                {t("paragraph2")}
              </p>
              <p className="mt-4 text-white/80 leading-relaxed">
                {t("paragraph3")}
              </p>

              <div className="mt-6 h-px w-24 bg-gradient-to-r from-[#EB5723] via-[#EB5723]/35 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: 0.06 }}
              className="
                rounded-3xl border border-white/10
                bg-white/[0.06] backdrop-blur-2xl
                p-6 md:p-8
                shadow-[0_22px_70px_-48px_rgba(0,0,0,0.9)]
                transform-gpu
              "
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {items.map((it, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-white font-semibold">{it}</p>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#EB5723]" />
                    </div>
                    <p className="mt-2 text-white/60 text-sm leading-relaxed">
                      {isAr
                        ? "بنشتغل على كل تفصيلة بهدف واضح ونتيجة قابلة للقياس."
                        : "We build every detail with clear intent and measurable outcomes."}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Section>
  );
}
