"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FE4701]  to-black flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="flex justify-center w-full ">
          <Image
            src="/LOGO.png"
            alt="Logo"
            width={250}
            height={250}
            className="animate-bounce"
          />
        </div>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6  text-white bg-clip-text text-transparent animate-pulse">
            Stay Tuned
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-50 mb-8 font-light">
            Something amazing is coming soon
          </p>

          {/* Description */}
          <p className="text-gray-50 text-lg mb-12 leading-relaxed">
            We are working hard to bring you an incredible experience. Be
            patient, greatness is on the way.
          </p>

          {/* Loading Animation */}
          <div className="flex justify-center gap-2 mb-12">
            <div className="w-3 h-3 bg-[#FE4701] rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce animation-delay-100"></div>
            <div className="w-3 h-3 bg-[#FE4701] rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce animation-delay-100"></div>
          </div>

          {/* Email Signup */}

          {/* Footer */}
          <p className="text-gray-500 text-sm">
            © 2025 BeBold. All rights reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}
