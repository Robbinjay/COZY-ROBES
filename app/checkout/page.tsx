import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import CheckoutManager from '@/components/CheckoutManager';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Secure Checkout | CozyCorobes',
  description: 'Complete your CozyCorobes heated robe purchase with fast, 256-bit encrypted checkout.',
};

export default function CheckoutPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#EAE3D9]">
          <Link
            href="/cart"
            className="text-xs font-semibold text-[#5C554F] hover:text-[#2B2623] flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Bag</span>
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-[#3C6E47] font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-[#2B2623]">
            Checkout
          </h1>
        </div>

        <CheckoutManager />

      </div>
    </div>
  );
}
