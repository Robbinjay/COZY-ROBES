'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { CartItem, Product, StoreConfig, Order, CustomerUser, CustomerAddress } from './types';
import { DEFAULT_STORE_CONFIG, PRODUCTS } from './store-data';

interface StoreContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, color: string, size: string, quantity?: number, openDrawer?: boolean) => void;
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
  createOrder: (orderData: Omit<Order, 'id' | 'date' | 'status'>, orderId?: string) => Order;
  findOrder: (orderId: string, email: string) => Order | undefined;
  lookupOrder: (orderId: string, email?: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Customer Account management (WordPress/WooCommerce style)
  customer: CustomerUser | null;
  loginCustomer: (email: string, password?: string) => { success: boolean; message?: string };
  registerCustomer: (data: {
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    shippingAddress?: CustomerAddress;
    billingAddress?: CustomerAddress;
  }) => { success: boolean; message?: string };
  logoutCustomer: () => void;
  updateCustomerProfile: (data: Partial<CustomerUser>) => void;
  updateCustomerAddresses: (billing?: CustomerAddress, shipping?: CustomerAddress) => void;
  getCustomerOrders: () => Order[];
}

const StoreContext = createContext<StoreContextType | null>(null);

const CART_STORAGE_KEY = 'cozyrobe_cart_v2';
const CONFIG_STORAGE_KEY = 'cozyrobe_config_v2';
const ORDERS_STORAGE_KEY = 'cozyrobe_orders_v2';
const CUSTOMER_STORAGE_KEY = 'cozyrobe_customer_v2';
const USERS_LIST_STORAGE_KEY = 'cozyrobe_registered_users_v2';

export const DEMO_CUSTOMER: CustomerUser = {
  id: 'cust-sarah-jenkins',
  email: 'customer@example.com',
  firstName: 'Sarah',
  lastName: 'Jenkins',
  displayName: 'Sarah',
  createdAt: '2026-08-15',
  billingAddress: {
    firstName: 'Sarah',
    lastName: 'Jenkins',
    address1: '14 Kensington Church Street',
    address2: 'Flat 3B',
    city: 'London',
    county: 'Greater London',
    postcode: 'W8 4EP',
    country: 'United Kingdom',
    phone: '07700 900142',
  },
  shippingAddress: {
    firstName: 'Sarah',
    lastName: 'Jenkins',
    address1: '14 Kensington Church Street',
    address2: 'Flat 3B',
    city: 'London',
    county: 'Greater London',
    postcode: 'W8 4EP',
    country: 'United Kingdom',
    phone: '07700 900142',
  },
};

// Seed realistic sample orders for WooCommerce-style order tracking
const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'CCR-782194',
    date: '2026-09-14',
    email: 'customer@example.com',
    customerName: 'Sarah Jenkins',
    shippingAddress: {
      address1: '14 Kensington Church Street',
      address2: 'Flat 3B',
      city: 'London',
      state: 'Greater London',
      postalCode: 'W8 4EP',
      country: 'United Kingdom',
    },
    shippingMethod: 'Royal Mail Tracked 48 (Free UK Delivery)',
    items: [
      {
        productId: 'prod-cozy-co-robe',
        name: 'The Cozy Co. Robe',
        color: 'Charcoal',
        size: 'One Size (Unisex)',
        quantity: 1,
        price: 69.99,
        image: '/images/featured_robe_studio.jpg',
      },
      {
        productId: 'prod-cozyco-foot-warmer',
        name: 'CozyCo Foot Warmer',
        color: 'Standard',
        size: 'One Size',
        quantity: 1,
        price: 12.99,
        image: '/images/cozyco_foot_warmer.avif',
      },
    ],
    subtotal: 82.98,
    discount: 0,
    shippingCost: 0,
    tax: 0.00,
    total: 82.98,
    status: 'Processing',
    carrier: 'Royal Mail Tracked 48',
    estimatedDelivery: 'September 22, 2026',
  },
  {
    id: 'CCR-651902',
    date: '2026-08-20',
    email: 'customer@example.com',
    customerName: 'Sarah Jenkins',
    shippingAddress: {
      address1: '14 Kensington Church Street',
      address2: 'Flat 3B',
      city: 'London',
      state: 'Greater London',
      postalCode: 'W8 4EP',
      country: 'United Kingdom',
    },
    shippingMethod: 'Royal Mail Tracked 24',
    items: [
      {
        productId: 'prod-cozyco-pillow',
        name: 'CozyCo Cloud Pillow',
        color: 'Standard',
        size: 'Standard Ergonomic (60x40cm)',
        quantity: 1,
        price: 19.99,
        image: '/images/cozyco_cloud_pillow.png',
      },
    ],
    subtotal: 19.99,
    discount: 0,
    shippingCost: 6.99,
    tax: 0.00,
    total: 26.98,
    status: 'Delivered',
    carrier: 'Royal Mail Tracked 24',
    estimatedDelivery: 'August 22, 2026',
  },
];

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [config, setConfig] = useState<StoreConfig>(DEFAULT_STORE_CONFIG);
  const [orders, setOrders] = useState<Order[]>(INITIAL_DEMO_ORDERS);
  const [customer, setCustomer] = useState<CustomerUser | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<CustomerUser[]>([DEMO_CUSTOMER]);
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
          // Migrate legacy £150 threshold to £100 threshold
          if (parsed?.shipping?.freeShippingThreshold !== 130) {
            parsed.shipping.freeShippingThreshold = 130;
          }
          if (parsed?.announcementBar?.text?.includes('150')) {
            parsed.announcementBar.text = DEFAULT_STORE_CONFIG.announcementBar.text;
          }
          if (parsed?.socialLinks?.whatsapp?.includes('447000000000') || !parsed?.socialLinks?.whatsapp) {
            if (!parsed.socialLinks) parsed.socialLinks = {};
            parsed.socialLinks.whatsapp = 'https://wa.me/447402233804';
          }
          if (!parsed?.brand?.phone || parsed?.brand?.phone?.includes('0912')) {
            if (!parsed.brand) parsed.brand = {};
            parsed.brand.phone = '+44 7402233804';
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
        const savedUsers = localStorage.getItem(USERS_LIST_STORAGE_KEY);
        let currentUsers = [DEMO_CUSTOMER];
        if (savedUsers) {
          const parsed = JSON.parse(savedUsers);
          if (Array.isArray(parsed) && parsed.length > 0) {
            currentUsers = parsed;
            setRegisteredUsers(parsed);
          }
        }
        const savedCustomer = localStorage.getItem(CUSTOMER_STORAGE_KEY);
        if (savedCustomer) {
          setCustomer(JSON.parse(savedCustomer));
        } else {
          // Default to demo customer logged in so customer can immediately explore the account page
          setCustomer(DEMO_CUSTOMER);
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

  // Save customer and users
  useEffect(() => {
    if (!isInitialized) return;
    try {
      if (customer) {
        localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customer));
      } else {
        localStorage.removeItem(CUSTOMER_STORAGE_KEY);
      }
      localStorage.setItem(USERS_LIST_STORAGE_KEY, JSON.stringify(registeredUsers));
    } catch {
      // ignore
    }
  }, [customer, registeredUsers, isInitialized]);

  const addToCart = (product: Product, color: string, size: string, quantity = 1, openDrawer = true) => {
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
    if (openDrawer) {
      setIsCartOpen(true);
    }
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

  const createOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>, orderId?: string): Order => {
    const newOrder: Order = {
      ...orderData,
      id: orderId || `CCR-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Order Placed',
      carrier: 'Royal Mail',
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

  const loginCustomer = (email: string): { success: boolean; message?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      setCustomer(existing);
      return { success: true };
    }
    const newCust: CustomerUser = {
      id: `cust-${Date.now()}`,
      email: cleanEmail,
      firstName: cleanEmail.split('@')[0],
      lastName: '',
      displayName: cleanEmail.split('@')[0],
      createdAt: new Date().toISOString().split('T')[0],
    };
    setRegisteredUsers((prev) => [...prev, newCust]);
    setCustomer(newCust);
    return { success: true };
  };

  const registerCustomer = (data: {
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    shippingAddress?: CustomerAddress;
    billingAddress?: CustomerAddress;
  }): { success: boolean; message?: string } => {
    const cleanEmail = data.email.trim().toLowerCase();
    const existing = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, message: 'An account is already registered with this email address. Please log in.' };
    }
    const newCust: CustomerUser = {
      id: `cust-${Date.now()}`,
      email: cleanEmail,
      firstName: data.firstName.trim() || cleanEmail.split('@')[0],
      lastName: data.lastName.trim(),
      displayName: data.firstName.trim() || cleanEmail.split('@')[0],
      createdAt: new Date().toISOString().split('T')[0],
      billingAddress: data.billingAddress || {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        address1: '',
        city: '',
        postcode: '',
        country: 'United Kingdom',
      },
      shippingAddress: data.shippingAddress || {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        address1: '',
        city: '',
        postcode: '',
        country: 'United Kingdom',
      },
    };
    setRegisteredUsers((prev) => [...prev, newCust]);
    setCustomer(newCust);
    return { success: true };
  };

  const logoutCustomer = () => {
    setCustomer(null);
  };

  const updateCustomerProfile = (data: Partial<CustomerUser>) => {
    if (!customer) return;
    const updated = { ...customer, ...data };
    setCustomer(updated);
    setRegisteredUsers((prev) =>
      prev.map((u) => (u.id === customer.id ? updated : u))
    );
  };

  const updateCustomerAddresses = (billing?: CustomerAddress, shipping?: CustomerAddress) => {
    if (!customer) return;
    const updated: CustomerUser = {
      ...customer,
      billingAddress: billing !== undefined ? billing : customer.billingAddress,
      shippingAddress: shipping !== undefined ? shipping : customer.shippingAddress,
    };
    setCustomer(updated);
    setRegisteredUsers((prev) =>
      prev.map((u) => (u.id === customer.id ? updated : u))
    );
  };

  const getCustomerOrders = (): Order[] => {
    if (!customer) return [];
    const custEmail = customer.email.toLowerCase();
    const matching = orders.filter((o) => o.email.toLowerCase() === custEmail);
    if (matching.length > 0) return matching;
    return orders;
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
        customer,
        loginCustomer,
        registerCustomer,
        logoutCustomer,
        updateCustomerProfile,
        updateCustomerAddresses,
        getCustomerOrders,
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
