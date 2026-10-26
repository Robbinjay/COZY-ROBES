import { NextRequest, NextResponse } from 'next/server';
import { createBachCheckoutSession } from '@/lib/bach-payments';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency, customer, reference, cart, shippingCost, discount } = body;

    const origin = req.headers.get('origin');
    const forwardedHost = req.headers.get('x-forwarded-host');
    const host = req.headers.get('host');
    const protocol = req.headers.get('x-forwarded-proto') || 'https';

    let baseUrl = process.env.APP_URL;
    if (!baseUrl || baseUrl.includes('localhost')) {
      if (origin && !origin.includes('localhost')) {
        baseUrl = origin;
      } else if (forwardedHost) {
        baseUrl = `${protocol}://${forwardedHost}`;
      } else if (host && !host.includes('localhost')) {
        baseUrl = `${protocol}://${host}`;
      } else {
        baseUrl = 'https://ais-dev-bqskk4xil4jnqpvregvhxi-490993910955.europe-west3.run.app';
      }
    }

    const successUrl = `${baseUrl}/checkout?payment_status=success&session_id={checkout_id}&order_ref=${reference}`;
    const cancelUrl = `${baseUrl}/checkout?payment_status=cancelled&order_ref=${reference}`;

    const sessionResult = await createBachCheckoutSession({
      amount: Number(amount),
      currency: currency || 'GBP',
      customer: {
        name: customer?.name || 'Valued Customer',
        email: customer?.email || 'customer@example.com',
        phone: customer?.phone || '+447402233804',
      },
      reference: reference || `CCR-${Math.floor(100000 + Math.random() * 900000)}`,
      successUrl,
      cancelUrl,
      metadata: {
        itemsCount: String(cart?.length || 0),
        shippingCost: String(shippingCost || 0),
        discount: String(discount || 0),
      },
    });

    return NextResponse.json({
      success: true,
      checkoutUrl: sessionResult.checkoutUrl,
      checkoutId: sessionResult.checkoutId,
      convertedAmount: sessionResult.convertedAmount,
      convertedCurrency: sessionResult.convertedCurrency,
    });
  } catch (error: any) {
    console.error('Bachs Create Session API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create Bach checkout session' },
      { status: 500 }
    );
  }
}
