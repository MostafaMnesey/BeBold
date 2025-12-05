"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

export type ValueItem = { label: string; title: string; desc: string };

type Props = {
  items: ValueItem[];
  autoplayDelay?: number;
  stackDepth?: number;
  dir?: "rtl" | "ltr";
};

const clampDepth = (n: number) => Math.max(1, Math.min(5, n));

export default function StackedValues({
  items,
  autoplayDelay = 3800,
  stackDepth = 3,
  dir = "rtl",
}: Props) {
  // ✅ Hooks first (always)
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const depth = clampDepth(stackDepth);

  const len = items.length;

  // ✅ safeIndex بدون hooks
  const safeIndex = len ? ((index % len) + len) % len : 0;

  const next = useCallback(() => {
    setDirection(1);
    setIndex((v) => v + 1);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((v) => v - 1);
  }, []);

  useEffect(() => {
    if (len <= 2) return;
    const t = setInterval(next, autoplayDelay);
    return () => clearInterval(t);
  }, [len, next, autoplayDelay]);

  const cardVariants: Variants = useMemo(
    () => ({
      enter: { opacity: 0, y: 18, scale: 0.98 },
      center: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.35, ease: "easeOut" },
      },
      exit: (d: 1 | -1) => ({
        opacity: 0,
        y: d === 1 ? -18 : 18,
        scale: 0.98,
        transition: { duration: 0.25, ease: "easeIn" },
      }),
    }),
    []
  );

  // ✅ derive indices
  const idx0 = safeIndex;
  const idx1 = len ? (safeIndex + 1) % len : 0;

  // ✅ helper (no hooks)
  const makeStack = useCallback(
    (start: number) => {
      const arr: { item: ValueItem; i: number; pos: number }[] = [];
      const count = Math.min(depth, len);
      for (let pos = 0; pos < count; pos++) {
        const i = (start + pos) % len;
        arr.push({ item: items[i], i, pos });
      }
      return arr;
    },
    [depth, len, items]
  );

  // ✅ stacks (hooks)
  const stack0 = useMemo(() => (len ? makeStack(idx0) : []), [len, makeStack, idx0]);
  const stack1 = useMemo(() => (len ? makeStack(idx1) : []), [len, makeStack, idx1]);

  // ✅ return after hooks
  if (!len) return null;

  return (
    <div className="relative" dir={dir}>
      <div className="grid gap-5 md:gap-6 md:grid-cols-2 overflow-hidden">
        <Lane
          stack={stack0}
          frontKey={`lane0-${idx0}`}
          frontItem={items[idx0]}
          direction={direction}
          variants={cardVariants}
          showBackCards
        />

        <div className="hidden md:block">
          <Lane
            stack={stack1}
            frontKey={`lane1-${idx1}`}
            frontItem={items[idx1]}
            direction={direction}
            variants={cardVariants}
            showBackCards
          />
        </div>
      </div>

     
    </div>
  );
}

function Lane({
  stack,
  frontKey,
  frontItem,
  direction,
  variants,
  showBackCards,
}: {
  stack: { item: ValueItem; i: number; pos: number }[];
  frontKey: string;
  frontItem: ValueItem;
  direction: 1 | -1;
  variants: Variants;
  showBackCards?: boolean;
}) {
  return (
    <div className="relative min-h-[360px] xs:min-h-[350px] sm:min-h-[350px] md:min-h-[300px]">
      {showBackCards &&
        stack
          .slice(1)
          .reverse()
          .map(({ item, i, pos }) => {
            const s = 1 - pos * 0.04;
            const y = pos * 14;
            const blur = pos * 0.2;

            return (
              <div
                key={`bg-${frontKey}-${i}-${pos}`}
                className="absolute inset-0"
                style={{ zIndex: 10 - pos }}
              >
                <div
                  className="h-full w-full rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 md:p-8 shadow-[0_22px_70px_-48px_rgba(0,0,0,0.95)]"
                  style={{
                    transform: `translateY(${y}px) scale(${s})`,
                    filter: `blur(${blur}px)`,
                    opacity: 0.75 - pos * 0.12,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] tracking-[0.28em] text-white/45 uppercase">
                      {item.label}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#EB5723]/70" />
                  </div>
                  <h3 className="mt-4 text-xl md:text-2xl font-semibold text-white/85">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="mt-6 h-px w-20 bg-gradient-to-r from-[#EB5723]/70 via-[#EB5723]/30 to-transparent" />
                </div>
              </div>
            );
          })}

      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        <motion.div
          key={frontKey}
          className="absolute inset-0"
          style={{ zIndex: 50 }}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <div className="group relative h-full rounded-3xl border border-white/10 bg-white/[0.07] backdrop-blur-2xl p-6 md:p-8 shadow-[0_22px_70px_-48px_rgba(0,0,0,0.95)] transition-all duration-300 hover:border-[#EB5723]/60 hover:bg-white/[0.09]">
            <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#EB5723]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-center justify-between">
              <span className="text-[11px] tracking-[0.28em] text-white/55 uppercase">
                {frontItem.label}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#EB5723]" />
            </div>

            <h3 className="mt-4 text-xl md:text-2xl font-semibold text-white">
              {frontItem.title}
            </h3>
            <p className="mt-3 text-sm md:text-base text-white/80 leading-relaxed">
              {frontItem.desc}
            </p>
            <div className="mt-6 h-px w-20 bg-gradient-to-r from-[#EB5723] via-[#EB5723]/40 to-transparent" />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
