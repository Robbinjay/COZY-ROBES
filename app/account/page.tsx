import React from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import AccountDashboard from '@/components/AccountDashboard';

export const metadata: Metadata = {
  title: 'My Account & Orders | CozyCorobes UK',
  description:
    'Manage your CozyCorobes customer account, track order status and receipts, update billing and shipping addresses, and adjust account preferences.',
  alternates: {
    canonical: '/account',
  },
};

export default function AccountPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-6 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'My Account', url: '/account' }]} />
        <AccountDashboard />
      </div>
    </div>
  );
}
