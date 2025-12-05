"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Section from "../Section/Section";

type ContactSection = {
  kicker: string;
  title: string;
  subtitle: string;

  location: {
    title: string;
    addressLine1: string;
    addressLine2?: string;
    note?: string;
  };

  methodsTitle: string;
  methods: Array<{
    key: "phone" | "whatsapp" | "email" | "instagram" | "facebook" | "tiktok";
    title: string;
    value: string;
    href: string;
    note?: string;
  }>;

  mapNote?: string;
};

export default function Contact() {
  const t = useTranslations("");
  const locale = useLocale();
  const isAr = locale.startsWith("ar");

  const data = t.raw("contact") as ContactSection;

  const items = useMemo(() => data.methods ?? [], [data.methods]);

  return (
    <Section>
      <section dir={isAr ? "rtl" : "ltr"} className="relative">
        {/* Background accents (static, cheap) */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[520px] rounded-full bg-[#EB5723]/10 blur-3xl opacity-60" />
          <div className="absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-white/5 blur-3xl opacity-40" />
        </div>

        <div className="mx-auto max-w-6xl px-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
            className="text-white/60 text-sm tracking-[0.2em] uppercase"
          >
            {data.kicker}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mt-2 text-3xl md:text-4xl font-semibold text-white"
          >
            {data.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-3 text-white/75 max-w-2xl leading-relaxed"
          >
            {data.subtitle}
          </motion.p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {/* Location card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
              className="
                rounded-3xl border border-white/10
                bg-white/[0.06] backdrop-blur-2xl
                p-6 md:p-8
                shadow-[0_22px_70px_-48px_rgba(0,0,0,0.90)]
                transform-gpu
              "
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold text-lg md:text-xl">
                  {data.location.title}
                </h3>
                <span className="h-2 w-2 rounded-full bg-[#EB5723]" />
              </div>

              <p className="mt-4 text-white/80 leading-relaxed">
                {data.location.addressLine1}
                {data.location.addressLine2 ? (
                  <>
                    <br />
                    {data.location.addressLine2}
                  </>
                ) : null}
              </p>

              {data.location.note ? (
                <p className="mt-3 text-white/55 text-sm leading-relaxed">
                  {data.location.note}
                </p>
              ) : null}

              {/* Map (isolated + content-visibility) */}
              <div
                className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 overflow-hidden"
                style={{
                  contentVisibility: "auto",
                  containIntrinsicSize: "260px",
                }}
              >
                <div className="relative h-[260px] w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-black/0">
                  <iframe
                    title="BeBold location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3427.396721941261!2d30.99109291150262!3d30.79150708268302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7c9226ad07d5d%3A0x57fb03e6328cbec7!2sBeBold%20Agancy!5e0!3m2!1sen!2seg!4v1764940354061!5m2!1sen!2seg"
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ border: 0 }}
                    allowFullScreen
                  />
                </div>

                <p className="mt-3 text-white/60 text-xs leading-relaxed">
                  {data.mapNote ??
                    (isAr
                      ? "يمكنك فتح الخريطة للتوجيه مباشرة."
                      : "Open the map for direct navigation.")}
                </p>
              </div>
            </motion.div>

            {/* Methods card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="
                rounded-3xl border border-white/10
                bg-white/[0.06] backdrop-blur-2xl
                p-6 md:p-8
                shadow-[0_22px_70px_-48px_rgba(0,0,0,0.90)]
                transform-gpu
              "
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold text-lg md:text-xl">
                  {data.methodsTitle}
                </h3>
                <span className="h-2 w-2 rounded-full bg-[#EB5723]" />
              </div>

              <div className="mt-6 grid gap-3">
                {items.map((m) => (
                  <a
                    key={m.key}
                    href={m.href}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      group rounded-2xl border border-white/10 bg-white/[0.04]
                      px-4 py-4
                      transition-colors duration-200
                      hover:bg-white/[0.06] hover:border-[#EB5723]/45
                      flex items-start justify-between gap-3
                    "
                  >
                    <div>
                      <p className="text-white font-semibold">{m.title}</p>
                      <p className="mt-1 text-white/70 text-sm">{m.value}</p>
                      {m.note ? (
                        <p className="mt-2 text-white/50 text-xs leading-relaxed">
                          {m.note}
                        </p>
                      ) : null}
                    </div>

                    <span className="text-[#EB5723]/80 group-hover:text-[#EB5723] transition-colors">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Section>
  );
}
