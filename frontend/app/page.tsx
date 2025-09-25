'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Subtle animated blue gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-blue-50 to-white animate-gradient" />

      {/* Foreground content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-4xl w-full text-center"
      >
        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight tracking-tight text-slate-900">
          MathGram
        </h1>

        <p className="mt-6 text-3xl md:text-4xl font-semibold text-slate-700 leading-snug">
          Doomscrolling for  <span className="text-blue-600"> Math Enthusiasts </span>.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push('/topics')}
          className="mt-10 w-full md:w-auto px-12 py-5 rounded-2xl bg-blue-600 text-white text-2xl font-semibold shadow-lg hover:bg-blue-700 transition-colors"
        >
          Pick 5 Topics →
        </motion.button>

        <p className="mt-10 text-lg md:text-xl text-slate-500">
          Turn endless scrolling into endless learning.
        </p>
      </motion.div>
    </main>
  );
}
