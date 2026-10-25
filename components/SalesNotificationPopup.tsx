'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X } from 'lucide-react';
import { PRODUCTS } from '@/lib/store-data';

const RECENT_PURCHASES = [
  { name: 'Emma T.', town: 'Manchester', product: PRODUCTS[0]?.name || 'CozyCo Heated Robe', time: '2 minutes ago', image: PRODUCTS[0]?.images[0] || '/images/hero_heated_robe.jpg' },
  { name: 'Liam K.', town: 'Bristol', product: PRODUCTS[1]?.name || 'Rechargeable Heated Foot Warmer', time: '5 minutes ago', image: PRODUCTS[1]?.images[0] || '/images/img_6.webp' },
  { name: 'Sophie W.', town: 'Edinburgh', product: PRODUCTS[2]?.name || 'Weighted Bamboo Neck Wrap', time: '12 minutes ago', image: PRODUCTS[2]?.images[0] || '/images/img_7.webp' },
  { name: 'Oliver M.', town: 'Birmingham', product: PRODUCTS[0]?.name || 'CozyCo Heated Robe', time: '18 minutes ago', image: PRODUCTS[0]?.images[0] || '/images/hero_heated_robe.jpg' },
  { name: 'Charlotte H.', town: 'Leeds', product: PRODUCTS[3]?.name || 'Luxury Sherpa Throw Blanket', time: '25 minutes ago', image: PRODUCTS[3]?.images[0] || '/images/img_10.webp' },
  { name: 'Noah P.', town: 'London', product: PRODUCTS[0]?.name || 'CozyCo Heated Robe', time: '34 minutes ago', image: PRODUCTS[0]?.images[0] || '/images/hero_heated_robe.jpg' },
];

export default function SalesNotificationPopup() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Initial delay before showing the first popup
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(initialTimer);
  }, [isDismissed]);

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      setIsVisible(false); // Hide current
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % RECENT_PURCHASES.length);
        setIsVisible(true); // Show next
      }, 800);
    }, 9000); // Change every 9 seconds

    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed) return null;

  const current = RECENT_PURCHASES[currentIndex];

  return (
    <div className="fixed bottom-5 left-5 z-40 pointer-events-none hidden sm:block">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="pointer-events-auto bg-white/95 backdrop-blur-xs border border-[#EAE3D9] shadow-xl rounded-lg p-3.5 max-w-[310px] flex items-center gap-3 relative group"
          >
            <button
              onClick={() => setIsDismissed(true)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-[#2B2623] text-white rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity shadow-xs cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-3 h-3" />
            </button>

            <div className="relative w-12 h-12 bg-[#FAF8F5] border border-[#EAE3D9] rounded-xs overflow-hidden shrink-0">
              <Image
                src={current.image}
                alt={current.product}
                fill
                sizes="48px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-1.5 text-[10px] text-[#8C6A54] font-bold uppercase tracking-wider">
                <ShoppingBag className="w-3 h-3" />
                <span>Recent Purchase</span>
              </div>
              <p className="text-xs font-serif font-bold text-[#2B2623] truncate mt-0.5">
                {current.name} from {current.town}
              </p>
              <p className="text-[11px] text-[#5C554F] truncate">
                Purchased <span className="font-medium text-[#2B2623]">{current.product}</span>
              </p>
              <p className="text-[9px] text-[#A3998F] mt-0.5">{current.time}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
