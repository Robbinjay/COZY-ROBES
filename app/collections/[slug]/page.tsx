import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { COLLECTIONS, PRODUCTS, FAQ_ITEMS } from '@/lib/store-data';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react';
import { getFaqSchema, getCollectionSchema } from '@/lib/seo';

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
    return { title: 'Collection Not Found | CozyCorobes' };
  }

  return {
    title: collection.metaTitle,
    description: collection.metaDescription,
    alternates: {
      canonical: `/collections/${collection.slug}`,
    },
    openGraph: {
      title: collection.metaTitle,
      description: collection.metaDescription,
      type: 'website',
      images: [
        {
          url: collection.heroImage,
          width: 1200,
          height: 630,
          alt: collection.title,
        },
      ],
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
  const collectionSchema = getCollectionSchema(
    collection.title,
    collection.description,
    collection.slug,
    collectionProducts
  );

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
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
            CozyCorobes UK Collection
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

            {collection.slug === 'heated-robes' ? (
              <>
                <p>
                  At CozyCorobes, we re-imagined the winter bathrobe by embedding advanced, safe low-voltage carbon-fiber micro-elements into thick, 320 GSM cloud sherpa fleece. Our flagship <Link href="/products/cozy-co-robes" className="font-semibold text-[#8C6A54] hover:text-[#2B2623] underline">The Cozy Co. Robe</Link> offers an oversized 50” x 70” wearable silhouette with 7 digital heat levels (35°C to 55°C) and multi-zone heating across the chest, back, and dual front pockets.
                </p>
                <p>
                  Say goodbye to high energy bills and being tethered to awkward electric blankets. With quick-breakaway magnetic power connectors and 100% machine-washable fabrics, our heated robes let you lounge, work, and relax in luxurious, soothing warmth. Complete your comfort setup by pairing with the <Link href="/products/cozyco-foot-warmer" className="font-semibold text-[#8C6A54] hover:text-[#2B2623] underline">CozyCo Electric Foot Warmer</Link> or browsing our <Link href="/collections/cozy-accessories" className="font-semibold text-[#8C6A54] hover:text-[#2B2623] underline">Cozy Accessories collection</Link>.
                </p>
              </>
            ) : collection.slug === 'cozy-accessories' ? (
              <>
                <p>
                  Our Cozy Accessories collection is designed to target personal cold spots and create total home relaxation. From the under-desk soothing warmth of our <Link href="/products/cozyco-foot-warmer" className="font-semibold text-[#8C6A54] hover:text-[#2B2623] underline">CozyCo Foot Warmer</Link> to the cervical spine alignment of the <Link href="/products/cozyco-pillow" className="font-semibold text-[#8C6A54] hover:text-[#2B2623] underline">CozyCo Cloud Cooling Memory Foam Pillow</Link> and plush <Link href="/products/cozy-glove" className="font-semibold text-[#8C6A54] hover:text-[#2B2623] underline">Cozy Glove sherpa mittens</Link>, every item brings thoughtful comfort to your daily routine.
                </p>
                <p>
                  Looking for full-body wearable warmth? Discover our premier <Link href="/collections/heated-robes" className="font-semibold text-[#8C6A54] hover:text-[#2B2623] underline">Heated Robes & Wearables</Link>, or read our guide on <Link href="/blog/cozy-work-from-home-routine" className="font-semibold text-[#8C6A54] hover:text-[#2B2623] underline">Building a Warm Work-From-Home Routine</Link>.
                </p>
              </>
            ) : (
              <>
                <p>
                  Discover the freshest innovations in personal comfort at CozyCorobes. Our winter new arrivals feature upgraded low-voltage DC heating elements, enhanced cloud sherpa fleece, and newly released colors in our signature oversized wearable blankets and accessories.
                </p>
                <p>
                  Every piece is covered by our genuine <Link href="/returns" className="font-semibold text-[#8C6A54] hover:text-[#2B2623] underline">30-Day Happiness Guarantee</Link> and dispatched from our UK fulfillment center with <Link href="/shipping" className="font-semibold text-[#8C6A54] hover:text-[#2B2623] underline">Royal Mail Tracked 48 Delivery</Link>.
                </p>
              </>
            )}

            <div className="pt-4 flex flex-wrap gap-4 text-xs font-semibold text-[#8C6A54]">
              <Link href="/blog/guide-to-choosing-a-heated-robe" className="hover:underline flex items-center gap-1">
                <span>Read: Heated Robe UK Buyer&apos;s Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/blog/how-to-wash-heated-robes-blankets" className="hover:underline flex items-center gap-1">
                <span>Read: How to Wash a Heated Robe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/faq" className="hover:underline flex items-center gap-1">
                <span>View All FAQs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white p-6 rounded-sm border border-[#EAE3D9] space-y-4">
            <h3 className="font-serif text-base font-bold text-[#2B2623]">
              Need Assistance?
            </h3>
            <p className="text-xs text-[#736B63] leading-relaxed">
              Our UK-based customer care specialists are happy to advise on sizing, heating levels, or order tracking.
            </p>
            <ul className="text-xs space-y-1.5 text-[#5C554F] pt-1">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3C6E47]" />
                <span>30-Day Cozy Trial & Easy Returns</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3C6E47]" />
                <span>Free UK Tracked 48 over £100</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3C6E47]" />
                <span>1-Year Hardware & Safety Warranty</span>
              </li>
            </ul>
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
              <details key={i} className="bg-white p-4 rounded-sm border border-[#EAE3D9] group">
                <summary className="font-serif text-sm font-bold text-[#2B2623] cursor-pointer flex items-center justify-between">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-4 h-4 text-[#8C6A54] group-open:rotate-180 transition-transform" />
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
