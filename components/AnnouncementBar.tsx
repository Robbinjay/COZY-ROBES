'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store-context';

export default function AnnouncementBar() {
  const { config } = useStore();
  const { announcementBar } = config;

  if (!announcementBar.enabled) return null;

  return (
    <aside aria-label="Announcement" className="bg-[#2B2623] text-[#FAF8F5] text-xs font-medium tracking-wide py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center gap-2">
        <span>{announcementBar.text}</span>
        {announcementBar.linkText && announcementBar.linkUrl && (
          <Link
            href={announcementBar.linkUrl}
            className="underline underline-offset-4 hover:text-[#E8DCCB] transition-colors ml-1 font-semibold"
          >
            {announcementBar.linkText} &rarr;
          </Link>
        )}
      </div>
    </aside>
  );
}
