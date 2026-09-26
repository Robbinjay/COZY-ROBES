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

    const bachs = new Bachs({ apiKey: process.env.BACHS_API_KEY });

    // Retrieve the session from Bachs
    const session = await (bachs.checkoutSessions as any).get(sessionId);

    if (!session || session.status !== 'complete') {
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
    console.error('Bachs Verify Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to verify checkout session' },
      { status: 500 }
    );
  }
}
