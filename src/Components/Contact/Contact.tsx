"use client";

import React from "react";
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
    key:
      | "phone"
      | "whatsapp"
      | "email"
      | "instagram"
      | "facebook"
      | "tiktok"
      | "linkedin";
    title: string;
    desc: string;
    value: string; // display text
    href: string; // tel:, mailto:, https://...
  }>;

  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
};

export default function LocationAndContactWays() {
  const t = useTranslations("");
  const locale = useLocale();
  const isAr = locale.startsWith("ar");

  const data = t.raw("contact") as ContactSection;

  return (
    <Section>
      <section
        className="relative py-16 md:py-20 overflow-hidden"
        dir={isAr ? "rtl" : "ltr"}
      >
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-white/[0.04] to-black/0" />
          <div
            className="absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage:
                "radial-gradient(ellipse at center, black 55%, transparent 78%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 55%, transparent 78%)",
            }}
          />
          <div className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-[#EB5723]/12 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-[420px] w-[420px] rounded-full bg-[#EB5723]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_35%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_65%,rgba(0,0,0,0.85)_100%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4">
          {/* Header */}
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-white/60 text-sm tracking-[0.2em] uppercase">
                {data.kicker}
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl font-semibold text-white">
                {data.title}
              </h2>
              <p className="mt-3 text-white/70 text-sm md:text-base max-w-2xl leading-relaxed">
                {data.subtitle}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-5">
            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-2xl p-6 md:p-7 shadow-[0_22px_70px_-48px_rgba(0,0,0,0.95)]"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  {data.location.title}
                </h3>
                <span className="h-9 w-9 rounded-2xl bg-[#EB5723]/15 border border-[#EB5723]/25 grid place-items-center">
                  <span className="h-2 w-2 rounded-full bg-[#EB5723]" />
                </span>
              </div>

              <div className="mt-5 space-y-2">
                <p className="text-white/85 text-sm md:text-base leading-relaxed">
                  {data.location.addressLine1}
                </p>
                {data.location.addressLine2 && (
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">
                    {data.location.addressLine2}
                  </p>
                )}
                {data.location.note && (
                  <p className="mt-3 text-white/60 text-sm leading-relaxed">
                    {data.location.note}
                  </p>
                )}
              </div>

              {/* mini map placeholder (optional) */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="relative overflow-hidden rounded-xl border border-white/10">
                  {/* Optional subtle overlay (keeps your theme) */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] to-black/0 z-10" />

                  {/* Responsive Map */}
                  <iframe
                    title="Be Bold Location on Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3427.396721941261!2d30.99109291150262!3d30.79150708268302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7c9226ad07d5d%3A0x57fb03e6328cbec7!2sBeBold%20Agancy!5e0!3m2!1sen!2seg!4v1764940354061!5m2!1sen!2seg"
                    className="relative z-0 h-52 w-full md:h-60"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <p className="mt-3 text-white/60 text-xs leading-relaxed">
                  {isAr ? "موقعنا على الخريطة." : "Our location on the map."}
                </p>
              </div>
            </motion.div>

            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="md:col-span-3 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-6 md:p-8 shadow-[0_22px_70px_-48px_rgba(0,0,0,0.95)]"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  {data.methodsTitle}
                </h3>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {data.methods.map((m) => (
                  <a
                    key={m.key}
                    href={m.href}
                    target={m.href.startsWith("http") ? "_blank" : undefined}
                    rel={m.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 hover:bg-white/[0.06] transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-white font-semibold">{m.title}</h4>
                        <p className="mt-1 text-white/65 text-sm leading-relaxed">
                          {m.desc}
                        </p>
                      </div>
                      <span className="mt-1 h-8 w-8 rounded-xl bg-[#EB5723]/12 border border-[#EB5723]/20 grid place-items-center">
                        <span className="h-2 w-2 rounded-full bg-[#EB5723]" />
                      </span>
                    </div>

                    <div className="mt-3 text-white/85 text-sm font-medium break-all">
                      {m.value}
                    </div>

                    <div className="mt-3 h-px w-16 bg-gradient-to-r from-[#EB5723]/70 via-[#EB5723]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={data.ctaPrimary.href}
                  className="inline-flex items-center justify-center h-11 px-5 rounded-full bg-[#EB5723] text-white font-semibold hover:opacity-95 transition"
                >
                  {data.ctaPrimary.label}
                </a>
                <a
                  href={data.ctaSecondary.href}
                  className="inline-flex items-center justify-center h-11 px-5 rounded-full bg-white/10 border border-white/10 text-white/90 hover:bg-white/15 transition"
                >
                  {data.ctaSecondary.label}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Section>
  );
}
