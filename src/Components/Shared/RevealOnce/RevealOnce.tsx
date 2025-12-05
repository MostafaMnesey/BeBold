"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  delayMs?: number; // يبدأ بعد قد ايه
  showMs?: number; // يفضل ظاهر قد ايه
  className?: string;
};

export default function RevealOnce({
  children,
  delayMs = 0,
  showMs = 1600,
  className = "",
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setVisible(true), delayMs);
    const t2 = window.setTimeout(() => setVisible(false), delayMs + showMs);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [delayMs, showMs]);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          className={className}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
