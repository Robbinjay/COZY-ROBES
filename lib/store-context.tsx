'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { CartItem, Product, StoreConfig, Order } from './types';
import { DEFAULT_STORE_CONFIG, PRODUCTS } from './store-data';

interface StoreContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, color: string, size: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  freeShippingRemaining: number;
  isFreeShippingEligible: boolean;
  
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  
  config: StoreConfig;
  updateConfig: (newConfig: Partial<StoreConfig>) => void;
  resetConfig: () => void;

  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'date' | 'status'>) => Order;
  findOrder: (orderId: string, email: string) => Order | undefined;
  lookupOrder: (orderId: string, email?: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

const CART_STORAGE_KEY = 'cozyrobe_cart_v2';
const CONFIG_STORAGE_KEY = 'cozyrobe_config_v2';
const ORDERS_STORAGE_KEY = 'cozyrobe_orders_v2';

// Seed a realistic sample order for quick testing in Track Order
const INITIAL_DEMO_ORDER: Order = {
  id: 'CCR-782194',
  date: '2026-09-14',
  email: 'customer@example.com',
  customerName: 'Sarah Jenkins',
  shippingAddress: {
    address1: '14 Kensington Church Street',
    city: 'London',
    state: 'Greater London',
    postalCode: 'W8 4EP',
    country: 'United Kingdom',
  },
  shippingMethod: 'Royal Mail Tracked 48 (Free UK Delivery)',
  items: [],
  subtotal: 0,
  discount: 0,
  shippingCost: 0,
  tax: 0.00,
  total: 0,
  status: 'Shipped',
  trackingNumber: 'GB940011189922UK',
  carrier: 'Royal Mail',
  estimatedDelivery: 'September 18, 2026',
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [config, setConfig] = useState<StoreConfig>(DEFAULT_STORE_CONFIG);
  const [orders, setOrders] = useState<Order[]>([INITIAL_DEMO_ORDER]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load persisted state on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
        const savedConfig = localStorage.getItem(CONFIG_STORAGE_KEY);
        if (savedConfig) {
          const parsed = JSON.parse(savedConfig);
          // Migrate legacy £100 threshold to new £150 threshold
          if (parsed?.shipping?.freeShippingThreshold === 100) {
            parsed.shipping.freeShippingThreshold = 150;
          }
          if (parsed?.announcementBar?.text?.includes('100')) {
            parsed.announcementBar.text = DEFAULT_STORE_CONFIG.announcementBar.text;
          }
          setConfig({ ...DEFAULT_STORE_CONFIG, ...parsed });
        }
        const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
        if (savedOrders) {
          const parsed = JSON.parse(savedOrders);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setOrders(parsed);
          }
        }
      } catch {
        // Fallback silently if localStorage blocked
      }
      setIsInitialized(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Save cart changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart, isInitialized]);

  // Save config changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    } catch {
      // ignore
    }
  }, [config, isInitialized]);

  // Save orders changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders, isInitialized]);

  const addToCart = (product: Product, color: string, size: string, quantity = 1) => {
    const itemId = `${product.id}-${color.toLowerCase().replace(/\s+/g, '-')}-${size.toLowerCase().replace(/\s+/g, '-')}`;
    
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          productSlug: product.slug,
          name: product.name,
          image: product.images[0] || '/images/featured_robe_studio.jpg',
          price: product.price,
          color,
          size,
          quantity,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateConfig = (newConfig: Partial<StoreConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const resetConfig = () => {
    setConfig(DEFAULT_STORE_CONFIG);
    try {
      localStorage.removeItem(CONFIG_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `CCR-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Order Placed',
      carrier: 'Royal Mail Tracked 48',
      trackingNumber: `GB${Math.floor(100000000 + Math.random() * 900000000)}GB`,
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const findOrder = (orderId: string, email: string): Order | undefined => {
    const normalizedId = orderId.trim().toUpperCase();
    const normalizedEmail = email.trim().toLowerCase();
    return orders.find(
      (o) =>
        o.id.toUpperCase() === normalizedId &&
        o.email.toLowerCase() === normalizedEmail
    );
  };

  const lookupOrder = (orderId: string, email?: string): Order | undefined => {
    const normalizedId = orderId.trim().toUpperCase();
    if (!email) {
      return orders.find((o) => o.id.toUpperCase() === normalizedId);
    }
    const normalizedEmail = email.trim().toLowerCase();
    return orders.find(
      (o) =>
        o.id.toUpperCase() === normalizedId &&
        (!email || o.email.toLowerCase() === normalizedEmail)
    );
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  const cartSubtotal = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart]);
  const freeShippingThreshold = config.shipping.freeShippingThreshold;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - cartSubtotal);
  const isFreeShippingEligible = cartSubtotal >= freeShippingThreshold;

  return (
    <StoreContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        freeShippingRemaining,
        isFreeShippingEligible,
        isSearchOpen,
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        config,
        updateConfig,
        resetConfig,
        orders,
        createOrder,
        findOrder,
        lookupOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
