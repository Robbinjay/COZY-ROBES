'use client';

import React from 'react';
import Link from 'next/link';

export default function AnnouncementBar() {
  return (
    <aside aria-label="Announcement" className="bg-[#2B2623] text-[#FAF8F5] text-xs font-medium tracking-wide py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center gap-2">
        <span>FREE UK DELIVERY ON ORDERS OVER £150 • 30-DAY COZY GUARANTEE</span>
        <Link
          href="/shop"
          className="underline underline-offset-4 hover:text-[#E8DCCB] transition-colors ml-1 font-semibold"
        >
          Shop Now &rarr;
        </Link>
      </div>
    </aside>
  );
}
