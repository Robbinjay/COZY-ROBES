'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/lib/store-context';
import { useRouter } from 'next/navigation';
import { formatPrice, getWhatsAppCartOrderUrl, WHATSAPP_PHONE_DISPLAY } from '@/lib/utils';
import { ShoppingBag, MapPin, CreditCard, Lock, ShieldCheck, Landmark, Coins, MessageCircle, Sparkles } from 'lucide-react';

type PaymentMethod = 'bank_transfer' | 'crypto';

export default function CheckoutForm() {
  const { cart, cartSubtotal, createOrder, isFreeShippingEligible, config } = useStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank_transfer');

  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const isChristmasEligible = cartSubtotal >= 200;
  const discountAmount = appliedPromo === 'COZY-CHRISTMAS' && isChristmasEligible ? cartSubtotal * 0.10 : 0;
  const shippingCost = isFreeShippingEligible ? 0 : config.shipping.standardShippingRate;
  const total = Math.max(0, cartSubtotal - discountAmount) + shippingCost;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const code = promoInput.trim().toUpperCase();
    if (code !== 'COZY-CHRISTMAS') {
      setPromoError('Invalid promo code. Use COZY-CHRISTMAS.');
      return;
    }
    if (!isChristmasEligible) {
      setPromoError('Order subtotal must be above £200 to apply COZY-CHRISTMAS (10% OFF).');
      return;
    }
    setAppliedPromo('COZY-CHRISTMAS');
    setPromoSuccess('Christmas discount of 10% applied successfully!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const orderId = `CCR-${Math.floor(100000 + Math.random() * 900000)}`;
      
      // 1. Create order in local store
      const order = createOrder({
        email: formData.email,
        customerName: `${formData.firstName} ${formData.lastName}`,
        shippingAddress: {
          address1: formData.address,
          city: formData.city,
          state: '',
          postalCode: formData.postcode,
          country: 'United Kingdom',
        },
        shippingMethod: isFreeShippingEligible ? 'Free UK Shipping' : 'Standard Shipping',
        items: cart.map(item => ({
          productId: item.productId,
          name: item.name,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        subtotal: cartSubtotal,
        discount: discountAmount,
        shippingCost: shippingCost,
        tax: 0,
        total: total,
      }, orderId);

      // 2. Send email notifications via internal API
      const paymentMethodLabel = {
        bank_transfer: 'Bank Transfer',
        crypto: 'Crypto (BTC / USDT)'
      }[paymentMethod];

      await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          customerInfo: {
            ...formData,
            country: 'United Kingdom'
          },
          shippingMethod: { label: order.shippingMethod },
          paymentMethod: { label: paymentMethodLabel },
          cart: order.items,
          cartSubtotal: order.subtotal,
          discount: order.discount,
          shippingCost: order.shippingCost,
          orderTotal: order.total
        }),
      });

      router.push(`/order-confirmation?orderId=${order.id}`);
    } catch (err) {
      console.error('Order Submission Error:', err);
      alert('There was an issue processing your order. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 bg-white border border-[#EAE3D9] rounded-sm">
        <ShoppingBag className="w-12 h-12 text-[#D9D0C3] mx-auto mb-4" />
        <p className="text-sm text-[#736B63]">Your bag is empty.</p>
        <button 
          onClick={() => router.push('/shop')}
          className="mt-4 text-xs font-bold uppercase tracking-widest text-[#8C6A54] hover:underline"
        >
          Browse Shop
        </button>
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
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#736B63] mb-1">First Name</label>
              <input 
                type="text" 
                required 
                className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3 text-sm focus:outline-none focus:border-[#8C6A54]"
                value={formData.firstName}
                onChange={e => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
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
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#736B63] mb-1">Email Address</label>
              <input 
                type="email" 
                required 
                className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3 text-sm focus:outline-none focus:border-[#8C6A54]"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#736B63] mb-1">Phone Number</label>
              <input 
                type="tel" 
                required 
                className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3 text-sm focus:outline-none focus:border-[#8C6A54]"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
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
          <h2 className="text-sm font-serif font-bold text-[#2B2623] mb-4 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#8C6A54]" />
            Payment Method
          </h2>

          {/* WhatsApp Direct Ordering & Live Support Box */}
          <div className="bg-[#EBF7EE] p-4 rounded-sm border border-[#CDE9D2] space-y-2.5 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E7E34] uppercase tracking-wider">
                <MessageCircle className="w-4 h-4 fill-[#1E7E34] text-[#1E7E34]" />
                <span>WhatsApp Live Support &amp; Order Placement</span>
              </div>
              <span className="text-[10px] font-bold bg-[#25D366] text-white px-2 py-0.5 rounded-full">
                Online
              </span>
            </div>
            <p className="text-[11px] text-[#2B5435] leading-relaxed">
              Prefer to place your order directly via WhatsApp or need help? Chat with our team at <strong>{WHATSAPP_PHONE_DISPLAY}</strong> to complete your order and confirm payment details.
            </p>
            <a
              id="checkout-whatsapp-btn"
              href={getWhatsAppCartOrderUrl(cart, total)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-xs transition-colors cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Place Order via WhatsApp ({WHATSAPP_PHONE_DISPLAY})</span>
            </a>
          </div>
          
          <div className="space-y-4 mb-8">
            <label className={`flex items-center justify-between p-4 border rounded-sm cursor-pointer transition-all ${paymentMethod === 'bank_transfer' ? 'bg-[#FAF8F5] border-[#8C6A54]' : 'bg-white border-[#EAE3D9] hover:border-[#D9D0C3]'}`}>
              <div className="flex items-center gap-3">
                <input 
                  type="radio" 
                  className="accent-[#2B2623]" 
                  name="paymentMethod" 
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={() => setPaymentMethod('bank_transfer')}
                />
                <div>
                  <p className="text-xs font-bold text-[#2B2623]">Bank Transfer</p>
                  <p className="text-[10px] text-[#736B63]">Instructions sent after order placement</p>
                </div>
              </div>
              <Landmark className="w-4 h-4 text-[#8C6A54]" />
            </label>

            <label className={`flex items-center justify-between p-4 border rounded-sm cursor-pointer transition-all ${paymentMethod === 'crypto' ? 'bg-[#FAF8F5] border-[#8C6A54]' : 'bg-white border-[#EAE3D9] hover:border-[#D9D0C3]'}`}>
              <div className="flex items-center gap-3">
                <input 
                  type="radio" 
                  className="accent-[#2B2623]" 
                  name="paymentMethod" 
                  checked={paymentMethod === 'crypto'}
                  onChange={() => setPaymentMethod('crypto')}
                />
                <div>
                  <p className="text-xs font-bold text-[#2B2623]">Crypto (BTC / USDT)</p>
                  <p className="text-[10px] text-[#736B63]">Secure peer-to-peer payment</p>
                </div>
              </div>
              <Coins className="w-4 h-4 text-[#8C6A54]" />
            </label>


          </div>

          <div className="bg-[#FAF5EE] p-4 rounded-sm border border-[#EAE3D9] mb-6">
            <p className="text-[11px] text-[#5C554F] leading-relaxed">
              <strong>Note:</strong> To complete your purchase, place the order first. You will receive an email with payment details for your chosen method. Your order will be processed as soon as the transfer is verified. Thanks.
            </p>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#2B2623] text-white text-xs font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-[#47403C] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Processing...' : (
              <>
                <Lock className="w-3.5 h-3.5" />
                Place Order • {formatPrice(total)}
              </>
            )}
          </button>
        </section>
      </form>

      <div className="space-y-6">
        <div className="bg-[#FAF8F5] p-6 rounded-sm border border-[#EAE3D9]">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#2B2623] mb-4">Order Summary</h3>
          <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="w-12 h-14 relative bg-white border border-[#EAE3D9] rounded-xs overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#2B2623]">{item.name}</p>
                  <p className="text-[10px] text-[#736B63]">{item.color} • {item.size} • x{item.quantity}</p>
                </div>
                <p className="text-xs font-semibold text-[#2B2623]">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          {/* Promo Code Box */}
          <div className="pt-4 border-t border-[#EAE3D9] mt-4 space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#736B63] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B86246]" />
              <span>Christmas Promo Code</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="COZY-CHRISTMAS"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="flex-1 bg-white border border-[#D9D0C3] rounded-sm p-2 text-xs uppercase focus:outline-none focus:border-[#8C6A54]"
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                className="bg-[#2B2623] text-white text-xs font-bold px-4 py-2 rounded-sm hover:bg-[#47403C] transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
            {promoError && <p className="text-[11px] text-red-600 font-medium">{promoError}</p>}
            {promoSuccess && <p className="text-[11px] text-emerald-600 font-medium">{promoSuccess}</p>}
            {!appliedPromo && (
              <p className="text-[10px] text-[#736B63] leading-relaxed">
                🎄 <strong>10% OFF</strong> on orders over £200 with code <code className="bg-[#F0EBE1] px-1 py-0.5 rounded text-[#2B2623] font-bold">COZY-CHRISTMAS</code>.
              </p>
            )}
          </div>

          <div className="space-y-3 pt-4 border-t border-[#EAE3D9] mt-4">
            <div className="flex justify-between text-xs text-[#5C554F]">
              <span>Subtotal</span>
              <span>{formatPrice(cartSubtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-xs text-[#B86246] font-semibold">
                <span>Christmas Discount (10%)</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
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
          <span>Secure Checkout Protocol</span>
        </div>
      </div>
    </div>
  );
}
