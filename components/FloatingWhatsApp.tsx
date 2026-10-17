'use client';

import React, { useState } from 'react';
import { MessageCircle, X, ShoppingBag, Headset, HelpCircle, ArrowUpRight } from 'lucide-react';
import { useStore } from '@/lib/store-context';
import { getWhatsAppSupportUrl, getWhatsAppCartOrderUrl, WHATSAPP_PHONE_DISPLAY } from '@/lib/utils';

export default function FloatingWhatsApp() {
  const { cart, cartSubtotal, isFreeShippingEligible, config } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const total = cartSubtotal + (isFreeShippingEligible ? 0 : config.shipping.standardShippingRate);
  const supportUrl = getWhatsAppSupportUrl();
  const orderUrl = getWhatsAppCartOrderUrl(cart, total);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Quick Action Popover Card */}
      {isOpen && (
        <div 
          id="whatsapp-support-popup"
          className="mb-3 w-[320px] sm:w-[350px] bg-white rounded-lg shadow-2xl border border-[#EAE3D9] overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-[#128C7E] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-serif font-bold text-white text-base">
                  CC
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm leading-tight">CozyCorobes Support</h3>
                <p className="text-[11px] text-white/80 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
                  Live on WhatsApp &bull; Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close WhatsApp support menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 bg-[#FAF8F5] space-y-3">
            <div className="bg-white p-3 rounded-md border border-[#EAE3D9] shadow-2xs">
              <p className="text-xs text-[#2B2623] font-medium leading-relaxed">
                👋 Hi there! Need sizing advice, order updates, or want to <strong>place an order directly via WhatsApp</strong>?
              </p>
              <p className="text-[11px] text-[#736B63] mt-1 font-mono">
                Official Number: <strong className="text-[#128C7E]">{WHATSAPP_PHONE_DISPLAY}</strong>
              </p>
            </div>

            <div className="space-y-2">
              {/* Place Order via WhatsApp */}
              <a
                id="popup-whatsapp-order-btn"
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 bg-white hover:bg-[#EBF7EE] border border-[#EAE3D9] hover:border-[#25D366] rounded-md transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#EBF7EE] text-[#25D366] flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#2B2623] group-hover:text-[#128C7E]">
                      Place Order via WhatsApp
                    </p>
                    <p className="text-[10px] text-[#736B63]">
                      {cart.length > 0 ? `Include ${cart.reduce((a, b) => a + b.quantity, 0)} item(s) from bag` : 'Instant assisted checkout'}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#8C6A54] group-hover:text-[#128C7E]" />
              </a>

              {/* Chat with Live Support */}
              <a
                id="popup-whatsapp-chat-btn"
                href={supportUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 bg-white hover:bg-[#EBF7EE] border border-[#EAE3D9] hover:border-[#25D366] rounded-md transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#EBF7EE] text-[#25D366] flex items-center justify-center shrink-0">
                    <Headset className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#2B2623] group-hover:text-[#128C7E]">
                      Live Customer Support
                    </p>
                    <p className="text-[10px] text-[#736B63]">
                      Ask anything about robes or shipping
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#8C6A54] group-hover:text-[#128C7E]" />
              </a>
            </div>

            <div className="pt-1 flex items-center justify-center gap-1.5 text-[10px] text-[#8C8278]">
              <HelpCircle className="w-3 h-3 text-[#25D366]" />
              <span>Replies within minutes &bull; 9am &ndash; 5pm GMT</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <div 
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-white/95 text-[#2B2623] px-3.5 py-2 rounded-full shadow-lg border border-[#EAE3D9] cursor-pointer hover:border-[#25D366] transition-all duration-200"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
            <span className="text-xs font-bold">WhatsApp Live Support</span>
            <span className="text-[11px] text-[#736B63] font-mono">{WHATSAPP_PHONE_DISPLAY}</span>
          </div>
        )}

        <button
          id="floating-whatsapp-btn"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center cursor-pointer"
          aria-label="Open WhatsApp live support and ordering menu"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageCircle className="w-6 h-6 fill-white" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
