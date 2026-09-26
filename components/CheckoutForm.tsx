'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/lib/store-context';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/lib/utils';
import { 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  Loader2,
  ChevronRight,
  Info,
  AlertCircle
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutForm() {
  const { cart, cartSubtotal, isFreeShippingEligible, config, customer } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postcode: '',
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (customer) {
      setFormData({
        email: customer.email || '',
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        address: customer.shippingAddress?.address1 || '',
        city: customer.shippingAddress?.city || '',
        postcode: customer.shippingAddress?.postcode || '',
      });
    }
  }, [customer]);

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

  if (!isMounted) return null;

  if (cart.length === 0) {
    return (
      <div className="text-center py-24 bg-white border border-[#EAE3D9] rounded-sm shadow-sm">
        <ShoppingBag className="w-16 h-16 text-[#D9D0C3] mx-auto mb-6" />
        <h2 className="text-xl font-serif font-bold text-[#2B2623] mb-3">Your bag is empty</h2>
        <p className="text-sm text-[#736B63] mb-8 max-w-xs mx-auto">Looks like you haven&rsquo;t added any cozy items to your bag yet.</p>
        <Link 
          href="/shop"
          className="inline-block bg-[#2B2623] text-white text-xs font-bold uppercase tracking-widest px-10 py-4 rounded-sm hover:bg-[#47403C] transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Left Column: Forms */}
      <div className="lg:col-span-7 space-y-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Shipping */}
          <div className="bg-white p-6 sm:p-10 rounded-sm border border-[#EAE3D9] shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center text-[11px] font-bold text-[#2B2623]">1</div>
              <h2 className="text-base font-serif font-bold text-[#2B2623] tracking-tight">Shipping Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-[#A3998F] mb-2">Email Address</label>
                <input 
                  id="email"
                  type="email" 
                  required 
                  autoComplete="email"
                  className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3.5 text-sm focus:outline-none focus:border-[#8C6A54] focus:ring-1 focus:ring-[#8C6A54]/10 transition-all"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="firstName" className="block text-[10px] font-bold uppercase tracking-widest text-[#A3998F] mb-2">First Name</label>
                <input 
                  id="firstName"
                  type="text" 
                  required 
                  autoComplete="given-name"
                  className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3.5 text-sm focus:outline-none focus:border-[#8C6A54] focus:ring-1 focus:ring-[#8C6A54]/10 transition-all"
                  value={formData.firstName}
                  onChange={e => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-[10px] font-bold uppercase tracking-widest text-[#A3998F] mb-2">Last Name</label>
                <input 
                  id="lastName"
                  type="text" 
                  required 
                  autoComplete="family-name"
                  className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3.5 text-sm focus:outline-none focus:border-[#8C6A54] focus:ring-1 focus:ring-[#8C6A54]/10 transition-all"
                  value={formData.lastName}
                  onChange={e => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-[10px] font-bold uppercase tracking-widest text-[#A3998F] mb-2">Delivery Address</label>
                <input 
                  id="address"
                  type="text" 
                  required 
                  autoComplete="shipping address-line1"
                  className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3.5 text-sm focus:outline-none focus:border-[#8C6A54] focus:ring-1 focus:ring-[#8C6A54]/10 transition-all"
                  placeholder="House number and street name"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="city" className="block text-[10px] font-bold uppercase tracking-widest text-[#A3998F] mb-2">City</label>
                <input 
                  id="city"
                  type="text" 
                  required 
                  autoComplete="shipping address-level2"
                  className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3.5 text-sm focus:outline-none focus:border-[#8C6A54] focus:ring-1 focus:ring-[#8C6A54]/10 transition-all"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="postcode" className="block text-[10px] font-bold uppercase tracking-widest text-[#A3998F] mb-2">Postcode</label>
                <input 
                  id="postcode"
                  type="text" 
                  required 
                  autoComplete="shipping postal-code"
                  className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3.5 text-sm focus:outline-none focus:border-[#8C6A54] focus:ring-1 focus:ring-[#8C6A54]/10 transition-all"
                  placeholder="e.g. SW1A 1AA"
                  value={formData.postcode}
                  onChange={e => setFormData({...formData, postcode: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment */}
          <div className="bg-white p-6 sm:p-10 rounded-sm border border-[#EAE3D9] shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center text-[11px] font-bold text-[#2B2623]">2</div>
              <h2 className="text-base font-serif font-bold text-[#2B2623] tracking-tight">Payment Method</h2>
            </div>
            
            <div className="mb-8 p-4 bg-[#FAF8F5] border border-[#EAE3D9] rounded-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-[#8C6A54]" />
                <div>
                  <p className="text-[11px] font-bold text-[#2B2623] uppercase tracking-wider">Secure Credit Card</p>
                  <p className="text-[10px] text-[#736B63]">Processed by Bachs Payments</p>
                </div>
              </div>
              <div className="flex gap-1.5 grayscale opacity-60">
                {/* Visual indicators for card types */}
                <div className="w-8 h-5 bg-white border border-[#D9D0C3] rounded-xs"></div>
                <div className="w-8 h-5 bg-white border border-[#D9D0C3] rounded-xs"></div>
                <div className="w-8 h-5 bg-white border border-[#D9D0C3] rounded-xs"></div>
              </div>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-700 text-xs rounded-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">Payment Error</p>
                  <p className="opacity-90">{error}</p>
                </div>
              </div>
            )}



            <p className="text-[11px] text-[#736B63] mb-8 leading-relaxed italic text-center">
              &ldquo;You will be securely redirected to Bachs to complete your payment. We never store or see your credit card details.&rdquo;
            </p>
            
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2B2623] text-white text-xs font-bold uppercase tracking-widest py-5 rounded-sm hover:bg-[#47403C] transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Securely Pay {formatPrice(total)} Now</span>
                </>
              )}
            </button>
            
            <div className="mt-6 flex items-center justify-center gap-4 text-[9px] font-bold text-[#A3998F] uppercase tracking-widest">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3C6E47]" />
                <span>SSL Encrypted</span>
              </div>
              <div className="w-1 h-1 bg-[#D9D0C3] rounded-full"></div>
              <span>PCI Compliant</span>
            </div>
          </div>
        </form>
      </div>

      {/* Right Column: Order Summary */}
      <div className="lg:col-span-5 lg:sticky lg:top-8">
        <div className="bg-white rounded-sm border border-[#EAE3D9] shadow-sm overflow-hidden">
          <div className="bg-[#FAF8F5] px-6 py-4 border-b border-[#EAE3D9]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#2B2623]">Order Summary</h3>
          </div>
          
          <div className="p-6">
            <div className="max-h-[360px] overflow-y-auto pr-2 custom-scrollbar divide-y divide-[#FAF8F5]">
              {cart.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 flex gap-4">
                  <div className="relative w-16 h-20 bg-[#FAF8F5] border border-[#EAE3D9] rounded-xs overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#8C6A54] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11px] font-bold text-[#2B2623] truncate mb-0.5">{item.name}</h4>
                    <p className="text-[10px] text-[#A3998F] uppercase tracking-tighter mb-1">
                      {item.color} • {item.size}
                    </p>
                    <p className="text-[11px] font-bold text-[#2B2623]">{formatPrice(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-[#EAE3D9] space-y-3">
              <div className="flex justify-between text-xs text-[#736B63]">
                <span>Subtotal</span>
                <span className="font-medium text-[#2B2623]">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#736B63]">
                <div className="flex items-center gap-1.5">
                  <span>Shipping</span>
                  {isFreeShippingEligible && <span className="text-[9px] font-bold text-[#3C6E47] bg-green-50 px-1.5 py-0.5 rounded-full uppercase tracking-tighter">Eligible</span>}
                </div>
                <span className="font-medium text-[#2B2623]">{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
              </div>
              
              <div className="pt-4 border-t border-[#EAE3D9] flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-bold text-[#A3998F] uppercase tracking-widest mb-1">Grand Total</p>
                  <p className="text-2xl font-serif font-bold text-[#2B2623]">{formatPrice(total)}</p>
                </div>
                <div className="text-right pb-1">
                  <p className="text-[9px] text-[#A3998F] uppercase tracking-tighter">Including VAT</p>
                </div>
              </div>
            </div>
            
            {!isFreeShippingEligible && (
              <div className="mt-6 p-4 bg-[#FAF8F5] border border-[#EAE3D9] rounded-sm">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-[#8C6A54] shrink-0 mt-0.5" />
                  <p className="text-[10px] text-[#736B63] leading-relaxed">
                    Add <strong>{formatPrice(config.shipping.freeShippingThreshold - cartSubtotal)}</strong> more to your bag to qualify for <strong>Free UK Shipping</strong>.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 px-6 text-center space-y-4">
          <p className="text-[10px] text-[#A3998F] leading-relaxed">
            By completing your purchase you agree to our <Link href="/terms-and-conditions" className="underline hover:text-[#2B2623]">Terms of Service</Link> and <Link href="/privacy-policy" className="underline hover:text-[#2B2623]">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
