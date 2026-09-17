'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, Clock, HelpCircle, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate swift server response
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 rounded-sm border border-[#EAE3D9] text-center space-y-4 shadow-xs">
        <div className="w-12 h-12 rounded-full bg-[#EBF7EE] text-[#2E7D32] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-xl font-bold text-[#2B2623]">
          Thank you for reaching out!
        </h3>
        <p className="text-xs sm:text-sm text-[#5C554F] max-w-md mx-auto">
          We have received your message regarding <strong>{formData.subject}</strong>. A CozyCorobes customer care specialist will respond to <strong>{formData.email}</strong> within 1 business day.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                email: '',
                orderNumber: '',
                subject: 'General Inquiry',
                message: '',
              });
            }}
            className="text-xs text-[#8C6A54] hover:underline font-semibold"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-sm border border-[#EAE3D9] shadow-xs space-y-5">
      <h2 className="font-serif text-xl font-bold text-[#2B2623] mb-1">
        Send Us a Message
      </h2>
      <p className="text-xs text-[#736B63] mb-4">
        Fill out the form below and our team will get back to you promptly.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
            Your Name *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Jane Doe"
            className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
            Email Address *
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="jane@example.com"
            className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
            Topic *
          </label>
          <select
            id="contact-subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Order Status & Tracking">Order Status & Tracking</option>
            <option value="Return or Exchange">Return or Exchange</option>
            <option value="Sizing & Fit Advice">Sizing & Fit Advice</option>
            <option value="Product Care & Warranty">Product Care & Warranty</option>
          </select>
        </div>

        <div>
          <label htmlFor="contact-order" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
            Order # (Optional)
          </label>
          <input
            id="contact-order"
            type="text"
            value={formData.orderNumber}
            onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
            placeholder="e.g. CC-10492"
            className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-[#2B2623] mb-1">
          Message *
        </label>
        <textarea
          id="contact-message"
          rows={5}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="How can we help make your days cozier?"
          className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm p-2.5 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
        />
      </div>

      <button
        id="contact-submit-btn"
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto bg-[#2B2623] hover:bg-[#47403C] text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
      >
        <Send className="w-3.5 h-3.5" />
        <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
      </button>
    </form>
  );
}
