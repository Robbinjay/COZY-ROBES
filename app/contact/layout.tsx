import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | CozyCorobes Customer Support',
  description:
    'Send our team a message on our contact form — we reply within minutes. Connected directly to our admin desk for order help, heating advice, and returns.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
