"use client";

import { useEffect } from "react";
import AOS from "aos";

import "aos/dist/aos.css";

export default function AOSWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      duration: 800, // مدة الأنيميشن
      once: true,
      delay: 500, // animation يحصل مرة واحدة بس
      easing: "ease-out",
    });
  }, []);

  return <>{children}</>;
}
