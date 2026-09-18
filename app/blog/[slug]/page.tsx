import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Markdown from 'react-markdown';
import { BLOG_POSTS, PRODUCTS } from '@/lib/store-data';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getArticleSchema } from '@/lib/seo';
import { Calendar, Clock, ArrowLeft, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';

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
    return { title: 'Article Not Found | CozyCorobes' };
  }

  const title = post.seoTitle || `${post.title} | CozyCorobes Living`;
  const description = post.metaDescription || post.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.updatedDate,
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
  
  // Find related products
  const relatedProducts = (post.relatedProductSlugs || [])
    .map((s) => PRODUCTS.find((p) => p.slug === s))
    .filter(Boolean);

  const featuredProduct = relatedProducts[0] || PRODUCTS[0];
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  // Extract headings from markdown content for TOC
  const headingLines = post.content
    .split('\n')
    .filter((line) => line.startsWith('### '))
    .map((line) => line.replace('### ', '').trim());

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs
          items={[
            { name: 'Blog & Care Guides', url: '/blog' },
            { name: post.title, url: `/blog/${post.slug}` },
          ]}
        />

        {/* Article Header */}
        <div className="space-y-4 pt-4 pb-8 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] bg-[#FAF5EE] border border-[#EAE3D9] px-3 py-1 rounded-xs inline-block">
            {post.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B2623] tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#736B63] pt-2 border-b border-[#EAE3D9] pb-4">
            <span>By <strong className="text-[#2B2623]">{post.author}</strong></span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Published {post.publishedDate}</span>
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
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content Body & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <article className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-sm border border-[#EAE3D9] shadow-xs space-y-6">
            
            {/* Excerpt Lead */}
            <p className="font-serif text-lg text-[#2B2623] italic leading-relaxed border-l-3 border-[#8C6A54] pl-4 py-1 bg-[#FAF8F5]">
              &ldquo;{post.excerpt}&rdquo;
            </p>

            {/* Rendered Markdown Body */}
            <div className="prose-clean">
              <Markdown
                components={{
                  a: ({ href, children }) => (
                    <Link
                      href={href || '#'}
                      className="font-semibold text-[#8C6A54] hover:text-[#2B2623] underline decoration-[#8C6A54]/50 hover:decoration-[#2B2623] transition-colors"
                    >
                      {children}
                    </Link>
                  ),
                  h2: ({ children }) => (
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2623] mt-10 mb-4 pt-2 border-b border-[#F0EBE1] pb-2">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2B2623] mt-8 mb-3 pt-1">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-sm sm:text-base text-[#5C554F] leading-relaxed mb-4">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="space-y-2 mb-6 list-disc list-inside text-sm sm:text-base text-[#5C554F] pl-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="space-y-2 mb-6 list-decimal list-inside text-sm sm:text-base text-[#5C554F] pl-2">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="leading-relaxed text-[#5C554F]">
                      {children}
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-[#2B2623]">
                      {children}
                    </strong>
                  ),
                  hr: () => <hr className="my-8 border-[#EAE3D9]" />,
                }}
              >
                {post.content}
              </Markdown>
            </div>

            {/* In-article Product Callout */}
            {featuredProduct && (
              <div className="border border-[#EAE3D9] bg-[#FAF8F5] p-6 rounded-sm my-8 flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-28 h-32 rounded-xs overflow-hidden bg-[#EAE3D9] shrink-0 border border-[#EAE3D9]">
                  <Image
                    src={featuredProduct.images[0]}
                    alt={featuredProduct.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-[10px] font-bold uppercase tracking-wider text-[#8C6A54]">
                    <Sparkles className="w-3 h-3" />
                    <span>Recommended UK Loungewear</span>
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#2B2623]">
                    {featuredProduct.name}
                  </h4>
                  <p className="text-xs text-[#736B63] line-clamp-2">
                    {featuredProduct.subtitle}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4">
                    <span className="text-sm font-bold text-[#2B2623]">
                      £{featuredProduct.price.toFixed(2)}
                    </span>
                    <Link
                      href={`/products/${featuredProduct.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#8C6A54] hover:text-[#2B2623] underline"
                    >
                      <span>View Specifications & Sizes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Article Footer & Cross-links */}
            <div className="pt-6 border-t border-[#F0EBE1] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <Link
                href="/blog"
                className="text-[#5C554F] hover:text-[#2B2623] flex items-center gap-1 font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to All Guides</span>
              </Link>
              <div className="flex items-center gap-3">
                <Link
                  href="/collections/heated-robes"
                  className="text-[#8C6A54] hover:underline font-semibold"
                >
                  Shop Heated Robes &rarr;
                </Link>
                <span className="text-[#D9D0C3]">|</span>
                <Link
                  href="/collections/cozy-accessories"
                  className="text-[#8C6A54] hover:underline font-semibold"
                >
                  Accessories &rarr;
                </Link>
              </div>
            </div>
          </article>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Table of Contents */}
            {headingLines.length > 0 && (
              <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-xs space-y-3">
                <h3 className="font-serif text-sm font-bold text-[#2B2623] uppercase tracking-wider text-xs">
                  In This Article
                </h3>
                <ul className="text-xs space-y-2.5 text-[#5C554F]">
                  {headingLines.map((heading, i) => (
                    <li key={i} className="flex items-start gap-1.5 leading-snug">
                      <ChevronRight className="w-3.5 h-3.5 text-[#8C6A54] shrink-0 mt-0.5" />
                      <span className="text-[#5C554F]">{heading}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Products Box */}
            <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-xs space-y-4">
              <h3 className="font-serif text-sm font-bold text-[#2B2623] uppercase tracking-wider text-xs">
                Featured in This Guide
              </h3>
              <div className="space-y-3 divide-y divide-[#F0EBE1]">
                {relatedProducts.slice(0, 3).map((prod) => (
                  <div key={prod?.id} className="pt-3 first:pt-0 flex items-center gap-3">
                    <div className="relative w-12 h-14 bg-[#FAF8F5] rounded-xs border border-[#EAE3D9] overflow-hidden shrink-0">
                      <Image
                        src={prod?.images[0] || ''}
                        alt={prod?.name || ''}
                        fill
                        sizes="48px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/products/${prod?.slug}`}
                        className="font-serif text-xs font-bold text-[#2B2623] hover:text-[#8C6A54] line-clamp-1"
                      >
                        {prod?.name}
                      </Link>
                      <p className="text-[11px] text-[#736B63] font-medium">£{prod?.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <Link
                  href="/shop"
                  className="block text-center text-xs font-bold text-[#2B2623] hover:text-[#8C6A54] bg-[#FAF8F5] border border-[#EAE3D9] py-2 rounded-xs transition-colors"
                >
                  View Full Catalog
                </Link>
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-xs space-y-4">
              <h3 className="font-serif text-sm font-bold text-[#2B2623] uppercase tracking-wider text-xs">
                Related Reading
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
                    <div className="flex items-center gap-2 text-[11px] text-[#736B63]">
                      <span>{r.category}</span>
                      <span>•</span>
                      <span>{r.readingTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links for Crawlers & Shoppers */}
            <div className="bg-[#FAF5EE] p-5 rounded-sm border border-[#EAE3D9] space-y-2">
              <h4 className="font-serif text-xs font-bold text-[#2B2623]">
                Helpful Customer Links
              </h4>
              <ul className="text-xs space-y-1.5 text-[#5C554F]">
                <li>
                  <Link href="/faq" className="hover:text-[#8C6A54] underline">
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-[#8C6A54] underline">
                    UK Tracked 48 Delivery Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-[#8C6A54] underline">
                    30-Day Happiness Guarantee
                  </Link>
                </li>
              </ul>
            </div>

          </aside>

        </div>

      </div>
    </div>
  );
}
