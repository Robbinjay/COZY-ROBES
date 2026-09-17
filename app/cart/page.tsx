import React from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import CartPageClient from '@/components/CartPageClient';

export const metadata: Metadata = {
  title: 'Shopping Bag | CozyCorobes',
  description: 'Review your selected heated robes and cozy accessories in your CozyCorobes shopping bag.',
  alternates: {
    canonical: '/cart',
  },
};

export default function CartPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ name: 'Shopping Bag', url: '/cart' }]} />

        <div className="mb-8 pt-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2623] tracking-tight">
            Your Shopping Bag
          </h1>
        </div>

        <CartPageClient />

      </div>
    </div>
  );
}
