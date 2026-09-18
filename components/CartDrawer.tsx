'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '@/lib/store-context';
import { formatPrice } from '@/lib/utils';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    freeShippingRemaining,
    isFreeShippingEligible,
    config,
  } = useStore();

  if (!isCartOpen) return null;

  const threshold = config.shipping.freeShippingThreshold;
  const progressPercentage = Math.min(100, Math.round((cartSubtotal / threshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="cart-heading">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between border-l border-[#EAE3D9]">
          
          {/* Header */}
          <div className="p-6 border-b border-[#EAE3D9] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#2B2623]" />
              <h2 id="cart-heading" className="font-serif text-xl font-bold text-[#2B2623]">
                Your Bag
              </h2>
              <span className="text-xs bg-[#EAE3D9] text-[#5C554F] px-2 py-0.5 rounded-full font-medium">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="p-1.5 text-[#5C554F] hover:text-[#2B2623] hover:bg-[#EAE3D9]/60 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#F3EDE5] px-6 py-3 border-b border-[#EAE3D9] text-xs">
            {isFreeShippingEligible ? (
              <p className="font-semibold text-[#3C6E47] flex items-center gap-1.5">
                <span>✓ You have unlocked FREE UK Standard Delivery!</span>
              </p>
            ) : (
              <div>
                <p className="text-[#5C554F] mb-1.5 font-medium">
                  Add <strong className="text-[#2B2623]">{formatPrice(freeShippingRemaining)}</strong> more for{' '}
                  <span className="font-semibold text-[#8C6A54]">Free Standard UK Delivery</span>.
                </p>
                <div className="w-full bg-[#E2D9CE] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#8C6A54] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#EAE3D9]">
            {cart.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-[#F0EBE1] flex items-center justify-center mx-auto mb-4 text-[#8C6A54]">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#2B2623] mb-2">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#736B63] max-w-xs mx-auto mb-6">
                  Wrap yourself in everyday comfort with our heated robes and cozy accessories.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="inline-block bg-[#2B2623] hover:bg-[#47403C] text-[#FAF8F5] text-xs font-semibold px-6 py-3 rounded-sm transition-colors"
                >
                  Explore Collection &rarr;
                </Link>
              </div>
            ) : (
              <div className="space-y-5">
                {cart.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                    <div className="relative w-20 h-24 bg-[#EAE3D9] rounded-sm overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <Link
                            href={`/products/${item.productSlug}`}
                            onClick={closeCart}
                            className="font-serif text-sm font-bold text-[#2B2623] hover:text-[#8C6A54] line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#9E948B] hover:text-[#A84A42] p-1 transition-colors"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-[#736B63] mt-0.5">
                          {item.color} • {item.size}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity picker */}
                        <div className="flex items-center border border-[#D9D0C3] rounded-sm bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-[#5C554F] hover:bg-[#F2ECE4] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-medium text-[#2B2623]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-[#5C554F] hover:bg-[#F2ECE4] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-semibold text-sm text-[#2B2623]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#FAF8F5] border-t border-[#EAE3D9] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#5C554F]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-sm text-[#2B2623]">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-[#736B63]">
                  <span>Estimated Shipping</span>
                  <span>{isFreeShippingEligible ? 'FREE' : formatPrice(config.shipping.standardShippingRate)}</span>
                </div>
                <p className="text-[11px] text-[#8C8278] pt-1">
                  Taxes calculated at checkout. 30-Day Cozy Trial included.
                </p>
              </div>

              {cartSubtotal < 89 && (
                <div className="bg-[#FAF5EE] border border-[#E0D7C9] text-[#5C554F] p-2.5 rounded-sm text-[11px] text-center space-y-0.5">
                  <p className="font-semibold text-[#8C6A54]">Minimum Order: £89.00 (The Cozy Co. Robe price)</p>
                  <p>Add £{(89 - cartSubtotal).toFixed(2)} more to checkout</p>
                </div>
              )}

              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full bg-[#2B2623] hover:bg-[#47403C] text-[#FAF8F5] py-3.5 px-4 rounded-sm font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-between text-xs pt-1">
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="text-[#5C554F] hover:text-[#2B2623] underline underline-offset-2"
                  >
                    View Full Bag Page
                  </Link>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="text-[#5C554F] hover:text-[#2B2623]"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#736B63] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C6A54]" />
                <span>Encrypted 256-Bit SSL Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
