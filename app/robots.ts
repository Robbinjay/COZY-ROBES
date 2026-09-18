import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.APP_URL || 'https://cozyrobe.co.uk';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/order-confirmation', '/api/'],
      },
      {
        userAgent: [
          'Googlebot',
          'Google-Extended',
          'GoogleOther',
          'Googlebot-Image',
          'Bingbot',
          'Applebot',
          'Slurp',
          'DuckDuckBot',
        ],
        allow: '/',
        disallow: ['/admin', '/order-confirmation', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
