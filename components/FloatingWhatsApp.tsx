'use client';

import React, { useState } from 'react';
import { MessageCircle, X, ShoppingBag, Headset, HelpCircle, ArrowUpRight, Send } from 'lucide-react';
import { useStore } from '@/lib/store-context';
import { getWhatsAppSupportUrl, getWhatsAppCartOrderUrl, WHATSAPP_PHONE_DISPLAY } from '@/lib/utils';

export default function FloatingWhatsApp() {
  const { cart, cartSubtotal, isFreeShippingEligible, config } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const total = cartSubtotal + (isFreeShippingEligible ? 0 : config.shipping.standardShippingRate);
  const supportUrl = getWhatsAppSupportUrl();
  const orderUrl = getWhatsAppCartOrderUrl(cart, total);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Quick Action Popover Card */}
      {isOpen && (
        <div 
          id="whatsapp-support-popup"
          className="mb-3 w-[320px] sm:w-[350px] bg-white rounded-2xl shadow-2xl border border-[#EAE3D9] overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md">
                  <MessageCircle className="w-6 h-6 fill-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm leading-tight">CozyCorobes WhatsApp</h3>
                <p className="text-[11px] text-emerald-200 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                  Online &bull; Replies instantly
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close WhatsApp support menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content (WhatsApp Chat UI Style) */}
          <div className="p-4 bg-[#ECE5DD] space-y-3">
            {/* Incoming message bubble */}
            <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-2xs max-w-[280px] border border-black/5 space-y-1">
              <p className="text-xs text-[#2B2623] leading-relaxed">
                Hello Cozy Robe, I would like to place an order via WhatsApp. How do i proceed?
              </p>
              <p className="text-[10px] text-[#667781] text-right font-mono">10:00 AM</p>
            </div>

            <div className="space-y-2 pt-1">
              {/* Place Order via WhatsApp */}
              <a
                id="popup-whatsapp-order-btn"
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 bg-white hover:bg-[#EBF7EE] border border-[#EAE3D9] hover:border-[#25D366] rounded-xl transition-all group shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#2B2623] group-hover:text-[#075E54]">
                      Place Order via WhatsApp
                    </p>
                    <p className="text-[10px] text-[#736B63]">
                      {cart.length > 0 ? `Include ${cart.reduce((a, b) => a + b.quantity, 0)} item(s) from bag` : 'Instant assisted checkout'}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#8C6A54] group-hover:text-[#25D366]" />
              </a>

              {/* Chat with Live Support */}
              <a
                id="popup-whatsapp-chat-btn"
                href={supportUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 bg-white hover:bg-[#EBF7EE] border border-[#EAE3D9] hover:border-[#25D366] rounded-xl transition-all group shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Headset className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#2B2623] group-hover:text-[#075E54]">
                      Chat with Support
                    </p>
                    <p className="text-[10px] text-[#736B63]">
                      {WHATSAPP_PHONE_DISPLAY}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#8C6A54] group-hover:text-[#25D366]" />
              </a>
            </div>

            <div className="pt-2 flex items-center justify-center gap-1 text-[10px] text-[#667781] font-medium">
              <span>Powered by WhatsApp Business</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button (Authentic WhatsApp Floating Widget Look) */}
      <div className="flex items-center gap-3">
        {!isOpen && (
          <div 
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2.5 bg-white text-[#2B2623] px-4 py-2.5 rounded-full shadow-lg border border-black/10 cursor-pointer hover:border-[#25D366] transition-all duration-200 group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse"></span>
            <div className="text-left">
              <p className="text-[11px] font-bold text-[#2B2623] leading-tight group-hover:text-[#075E54]">WhatsApp Chat</p>
              <p className="text-[10px] text-[#736B63] font-mono">{WHATSAPP_PHONE_DISPLAY}</p>
            </div>
          </div>
        )}

        <button
          id="floating-whatsapp-btn"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative bg-[#25D366] hover:bg-[#20ba59] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center cursor-pointer group"
          aria-label="Open WhatsApp live support and ordering menu"
        >
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <>
              <MessageCircle className="w-7 h-7 fill-white" />
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E53935] text-white text-[10px] font-bold rounded-full border-2 border-white flex items-center justify-center shadow-md">
                1
              </span>
              {/* Mobile Tooltip Bubble */}
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-[#2B2623] text-xs font-bold px-3 py-1.5 rounded-xl shadow-md border border-black/10 whitespace-nowrap opacity-0 group-hover:opacity-100 sm:opacity-0 pointer-events-none transition-opacity duration-200">
                Chat on WhatsApp 👋
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
