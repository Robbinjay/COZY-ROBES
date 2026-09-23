import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';
import { Mail, Clock, HelpCircle, Package, MapPin, Zap, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | CozyCorobes Customer Support',
  description:
    'Send our team a message on our contact form — we reply within minutes. Connected directly to our admin desk for order help, heating advice, and returns.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div id="contact-page-container" className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ name: 'Contact', url: '/contact' }]} />

        <div className="max-w-2xl mb-8 pt-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-2">
            Get in Touch
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B2623] tracking-tight">
            We&rsquo;re Here to Help
          </h1>
          <p className="text-sm sm:text-base text-[#5C554F] mt-3 leading-relaxed">
            Have a question about our heated robes, order delivery, care advice, or returns? Send us a message on the contact form below &mdash; <strong>we reply within minutes</strong> during operational hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right: Info Cards */}
          <div className="lg:col-span-5 space-y-6">

            {/* Fast Reply Guarantee Notice */}
            <div id="fast-reply-card" className="bg-[#EBF7EE] p-5 rounded-sm border border-[#CDE9D2] space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
                <Zap className="w-4 h-4 text-[#2E7D32]" />
                <span>Fast Customer Care</span>
              </div>
              <p className="text-xs text-[#2E7D32]/90 leading-relaxed">
                When you drop us a message using the form, our admin team receives it instantly via Zoho Mail. <strong>We reply within minutes</strong> with tailored guidance, troubleshooting, or order updates.
              </p>
            </div>
            
            {/* Direct Support Card */}
            <div id="direct-support-card" className="bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-xs space-y-4">
              <div className="flex items-center gap-3 text-[#2B2623]">
                <div className="w-9 h-9 rounded-sm bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center text-[#8C6A54]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold">Admin Email Desk</h3>
                  <a
                    id="support-email-link"
                    href="mailto:sales@cozyrobe.co.uk"
                    className="text-xs text-[#8C6A54] hover:underline"
                  >
                    sales@cozyrobe.co.uk
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#2B2623]">
                <div className="w-9 h-9 rounded-sm bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center text-[#8C6A54]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold">Customer Care Hours</h3>
                  <p className="text-xs text-[#736B63]">
                    Mon &ndash; Fri: 9:00 AM &ndash; 6:00 PM GMT<br />
                    Sat: 10:00 AM &ndash; 4:00 PM GMT
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#2B2623]">
                <div className="w-9 h-9 rounded-sm bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center text-[#8C6A54]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold">Operations &amp; Fulfillment</h3>
                  <p className="text-xs text-[#736B63]">
                    71&ndash;75 Shelton Street, Covent Garden<br />
                    London, WC2H 9JQ, United Kingdom
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Order Support Notice */}
            <div id="account-orders-card" className="bg-[#FAF5EE] p-6 rounded-sm border border-[#EAE3D9] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2B2623] uppercase tracking-wider">
                <Package className="w-4 h-4 text-[#8C6A54]" />
                <span>Checking on an Order?</span>
              </div>
              <p className="text-xs text-[#5C554F] leading-relaxed">
                Log into your customer account to view order history, courier dispatch details, receipts, and saved delivery addresses.
              </p>
              <Link
                id="contact-account-link"
                href="/account"
                className="inline-block text-xs text-[#8C6A54] hover:text-[#2B2623] underline font-semibold"
              >
                Go to My Account &amp; Orders &rarr;
              </Link>
            </div>

            {/* FAQ quick link */}
            <div id="faq-help-card" className="bg-white p-6 rounded-sm border border-[#EAE3D9] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2B2623] uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-[#8C6A54]" />
                <span>Need an Instant Answer?</span>
              </div>
              <p className="text-xs text-[#5C554F] leading-relaxed">
                Browse our comprehensive FAQ for answers regarding washing, temperature controls, sizing, and international shipping.
              </p>
              <Link
                id="contact-faq-link"
                href="/faq"
                className="inline-block text-xs text-[#8C6A54] hover:text-[#2B2623] underline font-semibold"
              >
                Browse Frequently Asked Questions &rarr;
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
