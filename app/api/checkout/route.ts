import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { 
      orderId,
      customerInfo, 
      shippingMethod, 
      paymentMethod, 
      cart, 
      cartSubtotal, 
      discount,
      shippingCost, 
      orderTotal 
    } = data;

    // We expect standard ZOHO_EMAIL and ZOHO_PASSWORD env variables
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.ZOHO_EMAIL || 'test@example.com',
        pass: process.env.ZOHO_PASSWORD || 'password',
      },
    });

    const itemsListHtml = cart.map((item: any) => 
      `<li>${item.quantity}x ${item.name} (${item.color}, ${item.size}) - £${(item.price * item.quantity).toFixed(2)}</li>`
    ).join('');

    const customerHtml = `
      <h3>Order Details</h3>
      <p><strong>Order Number:</strong> ${orderId || 'N/A'}</p>
      <p><strong>Name:</strong> ${customerInfo.firstName} ${customerInfo.lastName}</p>
      <p><strong>Email:</strong> ${customerInfo.email}</p>
      <p><strong>Phone:</strong> ${customerInfo.phone}</p>
      <p><strong>Address:</strong> ${customerInfo.address}, ${customerInfo.city}, ${customerInfo.postcode}, ${customerInfo.country}</p>
      
      <h3>Order Summary</h3>
      <ul>${itemsListHtml}</ul>
      <p><strong>Subtotal:</strong> £${cartSubtotal.toFixed(2)}</p>
      ${discount && discount > 0 ? `<p><strong>Christmas Discount (COZY-CHRISTMAS):</strong> -£${discount.toFixed(2)}</p>` : ''}
      <p><strong>Shipping (${shippingMethod.label}):</strong> £${shippingCost.toFixed(2)}</p>
      <p><strong>Total:</strong> £${orderTotal.toFixed(2)}</p>
      
      <h3>Payment Method</h3>
      <p>${paymentMethod.label}</p>
    `;

    // Only attempt to send emails if credentials exist, otherwise mock success to avoid blocking checkout in dev
    if (process.env.ZOHO_EMAIL && process.env.ZOHO_PASSWORD) {
      // 1. Email to Admin
      const adminEmail = process.env.ADMIN_EMAIL || process.env.ZOHO_EMAIL;
      await transporter.sendMail({
        from: `"CozyCorobes Store" <${process.env.ZOHO_EMAIL}>`,
        to: adminEmail,
        subject: `New Order Received #${orderId || ''} - ${customerInfo.firstName} ${customerInfo.lastName}`,
        html: `<h2>New Order Received!</h2>${customerHtml}`,
      });

      // 2. Email to Customer
      await transporter.sendMail({
        from: `"CozyCorobes" <${process.env.ZOHO_EMAIL}>`,
        to: customerInfo.email,
        subject: `Order Confirmation #${orderId || ''} - CozyCorobes`,
        html: `<h2>Thank you for your order!</h2>
               <p>Hi ${customerInfo.firstName}, we have received your order <strong>#${orderId || ''}</strong> and are getting it ready for shipment.</p>
               ${customerHtml}
               <p>Our team will contact you shortly with instructions to complete your payment via ${paymentMethod.label}.</p>`,
      });
    } else {
      console.log('Skipping email dispatch: Zoho credentials not found in environment.');
    }

    return NextResponse.json({ success: true, message: 'Order created successfully' });
  } catch (error: any) {
    console.error('Checkout API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
