import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Heart, Sparkles, Shield, Coffee, ArrowRight } from 'lucide-react';
import { getOrganizationSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About CozyCorobes | UK Heated Robes & Wearable Warmth Specialists',
  description:
    'Discover the story behind CozyCorobes. We engineer premium, ultra-soft electric heated bathrobes, heated foot warmers, and cozy loungewear for British homes.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About CozyCorobes | UK Heated Robes & Wearable Warmth Specialists',
    description:
      'We engineer premium, ultra-soft electric heated bathrobes and cozy loungewear designed to bring gentle radiant warmth into modern homes.',
    type: 'website',
  },
};

export default function AboutPage() {
  const orgSchema = getOrganizationSchema();

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ name: 'About Us', url: '/about' }]} />

        {/* Hero Section */}
        <div className="py-8 sm:py-12 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C6A54]">
            Our British Heritage & Craft
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B2623] tracking-tight">
            Designed for Quiet, Restful Moments at Home
          </h1>
          <p className="text-sm sm:text-base text-[#5C554F] leading-relaxed">
            CozyCorobes was born from a simple desire: staying genuinely warm during chilly UK winters without high central heating bills or being chained to a sofa by an electric blanket cord.
          </p>
        </div>

        {/* Feature Image */}
        <div className="relative aspect-16/9 w-full rounded-sm overflow-hidden border border-[#EAE3D9] my-8 shadow-xs">
          <Image
            src="/images/about_hero.jpg"
            alt="Warm sunlit living room with comfortable sofa, heated robe, and blankets"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Narrative */}
        <div className="space-y-12 py-8 text-[#5C554F] leading-relaxed text-sm sm:text-base">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2623]">
              The Story Behind CozyCorobes
            </h2>
            <p>
              In cold winter months across the UK, many households find themselves piling on heavy sweaters or huddling motionless under bulky traditional electric blankets. While electric blankets provided warmth, they held you captive in one spot: the instant you stood up to boil the kettle, answer the door, or work at your desk, icy drafts took over.
            </p>
            <p>
              We asked ourselves: why couldn&rsquo;t gentle radiant heat be genuinely wearable? Why couldn&rsquo;t a luxury bathrobe combine the indulgent, 320 GSM cloud sherpa softness of a 5-star hotel robe with safe, flexible low-voltage heating elements?
            </p>
            <p>
              That vision led to the design of our flagship <Link href="/products/cozy-co-robes" className="font-semibold text-[#8C6A54] hover:text-[#2B2623] underline">The Cozy Co. Robe</Link>. We spent over 18 months refining safe carbon-fiber micro-elements, sourcing hypoallergenic cloud-fleece, and developing ergonomic multi-zone heating across the chest, lumbar back, and deep front hand-warmer pockets.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="bg-white p-6 rounded-sm border border-[#EAE3D9]">
              <div className="w-10 h-10 rounded-sm bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center text-[#8C6A54] mb-4">
                <Coffee className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#2B2623] mb-2">
                Everyday Routine Comfort
              </h3>
              <p className="text-xs text-[#736B63] leading-relaxed">
                We design for real routines: waking up to a frosty morning, working from a home office, lounging on rainy Sundays, and reading before bed.
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-[#EAE3D9]">
              <div className="w-10 h-10 rounded-sm bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center text-[#8C6A54] mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#2B2623] mb-2">
                CE & UKCA Certified Safety
              </h3>
              <p className="text-xs text-[#736B63] leading-relaxed">
                Ultra-safe low-voltage DC heating, automatic safety shutoffs, and quick-disconnect magnetic plugs mean you enjoy radiant comfort with complete peace of mind.
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-[#EAE3D9]">
              <div className="w-10 h-10 rounded-sm bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center text-[#8C6A54] mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#2B2623] mb-2">
                30-Day Happiness Guarantee
              </h3>
              <p className="text-xs text-[#736B63] leading-relaxed">
                No marketing gimmicks. We offer a true 30-day home trial, prompt customer care from Covent Garden London, and an honest 1-year warranty on all heating components.
              </p>
            </div>
          </div>

          <div className="bg-[#FAF5EE] p-8 sm:p-10 rounded-sm border border-[#EAE3D9] space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#2B2623]">
              Explore the Range & Customer Resources
            </h2>
            <p className="text-xs sm:text-sm">
              Discover how our heated robes and accessories can transform your daily winter comfort:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="space-y-2">
                <h4 className="font-bold text-[#2B2623]">Shop Collections:</h4>
                <ul className="space-y-1 text-[#5C554F]">
                  <li>
                    <Link href="/collections/heated-robes" className="hover:text-[#8C6A54] underline">
                      Heated Robes & Wearable Blankets
                    </Link>
                  </li>
                  <li>
                    <Link href="/collections/cozy-accessories" className="hover:text-[#8C6A54] underline">
                      Cozy Accessories & Heated Foot Warmers
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop" className="hover:text-[#8C6A54] underline">
                      View Full Product Catalog
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-[#2B2623]">Helpful Customer Guides:</h4>
                <ul className="space-y-1 text-[#5C554F]">
                  <li>
                    <Link href="/blog/guide-to-choosing-a-heated-robe" className="hover:text-[#8C6A54] underline">
                      Guide to Choosing a Heated Robe
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/how-to-wash-heated-robes-blankets" className="hover:text-[#8C6A54] underline">
                      How to Safely Machine Wash Heated Robes
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:text-[#8C6A54] underline">
                      Frequently Asked Questions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pt-4 border-t border-[#EAE3D9] flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#2B2623] hover:bg-[#47403C] text-white text-xs font-semibold px-6 py-3 rounded-sm transition-colors"
              >
                <span>Shop the CozyCorobes Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="text-xs font-semibold text-[#2B2623] hover:text-[#8C6A54] underline"
              >
                Get in Touch with Our Team
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
