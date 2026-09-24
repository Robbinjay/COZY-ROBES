'use client';

import React, { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useStore } from '@/lib/store-context';
import { useRouter } from 'next/navigation';
import { Loader2, ShieldCheck, Lock } from 'lucide-react';

interface CheckoutFormProps {
  amount: number;
  customerInfo: {
    email: string;
    firstName: string;
    lastName: string;
    shippingAddress: any;
  };
  onSuccess?: (orderId: string) => void;
}

export default function CheckoutForm({ amount, customerInfo, onSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, createOrder, clearCart } = useStore();
  const router = useRouter();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the component mounts
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        items: cart,
        metadata: {
          customer_email: customerInfo.email,
          customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
        }
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok && data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setMessage(data.error || 'Payment setup failed. Please check your Stripe configuration.');
        }
      })
      .catch((err) => {
        console.error('Error initializing payment:', err);
        setMessage('Network error. Please check your connection.');
      });
  }, [amount, cart, customerInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
        payment_method_data: {
          billing_details: {
            email: customerInfo.email,
            name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          }
        }
      },
      redirect: 'if_required',
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "An unexpected error occurred.");
      } else {
        setMessage("An unexpected error occurred.");
      }
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Payment succeeded!
      const order = createOrder({
        email: customerInfo.email,
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        shippingAddress: customerInfo.shippingAddress,
        shippingMethod: 'Stripe Credit Card',
        items: cart.map(item => ({
          productId: item.productId,
          name: item.name,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        subtotal: amount,
        discount: 0,
        shippingCost: 0,
        tax: 0,
        total: amount,
      });

      if (onSuccess) {
        onSuccess(order.id);
      } else {
        router.push(`/order-confirmation?orderId=${order.id}`);
      }
    }
  };

  if (!clientSecret && !message) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4 border border-[#EAE3D9] rounded-sm bg-[#FAF8F5]">
        <Loader2 className="w-8 h-8 animate-spin text-[#8C6A54]" />
        <p className="text-sm text-[#736B63] font-medium">Securing payment connection...</p>
      </div>
    );
  }

  if (message && !clientSecret) {
    return (
      <div className="p-8 border border-red-100 bg-red-50 rounded-sm text-center">
        <p className="text-sm text-red-700 font-medium mb-4">{message}</p>
        <p className="text-[10px] text-red-600 uppercase tracking-widest font-bold">
          Developer Note: Ensure STRIPE_SECRET_KEY is set in your environment.
        </p>
      </div>
    );
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-2 mb-4 p-3 bg-green-50 border border-green-100 rounded-sm">
        <ShieldCheck className="w-4 h-4 text-green-600" />
        <span className="text-[11px] font-bold text-green-800 uppercase tracking-wider">Secure Encrypted Payment</span>
      </div>

      <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />

      {message && (
        <div id="payment-message" className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs rounded-sm">
          {message}
        </div>
      )}

      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full bg-[#2B2623] hover:bg-[#47403C] text-white text-xs font-bold uppercase tracking-widest py-4 rounded-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <Lock className="w-3.5 h-3.5" />
            <span>Pay {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount)} Now</span>
          </>
        )}
      </button>

      <p className="text-[10px] text-[#A3998F] text-center leading-relaxed">
        Your payment is processed securely by Stripe. We never store your card details on our servers.
      </p>
    </form>
  );
}
