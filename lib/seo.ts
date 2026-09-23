import { Product, BlogPost, FAQItem } from './types';

const SITE_URL = process.env.APP_URL || 'https://cozyrobe.co.uk';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CozyCorobes',
    url: SITE_URL,
    logo: `${SITE_URL}/images/featured_robe_studio.jpg`,
    description: 'Specialists in premium electric heated robes and personal home comfort loungewear in the United Kingdom.',
    email: 'support@cozyrobe.co.uk',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@cozyrobe.co.uk',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '71–75 Shelton Street, Covent Garden',
      addressLocality: 'London',
      addressRegion: 'Greater London',
      postalCode: 'WC2H 9JQ',
      addressCountry: 'GB',
    },
    sameAs: [
      'https://instagram.com/cozycorobes',
      'https://pinterest.com/cozycorobes',
    ],
  };
}

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CozyCorobes',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getProductSchema(product: Product) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.map((img) => (img.startsWith('http') ? img : `${SITE_URL}${img}`)),
    description: product.description,
    sku: product.variants[0]?.sku || product.id,
    brand: {
      '@type': 'Brand',
      name: 'CozyCorobes',
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/products/${product.slug}`,
      priceCurrency: 'GBP',
      price: product.price.toFixed(2),
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'CozyCorobes',
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'GB',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: product.price >= 100 ? '0.00' : '3.99',
          currency: 'GBP',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'GB',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 4,
            unitCode: 'DAY',
          },
        },
      },
    },
  };

  if (product.reviewCount > 0 && product.rating > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: '5',
      worstRating: '1',
    };
  }

  return schema;
}

export function getCollectionSchema(title: string, description: string, slug: string, products: Product[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description: description,
    url: `${SITE_URL}/collections/${slug}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.map((prod, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/products/${prod.slug}`,
        name: prod.name,
        image: prod.images[0]?.startsWith('http') ? prod.images[0] : `${SITE_URL}${prod.images[0]}`,
      })),
    },
  };
}

export function getCatalogSchema(products: Product[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'CozyCorobes Heated Loungewear Catalog',
    description: 'Explore our full range of electric heated robes, wearable heated blankets, and cozy winter accessories.',
    url: `${SITE_URL}/shop`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.map((prod, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/products/${prod.slug}`,
        name: prod.name,
        image: prod.images[0]?.startsWith('http') ? prod.images[0] : `${SITE_URL}${prod.images[0]}`,
      })),
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function getArticleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    image: post.coverImage.startsWith('http') ? post.coverImage : `${SITE_URL}${post.coverImage}`,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CozyCorobes',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/featured_robe_studio.jpg`,
      },
    },
    datePublished: post.publishedDate,
    dateModified: post.updatedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export function getFaqSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
