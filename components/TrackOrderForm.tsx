'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Package, Truck, CheckCircle2, MapPin, AlertCircle } from 'lucide-react';
import { useStore } from '@/lib/store-context';
import { Order } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

export default function TrackOrderForm() {
  const { lookupOrder } = useStore();
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = orderNumber.trim();
    const cleanEmail = email.trim();
    const found = lookupOrder(cleanId, cleanEmail);
    setOrder(found || null);
    setSearched(true);
  };

  const getStepStatus = (currentStatus: Order['status'], stepStatus: string) => {
    const sequence = ['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
    const currentIndex = sequence.indexOf(currentStatus);
    const stepIndex = sequence.indexOf(stepStatus);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  const steps = [
    { key: 'Order Placed', label: 'Order Confirmed', icon: CheckCircle2 },
    { key: 'Processing', label: 'Packed & Inspected', icon: Package },
    { key: 'Shipped', label: 'Shipped via Carrier', icon: Truck },
    { key: 'Delivered', label: 'Delivered', icon: MapPin },
  ];

  return (
    <div className="space-y-10">
      
      {/* Search Lookup Box */}
      <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#EAE3D9] shadow-xs max-w-xl mx-auto">
        <h2 className="font-serif text-xl font-bold text-[#2B2623] mb-2 text-center">
          Look Up Your Order
        </h2>
        <p className="text-xs text-[#736B63] mb-6 text-center">
          Enter your order number (e.g. <span className="font-mono text-[#8C6A54] font-semibold">CCR-782194</span>) and the billing email address.
        </p>

        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label htmlFor="track-order-id" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
              Order Number *
            </label>
            <input
              id="track-order-id"
              type="text"
              required
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="e.g. CCR-782194"
              className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
            />
          </div>

          <div>
            <label htmlFor="track-email" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
              Billing Email Address *
            </label>
            <input
              id="track-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="customer@example.com"
              className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
            />
          </div>

          <button
            id="track-order-submit-btn"
            type="submit"
            className="w-full bg-[#2B2623] hover:bg-[#47403C] text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Track My Package</span>
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-[#F0EBE1] text-center">
          <p className="text-[11px] text-[#8C8278]">
            Tip: Try sample order{' '}
            <button
              type="button"
              onClick={() => {
                setOrderNumber('CCR-782194');
                setEmail('customer@example.com');
              }}
              className="text-[#8C6A54] underline font-semibold cursor-pointer"
            >
              CCR-782194 / customer@example.com
            </button>{' '}
            to see live tracking.
          </p>
        </div>
      </div>

      {/* Lookup Result */}
      {searched && (
        <div className="max-w-3xl mx-auto">
          {order ? (
            <div className="bg-white rounded-sm border border-[#EAE3D9] shadow-xs overflow-hidden">
              
              {/* Header */}
              <div className="p-6 bg-[#FAF5EE] border-b border-[#EAE3D9] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A54]">
                    Order Status
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#2B2623]">
                    Order #{order.id}
                  </h3>
                  <p className="text-xs text-[#736B63] mt-0.5">
                    Placed on {order.date}
                  </p>
                </div>

                <div className="text-right">
                  <span className="inline-block bg-[#2B2623] text-white text-xs font-bold uppercase px-3 py-1 rounded-xs">
                    {order.status}
                  </span>
                  <p className="text-xs text-[#5C554F] font-semibold mt-1">
                    Est. Arrival: {order.estimatedDelivery}
                  </p>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="p-6 sm:p-8 border-b border-[#EAE3D9]">
                <div className="relative flex items-center justify-between">
                  {/* Progress Line */}
                  <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-[#EAE3D9] z-0" />
                  
                  {steps.map((step) => {
                    const status = getStepStatus(order.status, step.key);
                    const StepIcon = step.icon;
                    return (
                      <div key={step.key} className="relative z-10 flex flex-col items-center">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                            status === 'completed' || status === 'current'
                              ? 'bg-[#2B2623] text-white'
                              : 'bg-[#EAE3D9] text-[#8C8278]'
                          }`}
                        >
                          <StepIcon className="w-4 h-4" />
                        </div>
                        <span className={`text-[11px] mt-2 font-medium text-center hidden sm:block ${
                          status === 'current' ? 'text-[#2B2623] font-bold' : 'text-[#736B63]'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Carrier details */}
                <div className="mt-8 bg-[#FAF8F5] p-4 rounded-sm border border-[#EAE3D9] flex flex-wrap items-center justify-between gap-3 text-xs text-[#5C554F]">
                  <div>
                    <span className="text-[#8C8278]">Carrier:</span>{' '}
                    <strong className="text-[#2B2623]">{order.carrier || 'Royal Mail'}</strong>
                  </div>
                  <div>
                    <span className="text-[#8C8278]">Tracking #:</span>{' '}
                    <strong className="text-[#2B2623] font-mono">{order.trackingNumber || 'Pending scan'}</strong>
                  </div>
                  <div>
                    <span className="text-[#8C8278]">Destination:</span>{' '}
                    <strong className="text-[#2B2623]">{order.shippingAddress.city}, {order.shippingAddress.state}</strong>
                  </div>
                </div>
              </div>

              {/* Items in this order */}
              <div className="p-6 sm:p-8">
                <h4 className="font-serif text-sm font-bold text-[#2B2623] mb-4">
                  Items in Shipment ({order.items.reduce((a, b) => a + b.quantity, 0)})
                </h4>
                <div className="divide-y divide-[#EAE3D9]">
                  {order.items.map((item, idx) => (
                    <div key={`${item.productId}-${idx}`} className="py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-14 bg-[#EAE3D9] rounded-xs overflow-hidden shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#2B2623]">{item.name}</p>
                          <p className="text-[11px] text-[#736B63]">
                            Qty: {item.quantity} • {item.color} • {item.size}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#2B2623]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[#EAE3D9] flex justify-between text-xs text-[#2B2623] font-bold">
                  <span>Total Paid</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white p-8 rounded-sm border border-[#EAE3D9] text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-[#B86246] mx-auto" />
              <h3 className="font-serif text-lg font-bold text-[#2B2623]">
                Order Not Found
              </h3>
              <p className="text-xs text-[#736B63] max-w-sm mx-auto">
                We could not locate an order with ID &ldquo;{orderNumber}&rdquo; matching that email. Please double check the details in your order confirmation email.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="text-xs text-[#8C6A54] hover:underline font-semibold"
                >
                  Need help finding your order? Contact Customer Care &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
