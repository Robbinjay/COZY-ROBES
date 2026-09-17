import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQ_ITEMS } from '@/lib/store-data';
import FaqAccordion from '@/components/FaqAccordion';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getFaqSchema } from '@/lib/seo';
import { Mail, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | CozyCorobes Help Center',
  description:
    'Find answers to common questions about CozyCorobes heated robes, heating controls, washing instructions, shipping times, returns, and warranties.',
  alternates: {
    canonical: '/faq',
  },
};

export default function FaqPage() {
  const faqSchema = getFaqSchema(FAQ_ITEMS);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ name: 'FAQ', url: '/faq' }]} />

        <div className="max-w-2xl mb-10 pt-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-2">
            Help & Knowledge Base
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B2623] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-[#5C554F] mt-3 leading-relaxed">
            Everything you need to know about our heated robes, fabric care, safe operation, order fulfillment, and our 30-day trial guarantee.
          </p>
        </div>

        <FaqAccordion items={FAQ_ITEMS} />

        {/* Contact banner */}
        <div className="mt-16 bg-[#F5EFEB] border border-[#EAE3D9] p-8 rounded-sm text-center space-y-3">
          <h2 className="font-serif text-xl font-bold text-[#2B2623]">
            Still have questions?
          </h2>
          <p className="text-xs sm:text-sm text-[#5C554F] max-w-md mx-auto">
            Our customer care specialists are available Monday through Saturday to assist with sizing advice, care questions, or order lookups.
          </p>
          <div className="pt-2 flex items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-[#2B2623] hover:bg-[#47403C] text-white text-xs font-semibold px-6 py-3 rounded-sm transition-colors flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Support</span>
            </Link>
            <Link
              href="/track-order"
              className="border border-[#D9D0C3] hover:bg-white text-[#2B2623] text-xs font-semibold px-6 py-3 rounded-sm transition-colors"
            >
              Track an Order
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
