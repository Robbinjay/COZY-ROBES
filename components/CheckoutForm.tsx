'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Lock, CreditCard, Check, Truck, ArrowLeft } from 'lucide-react';
import { useStore } from '@/lib/store-context';
import { formatPrice } from '@/lib/utils';

export default function CheckoutForm() {
  const router = useRouter();
  const { cart, cartSubtotal, isFreeShippingEligible, config, createOrder } = useStore();

  const [formData, setFormData] = useState({
    email: 'sarah.miller@example.co.uk',
    firstName: 'Sarah',
    lastName: 'Miller',
    address: '14 Kensington Church Street',
    apartment: 'Flat 3',
    city: 'London',
    state: 'Greater London',
    postalCode: 'W8 4EP',
    phone: '020 7946 0912',
    shippingMethod: isFreeShippingEligible ? 'free' : 'standard',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '•••',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="bg-white p-8 rounded-sm border border-[#EAE3D9] text-center max-w-md mx-auto shadow-xs">
        <h2 className="font-serif text-xl font-bold text-[#2B2623] mb-2">
          Your Bag is Empty
        </h2>
        <p className="text-xs text-[#736B63] mb-4">
          Please add a heated robe or accessory to your bag before checking out.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-[#2B2623] text-white text-xs font-semibold px-6 py-2.5 rounded-sm"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const shippingCost =
    formData.shippingMethod === 'express'
      ? config.shipping.expressShippingRate
      : isFreeShippingEligible
      ? 0
      : config.shipping.standardShippingRate;

  const estimatedTax = 0; // In UK ecommerce, 20% VAT is included in item prices
  const grandTotal = cartSubtotal + shippingCost + estimatedTax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const order = createOrder({
        email: formData.email,
        customerName: `${formData.firstName} ${formData.lastName}`,
        shippingAddress: {
          address1: formData.address,
          address2: formData.apartment || undefined,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: 'United Kingdom',
        },
        shippingMethod:
          formData.shippingMethod === 'express'
            ? 'Royal Mail Express Tracked 24 (1-2 Days)'
            : isFreeShippingEligible
            ? 'Royal Mail Tracked 48 (Free UK Delivery)'
            : 'Royal Mail Tracked 48 (3-5 Days)',
        items: cart.map((item) => ({
          productId: item.productId,
          name: item.name,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        subtotal: cartSubtotal,
        discount: 0,
        shippingCost,
        tax: estimatedTax,
        total: grandTotal,
      });

      router.push(`/order-confirmation?orderId=${order.id}`);
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      
      {/* Left: Form inputs */}
      <div className="lg:col-span-7 space-y-8">
        
        {/* Contact info */}
        <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-base font-bold text-[#2B2623]">
              1. Contact Information
            </h2>
          </div>
          <div>
            <label htmlFor="checkout-email" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
              Email Address for Order Confirmation *
            </label>
            <input
              id="checkout-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
            />
          </div>
        </div>

        {/* Shipping address */}
        <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-xs space-y-4">
          <h2 className="font-serif text-base font-bold text-[#2B2623]">
            2. Shipping Address
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="checkout-firstname" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
                First Name *
              </label>
              <input
                id="checkout-firstname"
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
              />
            </div>
            <div>
              <label htmlFor="checkout-lastname" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
                Last Name *
              </label>
              <input
                id="checkout-lastname"
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="checkout-address" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
              Street Address *
            </label>
            <input
              id="checkout-address"
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="checkout-city" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
                City *
              </label>
              <input
                id="checkout-city"
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
              />
            </div>
            <div>
              <label htmlFor="checkout-state" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
                County / Region *
              </label>
              <input
                id="checkout-state"
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
              />
            </div>
            <div>
              <label htmlFor="checkout-zip" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
                Postcode *
              </label>
              <input
                id="checkout-zip"
                type="text"
                required
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
              />
            </div>
          </div>
        </div>

        {/* Shipping Method */}
        <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-xs space-y-3">
          <h2 className="font-serif text-base font-bold text-[#2B2623]">
            3. Delivery Method
          </h2>

          <div className="space-y-2">
            <label
              className={`flex items-center justify-between p-3.5 border rounded-sm cursor-pointer transition-colors ${
                formData.shippingMethod !== 'express'
                  ? 'border-[#2B2623] bg-[#FAF5EE]'
                  : 'border-[#D9D0C3] hover:border-[#8C6A54]'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shipping"
                  checked={formData.shippingMethod !== 'express'}
                  onChange={() => setFormData({ ...formData, shippingMethod: isFreeShippingEligible ? 'free' : 'standard' })}
                  className="accent-[#2B2623]"
                />
                <div>
                  <p className="text-xs font-bold text-[#2B2623]">
                    Royal Mail Tracked 48 (2–3 Working Days)
                  </p>
                  <p className="text-[11px] text-[#736B63]">
                    Full tracking with delivery updates via SMS/Email
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#2B2623]">
                {isFreeShippingEligible ? 'FREE' : formatPrice(config.shipping.standardShippingRate)}
              </span>
            </label>

            <label
              className={`flex items-center justify-between p-3.5 border rounded-sm cursor-pointer transition-colors ${
                formData.shippingMethod === 'express'
                  ? 'border-[#2B2623] bg-[#FAF5EE]'
                  : 'border-[#D9D0C3] hover:border-[#8C6A54]'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shipping"
                  checked={formData.shippingMethod === 'express'}
                  onChange={() => setFormData({ ...formData, shippingMethod: 'express' })}
                  className="accent-[#2B2623]"
                />
                <div>
                  <p className="text-xs font-bold text-[#2B2623]">
                    Royal Mail Tracked 24 (Next Working Day)
                  </p>
                  <p className="text-[11px] text-[#736B63]">
                    Priority dispatch & express tracked delivery
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#2B2623]">{formatPrice(config.shipping.expressShippingRate)}</span>
            </label>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-base font-bold text-[#2B2623]">
              4. Payment
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-[#3C6E47]">
              <Lock className="w-3.5 h-3.5" />
              <span>256-Bit Encrypted</span>
            </div>
          </div>

          <div className="p-3 bg-[#FAF8F5] border border-[#EAE3D9] rounded-sm flex items-center justify-between text-xs">
            <span className="font-medium text-[#2B2623]">Credit or Debit Card</span>
            <div className="flex gap-1 text-[10px] font-bold text-[#736B63]">
              <span className="bg-white px-1.5 py-0.5 border border-[#D9D0C3] rounded-xs">VISA</span>
              <span className="bg-white px-1.5 py-0.5 border border-[#D9D0C3] rounded-xs">MC</span>
              <span className="bg-white px-1.5 py-0.5 border border-[#D9D0C3] rounded-xs">AMEX</span>
            </div>
          </div>

          <div>
            <label htmlFor="checkout-card" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
              Card Number *
            </label>
            <div className="relative">
              <input
                id="checkout-card"
                type="text"
                required
                value={formData.cardNumber}
                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 pl-9 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
              />
              <CreditCard className="w-4 h-4 text-[#8C6A54] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="checkout-exp" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
                Expiration (MM/YY) *
              </label>
              <input
                id="checkout-exp"
                type="text"
                required
                value={formData.cardExp}
                onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
              />
            </div>
            <div>
              <label htmlFor="checkout-cvc" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
                Security Code (CVC) *
              </label>
              <input
                id="checkout-cvc"
                type="text"
                required
                value={formData.cardCvc}
                onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Right: Order Summary */}
      <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-sm border border-[#EAE3D9] shadow-xs space-y-5 sticky top-24">
        <h2 className="font-serif text-lg font-bold text-[#2B2623] pb-3 border-b border-[#EAE3D9]">
          Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)})
        </h2>

        {/* Items */}
        <div className="divide-y divide-[#EAE3D9] max-h-60 overflow-y-auto">
          {cart.map((item) => (
            <div key={item.id} className="py-3 flex items-center justify-between gap-3">
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
                  <span className="absolute top-0 right-0 bg-[#2B2623] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {item.quantity}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#2B2623] line-clamp-1">{item.name}</p>
                  <p className="text-[11px] text-[#736B63]">{item.color} • {item.size}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#2B2623]">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Pricing calculations */}
        <div className="space-y-2 text-xs text-[#5C554F] pt-2 border-t border-[#EAE3D9]">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="text-[#2B2623] font-semibold">{formatPrice(cartSubtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
          </div>
          <div className="flex justify-between">
            <span>VAT (20% Included)</span>
            <span className="text-[#736B63]">{formatPrice((cartSubtotal * 0.2) / 1.2)}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-[#EAE3D9] flex justify-between items-baseline">
          <span className="font-serif text-base font-bold text-[#2B2623]">Total</span>
          <span className="font-serif text-2xl font-bold text-[#2B2623]">
            {formatPrice(grandTotal)}
          </span>
        </div>

        <button
          id="checkout-place-order-btn"
          type="submit"
          disabled={isProcessing}
          className="w-full bg-[#2B2623] hover:bg-[#47403C] text-white text-xs font-bold uppercase tracking-wider py-4 rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-xs"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>{isProcessing ? 'Authorizing & Securing Order...' : `Place Order • ${formatPrice(grandTotal)}`}</span>
        </button>

        <div className="pt-2 text-center text-[11px] text-[#736B63] space-y-1">
          <div className="flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8C6A54]" />
            <span>30-Day Cozy Trial & 1-Year Limited Warranty</span>
          </div>
          <p>Orders dispatch in 1–2 working days with Royal Mail tracked delivery</p>
        </div>
      </div>

    </form>
  );
}
