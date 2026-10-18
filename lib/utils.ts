import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const CURRENCY_SYMBOL = '£';
export const CURRENCY_CODE = 'GBP';

export function formatPrice(amount: number): string {
  return `${CURRENCY_SYMBOL}${amount.toFixed(2)}`;
}

export const WHATSAPP_PHONE_DISPLAY = '+44 7402233804';
export const WHATSAPP_PHONE_CLEAN = '447402233804';
export const WHATSAPP_BASE_URL = 'https://wa.me/447402233804';

export function getWhatsAppSupportUrl(customMessage?: string): string {
  const text = customMessage || 'Hello Cozy Robe, I would like to place an order via WhatsApp. How do i proceed';
  return `https://wa.me/${WHATSAPP_PHONE_CLEAN}?text=${encodeURIComponent(text)}`;
}

export function getWhatsAppProductOrderUrl(
  productName: string,
  color?: string,
  size?: string,
  quantity: number = 1,
  price?: number
): string {
  let message = `Hello Cozy Robe, I would like to place an order via WhatsApp. How do i proceed\n\n• Item: ${productName}`;
  if (color) message += `\n• Colour: ${color}`;
  if (size) message += `\n• Size: ${size}`;
  message += `\n• Quantity: ${quantity}`;
  if (price !== undefined) message += `\n• Price: £${(price * quantity).toFixed(2)}`;
  message += `\n\nPlease let me know the payment details and delivery steps. Thank you!`;
  return `https://wa.me/${WHATSAPP_PHONE_CLEAN}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppCartOrderUrl(
  items: Array<{ name: string; color?: string; size?: string; quantity: number; price: number }>,
  total: number
): string {
  if (!items || items.length === 0) {
    return getWhatsAppSupportUrl('Hello Cozy Robe, I would like to place an order via WhatsApp. How do i proceed');
  }
  let message = `Hello Cozy Robe, I would like to place an order via WhatsApp. How do i proceed\n\nItems in my order:\n`;
  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name} (${item.color || 'Standard'}, ${item.size || 'One Size'}) x${item.quantity} - £${(item.price * item.quantity).toFixed(2)}\n`;
  });
  message += `\nEstimated Total: £${total.toFixed(2)}`;
  message += `\n\nPlease send me payment instructions and confirm my order. Thank you!`;
  return `https://wa.me/${WHATSAPP_PHONE_CLEAN}?text=${encodeURIComponent(message)}`;
}
