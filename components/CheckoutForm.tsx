'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store-context';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, MapPin, CreditCard, Lock, ShieldCheck, Loader2 } from 'lucide-react';

export default function CheckoutForm() {
  const { cart, cartSubtotal, isFreeShippingEligible, config } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postcode: '',
  });

  const shippingCost = isFreeShippingEligible ? 0 : config.shipping.standardShippingRate;
  const total = cartSubtotal + shippingCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/checkout/bachs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          items: cart,
          customerEmail: formData.email,
          customerName: `${formData.firstName} ${formData.lastName}`,
          shippingAddress: {
            address1: formData.address,
            city: formData.city,
            postalCode: formData.postcode,
            country: 'United Kingdom',
          }
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to initialize checkout');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 bg-white border border-[#EAE3D9] rounded-sm">
        <ShoppingBag className="w-12 h-12 text-[#D9D0C3] mx-auto mb-4" />
        <p className="text-sm text-[#736B63]">Your bag is empty.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-sm">
          <h2 className="text-sm font-serif font-bold text-[#2B2623] mb-6 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#8C6A54]" />
            Shipping Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#736B63] mb-1">Email</label>
              <input 
                type="email" 
                required 
                className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3 text-sm focus:outline-none focus:border-[#8C6A54]"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#736B63] mb-1">First Name</label>
              <input 
                type="text" 
                required 
                className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3 text-sm focus:outline-none focus:border-[#8C6A54]"
                value={formData.firstName}
                onChange={e => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#736B63] mb-1">Last Name</label>
              <input 
                type="text" 
                required 
                className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3 text-sm focus:outline-none focus:border-[#8C6A54]"
                value={formData.lastName}
                onChange={e => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#736B63] mb-1">Address</label>
              <input 
                type="text" 
                required 
                className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3 text-sm focus:outline-none focus:border-[#8C6A54]"
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#736B63] mb-1">City</label>
              <input 
                type="text" 
                required 
                className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3 text-sm focus:outline-none focus:border-[#8C6A54]"
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#736B63] mb-1">Postcode</label>
              <input 
                type="text" 
                required 
                className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3 text-sm focus:outline-none focus:border-[#8C6A54]"
                value={formData.postcode}
                onChange={e => setFormData({...formData, postcode: e.target.value})}
              />
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-sm">
          <h2 className="text-sm font-serif font-bold text-[#2B2623] mb-6 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#8C6A54]" />
            Secure Payment via Bachs
          </h2>
          
          {error && (
            <div className="p-3 mb-4 bg-red-50 border border-red-100 text-red-700 text-xs rounded-sm">
              {error}
            </div>
          )}

          <p className="text-xs text-[#736B63] mb-6 leading-relaxed">
            You will be redirected to Bachs&rsquo; secure payment page to complete your purchase. We never store your card details.
          </p>
          
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#2B2623] text-white text-xs font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-[#47403C] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>Pay {formatPrice(total)} Now</span>
              </>
            )}
          </button>
        </section>
      </form>

      <div className="space-y-6">
        <div className="bg-[#FAF8F5] p-6 rounded-sm border border-[#EAE3D9]">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#2B2623] mb-4">Order Summary</h3>
          <div className="space-y-3 pt-4 border-t border-[#EAE3D9]">
            <div className="flex justify-between text-xs text-[#5C554F]">
              <span>Subtotal</span>
              <span>{formatPrice(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between text-xs text-[#5C554F]">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#2B2623] pt-3 border-t border-[#EAE3D9]">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-[#3C6E47] uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Secure Bachs Checkout</span>
        </div>
      </div>
    </div>
  );
}
