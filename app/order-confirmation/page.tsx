import React from 'react';
import type { Metadata } from 'next';
import OrderConfirmationClient from '@/components/OrderConfirmationClient';

export const metadata: Metadata = {
  title: 'Order Confirmed | CozyCorobes',
  description: 'Thank you for your order. View your CozyCorobes receipt and delivery details.',
};

export default function OrderConfirmationPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <OrderConfirmationClient />
      </div>
    </div>
  );
}
