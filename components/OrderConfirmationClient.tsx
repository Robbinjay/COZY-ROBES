'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Truck } from 'lucide-react';
import { useStore } from '@/lib/store-context';
import { formatPrice } from '@/lib/utils';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'CCR-782194';
  const { lookupOrder } = useStore();

  const order = lookupOrder(orderId);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      
      {/* Thank you box */}
      <div className="bg-white p-8 sm:p-10 rounded-sm border border-[#EAE3D9] shadow-xs text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#EBF7EE] text-[#2E7D32] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] block">
          Order Confirmed
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2623]">
          Thank you for your order!
        </h1>

        <p className="text-xs sm:text-sm text-[#5C554F] max-w-md mx-auto">
          Your order number is <strong className="text-[#2B2623] font-mono">{order?.id || orderId}</strong>. We have sent a receipt and tracking confirmation to{' '}
          <strong className="text-[#2B2623]">{order?.email || 'your email address'}</strong>.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`/track-order`}
            className="bg-[#2B2623] hover:bg-[#47403C] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-sm transition-colors flex items-center gap-2"
          >
            <Truck className="w-4 h-4" />
            <span>Track This Shipment</span>
          </Link>

          <Link
            href="/shop"
            className="border border-[#D9D0C3] hover:bg-[#FAF8F5] text-[#2B2623] text-xs font-semibold px-6 py-3 rounded-sm transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Order Details & Summary */}
      {order && (
        <div className="bg-white rounded-sm border border-[#EAE3D9] shadow-xs overflow-hidden">
          <div className="p-6 bg-[#FAF5EE] border-b border-[#EAE3D9] flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#8C6A54]">
                Fulfillment Details
              </p>
              <h2 className="font-serif text-lg font-bold text-[#2B2623]">
                Estimated Delivery: {order.estimatedDelivery}
              </h2>
            </div>
            <span className="bg-[#2B2623] text-white text-xs font-bold uppercase px-2.5 py-1 rounded-xs">
              Status: {order.status}
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#5C554F]">
              <div>
                <p className="font-bold text-[#2B2623] mb-1">Shipping To:</p>
                <p>{order.customerName}</p>
                <p>{order.shippingAddress.address1} {order.shippingAddress.address2 || ''}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
              <div>
                <p className="font-bold text-[#2B2623] mb-1">Shipping Method:</p>
                <p>{order.shippingMethod}</p>
                <p className="text-[11px] text-[#736B63] mt-2">
                  Carrier: <span className="font-semibold text-[#2B2623]">{order.carrier}</span>
                </p>
                <p className="text-[11px] text-[#736B63]">
                  Tracking Number: <span className="font-mono font-bold text-[#2B2623]">{order.trackingNumber}</span>
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="pt-6 border-t border-[#EAE3D9]">
              <h3 className="font-serif text-sm font-bold text-[#2B2623] mb-4">
                Items ({order.items.reduce((a, b) => a + b.quantity, 0)})
              </h3>
              <div className="divide-y divide-[#EAE3D9]">
                {order.items.map((item, idx) => (
                  <div key={`${item.productId}-${idx}`} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-14 bg-[#F2ECE4] rounded-xs overflow-hidden shrink-0">
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
            </div>

            {/* Price breakdown */}
            <div className="pt-4 border-t border-[#EAE3D9] space-y-1.5 text-xs text-[#5C554F]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{order.shippingCost === 0 ? 'FREE' : formatPrice(order.shippingCost)}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT</span>
                <span>{order.tax > 0 ? formatPrice(order.tax) : 'Included in price'}</span>
              </div>
              <div className="flex justify-between font-serif text-base font-bold text-[#2B2623] pt-2 border-t border-[#EAE3D9]">
                <span>Total Paid</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Helpful notices */}
      <div className="bg-[#FAF5EE] p-6 rounded-sm border border-[#EAE3D9] text-xs text-[#5C554F] space-y-2">
        <h3 className="font-serif text-sm font-bold text-[#2B2623]">
          What happens next?
        </h3>
        <p>
          1. <strong>Processing:</strong> Our fulfillment crew carefully inspects the heating elements and bundles your robe.
        </p>
        <p>
          2. <strong>Dispatch:</strong> As soon as the carrier scans your package, real-time tracking begins updating.
        </p>
        <p>
          3. <strong>Arrival & 30-Day Trial:</strong> Unbox your CozyCorobes robe and test the warming comfort risk-free for 30 days.
        </p>
      </div>

    </div>
  );
}

export default function OrderConfirmationClient() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-xs">Loading order confirmation...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
