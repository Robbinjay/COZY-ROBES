import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/lib/store-data';
import ProductDetailClient from '@/components/ProductDetailClient';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getProductSchema } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const params = PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
  params.push({ slug: 'cozy-co-robe' });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug || (slug === 'cozy-co-robe' && p.slug === 'cozy-co-robes'));

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const appUrl = process.env.APP_URL || 'https://cozyrobe.co.uk';

  return {
    title: `${product.name} – ${product.subtitle}`,
    description: product.description.slice(0, 155),
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | CozyCorobes`,
      description: product.subtitle,
      url: `${appUrl}/products/${product.slug}`,
      images: [
        {
          url: product.images[0].startsWith('http')
            ? product.images[0]
            : `${appUrl}${product.images[0]}`,
          width: 1200,
          height: 900,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug || (slug === 'cozy-co-robe' && p.slug === 'cozy-co-robes'));

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);
  const productSchema = getProductSchema(product);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Schema.org Product structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />

        <Breadcrumbs
          items={[
            { name: 'Shop', url: '/shop' },
            { name: product.name, url: `/products/${product.slug}` },
          ]}
        />

        <div className="mt-4">
          <ProductDetailClient
            product={product}
            relatedProducts={relatedProducts}
          />
        </div>

      </div>
    </div>
  );
}
