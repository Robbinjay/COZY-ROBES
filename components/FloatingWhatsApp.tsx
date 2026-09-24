'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useStore } from '@/lib/store-context';

export default function FloatingWhatsApp() {
  const { config } = useStore();
  const whatsappLink = config.socialLinks.whatsapp;

  if (!whatsappLink) return null;

  return (
    <a
      id="floating-whatsapp-btn"
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 group flex items-center gap-2"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-white" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-sm font-bold whitespace-nowrap px-0 group-hover:px-1">
        Chat with us
      </span>
    </a>
  );
}
