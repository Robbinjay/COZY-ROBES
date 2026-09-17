import React from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms and Conditions | CozyCorobes',
  description: 'Review terms of purchase, product usage guidelines, and warranty limitations for CozyCorobes.',
  alternates: {
    canonical: '/terms-and-conditions',
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Terms and Conditions', url: '/terms-and-conditions' }]} />

        <div className="max-w-3xl mb-8 pt-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-2">
            Legal & Terms
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2623]">
            Terms and Conditions
          </h1>
          <p className="text-xs text-[#736B63] mt-2">
            Last Updated: January 1, 2025
          </p>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-sm border border-[#EAE3D9] space-y-6 text-xs sm:text-sm text-[#5C554F] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#2B2623]">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing CozyCorobes (cozyrobe.co.uk) or purchasing any heated apparel or accessories from our online store, you agree to be bound by these Terms and Conditions and our Privacy Policy.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#2B2623]">
              2. Product Operation & Safety Compliance
            </h2>
            <p>
              CozyCorobes heated robes are engineered with certified low-voltage heating elements and automatic safety cutoffs. Users must operate products according to the included User Manual:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#736B63]">
              <li>Do not submerge power controllers or battery packs in water.</li>
              <li>Always disconnect power sources before laundering on gentle cold cycle.</li>
              <li>Do not use pins or metallic fasteners that could puncture heating elements.</li>
              <li>Inspect cables periodically for visible signs of damage or pinching.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#2B2623]">
              3. Pricing & Order Confirmation
            </h2>
            <p>
              All prices are listed in British Pounds (GBP / £) and include applicable UK Value Added Tax (VAT). We reserve the right to correct pricing errors and cancel orders resulting from inadvertent typographical or system errors with immediate full refund.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#2B2623]">
              4. Warranty & Liability
            </h2>
            <p>
              We provide a 1-year limited manufacturer warranty against electrical defects. To the maximum extent permitted by applicable law, CozyCorobes is not liable for indirect, incidental, or consequential damages resulting from improper product alteration or disregard of safety instructions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#2B2623]">
              5. Governing Law
            </h2>
            <p>
              These terms are governed by and construed in accordance with the laws of England and Wales. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
