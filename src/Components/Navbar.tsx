"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Dropdown, Space } from "antd";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";

type Locale = "en" | "ar";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = useTranslations("nav");
  const params = useParams();
  const pathname = usePathname();

  const locale = (params.locale as Locale) ?? "en";
  const isRTL = locale === "ar";

  const menuLinks = useMemo(
    () => [
      { key: "home", href: "/" },
      { key: "about", href: "/About" },
      { key: "services", href: "/Services" },
      { key: "pricing", href: "/Pricing" },
      { key: "contact", href: "/Contact" },
    ],
    []
  );

  // remove current locale prefix from pathname, keep a safe fallback
  const pathnameNoLocale = useMemo(() => {
    const p = pathname || "";
    const stripped = p.replace(`/${locale}`, "");
    return stripped.length ? stripped : "/";
  }, [pathname, locale]);

  const isActive = (href: string) => pathnameNoLocale === href;

  // Language Dropdown Items
  const items = useMemo(
    () => [
      {
        key: "en",
        label: <Link href={`/en${pathnameNoLocale}`}>{t("english")}</Link>,
      },
      {
        key: "ar",
        label: <Link href={`/ar${pathnameNoLocale}`}>{t("arabic")}</Link>,
      },
    ],
    [pathnameNoLocale, t]
  );

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Scroll shrink / glass intensify
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ===== Animations =====
 
  const linksVariant: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  };

  const linkItem: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.28 } },
  };

  const closeDrawer = () => setOpen(false);
  const toggleDrawer = () => setOpen((v) => !v);

  return (
    <>
      {/* ===== Navbar ===== */}
      <motion.nav
        initial="hidden"
        animate="show"
        data-aos="fade-down"
        className={`
          fixed top-4 place-self-center
          w-[92%]  
          md:w-8/12
          rounded-full
          z-[9999]
          border border-white/12
          backdrop-blur-2xl
          shadow-[0_12px_40px_-18px_rgba(0,0,0,0.65)]
          transition-all duration-300
         ${scrolled ? "bg-white/10 " : "bg-neutral-950/40  "}
        `}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div
          data-aos="fade"
          className="px-4 md:px-6 flex items-center justify-between"
        >
          {/* Logo */}
          <Link href={`/${locale}/Home`} className="flex items-center gap-3">
            <div
              className={`
                relative rounded-2xl overflow-hidden z-[9999]
                w-[64px] h-[64px]
                transition-all duration-300
              `}
            >
              <Image
                src="/png logo.webp"
                alt="Logo"
                fill
                sizes="(min-width: 768px) 64px, 30px"
                className="object-contain"
                priority
              />
            </div>

            {/* Optional brand text */}
            <div className="hidden md:block leading-tight">
              <div className="text-white font-semibold text-sm">
                {/* you can hardcode name here */}
              </div>
              <div className="text-white/60 text-xs -mt-0.5">
                {/* tagline */}
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <motion.ul
            variants={linksVariant}
            initial="hidden"
            animate="show"
            className={`
              hidden md:flex items-center
              ${isRTL ? "space-x-reverse space-x-2" : "space-x-2"}
              text-[15px] font-medium
            `}
          >
            {menuLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <motion.li key={item.key} variants={linkItem}>
                  <Link
                    href={`/${locale}${item.href}`}
                    className={`
                      relative px-4 py-2 rounded-full
                      transition-all duration-300
                      ${
                        active
                          ? "text-white hover:text-white bg-white/14 border border-white/10 shadow-inner"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }
                    `}
                  >
                    <span className="font-arabic"> {t(item.key)}</span>

                    {/* Active indicator dot */}
                    {active && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#EB5723]" />
                    )}
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* Desktop Language Dropdown */}
          <div className="hidden md:block">
            <Dropdown
              menu={{ items }}
              placement="bottomRight"
              trigger={["click"]}
              getPopupContainer={() => document.body}
              overlayStyle={{ zIndex: 1000000000 }}
            >
              <a
                onClick={(e) => e.preventDefault()}
                className="
      flex items-center gap-2 px-3 py-2 rounded-full
      bg-white/10 hover:bg-white/14
      border border-white/10
      transition text-white cursor-pointer select-none
    "
              >
                <Space>
                  <Icon icon="iconoir:language" />
                </Space>
              </a>
            </Dropdown>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleDrawer}
            className="
              md:hidden
              px-3 py-2 rounded-full
              bg-white/10 hover:bg-white/14
              border border-white/10
              transition text-white
            "
            aria-label="Open menu"
          >
            <Icon icon={open ? "mdi:close" : "mdi:menu"} width="22" />
          </button>
        </div>
      </motion.nav>

      {/* ===== Mobile Drawer ===== */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-[800000000]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
            />

            {/* Drawer Panel */}
            <motion.div
              className="
                fixed left-0 right-0 md:hidden
                h-[89vh]
                bg-neutral-950/85 backdrop-blur-2xl
                rounded-t-2xl
                border-t border-white/10
                p-6
                z-[900000000]
              "
              initial={{ y: "100%" }}
              animate={{ y: "40%" }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 90, damping: 14 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 420 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 90) closeDrawer();
              }}
              dir={isRTL ? "rtl" : "ltr"}
            >
              {/* Drag Handle */}
              <motion.div
                className="w-14 h-1.5 bg-white/25 mx-auto rounded-full mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              />

              {/* Links */}
              <ul className="text-white space-y-4 text-center text-lg font-medium">
                {menuLinks.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.key}>
                      <Link
                        href={`/${locale}${item.href}`}
                        onClick={closeDrawer}
                        className={`
                          block px-4 py-3 rounded-xl
                          border transition
                          ${
                            active
                              ? "bg-white/12 border-white/10 text-white"
                              : "bg-white/0 border-transparent text-white/85 hover:bg-white/10 hover:border-white/10"
                          }
                        `}
                      >
                        {t(item.key)}
                      </Link>
                    </li>
                  );
                })}

                {/* Mobile language */}
                <li className="pt-2">
                  <Dropdown
                    menu={{ items }}
                    placement="bottomRight"
                    trigger={["click"]}
                    getPopupContainer={() => document.body}
                    overlayStyle={{ zIndex: 1000000000 }}
                  >
                    <a
                      onClick={(e) => e.preventDefault()}
                      className="
      flex items-center gap-2 px-3 py-2 rounded-full
      bg-white/10 hover:bg-white/14
      border border-white/10
      transition text-white cursor-pointer select-none
    "
                    >
                      <Space>
                        <Icon icon="iconoir:language" />
                      </Space>
                    </a>
                  </Dropdown>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
