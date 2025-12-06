"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

export type ValueItem = { label: string; title: string; desc: string };

type Props = {
  items: ValueItem[];
  autoplayDelay?: number;
  stackDepth?: number; // 2-4 مناسب
  dir?: "rtl" | "ltr";
  showSecondOnMobile?: boolean;
};

const clampDepth = (n: number) => Math.max(1, Math.min(4, n));

export default function StackedValues({
  items,
  autoplayDelay = 3800,
  stackDepth = 3,
  dir = "rtl",
  showSecondOnMobile = false,
}: Props) {
  const len = items.length;

  // ✅ hooks first
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const depth = clampDepth(stackDepth);
  const safeIndex = ((index % len) + len) % len;

  const idx0 = safeIndex;
  const idx1 = (safeIndex + 1) % len;

  const next = useCallback(() => {
    setDirection(1);
    setIndex((v) => v + 1);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((v) => v - 1);
  }, []);

  // ✅ autoplay safer: stop when tab hidden
  useEffect(() => {
    if (len <= 2) return;

    let t: number | null = null;

    const start = () => {
      if (t) return;
      t = window.setInterval(next, autoplayDelay);
    };
    const stop = () => {
      if (!t) return;
      window.clearInterval(t);
      t = null;
    };

    const onVis = () => {
      if (document.hidden) stop();
      else start();
    };

    onVis();
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [len, next, autoplayDelay]);

  // ✅ Variants typed (exit is function with custom)
  const cardVariants = useMemo<Variants>(
    () => ({
      enter: { opacity: 0, y: 16, scale: 0.985 },
      center: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.35, ease: "easeOut" },
      },
      exit: (d: 1 | -1) => ({
        opacity: 0,
        y: d === 1 ? -16 : 16,
        scale: 0.985,
        transition: { duration: 0.25, ease: "easeIn" },
      }),
    }),
    []
  );

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
    [items, depth, len]
  );

  const stack0 = useMemo(() => makeStack(idx0), [makeStack, idx0]);
  const stack1 = useMemo(() => makeStack(idx1), [makeStack, idx1]);

  // ✅ early return after hooks
  if (!len) return null;

  return (
    <div className="relative" dir={dir}>
      <div className="grid gap-5 md:gap-6 md:grid-cols-2">
        <Lane
          stack={stack0}
          frontKey={`lane0-${idx0}`}
          frontItem={items[idx0]}
          direction={direction}
          variants={cardVariants}
        />

        <div className={showSecondOnMobile ? "block" : "hidden md:block"}>
          <Lane
            stack={stack1}
            frontKey={`lane1-${idx1}`}
            frontItem={items[idx1]}
            direction={direction}
            variants={cardVariants}
          />
        </div>
      </div>

      {/* Controls (لو محتاج) */}
      {/* <div className="mt-7 flex items-center justify-center gap-3">
        <button onClick={prev} className="h-10 px-4 rounded-full bg-white/10 border border-white/10 text-white/90">Prev</button>
        <button onClick={next} className="h-10 px-4 rounded-full bg-white/10 border border-white/10 text-white/90">Next</button>
      </div> */}
    </div>
  );
}

function Lane({
  stack,
  frontKey,
  frontItem,
  direction,
  variants,
}: {
  stack: { item: ValueItem; i: number; pos: number }[];
  frontKey: string;
  frontItem: ValueItem;
  direction: 1 | -1;
  variants: Variants;
}) {
  return (
    <div className="relative h-[280px] sm:h-[300px] md:h-[340px]">
      {/* Back cards */}
      {stack
        .slice(1)
        .reverse()
        .map(({ item, i, pos }) => {
          const s = 1 - pos * 0.04;
          const y = pos * 12;

          return (
            <div
              key={`bg-${frontKey}-${i}-${pos}`}
              className="absolute inset-0"
              style={{ zIndex: 10 - pos }}
            >
              <div
                className="
                  h-full w-full rounded-md border border-white/10
                  bg-white/[0.04] backdrop-blur-2xl
                  p-6 md:p-8
                  shadow-[0_22px_70px_-48px_rgba(0,0,0,0.90)]
                  transform-gpu
                "
                style={{
                  transform: `translateY(${y}px) scale(${s})`,
                  opacity: 0.82 - pos * 0.12,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] tracking-[0.28em] text-white/45 uppercase">
                    {item.label}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#EB5723]/60" />
                </div>

                <h3 className="mt-4 text-xl md:text-2xl font-semibold text-white/85">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed line-clamp-4">
                  {item.desc}
                </p>

                <div className="mt-6 h-px w-20 bg-gradient-to-r from-[#EB5723]/60 via-[#EB5723]/25 to-transparent" />
              </div>
            </div>
          );
        })}

      {/* Front card */}
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
          <div
            className="
              group relative h-full rounded-md
              border border-white/10
              bg-white/[0.07] backdrop-blur-2xl
              p-6 md:p-8
              shadow-[0_22px_70px_-48px_rgba(0,0,0,0.95)]
              transition-colors duration-300
              hover:border-[#EB5723]/55 hover:bg-white/[0.09]
              transform-gpu will-change-transform
            "
          >
            <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#EB5723]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-center justify-between">
              <span className="text-[11px] tracking-[0.28em] text-white/55 uppercase">
                {frontItem.label}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#EB5723]" />
            </div>

            <h3 className="mt-4 text-xl md:text-2xl font-semibold text-white">
              {frontItem.title}
            </h3>

            <p className="mt-3 text-sm md:text-base text-white/80 leading-relaxed line-clamp-5">
              {frontItem.desc}
            </p>

            <div className="mt-6 h-px w-20 bg-gradient-to-r from-[#EB5723] via-[#EB5723]/40 to-transparent" />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
