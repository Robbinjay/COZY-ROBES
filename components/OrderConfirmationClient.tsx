'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, User, Package, Loader2, ArrowLeft, Mail, MapPin, Calendar, CreditCard, AlertCircle, MessageCircle } from 'lucide-react';
import { useStore } from '@/lib/store-context';
import { formatPrice, WHATSAPP_PHONE_DISPLAY, WHATSAPP_PHONE_CLEAN } from '@/lib/utils';
import { motion } from 'motion/react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const urlOrderId = searchParams.get('orderId');
  const { lookupOrder } = useStore();

  const orderId = urlOrderId || 'CCR-782194';
  const order = lookupOrder(orderId);

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto py-24 text-center space-y-6">
        <Package className="w-16 h-16 text-[#D9D0C3] mx-auto" />
        <h2 className="text-2xl font-serif font-bold text-[#2B2623]">Order Not Found</h2>
        <p className="text-sm text-[#736B63]">We couldn&rsquo;t locate the order details. Please contact support if you believe this is an error.</p>
        <Link href="/shop" className="inline-block border-b border-[#2B2623] pb-1 text-sm font-bold text-[#2B2623]">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto space-y-12 pb-20"
    >
      {/* Success Header */}
      <div className="text-center space-y-6 pt-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 border border-green-100">
          <CheckCircle2 className="w-10 h-10 text-[#3C6E47]" />
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-[#8C6A54] uppercase tracking-[0.3em]">Thank You for Your Order</p>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2B2623]">Order Confirmed</h1>
          <p className="text-sm text-[#736B63] max-w-sm mx-auto">
            A confirmation email has been sent to <span className="font-bold text-[#2B2623]">{order.email}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Order Details */}
        <div className="md:col-span-7 space-y-6">
          <section className="bg-white border border-[#EAE3D9] rounded-sm shadow-sm overflow-hidden">
            <div className="bg-[#FAF8F5] px-6 py-4 border-b border-[#EAE3D9] flex justify-between items-center">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#2B2623]">Order Items</h3>
              <span className="text-[10px] text-[#A3998F] font-medium">{order.items.length} items</span>
            </div>
            <div className="p-6 divide-y divide-[#FAF8F5]">
              {order.items.map((item: any, idx: number) => (
                <div key={`${item.productId}-${idx}`} className="py-4 first:pt-0 flex gap-4">
                  <div className="relative w-16 h-20 bg-[#FAF8F5] border border-[#EAE3D9] rounded-xs overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-[11px] font-bold text-[#2B2623] truncate mb-0.5">{item.name}</h4>
                        <p className="text-[10px] text-[#A3998F] uppercase tracking-tighter">
                          {item.color} • {item.size}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] font-bold text-[#2B2623]">{formatPrice(item.price)}</p>
                        <p className="text-[10px] text-[#A3998F]">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#FAF8F5] p-6 border-t border-[#EAE3D9] space-y-2">
              <div className="flex justify-between text-xs text-[#736B63]">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#736B63]">
                <span>Shipping</span>
                <span>{order.shippingCost === 0 ? 'FREE' : formatPrice(order.shippingCost)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#2B2623] pt-2 border-t border-[#EAE3D9]/50">
                <span>Total Paid</span>
                <span className="text-lg">{formatPrice(order.total)}</span>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="md:col-span-5 space-y-6">
          <section className="bg-white border border-[#EAE3D9] rounded-sm p-6 shadow-sm space-y-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center shrink-0">
                  <Package className="w-4 h-4 text-[#8C6A54]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#A3998F] uppercase tracking-widest mb-1">Order Number</p>
                  <p className="text-xs font-bold text-[#2B2623]">{order.id}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#8C6A54]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#A3998F] uppercase tracking-widest mb-1">Shipping Address</p>
                  <p className="text-xs text-[#2B2623] leading-relaxed">
                    {order.customerName}<br />
                    {order.shippingAddress.address1}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                    {order.shippingAddress.country}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-[#8C6A54]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#A3998F] uppercase tracking-widest mb-1">Delivery Estimate</p>
                  <p className="text-xs text-[#2B2623]">{order.estimatedDelivery || '3-5 business days'}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#EAE3D9] space-y-4">
              <Link 
                href="/account"
                className="flex items-center justify-center gap-2 w-full bg-[#2B2623] text-white text-[10px] font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-[#47403C] transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>View Full Order History</span>
              </Link>
              <Link 
                href="/shop"
                className="flex items-center justify-center gap-2 w-full border border-[#EAE3D9] text-[#2B2623] text-[10px] font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-[#FAF8F5] transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Shop</span>
              </Link>
            </div>
          </section>
          
          <div className="bg-[#3C6E47]/5 border border-[#3C6E47]/10 rounded-sm p-4 flex items-start gap-3">
            <Mail className="w-4 h-4 text-[#3C6E47] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#3C6E47] leading-relaxed italic">
              Need to change something? Reply to your confirmation email or contact our support team within 24 hours.
            </p>
          </div>

          <div className="bg-[#EBF7EE] border border-[#CDE9D2] rounded-sm p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E7E34]">
              <MessageCircle className="w-4 h-4 fill-[#1E7E34] text-[#1E7E34]" />
              <span>WhatsApp Live Support</span>
            </div>
            <p className="text-[11px] text-[#2B5435] leading-relaxed">
              Need immediate help with payment verification, bank details, or delivery? Chat with our team on WhatsApp: <strong>{WHATSAPP_PHONE_DISPLAY}</strong>.
            </p>
            <a
              id="confirmation-whatsapp-btn"
              href={`https://wa.me/${WHATSAPP_PHONE_CLEAN}?text=${encodeURIComponent(`Hello CozyCorobes! 🛍️ I have an inquiry regarding my order #${order.id} (${order.customerName}). Could you please assist me?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-3 rounded-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp ({WHATSAPP_PHONE_DISPLAY})</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function OrderConfirmationClient() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="text-center py-32"><Loader2 className="w-12 h-12 animate-spin text-[#8C6A54] mx-auto opacity-10" /></div>}>
        <ConfirmationContent />
      </Suspense>
    </div>
  );
}
