'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/lib/store-context';
import { formatPrice } from '@/lib/utils';
import Breadcrumbs from '@/components/Breadcrumbs';
import { 
  Package, 
  Truck, 
  Search, 
  AlertCircle, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Calendar,
  ExternalLink
} from 'lucide-react';

function OrderTrackingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { findOrder } = useStore();
  
  const orderIdParam = searchParams.get('orderId');
  const emailParam = searchParams.get('email');
  
  const [orderIdInput, setOrderIdInput] = useState(orderIdParam || '');
  const [emailInput, setEmailInput] = useState(emailParam || '');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  
  const foundOrder = (orderIdParam && emailParam) ? findOrder(orderIdParam, emailParam) : null;
  const hasSearched = Boolean(orderIdParam && emailParam);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!orderIdInput.trim()) {
      setError('Please enter your order number.');
      return;
    }
    
    if (!emailInput.trim() || !emailInput.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    
    setIsSearching(true);
    const params = new URLSearchParams();
    params.set('orderId', orderIdInput.trim().toUpperCase());
    params.set('email', emailInput.trim().toLowerCase());
    router.push(`/track-order?${params.toString()}`);
    setIsSearching(false);
  };

  if (hasSearched && foundOrder) {
    return (
      <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
        <Breadcrumbs items={[{ name: 'Track Order', url: '/track-order' }]} />
        
        {/* Order Results View */}
        <div className="mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <button
                onClick={() => router.push('/track-order')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C6A54] hover:text-[#2B2623] mb-3"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Track another order</span>
              </button>
              <h1 className="font-serif text-3xl font-bold text-[#2B2623]">
                Order #{foundOrder.id}
              </h1>
              <p className="text-xs text-[#736B63] mt-1">
                Placed on {foundOrder.date} • {foundOrder.items.length} {foundOrder.items.length === 1 ? 'item' : 'items'}
              </p>
            </div>
            <div className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest border ${
              foundOrder.status === 'Delivered'
                ? 'bg-green-50 text-green-700 border-green-200'
                : foundOrder.status === 'Shipped' || foundOrder.status === 'Out for Delivery'
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              {foundOrder.status}
            </div>
          </div>

          {/* Status Timeline */}
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#EAE3D9] shadow-sm">
            <h2 className="text-sm font-serif font-bold text-[#2B2623] mb-8 border-b border-[#FAF8F5] pb-4">
              Delivery Progress
            </h2>
            
            <div className="relative space-y-8 pb-4">
              {/* Vertical Line */}
              <div className="absolute left-3 top-2 bottom-6 w-0.5 bg-[#EAE3D9]" />
              
              {/* Order Placed */}
              <div className="relative flex gap-6">
                <div className="z-10 w-6 h-6 rounded-full bg-green-500 border-4 border-white shadow-sm flex items-center justify-center shrink-0" />
                <div>
                  <p className="text-xs font-bold text-[#2B2623]">Order Placed</p>
                  <p className="text-[11px] text-[#736B63]">{foundOrder.date}</p>
                </div>
              </div>

              {/* Processing */}
              <div className="relative flex gap-6">
                <div className={`z-10 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center shrink-0 ${
                  foundOrder.status !== 'Order Placed' ? 'bg-green-500' : 'bg-[#EAE3D9]'
                }`} />
                <div>
                  <p className={`text-xs font-bold ${foundOrder.status === 'Order Placed' ? 'text-[#A3998F]' : 'text-[#2B2623]'}`}>
                    Processing
                  </p>
                  <p className="text-[11px] text-[#736B63]">Preparing your items for dispatch</p>
                </div>
              </div>

              {/* Shipped */}
              <div className="relative flex gap-6">
                <div className={`z-10 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center shrink-0 ${
                  ['Shipped', 'Out for Delivery', 'Delivered'].includes(foundOrder.status) ? 'bg-green-500' : 'bg-[#EAE3D9]'
                }`} />
                <div className="flex-1">
                  <p className={`text-xs font-bold ${['Order Placed', 'Processing'].includes(foundOrder.status) ? 'text-[#A3998F]' : 'text-[#2B2623]'}`}>
                    Shipped
                  </p>
                  {foundOrder.carrier && ['Shipped', 'Out for Delivery', 'Delivered'].includes(foundOrder.status) && (
                    <div className="mt-2 p-3 bg-[#FAF8F5] rounded-xs border border-[#EAE3D9] flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Truck className="w-4 h-4 text-[#8C6A54]" />
                        <div>
                          <p className="text-[10px] font-bold text-[#2B2623] uppercase">Carrier: {foundOrder.carrier}</p>
                          <p className="text-[10px] text-[#736B63]">Tracking info emailed to {foundOrder.email}</p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        className="text-[10px] font-bold text-[#8C6A54] flex items-center gap-1 hover:underline"
                        onClick={(e) => e.preventDefault()}
                      >
                        Track <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Delivered */}
              <div className="relative flex gap-6">
                <div className={`z-10 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center shrink-0 ${
                  foundOrder.status === 'Delivered' ? 'bg-green-500' : 'bg-[#EAE3D9]'
                }`} />
                <div>
                  <p className={`text-xs font-bold ${foundOrder.status !== 'Delivered' ? 'text-[#A3998F]' : 'text-[#2B2623]'}`}>
                    Delivered
                  </p>
                  {foundOrder.estimatedDelivery && foundOrder.status !== 'Delivered' && (
                    <p className="text-[11px] text-[#736B63]">Estimated delivery: {foundOrder.estimatedDelivery}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-sm border border-[#EAE3D9] shadow-sm overflow-hidden h-fit">
              <div className="px-6 py-4 border-b border-[#EAE3D9] bg-[#FAF8F5]">
                <h3 className="text-xs font-bold text-[#2B2623] uppercase tracking-widest">Order Summary</h3>
              </div>
              <div className="divide-y divide-[#FAF8F5]">
                {foundOrder.items.map((item, idx) => (
                  <div key={idx} className="p-4 flex gap-4">
                    <div className="relative w-14 h-14 bg-[#F5F2ED] rounded-xs overflow-hidden shrink-0 border border-[#EAE3D9]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-[#2B2623]">{item.name}</h4>
                      <p className="text-[10px] text-[#736B63] mt-0.5">
                        {item.color} • {item.size} • Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#2B2623]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-[#FAF8F5] border-t border-[#EAE3D9] space-y-2">
                <div className="flex justify-between text-[11px] text-[#5C554F]">
                  <span>Subtotal</span>
                  <span>{formatPrice(foundOrder.subtotal || foundOrder.total)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#5C554F]">
                  <span>Shipping</span>
                  <span>{foundOrder.shippingCost === 0 ? 'Free' : formatPrice(foundOrder.shippingCost)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-[#2B2623] pt-2 border-t border-[#EAE3D9]">
                  <span>Total</span>
                  <span>{formatPrice(foundOrder.total)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2B2623] uppercase tracking-widest">
                  <MapPin className="w-4 h-4 text-[#8C6A54]" />
                  <span>Shipping Address</span>
                </div>
                <div className="text-xs text-[#5C554F] leading-relaxed">
                  <p className="font-bold text-[#2B2623]">{foundOrder.customerName}</p>
                  <p>{foundOrder.shippingAddress.address1}</p>
                  {foundOrder.shippingAddress.address2 && <p>{foundOrder.shippingAddress.address2}</p>}
                  <p>{foundOrder.shippingAddress.city}, {foundOrder.shippingAddress.postalCode}</p>
                  <p>{foundOrder.shippingAddress.country}</p>
                </div>
              </div>

              <div className="bg-[#FAF5EE] p-6 rounded-sm border border-[#EAE3D9] shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2B2623] uppercase tracking-widest">
                  <Clock className="w-4 h-4 text-[#8C6A54]" />
                  <span>Update Notification</span>
                </div>
                <p className="text-xs text-[#5C554F] leading-relaxed">
                  Status updates are automatically sent to <strong>{foundOrder.email}</strong>. Please check your spam folder if you haven&rsquo;t received any updates recently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      <Breadcrumbs items={[{ name: 'Track Order', url: '/track-order' }]} />
      
      <div className="mt-8 space-y-8">
        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2623] tracking-tight">
            Track Your Order
          </h1>
          <p className="text-sm sm:text-base text-[#5C554F] mt-3 leading-relaxed">
            To check your order status, please enter your order number (e.g. CCR-123456) and the email address you used during checkout.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#EAE3D9] shadow-sm max-w-xl">
          {hasSearched && !foundOrder && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 text-xs rounded-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Order Not Found</p>
                <p className="mt-1">We couldn&rsquo;t find an order with that reference and email combination. Please double-check your details and try again.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleLookup} className="space-y-5">
            <div>
              <label htmlFor="track-order-id" className="block text-xs font-bold uppercase tracking-widest text-[#2B2623] mb-1.5">
                Order Number
              </label>
              <input
                id="track-order-id"
                type="text"
                placeholder="CCR-XXXXXX"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3 text-sm text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
                required
              />
            </div>

            <div>
              <label htmlFor="track-email" className="block text-xs font-bold uppercase tracking-widest text-[#2B2623] mb-1.5">
                Email Address
              </label>
              <input
                id="track-email"
                type="email"
                placeholder="your@email.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3 text-sm text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="w-full bg-[#2B2623] hover:bg-[#47403C] text-white text-xs font-bold uppercase tracking-widest py-4 rounded-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSearching ? 'Searching...' : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Track Order Status &rarr;</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="bg-[#FAF5EE] p-6 rounded-sm border border-[#EAE3D9] max-w-xl flex gap-4">
          <Truck className="w-6 h-6 text-[#8C6A54] shrink-0" />
          <div className="space-y-1">
            <p className="text-xs font-bold text-[#2B2623] uppercase tracking-wider">Need more help?</p>
            <p className="text-xs text-[#5C554F] leading-relaxed">
              If you have questions about your delivery, please contact our support team at <Link href="/contact" className="text-[#8C6A54] underline">Contact Us</Link> page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8C6A54]"></div>
        </div>
      }>
        <OrderTrackingContent />
      </Suspense>
    </div>
  );
}
