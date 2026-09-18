export interface ProductVariant {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  size: string;
  inStock: boolean;
  sku: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  category: 'heated-robes' | 'cozy-accessories';
  featured: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  images: string[];
  description: string;
  features: string[];
  specs: ProductSpec[];
  howItWorks: string[];
  careInstructions: string[];
  colors: { name: string; hex: string; inStock: boolean }[];
  sizes: string[];
  variants: ProductVariant[];
  inStock: boolean;
  shippingNote: string;
}

export interface Collection {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  metaTitle: string;
  metaDescription: string;
}

export interface CartItem {
  id: string; // unique item id: productId-color-size
  productId: string;
  productSlug: string;
  name: string;
  image: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string; // e.g. CCR-89421
  date: string;
  email: string;
  customerName: string;
  shippingAddress: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  shippingMethod: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  tax: number;
  total: number;
  status: 'Order Placed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
}

export interface StoreConfig {
  announcementBar: {
    enabled: boolean;
    text: string;
    linkText?: string;
    linkUrl?: string;
  };
  brand: {
    name: string;
    domain: string;
    tagline: string;
    supportEmail: string;
    supportHours: string;
    phone?: string;
    address: string;
  };
  shipping: {
    freeShippingThreshold: number;
    standardShippingRate: number;
    expressShippingRate: number;
    processingTime: string;
    deliveryTime: string;
  };
  returns: {
    returnWindowDays: number;
    policySummary: string;
  };
  socialLinks: {
    instagram?: string;
    pinterest?: string;
    facebook?: string;
    tiktok?: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Products' | 'Orders' | 'Shipping' | 'Returns' | 'Care Instructions';
}

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishedDate: string;
  updatedDate: string;
  readingTime: string;
  category: string;
  content: string;
  relatedProductSlugs: string[];
}
