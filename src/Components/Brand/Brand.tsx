"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const fadeGrid = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-2xl",
        "shadow-[0_22px_70px_-48px_rgba(0,0,0,0.95)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-white/80 text-xs">
      {children}
    </span>
  );
}

function Swatch({ hex, label }: { hex: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden">
      <div
        className="h-14 w-full"
        style={{ backgroundColor: hex }}
        aria-label={label}
      />
      <div className="p-4 flex items-center justify-between gap-3">
        <div className="text-white/80 text-sm">{label}</div>
        <code className="text-white/70 text-xs">{hex}</code>
      </div>
    </div>
  );
}

export default function BrandingPage() {
  const locale = useLocale();
  const isAr = locale.startsWith("ar");

  // ===== Content (Static for now) =====
  const content = {
    kicker: isAr ? "البراندنج" : "Branding",
    title: isAr ? "هوية بتبان… وبتثبت" : "Branding that shows up—and sticks.",
    subtitle: isAr
      ? "بنصمم نظام هوية كامل: لوجو، ألوان، خطوط، وعناصر جرافيك—عشان البراند يبقى ثابت على أي منصة."
      : "A complete identity system: logo, colors, typography, and graphic elements—built to stay consistent everywhere.",
    chips: isAr
      ? ["استراتيجية", "هوية بصرية", "Brand Guidelines"]
      : ["Strategy", "Visual Identity", "Brand Guidelines"],

    pillars: isAr
      ? [
          {
            title: "System مش شكل",
            text: "بنشتغل على الهوية كـ منظومة قابلة للتطبيق على السوشيال والمطبوعات والباكدچينج.",
          },
          {
            title: "Consistency",
            text: "قواعد واضحة للوجو والألوان والخطوط عشان أي فريق يطلع نفس الجودة.",
          },
          {
            title: "Flexible & Dynamic",
            text: "نسخ مختلفة للوجو وعناصر جرافيك تساعدك تعمل كرياتيفس متنوعة بدون ما تفقد الهوية.",
          },
        ]
      : [
          {
            title: "A system, not decoration",
            text: "Identity built as a usable system across social, print, and packaging.",
          },
          {
            title: "Consistency",
            text: "Clear rules for logo, colors, and typography so any team stays on-brand.",
          },
          {
            title: "Flexible & dynamic",
            text: "Multiple logo variants + graphic elements for varied creatives without losing identity.",
          },
        ],

    logo: {
      title: isAr ? "نظام اللوجو" : "Logo system",
      desc: isAr
        ? "نسخ رأسية وأفقية + مساحة أمان + نسخة Dynamic للاستخدامات المرنة."
        : "Vertical & horizontal versions + safe area rules + a dynamic logo for flexible use cases.",
      bullets: isAr
        ? [
            "Vertical Logo / Horizontal Logo",
            "Safe Area علشان اللوجو يتنفس",
            "Dynamic Logo للمساحات الصغيرة والـ layouts المتغيرة",
          ]
        : [
            "Vertical logo / Horizontal logo",
            "Safe area rules so the logo can breathe",
            "Dynamic logo for small sizes and flexible layouts",
          ],
    },

    character: {
      title: isAr ? "شخصية البراند" : "Brand character",
      desc: isAr
        ? "شخصية مرحة وشبابية بملامح ودودة… بتدي إحساس دافي ومحبّب وبتعزز روح البراند."
        : "A cheerful, youthful character with friendly vibes—adds warmth, energy, and instant recognizability.",
      tags: isAr
        ? ["مرِح", "شبابي", "ودود", "جريء"]
        : ["Cheerful", "Youthful", "Friendly", "Bold"],
    },

    colors: {
      title: isAr ? "لوحة الألوان" : "Color palette",
      primaryTitle: isAr ? "Primary" : "Primary",
      secondaryTitle: isAr ? "Secondary" : "Secondary",
      primary: [
        { label: "Strong Blue", hex: "#006bb4" },
        { label: "Vivid Yellow", hex: "#ffcb05" },
        { label: "Dark Blue", hex: "#0c5d96" },
      ],
      secondary: [
        { label: "Moderate Red", hex: "#cc4948" },
        { label: "Vivid Orange", hex: "#faa61a" },
        { label: "Moderate Blue", hex: "#017cc2" },
      ],
      note: isAr
        ? "استخدم الـ Primary كأساس للهوية، والـ Secondary للتأكيد والتنوع في الكرياتيفز."
        : "Use Primary as the identity base, and Secondary for emphasis and creative variation.",
    },

    typography: {
      title: isAr ? "الخطوط" : "Typography",
      items: isAr
        ? [
            {
              name: "Shareb Pro Display",
              role: "Arabic Main",
              text: "مناسب للعناوين والـ hero… شكل minimal وودود.",
            },
            {
              name: "Ping AR + LT",
              role: "Arabic Secondary",
              text: "عائلة كاملة للأوزان… ممتازة للبودي والنصوص الطويلة.",
            },
          ]
        : [
            {
              name: "Shareb Pro Display",
              role: "Arabic Main",
              text: "Great for headings and hero sections—minimal and friendly.",
            },
            {
              name: "Ping AR + LT",
              role: "Arabic Secondary",
              text: "Full weight range—ideal for body and long-form text.",
            },
          ],
    },

    elements: {
      title: isAr ? "عناصر الجرافيك" : "Graphic elements",
      desc: isAr
        ? "Stickers وباترن ثابتين يضيفوا طابع للبراند ويخلّوا أي تصميم مرتبط بصريًا."
        : "Stickers and a consistent pattern that carry the brand vibe across different designs.",
      items: isAr
        ? [
            { title: "Stickers", text: "تفاصيل صغيرة بتعمل هوية كبيرة." },
            {
              title: "Pattern",
              text: "خلفيات تكمّل الستايل وتعمل consistency.",
            },
            {
              title: "Accents",
              text: "خطوط/نقط/لمسات بسيطة تعلي الـ hierarchy.",
            },
          ]
        : [
            {
              title: "Stickers",
              text: "Small details that build a big identity.",
            },
            {
              title: "Pattern",
              text: "Backgrounds that reinforce consistency.",
            },
            {
              title: "Accents",
              text: "Lines/dots/accents to improve hierarchy.",
            },
          ],
    },

    applications: {
      title: isAr ? "تطبيقات الهوية" : "Applications",
      desc: isAr
        ? "بنطبّق الهوية على المطبوعات والباكدچينج والميرش علشان التجربة تبقى واحدة."
        : "We apply the identity across packaging, print, and merch so every touchpoint feels aligned.",
      items: isAr
        ? ["Box branding", "T-shirt branding", "Butter paper branding"]
        : ["Box branding", "T-shirt branding", "Butter paper branding"],
    },

    cta: {
      title: isAr
        ? "جاهز تبني هوية تفرق؟"
        : "Ready to build a brand that stands out?",
      desc: isAr
        ? "ابعتلنا هدفك وهنقترح Scope مناسب + خطة تنفيذ + تسليمات واضحة."
        : "Share your goal and we’ll propose the right scope, execution plan, and clear deliverables.",
      primary: isAr ? "ابدأ مشروعك" : "Start your project",
      secondary: isAr ? "تواصل معنا" : "Contact us",
    },
  };

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="relative z-10">
      {/* HERO */}
      <section className="px-4 pt-28 pb-10">
        <div className="mx-auto max-w-6xl">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-white/60 text-sm tracking-[0.2em] uppercase"
          >
            {content.kicker}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-3 text-3xl md:text-5xl font-semibold text-white max-w-3xl leading-tight"
          >
            {content.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 text-white/70 max-w-2xl leading-relaxed"
          >
            {content.subtitle}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 flex flex-wrap gap-2"
          >
            {content.chips.map((c, i) => (
              <Chip key={i}>{c}</Chip>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PILLARS */}

      <section className="px-4 pb-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={fadeGrid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid gap-4 md:grid-cols-3"
          >
            {content.pillars.map((p, i) => (
              <motion.div key={i} variants={cardUp}>
                <GlassCard className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-[#EB5723] text-sm font-semibold tracking-wide">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                  </div>
                  <h3 className="mt-3 text-white font-semibold text-lg">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-white/70 text-sm leading-relaxed">
                    {p.text}
                  </p>
                  <div className="mt-5 h-px w-16 bg-gradient-to-r from-[#EB5723]/80 via-[#EB5723]/25 to-transparent" />
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* LOGO + CHARACTER */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-2">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <GlassCard className="p-7 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  {content.logo.title}
                </h2>
                <span className="inline-flex h-2 w-2 rounded-full bg-[#EB5723]" />
              </div>
              <p className="mt-3 text-white/70 leading-relaxed">
                {content.logo.desc}
              </p>

              <div className="mt-6 space-y-2">
                {content.logo.bullets.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#EB5723]/90" />
                    <span className="text-white/80 text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <GlassCard className="p-7 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  {content.character.title}
                </h2>
                <span className="inline-flex h-2 w-2 rounded-full bg-[#EB5723]" />
              </div>
              <p className="mt-3 text-white/70 leading-relaxed">
                {content.character.desc}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {content.character.tags.map((x, i) => (
                  <Chip key={i}>{x}</Chip>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-black/0 p-5">
                <div className="text-white font-semibold">
                  {isAr ? "ملاحظة" : "Note"}
                </div>
                <p className="mt-2 text-white/70 text-sm leading-relaxed">
                  {isAr
                    ? "الشخصية بتساعدنا نعمل كرياتيفس سريعة ومرتبطة بالبراند—خصوصًا على السوشيال."
                    : "The character helps create fast, recognizable creatives—especially on social media."}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* COLORS */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="flex items-end justify-between gap-4"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              {content.colors.title}
            </h2>
            <span className="inline-flex h-2 w-2 rounded-full bg-[#EB5723]" />
          </motion.div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <GlassCard className="p-6">
              <div className="text-white font-semibold">
                {content.colors.primaryTitle}
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {content.colors.primary.map((c) => (
                  <Swatch key={c.hex} hex={c.hex} label={c.label} />
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="text-white font-semibold">
                {content.colors.secondaryTitle}
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {content.colors.secondary.map((c) => (
                  <Swatch key={c.hex} hex={c.hex} label={c.label} />
                ))}
              </div>
            </GlassCard>
          </div>

          <div className="mt-5 text-white/70 text-sm">
            {content.colors.note}
          </div>
        </div>
      </section>

      {/* TYPOGRAPHY + ELEMENTS */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-2">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <GlassCard className="p-7 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  {content.typography.title}
                </h2>
                <span className="inline-flex h-2 w-2 rounded-full bg-[#EB5723]" />
              </div>

              <div className="mt-6 space-y-3">
                {content.typography.items.map((it, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-white font-semibold">{it.name}</div>
                      <Chip>{it.role}</Chip>
                    </div>
                    <p className="mt-2 text-white/70 text-sm leading-relaxed">
                      {it.text}
                    </p>
                    <div className="mt-4 h-px w-20 bg-gradient-to-r from-[#EB5723]/80 via-[#EB5723]/25 to-transparent" />
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <GlassCard className="p-7 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  {content.elements.title}
                </h2>
                <span className="inline-flex h-2 w-2 rounded-full bg-[#EB5723]" />
              </div>

              <p className="mt-3 text-white/70 leading-relaxed">
                {content.elements.desc}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {content.elements.items.map((x, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 hover:bg-white/[0.06] transition"
                  >
                    <div className="text-[#EB5723] text-sm font-semibold tracking-wide">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-2 text-white font-semibold">
                      {x.title}
                    </div>
                    <div className="mt-2 text-white/70 text-sm leading-relaxed">
                      {x.text}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <GlassCard className="p-7 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  {content.applications.title}
                </h2>
                <span className="inline-flex h-2 w-2 rounded-full bg-[#EB5723]" />
              </div>

              <p className="mt-3 text-white/70 leading-relaxed">
                {content.applications.desc}
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {content.applications.items.map((x, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                  >
                    <div className="text-white font-semibold">{x}</div>
                    <div className="mt-2 h-px w-14 bg-gradient-to-r from-[#EB5723]/80 via-[#EB5723]/25 to-transparent" />
                    <div className="mt-3 text-white/70 text-sm leading-relaxed">
                      {isAr
                        ? "تطبيق الهوية بشكل ثابت يرفع جودة التجربة ويزوّد الثقة."
                        : "Consistent application boosts perceived quality and trust."}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="rounded-2xl border border-[#EB5723]/25 bg-[#EB5723]/10 backdrop-blur-2xl p-8 md:p-10"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                  {content.cta.title}
                </h2>
                <p className="mt-2 text-white/75 max-w-2xl">
                  {content.cta.desc}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="h-11 px-6 rounded-full bg-[#EB5723] text-white font-semibold hover:opacity-95 transition">
                  {content.cta.primary}
                </button>
                <button className="h-11 px-6 rounded-full bg-white/10 border border-white/12 text-white font-semibold hover:bg-white/14 transition">
                  {content.cta.secondary}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
