'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import { useStore } from '@/lib/store-context';
import { MINIMUM_ORDER_AMOUNT } from '@/lib/store-data';
import { formatPrice } from '@/lib/utils';

export default function CartPageClient() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    freeShippingRemaining,
    isFreeShippingEligible,
    config,
  } = useStore();

  const threshold = config.shipping.freeShippingThreshold;
  const progressPercentage = Math.min(100, Math.round((cartSubtotal / threshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-sm border border-[#EAE3D9] p-12 text-center max-w-lg mx-auto shadow-xs">
        <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center mx-auto mb-4 text-[#8C6A54]">
          <ShoppingBag className="w-8 h-8 stroke-1" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#2B2623] mb-2">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-xs sm:text-sm text-[#736B63] mb-6">
          You haven&rsquo;t added any heated robes or comfort accessories yet.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-[#2B2623] hover:bg-[#47403C] text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-sm transition-colors"
        >
          Explore the Catalog &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      
      {/* Left: Cart Items Table */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Free Shipping Progress */}
        <div className="bg-[#FAF5EE] border border-[#EAE3D9] p-4 rounded-sm">
          {isFreeShippingEligible ? (
            <p className="text-xs font-semibold text-[#3C6E47] flex items-center gap-1.5">
              <Truck className="w-4 h-4" />
              <span>Great news! You have qualified for FREE Standard UK Delivery.</span>
            </p>
          ) : (
            <div>
              <p className="text-xs text-[#5C554F] font-medium mb-1.5">
                Add <strong className="text-[#2B2623]">{formatPrice(freeShippingRemaining)}</strong> more to unlock <span className="text-[#8C6A54] font-semibold">Free Standard UK Delivery</span>.
              </p>
              <div className="w-full bg-[#E2D9CE] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#8C6A54] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Item List */}
        <div className="bg-white rounded-sm border border-[#EAE3D9] overflow-hidden shadow-xs divide-y divide-[#EAE3D9]">
          {cart.map((item) => (
            <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
              
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-24 sm:w-24 sm:h-28 bg-[#F2ECE4] rounded-xs overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <Link
                    href={`/products/${item.productSlug}`}
                    className="font-serif text-sm sm:text-base font-bold text-[#2B2623] hover:text-[#8C6A54]"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-[#736B63] mt-0.5">
                    Color: {item.color} | Size: {item.size}
                  </p>
                  <p className="text-xs font-semibold text-[#2B2623] mt-1">
                    {formatPrice(item.price)} each
                  </p>
                </div>
              </div>

              {/* Quantity and Subtotal */}
              <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F0EBE1]">
                {/* Quantity picker */}
                <div className="flex items-center border border-[#D9D0C3] rounded-sm bg-white">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1.5 text-[#5C554F] hover:bg-[#F2ECE4] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-semibold text-[#2B2623]">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1.5 text-[#5C554F] hover:bg-[#F2ECE4] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="font-serif text-sm sm:text-base font-bold text-[#2B2623] block">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-[#9E948B] hover:text-[#A84A42] flex items-center gap-1 mt-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs pt-2">
          <Link
            href="/shop"
            className="text-[#5C554F] hover:text-[#2B2623] underline underline-offset-4 font-semibold"
          >
            &larr; Continue Shopping
          </Link>
        </div>

      </div>

      {/* Right: Order Summary */}
      <div className="lg:col-span-4 bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-xs space-y-5">
        <h2 className="font-serif text-lg font-bold text-[#2B2623] pb-3 border-b border-[#EAE3D9]">
          Order Summary
        </h2>

        <div className="space-y-2.5 text-xs text-[#5C554F]">
          <div className="flex justify-between">
            <span>Item Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
            <span className="font-semibold text-[#2B2623]">{formatPrice(cartSubtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery</span>
            <span>{isFreeShippingEligible ? 'FREE' : formatPrice(config.shipping.standardShippingRate)}</span>
          </div>

          <div className="flex justify-between text-[#8C8278]">
            <span>VAT</span>
            <span>Included in item price</span>
          </div>
        </div>

        <div className="pt-3 border-t border-[#EAE3D9] flex justify-between items-baseline">
          <span className="font-serif text-base font-bold text-[#2B2623]">Estimated Total</span>
          <span className="font-serif text-2xl font-bold text-[#2B2623]">
            {formatPrice(cartSubtotal + (isFreeShippingEligible ? 0 : config.shipping.standardShippingRate))}
          </span>
        </div>

        {cartSubtotal < MINIMUM_ORDER_AMOUNT && (
          <div className="bg-[#FAF5EE] border border-[#E0D7C9] text-[#5C554F] p-3 rounded-sm text-[11px] text-center space-y-0.5">
            <p className="font-semibold text-[#8C6A54]">Minimum Order: {formatPrice(MINIMUM_ORDER_AMOUNT)} (The Cozy Co. Robe price)</p>
            <p>Add {formatPrice(MINIMUM_ORDER_AMOUNT - cartSubtotal)} more to place your order</p>
          </div>
        )}

        <Link
          href="/checkout"
          className="w-full bg-[#2B2623] hover:bg-[#47403C] text-white py-3.5 px-4 rounded-sm font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <div className="pt-2 text-center text-[11px] text-[#736B63] space-y-1">
          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8C6A54]" />
            <span>Encrypted SSL Secure Checkout</span>
          </div>
          <p>30-Day Cozy Trial & 1-Year Warranty Included</p>
        </div>
      </div>

    </div>
  );
}
