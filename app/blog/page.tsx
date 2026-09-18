import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '@/lib/store-data';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cozy Living Blog & Guides | CozyCorobes',
  description:
    'Helpful guides on heated robe care, winter warmth tips, staying cozy while working from home, and choosing the right heated apparel.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ name: 'Blog & Guides', url: '/blog' }]} />

        {/* Header */}
        <div className="max-w-3xl mb-12 pt-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-2">
            Warm Living & Care
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B2623] tracking-tight">
            The Cozy Living Journal
          </h1>
          <p className="text-sm sm:text-base text-[#5C554F] mt-3 leading-relaxed">
            Practical buying guides, washing walkthroughs, and everyday tips for making your home the warmest, most comfortable sanctuary all season long.
          </p>
        </div>

        {/* Featured Article */}
        {BLOG_POSTS[0] && (
          <div className="mb-14 bg-white rounded-sm border border-[#EAE3D9] overflow-hidden shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 relative aspect-16/10 w-full bg-[#EAE3D9]">
                <Image
                  src={BLOG_POSTS[0].coverImage}
                  alt={BLOG_POSTS[0].title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6A54] bg-[#FAF5EE] px-2.5 py-1 rounded-xs">
                  {BLOG_POSTS[0].category}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2623] hover:text-[#8C6A54] transition-colors">
                  <Link href={`/blog/${BLOG_POSTS[0].slug}`}>
                    {BLOG_POSTS[0].title}
                  </Link>
                </h2>
                <p className="text-xs sm:text-sm text-[#5C554F] leading-relaxed">
                  {BLOG_POSTS[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-[#736B63] pt-2 border-t border-[#F0EBE1]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{BLOG_POSTS[0].publishedDate}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{BLOG_POSTS[0].readingTime}</span>
                  </span>
                </div>
                <div>
                  <Link
                    href={`/blog/${BLOG_POSTS[0].slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2B2623] hover:text-[#8C6A54] underline underline-offset-4"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Remaining Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(1).map((post) => (
            <article key={post.slug} className="bg-white rounded-sm border border-[#EAE3D9] overflow-hidden shadow-xs flex flex-col justify-between group">
              <div>
                <Link href={`/blog/${post.slug}`} className="relative block aspect-16/10 bg-[#EAE3D9] overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </Link>
                <div className="p-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A54] mb-2 block">
                    {post.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#2B2623] group-hover:text-[#8C6A54] transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-[#5C554F] mt-2 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs text-[#736B63] border-t border-[#F0EBE1] mt-4">
                <span>{post.readingTime}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-semibold text-[#8C6A54] hover:text-[#2B2623] flex items-center gap-1"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Categories & Product Cross-Linking Section */}
        <div className="mt-16 bg-white p-8 sm:p-10 rounded-sm border border-[#EAE3D9] shadow-xs">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8C6A54]">
              Expert Warmth & Home Comfort
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2623]">
              Looking for Wearable Comfort in the UK?
            </h2>
            <p className="text-sm text-[#5C554F] leading-relaxed">
              Whether you are looking for energy-saving tips during cold winter months, advice on machine-washing your electric heated garments, or building a comfortable home office routine, our editors regularly update this guide.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#F0EBE1]">
            <div className="space-y-2">
              <h3 className="font-serif text-sm font-bold text-[#2B2623]">
                Popular Products
              </h3>
              <ul className="text-xs space-y-2 text-[#5C554F]">
                <li>
                  <Link href="/products/cozy-co-robes" className="hover:text-[#8C6A54] underline">
                    The Cozy Co. Robe (7 Heat Levels)
                  </Link>
                </li>
                <li>
                  <Link href="/products/cozyco-foot-warmer" className="hover:text-[#8C6A54] underline">
                    CozyCo Heated Foot Warmer
                  </Link>
                </li>
                <li>
                  <Link href="/products/cozyco-pillow" className="hover:text-[#8C6A54] underline">
                    CozyCo Cooling Memory Foam Pillow
                  </Link>
                </li>
                <li>
                  <Link href="/products/cozy-glove" className="hover:text-[#8C6A54] underline">
                    Cozy Glove Sherpa Mittens
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-sm font-bold text-[#2B2623]">
                Collections
              </h3>
              <ul className="text-xs space-y-2 text-[#5C554F]">
                <li>
                  <Link href="/collections/heated-robes" className="hover:text-[#8C6A54] underline">
                    Heated Robes & Wearable Blankets
                  </Link>
                </li>
                <li>
                  <Link href="/collections/cozy-accessories" className="hover:text-[#8C6A54] underline">
                    Cozy Home Accessories & Slippers
                  </Link>
                </li>
                <li>
                  <Link href="/collections/new-arrivals" className="hover:text-[#8C6A54] underline">
                    New Arrivals & Winter Editions
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="hover:text-[#8C6A54] underline">
                    Shop All Products
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-sm font-bold text-[#2B2623]">
                Customer Help & Policies
              </h3>
              <ul className="text-xs space-y-2 text-[#5C554F]">
                <li>
                  <Link href="/faq" className="hover:text-[#8C6A54] underline">
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-[#8C6A54] underline">
                    UK Tracked 48 Delivery Times
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-[#8C6A54] underline">
                    30-Day Cozy Trial & Returns
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#8C6A54] underline">
                    About CozyCorobes
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
