import React from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import TrackOrderForm from '@/components/TrackOrderForm';

export const metadata: Metadata = {
  title: 'Track Your Order | CozyCorobes Real-Time Shipment Status',
  description:
    'Track your CozyCorobes shipment in real time. Enter your Order ID and email to view delivery progress and carrier tracking.',
  alternates: {
    canonical: '/track-order',
  },
};

export default function TrackOrderPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ name: 'Track Order', url: '/track-order' }]} />

        <div className="max-w-2xl mb-8 pt-2 text-center mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-2">
            Real-Time Fulfillment Status
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2623] tracking-tight">
            Track Your Shipment
          </h1>
          <p className="text-sm text-[#5C554F] mt-2">
            Check the progress of your CozyCorobes order from our packaging station directly to your front porch.
          </p>
        </div>

        <TrackOrderForm />

      </div>
    </div>
  );
}
