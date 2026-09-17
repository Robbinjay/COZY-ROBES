import React from 'react';
import type { Metadata } from 'next';
import { PRODUCTS } from '@/lib/store-data';
import ShopCatalog from '@/components/ShopCatalog';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Shop All Heated Robes & Comfort Wear | CozyCorobes',
  description:
    'Explore the complete CozyCorobes collection of premium electric heated robes, wearable heated throws, heated slippers, and cozy home accessories.',
  alternates: {
    canonical: '/shop',
  },
};

export default function ShopPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ name: 'Shop All', url: '/shop' }]} />

        {/* Page Header with SEO copy */}
        <div className="max-w-3xl mb-10 pt-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-2">
            The Complete Collection
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B2623] tracking-tight">
            Shop CozyCorobes
          </h1>
          <p className="text-sm sm:text-base text-[#5C554F] mt-3 leading-relaxed">
            Welcome to the home of wearable warmth. Each piece in our collection is crafted with cloud-like fleece fabrics, reliable low-voltage heating elements, and machine-washable ease so you can stay comfortably warm all winter long.
          </p>
        </div>

        {/* Catalog */}
        <ShopCatalog initialProducts={PRODUCTS} />

      </div>
    </div>
  );
}
