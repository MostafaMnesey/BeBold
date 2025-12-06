"use client";

import React, { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import ContactForm from "../ContactForm/ContactForm";

type ContactUs = {
  kicker: string;
  title: string;
  subtitle: string;
  info: {
    title: string;
    phoneLabel: string;
    phoneValue: string;
    emailLabel: string;
    emailValue: string;
    addressLabel: string;
    addressValue: string;
  };
  social: {
    title: string;
    instagram: string;
    facebook: string;
    linkedin: string;
  };
  map: {
    title: string;
    note: string;
    iframeSrc: string;
  };
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function ContactClient() {
  const t = useTranslations("");
  const locale = useLocale();
  const isAr = locale.startsWith("ar");

  const data = t.raw("contactUs") as ContactUs;

  const socials = useMemo(
    () => [
      { label: "Instagram", href: data.social.instagram },
      { label: "Facebook", href: data.social.facebook },
      { label: "LinkedIn", href: data.social.linkedin },
    ],
    [data.social]
  );

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className="relative z-10 px-4 pt-28 md:pt-32 pb-16 md:pb-20"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
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

        {/* Layout */}
        <div className="mt-10 order-last grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
          {/* Left column */}
          <section className="lg:col-span-2 space-y-6" data-aos="fade-right">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1">
              <CardShell title={data.info.title}>
                <InfoRow
                  label={data.info.phoneLabel}
                  value={data.info.phoneValue}
                />
                <InfoRow
                  label={data.info.emailLabel}
                  value={data.info.emailValue}
                />
                <InfoRow
                  label={data.info.addressLabel}
                  value={data.info.addressValue}
                />
              </CardShell>

              <CardShell title={data.social.title}>
                <div className="grid gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white/80 hover:bg-white/[0.06] hover:border-[#EB5723]/35 transition"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </CardShell>
            </div>
          </section>

          {/* Right column */}
          <section className="lg:col-span-3 order-first" data-aos="fade-left">
            <ContactForm />
          </section>

          {/* Map full width */}
          <section className="lg:col-span-5">
            <CardShell title={data.map.title}>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
                <iframe
                  title="Google Map"
                  src={data.map.iframeSrc}
                  className="w-full h-[240px] md:h-[320px] lg:h-[380px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="mt-3 text-white/55 text-xs leading-relaxed">
                {data.map.note}
              </p>
            </CardShell>
          </section>
        </div>
      </div>
    </main>
  );
}

function CardShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.06] backdrop-blur-2xl p-5 sm:p-6 md:p-7 shadow-[0_22px_70px_-48px_rgba(0,0,0,0.90)]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-white font-semibold text-base sm:text-lg">
          {title}
        </h2>
        <span className="h-1.5 w-1.5 rounded-full bg-[#EB5723]" />
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 mb-3 last:mb-0">
      <div className="text-white/55 text-xs">{label}</div>
      <div className="mt-1 text-white/85 text-sm leading-relaxed break-words">
        {value}
      </div>
    </div>
  );
}
