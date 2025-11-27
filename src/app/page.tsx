import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "BeBold-Marketing | Stay Tuned",
  description: "BeBold-Marketing | Stay Tuned",
};

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#FE4701] to-black flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="flex justify-center w-full">
          <Image
            src="/LOGO.png"
            alt="Logo"
            width={250}
            height={250}
            className="animate-bounce"
          />
        </div>

        {/* Floating Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>

          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white animate-pulse">
            Stay Tuned
          </h1>

          <p className="text-xl md:text-2xl text-gray-50 mb-8 font-light">
            Something amazing is coming soon
          </p>

          <p className="text-gray-50 text-lg mb-12 leading-relaxed">
            We are working hard to bring you an incredible experience. Be
            patient, greatness is on the way.
          </p>

          {/* Loading Dots */}
          <div className="flex justify-center gap-2 mb-12">
            <div className="w-3 h-3 bg-[#FE4701] rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce animation-delay-100"></div>
            <div className="w-3 h-3 bg-[#FE4701] rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce animation-delay-100"></div>
          </div>

          <p className="text-gray-500 text-sm">
            © 2025 BeBold. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
