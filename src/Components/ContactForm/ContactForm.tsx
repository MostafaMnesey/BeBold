"use client";

import React, { useMemo, useState, useTransition } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type ContactUsForm = {
  title: string;
  subtitle: string;
  fields: {
    name: string;
    email: string;
    phone: string;
    company: string;

    message: string;
  };
  placeholders: {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
  };

  submit: string;
  submitting: string;
  success: string;
  note: string;
  errors: {
    name: string;
    email: string;
    emailInvalid: string;
    message: string;
    generic: string;
    phone: string;
  };
};

type FormState = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function ContactForm() {
  const t = useTranslations("");
  const locale = useLocale();
  const isAr = locale.startsWith("ar");

  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const text = t.raw("contactUs.form") as ContactUsForm;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormState>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  // لو تحب تعمل reset للـ status أول ما المستخدم يغيّر حاجة
  const _watched = watch();
  React.useEffect(() => {
    if (status !== "idle" || serverError) {
      setStatus("idle");
      setServerError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    _watched.name,
    _watched.email,
    _watched.phone,
    _watched.company,
    _watched.service,
    _watched.budget,
    _watched.message,
  ]);

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/Contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            lang: locale,
            page: typeof window !== "undefined" ? window.location.pathname : "",
          }),
        });
        if (response.status === 200) {
          toast(`${text.success}`, {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }

        setStatus("success");
        setServerError("");
        reset({ ...data, message: "" }); // امسح الرسالة بس
      } catch {
        setStatus("error");
        setServerError(text.errors.generic);
      }
    });
  });

  const disabled = isPending || isSubmitting;

  return (
    <motion.form
      onSubmit={onSubmit}
      dir={isAr ? "rtl" : "ltr"}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="rounded-md border border-white/10 bg-white/[0.06] backdrop-blur-2xl p-6 md:p-8 shadow-[0_22px_70px_-48px_rgba(0,0,0,0.90)]"
      noValidate
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-white text-xl md:text-2xl font-semibold">
            {text.title}
          </h3>
          <p className="mt-1 text-white/70 text-sm md:text-base">
            {text.subtitle}
          </p>
        </div>
        <span className="hidden md:inline-flex h-2 w-2 rounded-full bg-[#EB5723]" />
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <Field label={text.fields.name} required error={errors.name?.message}>
          <input
            className={inputClass}
            placeholder={text.placeholders.name}
            autoComplete="name"
            disabled={disabled}
            {...register("name", {
              required: text.errors.name,
              minLength: { value: 2, message: text.errors.name },
            })}
          />
        </Field>

        <Field label={text.fields.email} required error={errors.email?.message}>
          <input
            className={inputClass}
            placeholder={text.placeholders.email}
            autoComplete="email"
            inputMode="email"
            disabled={disabled}
            {...register("email", {
              required: text.errors.email,
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: text.errors.emailInvalid,
              },
            })}
          />
        </Field>

        <Field label={text.fields.phone} error={errors.phone?.message}>
          <input
            className={inputClass}
            placeholder={text.placeholders.phone}
            autoComplete="tel"
            inputMode="tel"
            disabled={disabled}
            {...register("phone", {
              required: text.errors.phone,
            })}
          />
        </Field>

        <Field label={text.fields.company} error={errors.company?.message}>
          <input
            className={inputClass}
            placeholder={text.placeholders.company}
            autoComplete="organization"
            disabled={disabled}
            {...register("company")}
          />
        </Field>

        <div className="md:col-span-2">
          <Field
            label={text.fields.message}
            required
            error={errors.message?.message}
          >
            <textarea
              className={textareaClass}
              placeholder={text.placeholders.message}
              rows={5}
              disabled={disabled}
              {...register("message", {
                required: text.errors.message,
                minLength: { value: 10, message: text.errors.message },
              })}
            />
          </Field>
        </div>
      </div>

      <div className="mt-4 min-h-6">
        {status === "error" && serverError ? (
          <p className="text-sm text-red-300">{serverError}</p>
        ) : status === "success" ? (
          <p className="text-sm text-emerald-300">{text.success}</p>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <p className="text-white/55 text-xs leading-relaxed">{text.note}</p>

        <button
          type="submit"
          disabled={disabled}
          className="h-11 px-6 rounded-full bg-[#EB5723] text-white font-semibold hover:opacity-95 transition disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center"
        >
          {disabled ? text.submitting : text.submit}
        </button>
      </div>
    </motion.form>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-white/75 text-sm">{label}</span>
          {required ? <span className="text-[#EB5723] text-xs">*</span> : null}
        </div>
        {error ? <span className="text-red-300 text-xs">{error}</span> : null}
      </div>
      {children}
    </label>
  );
}

const inputClass =
  "w-full h-11 rounded-2xl border border-white/10 bg-white/[0.04] text-white placeholder:text-white/35 px-4 outline-none focus:border-[#EB5723]/55 focus:bg-white/[0.06] transition";

const textareaClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] text-white placeholder:text-white/35 px-4 py-3 outline-none focus:border-[#EB5723]/55 focus:bg-white/[0.06] transition resize-none";
