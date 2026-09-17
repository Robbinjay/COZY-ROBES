import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { COLLECTIONS, PRODUCTS, FAQ_ITEMS } from '@/lib/store-data';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { getFaqSchema } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COLLECTIONS.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);

  if (!collection) {
    return { title: 'Collection Not Found' };
  }

  return {
    title: collection.metaTitle,
    description: collection.metaDescription,
    alternates: {
      canonical: `/collections/${collection.slug}`,
    },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  // Filter products matching collection
  let collectionProducts = PRODUCTS;
  if (collection.slug === 'heated-robes') {
    collectionProducts = PRODUCTS.filter((p) => p.category === 'heated-robes');
  } else if (collection.slug === 'cozy-accessories') {
    collectionProducts = PRODUCTS.filter((p) => p.category === 'cozy-accessories');
  } else if (collection.slug === 'new-arrivals') {
    collectionProducts = PRODUCTS.filter((p) => p.isNewArrival);
  }

  const categoryFaqs = FAQ_ITEMS.slice(0, 4);
  const faqSchema = getFaqSchema(categoryFaqs);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs
          items={[
            { name: 'Collections', url: '/shop' },
            { name: collection.title, url: `/collections/${collection.slug}` },
          ]}
        />

        {/* Collection Header */}
        <div className="max-w-3xl mb-12 pt-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-2">
            Collection
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B2623] tracking-tight">
            {collection.title}
          </h1>
          <p className="text-sm sm:text-base text-[#5C554F] mt-3 leading-relaxed">
            {collection.description}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collectionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Helpful In-Depth Category Guide / SEO Copy */}
        <div className="mt-16 pt-12 border-t border-[#EAE3D9] grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-4 text-xs sm:text-sm text-[#5C554F] leading-relaxed">
            <h2 className="font-serif text-2xl font-bold text-[#2B2623]">
              About Our {collection.title}
            </h2>
            <p>
              At CozyCorobes, we believe staying warm should never mean being tied to a fixed wall outlet with stiff wires or sitting beneath an unwieldy electric blanket. Every piece in our {collection.title.toLowerCase()} line is engineered for true portability, ergonomic drape, and whisper-quiet operation.
            </p>
            <p>
              Whether you are looking for soothing radiant heat to relieve muscle stiffness or simply searching for the softest fleece loungewear for winter mornings, our pieces combine high-density fleece with tested low-voltage heating elements. All items are covered by our 30-day trial and 1-year hardware warranty.
            </p>

            <div className="pt-4 flex flex-wrap gap-4 text-xs font-semibold text-[#8C6A54]">
              <Link href="/blog/guide-to-choosing-a-heated-robe" className="hover:underline flex items-center gap-1">
                <span>Read: Heated Robe Buying Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/blog/how-to-wash-heated-robes-blankets" className="hover:underline flex items-center gap-1">
                <span>Read: Washing & Maintenance Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white p-6 rounded-sm border border-[#EAE3D9] space-y-4">
            <h3 className="font-serif text-base font-bold text-[#2B2623]">
              Need Help Deciding?
            </h3>
            <p className="text-xs text-[#736B63]">
              Have questions about sizing, battery compatibility, or washing procedures? Our team is here to assist.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-block w-full text-center bg-[#2B2623] hover:bg-[#47403C] text-white text-xs font-semibold py-2.5 px-4 rounded-sm transition-colors"
              >
                Contact Customer Support
              </Link>
            </div>
          </div>
        </div>

        {/* Collection FAQ */}
        <div className="mt-14 pt-12 border-t border-[#EAE3D9] max-w-3xl">
          <h2 className="font-serif text-xl font-bold text-[#2B2623] mb-6">
            Frequently Asked Questions About This Collection
          </h2>
          <div className="space-y-3">
            {categoryFaqs.map((faq, i) => (
              <details key={i} className="bg-white p-4 rounded-sm border border-[#EAE3D9]">
                <summary className="font-serif text-sm font-bold text-[#2B2623] cursor-pointer flex items-center justify-between">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-4 h-4 text-[#8C6A54]" />
                </summary>
                <p className="text-xs text-[#5C554F] mt-2 pt-2 border-t border-[#F0EBE1] leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
