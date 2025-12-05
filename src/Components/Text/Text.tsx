"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type TypewriterTextProps = {
  text: string;
  speed?: number; // سرعة الكتابة (ms)
  deleteSpeed?: number; // سرعة المسح (ms)
  pause?: number; // وقفة بعد ما يكمّل كتابة/مسح (ms)
  loop?: boolean;
  className?: string;
};

export function TypewriterText({
  text,
  speed = 35,
  deleteSpeed = 20,
  pause = 900,
  loop = true,
  className = "",
}: TypewriterTextProps) {
  const [out, setOut] = useState("");


  useEffect(() => {
    let mounted = true;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const sleep = (ms: number) =>
      new Promise<void>((res) => {
        timeoutId = setTimeout(res, ms);
      });

    const run = async () => {
      while (mounted) {
        // type
        for (let i = 1; i <= text.length && mounted; i++) {
          setOut(text.slice(0, i));
          await sleep(speed);
        }

        if (!loop) break;

        await sleep(pause);

        // delete
        for (let i = text.length; i >= 0 && mounted; i--) {
          setOut(text.slice(0, i));
          await sleep(deleteSpeed);
        }

        await sleep(pause / 2);
      }
    };

    setOut("");
    run();

    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [text, speed, deleteSpeed, pause, loop]);

  return (
    <div data-aos="fade-up" className={className}>
      <span>{out}</span>
      <motion.span
        className="inline-block translate-y-[1px] ml-1"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.9, repeat: Infinity }}
      >
        |
      </motion.span>
    </div>
  );
}
