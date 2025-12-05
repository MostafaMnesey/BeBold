"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Section from "../Section/Section";
import ValuesCarousel from "../Cursol/Cursol";
import StackedValues from "../Cursol/Cursol";

const ValuesSection: React.FC = () => {
  const t = useTranslations("values");

  const items = t.raw("items") as Array<{
    label: string;
    title: string;
    desc: string;
  }>;
  console.log(items);
  return (
    <Section>
      <section className="relative  bg-neutral-950  rounded-lg py-20 md:py-28  shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-mainOrange/30 transition-all overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(235,87,35,0.18),_transparent_55%),radial-gradient(circle_at_85%_70%,_rgba(255,255,255,0.05),_transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:78px_78px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.35 }}
            className="text-center mb-10 md:mb-14"
          >
            <p className="text-xs md:text-sm tracking-[0.32em] text-[#EB5723] uppercase">
              {t("title")}
            </p>
            <h2 className="mt-4 text-2xl md:text-4xl lg:text-5xl font-semibold text-white leading-snug">
              {t("subtitle")}
            </h2>
          </motion.div>

          <StackedValues items={items} autoplayDelay={4000} stackDepth={3} />
        </div>
      </section>
    </Section>
  );
};

export default ValuesSection;
