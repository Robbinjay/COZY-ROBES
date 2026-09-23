import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Truck, Clock, ShieldCheck, Globe, PackageCheck, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping Policy & Delivery Information | CozyCorobes',
  description:
    'Learn about CozyCorobes order processing times, standard and express shipping options, delivery windows, and parcel tracking.',
  alternates: {
    canonical: '/shipping',
  },
};

export default function ShippingPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ name: 'Shipping Policy', url: '/shipping' }]} />

        <div className="max-w-2xl mb-10 pt-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-2">
            Delivery & Fulfillment
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#2B2623] tracking-tight">
            Shipping Policy
          </h1>
          <p className="text-sm sm:text-base text-[#5C554F] mt-3 leading-relaxed">
            We know you are eager to wrap yourself in warmth. Here is everything you need to know about how your CozyCorobes order is packed, shipped, and delivered.
          </p>
        </div>

        {/* Shipping Options Table */}
        <div className="bg-white rounded-sm border border-[#EAE3D9] overflow-hidden shadow-xs mb-10">
          <div className="p-6 border-b border-[#EAE3D9]">
            <h2 className="font-serif text-lg font-bold text-[#2B2623]">
              UK Delivery Rates & Delivery Windows
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-[#FAF8F5] text-[#2B2623] font-semibold border-b border-[#EAE3D9]">
                <tr>
                  <th className="py-3.5 px-6">Delivery Method</th>
                  <th className="py-3.5 px-6">Transit Time</th>
                  <th className="py-3.5 px-6">Order Value</th>
                  <th className="py-3.5 px-6 text-right">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE3D9] text-[#5C554F]">
                <tr>
                  <td className="py-4 px-6 font-medium text-[#2B2623]">
                    Royal Mail Tracked 48
                  </td>
                  <td className="py-4 px-6">2–3 Working Days</td>
                  <td className="py-4 px-6">Orders £100.00 and above</td>
                  <td className="py-4 px-6 text-right font-bold text-[#3C6E47]">
                    FREE
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-[#2B2623]">
                    Royal Mail Tracked 48
                  </td>
                  <td className="py-4 px-6">2–3 Working Days</td>
                  <td className="py-4 px-6">Orders under £100.00</td>
                  <td className="py-4 px-6 text-right font-semibold text-[#2B2623]">
                    £3.99
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-[#2B2623]">
                    Royal Mail Tracked 24 (Next Working Day)
                  </td>
                  <td className="py-4 px-6">1–2 Working Days</td>
                  <td className="py-4 px-6">All order values</td>
                  <td className="py-4 px-6 text-right font-semibold text-[#2B2623]">
                    £6.99
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-[#5C554F] leading-relaxed">
          
          <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] space-y-3">
            <div className="flex items-center gap-2.5 text-[#2B2623] font-bold font-serif text-base">
              <Clock className="w-5 h-5 text-[#8C6A54]" />
              <span>Order Processing Timeline</span>
            </div>
            <p>
              Orders received before 1:00 PM GMT Monday through Friday are processed and dispatched within <strong>1–2 working days</strong>. Orders placed on weekends or bank holidays are processed on the next regular working day.
            </p>
            <p>
              Once your package leaves our UK fulfillment center, you will receive an automatic dispatch notification containing your Royal Mail direct tracking link and SMS delivery updates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] space-y-3">
            <div className="flex items-center gap-2.5 text-[#2B2623] font-bold font-serif text-base">
              <PackageCheck className="w-5 h-5 text-[#8C6A54]" />
              <span>Courier Shipment Tracking & Delivery Updates</span>
            </div>
            <p>
              Once your order has been packaged and dispatched from our UK fulfillment center, an official parcel tracking code will be issued directly by the courier service (Royal Mail). We will promptly send this tracking code and carrier link directly to your email address so you can track your package every step of the way on the courier&apos;s live tracking portal.
            </p>
            <p className="text-xs text-[#736B63] leading-relaxed">
              To review your full order details, items purchased, fulfillment status, and delivery addresses at any time, simply log into your customer account.
            </p>
            <div className="pt-2">
              <Link
                href="/account"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C6A54] hover:text-[#2B2623] underline"
              >
                <span>Visit My Account & Orders &rarr;</span>
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] space-y-3">
            <div className="flex items-center gap-2.5 text-[#2B2623] font-bold font-serif text-base">
              <Globe className="w-5 h-5 text-[#8C6A54]" />
              <span>UK Coverage & Outlying Regions</span>
            </div>
            <p>
              We deliver across England, Scotland, Wales, and Northern Ireland. Deliveries to the Scottish Highlands & Islands, Channel Islands, Isle of Man, and Scilly Isles may require an additional 1–2 transit days depending on local ferry and postal service connections.
            </p>
            <p>
              All prices displayed on cozyrobe.co.uk are in British Pounds (£) and include standard 20% UK VAT. No hidden customs duties or import charges apply to UK mainland orders.
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] space-y-3">
            <div className="flex items-center gap-2.5 text-[#2B2623] font-bold font-serif text-base">
              <ShieldCheck className="w-5 h-5 text-[#8C6A54]" />
              <span>Package Protection & Missing Deliveries</span>
            </div>
            <p>
              If your tracking indicates your package was delivered but you have not received it:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#736B63]">
              <li>Check safe places, porches, package lockers, or with household neighbors.</li>
              <li>Wait 24 hours, as Royal Mail occasionally marks parcels prior to final drop-off.</li>
              <li>Contact our support team at <a href="mailto:sales@cozyrobe.co.uk" className="text-[#8C6A54] underline">sales@cozyrobe.co.uk</a> with your order number. We will initiate a trace with Royal Mail immediately.</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
