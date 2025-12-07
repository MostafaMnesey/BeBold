"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import BrandingPage from "../Brand/Brand";

type TabKey = "tab1" | "tab2" | "tab3";

type ServicesT = {
  kicker: string;
  title: string;
  subtitle: string;
  tabs: {
    branding: TabData;
    marketing: TabData;
    digital: TabData;
  };
  bottomStrip: { title: string; subtitle: string; tags: string[] };
};

type TabData = {
  eyebrow: string;
  title: string;
  desc: string;
  chips: string[];
  features: Array<{ title: string; text: string }>;
  steps: Array<{ t: string; d: string }>;
  cta: { title: string; text: string; primary: string; secondary: string };
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const panel = {
  hidden: { opacity: 0, y: 10, filter: "blur(2px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.35 },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const spring = { type: "spring", stiffness: 420, damping: 34 } as const;

export default function Services() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale.startsWith("ar");

  const data = t.raw("servicesPage") as ServicesT;

  const [active, setActive] = useState<TabKey>("tab1");

  const tabs = useMemo(
    () => [
      { key: "tab1" as const, ...data.tabs.branding },
      { key: "tab2" as const, ...data.tabs.marketing },
      { key: "tab3" as const, ...data.tabs.digital },
    ],
    [data]
  );

  const current = tabs.find((x) => x.key === active)!;

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="relative z-10">
      {/* Header */}
      <section className="px-4 pt-28 pb-10">
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
        </div>
      </section>

      {/* Shell */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-2xl shadow-[0_22px_70px_-48px_rgba(0,0,0,0.95)] overflow-hidden">
            {/* subtle glow */}
            <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#EB5723]/12 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

            {/* Tabs (segmented) */}
            <div className="p-3 md:p-4">
              <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-black/20 p-2">
                {tabs.map((tab) => {
                  const isActive = tab.key === active;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActive(tab.key)}
                      className={[
                        "relative h-14 rounded-2xl px-4 text-start transition",
                        "border border-transparent hover:border-white/10",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EB5723]/40",
                        isActive
                          ? "text-white"
                          : "text-white/75 hover:text-white",
                      ].join(" ")}
                      type="button"
                    >
                      {/* active background */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTabBg"
                          transition={spring}
                          className="absolute inset-0 rounded-2xl bg-white/[0.06] border border-[#EB5723]/25 shadow-[0_0_0_1px_rgba(235,87,35,0.15)]"
                        />
                      )}

                      <div className="relative flex items-center justify-between gap-3">
                        <div>
                          <div className="text-[11px] tracking-[0.18em] uppercase text-white/50">
                            {tab.eyebrow}
                          </div>
                          <div className="mt-0.5 font-semibold">
                            {tab.title}
                          </div>
                        </div>

                        <span
                          className={[
                            "h-2.5 w-2.5 rounded-full transition",
                            isActive
                              ? "bg-[#EB5723] shadow-[0_0_22px_rgba(235,87,35,0.45)]"
                              : "bg-white/25",
                          ].join(" ")}
                        />
                      </div>

                      {/* animated underline */}
                      {isActive && (
                        <motion.div
                          layoutId="activeUnderline"
                          transition={spring}
                          className="absolute left-5 right-5 bottom-2 h-px bg-gradient-to-r from-transparent via-[#EB5723] to-transparent"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 md:p-8 border-t border-white/10">
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Left summary */}
                <div className="lg:col-span-1">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-xl md:text-2xl font-semibold text-white">
                      {current.title}
                    </h2>
                    <span className="inline-flex h-2 w-2 rounded-full bg-[#EB5723]" />
                  </div>

                  <p className="mt-3 text-white/70 leading-relaxed">
                    {current.desc}
                  </p>

                  {/* chips */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {current.chips.map((c, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-full bg-white/8 border border-white/10 text-white/75 text-xs"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 h-px w-28 bg-gradient-to-r from-[#EB5723] via-[#EB5723]/35 to-transparent" />

                  {/* mini process */}
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="text-white font-semibold">
                      {isAr ? "طريقة الشغل" : "How it works"}
                    </div>

                    <div className="mt-4 space-y-3">
                      {current.steps.map((s, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#EB5723]/90" />
                          <div className="flex-1">
                            <div className="text-white/90 text-sm font-semibold">
                              {s.t}
                            </div>
                            <div className="text-white/65 text-sm">{s.d}</div>
                          </div>
                          <div className="text-white/35 text-xs">
                            {String(i + 1).padStart(2, "0")}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 rounded-2xl border border-[#EB5723]/25 bg-[#EB5723]/10 p-5">
                    <div className="text-white font-semibold">
                      {current.cta.title}
                    </div>
                    <p className="mt-2 text-white/75 text-sm leading-relaxed">
                      {current.cta.text}
                    </p>
                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                      <button className="h-11 px-6 rounded-full bg-[#EB5723] text-white font-semibold hover:opacity-95 transition">
                        {current.cta.primary}
                      </button>
                      <button className="h-11 px-6 rounded-full bg-white/10 border border-white/12 text-white font-semibold hover:bg-white/15 transition">
                        {current.cta.secondary}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Features */}
                <div className="lg:col-span-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.key}
                      variants={panel}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      className="grid gap-4 md:grid-cols-3"
                    >
                      {current.features.map((f, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ y: -4 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                          className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 hover:bg-white/[0.06] transition"
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-[#EB5723] text-sm font-semibold tracking-wide">
                              {String(i + 1).padStart(2, "0")}
                            </div>
                            <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                          </div>

                          <h3 className="mt-3 text-white font-semibold">
                            {f.title}
                          </h3>
                          <p className="mt-2 text-white/70 text-sm leading-relaxed">
                            {f.text}
                          </p>

                          <div className="mt-5 h-px w-16 bg-gradient-to-r from-[#EB5723]/80 via-[#EB5723]/25 to-transparent" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  {/* bottom strip */}
                  <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-black/0 backdrop-blur-2xl p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="text-white font-semibold">
                          {data.bottomStrip.title}
                        </div>
                        <div className="mt-1 text-white/70 text-sm">
                          {data.bottomStrip.subtitle}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {data.bottomStrip.tags.map((x, idx) => (
                          <span
                            key={`${x}-${idx}`}
                            className="px-3 py-2 rounded-full bg-white/10 border border-white/10 text-white/80 text-xs"
                          >
                            {x}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end content */}
          </div>
        </div>
      </section>

      <BrandingPage />
    </div>
  );
}
