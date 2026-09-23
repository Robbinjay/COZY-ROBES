'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  CreditCard,
  Wallet,
  Landmark,
  Bitcoin,
  Info,
  Plus,
  Minus,
  Trash2,
  Check,
  Sparkles,
  Truck,
  User,
  UserCheck,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from 'lucide-react';
import { useStore } from '@/lib/store-context';
import { PRODUCTS } from '@/lib/store-data';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

const generateOrderId = () => `CCR-${Math.floor(100000 + Math.random() * 900000)}`;

export default function CheckoutForm() {
  const { customer } = useStore();
  return <CheckoutFormContent key={customer?.id || 'guest'} customer={customer} />;
}

function CheckoutFormContent({ customer }: { customer: ReturnType<typeof useStore>['customer'] }) {
  const router = useRouter();
  const {
    cart,
    cartSubtotal,
    clearCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    closeCart,
    createOrder,
    registerCustomer,
    loginCustomer,
    logoutCustomer,
  } = useStore();

  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Optional account creation state (default unchecked so guest checkout is seamless)
  const [createAccountChecked, setCreateAccountChecked] = useState(false);
  const [accountPassword, setAccountPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [accountError, setAccountError] = useState('');

  // Returning customer inline login state
  const [showInlineLogin, setShowInlineLogin] = useState(false);
  const [loginEmailInput, setLoginEmailInput] = useState('');
  const [loginErrorMsg, setLoginErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    email: customer?.email || '',
    firstName: customer?.shippingAddress?.firstName || customer?.firstName || '',
    lastName: customer?.shippingAddress?.lastName || customer?.lastName || '',
    address: customer?.shippingAddress?.address1 || '',
    city: customer?.shippingAddress?.city || '',
    state: customer?.shippingAddress?.county || '',
    postalCode: customer?.shippingAddress?.postcode || '',
    country: customer?.shippingAddress?.country || 'United Kingdom',
    phone: customer?.shippingAddress?.phone || '',
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'international'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'bank_transfer' | 'crypto' | 'revolut'>('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Accessories for cross-selling
  const accessoryProducts = PRODUCTS.filter((p) => p.category === 'cozy-accessories');

  const getCartItemForProduct = (productId: string) => {
    return cart.find((item) => item.productId === productId);
  };

  const handleAddAccessory = (accessory: Product) => {
    const defaultColor = accessory.colors[0]?.name || 'Standard';
    const defaultSize = accessory.sizes[0] || 'One Size';
    addToCart(accessory, defaultColor, defaultSize, 1, false);
    closeCart();
    setRecentlyAddedId(accessory.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 2500);
  };

  const handleRemoveAccessory = (itemId: string) => {
    removeFromCart(itemId);
  };

  const handleUpdateAccessoryQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQty);
    }
  };

  // Minimum Order Logic: strictly equal to the price of The Cozy Co. Robe (£69.99)
  const cozyCoRobeProduct = PRODUCTS.find((p) => p.slug === 'cozy-co-robes');
  const minimumOrderLimit = cozyCoRobeProduct ? cozyCoRobeProduct.price : 69.99;
  const isBelowMinimum = cartSubtotal < minimumOrderLimit;

  // Free shipping over £100
  const freeShippingThreshold = 100;
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

  const handleInlineLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErrorMsg('');
    if (!loginEmailInput.trim()) {
      setLoginErrorMsg('Please enter your email address to log in.');
      return;
    }
    const res = loginCustomer(loginEmailInput.trim());
    if (!res.success) {
      setLoginErrorMsg(res.message || 'Unable to log in. Please check your email.');
    } else {
      setShowInlineLogin(false);
    }
  };

  const handleQuickDemoLogin = () => {
    loginCustomer('customer@example.com');
    setShowInlineLogin(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isBelowMinimum || cart.length === 0) return;

    // Optional account creation validation
    if (!customer && createAccountChecked && accountPassword.trim().length < 6) {
      setAccountError('Please enter a password of at least 6 characters to create your account.');
      return;
    }

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

      const orderId = generateOrderId();

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
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
        // If guest customer explicitly selected optional account creation
        if (!customer && createAccountChecked) {
          registerCustomer({
            email: formData.email,
            password: accountPassword.trim() || undefined,
            firstName: formData.firstName,
            lastName: formData.lastName,
            shippingAddress: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              address1: formData.address,
              city: formData.city,
              county: formData.state,
              postcode: formData.postalCode,
              country: formData.country,
              phone: formData.phone,
            },
            billingAddress: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              address1: formData.address,
              city: formData.city,
              county: formData.state,
              postcode: formData.postalCode,
              country: formData.country,
              phone: formData.phone,
            },
          });
        }

        const created = createOrder({
          email: formData.email,
          customerName: `${formData.firstName} ${formData.lastName}`.trim() || 'Valued Customer',
          shippingAddress: {
            address1: formData.address,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: formData.country,
          },
          shippingMethod: activeShipping.label,
          items: cart.map((i) => ({
            productId: i.productId,
            name: i.name,
            color: i.color,
            size: i.size,
            quantity: i.quantity,
            price: i.price,
            image: i.image,
          })),
          subtotal: cartSubtotal,
          discount: 0,
          shippingCost,
          tax: estimatedTax,
          total: grandTotal,
        }, orderId);
        clearCart();
        router.push('/order-confirmation?orderId=' + created.id);
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
      <div className="bg-white p-8 rounded-sm border border-[#EAE3D9] text-center max-w-xl mx-auto shadow-xs space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#2B2623] mb-2">
            Your Bag is Empty
          </h2>
          <p className="text-xs text-[#736B63] max-w-md mx-auto">
            Choose your heated robe or add one of our winter accessories below to begin checkout.
          </p>
        </div>

        {/* Quick Add Grid for Empty Bag */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="p-3 border border-[#EAE3D9] rounded-xs bg-[#FAF8F5] flex items-center gap-3 hover:border-[#D9D0C3] transition-colors"
            >
              <div className="relative w-12 h-12 bg-white rounded-xs overflow-hidden shrink-0 border border-[#EAE3D9]">
                <Image
                  src={prod.images[0] || '/images/featured_robe_studio.jpg'}
                  alt={prod.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#2B2623] truncate">{prod.name}</p>
                <p className="text-[11px] font-semibold text-[#8C6A54]">{formatPrice(prod.price)}</p>
              </div>
              <button
                type="button"
                id={`empty-add-${prod.slug}`}
                onClick={() => {
                  const defaultColor = prod.colors[0]?.name || 'Standard';
                  const defaultSize = prod.sizes[0] || 'One Size';
                  addToCart(prod, defaultColor, defaultSize, 1, false);
                  closeCart();
                }}
                className="text-xs font-bold bg-[#2B2623] hover:bg-[#47403C] text-white px-2.5 py-1.5 rounded-xs transition-colors shrink-0 cursor-pointer"
              >
                + Add
              </button>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-[#EAE3D9]">
          <Link
            href="/shop"
            className="inline-block bg-[#FAF5EE] border border-[#D9D0C3] text-[#2B2623] hover:bg-[#EAE3D9] text-xs font-bold px-6 py-2.5 rounded-sm transition-colors"
          >
            Browse All Products &rarr;
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Left: Form inputs */}
      <div className="lg:col-span-7 space-y-8">
        
        {/* Returning Customer / Active Account Banner */}
        {customer ? (
          <div id="checkout-active-account-banner" className="bg-[#FAF8F5] border border-[#EAE3D9] p-4 rounded-sm flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <UserCheck className="w-4 h-4 text-[#3C6E47] shrink-0" />
              <span className="text-[#2B2623]">
                Logged in as <strong>{customer.displayName || customer.firstName || customer.email}</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/account" className="text-[#8C6A54] hover:underline font-semibold">
                My Account
              </Link>
              <button
                type="button"
                id="checkout-logout-btn"
                onClick={() => logoutCustomer()}
                className="text-[#736B63] hover:text-[#2B2623] underline cursor-pointer"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div id="checkout-guest-login-banner" className="bg-[#FAF8F5] border border-[#EAE3D9] rounded-sm text-xs overflow-hidden">
            <div className="p-3.5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-[#5C554F]">
                <User className="w-3.5 h-3.5 text-[#8C6A54] shrink-0" />
                <span>
                  Returning customer?{' '}
                  <button
                    type="button"
                    id="checkout-login-toggle-btn"
                    onClick={() => setShowInlineLogin(!showInlineLogin)}
                    className="text-[#8C6A54] hover:underline font-bold cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>{showInlineLogin ? 'Close login form' : 'Click here to log in'}</span>
                  </button>{' '}
                  <span className="text-[#736B63]">(or continue as guest below)</span>
                </span>
              </div>
              <button
                type="button"
                id="checkout-toggle-arrow-btn"
                onClick={() => setShowInlineLogin(!showInlineLogin)}
                className="text-[#8C6A54] p-1 cursor-pointer"
              >
                {showInlineLogin ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>

            {showInlineLogin && (
              <div id="checkout-inline-login-form" className="p-4 bg-white border-t border-[#EAE3D9] space-y-3">
                <p className="text-[11px] text-[#736B63]">
                  Have an account with us? Enter your email address to log in and automatically pre-fill your saved shipping addresses.
                </p>
                {loginErrorMsg && (
                  <p className="text-xs text-red-600 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{loginErrorMsg}</span>
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    id="checkout-inline-login-email-input"
                    value={loginEmailInput}
                    onChange={(e) => setLoginEmailInput(e.target.value)}
                    placeholder="Enter your registered email address"
                    className="flex-1 bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
                  />
                  <button
                    type="button"
                    id="checkout-inline-login-submit-btn"
                    onClick={handleInlineLogin}
                    className="bg-[#2B2623] hover:bg-[#47403C] text-white text-xs font-bold px-4 py-2 rounded-sm transition-colors cursor-pointer"
                  >
                    Log In
                  </button>
                  <button
                    type="button"
                    id="checkout-inline-demo-login-btn"
                    onClick={handleQuickDemoLogin}
                    className="bg-[#FAF5EE] border border-[#D9D0C3] hover:bg-[#EAE3D9] text-[#2B2623] text-xs font-semibold px-3 py-2 rounded-sm transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Demo Account
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

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

        {/* Optional Account Creation Card (Guests Only) */}
        {!customer && (
          <div id="checkout-account-creation-card" className="bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-xs space-y-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="checkout-create-account-checkbox"
                checked={createAccountChecked}
                onChange={(e) => {
                  setCreateAccountChecked(e.target.checked);
                  if (!e.target.checked) setAccountError('');
                }}
                className="mt-1 w-4 h-4 rounded border-[#D9D0C3] text-[#2B2623] focus:ring-[#8C6A54] accent-[#2B2623] cursor-pointer"
              />
              <label htmlFor="checkout-create-account-checkbox" className="cursor-pointer select-none">
                <span className="text-xs font-bold text-[#2B2623] block">
                  Create an account? (Optional)
                </span>
                <span className="text-[11px] text-[#736B63] block mt-0.5 leading-relaxed">
                  Save your details to track orders, print receipts, and manage addresses in My Account. Leave this unchecked to check out as a guest.
                </span>
              </label>
            </div>

            {createAccountChecked && (
              <div id="checkout-account-creation-fields" className="pt-4 border-t border-[#EAE3D9] space-y-3">
                <div>
                  <label htmlFor="checkout-account-password-input" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
                    Create Account Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="checkout-account-password-input"
                      value={accountPassword}
                      onChange={(e) => {
                        setAccountPassword(e.target.value);
                        if (accountError) setAccountError('');
                      }}
                      placeholder="At least 6 characters"
                      className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 pr-12 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
                    />
                    <button
                      type="button"
                      id="checkout-toggle-password-visibility-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-[#736B63] hover:text-[#2B2623] px-1 py-0.5 font-semibold cursor-pointer"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {accountError && (
                    <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{accountError}</span>
                    </p>
                  )}
                </div>
                <p className="text-[11px] text-[#736B63] leading-relaxed">
                  Your new account will be registered with <strong className="text-[#2B2623]">{formData.email || 'your email'}</strong> and you can log in at any time from the account page.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Shipping Method */}
        <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] shadow-xs space-y-3">
          <h2 className="font-serif text-base font-bold text-[#2B2623]">3. Delivery Method</h2>

          <div className="space-y-2">
            <label className={`flex items-center justify-between p-3.5 border rounded-sm cursor-pointer transition-colors \${shippingMethod === 'standard' ? 'border-[#2B2623] bg-[#FAF5EE]' : 'border-[#D9D0C3] hover:border-[#8C6A54]'}`}>
              <div className="flex items-center gap-3">
                <input type="radio" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} className="accent-[#2B2623]" />
                <div>
                  <p className="text-xs font-bold text-[#2B2623]">Standard Delivery (2–4 Working Days)</p>
                  <p className="text-[11px] text-[#736B63]">{isFreeShipping ? 'Free on orders over £100' : 'Standard flat rate'}</p>
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

          <div className="p-4 bg-[#FAF8F5] border border-[#EAE3D9] rounded-sm flex items-start gap-3 mt-4 animate-fadeIn text-[#5C554F] text-xs">
            <Info className="w-4 h-4 text-[#8C6A54] shrink-0 mt-0.5" />
            <p>
              You will receive an email immediately after placing your order containing instructions on how to complete your payment via{' '}
              <strong className="text-[#2B2623]">
                {paymentMethod === 'credit_card'
                  ? 'Credit or Debit Card'
                  : paymentMethod === 'bank_transfer'
                  ? 'Bank Transfer'
                  : paymentMethod === 'crypto'
                  ? 'Crypto Currency'
                  : 'Revolut'}
              </strong>.
            </p>
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
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-12 h-14 bg-[#F2ECE4] rounded-xs overflow-hidden shrink-0 border border-[#EAE3D9]">
                  <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" referrerPolicy="no-referrer" />
                  <span className="absolute top-0 right-0 bg-[#2B2623] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{item.quantity}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#2B2623] truncate">{item.name}</p>
                  <p className="text-[11px] text-[#736B63]">{item.color} • {item.size}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center border border-[#D9D0C3] rounded-2xs bg-[#FAF8F5]">
                      <button
                        type="button"
                        id={`cart-item-dec-${item.id}`}
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(item.id, item.quantity - 1);
                          } else {
                            removeFromCart(item.id);
                          }
                        }}
                        className="w-4 h-4 flex items-center justify-center text-[#5C554F] hover:text-[#2B2623] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="text-[10px] font-bold text-[#2B2623] px-1">{item.quantity}</span>
                      <button
                        type="button"
                        id={`cart-item-inc-${item.id}`}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-4 h-4 flex items-center justify-center text-[#5C554F] hover:text-[#2B2623] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      id={`cart-item-del-${item.id}`}
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#8C8278] hover:text-[#B86246] transition-colors cursor-pointer"
                      title="Remove from bag"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#2B2623] shrink-0">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-3 bg-[#FAF5EE] rounded-xs border border-[#EAE3D9] space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1.5 font-bold text-[#2B2623]">
              <Truck className="w-3.5 h-3.5 text-[#8C6A54]" />
              <span>
                {isFreeShipping ? 'Free UK Delivery Unlocked!' : `Add ${formatPrice(100 - cartSubtotal)} for FREE UK Delivery`}
              </span>
            </span>
            <span className="font-semibold text-[#736B63]">
              {Math.min(100, Math.round((cartSubtotal / 100) * 100))}%
            </span>
          </div>
          <div className="w-full bg-[#EAE3D9] h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${isFreeShipping ? 'bg-emerald-600' : 'bg-[#8C6A54]'}`}
              style={{ width: `${Math.min(100, Math.round((cartSubtotal / 100) * 100))}%` }}
            />
          </div>
          {!isFreeShipping && (
            <p className="text-[10px] text-[#736B63]">
              Tip: Add any accessory below to reach £100 and get free standard delivery!
            </p>
          )}
        </div>

        {/* Cross-Sell Accessories */}
        <div className="pt-3 border-t border-[#EAE3D9] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8C6A54]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#2B2623]">
                Frequently Added Accessories
              </h3>
            </div>
            <span className="text-[10px] font-semibold text-[#8C6A54] bg-[#FAF5EE] px-2 py-0.5 rounded-2xs border border-[#EAE3D9]">
              Special Add-On
            </span>
          </div>
          
          <p className="text-[11px] text-[#736B63] leading-relaxed">
            Add matching accessories directly to your cart — ships together with zero extra delivery delay.
          </p>

          {/* Accessories List */}
          <div className="space-y-2.5">
            {accessoryProducts.map((acc) => {
              const cartItem = getCartItemForProduct(acc.id);
              const isInCart = !!cartItem;
              const isRecentlyAdded = recentlyAddedId === acc.id;
              const savingsPct = acc.compareAtPrice ? Math.round(((acc.compareAtPrice - acc.price) / acc.compareAtPrice) * 100) : 0;

              return (
                <div
                  key={acc.id}
                  id={`cross-sell-item-${acc.slug}`}
                  className={`p-3 rounded-xs border transition-all duration-200 ${
                    isInCart
                      ? 'border-[#8C6A54]/40 bg-[#FAF5EE]/80'
                      : 'border-[#EAE3D9] bg-[#FAF8F5]/60 hover:bg-white hover:border-[#D9D0C3]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-13 h-13 bg-[#F2ECE4] rounded-xs overflow-hidden shrink-0 border border-[#EAE3D9]">
                      <Image
                        src={acc.images[0] || '/images/featured_robe_studio.jpg'}
                        alt={acc.name}
                        fill
                        sizes="52px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-[#2B2623] truncate">
                          {acc.name}
                        </h4>
                        {savingsPct > 0 && (
                          <span className="text-[9px] font-bold text-[#B86246] bg-[#B86246]/10 px-1 py-0.2 rounded-2xs shrink-0">
                            Save {savingsPct}%
                          </span>
                        )}
                      </div>
                      
                      <p className="text-[10px] text-[#736B63] truncate">
                        {acc.slug === 'cozyco-foot-warmer'
                          ? 'Electric Heated Pouch • 60s Fast Heat'
                          : acc.slug === 'cozyco-pillow'
                          ? 'Cooling Cervical Spine Contour'
                          : 'Plush Sherpa Typing Gloves'}
                      </p>

                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-xs font-bold text-[#2B2623]">
                          {formatPrice(acc.price)}
                        </span>
                        {acc.compareAtPrice && (
                          <span className="text-[10px] text-[#8C8278] line-through">
                            {formatPrice(acc.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isInCart && cartItem ? (
                        <div className="flex items-center gap-1 bg-white border border-[#D9D0C3] rounded-xs p-0.5 shadow-2xs">
                          <button
                            type="button"
                            id={`cross-sell-dec-${acc.slug}`}
                            onClick={() => handleUpdateAccessoryQuantity(cartItem.id, cartItem.quantity - 1)}
                            className="w-5 h-5 flex items-center justify-center text-[#5C554F] hover:text-[#2B2623] cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-xs font-bold text-[#2B2623] px-1 text-center min-w-3.5">
                            {cartItem.quantity}
                          </span>
                          <button
                            type="button"
                            id={`cross-sell-inc-${acc.slug}`}
                            onClick={() => handleUpdateAccessoryQuantity(cartItem.id, cartItem.quantity + 1)}
                            className="w-5 h-5 flex items-center justify-center text-[#5C554F] hover:text-[#2B2623] cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          id={`cross-sell-add-btn-${acc.slug}`}
                          onClick={() => handleAddAccessory(acc)}
                          className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-[#2B2623] hover:bg-[#47403C] text-white px-2.5 py-1.5 rounded-xs transition-all cursor-pointer whitespace-nowrap active:scale-95 shadow-2xs"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Added Feedback Banner */}
                  {isRecentlyAdded && (
                    <div className="mt-2 text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-2xs flex items-center gap-1 animate-fadeIn">
                      <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>Added to your cart! Order summary updated.</span>
                    </div>
                  )}
                  {isInCart && !isRecentlyAdded && (
                    <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#736B63] px-0.5">
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold text-[10px]">
                        <Check className="w-2.5 h-2.5" /> In Cart ({cartItem.quantity})
                      </span>
                      <button
                        type="button"
                        id={`cross-sell-remove-btn-${acc.slug}`}
                        onClick={() => handleRemoveAccessory(cartItem.id)}
                        className="text-[#8C8278] hover:text-[#B86246] transition-colors cursor-pointer text-[10px]"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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
