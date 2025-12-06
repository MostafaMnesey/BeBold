// import Silk from "../Silk";

// export default function About() {
//   return (
//     <div className="relative w-full overflow-hidden leading-4 bg-black">
//       {/* ===== Background Layer - Covers all sections ===== */}
//       <div className="fixed inset-0 z-0">
//         <Silk desktopMotion="low" />
//       </div>

//       {/* ===== Overlays Layer (darken + focus center) ===== */}
//       <div className="pointer-events-none fixed inset-0 z-10">
//         {/* dark gradient */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/80" />
//         {/* center vignette */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.75)_60%,rgba(0,0,0,0.95)_100%)]" />
//       </div>

//       {/* ===== Decorative blobs ===== */}
//       <div className="pointer-events-none absolute inset-0 z-10">
//         <div className="absolute -top-20 -left-24 w-[520px] h-[520px] rounded-full blur-3xl bg-[#EB5723]/18 animate-blob" />
//         <div className="absolute -bottom-28 -right-24 w-[620px] h-[620px] rounded-full blur-3xl bg-purple-500/18 animate-blob animation-delay-2000" />
//       </div>
//     </div>
//   );
// }
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";


type AboutT = {
  kicker: string;
  title: string;
  subtitle: string;
  constants: string[];
  stats: Array<{ value: string; label: string }>;
  story: { title: string; p1: string; p2: string; p3: string };
  pillars: { title: string; items: Array<{ title: string; desc: string }> };
  timeline: {
    title: string;
    items: Array<{ year: string; title: string; desc: string }>;
  };
  team: { title: string; subtitle: string };
  cta: { title: string; subtitle: string; primary: string; secondary: string };
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function AboutPage() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale.startsWith("ar");

  const data = t.raw("about") as AboutT;

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="relative z-10">
      {/* HERO */}
      <section className="px-4 pt-28 pb-14">
        <div className="mx-auto max-w-6xl">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-white/60 text-sm tracking-[0.2em] uppercase"
          >
            {data.kicker}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-3 text-3xl md:text-5xl font-semibold text-white max-w-3xl leading-tight"
          >
            {data.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 text-white/70 max-w-2xl leading-relaxed"
          >
            {data.subtitle}
          </motion.p>

          {/* Stats */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {data.stats.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-md border border-white/10 bg-white/[0.06] backdrop-blur-2xl p-6 shadow-[0_22px_70px_-48px_rgba(0,0,0,0.95)]"
              >
                <div className="text-3xl md:text-4xl font-semibold text-white">
                  {s.value}
                </div>
                <div className="mt-2 text-white/70 text-sm">{s.label}</div>
                <div className="mt-5 h-px w-20 bg-gradient-to-r from-[#EB5723] via-[#EB5723]/35 to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY + PILLARS */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-3">
          {/* Story */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            className="lg:col-span-1 rounded-md border border-white/10 bg-white/[0.06] backdrop-blur-2xl p-7 md:p-8 shadow-[0_22px_70px_-48px_rgba(0,0,0,0.9)]"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              {data.story.title}
            </h2>
            <div className="mt-5 space-y-4 text-white/75 leading-relaxed text-sm md:text-base">
              <p>{data.story.p1}</p>
              <p>{data.story.p2}</p>
              <p>{data.story.p3}</p>
            </div>
          </motion.div>

          {/* Pillars */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            className="lg:col-span-2 rounded-md border border-white/10 bg-gradient-to-b from-white/[0.07] to-black/0 backdrop-blur-2xl p-7 md:p-8 shadow-[0_22px_70px_-48px_rgba(0,0,0,0.9)]"
          >
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-semibold text-white">
                {data.pillars.title}
              </h2>
              <span className="inline-flex h-2 w-2 rounded-full bg-[#EB5723]" />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {data.pillars.items.map((p, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 hover:bg-white/[0.06] transition"
                >
                  <div className="text-[#EB5723] text-sm font-semibold tracking-wide">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-2 text-white font-semibold">{p.title}</h3>
                  <p className="mt-2 text-white/70 text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            className="text-2xl md:text-3xl font-semibold text-white"
          >
            {data.timeline.title}
          </motion.h2>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {data.timeline.items.map((it, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                className="rounded-md border border-white/10 bg-white/[0.06] backdrop-blur-2xl p-6 shadow-[0_22px_70px_-48px_rgba(0,0,0,0.9)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">{it.year}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#EB5723]" />
                </div>
                <h3 className="mt-3 text-white font-semibold text-lg">
                  {it.title}
                </h3>
                <p className="mt-2 text-white/70 leading-relaxed text-sm">
                  {it.desc}
                </p>
                <div className="mt-5 h-px w-24 bg-gradient-to-r from-[#EB5723]/80 via-[#EB5723]/30 to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl rounded-md border border-white/10 bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-black/0 backdrop-blur-2xl p-8 md:p-10 shadow-[0_22px_70px_-48px_rgba(0,0,0,0.9)]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white">
                {data.team.title}
              </h2>
              <p className="mt-2 text-white/70 max-w-2xl">
                {data.team.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
              {data?.constants.map((x, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] h-16 w-full md:w-28 flex items-center justify-center text-white/75 text-sm"
                >
                  {x}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl rounded-md border border-[#EB5723]/25 bg-[#EB5723]/10 backdrop-blur-2xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white">
                {data.cta.title}
              </h2>
              <p className="mt-2 text-white/75 max-w-2xl">
                {data.cta.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/${locale}/contact`}
                className="h-11 px-6 rounded-full bg-[#EB5723] text-white font-semibold flex items-center justify-center hover:opacity-95 transition"
              >
                {data.cta.primary}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="h-11 px-6 rounded-full bg-white/10 border border-white/12 text-white font-semibold flex items-center justify-center hover:bg-white/14 transition"
              >
                {data.cta.secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
