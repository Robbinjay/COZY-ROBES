import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Search, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-[#FAF8F5] min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-sm border border-[#EAE3D9] shadow-xs text-center space-y-5">
        <span className="font-serif text-5xl sm:text-6xl font-bold text-[#D9CFC4] block">
          404
        </span>

        <h1 className="font-serif text-2xl font-bold text-[#2B2623]">
          Page Not Found
        </h1>

        <p className="text-xs sm:text-sm text-[#5C554F] leading-relaxed">
          The comfort you are looking for might have moved or the link has expired. Let&rsquo;s guide you back to warmth.
        </p>

        <div className="pt-2 flex flex-col gap-2.5">
          <Link
            href="/"
            className="w-full bg-[#2B2623] hover:bg-[#47403C] text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-sm transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/shop"
            className="w-full border border-[#D9D0C3] hover:bg-[#FAF8F5] text-[#2B2623] text-xs font-semibold py-3 rounded-sm transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-[#8C6A54]" />
            <span>Browse Heated Robes & Wearables</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-[#F0EBE1] text-xs text-[#736B63]">
          <p className="mb-2 font-medium">Popular Categories:</p>
          <div className="flex flex-wrap justify-center gap-2 text-[11px]">
            <Link href="/collections/heated-robes" className="text-[#8C6A54] hover:underline">
              Heated Robes
            </Link>
            <span>•</span>
            <Link href="/collections/cozy-accessories" className="text-[#8C6A54] hover:underline">
              Accessories
            </Link>
            <span>•</span>
            <Link href="/faq" className="text-[#8C6A54] hover:underline">
              FAQ Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
