'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ShieldCheck, Truck, RotateCcw, Check, Instagram, Phone } from 'lucide-react';
import { useStore } from '@/lib/store-context';

export default function Footer() {
  const { config } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer id="main-footer" className="bg-[#231F1D] text-[#ECE6DF] pt-16 pb-12 border-t border-[#383330]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 mb-12 border-b border-[#383330] text-sm">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C89B7B] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Safe Low-Voltage Tech</p>
              <p className="text-xs text-[#A89E95] mt-0.5">Ultra-thin carbon elements with auto 2hr shutoff</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#C89B7B] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Free UK Delivery Over £100</p>
              <p className="text-xs text-[#A89E95] mt-0.5">Fast Royal Mail delivery directly from our UK hub</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RotateCcw className="w-5 h-5 text-[#C89B7B] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">30-Day Cozy Trial</p>
              <p className="text-xs text-[#A89E95] mt-0.5">Hassle-free returns & exchanges if not completely warm</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-[#C89B7B] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Dedicated Customer Care</p>
              <p className="text-xs text-[#A89E95] mt-0.5">Mon–Fri 9am–5pm GMT friendly UK support</p>
            </div>
          </div>
        </div>

        {/* 4 Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                CozyCorobes
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B86246] inline-block ml-1" />
            </Link>
            <p className="text-sm text-[#BDB2A7] leading-relaxed max-w-sm">
              Wearable warmth designed for slow mornings, chilly evenings, and everyday relaxation at home. Uncompromising softness meets intelligent personal heating.
            </p>

            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#D9CFC4] mb-2">
                Join the Cozy Club
              </p>
              <p className="text-xs text-[#A89E95] mb-3">
                Receive £10 off your first heated robe order and cold-weather comfort guides.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#8CD18C] bg-[#2E3B2E] p-2.5 rounded-sm">
                  <Check className="w-4 h-4" />
                  <span>Thank you! Check your inbox for your welcome code.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md gap-2">
                  <input
                    id="newsletter-email-input"
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="bg-[#2E2927] border border-[#47403C] text-sm text-white placeholder-[#877D75] px-3 py-2 rounded-sm focus:outline-none focus:border-[#C89B7B] flex-1 text-xs"
                  />
                  <button
                    id="newsletter-submit-btn"
                    type="submit"
                    className="bg-[#C89B7B] hover:bg-[#B88A6A] text-[#231F1D] text-xs font-semibold px-4 py-2 rounded-sm transition-colors cursor-pointer"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 1: SHOP */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#FAF8F5] mb-4">
              Shop
            </h3>
            <ul className="space-y-2.5 text-sm text-[#BDB2A7]">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/collections/heated-robes" className="hover:text-white transition-colors">
                  Heated Robes
                </Link>
              </li>
              <li>
                <Link href="/collections/cozy-accessories" className="hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/collections/new-arrivals" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/products/the-everyday-cozy-robe" className="hover:text-white transition-colors">
                  Classic Robe (Non-Heated)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: HELP */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#FAF8F5] mb-4">
              Help
            </h3>
            <ul className="space-y-2.5 text-sm text-[#BDB2A7]">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  My Account & Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: COMPANY & SUPPORT */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#FAF8F5] mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm text-[#BDB2A7]">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Cozy Journal (Blog)
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-xs text-[#C89B7B] hover:underline transition-colors">
                  Admin Configuration
                </Link>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-[#383330] text-xs text-[#9E948B] space-y-1">
              <p className="font-medium text-[#D9CFC4]">Direct Support:</p>
              <p>
                <a href={`mailto:${config.brand.supportEmail}`} className="hover:text-white underline underline-offset-2">
                  {config.brand.supportEmail}
                </a>
              </p>
              <p>{config.brand.supportHours}</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 border-t border-[#383330] flex flex-col sm:flex-row items-center justify-between text-xs text-[#877D75] gap-4">
          <p>© 2026 CozyCorobes. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[#877D75]">
            <span>Secure 256-Bit SSL Checkout</span>
            <span>•</span>
            <span>Visa, Mastercard, Amex, PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
