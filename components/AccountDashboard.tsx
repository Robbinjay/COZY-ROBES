'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore, DEMO_CUSTOMER } from '@/lib/store-context';
import { formatPrice } from '@/lib/utils';
import { CustomerAddress, CustomerUser, Order } from '@/lib/types';
import {
  User,
  Package,
  MapPin,
  LogOut,
  LayoutDashboard,
  CheckCircle2,
  Clock,
  Truck,
  ArrowRight,
  ArrowLeft,
  Mail,
  ShieldCheck,
  Edit3,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

type AccountTab = 'dashboard' | 'orders' | 'addresses' | 'details';

export default function AccountDashboard() {
  const {
    customer,
    loginCustomer,
    registerCustomer,
    logoutCustomer,
    updateCustomerProfile,
    updateCustomerAddresses,
    getCustomerOrders,
  } = useStore();

  const [activeTab, setActiveTab] = useState<AccountTab>('dashboard');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Auth form states (for logged out state)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regError, setRegError] = useState('');

  // Address edit state
  const [editingAddressType, setEditingAddressType] = useState<'billing' | 'shipping' | null>(null);
  const [addressSuccessMsg, setAddressSuccessMsg] = useState('');
  const [addressForm, setAddressForm] = useState<CustomerAddress>({
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    county: '',
    postcode: '',
    country: 'United Kingdom',
    phone: '',
  });

  const customerOrders = getCustomerOrders();
  const selectedOrder = selectedOrderId ? customerOrders.find((o) => o.id === selectedOrderId) : null;

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail.trim()) {
      setLoginError('Please enter your email address.');
      return;
    }
    const res = loginCustomer(loginEmail.trim());
    if (!res.success) {
      setLoginError(res.message || 'Unable to log in. Please check your credentials.');
    }
  };

  // Handle Quick Demo Login
  const handleDemoLogin = () => {
    loginCustomer(DEMO_CUSTOMER.email);
  };

  // Handle Register
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    if (!regEmail.trim() || !regFirstName.trim()) {
      setRegError('Please provide your name and email address.');
      return;
    }
    const res = registerCustomer({
      firstName: regFirstName.trim(),
      lastName: regLastName.trim(),
      email: regEmail.trim(),
      password: regPassword,
    });
    if (!res.success) {
      setRegError(res.message || 'Registration failed. Please try again.');
    }
  };

  // Start editing address
  const handleStartEditAddress = (type: 'billing' | 'shipping') => {
    const current = type === 'billing' ? customer?.billingAddress : customer?.shippingAddress;
    setAddressForm({
      firstName: current?.firstName || customer?.firstName || '',
      lastName: current?.lastName || customer?.lastName || '',
      company: current?.company || '',
      address1: current?.address1 || '',
      address2: current?.address2 || '',
      city: current?.city || '',
      county: current?.county || '',
      postcode: current?.postcode || '',
      country: current?.country || 'United Kingdom',
      phone: current?.phone || '',
    });
    setEditingAddressType(type);
  };

  // Save edited address
  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddressType === 'billing') {
      updateCustomerAddresses(addressForm, undefined);
      setAddressSuccessMsg('Billing address updated successfully.');
    } else if (editingAddressType === 'shipping') {
      updateCustomerAddresses(undefined, addressForm);
      setAddressSuccessMsg('Shipping address updated successfully.');
    }
    setEditingAddressType(null);
    setTimeout(() => setAddressSuccessMsg(''), 4000);
  };

  // -------------------------------------------------------------
  // LOGGED OUT STATE: WooCommerce Login & Register Forms
  // -------------------------------------------------------------
  if (!customer) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif font-bold text-[#2B2623] tracking-tight">
            My Account
          </h1>
          <p className="text-sm text-[#736B63] mt-2 max-w-md mx-auto">
            Log in to manage your orders, delivery addresses, and account details.
          </p>
        </div>

        {/* Quick Demo Customer Banner for convenience */}
        <div className="mb-8 p-4 bg-[#FAF5EE] border border-[#EAE3D9] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5C554F]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8C6A54] shrink-0" />
            <span>
              <strong>Sample Account Preview:</strong> Log in as Sarah Jenkins (has sample orders already loaded).
            </span>
          </div>
          <button
            type="button"
            onClick={handleDemoLogin}
            id="demo-login-button"
            className="whitespace-nowrap px-4 py-2 bg-[#8C6A54] hover:bg-[#735542] text-white text-xs font-semibold rounded-xs transition-colors"
          >
            One-Click Demo Login &rarr;
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#EAE3D9] mb-8">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`pb-3 px-6 text-sm font-semibold transition-colors border-b-2 ${
              authMode === 'login'
                ? 'border-[#2B2623] text-[#2B2623]'
                : 'border-transparent text-[#736B63] hover:text-[#2B2623]'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`pb-3 px-6 text-sm font-semibold transition-colors border-b-2 ${
              authMode === 'register'
                ? 'border-[#2B2623] text-[#2B2623]'
                : 'border-transparent text-[#736B63] hover:text-[#2B2623]'
            }`}
          >
            Create an Account
          </button>
        </div>

        {/* Forms Container */}
        <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#EAE3D9]">
          {authMode === 'login' ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="max-w-md space-y-4">
              <h2 className="text-lg font-serif font-bold text-[#2B2623]">Login</h2>

              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#2B2623] mb-1">
                  Username or email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="customer@example.com"
                  className="w-full px-3.5 py-2.5 text-sm border border-[#D9D0C3] rounded-xs focus:outline-none focus:border-[#2B2623]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2B2623] mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 text-sm border border-[#D9D0C3] rounded-xs focus:outline-none focus:border-[#2B2623]"
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-[#5C554F]">
                  <input type="checkbox" defaultChecked className="accent-[#2B2623]" />
                  <span>Remember me</span>
                </label>
                <span className="text-[#8C6A54] hover:underline cursor-pointer">
                  Lost your password?
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="account-login-submit"
                  className="w-full sm:w-auto px-8 py-3 bg-[#2B2623] hover:bg-[#47403C] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
                >
                  Log In
                </button>
              </div>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="max-w-md space-y-4">
              <h2 className="text-lg font-serif font-bold text-[#2B2623]">Register</h2>

              {regError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{regError}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2B2623] mb-1">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={regFirstName}
                    onChange={(e) => setRegFirstName(e.target.value)}
                    placeholder="Jane"
                    className="w-full px-3.5 py-2.5 text-sm border border-[#D9D0C3] rounded-xs focus:outline-none focus:border-[#2B2623]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2B2623] mb-1">
                    Last name
                  </label>
                  <input
                    type="text"
                    value={regLastName}
                    onChange={(e) => setRegLastName(e.target.value)}
                    placeholder="Smith"
                    className="w-full px-3.5 py-2.5 text-sm border border-[#D9D0C3] rounded-xs focus:outline-none focus:border-[#2B2623]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2B2623] mb-1">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="jane.smith@example.com"
                  className="w-full px-3.5 py-2.5 text-sm border border-[#D9D0C3] rounded-xs focus:outline-none focus:border-[#2B2623]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2B2623] mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full px-3.5 py-2.5 text-sm border border-[#D9D0C3] rounded-xs focus:outline-none focus:border-[#2B2623]"
                />
              </div>

              <p className="text-[11px] text-[#736B63] leading-relaxed pt-1">
                Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
              </p>

              <div className="pt-2">
                <button
                  type="submit"
                  id="account-register-submit"
                  className="w-full sm:w-auto px-8 py-3 bg-[#2B2623] hover:bg-[#47403C] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
                >
                  Register
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // LOGGED IN STATE: Full WordPress / WooCommerce My Account
  // -------------------------------------------------------------
  const customerDisplayName = customer.displayName || customer.firstName || 'Customer';

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6">
      {/* Page Title */}
      <div className="border-b border-[#EAE3D9] pb-6 mb-8">
        <h1 className="text-3xl font-serif font-bold text-[#2B2623] tracking-tight">
          My Account
        </h1>
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#736B63] mt-2">
          <span>Hello <strong>{customerDisplayName}</strong></span>
          <span>(not <strong>{customerDisplayName}</strong>?</span>
          <button
            type="button"
            onClick={logoutCustomer}
            className="text-[#8C6A54] hover:underline font-semibold"
          >
            Log out
          </button>
          <span>)</span>
        </div>
      </div>

      {/* Main Layout: Sidebar navigation + Content area */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Navigation Sidebar (WordPress WooCommerce style) */}
        <aside className="md:col-span-1 space-y-1">
          <nav className="bg-white border border-[#EAE3D9] rounded-sm divide-y divide-[#EAE3D9]">
            <button
              type="button"
              onClick={() => {
                setActiveTab('dashboard');
                setSelectedOrderId(null);
              }}
              className={`w-full flex items-center justify-between px-4 py-3.5 text-xs font-semibold transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-[#FAF5EE] text-[#8C6A54] font-bold'
                  : 'text-[#2B2623] hover:bg-[#FAF8F5]'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#A3998F]" />
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('orders');
                setSelectedOrderId(null);
              }}
              className={`w-full flex items-center justify-between px-4 py-3.5 text-xs font-semibold transition-colors ${
                activeTab === 'orders'
                  ? 'bg-[#FAF5EE] text-[#8C6A54] font-bold'
                  : 'text-[#2B2623] hover:bg-[#FAF8F5]'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>Orders</span>
              </span>
              <span className="bg-[#EAE3D9] text-[#2B2623] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {customerOrders.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('addresses');
                setSelectedOrderId(null);
              }}
              className={`w-full flex items-center justify-between px-4 py-3.5 text-xs font-semibold transition-colors ${
                activeTab === 'addresses'
                  ? 'bg-[#FAF5EE] text-[#8C6A54] font-bold'
                  : 'text-[#2B2623] hover:bg-[#FAF8F5]'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4" />
                <span>Addresses</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#A3998F]" />
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('details');
                setSelectedOrderId(null);
              }}
              className={`w-full flex items-center justify-between px-4 py-3.5 text-xs font-semibold transition-colors ${
                activeTab === 'details'
                  ? 'bg-[#FAF5EE] text-[#8C6A54] font-bold'
                  : 'text-[#2B2623] hover:bg-[#FAF8F5]'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <User className="w-4 h-4" />
                <span>Account Details</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#A3998F]" />
            </button>

            <button
              type="button"
              onClick={logoutCustomer}
              className="w-full flex items-center justify-between px-4 py-3.5 text-xs font-semibold text-[#8C2B23] hover:bg-red-50 transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </span>
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="md:col-span-3">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome text */}
              <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] space-y-3">
                <p className="text-sm text-[#2B2623] leading-relaxed">
                  From your account dashboard you can view your{' '}
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-[#8C6A54] underline font-semibold hover:text-[#2B2623]"
                  >
                    recent orders
                  </button>
                  , manage your{' '}
                  <button
                    onClick={() => setActiveTab('addresses')}
                    className="text-[#8C6A54] underline font-semibold hover:text-[#2B2623]"
                  >
                    shipping and billing addresses
                  </button>
                  , and{' '}
                  <button
                    onClick={() => setActiveTab('details')}
                    className="text-[#8C6A54] underline font-semibold hover:text-[#2B2623]"
                  >
                    edit your password and account details
                  </button>
                  .
                </p>
              </div>

              {/* Courier Tracking Notice Banner */}
              <div className="bg-[#FAF5EE] p-5 rounded-sm border border-[#EAE3D9] flex items-start gap-3.5">
                <Truck className="w-5 h-5 text-[#8C6A54] shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs text-[#5C554F]">
                  <strong className="text-[#2B2623] font-semibold block">
                    Courier Delivery Tracking Notice
                  </strong>
                  <p className="leading-relaxed">
                    When your order is dispatched, a tracking code is generated directly by the courier service (Royal Mail) and sent straight to your email (<strong>{customer.email}</strong>). You can follow your parcel in real-time through the carrier link in that email.
                  </p>
                </div>
              </div>

              {/* Overview Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-sm border border-[#EAE3D9]">
                  <span className="text-[11px] font-semibold text-[#736B63] uppercase tracking-wider block mb-1">
                    Total Orders
                  </span>
                  <span className="text-2xl font-serif font-bold text-[#2B2623]">
                    {customerOrders.length}
                  </span>
                </div>

                <div className="bg-white p-5 rounded-sm border border-[#EAE3D9]">
                  <span className="text-[11px] font-semibold text-[#736B63] uppercase tracking-wider block mb-1">
                    Account Email
                  </span>
                  <span className="text-xs font-semibold text-[#2B2623] truncate block" title={customer.email}>
                    {customer.email}
                  </span>
                </div>

                <div className="bg-white p-5 rounded-sm border border-[#EAE3D9]">
                  <span className="text-[11px] font-semibold text-[#736B63] uppercase tracking-wider block mb-1">
                    Primary Destination
                  </span>
                  <span className="text-xs font-semibold text-[#2B2623]">
                    {customer.shippingAddress?.city || 'United Kingdom'}
                  </span>
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div className="bg-white rounded-sm border border-[#EAE3D9] overflow-hidden">
                <div className="px-6 py-4 border-b border-[#EAE3D9] flex items-center justify-between">
                  <h2 className="text-sm font-serif font-bold text-[#2B2623]">
                    Recent Orders
                  </h2>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-semibold text-[#8C6A54] hover:text-[#2B2623] underline"
                  >
                    View All Orders &rarr;
                  </button>
                </div>

                {customerOrders.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[#736B63]">
                    No orders have been placed with this account yet.
                  </div>
                ) : (
                  <div className="divide-y divide-[#EAE3D9]">
                    {customerOrders.slice(0, 3).map((ord) => (
                      <div
                        key={ord.id}
                        className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAF8F5] transition-colors"
                      >
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#2B2623]">Order #{ord.id}</span>
                            <span className="text-[#736B63]">•</span>
                            <span className="text-[#736B63]">{ord.date}</span>
                          </div>
                          <p className="text-[#5C554F]">
                            {ord.items.length} {ord.items.length === 1 ? 'item' : 'items'} for{' '}
                            <strong>{formatPrice(ord.total)}</strong>
                          </p>
                          <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-xs ${
                            ord.status === 'Delivered'
                              ? 'bg-green-100 text-green-800'
                              : ord.status === 'Shipped' || ord.status === 'Out for Delivery'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {ord.status}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOrderId(ord.id);
                            setActiveTab('orders');
                          }}
                          className="self-start sm:self-auto px-3.5 py-1.5 border border-[#D9D0C3] hover:bg-white text-[#2B2623] text-xs font-semibold rounded-xs transition-colors"
                        >
                          View Order
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS */}
          {activeTab === 'orders' && (
            <div>
              {selectedOrder ? (
                /* Detailed Order View (like WooCommerce view-order) */
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedOrderId(null)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C6A54] hover:text-[#2B2623]"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Orders List</span>
                    </button>
                  </div>

                  {/* Order Header Summary */}
                  <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE3D9] pb-4">
                      <div>
                        <span className="text-xs font-semibold text-[#736B63] uppercase tracking-wider">
                          Order Reference
                        </span>
                        <h2 className="text-xl font-serif font-bold text-[#2B2623]">
                          #{selectedOrder.id}
                        </h2>
                      </div>
                      <span className={`px-3 py-1 text-xs font-bold rounded-xs ${
                        selectedOrder.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : selectedOrder.status === 'Shipped' || selectedOrder.status === 'Out for Delivery'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {selectedOrder.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#5C554F] leading-relaxed pt-1">
                      Order <strong>#{selectedOrder.id}</strong> was placed on <strong>{selectedOrder.date}</strong> and is currently <strong>{selectedOrder.status}</strong>.
                    </p>

                    {/* Courier Tracking Reminder */}
                    <div className="p-3.5 bg-[#FAF5EE] rounded-xs border border-[#EAE3D9] text-xs text-[#5C554F] flex items-start gap-2.5">
                      <Truck className="w-4 h-4 text-[#8C6A54] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#2B2623] font-semibold">Courier Tracking:</strong> When dispatched via {selectedOrder.carrier || 'Royal Mail'}, a live parcel tracking code is issued by the courier service and emailed directly to <strong>{selectedOrder.email}</strong>.
                      </div>
                    </div>
                  </div>

                  {/* Order Items Table */}
                  <div className="bg-white rounded-sm border border-[#EAE3D9] overflow-hidden">
                    <div className="px-6 py-4 border-b border-[#EAE3D9]">
                      <h3 className="text-sm font-serif font-bold text-[#2B2623]">
                        Order Items
                      </h3>
                    </div>

                    <div className="divide-y divide-[#EAE3D9]">
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="p-4 sm:p-6 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 bg-[#F5F2ED] rounded-xs overflow-hidden shrink-0 border border-[#EAE3D9]">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            </div>
                            <div className="text-xs space-y-1">
                              <h4 className="font-semibold text-[#2B2623]">{item.name}</h4>
                              <p className="text-[#736B63]">
                                Color: {item.color} • Size: {item.size}
                              </p>
                              <p className="text-[#5C554F]">
                                Qty: {item.quantity} × {formatPrice(item.price)}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-[#2B2623]">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Totals Breakdown */}
                    <div className="bg-[#FAF8F5] p-6 border-t border-[#EAE3D9] space-y-2 text-xs">
                      <div className="flex justify-between text-[#5C554F]">
                        <span>Subtotal</span>
                        <span>{formatPrice(selectedOrder.subtotal || selectedOrder.total)}</span>
                      </div>
                      <div className="flex justify-between text-[#5C554F]">
                        <span>Shipping ({selectedOrder.shippingMethod})</span>
                        <span>
                          {selectedOrder.shippingCost === 0
                            ? 'Free'
                            : formatPrice(selectedOrder.shippingCost)}
                        </span>
                      </div>
                      <div className="flex justify-between text-[#5C554F]">
                        <span>VAT (20% included)</span>
                        <span>{formatPrice(selectedOrder.tax || 0)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-[#2B2623] pt-2 border-t border-[#EAE3D9]">
                        <span>Total</span>
                        <span>{formatPrice(selectedOrder.total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Addresses */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] space-y-2 text-xs">
                      <h4 className="font-serif font-bold text-sm text-[#2B2623]">
                        Shipping Address
                      </h4>
                      <p className="text-[#5C554F] leading-relaxed">
                        {selectedOrder.customerName}<br />
                        {selectedOrder.shippingAddress.address1}<br />
                        {selectedOrder.shippingAddress.address2 && (
                          <>{selectedOrder.shippingAddress.address2}<br /></>
                        )}
                        {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}<br />
                        {selectedOrder.shippingAddress.country}
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] space-y-2 text-xs">
                      <h4 className="font-serif font-bold text-sm text-[#2B2623]">
                        Contact Information
                      </h4>
                      <p className="text-[#5C554F] leading-relaxed">
                        Email: {selectedOrder.email}<br />
                        {selectedOrder.phone && <>Phone: {selectedOrder.phone}<br /></>}
                        Courier Updates: Sent to your email upon dispatch.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Orders List Table */
                <div className="bg-white rounded-sm border border-[#EAE3D9] overflow-hidden">
                  <div className="px-6 py-4 border-b border-[#EAE3D9]">
                    <h2 className="text-sm font-serif font-bold text-[#2B2623]">
                      My Orders
                    </h2>
                  </div>

                  {customerOrders.length === 0 ? (
                    <div className="p-10 text-center space-y-4">
                      <Package className="w-8 h-8 text-[#A3998F] mx-auto" />
                      <p className="text-xs text-[#736B63]">
                        No orders have been placed with this account yet.
                      </p>
                      <Link
                        href="/#collection"
                        className="inline-block px-6 py-2.5 bg-[#2B2623] hover:bg-[#47403C] text-white text-xs font-semibold rounded-xs transition-colors"
                      >
                        Browse Store &rarr;
                      </Link>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-[#EAE3D9] bg-[#FAF8F5] text-[#736B63]">
                            <th className="py-3 px-4 font-semibold">Order</th>
                            <th className="py-3 px-4 font-semibold">Date</th>
                            <th className="py-3 px-4 font-semibold">Status</th>
                            <th className="py-3 px-4 font-semibold">Total</th>
                            <th className="py-3 px-4 font-semibold text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAE3D9]">
                          {customerOrders.map((ord) => (
                            <tr key={ord.id} className="hover:bg-[#FAF8F5] transition-colors">
                              <td className="py-3.5 px-4 font-bold text-[#2B2623]">
                                #{ord.id}
                              </td>
                              <td className="py-3.5 px-4 text-[#5C554F]">
                                {ord.date}
                              </td>
                              <td className="py-3.5 px-4">
                                <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-xs ${
                                  ord.status === 'Delivered'
                                    ? 'bg-green-100 text-green-800'
                                    : ord.status === 'Shipped' || ord.status === 'Out for Delivery'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {ord.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-[#5C554F]">
                                <strong>{formatPrice(ord.total)}</strong> for {ord.items.length}{' '}
                                {ord.items.length === 1 ? 'item' : 'items'}
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <button
                                  type="button"
                                  onClick={() => setSelectedOrderId(ord.id)}
                                  className="px-3 py-1 border border-[#D9D0C3] hover:bg-white text-[#2B2623] text-xs font-semibold rounded-xs transition-colors"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Helpful footnote */}
                  <div className="p-4 bg-[#FAF5EE] border-t border-[#EAE3D9] text-[11px] text-[#736B63] flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-[#8C6A54] shrink-0" />
                    <span>Courier tracking codes are issued by Royal Mail upon parcel dispatch and emailed to your registered address.</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-sm border border-[#EAE3D9]">
                <p className="text-xs text-[#5C554F] leading-relaxed">
                  The following addresses will be used on the checkout page by default.
                </p>
              </div>

              {addressSuccessMsg && (
                <div className="p-3.5 bg-green-50 border border-green-200 text-green-800 text-xs rounded-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600" />
                  <span>{addressSuccessMsg}</span>
                </div>
              )}

              {editingAddressType ? (
                /* Edit Address Form */
                <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] space-y-4">
                  <div className="flex items-center justify-between border-b border-[#EAE3D9] pb-3">
                    <h3 className="text-sm font-serif font-bold text-[#2B2623] capitalize">
                      Edit {editingAddressType} Address
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingAddressType(null)}
                      className="text-xs text-[#736B63] hover:text-[#2B2623]"
                    >
                      Cancel
                    </button>
                  </div>

                  <form onSubmit={handleSaveAddress} className="space-y-4 max-w-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#2B2623] mb-1">
                          First name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={addressForm.firstName}
                          onChange={(e) => setAddressForm({ ...addressForm, firstName: e.target.value })}
                          className="w-full px-3 py-2 text-xs border border-[#D9D0C3] rounded-xs focus:outline-none focus:border-[#2B2623]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#2B2623] mb-1">
                          Last name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={addressForm.lastName}
                          onChange={(e) => setAddressForm({ ...addressForm, lastName: e.target.value })}
                          className="w-full px-3 py-2 text-xs border border-[#D9D0C3] rounded-xs focus:outline-none focus:border-[#2B2623]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2B2623] mb-1">
                        Company name (optional)
                      </label>
                      <input
                        type="text"
                        value={addressForm.company || ''}
                        onChange={(e) => setAddressForm({ ...addressForm, company: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#D9D0C3] rounded-xs focus:outline-none focus:border-[#2B2623]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2B2623] mb-1">
                        Street address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="House number and street name"
                        value={addressForm.address1}
                        onChange={(e) => setAddressForm({ ...addressForm, address1: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#D9D0C3] rounded-xs focus:outline-none focus:border-[#2B2623]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2B2623] mb-1">
                        Apartment, suite, unit, etc. (optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Apartment, suite, unit, etc."
                        value={addressForm.address2 || ''}
                        onChange={(e) => setAddressForm({ ...addressForm, address2: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-[#D9D0C3] rounded-xs focus:outline-none focus:border-[#2B2623]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#2B2623] mb-1">
                          Town / City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={addressForm.city}
                          onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                          className="w-full px-3 py-2 text-xs border border-[#D9D0C3] rounded-xs focus:outline-none focus:border-[#2B2623]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#2B2623] mb-1">
                          Postcode <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={addressForm.postcode}
                          onChange={(e) => setAddressForm({ ...addressForm, postcode: e.target.value })}
                          className="w-full px-3 py-2 text-xs border border-[#D9D0C3] rounded-xs focus:outline-none focus:border-[#2B2623]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2B2623] mb-1">
                        Country / Region
                      </label>
                      <input
                        type="text"
                        disabled
                        value={addressForm.country}
                        className="w-full px-3 py-2 text-xs bg-[#F5F2ED] border border-[#D9D0C3] rounded-xs text-[#736B63]"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#2B2623] hover:bg-[#47403C] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
                      >
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingAddressType(null)}
                        className="px-4 py-2.5 border border-[#D9D0C3] text-xs font-semibold text-[#2B2623] rounded-xs hover:bg-[#FAF8F5]"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* View Addresses */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Billing Address Card */}
                  <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif font-bold text-sm text-[#2B2623]">
                          Billing Address
                        </h3>
                        <button
                          type="button"
                          onClick={() => handleStartEditAddress('billing')}
                          className="text-xs font-semibold text-[#8C6A54] hover:underline inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                      </div>

                      {customer.billingAddress?.address1 ? (
                        <p className="text-xs text-[#5C554F] leading-relaxed pt-1">
                          {customer.billingAddress.firstName} {customer.billingAddress.lastName}<br />
                          {customer.billingAddress.company && <>{customer.billingAddress.company}<br /></>}
                          {customer.billingAddress.address1}<br />
                          {customer.billingAddress.address2 && <>{customer.billingAddress.address2}<br /></>}
                          {customer.billingAddress.city}, {customer.billingAddress.postcode}<br />
                          {customer.billingAddress.country}
                        </p>
                      ) : (
                        <p className="text-xs text-[#A3998F] italic pt-1">
                          You have not set up this type of address yet.
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleStartEditAddress('billing')}
                      className="text-xs font-semibold text-[#8C6A54] hover:text-[#2B2623] text-left underline"
                    >
                      {customer.billingAddress?.address1 ? 'Change Billing Address &rarr;' : 'Add Billing Address &rarr;'}
                    </button>
                  </div>

                  {/* Shipping Address Card */}
                  <div className="bg-white p-6 rounded-sm border border-[#EAE3D9] flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif font-bold text-sm text-[#2B2623]">
                          Shipping Address
                        </h3>
                        <button
                          type="button"
                          onClick={() => handleStartEditAddress('shipping')}
                          className="text-xs font-semibold text-[#8C6A54] hover:underline inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                      </div>

                      {customer.shippingAddress?.address1 ? (
                        <p className="text-xs text-[#5C554F] leading-relaxed pt-1">
                          {customer.shippingAddress.firstName} {customer.shippingAddress.lastName}<br />
                          {customer.shippingAddress.company && <>{customer.shippingAddress.company}<br /></>}
                          {customer.shippingAddress.address1}<br />
                          {customer.shippingAddress.address2 && <>{customer.shippingAddress.address2}<br /></>}
                          {customer.shippingAddress.city}, {customer.shippingAddress.postcode}<br />
                          {customer.shippingAddress.country}
                        </p>
                      ) : (
                        <p className="text-xs text-[#A3998F] italic pt-1">
                          You have not set up this type of address yet.
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleStartEditAddress('shipping')}
                      className="text-xs font-semibold text-[#8C6A54] hover:text-[#2B2623] text-left underline"
                    >
                      {customer.shippingAddress?.address1 ? 'Change Shipping Address &rarr;' : 'Add Shipping Address &rarr;'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ACCOUNT DETAILS */}
          {activeTab === 'details' && (
            <AccountDetailsTabForm
              key={customer.id}
              customer={customer}
              updateCustomerProfile={updateCustomerProfile}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function AccountDetailsTabForm({
  customer,
  updateCustomerProfile,
}: {
  customer: CustomerUser;
  updateCustomerProfile: (data: Partial<CustomerUser>) => void;
}) {
  const [profileFirstName, setProfileFirstName] = useState(customer.firstName || '');
  const [profileLastName, setProfileLastName] = useState(customer.lastName || '');
  const [profileDisplayName, setProfileDisplayName] = useState(customer.displayName || '');
  const [profileEmail, setProfileEmail] = useState(customer.email || '');
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomerProfile({
      firstName: profileFirstName.trim(),
      lastName: profileLastName.trim(),
      displayName: profileDisplayName.trim() || profileFirstName.trim(),
      email: profileEmail.trim(),
    });
    setProfileSuccessMsg('Account details changed successfully.');
    setTimeout(() => setProfileSuccessMsg(''), 4000);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#EAE3D9]">
      <h2 className="text-base font-serif font-bold text-[#2B2623] mb-4">
        Account Details
      </h2>

      {profileSuccessMsg && (
        <div className="mb-4 p-3.5 bg-green-50 border border-green-200 text-green-800 text-xs rounded-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600" />
          <span>{profileSuccessMsg}</span>
        </div>
      )}

      <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#2B2623] mb-1">
              First name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={profileFirstName}
              onChange={(e) => setProfileFirstName(e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-[#D9D0C3] rounded-xs focus:outline-none focus:border-[#2B2623]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#2B2623] mb-1">
              Last name
            </label>
            <input
              type="text"
              value={profileLastName}
              onChange={(e) => setProfileLastName(e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-[#D9D0C3] rounded-xs focus:outline-none focus:border-[#2B2623]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#2B2623] mb-1">
            Display name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={profileDisplayName}
            onChange={(e) => setProfileDisplayName(e.target.value)}
            className="w-full px-3.5 py-2 text-xs border border-[#D9D0C3] rounded-xs focus:outline-none focus:border-[#2B2623]"
          />
          <p className="text-[11px] text-[#736B63] mt-1">
            This will be how your name will be displayed in the account section and in reviews.
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#2B2623] mb-1">
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={profileEmail}
            onChange={(e) => setProfileEmail(e.target.value)}
            className="w-full px-3.5 py-2 text-xs border border-[#D9D0C3] rounded-xs focus:outline-none focus:border-[#2B2623]"
          />
        </div>

        <div className="pt-4 border-t border-[#EAE3D9] space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#2B2623]">
            Password Change
          </h3>

          <div>
            <label className="block text-xs font-semibold text-[#2B2623] mb-1">
              Current password (leave blank to leave unchanged)
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3.5 py-2 text-xs border border-[#D9D0C3] rounded-xs focus:outline-none focus:border-[#2B2623]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2B2623] mb-1">
              New password (leave blank to leave unchanged)
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3.5 py-2 text-xs border border-[#D9D0C3] rounded-xs focus:outline-none focus:border-[#2B2623]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2B2623] mb-1">
              Confirm new password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3.5 py-2 text-xs border border-[#D9D0C3] rounded-xs focus:outline-none focus:border-[#2B2623]"
            />
          </div>
        </div>

        <div className="pt-3">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#2B2623] hover:bg-[#47403C] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

