import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/store-data';
import ShopCatalog from '@/components/ShopCatalog';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getCatalogSchema } from '@/lib/seo';
import { ShieldCheck, Truck, RotateCcw, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shop All Heated Robes & Cozy Accessories UK | CozyCorobes',
  description:
    'Explore the complete CozyCorobes collection of premium electric heated robes, wearable heated blankets, heated foot warmers, and cozy loungewear. Free UK delivery over £150.',
  alternates: {
    canonical: '/shop',
  },
  openGraph: {
    title: 'Shop All Heated Robes & Cozy Accessories UK | CozyCorobes',
    description:
      'Explore the complete CozyCorobes collection of premium electric heated robes, wearable heated blankets, and accessories.',
    type: 'website',
  },
};

export default function ShopPage() {
  const catalogSchema = getCatalogSchema(PRODUCTS);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ name: 'Shop All Products', url: '/shop' }]} />

        {/* Page Header with SEO copy */}
        <div className="max-w-3xl mb-10 pt-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-2">
            The Complete UK Collection
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B2623] tracking-tight">
            Shop CozyCorobes Heated Loungewear
          </h1>
          <p className="text-sm sm:text-base text-[#5C554F] mt-3 leading-relaxed">
            Welcome to the home of wearable radiant warmth. Each garment and accessory in our collection is crafted with cloud-like sherpa fleece, CE/UKCA-certified low-voltage carbon-fiber heating elements, and machine-washable ease so you can stay warm without high central heating bills.
          </p>
        </div>

        {/* Catalog */}
        <ShopCatalog initialProducts={PRODUCTS} />

        {/* SEO Editorial & Internal Links Section */}
        <section className="mt-20 pt-12 border-t border-[#EAE3D9]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            <div className="lg:col-span-8 space-y-6 text-sm text-[#5C554F] leading-relaxed">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C6A54]">
                  UK Buyer Guide
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2623]">
                  Why Choose CozyCorobes Heated Wearables?
                </h2>
                <p>
                  Traditional electric blankets keep you warm only while you stay anchored in bed or on the couch. The moment you get up to make a tea, take a phone call, or work at your desk, the cold rushes back. CozyCorobes wearable heated robes and accessories solve this problem with lightweight, ergonomic garments that move with your body.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-xl font-bold text-[#2B2623]">
                  Engineered for Everyday Practicality
                </h3>
                <p>
                  From our signature <Link href="/products/cozy-co-robes" className="font-semibold text-[#8C6A54] hover:underline">The Cozy Co. Robe</Link> featuring 7 digital heat presets (35°C–55°C) and multi-zone heating across the chest and lumbar, to the under-desk relief of our <Link href="/products/cozyco-foot-warmer" className="font-semibold text-[#8C6A54] hover:underline">CozyCo Heated Foot Warmer</Link>, each product is built for continuous daily use during chilly British winters.
                </p>
                <p>
                  Want to learn more about selecting the right size or maintaining heating garments? Consult our in-depth <Link href="/blog/guide-to-choosing-a-heated-robe" className="font-semibold text-[#8C6A54] hover:underline">Heated Robe Buying Guide</Link> or our step-by-step <Link href="/blog/how-to-wash-heated-robes-blankets" className="font-semibold text-[#8C6A54] hover:underline">Washing & Care Instructions</Link>.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#8C6A54]">
                <Link href="/collections/heated-robes" className="hover:underline flex items-center gap-1">
                  <span>Explore Heated Robes Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/collections/cozy-accessories" className="hover:underline flex items-center gap-1">
                  <span>Explore Accessories</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/faq" className="hover:underline flex items-center gap-1">
                  <span>Frequently Asked Questions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-sm border border-[#EAE3D9] space-y-6">
              <h3 className="font-serif text-base font-bold text-[#2B2623]">
                The CozyCorobes Commitment
              </h3>
              
              <div className="space-y-4 text-xs text-[#5C554F]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EE] flex items-center justify-center shrink-0 text-[#8C6A54]">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2B2623]">30-Day Cozy Trial</h4>
                    <p className="text-[#736B63] mt-0.5">Try at home risk-free. If not completely in love, return for a full refund.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EE] flex items-center justify-center shrink-0 text-[#8C6A54]">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2B2623]">Fast UK Delivery</h4>
                    <p className="text-[#736B63] mt-0.5">Royal Mail Tracked 48 delivery. Free shipping on all orders over £150.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EE] flex items-center justify-center shrink-0 text-[#8C6A54]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2B2623]">1-Year Hardware Warranty</h4>
                    <p className="text-[#736B63] mt-0.5">CE & UKCA electrical compliance with comprehensive warranty protection.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#F0EBE1]">
                <Link
                  href="/contact"
                  className="block w-full text-center bg-[#FAF5EE] hover:bg-[#F0EBE1] text-[#2B2623] border border-[#EAE3D9] text-xs font-bold py-2.5 rounded-xs transition-colors"
                >
                  Contact Our Care Team
                </Link>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
