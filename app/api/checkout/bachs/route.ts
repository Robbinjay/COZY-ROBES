import { NextRequest, NextResponse } from 'next/server';
import { Bachs } from 'bachs-sdk';

export async function POST(req: NextRequest) {
  try {
    const { amount, items, customerEmail, customerName, shippingAddress } = await req.json();

    console.log('Bachs API Key present:', !!process.env.BACHS_API_KEY);

    if (!process.env.BACHS_API_KEY) {
      console.error('BACHS_API_KEY is missing from environment variables');
      return NextResponse.json(
        { error: 'Bachs API key not found. Please ensure BACHS_API_KEY is set in your Secrets and restart the dev server.' },
        { status: 500 }
      );
    }

    const bachs = new Bachs({ apiKey: process.env.BACHS_API_KEY });

    // Determine the base URL dynamically from the request headers
    const protocol = req.headers.get('x-forwarded-proto') || 'https';
    const host = req.headers.get('host');
    const baseUrl = process.env.APP_URL || `${protocol}://${host}`;

    console.log('Using base URL for checkout:', baseUrl);

    // Determine API endpoint
    const isSandbox = process.env.BACHS_API_KEY.startsWith('sk_sandbox_');
    const apiUrl = isSandbox ? 'https://sandbox-api.bachs.io/v1/checkout/sessions' : 'https://api.bachs.io/v1/checkout/sessions';

    const payload = {
      success_url: `${baseUrl}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout`,
      customer_email: customerEmail,
      customer_name: customerName,
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: item.name,
            images: [item.image.startsWith('http') ? item.image : `${baseUrl}${item.image}`],
            metadata: {
              color: item.color,
              size: item.size,
            }
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      metadata: {
        shipping_address: JSON.stringify(shippingAddress),
      }
    };

    console.log('Sending payload to Bachs:', JSON.stringify(payload, null, 2));

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BACHS_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Bachs API Error Details:', data);
      return NextResponse.json(
        { error: data.error?.message || data.message || 'Payment gateway returned an error' },
        { status: response.status }
      );
    }

    return NextResponse.json({ url: data.url || data.checkout_url });
  } catch (error: any) {
    console.error('Bachs Checkout Exception:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected connection error occurred' },
      { status: 500 }
    );
  }
}
