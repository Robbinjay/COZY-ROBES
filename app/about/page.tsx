import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Heart, Sparkles, Shield, Coffee, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About CozyCorobes | Warmth, Comfort & Everyday Relaxation',
  description:
    'Discover the story behind CozyCorobes. We create thoughtful, ultra-soft heated robes and loungewear designed to bring gentle radiant warmth into modern homes.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ name: 'About Us', url: '/about' }]} />

        {/* Hero Section */}
        <div className="py-8 sm:py-12 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C6A54]">
            Our Philosophy
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B2623] tracking-tight">
            Designed for the Quiet Moments at Home
          </h1>
          <p className="text-sm sm:text-base text-[#5C554F] leading-relaxed">
            CozyCorobes was born from a simple desire: staying cozy without being tethered to a sofa or tangled in awkward electrical cables.
          </p>
        </div>

        {/* Feature Image */}
        <div className="relative aspect-16/9 w-full rounded-sm overflow-hidden border border-[#EAE3D9] my-8 shadow-xs">
          <Image
            src="/images/about_hero.jpg"
            alt="Warm sunlit living room with comfortable sofa and blankets"
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
              The Story of CozyCorobes
            </h2>
            <p>
              In chilly winter months, we found ourselves piling on heavy layers or huddling under bulky electric blankets. While electric blankets provided warmth, they locked you down in one spot: if you stood up to make a cup of tea, grab a notebook, or check on family, the warmth was left behind.
            </p>
            <p>
              We asked ourselves: why couldn&rsquo;t warmth be truly wearable? Why couldn&rsquo;t a bathrobe combine the indulgent, heavyweight softness of hotel fleece with discreet, safe, flexible heating elements?
            </p>
            <p>
              That question sparked CozyCorobes. We spent months sourcing high-density micro-fleece and plush sherpa, refining carbon-fiber heating grids, and designing intuitive controls that anyone can operate effortlessly.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="bg-white p-6 rounded-sm border border-[#EAE3D9]">
              <div className="w-10 h-10 rounded-sm bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center text-[#8C6A54] mb-4">
                <Coffee className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#2B2623] mb-2">
                Everyday Comfort
              </h3>
              <p className="text-xs text-[#736B63] leading-relaxed">
                We design for real routines: waking up early, working from a desk, lounging on a rainy Sunday, and winding down before bed.
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-[#EAE3D9]">
              <div className="w-10 h-10 rounded-sm bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center text-[#8C6A54] mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#2B2623] mb-2">
                Thoughtful Safety
              </h3>
              <p className="text-xs text-[#736B63] leading-relaxed">
                Low-voltage heating elements, automatic timers, and quick-disconnect plugs mean you enjoy peaceful warmth with total peace of mind.
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-[#EAE3D9]">
              <div className="w-10 h-10 rounded-sm bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center text-[#8C6A54] mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#2B2623] mb-2">
                Honest Care
              </h3>
              <p className="text-xs text-[#736B63] leading-relaxed">
                No gimmicks or inflated claims. We offer straightforward customer service, fair shipping, and a genuine 30-day trial on every item.
              </p>
            </div>
          </div>

          <div className="bg-[#FAF5EE] p-8 rounded-sm border border-[#EAE3D9] space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#2B2623]">
              Our Promise to You
            </h2>
            <p className="text-xs sm:text-sm">
              We want your CozyCorobes experience to be as relaxing as the robe itself. That is why our team personally tests every model, packs each order with care from our UK fulfillment center, and promptly answers every customer inquiry.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#2B2623] hover:bg-[#47403C] text-white text-xs font-semibold px-6 py-3 rounded-sm transition-colors"
              >
                <span>Explore the CozyCorobes Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
