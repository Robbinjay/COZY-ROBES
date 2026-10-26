// lib/bach-payments.ts

interface ExchangeRateCache {
  rate: number;
  timestamp: number;
}

let exchangeRateCache: ExchangeRateCache | null = null;
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

async function getGbpToUsdRate(): Promise<number> {
  const now = Date.now();
  if (exchangeRateCache && now - exchangeRateCache.timestamp < CACHE_TTL_MS) {
    return exchangeRateCache.rate;
  }

  try {
    const res = await fetch('https://open.er-api.com/v6/latest/GBP');
    if (!res.ok) throw new Error('Failed to fetch exchange rate');
    const data = await res.json();
    const rate = data?.rates?.USD;
    if (typeof rate === 'number' && rate > 0) {
      exchangeRateCache = { rate, timestamp: now };
      return rate;
    }
  } catch (err) {
    console.warn('Exchange rate fetch warning, using fallback rate 1.33:', err);
  }

  // Reliable fallback rate
  return 1.33;
}

export interface CreateSessionParams {
  amount: number; // in GBP
  currency?: string; // default GBP
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  reference: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export async function createBachCheckoutSession(params: CreateSessionParams) {
  const secretKey = process.env.BACH_SECRET_KEY || process.env.BACH_API_KEY;
  
  const originalCurrency = params.currency || 'GBP';
  const originalAmount = params.amount;

  // Convert to USD since Bachs supported fiat settlement currencies are: USD, NGN, GHS, KES, MWK, RWF, TZS, UGX, XAF, XOF, ZMW
  const rate = await getGbpToUsdRate();
  const convertedAmountNum = Math.round(originalAmount * rate * 100) / 100;
  const convertedAmountStr = convertedAmountNum.toFixed(2);
  const convertedCurrency = 'USD';

  const payload = {
    pricing: {
      amount: convertedAmountStr,
      currency: convertedCurrency,
    },
    customer: {
      name: params.customer.name,
      email: params.customer.email,
      phone: params.customer.phone || '+447402233804',
    },
    reference: params.reference,
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: {
      orderRef: params.reference,
      originalCurrency,
      originalAmount: originalAmount.toFixed(2),
      chargedCurrency: convertedCurrency,
      chargedAmount: convertedAmountStr,
      exchangeRate: rate.toFixed(4),
      ...(params.metadata || {}),
    },
  };

  // If secret key is not configured or in development fallback mode, return a sandbox simulated session URL
  if (!secretKey || secretKey.includes('your_bachs')) {
    console.warn('BACH_SECRET_KEY not set. Generating sandbox simulation checkout URL.');
    const sandboxCheckoutId = `bach_sandbox_${Math.random().toString(36).substring(7)}`;
    const sandboxUrl = new URL(params.successUrl);
    sandboxUrl.searchParams.set('session_id', sandboxCheckoutId);
    sandboxUrl.searchParams.set('payment_status', 'success');
    sandboxUrl.searchParams.set('order_ref', params.reference);

    return {
      success: true,
      checkoutUrl: sandboxUrl.toString(),
      checkoutId: sandboxCheckoutId,
      convertedAmount: convertedAmountStr,
      convertedCurrency,
    };
  }

  const response = await fetch('https://api.bachs.io/v1/checkout-sessions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || !data) {
    throw new Error(data?.message || data?.error || `Bachs API error: ${response.status}`);
  }

  const checkoutUrl = data.checkout_url || data.url || data.data?.checkout_url;
  const checkoutId = data.checkout_id || data.id || data.data?.id || params.reference;

  if (!checkoutUrl) {
    throw new Error('Bachs API response missing checkout_url');
  }

  return {
    success: true,
    checkoutUrl,
    checkoutId,
    convertedAmount: convertedAmountStr,
    convertedCurrency,
  };
}

export async function verifyBachPayment(checkoutId: string) {
  const secretKey = process.env.BACH_SECRET_KEY || process.env.BACH_API_KEY;

  if (!secretKey || secretKey.includes('your_bachs') || checkoutId.startsWith('bach_sandbox_')) {
    return {
      success: true,
      status: 'paid',
      verified: true,
      sandbox: true,
    };
  }

  const response = await fetch(`https://api.bachs.io/v1/checkout-sessions/${checkoutId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${secretKey}`,
    },
  });

  const data = await response.json();

  if (!response.ok || !data) {
    throw new Error(data?.message || data?.error || `Failed to verify Bach payment: ${response.status}`);
  }

  const session = data.data || data;
  const status = (
    session.status ||
    session.payment_status ||
    session.charge?.status ||
    ''
  ).toLowerCase();

  const successStatuses = ['paid', 'succeeded', 'completed', 'closed'];
  const isPaid = successStatuses.includes(status);

  return {
    success: true,
    status,
    verified: isPaid,
    session,
  };
}
