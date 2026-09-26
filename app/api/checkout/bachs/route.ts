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

    // Create a Bachs Checkout Session
    const session = await (bachs.checkoutSessions.create as any)({
      success_url: `${baseUrl}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout`,
      customer: {
        email: customerEmail,
        name: customerName,
      },
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: item.name,
            images: [item.image.startsWith('http') ? item.image : `${process.env.APP_URL || ''}${item.image}`],
            metadata: {
              color: item.color,
              size: item.size,
            }
          },
          unit_amount: Math.round(item.price * 100), // in cents/pence
        },
        quantity: item.quantity,
      })),
      metadata: {
        shipping_address: JSON.stringify(shippingAddress),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Bachs Checkout Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
