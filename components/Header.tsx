'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Menu, X, User, ArrowRight } from 'lucide-react';
import { useStore } from '@/lib/store-context';

export default function Header() {
  const pathname = usePathname();
  const { cartCount, openCart, openSearch, config } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  }

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Heated Robes', href: '/collections/heated-robes' },
    { label: 'Accessories', href: '/collections/cozy-accessories' },
    { label: 'About Us', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Blog', href: '/blog' },
  ];

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
            {navLinks.map((link) => {
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
          className="lg:hidden fixed inset-x-0 top-16 sm:top-18 bg-[#FAF8F5] border-b border-[#EAE3D9] shadow-xl px-6 py-6 transition-all animate-fadeIn"
        >
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-medium py-1 transition-colors flex items-center justify-between ${
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
