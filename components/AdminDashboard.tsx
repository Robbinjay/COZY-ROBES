'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store-context';
import { Save, Check, ShoppingBag, Sliders, Truck, RotateCcw } from 'lucide-react';
import { Order } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboard() {
  const { config, updateConfig, orders, updateOrderStatus } = useStore();

  const [announcementText, setAnnouncementText] = useState(config.announcementBar.text);
  const [announcementLink, setAnnouncementLink] = useState(config.announcementBar.linkUrl || '/shop');
  const [announcementEnabled, setAnnouncementEnabled] = useState(config.announcementBar.enabled);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(config.shipping.freeShippingThreshold);
  const [standardShippingRate, setStandardShippingRate] = useState(config.shipping.standardShippingRate);
  const [returnWindowDays, setReturnWindowDays] = useState(config.returns.returnWindowDays);
  const [supportEmail, setSupportEmail] = useState(config.brand.supportEmail);
  const [supportPhone, setSupportPhone] = useState(config.brand.phone || '+44 20 7946 0912');

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      announcementBar: {
        ...config.announcementBar,
        enabled: announcementEnabled,
        text: announcementText,
        linkUrl: announcementLink,
      },
      shipping: {
        ...config.shipping,
        freeShippingThreshold: Number(freeShippingThreshold),
        standardShippingRate: Number(standardShippingRate),
      },
      returns: {
        ...config.returns,
        returnWindowDays: Number(returnWindowDays),
      },
      brand: {
        ...config.brand,
        supportEmail,
        phone: supportPhone,
      },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const statusOptions: Order['status'][] = [
    'Order Placed',
    'Processing',
    'Shipped',
    'Out for Delivery',
    'Delivered',
  ];

  return (
    <div className="space-y-10">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE3D9]">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C6A54]">
            Store Control Center
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#2B2623]">
            CozyCorobes Configuration & Orders
          </h1>
          <p className="text-xs text-[#736B63] mt-1">
            Update store copy, pricing rules, shipping thresholds, and manage customer orders.
          </p>
        </div>

        <button
          onClick={handleSave}
          type="button"
          className="inline-flex items-center gap-2 bg-[#2B2623] hover:bg-[#47403C] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-sm transition-colors cursor-pointer shadow-xs"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4 text-green-400" />
              <span>Saved Successfully!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Configuration Forms */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Announcement Bar Config */}
          <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-xs space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#2B2623] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#8C6A54]" />
              <span>Announcement Bar Settings</span>
            </h2>

            <div className="flex items-center gap-2">
              <input
                id="announcement-enabled"
                type="checkbox"
                checked={announcementEnabled}
                onChange={(e) => setAnnouncementEnabled(e.target.checked)}
                className="rounded-xs accent-[#2B2623]"
              />
              <label htmlFor="announcement-enabled" className="text-xs font-semibold text-[#2B2623]">
                Display announcement bar at top of site
              </label>
            </div>

            <div>
              <label htmlFor="admin-announcement-text" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
                Announcement Message
              </label>
              <input
                id="admin-announcement-text"
                type="text"
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
              />
            </div>

            <div>
              <label htmlFor="admin-announcement-link" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
                Target Link URL
              </label>
              <input
                id="admin-announcement-link"
                type="text"
                value={announcementLink}
                onChange={(e) => setAnnouncementLink(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
              />
            </div>
          </div>

          {/* Shipping & Thresholds */}
          <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-xs space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#2B2623] flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#8C6A54]" />
              <span>Shipping & Delivery Rules</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="admin-freeship-threshold" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
                  Free Delivery Minimum (£)
                </label>
                <input
                  id="admin-freeship-threshold"
                  type="number"
                  value={freeShippingThreshold}
                  onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                  className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
                />
              </div>

              <div>
                <label htmlFor="admin-standard-rate" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
                  Standard Flat Rate (£)
                </label>
                <input
                  id="admin-standard-rate"
                  type="number"
                  step="0.05"
                  value={standardShippingRate}
                  onChange={(e) => setStandardShippingRate(Number(e.target.value))}
                  className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
                />
              </div>
            </div>
          </div>

          {/* Returns & Brand Support */}
          <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-xs space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#2B2623] flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#8C6A54]" />
              <span>Returns & Contact Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="admin-return-days" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
                  Return Window (Days)
                </label>
                <input
                  id="admin-return-days"
                  type="number"
                  value={returnWindowDays}
                  onChange={(e) => setReturnWindowDays(Number(e.target.value))}
                  className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
                />
              </div>

              <div>
                <label htmlFor="admin-support-email" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
                  Customer Support Email
                </label>
                <input
                  id="admin-support-email"
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right: Real-time Order Management */}
        <div className="lg:col-span-5 bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D9]">
            <h2 className="font-serif text-lg font-bold text-[#2B2623] flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#8C6A54]" />
              <span>Customer Orders ({orders.length})</span>
            </h2>
            <span className="text-xs text-[#736B63]">Live Local State</span>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
            {orders.map((ord) => (
              <div key={ord.id} className="p-4 bg-[#FAF8F5] rounded-sm border border-[#EAE3D9] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#2B2623]">{ord.id}</span>
                  <span className="font-semibold text-[#8C6A54]">{formatPrice(ord.total)}</span>
                </div>

                <div className="text-[11px] text-[#5C554F]">
                  <p><strong>Customer:</strong> {ord.customerName} ({ord.email})</p>
                  <p><strong>Items:</strong> {ord.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}</p>
                  <p><strong>Carrier:</strong> {ord.carrier} • Tracking: Courier code emailed to customer upon dispatch</p>
                </div>

                {/* Status selector */}
                <div className="flex items-center justify-between pt-2 border-t border-[#EAE3D9] text-xs">
                  <span className="text-[#736B63]">Status:</span>
                  <select
                    value={ord.status}
                    onChange={(e) => updateOrderStatus(ord.id, e.target.value as Order['status'])}
                    className="bg-white border border-[#D9D0C3] rounded-xs px-2 py-1 text-xs text-[#2B2623] focus:outline-none"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
