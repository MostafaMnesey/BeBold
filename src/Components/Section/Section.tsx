import React from "react";

export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 py-24 md:py-32 px-4 sm:px-6 lg:px-5">
      {children}
    </div>
  );
}
