import React from "react";

import { Metadata } from "next";

import Silk from "../../../Components/Silk";
import ContactClient from "../../../Components/ContactUs/ContactUs";
export const metadata: Metadata = {
  title: "Be Bold | Contact",
  description:
    "Be Bold is a marketing agency that creates exceptional digital experiences that push boundaries and inspire innovation",
  keywords: [
    "marketing",
    "digital",
    "agency",
    "innovation",
    "design",
    "development",
  ],
  authors: [{ name: "Be Bold", url: "https://bebold.com" }],
  creator: "Be Bold",
  publisher: "Be Bold",
  openGraph: {
    title: "Be Bold",
    description:
      "Be Bold is a marketing agency that creates exceptional digital experiences that push boundaries and inspire innovation",
    url: "https://bebold.com",
    siteName: "Be Bold",
    images: [{ url: "/logo.png" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Be Bold",
    description:
      "Be Bold is a marketing agency that creates exceptional digital experiences that push boundaries and inspire innovation",
    images: [{ url: "/logo.png" }],
  },
  icons: {
    icon: "/logo.png",
  },
};
export default function Page() {
  return (
    <>
      <div className="relative w-full overflow-hidden leading-4 bg-black">
        {/* ===== Background Layer - Covers all sections ===== */}
        <div className="fixed inset-0 z-0">
          <Silk desktopMotion="low" />
        </div>
        {/* ===== Overlays Layer (darken + focus center) ===== */}
        <div className="pointer-events-none fixed inset-0 z-10">
          {/* dark gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/80" />
          {/* center vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.75)_60%,rgba(0,0,0,0.95)_100%)]" />
        </div>
        {/* ===== Decorative blobs ===== */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="absolute -top-20 -left-24 w-[520px] h-[520px] rounded-full blur-3xl bg-[#EB5723]/18 animate-blob" />

          <div className="absolute -bottom-28 -right-24 w-[620px] h-[620px] rounded-full blur-3xl bg-purple-500/18 animate-blob animation-delay-2000" />
        </div>
        <ContactClient />
      </div>
    </>
  );
}
