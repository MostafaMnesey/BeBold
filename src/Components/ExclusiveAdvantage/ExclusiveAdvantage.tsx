"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Section from "../Section/Section";

type ExclusiveAdvantageData = {
  kicker: string;
  title: string;
  headline: string;
  paragraphs: string[];
  highlight: string;
  tags: string[];
  benefits: Array<{ title: string; desc: string }>;
  ctaPrimary?: string;
  ctaSecondary?: string;
};

export default function ExclusiveAdvantage() {
  const t = useTranslations("");
  const locale = useLocale();
  const isAr = locale.startsWith("ar");

  const data = useMemo(
    () => t.raw("exclusiveAdvantage") as ExclusiveAdvantageData,
    [t]
  );

  return (
    <Section>
      <section dir={isAr ? "rtl" : "ltr"} className="relative">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 right-10 h-64 w-64 rounded-full bg-[#EB5723]/10 blur-3xl" />
          <div className="absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
            className="text-white/60 text-sm tracking-[0.2em] uppercase"
          >
            {data.kicker}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mt-2 text-3xl md:text-4xl font-semibold text-white"
          >
            {data.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-3 text-white/80 max-w-3xl leading-relaxed text-base md:text-lg"
          >
            {data.headline}
          </motion.p>

          {/* Main grid */}
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {/* Left: narrative + tags + highlight */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
              className="
                lg:col-span-2 relative
                rounded-md border border-white/10
                bg-white/[0.06] backdrop-blur-2xl
                p-6 md:p-8
                shadow-[0_22px_70px_-48px_rgba(0,0,0,0.9)]
                transform-gpu
              "
            >
              <div className="pointer-events-none absolute -top-20 -right-24 h-56 w-56 rounded-full bg-[#EB5723]/10 blur-3xl" />

              <div className="space-y-4">
                {data.paragraphs?.map((p, idx) => (
                  <p key={idx} className="text-white/75 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              {/* Highlight pill */}
              {!!data.highlight && (
                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-[#EB5723]" />
                  <span className="text-white/80 text-sm">
                    {data.highlight}
                  </span>
                </div>
              )}

              {/* Tags */}
              {!!data.tags?.length && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {data.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="
                        rounded-full border border-white/10
                        bg-white/[0.04]
                        px-3 py-1.5
                        text-white/75 text-xs
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA */}
              {(data.ctaPrimary || data.ctaSecondary) && (
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  {data.ctaPrimary && (
                    <button
                      type="button"
                      className="
                        h-11 px-5 rounded-full
                        bg-[#EB5723] text-black font-semibold
                        hover:opacity-90 transition
                      "
                    >
                      {data.ctaPrimary}
                    </button>
                  )}
                  {data.ctaSecondary && (
                    <button
                      type="button"
                      className="
                        h-11 px-5 rounded-full
                        bg-white/10 text-white font-semibold
                        border border-white/10
                        hover:bg-white/15 transition
                      "
                    >
                      {data.ctaSecondary}
                    </button>
                  )}
                </div>
              )}
            </motion.div>

            {/* Right: benefits */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="
                rounded-md border border-white/10
                bg-gradient-to-b from-white/[0.06] to-black/0
                backdrop-blur-2xl
                p-6 md:p-8
                shadow-[0_22px_70px_-48px_rgba(0,0,0,0.9)]
                transform-gpu
              "
            >
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-sm">
                  {isAr ? "النتيجة" : "Outcome"}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#EB5723]" />
              </div>

              <div className="mt-5 grid gap-3">
                {data.benefits?.map((b, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#EB5723]/90" />
                      <div>
                        <h3 className="text-white font-semibold">{b.title}</h3>
                        <p className="mt-1 text-white/70 text-sm leading-relaxed">
                          {b.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 h-px w-24 bg-gradient-to-r from-[#EB5723] via-[#EB5723]/40 to-transparent" />

              <p className="mt-4 text-white/55 text-xs leading-relaxed">
                {isAr
                  ? "ميزة تنافسية في سرعة التنفيذ، وضبط التفاصيل، وتكلفة إنتاج أكثر كفاءة."
                  : "A competitive edge in speed, detail control, and more efficient production cost."}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Section>
  );
}
