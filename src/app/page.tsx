import React from 'react';
import Imagg from 'next/image';


export default function Page() {
  return (
    <section id="home" className="flex flex-col items-center justify-center text-center min-h-screen bg-gray-50">
    <image
        src="/hero-image.png"
        alt="Hero Image"
        className="w-64 h-64 mb-8"
        ></image>
      <p className="text-lg text-gray-600 max-w-2xl mb-8">
        Your perfect landing page built with Next.js and Tailwind CSS.
      </p>
      <button className="px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition">
        Get Started
      </button>
    </section>
  );
}
