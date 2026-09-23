import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, orderNumber, message } = body;

    // Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please enter your name.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please enter your message.' },
        { status: 400 }
      );
    }

    const safeName = name.trim();
    const safeEmail = email.trim();
    const safeSubject = (subject && typeof subject === 'string' ? subject.trim() : 'General Inquiry');
    const safeOrderNumber = (orderNumber && typeof orderNumber === 'string' ? orderNumber.trim() : '');
    const safeMessage = message.trim();
    const timestamp = new Date().toLocaleString('en-GB', {
      timeZone: 'Europe/London',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const zohoUser = process.env.ZOHO_EMAIL;
    const zohoPass = process.env.ZOHO_PASSWORD;
    const adminEmail = process.env.ADMIN_EMAIL || zohoUser || 'support@cozyrobe.co.uk';
    const smtpHost = process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com';
    const smtpPort = Number(process.env.ZOHO_SMTP_PORT) || 465;

    // HTML email template for Admin received in Zoho Mail
    const adminEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; margin: 0; padding: 24px; color: #2B2623; }
    .card { max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #EAE3D9; border-radius: 4px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .header { background: #2B2623; color: #FFFFFF; padding: 20px 24px; }
    .header h1 { margin: 0; font-size: 18px; font-weight: 700; letter-spacing: 0.5px; }
    .header p { margin: 4px 0 0; font-size: 12px; color: #D9D0C3; text-transform: uppercase; letter-spacing: 1px; }
    .content { padding: 24px; }
    .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px; }
    .meta-table td { padding: 8px 12px; border-bottom: 1px solid #F0EBE1; }
    .meta-table td.label { width: 30%; font-weight: 700; color: #736B63; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; }
    .meta-table td.value { color: #2B2623; font-weight: 500; }
    .message-box { background: #FAF5EE; border-left: 3px solid #8C6A54; padding: 16px; margin: 16px 0; border-radius: 2px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; word-break: break-word; color: #2B2623; }
    .action-notice { background: #EBF7EE; border: 1px solid #CDE9D2; padding: 12px 16px; border-radius: 4px; font-size: 12px; color: #2E7D32; margin-top: 20px; line-height: 1.5; }
    .footer { background: #FAF8F5; border-top: 1px solid #EAE3D9; padding: 14px 24px; text-align: center; font-size: 11px; color: #8A8177; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>New Customer Inquiry</h1>
      <p>CozyCorobes Online Contact Form</p>
    </div>
    <div class="content">
      <table class="meta-table">
        <tr>
          <td class="label">Customer Name</td>
          <td class="value"><strong>${safeName}</strong></td>
        </tr>
        <tr>
          <td class="label">Customer Email</td>
          <td class="value"><a href="mailto:${safeEmail}" style="color: #8C6A54; text-decoration: underline;">${safeEmail}</a></td>
        </tr>
        <tr>
          <td class="label">Topic / Subject</td>
          <td class="value"><strong>${safeSubject}</strong></td>
        </tr>
        ${safeOrderNumber ? `
        <tr>
          <td class="label">Order Reference</td>
          <td class="value"><strong style="font-family: monospace;">${safeOrderNumber}</strong></td>
        </tr>` : ''}
        <tr>
          <td class="label">Received At</td>
          <td class="value">${timestamp} (UK)</td>
        </tr>
      </table>

      <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #736B63; margin: 16px 0 6px;">Customer Message</h3>
      <div class="message-box">${safeMessage.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>

      <div class="action-notice">
        <strong>Direct Reply:</strong> Click <em>&ldquo;Reply&rdquo;</em> in your Zoho Mail client to send your response directly to <strong>${safeName}</strong> at <strong>${safeEmail}</strong>.
      </div>
    </div>
    <div class="footer">
      CozyCorobes UK Support Desk &bull; London, United Kingdom &bull; Automated Dispatch
    </div>
  </div>
</body>
</html>
    `;

    // Customer confirmation email template
    const customerEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; margin: 0; padding: 24px; color: #2B2623; }
    .card { max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #EAE3D9; border-radius: 4px; overflow: hidden; }
    .header { background: #2B2623; color: #FFFFFF; padding: 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 700; font-family: Georgia, serif; }
    .content { padding: 24px; font-size: 14px; line-height: 1.6; color: #47403C; }
    .summary-box { background: #FAF5EE; border: 1px solid #EAE3D9; padding: 16px; border-radius: 4px; margin: 16px 0; }
    .footer { background: #FAF8F5; border-top: 1px solid #EAE3D9; padding: 16px; text-align: center; font-size: 12px; color: #8A8177; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>CozyCorobes</h1>
    </div>
    <div class="content">
      <h2 style="font-size: 18px; color: #2B2623; margin-top: 0;">We&rsquo;ve received your message!</h2>
      <p>Hi ${safeName},</p>
      <p>Thank you for reaching out to CozyCorobes regarding <strong>${safeSubject}</strong>. Our UK customer care specialists have received your inquiry.</p>
      <p style="background: #EBF7EE; border-left: 3px solid #2E7D32; padding: 12px 16px; color: #2E7D32; font-weight: 600;">
        We reply within minutes during operational hours (Mon–Fri 9am–6pm, Sat 10am–4pm GMT).
      </p>
      
      <div class="summary-box">
        <strong style="color: #2B2623; display: block; margin-bottom: 8px;">Copy of your message:</strong>
        <p style="margin: 0; color: #5C554F; white-space: pre-wrap;">${safeMessage.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
      </div>

      <p>One of our team members will email you back at <strong>${safeEmail}</strong> very shortly.</p>
      <p>Warmest regards,<br><strong>The CozyCorobes Team</strong></p>
    </div>
    <div class="footer">
      CozyCorobes &bull; 71–75 Shelton Street, Covent Garden, London, WC2H 9JQ &bull; support@cozyrobe.co.uk
    </div>
  </div>
</body>
</html>
    `;

    // Check if Zoho credentials are present in environment
    if (zohoUser && zohoPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: zohoUser,
          pass: zohoPass,
        },
      });

      // 1. Dispatch message to Admin via Zoho Mail
      // Setting replyTo to the customer's email allows the admin to simply hit "Reply" in Zoho Mail!
      await transporter.sendMail({
        from: `"CozyCorobes Contact Desk" <${zohoUser}>`,
        to: adminEmail,
        replyTo: `"${safeName}" <${safeEmail}>`,
        subject: `[Customer Inquiry] ${safeSubject}: ${safeName}${safeOrderNumber ? ` (#${safeOrderNumber})` : ''}`,
        text: `New customer inquiry received:\n\nName: ${safeName}\nEmail: ${safeEmail}\nTopic: ${safeSubject}\nOrder Number: ${safeOrderNumber || 'N/A'}\nTime: ${timestamp}\n\nMessage:\n${safeMessage}\n\n(Hit Reply to respond directly to ${safeName} at ${safeEmail})`,
        html: adminEmailHtml,
      });

      // 2. Dispatch polite auto-acknowledgment to customer
      try {
        await transporter.sendMail({
          from: `"CozyCorobes Support" <${zohoUser}>`,
          to: safeEmail,
          subject: `We've received your inquiry - CozyCorobes Support`,
          text: `Hi ${safeName},\n\nThank you for reaching out to CozyCorobes. We have received your inquiry regarding "${safeSubject}". We reply within minutes during operational hours.\n\nCopy of your message:\n${safeMessage}\n\nWarm regards,\nThe CozyCorobes Team`,
          html: customerEmailHtml,
        });
      } catch (custEmailErr) {
        console.warn('Customer auto-acknowledgment warning:', custEmailErr);
        // Non-blocking: admin email was already delivered successfully
      }

      return NextResponse.json({
        success: true,
        message: 'Your message has been received! We will reply within minutes.',
        delivered: true,
      });
    } else {
      // Development / Preview mode when Zoho credentials have not been configured yet
      console.log('==============================================');
      console.log('[Contact Form] New customer message received:');
      console.log('From:', safeName, `<${safeEmail}>`);
      console.log('Topic:', safeSubject);
      if (safeOrderNumber) console.log('Order Reference:', safeOrderNumber);
      console.log('Message:', safeMessage);
      console.log('Admin Destination:', adminEmail);
      console.log('Note: ZOHO_EMAIL and ZOHO_PASSWORD are not yet set in .env. When configured, emails are dispatched via Zoho SMTP with customer Reply-To.');
      console.log('==============================================');

      return NextResponse.json({
        success: true,
        message: 'Your message has been received! We reply within minutes.',
        delivered: false,
        previewMode: true,
      });
    }
  } catch (error: any) {
    console.error('Contact Form API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send message. Please try again or email us directly.' },
      { status: 500 }
    );
  }
}
