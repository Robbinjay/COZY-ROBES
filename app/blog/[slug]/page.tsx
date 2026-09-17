import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS, PRODUCTS } from '@/lib/store-data';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getArticleSchema } from '@/lib/seo';
import { Calendar, Clock, ArrowLeft, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return { title: 'Article Not Found' };
  }

  return {
    title: `${post.title} | CozyCorobes Living`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedDate,
      authors: [post.author],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const articleSchema = getArticleSchema(post);
  const featuredProduct = PRODUCTS.find((p) => p.slug === 'cozy-co-robes') || PRODUCTS[0];
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs
          items={[
            { name: 'Blog', url: '/blog' },
            { name: post.title, url: `/blog/${post.slug}` },
          ]}
        />

        {/* Article Header */}
        <div className="space-y-4 pt-4 pb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] bg-[#FAF5EE] px-3 py-1 rounded-xs inline-block">
            {post.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B2623] tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#736B63] pt-2 border-b border-[#EAE3D9] pb-4">
            <span>By {post.author}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.publishedDate}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readingTime}</span>
            </span>
          </div>
        </div>

        {/* Featured Banner Image */}
        <div className="relative aspect-16/9 w-full rounded-sm overflow-hidden border border-[#EAE3D9] shadow-xs mb-10 bg-[#EAE3D9]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-sm border border-[#EAE3D9] shadow-xs space-y-6 text-[#5C554F] leading-relaxed text-sm sm:text-base">
            <p className="font-serif text-lg text-[#2B2623] italic leading-relaxed border-l-2 border-[#8C6A54] pl-4">
              &ldquo;{post.excerpt}&rdquo;
            </p>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#2B2623] pt-4">
                Understanding Heated Garment Technology
              </h2>
              <p>
                Unlike older heating pads from decades past that used stiff, heavy copper wiring prone to breaking or hot spots, modern heated robes rely on ultra-thin carbon-fiber micro-elements. These filaments are woven between thick layers of insulating sherpa and micro-fleece, distributing gentle radiant heat across wide surface areas without feeling bulky.
              </p>
              <p>
                Because carbon fiber is inherently ductile and flexible, it flexes naturally with every fold and drape of the fabric. This allows you to curl up on the sofa, reach for your morning coffee, or work at your desk without feeling rigid internal cords.
              </p>
            </div>

            <div className="bg-[#FAF5EE] p-6 rounded-sm border border-[#EAE3D9] space-y-3 my-6">
              <h3 className="font-serif text-base font-bold text-[#2B2623]">
                Key Highlights from Our Care Specialists:
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8C6A54] shrink-0 mt-0.5" />
                  <span><strong>Always disconnect the power controller</strong> before washing or storing your robe.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8C6A54] shrink-0 mt-0.5" />
                  <span><strong>Wash on gentle cold cycle</strong> using mild detergent. Never bleach or dry clean.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8C6A54] shrink-0 mt-0.5" />
                  <span><strong>Tumble dry on lowest heat</strong> or lay flat across a drying rack until thoroughly dry.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#2B2623] pt-4">
                How Heated Robes Compare to Traditional Electric Blankets
              </h2>
              <p>
                The biggest advantage of a heated robe over an electric throw is <em>ergonomic mobility</em>. An electric blanket requires you to sit relatively still in one spot; the moment you pull back the blanket to get up, cold air rushes in and all accumulated warmth escapes.
              </p>
              <p>
                A wearable heated robe stays wrapped securely around your body via its plush belt and oversized collar. Whether you are moving between rooms, making breakfast, or standing during a conference call, the warmth moves with you.
              </p>
            </div>

            {/* In-article Product Callout */}
            <div className="border border-[#EAE3D9] bg-[#FAF8F5] p-6 rounded-sm my-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-28 h-32 rounded-xs overflow-hidden bg-[#EAE3D9] shrink-0">
                <Image
                  src={featuredProduct.images[0]}
                  alt={featuredProduct.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A54]">
                  Featured Recommendation
                </span>
                <h4 className="font-serif text-base font-bold text-[#2B2623]">
                  {featuredProduct.name}
                </h4>
                <p className="text-xs text-[#736B63] line-clamp-2">
                  {featuredProduct.subtitle}
                </p>
                <div className="pt-1">
                  <Link
                    href={`/products/${featuredProduct.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#2B2623] hover:text-[#8C6A54] underline"
                  >
                    <span>View Product Details & Pricing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#2B2623] pt-4">
                Final Thoughts
              </h2>
              <p>
                Investing in thoughtful comfort pays dividends during chilly winter months. By keeping your personal body temperature regulated with gentle radiant warmth, you can often lower your home thermostat a few degrees, saving on winter heating bills while feeling noticeably cozier throughout the day.
              </p>
            </div>

            <div className="pt-6 border-t border-[#F0EBE1] flex items-center justify-between text-xs">
              <Link
                href="/blog"
                className="text-[#5C554F] hover:text-[#2B2623] flex items-center gap-1 font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to All Guides</span>
              </Link>
              <Link
                href="/collections/heated-robes"
                className="text-[#8C6A54] hover:underline font-semibold"
              >
                Explore Heated Robes &rarr;
              </Link>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Table of Contents */}
            <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-xs space-y-3">
              <h3 className="font-serif text-sm font-bold text-[#2B2623]">
                In This Article
              </h3>
              <ul className="text-xs space-y-2 text-[#5C554F]">
                <li className="hover:text-[#8C6A54] cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#8C6A54]" />
                  <span>Understanding Heated Garments</span>
                </li>
                <li className="hover:text-[#8C6A54] cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#8C6A54]" />
                  <span>Key Care & Washing Highlights</span>
                </li>
                <li className="hover:text-[#8C6A54] cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#8C6A54]" />
                  <span>Heated Robe vs Electric Blanket</span>
                </li>
                <li className="hover:text-[#8C6A54] cursor-pointer flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#8C6A54]" />
                  <span>Energy Savings & Thermostats</span>
                </li>
              </ul>
            </div>

            {/* Related Articles */}
            <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-xs space-y-4">
              <h3 className="font-serif text-sm font-bold text-[#2B2623]">
                Related Guides
              </h3>
              <div className="space-y-4">
                {relatedPosts.map((r) => (
                  <div key={r.slug} className="space-y-1">
                    <Link
                      href={`/blog/${r.slug}`}
                      className="font-serif text-xs font-bold text-[#2B2623] hover:text-[#8C6A54] line-clamp-2"
                    >
                      {r.title}
                    </Link>
                    <p className="text-[11px] text-[#736B63]">{r.readingTime}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
