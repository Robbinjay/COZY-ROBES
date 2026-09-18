'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Lock, CreditCard, Wallet, Landmark, Bitcoin, Info } from 'lucide-react';
import { useStore } from '@/lib/store-context';
import { PRODUCTS } from '@/lib/store-data';
import { formatPrice } from '@/lib/utils';

export default function CheckoutForm() {
  const router = useRouter();
  const { cart, cartSubtotal, clearCart } = useStore();

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United Kingdom',
    phone: '',
    cardNumber: '',
    cardExp: '',
    cardCvc: '',
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'international'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'bank_transfer' | 'crypto' | 'revolut'>('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Minimum Order Logic: strictly equal to the price of The Cozy Co. Robe (£89.00)
  const cozyCoRobeProduct = PRODUCTS.find((p) => p.slug === 'cozy-co-robes');
  const minimumOrderLimit = cozyCoRobeProduct ? cozyCoRobeProduct.price : 89.00;
  const isBelowMinimum = cartSubtotal < minimumOrderLimit;

  // Free shipping over £150
  const freeShippingThreshold = 150;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;

  let shippingCost = 0;
  if (shippingMethod === 'standard') {
    shippingCost = isFreeShipping ? 0 : 3.99;
  } else if (shippingMethod === 'express') {
    shippingCost = 6.99;
  } else if (shippingMethod === 'international') {
    shippingCost = 15.00;
  }

  const estimatedTax = 0; // Included in prices
  const grandTotal = cartSubtotal + shippingCost + estimatedTax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isBelowMinimum || cart.length === 0) return;

    setIsProcessing(true);

    try {
      const activeShipping = {
        id: shippingMethod,
        label: shippingMethod === 'standard' ? (isFreeShipping ? 'Free Standard Shipping' : 'Standard Shipping') : shippingMethod === 'express' ? 'Express Shipping' : 'International Shipping',
        cost: shippingCost
      };

      const paymentLabels = {
        'credit_card': 'Credit Card',
        'bank_transfer': 'Bank Transfer',
        'crypto': 'Crypto Currency',
        'revolut': 'Revolut App'
      };

      const activePayment = {
        id: paymentMethod,
        label: paymentLabels[paymentMethod]
      };

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerInfo: {
            ...formData,
            postcode: formData.postalCode // Map for API
          },
          shippingMethod: activeShipping,
          paymentMethod: activePayment,
          cart,
          cartSubtotal,
          shippingCost,
          orderTotal: grandTotal
        }),
      });

      if (response.ok) {
        clearCart();
        // eslint-disable-next-line react-hooks/purity
        const generatedOrderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
        router.push('/order-confirmation?orderId=' + generatedOrderId);
      } else {
        alert('Something went wrong processing your order. Please try again.');
        setIsProcessing(false);
      }
    } catch (error) {
      alert('Network error. Please try again.');
      setIsProcessing(false);
    }
  };

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">Email Address *</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">First Name *</label>
              <input type="text" required value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">Last Name *</label>
              <input type="text" required value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">Phone Number *</label>
              <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]" />
            </div>
          </div>
        </div>

        {/* Shipping address */}
        <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-xs space-y-4">
          <h2 className="font-serif text-base font-bold text-[#2B2623]">2. Shipping Address</h2>
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">Street Address *</label>
            <input type="text" required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">City *</label>
              <input type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]" />
            </div>
            <div className="lg:col-span-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">Region *</label>
              <input type="text" required value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]" />
            </div>
            <div className="lg:col-span-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">Postcode *</label>
              <input type="text" required value={formData.postalCode} onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })} className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">Country *</label>
            <select value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]">
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
              <option value="Europe">Europe</option>
              <option value="Rest of World">Rest of World</option>
            </select>
          </div>
        </div>

        {/* Shipping Method */}
        <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-xs space-y-3">
          <h2 className="font-serif text-base font-bold text-[#2B2623]">3. Delivery Method</h2>

          <div className="space-y-2">
            <label className={`flex items-center justify-between p-3.5 border rounded-sm cursor-pointer transition-colors \${shippingMethod === 'standard' ? 'border-[#2B2623] bg-[#FAF5EE]' : 'border-[#D9D0C3] hover:border-[#8C6A54]'}`}>
              <div className="flex items-center gap-3">
                <input type="radio" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} className="accent-[#2B2623]" />
                <div>
                  <p className="text-xs font-bold text-[#2B2623]">Standard Delivery (2–4 Working Days)</p>
                  <p className="text-[11px] text-[#736B63]">{isFreeShipping ? 'Free on orders over £150' : 'Standard flat rate'}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#2B2623]">{isFreeShipping ? 'FREE' : '£3.99'}</span>
            </label>

            <label className={`flex items-center justify-between p-3.5 border rounded-sm cursor-pointer transition-colors \${shippingMethod === 'express' ? 'border-[#2B2623] bg-[#FAF5EE]' : 'border-[#D9D0C3] hover:border-[#8C6A54]'}`}>
              <div className="flex items-center gap-3">
                <input type="radio" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} className="accent-[#2B2623]" />
                <div>
                  <p className="text-xs font-bold text-[#2B2623]">Express Delivery (1–2 Working Days)</p>
                  <p className="text-[11px] text-[#736B63]">Priority dispatch & tracking</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#2B2623]">£6.99</span>
            </label>

            <label className={`flex items-center justify-between p-3.5 border rounded-sm cursor-pointer transition-colors \${shippingMethod === 'international' ? 'border-[#2B2623] bg-[#FAF5EE]' : 'border-[#D9D0C3] hover:border-[#8C6A54]'}`}>
              <div className="flex items-center gap-3">
                <input type="radio" checked={shippingMethod === 'international'} onChange={() => setShippingMethod('international')} className="accent-[#2B2623]" />
                <div>
                  <p className="text-xs font-bold text-[#2B2623]">International Shipping (5-10 Working Days)</p>
                  <p className="text-[11px] text-[#736B63]">Global delivery</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#2B2623]">£15.00</span>
            </label>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#EAE3D9] pb-3 mb-2">
            <h2 className="font-serif text-base font-bold text-[#2B2623]">4. Payment</h2>
            <div className="flex items-center gap-1.5 text-xs text-[#3C6E47]">
              <Lock className="w-3.5 h-3.5" />
              <span>Secure</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className={`flex items-center gap-3 p-3.5 border rounded-sm cursor-pointer transition-colors \${paymentMethod === 'credit_card' ? 'border-[#2B2623] bg-[#FAF5EE]' : 'border-[#D9D0C3] hover:border-[#8C6A54]'}`}>
              <input type="radio" checked={paymentMethod === 'credit_card'} onChange={() => setPaymentMethod('credit_card')} className="accent-[#2B2623]" />
              <CreditCard className="w-4 h-4 text-[#8C6A54]" />
              <span className="text-xs font-bold text-[#2B2623]">Credit or Debit Card</span>
            </label>

            <label className={`flex items-center gap-3 p-3.5 border rounded-sm cursor-pointer transition-colors \${paymentMethod === 'bank_transfer' ? 'border-[#2B2623] bg-[#FAF5EE]' : 'border-[#D9D0C3] hover:border-[#8C6A54]'}`}>
              <input type="radio" checked={paymentMethod === 'bank_transfer'} onChange={() => setPaymentMethod('bank_transfer')} className="accent-[#2B2623]" />
              <Landmark className="w-4 h-4 text-[#8C6A54]" />
              <span className="text-xs font-bold text-[#2B2623]">Bank Transfer</span>
            </label>

            <label className={`flex items-center gap-3 p-3.5 border rounded-sm cursor-pointer transition-colors \${paymentMethod === 'crypto' ? 'border-[#2B2623] bg-[#FAF5EE]' : 'border-[#D9D0C3] hover:border-[#8C6A54]'}`}>
              <input type="radio" checked={paymentMethod === 'crypto'} onChange={() => setPaymentMethod('crypto')} className="accent-[#2B2623]" />
              <Bitcoin className="w-4 h-4 text-[#8C6A54]" />
              <span className="text-xs font-bold text-[#2B2623]">Crypto Currency</span>
            </label>

            <label className={`flex items-center gap-3 p-3.5 border rounded-sm cursor-pointer transition-colors \${paymentMethod === 'revolut' ? 'border-[#2B2623] bg-[#FAF5EE]' : 'border-[#D9D0C3] hover:border-[#8C6A54]'}`}>
              <input type="radio" checked={paymentMethod === 'revolut'} onChange={() => setPaymentMethod('revolut')} className="accent-[#2B2623]" />
              <Wallet className="w-4 h-4 text-[#8C6A54]" />
              <span className="text-xs font-bold text-[#2B2623]">Revolut App</span>
            </label>
          </div>

          {paymentMethod === 'credit_card' && (
            <div className="pt-4 border-t border-[#EAE3D9] space-y-4 animate-fadeIn">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">Card Number *</label>
                <div className="relative">
                  <input type="text" required={paymentMethod === 'credit_card'} value={formData.cardNumber} onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })} className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 pl-9 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]" />
                  <CreditCard className="w-4 h-4 text-[#8C6A54] absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">Expiration (MM/YY) *</label>
                  <input type="text" required={paymentMethod === 'credit_card'} value={formData.cardExp} onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })} className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">Security Code (CVC) *</label>
                  <input type="text" required={paymentMethod === 'credit_card'} value={formData.cardCvc} onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })} className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]" />
                </div>
              </div>
            </div>
          )}

          {paymentMethod !== 'credit_card' && (
             <div className="p-4 bg-[#FAF8F5] border border-[#EAE3D9] rounded-sm flex items-start gap-3 mt-4 animate-fadeIn text-[#5C554F] text-xs">
               <Info className="w-4 h-4 text-[#8C6A54] shrink-0 mt-0.5" />
               <p>
                 You will receive an email immediately after placing your order containing instructions on how to complete your payment via {paymentMethod === 'bank_transfer' ? 'Bank Transfer' : paymentMethod === 'crypto' ? 'Crypto' : 'Revolut'}.
               </p>
             </div>
          )}
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
                  <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" referrerPolicy="no-referrer" />
                  <span className="absolute top-0 right-0 bg-[#2B2623] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{item.quantity}</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#2B2623] line-clamp-1">{item.name}</p>
                  <p className="text-[11px] text-[#736B63]">{item.color} • {item.size}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#2B2623]">{formatPrice(item.price * item.quantity)}</span>
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

        {isBelowMinimum && (
          <div className="bg-[#FAF5EE] border border-[#E0D7C9] text-[#2B2623] p-4 rounded-sm text-xs space-y-1.5 text-center shadow-xs">
            <p className="font-bold text-[#8C6A54] uppercase tracking-wider text-[11px]">
              Minimum Order Requirement
            </p>
            <p className="text-[#5C554F]">
              Minimum order is <strong>{formatPrice(minimumOrderLimit)}</strong> (the price of The Cozy Co. Robe).
            </p>
            <p className="text-[#736B63]">
              Your subtotal is <strong>{formatPrice(cartSubtotal)}</strong>. Please add <strong>{formatPrice(minimumOrderLimit - cartSubtotal)}</strong> to proceed.
            </p>
            <div className="pt-1">
              <Link
                href="/shop"
                className="inline-block text-xs font-semibold text-[#8C6A54] hover:text-[#2B2623] underline underline-offset-4"
              >
                Browse Shop to Add Items &rarr;
              </Link>
            </div>
          </div>
        )}

        <button
          id="checkout-place-order-btn"
          type="submit"
          disabled={isProcessing || isBelowMinimum}
          style={{
            backgroundColor: isProcessing || isBelowMinimum ? '#EAE3D9' : '#2B2623',
            color: isProcessing || isBelowMinimum ? '#5C554F' : '#FFFFFF',
          }}
          className={`w-full appearance-none text-xs font-bold uppercase tracking-wider py-4 px-6 rounded-sm transition-all duration-200 flex items-center justify-center gap-2.5 shadow-sm select-none ${
            isProcessing || isBelowMinimum
              ? 'cursor-not-allowed border border-[#D9D0C3]'
              : 'hover:!bg-[#47403C] hover:shadow-md active:scale-[0.99] cursor-pointer border border-[#2B2623]'
          }`}
        >
          <Lock className="w-3.5 h-3.5 shrink-0" />
          <span className="font-bold">
            {isProcessing
              ? 'Processing Order...'
              : isBelowMinimum
              ? `Minimum Order ${formatPrice(minimumOrderLimit)} Required`
              : `Place Order • ${formatPrice(grandTotal)}`}
          </span>
        </button>

        <div className="pt-2 text-center text-[11px] text-[#736B63] space-y-1">
          <div className="flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8C6A54]" />
            <span>30-Day Cozy Trial & 1-Year Limited Warranty</span>
          </div>
        </div>
      </div>
    </form>
  );
}
