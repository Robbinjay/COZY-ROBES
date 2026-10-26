'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useStore } from '@/lib/store-context';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatPrice, getWhatsAppCartOrderUrl, WHATSAPP_PHONE_DISPLAY } from '@/lib/utils';
import { ShoppingBag, MapPin, CreditCard, Lock, ShieldCheck, Landmark, Coins, MessageCircle, Sparkles, Truck, Loader2, AlertCircle } from 'lucide-react';

type PaymentMethod = 'bank_transfer' | 'crypto' | 'bach_card';
type ShippingMethodType = 'standard' | 'express' | 'ultrafast' | 'international';

function CheckoutContent() {
  const { cart, cartSubtotal, createOrder } = useStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const paymentStatus = searchParams.get('payment_status');
  const sessionId = searchParams.get('session_id');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifyingBach, setIsVerifyingBach] = useState(false);
  const [cancelMessage, setCancelMessage] = useState<string | null>(
    paymentStatus === 'cancelled' ? 'Card payment was cancelled. You may retry or select another payment method below.' : null
  );
  
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
  const [shippingType, setShippingType] = useState<ShippingMethodType>('standard');

  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const isChristmasEligible = cartSubtotal >= 200;
  const discountAmount = appliedPromo === 'COZY-CHRISTMAS' && isChristmasEligible ? cartSubtotal * 0.30 : 0;
  
  const isFreeAll = cartSubtotal >= 130;

  const standardRate = isFreeAll ? 0 : 6.99;
  const expressRate = isFreeAll ? 0 : 14.99;
  const ultraFastRate = isFreeAll ? 0 : 59.99;
  const internationalRate = isFreeAll ? 0 : 19.99;

  const shippingCost = 
    shippingType === 'express' ? expressRate :
    shippingType === 'ultrafast' ? ultraFastRate :
    shippingType === 'international' ? internationalRate :
    standardRate;

  const total = Math.max(0, cartSubtotal - discountAmount) + shippingCost;

  // Handle return from Bachs payment gateway
  useEffect(() => {
    if (paymentStatus === 'success' && sessionId) {
      const verifyBachOrder = async () => {
        setIsVerifyingBach(true);
        try {
          const rawPending = sessionStorage.getItem('pending_bach_order');
          if (!rawPending) {
            throw new Error('Pending order session not found. Please try again.');
          }
          const orderData = JSON.parse(rawPending);

          const res = await fetch('/api/payments/bach/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ checkoutId: sessionId, orderData }),
          });
          const data = await res.json();

          if (!res.ok || !data.verified) {
            throw new Error(data.error || data.message || 'Payment verification failed');
          }

          // Create order locally
          const order = createOrder(orderData, orderData.id);
          sessionStorage.removeItem('pending_bach_order');

          router.push(`/order-confirmation?orderId=${order.id}`);
        } catch (err: any) {
          console.error('Bach Verification Error:', err);
          setCancelMessage(err.message || 'Payment verification failed.');
          setIsVerifyingBach(false);
        }
      };

      verifyBachOrder();
    }
  }, [paymentStatus, sessionId, createOrder, router]);

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
      setPromoError('Order subtotal must be above £200 to apply COZY-CHRISTMAS (30% OFF).');
      return;
    }
    setAppliedPromo('COZY-CHRISTMAS');
    setPromoSuccess('Christmas discount of 30% applied successfully!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const orderId = `CCR-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const shippingLabel = 
        shippingType === 'express' ? `Express Shipping (£${expressRate.toFixed(2)})` :
        shippingType === 'ultrafast' ? `Ultra fast 1 day delivery (£${ultraFastRate.toFixed(2)})` :
        shippingType === 'international' ? `International shipping (£${internationalRate.toFixed(2)})` :
        `Standard Shipping (£${standardRate.toFixed(2)})`;

      const orderData = {
        id: orderId,
        email: formData.email,
        customerName: `${formData.firstName} ${formData.lastName}`,
        shippingAddress: {
          address1: formData.address,
          city: formData.city,
          state: '',
          postalCode: formData.postcode,
          country: 'United Kingdom',
        },
        shippingMethod: shippingLabel,
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
      };

      if (paymentMethod === 'bach_card') {
        // Save to sessionStorage for verification return
        sessionStorage.setItem('pending_bach_order', JSON.stringify(orderData));

        const sessionRes = await fetch('/api/payments/bach/create-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: total,
            currency: 'GBP',
            customer: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              phone: formData.phone,
            },
            reference: orderId,
            cart: orderData.items,
            shippingCost,
            discount: discountAmount,
          }),
        });

        const sessionData = await sessionRes.json();
        if (!sessionRes.ok || !sessionData.success || !sessionData.checkoutUrl) {
          throw new Error(sessionData.error || 'Failed to initialize Bach checkout session');
        }

        window.location.href = sessionData.checkoutUrl;
        return;
      }

      // Standard Local Order (Bank Transfer / Crypto)
      const order = createOrder(orderData, orderId);

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
    } catch (err: any) {
      console.error('Order Submission Error:', err);
      alert(err.message || 'There was an issue processing your order. Please try again or contact support.');
      setIsSubmitting(false);
    }
  };

  if (isVerifyingBach) {
    return (
      <div className="max-w-md mx-auto py-28 text-center space-y-6">
        <Loader2 className="w-16 h-16 animate-spin text-[#8C6A54] mx-auto" />
        <div className="space-y-2">
          <h2 className="text-2xl font-serif font-bold text-[#2B2623]">Verifying Card Payment...</h2>
          <p className="text-sm text-[#736B63]">Please wait while we confirm your transaction securely with Bachs.</p>
        </div>
      </div>
    );
  }

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
        {cancelMessage && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-sm text-xs flex items-start gap-3">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Payment Notice</p>
              <p className="mt-0.5">{cancelMessage}</p>
            </div>
          </div>
        )}

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

        {/* Shipping Method Section */}
        <section className="bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-sm">
          <h2 className="text-sm font-serif font-bold text-[#2B2623] mb-4 flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#8C6A54]" />
            Shipping Method
          </h2>
          <div className="space-y-3">
            {/* Standard Shipping */}
            <label className={`flex items-center justify-between p-4 border rounded-sm cursor-pointer transition-all ${shippingType === 'standard' ? 'bg-[#FAF8F5] border-[#8C6A54]' : 'bg-white border-[#EAE3D9] hover:border-[#D9D0C3]'}`}>
              <div className="flex items-center gap-3">
                <input 
                  type="radio" 
                  className="accent-[#2B2623]" 
                  name="shippingMethod" 
                  checked={shippingType === 'standard'}
                  onChange={() => setShippingType('standard')}
                />
                <div>
                  <p className="text-xs font-bold text-[#2B2623]">Standard Shipping</p>
                  <p className="text-[10px] text-[#736B63]">3 to 5 business days via Royal Mail</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#2B2623]">
                {standardRate === 0 ? 'FREE' : formatPrice(standardRate)}
              </span>
            </label>

            {/* Express Shipping */}
            <label className={`flex items-center justify-between p-4 border rounded-sm cursor-pointer transition-all ${shippingType === 'express' ? 'bg-[#FAF8F5] border-[#8C6A54]' : 'bg-white border-[#EAE3D9] hover:border-[#D9D0C3]'}`}>
              <div className="flex items-center gap-3">
                <input 
                  type="radio" 
                  className="accent-[#2B2623]" 
                  name="shippingMethod" 
                  checked={shippingType === 'express'}
                  onChange={() => setShippingType('express')}
                />
                <div>
                  <p className="text-xs font-bold text-[#2B2623]">Express Shipping</p>
                  <p className="text-[10px] text-[#736B63]">1 to 2 business days</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#2B2623]">
                {expressRate === 0 ? 'FREE' : formatPrice(expressRate)}
              </span>
            </label>

            {/* Ultra Fast 1 Day Delivery */}
            <label className={`flex items-center justify-between p-4 border rounded-sm cursor-pointer transition-all ${shippingType === 'ultrafast' ? 'bg-[#FAF8F5] border-[#8C6A54]' : 'bg-white border-[#EAE3D9] hover:border-[#D9D0C3]'}`}>
              <div className="flex items-center gap-3">
                <input 
                  type="radio" 
                  className="accent-[#2B2623]" 
                  name="shippingMethod" 
                  checked={shippingType === 'ultrafast'}
                  onChange={() => setShippingType('ultrafast')}
                />
                <div>
                  <p className="text-xs font-bold text-[#2B2623]">Ultra fast 1 day delivery</p>
                  <p className="text-[10px] text-[#736B63]">Guaranteed next business day delivery</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#2B2623]">
                {ultraFastRate === 0 ? 'FREE' : formatPrice(ultraFastRate)}
              </span>
            </label>

            {/* International Shipping */}
            <label className={`flex items-center justify-between p-4 border rounded-sm cursor-pointer transition-all ${shippingType === 'international' ? 'bg-[#FAF8F5] border-[#8C6A54]' : 'bg-white border-[#EAE3D9] hover:border-[#D9D0C3]'}`}>
              <div className="flex items-center gap-3">
                <input 
                  type="radio" 
                  className="accent-[#2B2623]" 
                  name="shippingMethod" 
                  checked={shippingType === 'international'}
                  onChange={() => setShippingType('international')}
                />
                <div>
                  <p className="text-xs font-bold text-[#2B2623]">International shipping</p>
                  <p className="text-[10px] text-[#736B63]">5-7 Days delivery worldwide</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#2B2623]">
                {internationalRate === 0 ? 'FREE' : formatPrice(internationalRate)}
              </span>
            </label>
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
            {/* Credit / Debit Card via Bachs */}
            <label className={`flex items-center justify-between p-4 border rounded-sm cursor-pointer transition-all ${paymentMethod === 'bach_card' ? 'bg-[#FAF8F5] border-[#8C6A54]' : 'bg-white border-[#EAE3D9] hover:border-[#D9D0C3]'}`}>
              <div className="flex items-center gap-3">
                <input 
                  type="radio" 
                  className="accent-[#2B2623]" 
                  name="paymentMethod" 
                  checked={paymentMethod === 'bach_card'}
                  onChange={() => setPaymentMethod('bach_card')}
                />
                <div>
                  <p className="text-xs font-bold text-[#2B2623]">Credit / Debit Card (Visa, Mastercard)</p>
                  <p className="text-[10px] text-[#736B63]">Securely processed via Bachs (USD equivalent)</p>
                </div>
              </div>
              <CreditCard className="w-4 h-4 text-[#8C6A54]" />
            </label>

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
              <strong>Note:</strong> Card payments are securely processed through Bachs payment gateway. Other methods will provide payment instructions upon order submission.
            </p>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#2B2623] text-white text-xs font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-[#47403C] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                {paymentMethod === 'bach_card' ? 'Proceed to Secure Card Payment • ' : 'Place Order • '} {formatPrice(total)}
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
                🎄 <strong>30% OFF</strong> on orders over £200 with code <code className="bg-[#F0EBE1] px-1 py-0.5 rounded text-[#2B2623] font-bold">COZY-CHRISTMAS</code>.
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
                <span>Christmas Discount (30%)</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-xs text-[#5C554F]">
              <span>Shipping ({
                shippingType === 'express' ? 'Express' :
                shippingType === 'ultrafast' ? 'Ultra Fast 1-Day' :
                shippingType === 'international' ? 'International' : 'Standard'
              })</span>
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

export default function CheckoutForm() {
  return (
    <Suspense fallback={<div className="py-24 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-[#8C6A54]" /></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
