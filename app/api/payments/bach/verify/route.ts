import { NextRequest, NextResponse } from 'next/server';
import { verifyBachPayment } from '@/lib/bach-payments';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { checkoutId, orderData } = body;

    if (!checkoutId) {
      return NextResponse.json({ success: false, error: 'Missing checkoutId' }, { status: 400 });
    }

    const verification = await verifyBachPayment(checkoutId);

    if (!verification.verified) {
      return NextResponse.json({
        success: false,
        verified: false,
        status: verification.status,
        message: 'Payment not completed or verified yet.',
      });
    }

    // If verified, send order confirmation email if Zoho SMTP is configured
    if (orderData && process.env.ZOHO_EMAIL && process.env.ZOHO_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          host: 'smtp.zoho.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env.ZOHO_EMAIL,
            pass: process.env.ZOHO_PASSWORD,
          },
        });

        const itemsListHtml = (orderData.items || []).map((item: any) => 
          `<li>${item.quantity}x ${item.name} (${item.color}, ${item.size}) - £${(item.price * item.quantity).toFixed(2)}</li>`
        ).join('');

        const customerHtml = `
          <h3>Order Details (#${orderData.id})</h3>
          <p><strong>Name:</strong> ${orderData.customerName}</p>
          <p><strong>Email:</strong> ${orderData.email}</p>
          <p><strong>Payment Method:</strong> Credit / Debit Card (Bachs)</p>
          <p><strong>Shipping Address:</strong> ${orderData.shippingAddress?.address1}, ${orderData.shippingAddress?.city}, ${orderData.shippingAddress?.postalCode}, ${orderData.shippingAddress?.country}</p>
          
          <h3>Order Summary</h3>
          <ul>${itemsListHtml}</ul>
          <p><strong>Subtotal:</strong> £${orderData.subtotal?.toFixed(2)}</p>
          ${orderData.discount > 0 ? `<p><strong>Discount (COZY-CHRISTMAS):</strong> -£${orderData.discount?.toFixed(2)}</p>` : ''}
          <p><strong>Shipping (${orderData.shippingMethod}):</strong> £${orderData.shippingCost?.toFixed(2)}</p>
          <p><strong>Total Charged:</strong> £${orderData.total?.toFixed(2)}</p>
        `;

        const adminEmail = process.env.ADMIN_EMAIL || process.env.ZOHO_EMAIL;

        // Admin email
        await transporter.sendMail({
          from: `"CozyCorobes Store" <${process.env.ZOHO_EMAIL}>`,
          to: adminEmail,
          subject: `Paid Order Received #${orderData.id} (Card via Bachs)`,
          html: `<h2>New Paid Order!</h2>${customerHtml}`,
        });

        // Customer email
        await transporter.sendMail({
          from: `"CozyCorobes" <${process.env.ZOHO_EMAIL}>`,
          to: orderData.email,
          subject: `Order Confirmation #${orderData.id} - CozyCorobes`,
          html: `<h2>Thank you for your order!</h2>
                 <p>Hi ${orderData.customerName}, your card payment was successfully verified and your order <strong>#${orderData.id}</strong> is now being prepared for shipment.</p>
                 ${customerHtml}
                 <p>You can track your order anytime on our store. Thank you for shopping with CozyCorobes!</p>`,
        });
      } catch (emailErr) {
        console.error('Email dispatch error on Bach verification:', emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      verified: true,
      status: verification.status,
    });
  } catch (error: any) {
    console.error('Bachs Verification API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to verify Bach payment' },
      { status: 500 }
    );
  }
}
