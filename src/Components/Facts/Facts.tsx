"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { log } from "console";
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
        className="relative  bg-neutral-950  rounded-lg py-20 md:py-28  shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-mainOrange/30 transition-all overflow-hidden"
        dir={isAr ? "rtl" : "ltr"}
      >
        {/* Background layers */}
        <div className="pointer-events-none absolute inset-0">
          {/* soft base */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-white/[0.04] to-black/0" />

          {/* subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.18]"
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

          {/* orange glow */}
          <div className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-[#EB5723]/12 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-[420px] w-[420px] rounded-full bg-[#EB5723]/10 blur-3xl" />

          {/* vignette */}
          <div className="absolute inset-0 bg-radial-fade" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4">
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
      className="rounded-3xl border hover:border-mainOrange/50 transition-all hover:scale-[1.2] hover:shadow-mainOrange border-white/10 bg-white/[0.06] backdrop-blur-2xl p-6 md:p-7 shadow-[0_22px_70px_-48px_rgba(0,0,0,0.95)]"
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
