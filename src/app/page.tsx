"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push("/en");
  }, []);
  return (
    <>
      <div>
        <div className="fixed inset-0 z-[9999] grid place-content-center gap-4 bg-zinc-950 text-zinc-100 text-center">
          {/* Logo */}
          <div
            className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/10 font-extrabold text-lg tracking-wide"
            aria-hidden="true"
          >
            <Image
              src="/png logo.webp"
              alt="Logo"
              width={32}
              height={32}
              priority
            />
          </div>
          {/* Progress bar (indeterminate) */}
          <div
            className="relative h-2 w-64 overflow-hidden rounded-full bg-white/10"
            role="status"
            aria-live="polite"
            aria-label="Loading"
          >
            <div className="absolute inset-y-0 left-0 w-[45%] rounded-full bg-white/70 animate-splashbar" />
          </div>
          <p className="m-0 text-sm font-medium text-zinc-200/90">
            Preparing your workspace…
          </p>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n  @keyframes splashbar {\n    0%   { transform: translateX(-120%); width: 35%; }\n    50%  { width: 60%; }\n    100% { transform: translateX(260%); width: 35%; }\n  }\n  .animate-splashbar {\n    animation: splashbar 1.1s ease-in-out infinite;\n  }\n",
          }}
        />
      </div>
    </>
  );
}
