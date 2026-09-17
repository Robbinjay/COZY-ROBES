import React from 'react';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdminDashboard from '@/components/AdminDashboard';

export const metadata: Metadata = {
  title: 'Store Settings & Admin | CozyCorobes',
  description: 'Manage store configuration, announcement bars, shipping thresholds, and order status.',
};

export default function AdminPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Admin & Store Settings', url: '/admin' }]} />
        <div className="mt-4">
          <AdminDashboard />
        </div>
      </div>
    </div>
  );
}
