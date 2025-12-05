"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Section from "../Section/Section";

type ExclusiveAdvantage = {
  kicker: string; // EXCLUSIVE ADVANTAGE / ميزة حصرية
  title: string; // العنوان
  headline: string; // الجملة الكبيرة
  paragraphs: string[];
  highlight: string;
  tags: string[];
  benefits: { title: string; desc: string }[];
  ctaPrimary: string;
  ctaSecondary: string;
};

export default function ExclusiveAdvantageSection() {
  const t = useTranslations("");
  const locale = useLocale();
  const isAr = locale.startsWith("ar");

  const data = t.raw("exclusiveAdvantage") as ExclusiveAdvantage;

  return (
    <Section>
      <section
        className="relative  bg-neutral-950  rounded-lg py-20 md:py-28  shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-mainOrange/30 transition-all overflow-hidden"
        dir={isAr ? "rtl" : "ltr"}
      >
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-white/[0.04] to-black/0" />
          <div
            className="absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
              maskImage:
                "radial-gradient(ellipse at center, black 55%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 55%, transparent 75%)",
            }}
          />
          <div className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-[#EB5723]/12 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-[420px] w-[420px] rounded-full bg-[#EB5723]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_35%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_65%,rgba(0,0,0,0.85)_100%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:gap-8 md:grid-cols-5 items-stretch">
            {/* Left card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55 }}
              className="md:col-span-2 rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-2xl p-6 md:p-7 shadow-[0_22px_70px_-48px_rgba(0,0,0,0.95)]"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EB5723]/15 border border-[#EB5723]/25">
                  <span className="h-2 w-2 rounded-full bg-[#EB5723]" />
                </span>

                <div>
                  <p className="text-[11px] tracking-[0.28em] text-white/55 uppercase">
                    {data.kicker}
                  </p>
                  <h3 className="mt-1 text-lg md:text-xl font-semibold text-white">
                    {data.title}
                  </h3>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-white/75 leading-relaxed text-sm md:text-base">
                {data.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-white/80 text-sm">{data.highlight}</p>
                <div className="mt-3 h-px w-full bg-gradient-to-r from-[#EB5723]/70 via-[#EB5723]/20 to-transparent" />
                <div className="mt-3 flex flex-wrap gap-2">
                  {data.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[12px] px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="md:col-span-3 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 md:p-8 shadow-[0_22px_70px_-48px_rgba(0,0,0,0.95)] relative"
            >
              <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#EB5723]/10 blur-3xl opacity-70" />

              <h2 className="text-2xl md:text-3xl font-semibold text-white leading-tight">
                {data.headline}
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {data.benefits.map((b) => (
                  <Benefit key={b.title} title={b.title} desc={b.desc} />
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center h-11 px-5 rounded-full bg-[#EB5723] text-white font-semibold hover:opacity-95 transition"
                >
                  {data.ctaPrimary}
                </a>
                <a
                  href="#work"
                  className="inline-flex items-center justify-center h-11 px-5 rounded-full bg-white/10 border border-white/10 text-white/90 hover:bg-white/15 transition"
                >
                  {data.ctaSecondary}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Section>
  );
}

function Benefit({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-start gap-3">
        <span className="mt-1 h-2 w-2 rounded-full bg-[#EB5723]" />
        <div>
          <h4 className="text-white font-semibold">{title}</h4>
          <p className="mt-1 text-white/70 text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}
