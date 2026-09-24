'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, Search, ArrowRight, AlertCircle } from 'lucide-react';

export default function OrderLookupForm() {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!orderNumber.trim()) {
      setError('Please enter your order number.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    
    // Redirect to the track-order page with query params
    // The track-order page will handle the lookup logic
    const params = new URLSearchParams();
    params.set('orderId', orderNumber.trim().toUpperCase());
    params.set('email', email.trim().toLowerCase());
    
    router.push(`/track-order?${params.toString()}`);
  };

  return (
    <div className="bg-[#FAF5EE] p-6 rounded-sm border border-[#EAE3D9] space-y-4 shadow-xs">
      <div className="flex items-center gap-2 text-xs font-bold text-[#2B2623] uppercase tracking-wider">
        <Package className="w-4 h-4 text-[#8C6A54]" />
        <span>Track My Order Lookup</span>
      </div>
      
      <p className="text-xs text-[#5C554F] leading-relaxed">
        Quickly check your delivery status without logging in. Enter your details below.
      </p>

      {error && (
        <div className="p-2.5 bg-red-50 border border-red-100 text-red-700 text-[11px] rounded-xs flex items-center gap-2 animate-in fade-in duration-200">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="lookup-order-id" className="block text-[10px] font-bold uppercase tracking-widest text-[#736B63] mb-1">
            Order Number
          </label>
          <input
            id="lookup-order-id"
            type="text"
            placeholder="e.g. CCR-892143"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="w-full bg-white border border-[#D9D0C3] rounded-sm p-2 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
          />
        </div>

        <div>
          <label htmlFor="lookup-email" className="block text-[10px] font-bold uppercase tracking-widest text-[#736B63] mb-1">
            Email Address
          </label>
          <input
            id="lookup-email"
            type="email"
            placeholder="The email used at checkout"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white border border-[#D9D0C3] rounded-sm p-2 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
          />
        </div>

        <button
          id="order-lookup-submit-btn"
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#8C6A54] hover:bg-[#735542] text-white text-[11px] font-bold uppercase tracking-wider py-2.5 rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
        >
          {isSubmitting ? (
            <span>Locating Order...</span>
          ) : (
            <>
              <Search className="w-3.5 h-3.5" />
              <span>Track Order &rarr;</span>
            </>
          )}
        </button>
      </form>

      <div className="pt-2 border-t border-[#EAE3D9]/50">
        <p className="text-[10px] text-[#877D75] text-center">
          Or <Link href="/account" className="text-[#8C6A54] hover:underline font-bold">Log in</Link> for full order history.
        </p>
      </div>
    </div>
  );
}
