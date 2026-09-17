import React from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy | CozyCorobes',
  description: 'Understand how CozyCorobes collects, protects, and handles your personal information.',
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Privacy Policy', url: '/privacy-policy' }]} />

        <div className="max-w-3xl mb-8 pt-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-2">
            Legal & Compliance
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2623]">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#736B63] mt-2">
            Last Updated: January 1, 2025
          </p>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-sm border border-[#EAE3D9] space-y-6 text-xs sm:text-sm text-[#5C554F] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#2B2623]">
              1. Overview & Commitment
            </h2>
            <p>
              At CozyCorobes (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), we respect your privacy and are committed to protecting your personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. This privacy policy explains how we collect, use, and disclose information when you visit cozyrobe.co.uk or make purchases from our store.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#2B2623]">
              2. Information We Collect
            </h2>
            <p>
              We collect information that you provide directly to us when placing an order, contacting support, or subscribing to our updates. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#736B63]">
              <li>Contact data: Name, billing and delivery address, email address, phone number.</li>
              <li>Transaction data: Details of products purchased, order values, date, and payment status (we do not store raw credit card numbers; transactions are encrypted via PCI-compliant processors).</li>
              <li>Communications: Messages submitted through our customer support forms.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#2B2623]">
              3. How We Use Your Information
            </h2>
            <p>
              We use your data solely for lawful commerce operations:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#736B63]">
              <li>Fulfilling and delivering your heated robes and accessories.</li>
              <li>Sending transactional order confirmations and tracking links.</li>
              <li>Providing customer service and resolving warranty or return requests.</li>
              <li>Preventing fraudulent transactions and ensuring web platform security.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#2B2623]">
              4. Data Sharing & Third Parties
            </h2>
            <p>
              We do not sell, rent, or trade your personal data to third parties. We share information only with trusted service providers necessary to operate our store (e.g., shipping carriers like Royal Mail, payment gateways, and hosting infrastructure).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#2B2623]">
              5. Your Rights & Inquiries
            </h2>
            <p>
              Under UK data protection law, you have the right to request access to, rectification, erasure, or portability of your personal data. To exercise any of these rights, please email us at{' '}
              <a href="mailto:privacy@cozyrobe.co.uk" className="text-[#8C6A54] underline">
                privacy@cozyrobe.co.uk
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
