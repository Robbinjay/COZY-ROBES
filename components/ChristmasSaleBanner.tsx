'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function ChristmasSaleBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="inline-block max-w-full"
    >
      <Link href="/shop" className="block group">
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
            boxShadow: [
              '0 3px 12px rgba(185, 28, 28, 0.25)',
              '0 8px 26px rgba(22, 101, 52, 0.35)',
              '0 3px 12px rgba(185, 28, 28, 0.25)',
            ],
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.99 }}
          className="relative overflow-hidden inline-flex items-center gap-3 bg-gradient-to-r from-[#B91C1C] via-[#991B1B] to-[#166534] border-2 border-[#FBBF24] text-white text-sm sm:text-base font-extrabold px-5 py-3 sm:px-6 sm:py-3.5 rounded-full tracking-wide cursor-pointer"
        >
          {/* Subtle animated shimmer sweep */}
          <motion.span
            aria-hidden="true"
            animate={{ x: ['-120%', '220%'] }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: 'easeInOut',
            }}
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
          />

          <motion.span
            aria-hidden="true"
            animate={{
              y: [0, -4, 0],
              rotate: [0, -10, 10, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="inline-block text-xl sm:text-2xl shrink-0 relative z-10"
          >
            🎅
          </motion.span>

          <span className="relative z-10 leading-snug">
            Christmas Sale: <span className="text-[#FDE68A] underline decoration-[#FBBF24] underline-offset-4">10% OFF</span> Orders Over £200 • Use Code:{' '}
            <span className="inline-block bg-[#14532D] border border-[#FBBF24] text-[#FEF3C7] px-2.5 py-0.5 rounded-full text-xs sm:text-sm tracking-wider ml-0.5 group-hover:bg-[#166534] transition-colors">
              COZY-CHRISTMAS
            </span>
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}
