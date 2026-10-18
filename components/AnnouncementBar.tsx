'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <aside aria-label="Announcement" className="bg-[#B86246] text-white text-xs font-semibold tracking-wide py-2.5 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center gap-2 flex-wrap">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>🎄 CHRISTMAS SALE: 30% OFF ORDERS OVER £200 • USE CODE: <strong className="underline tracking-wider">COZY-CHRISTMAS</strong></span>
        </span>
        <Link
          href="/shop"
          className="underline underline-offset-4 hover:text-[#FAF8F5] transition-colors ml-1 font-bold"
        >
          Shop Now &rarr;
        </Link>
      </div>
    </aside>
  );
}
