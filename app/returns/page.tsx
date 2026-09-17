import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { RotateCcw, ShieldCheck, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Returns & 30-Day Cozy Trial Policy | CozyCorobes',
  description:
    'Review our 30-day return window, condition guidelines, hassle-free exchanges, and refund instructions.',
  alternates: {
    canonical: '/returns',
  },
};

export default function ReturnsPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ name: 'Returns Policy', url: '/returns' }]} />

        <div className="max-w-2xl mb-10 pt-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-2">
            Peace of Mind
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B2623] tracking-tight">
            Returns & 30-Day Cozy Trial
          </h1>
          <p className="text-sm sm:text-base text-[#5C554F] mt-3 leading-relaxed">
            We want you to love your CozyCorobes heated robe. If you aren&rsquo;t completely satisfied with the warmth, fit, or comfort, we are here to make it right.
          </p>
        </div>

        {/* 30-Day Highlight Box */}
        <div className="bg-[#FAF5EE] border border-[#EAE3D9] p-6 sm:p-8 rounded-sm mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-white border border-[#EAE3D9] flex items-center justify-center text-[#8C6A54] shrink-0">
            <RotateCcw className="w-8 h-8 stroke-1.5" />
          </div>
          <div className="space-y-1">
            <h2 className="font-serif text-xl font-bold text-[#2B2623]">
              The 30-Day Cozy Guarantee
            </h2>
            <p className="text-xs sm:text-sm text-[#5C554F] leading-relaxed">
              Try your heated robe at home for 30 days from the date of delivery. If you decide it isn&rsquo;t the right match, return it for a refund or size/color exchange.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-[#5C554F] leading-relaxed">
          
          <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#2B2623] flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#8C6A54]" />
              <span>Return Eligibility Criteria</span>
            </h2>
            <p>
              To ensure hygiene standards and safety compliance for wearable items:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#736B63]">
              <li>Items must be initiated for return within <strong>30 calendar days</strong> of parcel delivery.</li>
              <li>Robes and accessories must be in original, unwashed condition, free from pet hair, stains, smoke, or heavy fragrance.</li>
              <li>All original heating controllers, cords, and product manuals must be included in the original packaging.</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#2B2623] flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#8C6A54]" />
              <span>How to Start a Return or Exchange</span>
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-[#736B63]">
              <li>
                <strong>Contact Customer Care:</strong> Email us at{' '}
                <a href="mailto:support@cozyrobe.co.uk" className="text-[#8C6A54] underline">
                  support@cozyrobe.co.uk
                </a>{' '}
                with your CozyCorobes Order ID and the reason for return/exchange.
              </li>
              <li>
                <strong>Receive Prepaid Label:</strong> Our team will email you a prepaid Royal Mail UK returns label with QR code for quick printing at the Post Office.
              </li>
              <li>
                <strong>Drop Off Package:</strong> Affix the label (or show the QR code) and drop it off at any Post Office, Royal Mail parcel locker, or schedule a free collection from your front door.
              </li>
              <li>
                <strong>Refund or Replacement:</strong> Once received and inspected at our warehouse, refunds are processed to your original payment method within 3–5 business days.
              </li>
            </ol>
          </div>

          <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#2B2623] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#8C6A54]" />
              <span>Damaged or Defective Items</span>
            </h2>
            <p>
              Every CozyCorobes garment is backed by a <strong>1-Year Limited Hardware Warranty</strong> covering electrical heating wires, controller modules, and wiring.
            </p>
            <p>
              If your item arrives damaged or malfunctions under normal indoor residential use, please email us with photos or a brief description. We will issue an immediate replacement unit at zero cost to you.
            </p>
          </div>

        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#2B2623] hover:bg-[#47403C] text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-sm transition-colors"
          >
            <span>Contact Support to Start a Return</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
