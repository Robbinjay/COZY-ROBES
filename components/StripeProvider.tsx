'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Loader2 } from 'lucide-react';

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
let stripePromise: Promise<Stripe | null> | null = null;

if (stripePublishableKey) {
  stripePromise = loadStripe(stripePublishableKey);
}

export default function StripeProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!stripePublishableKey) {
    return (
      <div className="p-8 border border-red-100 bg-red-50 rounded-sm text-center">
        <p className="text-sm text-red-700 font-medium mb-2">Stripe Configuration Missing</p>
        <p className="text-[10px] text-red-600 uppercase tracking-widest font-bold">
          Please add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to your environment variables.
        </p>
      </div>
    );
  }

  if (!isReady || !stripePromise) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#8C6A54]" />
        <p className="text-sm text-[#736B63]">Initializing payment gateway...</p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
}
