'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Clock, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { useStore } from '@/lib/store-context';

export default function ContactForm() {
  const { customer } = useStore();

  const [formData, setFormData] = useState({
    name: customer ? `${customer.firstName} ${customer.lastName}`.trim() || customer.displayName || '' : '',
    email: customer ? customer.email || '' : '',
    orderNumber: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          orderNumber: formData.orderNumber,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitting(false);
        setSubmitted(true);
      } else {
        setIsSubmitting(false);
        setErrorMessage(data.error || 'Unable to send message. Please try again or write to us directly.');
      }
    } catch (err: any) {
      console.error('Contact Form submission error:', err);
      setIsSubmitting(false);
      setErrorMessage('Network error while sending your message. Please check your connection or email us directly.');
    }
  };

  if (submitted) {
    return (
      <div
        id="contact-success-card"
        className="bg-white p-8 sm:p-10 rounded-sm border border-[#EAE3D9] text-center space-y-5 shadow-xs animate-in fade-in duration-300"
      >
        <div className="w-14 h-14 rounded-full bg-[#EBF7EE] text-[#2E7D32] flex items-center justify-center mx-auto border border-[#CDE9D2]">
          <CheckCircle2 className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C6A54] block">
            Message Sent Successfully
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#2B2623]">
            Thank you for reaching out, {formData.name || 'there'}!
          </h3>
        </div>

        <div className="bg-[#FAF5EE] border border-[#EAE3D9] p-4 rounded-sm max-w-md mx-auto text-left space-y-1.5 text-xs text-[#5C554F]">
          <p>
            <strong className="text-[#2B2623]">Topic:</strong> {formData.subject}
          </p>
          {formData.orderNumber && (
            <p>
              <strong className="text-[#2B2623]">Order Reference:</strong> {formData.orderNumber}
            </p>
          )}
          <p>
            <strong className="text-[#2B2623]">Reply Email:</strong> {formData.email}
          </p>
        </div>

        <div className="bg-[#EBF7EE] border border-[#CDE9D2] p-4 rounded-sm max-w-md mx-auto text-xs text-[#2E7D32] space-y-1">
          <p className="font-bold flex items-center justify-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>We reply within minutes!</span>
          </p>
          <p className="text-[11px] text-[#2E7D32]/90 leading-relaxed">
            Your message has been routed to our admin desk. Our specialists are reviewing it right now and will email a response directly to <strong>{formData.email}</strong>.
          </p>
        </div>

        <div className="pt-2">
          <button
            id="contact-reset-btn"
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: customer ? `${customer.firstName} ${customer.lastName}`.trim() || customer.displayName || '' : '',
                email: customer ? customer.email || '' : '',
                orderNumber: '',
                subject: 'General Inquiry',
                message: '',
              });
            }}
            className="text-xs text-[#8C6A54] hover:text-[#2B2623] hover:underline font-bold transition-colors cursor-pointer"
          >
            &larr; Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      className="bg-white p-6 sm:p-8 rounded-sm border border-[#EAE3D9] shadow-xs space-y-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#F0EBE1]">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2B2623]">
            Send Us a Message
          </h2>
          <p className="text-xs text-[#736B63] mt-0.5">
            Connected directly to our support desk — we reply within minutes.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#EBF7EE] border border-[#CDE9D2] rounded-xs text-[11px] font-semibold text-[#2E7D32] self-start sm:self-auto">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span>Average reply: Under 15 mins</span>
        </div>
      </div>

      {errorMessage && (
        <div
          id="contact-error-alert"
          className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-start gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1.5"
          >
            Your Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Jane Doe"
            className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1.5"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. jane@example.com"
            className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-subject"
            className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1.5"
          >
            Inquiry Topic <span className="text-red-500">*</span>
          </label>
          <select
            id="contact-subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Order Status & Delivery">Order Status & Delivery</option>
            <option value="Return or Exchange (30-Day Guarantee)">Return or Exchange (30-Day Guarantee)</option>
            <option value="Sizing & Fit Advice">Sizing & Fit Advice</option>
            <option value="Product Care & Washing">Product Care & Washing</option>
            <option value="Safety & Warranty">Safety & Warranty</option>
            <option value="Wholesale / Press Inquiry">Wholesale / Press Inquiry</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="contact-order"
            className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1.5"
          >
            Order Number <span className="text-[#8A8177] font-normal lowercase">(optional)</span>
          </label>
          <input
            id="contact-order"
            type="text"
            value={formData.orderNumber}
            onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
            placeholder="e.g. CCR-892143"
            className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1.5"
        >
          Your Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="How can we help make your days cozier? Please include any details that will help us assist you quickly."
          className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-3 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54] leading-relaxed"
        />
      </div>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          id="contact-submit-btn"
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto bg-[#2B2623] hover:bg-[#47403C] text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-xs"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{isSubmitting ? 'Sending to Support Desk...' : 'Send Message'}</span>
        </button>

        <div className="flex items-center gap-1.5 text-[11px] text-[#736B63]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8C6A54]" />
          <span>Delivered directly to admin via secure mail</span>
        </div>
      </div>
    </form>
  );
}
