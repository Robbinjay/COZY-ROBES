import { NextRequest, NextResponse } from 'next/server';
import { Bachs } from 'bachs-sdk';

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    if (!process.env.BACHS_API_KEY) {
      return NextResponse.json(
        { error: 'Bachs API key not configured' },
        { status: 500 }
      );
    }

    const isSandbox = process.env.BACHS_API_KEY.startsWith('sk_sandbox_');
    const apiUrl = isSandbox ? `https://sandbox-api.bachs.io/v1/checkout/sessions/${sessionId}` : `https://api.bachs.io/v1/checkout/sessions/${sessionId}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.BACHS_API_KEY}`,
      },
    });

    const session = await response.json();

    if (!response.ok) {
      console.error('Bachs Verify API Error:', session);
      return NextResponse.json(
        { error: session.error?.message || session.message || 'Verification failed' },
        { status: response.status }
      );
    }

    if (session.status !== 'complete' && session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      id: session.id,
      amount_total: session.amount_total,
      currency: session.currency,
      customer_details: session.customer_details,
      metadata: session.metadata,
      line_items: session.line_items,
    });
  } catch (error: any) {
    console.error('Bachs Verify Exception:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to verify checkout session' },
      { status: 500 }
    );
  }
}
