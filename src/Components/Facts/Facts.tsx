"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Section from "../Section/Section";

type Facts = {
  title: string;
  subtitle: string;
  items: Array<{
    value: number;
    decimals?: number;
    suffix?: string;
    prefix?: string;
    label: string;
    desc: string;
  }>;
};

type Stat = Facts["items"][number];

function formatNumber(n: number, decimals = 0) {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function useCountUp(target: number, start: boolean, durationMs = 1200) {
  const [val, setVal] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    const t0 = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(target * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, start, durationMs]);

  return val;
}

export default function FactsCounters() {
  const t = useTranslations("");
  const locale = useLocale();
  const isAr = locale.startsWith("ar");

  const facts = t.raw("facts") as Facts;

  return (
    <Section>
      <section
        className="bg-gradient-to-l from-black/0 py-10  via-white/5 to-black/0"
        dir={isAr ? "rtl" : "ltr"}
      >
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-white/60 text-sm tracking-[0.2em] uppercase">
            {facts.title}
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold text-white">
            {facts.subtitle}
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facts?.items?.map((stat, i) => (
              <StatCard key={i} stat={stat} />
            ))}
          </div>
        </div>
      </section>
    </Section>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const animated = useCountUp(stat.value, inView, 1200);

  const shown = inView ? animated : 0;
  const decimals = stat.decimals ?? 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45 }}
      className="rounded-3xl border hover:border-mainOrange/50 transition-transform transition-colors hover:scale-[1.05] hover:shadow-mainOrange border-white/10 bg-white/[0.06] backdrop-blur-2xl p-6 md:p-7 shadow-[0_22px_70px_-48px_rgba(0,0,0,0.95)] transform-gpu will-change-transform"
    >
      <div className="flex items-baseline gap-2">
        <div className="text-4xl md:text-5xl font-semibold text-white tabular-nums">
          {stat.prefix ?? ""}
          {formatNumber(shown, decimals)}
        </div>
        <div className="text-xl md:text-2xl font-semibold text-[#EB5723]">
          {stat.suffix ?? ""}
        </div>
      </div>

      <h3 className="mt-3 text-base md:text-lg font-semibold text-white">
        {stat.label}
      </h3>
      <p className="mt-2 text-sm md:text-base text-white/75 leading-relaxed">
        {stat.desc}
      </p>
    </motion.div>
  );
}
