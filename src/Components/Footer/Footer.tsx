"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import Section from "../Section/Section";
import Link from "next/link";

type FooterData = {
  brand: { name: string; tagline: string };
  description: string;
  rights: string;
  columns: Array<{
    title: string;
    links: Array<{ label: string; href: string }>;
  }>;
  socials: Array<{ key: string; label: string; href: string }>;
  contact: {
    title: string;
    items: Array<{ label: string; value: string; href: string }>;
  };
};

export default function Footer() {
  const t = useTranslations("");
  const locale = useLocale();
  const isAr = locale.startsWith("ar");

  const data = t.raw("footer") as FooterData;

  return (
    <Section>
      <footer
        className="relative overflow-hidden rounded-lg border-t border-white/10"
        dir={isAr ? "rtl" : "ltr"}
      >
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-black/0 to-black/0" />
          <div className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-mainOrange/10 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-[420px] w-[420px] rounded-full bg-mainOrange/8 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(235,87,35,0.08)_0%,rgba(0,0,0,0)_55%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-14">
          <div className="grid gap-10 md:grid-cols-5">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-mainOrange/15 border border-mainOrange/25 hover:bg-white transition-all grid place-items-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-mainOrange " />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">
                    {data.brand.name}
                  </p>
                  <p className="text-white/60 text-sm">{data.brand.tagline}</p>
                </div>
              </div>

              <p className="mt-5 text-white/70 text-sm md:text-base leading-relaxed max-w-md">
                {data.description}
              </p>

              {/* Social */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2  gap-2">
                {data.socials.map((s) => (
                  <a
                    key={s.key}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center h-10 px-4 rounded-full bg-white/10 border border-white/10 text-white/85 hover:bg-mainOrange hover:text-white transition"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Columns */}
            <div className="md:col-span-2 grid grid-cols-2 gap-8 sm:grid-cols-2">
              {data.columns.map((c) => (
                <div key={c.title}>
                  <h4 className="text-white font-semibold">{c.title}</h4>
                  <ul className="mt-4 space-y-2">
                    {c.links.map((l) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          className="text-white/70 hover:text-white transition text-sm"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="md:col-span-1">
              <h4 className="text-white font-semibold">{data.contact.title}</h4>
              <ul className="mt-4 space-y-3">
                {data.contact.items.map((it) => (
                  <li key={it.href} className="text-sm">
                    <p className="text-white/55">{it.label}</p>
                    <a
                      href={it.href}
                      className="text-white/80 hover:text-white transition break-all"
                    >
                      {it.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-white/55 text-sm">{data.rights}</p>

            <div className="flex items-center gap-3">
              <Link
                href="/en"
                className="inline-flex items-center justify-center h-10 px-4 rounded-full bg-white/10 border border-white/10 text-white/85 hover:bg-white/15 transition"
              >
                {isAr ? "للأعلى" : "Back to top"}
              </Link>
              <span className="h-px w-10 bg-gradient-to-r from-mainOrange/70 to-transparent" />
            </div>
          </div>
        </div>
      </footer>
    </Section>
  );
}
