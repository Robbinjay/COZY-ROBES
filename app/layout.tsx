import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/store-context';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SearchModal from '@/components/SearchModal';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { getOrganizationSchema, getWebsiteSchema } from '@/lib/seo';

const APP_URL = process.env.APP_URL || 'https://cozyrobe.co.uk';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'CozyCorobes UK – Warmth You Can Wear | Premium Heated Robes & Wearables',
    template: '%s | CozyCorobes',
  },
  description:
    'Wrap yourself in everyday comfort with soft, cozy heated robes designed for slow mornings, chilly evenings, work-from-home days, and everything in between.',
  keywords: [
    'heated robe',
    'electric heated robe UK',
    'wearable heated blanket',
    'cozy heated loungewear',
    'fleece warming robe',
    'heated slippers',
    'CozyCorobes',
  ],
  authors: [{ name: 'CozyCorobes UK' }],
  creator: 'CozyCorobes',
  publisher: 'CozyCorobes',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'CozyCorobes UK – Warmth You Can Wear | Premium Heated Robes',
    description:
      'Wrap yourself in everyday comfort with soft, cozy heated robes designed for slow mornings, chilly evenings, and everything in between.',
    url: APP_URL,
    siteName: 'CozyCorobes',
    images: [
      {
        url: `${APP_URL}/images/hero_heated_robe.jpg`,
        width: 1200,
        height: 630,
        alt: 'CozyCorobes Premium Heated Robe',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CozyCorobes – Warmth You Can Wear',
    description:
      'Ultra-soft heated robes and wearable blankets designed for everyday home coziness and gentle radiant warmth.',
    images: [`${APP_URL}/images/hero_heated_robe.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = getOrganizationSchema();
  const siteSchema = getWebsiteSchema();

  return (
    <html lang="en-GB" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#2B2623] antialiased selection:bg-[#EAE3D9] selection:text-[#2B2623]" suppressHydrationWarning>
        <StoreProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <SearchModal />
          <FloatingWhatsApp />
        </StoreProvider>
      </body>
    </html>
  );
}
