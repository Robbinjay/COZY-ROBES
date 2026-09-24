'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store-context';
import { formatPrice } from '@/lib/utils';
import StripeProvider from './StripeProvider';
import CheckoutForm from './CheckoutForm';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronRight, 
  MapPin, 
  CreditCard, 
  ShoppingBag, 
  ShieldCheck,
  Info
} from 'lucide-react';

export default function CheckoutManager() {
  const { cart, cartSubtotal, cartCount, isFreeShippingEligible, config, customer } = useStore();
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  
  const [formData, setFormData] = useState({
    email: customer?.email || '',
    firstName: customer?.firstName || '',
    lastName: customer?.lastName || '',
    address1: customer?.shippingAddress?.address1 || '',
    address2: customer?.shippingAddress?.address2 || '',
    city: customer?.shippingAddress?.city || '',
    postalCode: customer?.shippingAddress?.postcode || '',
    country: customer?.shippingAddress?.country || 'United Kingdom',
  });

  const shippingCost = isFreeShippingEligible ? 0 : config.shipping.standardShippingRate;
  const total = cartSubtotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const proceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 bg-white border border-[#EAE3D9] rounded-sm shadow-sm">
        <ShoppingBag className="w-12 h-12 text-[#D9D0C3] mx-auto mb-4" />
        <h2 className="text-xl font-serif font-bold text-[#2B2623] mb-2">Your bag is empty</h2>
        <p className="text-sm text-[#736B63] mb-6">Looks like you haven&rsquo;t added anything to your bag yet.</p>
        <Link 
          href="/shop"
          className="inline-block bg-[#2B2623] text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-sm hover:bg-[#47403C] transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Main Checkout Flow */}
      <div className="lg:col-span-7 space-y-8">
        
        {/* Step Indicators */}
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#A3998F] mb-8">
          <button 
            onClick={() => setStep('shipping')}
            className={step === 'shipping' ? 'text-[#2B2623]' : 'hover:text-[#8C6A54]'}
          >
            1. Shipping
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className={step === 'payment' ? 'text-[#2B2623]' : ''}>
            2. Payment
          </span>
        </div>

        {step === 'shipping' ? (
          <form onSubmit={proceedToPayment} className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
            {/* Contact Information */}
            <section className="bg-white p-6 sm:p-8 rounded-sm border border-[#EAE3D9] shadow-sm">
              <h2 className="text-sm font-serif font-bold text-[#2B2623] mb-6 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center text-[10px]">1</div>
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-[#2B2623] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3 text-sm focus:outline-none focus:border-[#8C6A54]"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section className="bg-white p-6 sm:p-8 rounded-sm border border-[#EAE3D9] shadow-sm">
              <h2 className="text-sm font-serif font-bold text-[#2B2623] mb-6 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center text-[10px]">2</div>
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-[10px] font-bold uppercase tracking-widest text-[#2B2623] mb-1.5">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3 text-sm focus:outline-none focus:border-[#8C6A54]"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-[10px] font-bold uppercase tracking-widest text-[#2B2623] mb-1.5">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3 text-sm focus:outline-none focus:border-[#8C6A54]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="address1" className="block text-[10px] font-bold uppercase tracking-widest text-[#2B2623] mb-1.5">Address</label>
                  <input
                    type="text"
                    id="address1"
                    name="address1"
                    required
                    value={formData.address1}
                    onChange={handleInputChange}
                    className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3 text-sm focus:outline-none focus:border-[#8C6A54]"
                    placeholder="House number and street name"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="address2" className="block text-[10px] font-bold uppercase tracking-widest text-[#2B2623] mb-1.5">Apartment, suite, etc. (optional)</label>
                  <input
                    type="text"
                    id="address2"
                    name="address2"
                    value={formData.address2}
                    onChange={handleInputChange}
                    className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3 text-sm focus:outline-none focus:border-[#8C6A54]"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-[10px] font-bold uppercase tracking-widest text-[#2B2623] mb-1.5">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3 text-sm focus:outline-none focus:border-[#8C6A54]"
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-[10px] font-bold uppercase tracking-widest text-[#2B2623] mb-1.5">Postcode</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3 text-sm focus:outline-none focus:border-[#8C6A54]"
                  />
                </div>
              </div>
            </section>

            <button
              type="submit"
              className="w-full bg-[#2B2623] hover:bg-[#47403C] text-white text-xs font-bold uppercase tracking-widest py-4 rounded-sm transition-colors flex items-center justify-center gap-2"
            >
              Continue to Payment &rarr;
            </button>
          </form>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Summary of Shipping */}
            <section className="bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-sm divide-y divide-[#FAF8F5]">
              <div className="pb-4 flex justify-between items-start">
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#A3998F] mb-1">Contact</h3>
                  <p className="text-xs text-[#2B2623]">{formData.email}</p>
                </div>
                <button 
                  onClick={() => setStep('shipping')}
                  className="text-[10px] font-bold text-[#8C6A54] underline uppercase tracking-widest"
                >
                  Change
                </button>
              </div>
              <div className="py-4 flex justify-between items-start">
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#A3998F] mb-1">Ship to</h3>
                  <p className="text-xs text-[#2B2623]">
                    {formData.address1}, {formData.city}, {formData.postalCode}, {formData.country}
                  </p>
                </div>
                <button 
                  onClick={() => setStep('shipping')}
                  className="text-[10px] font-bold text-[#8C6A54] underline uppercase tracking-widest"
                >
                  Change
                </button>
              </div>
              <div className="pt-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#A3998F] mb-1">Method</h3>
                <p className="text-xs text-[#2B2623]">
                  {isFreeShippingEligible ? 'Free UK Shipping' : 'Standard Shipping (£6.99)'}
                </p>
              </div>
            </section>

            {/* Payment Section */}
            <section className="bg-white p-6 sm:p-8 rounded-sm border border-[#EAE3D9] shadow-sm">
              <h2 className="text-sm font-serif font-bold text-[#2B2623] mb-6 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center text-[10px]">3</div>
                Payment
              </h2>
              
              <StripeProvider>
                <CheckoutForm 
                  amount={total} 
                  customerInfo={{
                    email: formData.email,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    shippingAddress: {
                      address1: formData.address1,
                      address2: formData.address2,
                      city: formData.city,
                      state: '', // Could add county
                      postalCode: formData.postalCode,
                      country: formData.country
                    }
                  }} 
                />
              </StripeProvider>
            </section>

            <button
              type="button"
              onClick={() => setStep('shipping')}
              className="w-full text-center text-[10px] font-bold uppercase tracking-widest text-[#8C6A54] hover:text-[#2B2623]"
            >
              &larr; Return to Shipping
            </button>
          </div>
        )}
      </div>

      {/* Sidebar Order Summary */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
        <div className="bg-[#FAF8F5] p-6 rounded-sm border border-[#EAE3D9]">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#2B2623] mb-6 border-b border-[#EAE3D9] pb-4">
            Order Summary ({cartCount})
          </h2>
          
          <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-16 h-16 bg-white border border-[#EAE3D9] rounded-sm overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#8C6A54] text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                    {item.quantity}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-bold text-[#2B2623] leading-tight mb-1">{item.name}</h3>
                  <p className="text-[10px] text-[#736B63]">
                    {item.color} • {item.size}
                  </p>
                </div>
                <div className="text-xs font-bold text-[#2B2623]">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-[#EAE3D9]">
            <div className="flex justify-between text-xs text-[#5C554F]">
              <span>Subtotal</span>
              <span className="font-medium">{formatPrice(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between text-xs text-[#5C554F]">
              <span>Shipping</span>
              <span className="font-medium">{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#2B2623] pt-3 border-t border-[#EAE3D9]">
              <span>Total</span>
              <span className="text-lg">{formatPrice(total)}</span>
            </div>
          </div>

          {!isFreeShippingEligible && (
            <div className="mt-4 p-3 bg-white border border-[#EAE3D9] rounded-sm flex items-start gap-3">
              <Info className="w-4 h-4 text-[#8C6A54] shrink-0 mt-0.5" />
              <p className="text-[10px] text-[#736B63] leading-relaxed">
                Add <strong>{formatPrice(config.shipping.freeShippingThreshold - cartSubtotal)}</strong> more to your bag to qualify for <strong>Free Shipping</strong>.
              </p>
            </div>
          )}
        </div>

        <div className="px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-[#3C6E47] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure & Private Checkout</span>
          </div>
          <p className="text-[10px] text-[#A3998F] leading-relaxed">
            By placing your order, you agree to CozyCorobes&rsquo; <Link href="/terms-and-conditions" className="underline">Terms of Service</Link> and <Link href="/privacy-policy" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
