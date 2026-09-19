'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Menu, X, User, ArrowRight, ChevronDown } from 'lucide-react';
import { useStore } from '@/lib/store-context';

export default function Header() {
  const pathname = usePathname();
  const { cartCount, openCart, openSearch, config } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(true);
  const [isShopHovered, setIsShopHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setIsShopHovered(false);
  }

  const productCategories = [
    {
      name: 'All Products',
      href: '/shop',
      description: 'Explore our complete winter warmth catalog',
      badge: null,
    },
    {
      name: 'Heated Robes',
      href: '/collections/heated-robes',
      description: 'Flagship electric wearable blankets & plush heating robes',
      badge: 'Best Seller',
    },
    {
      name: 'Cozy Accessories',
      href: '/collections/cozy-accessories',
      description: 'Electric foot warmers, memory foam pillows & mittens',
      badge: null,
    },
    {
      name: 'New Arrivals',
      href: '/collections/new-arrivals',
      description: 'Newly released winter essentials & colorways',
      badge: 'New',
    },
  ];

  const otherNavLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Blog', href: '/blog' },
  ];

  const isShopActive = pathname === '/shop' || pathname.startsWith('/collections/');

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs border-b border-[#EAE3D9]'
          : 'bg-[#FAF8F5] border-b border-[#F0EBE1]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Mobile hamburger button */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#2B2623] hover:text-[#8C6A54] rounded-md transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Left: Brand Logo / Wordmark */}
          <div className="flex items-center">
            <Link
              id="brand-logo-link"
              href="/"
              className="group flex items-baseline gap-1.5 focus-visible:ring-2 focus-visible:ring-[#8C6A54] rounded-sm"
            >
              <span className="font-serif text-2xl sm:text-2xl font-bold tracking-tight text-[#2B2623] group-hover:text-[#634E3F] transition-colors">
                {config.brand.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B86246] inline-block" />
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav
            id="desktop-main-navigation"
            aria-label="Main Navigation"
            className="hidden lg:flex items-center space-x-7 ml-8"
          >
            {/* Home Link */}
            <Link
              id="nav-link-home"
              href="/"
              className={`text-sm tracking-wide font-medium transition-colors py-1 relative ${
                pathname === '/'
                  ? 'text-[#2B2623] font-semibold'
                  : 'text-[#5C554F] hover:text-[#2B2623]'
              }`}
            >
              Home
              {pathname === '/' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C6A54] rounded-full" />
              )}
            </Link>

            {/* Shop with Hover Dropdown */}
            <div
              className="relative py-3 group"
              onMouseEnter={() => setIsShopHovered(true)}
              onMouseLeave={() => setIsShopHovered(false)}
            >
              <div className="flex items-center gap-1 cursor-pointer">
                <Link
                  id="nav-link-shop"
                  href="/shop"
                  className={`text-sm tracking-wide font-medium transition-colors py-1 relative flex items-center gap-1 ${
                    isShopActive
                      ? 'text-[#2B2623] font-semibold'
                      : 'text-[#5C554F] hover:text-[#2B2623]'
                  }`}
                >
                  <span>Shop</span>
                  {isShopActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C6A54] rounded-full" />
                  )}
                </Link>
                <button
                  type="button"
                  aria-expanded={isShopHovered}
                  aria-haspopup="true"
                  className="text-[#8C6A54] hover:text-[#2B2623] transition-colors p-0.5"
                  onClick={() => setIsShopHovered(!isShopHovered)}
                  aria-label="Toggle Shop categories dropdown"
                >
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isShopHovered ? 'rotate-180' : 'group-hover:rotate-180'
                    }`}
                  />
                </button>
              </div>

              {/* Hover Dropdown Menu */}
              <div
                id="shop-category-dropdown"
                className={`absolute top-full left-0 pt-1.5 w-76 z-50 transition-all duration-200 ${
                  isShopHovered
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible -translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto'
                }`}
              >
                <div className="bg-white rounded-sm border border-[#EAE3D9] shadow-[0_14px_35px_-8px_rgba(43,38,35,0.14)] p-2">
                  <div className="px-3 py-1.5 border-b border-[#F5EFE6] mb-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A54]">
                      Product Categories
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    {productCategories.map((cat) => {
                      const isCatActive = pathname === cat.href;
                      return (
                        <Link
                          key={cat.href}
                          id={`dropdown-cat-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                          href={cat.href}
                          onClick={() => setIsShopHovered(false)}
                          className={`group/item block px-3 py-2 rounded-xs transition-colors ${
                            isCatActive ? 'bg-[#FAF5EE]' : 'hover:bg-[#FAF5EE]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#2B2623] group-hover/item:text-[#8C6A54] transition-colors">
                              {cat.name}
                            </span>
                            {cat.badge && (
                              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#FAF0E6] text-[#8C6A54] border border-[#E8DCCB]">
                                {cat.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#736B63] mt-0.5 leading-snug">
                            {cat.description}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="pt-2 mt-1.5 border-t border-[#F5EFE6] px-3 pb-1">
                    <Link
                      href="/shipping"
                      onClick={() => setIsShopHovered(false)}
                      className="text-[11px] text-[#8C6A54] hover:text-[#2B2623] font-medium flex items-center justify-between transition-colors"
                    >
                      <span>Free UK Delivery over £100</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Navigation Links: About Us, FAQ, Blog */}
            {otherNavLinks.slice(1).map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  href={link.href}
                  className={`text-sm tracking-wide font-medium transition-colors py-1 relative ${
                    isActive
                      ? 'text-[#2B2623] font-semibold'
                      : 'text-[#5C554F] hover:text-[#2B2623]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C6A54] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions (Search, Account / Track Order, Cart) */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              id="header-search-btn"
              type="button"
              onClick={openSearch}
              className="p-2 text-[#4A453F] hover:text-[#2B2623] hover:bg-[#F2ECE4] rounded-full transition-colors"
              aria-label="Search products and guides"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              id="header-account-link"
              href="/track-order"
              className="hidden sm:flex items-center gap-1.5 p-2 text-[#4A453F] hover:text-[#2B2623] hover:bg-[#F2ECE4] rounded-full transition-colors text-sm font-medium"
              title="Track Your Order"
              aria-label="Track Order & Customer Account"
            >
              <User className="w-5 h-5" />
              <span className="hidden xl:inline text-xs font-normal text-[#736B63]">Track Order</span>
            </Link>

            <button
              id="header-cart-btn"
              type="button"
              onClick={openCart}
              className="relative p-2 text-[#2B2623] hover:bg-[#F2ECE4] rounded-full transition-colors flex items-center gap-1"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span
                  id="header-cart-badge"
                  className="absolute -top-0.5 -right-0.5 bg-[#2B2623] text-[#FAF8F5] text-[11px] font-bold h-4.5 w-4.5 rounded-full flex items-center justify-center border-2 border-[#FAF8F5]"
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden fixed inset-x-0 top-16 sm:top-18 bg-[#FAF8F5] border-b border-[#EAE3D9] shadow-xl px-6 py-6 transition-all animate-fadeIn max-h-[calc(100vh-4.5rem)] overflow-y-auto"
        >
          <nav className="flex flex-col space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-medium py-1.5 transition-colors flex items-center justify-between ${
                pathname === '/' ? 'text-[#2B2623] font-semibold' : 'text-[#5C554F]'
              }`}
            >
              <span>Home</span>
              <ArrowRight className="w-4 h-4 text-[#A89F95]" />
            </Link>

            {/* Mobile Shop with Collapsible Categories */}
            <div className="py-1">
              <div className="flex items-center justify-between py-1">
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors ${
                    isShopActive ? 'text-[#2B2623] font-semibold' : 'text-[#5C554F]'
                  }`}
                >
                  <span>Shop</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileShopOpen(!mobileShopOpen)}
                  className="p-1 text-[#736B63] hover:text-[#2B2623]"
                  aria-label="Toggle shop categories"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileShopOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {mobileShopOpen && (
                <div className="mt-1 pl-3 space-y-2 border-l-2 border-[#EAE3D9] ml-1 animate-fadeIn">
                  {productCategories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-xs py-1 flex items-center justify-between transition-colors ${
                        pathname === cat.href
                          ? 'text-[#8C6A54] font-semibold'
                          : 'text-[#736B63] hover:text-[#2B2623]'
                      }`}
                    >
                      <span>{cat.name}</span>
                      {cat.badge && (
                        <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-[#FAF0E6] text-[#8C6A54] border border-[#E8DCCB]">
                          {cat.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {otherNavLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium py-1.5 transition-colors flex items-center justify-between ${
                  pathname === link.href
                    ? 'text-[#2B2623] font-semibold'
                    : 'text-[#5C554F]'
                }`}
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-[#A89F95]" />
              </Link>
            ))}

            <div className="pt-4 border-t border-[#EAE3D9] flex flex-col space-y-3 text-sm text-[#5C554F]">
              <Link
                href="/track-order"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 hover:text-[#2B2623]"
              >
                <User className="w-4 h-4" />
                <span>Track Your Order</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-[#8C6A54] hover:underline"
              >
                Store Admin / Config &rarr;
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
