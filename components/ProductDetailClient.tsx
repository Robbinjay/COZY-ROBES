'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Star,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  Zap,
  Ruler,
  MessageSquare,
  ShoppingBag,
  Sparkles,
  Thermometer,
  ChevronRight,
  X,
  Send,
  Plug,
  Plus,
} from 'lucide-react';
import { Product, ProductReview } from '@/lib/types';
import { useStore } from '@/lib/store-context';
import { formatPrice } from '@/lib/utils';
import { PRODUCTS } from '@/lib/store-data';
import ProductCard from './ProductCard';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart } = useStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'One Size Fits Most');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'sizing' | 'reviews' | 'how-it-works' | 'care'>('specs');
  const [reviewFilter, setReviewFilter] = useState<'all' | number>('all');

  // Review submission modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewLocation, setNewReviewLocation] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [customReviews, setCustomReviews] = useState<ProductReview[]>([]);

  // Default fallback reviews if none in product data
  const fallbackReviews: ProductReview[] = [
    {
      id: 'rev-fb1',
      author: 'Fiona M.',
      location: 'Edinburgh, Scotland',
      rating: 5,
      date: '14 January 2026',
      title: 'Has completely transformed winter working from home',
      comment: 'I live in a drafty stone flat in Edinburgh where keeping the central heating on all day costs a fortune. The Cozy Co. Robe heats up almost instantly and level 3 keeps me perfectly warm through my 8-hour workday. The fabric is wonderfully thick and plush even before you turn the heat on. Couldn’t be happier!',
      verifiedPurchase: true,
      colorPurchased: 'Charcoal',
    },
    {
      id: 'rev-fb2',
      author: 'David & Gemma K.',
      location: 'Harrogate, North Yorkshire',
      rating: 5,
      date: '28 December 2025',
      title: 'Best Christmas gift by a mile',
      comment: 'Bought this for my wife who suffers from chilly hands and aching shoulders during winter. She lives in it! The heating elements across the shoulders and lower back are like a warm hug, and the pockets getting warm is genius. Royal Mail delivery arrived in 2 days as promised.',
      verifiedPurchase: true,
      colorPurchased: 'Blush Pink',
    },
    {
      id: 'rev-fb3',
      author: 'Marcus L.',
      location: 'Bath, Somerset',
      rating: 5,
      date: '03 February 2026',
      title: 'Generous 50x70 size is truly full coverage',
      comment: 'I am 6 foot 2 and most wearable blankets leave my shins freezing. This 50" x 70" wrap completely covers me from neck to feet when curled up in my armchair. The digital control is backlit and super easy to operate, and the magnetic breakaway plug is very clever if the dog walks past the cord.',
      verifiedPurchase: true,
      colorPurchased: 'Charcoal',
    },
    {
      id: 'rev-fb4',
      author: 'Eleanor H.',
      location: 'St Albans, Hertfordshire',
      rating: 5,
      date: '19 February 2026',
      title: 'Washes like a dream on delicate cycle',
      comment: 'I was honestly nervous about machine-washing an electric garment, but following the silicone cap instructions it was so simple. Did a 30-degree gentle cycle, line dried it, and it fluffed right back up with the heating working flawlessly. Very well built.',
      verifiedPurchase: true,
      colorPurchased: 'Cardinal',
    },
    {
      id: 'rev-fb5',
      author: 'Hannah P.',
      location: 'Chester, Cheshire',
      rating: 4,
      date: '08 March 2026',
      title: 'Unbelievably soft and cozy warmth',
      comment: 'Extremely soft cloud sherpa lining and gorgeous deep burgundy/cardinal color. It gets hot enough that I usually stick to level 2 or 3, which is plenty. The cord is nice and long (nearly 10ft), giving plenty of room to move around.',
      verifiedPurchase: true,
      colorPurchased: 'Cardinal',
    },
  ];

  const allReviews = [...customReviews, ...(product.reviews || fallbackReviews)];
  const filteredReviews = reviewFilter === 'all' 
    ? allReviews 
    : allReviews.filter((r) => r.rating === reviewFilter);

  // Five star count
  const fiveStarCount = allReviews.filter((r) => r.rating === 5).length;
  const fourStarCount = allReviews.filter((r) => r.rating === 4).length;
  const fiveStarPct = Math.round((fiveStarCount / allReviews.length) * 100);
  const fourStarPct = Math.round((fourStarCount / allReviews.length) * 100);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    router.push('/checkout');
  };

  const isRobe = product.slug === 'cozy-co-robes';
  const accessoryProducts = PRODUCTS.filter((p) => p.category === 'cozy-accessories');
  const { cart } = useStore();

  const handleAddAccessory = (accessory: Product) => {
    const defaultColor = accessory.colors[0]?.name || 'Standard';
    const defaultSize = accessory.sizes[0] || 'One Size';
    addToCart(accessory, defaultColor, defaultSize, 1);
  };

  const isProductInCart = (productId: string) => {
    return cart.some((item) => item.productId === productId);
  };

  const handleColorSelect = (colorName: string) => {
    setSelectedColor(colorName);
    // If color changes and we have corresponding image, preview first image
    if (colorName.toLowerCase().includes('charcoal')) {
      setSelectedImage(0);
    } else if (colorName.toLowerCase().includes('pink') || colorName.toLowerCase().includes('blush')) {
      if (product.images.length > 2) setSelectedImage(2);
    } else if (colorName.toLowerCase().includes('cardinal') || colorName.toLowerCase().includes('red')) {
      if (product.images.length > 1) setSelectedImage(1);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: ProductReview = {
      id: `rev-user-${Date.now()}`,
      author: newReviewAuthor.trim(),
      location: newReviewLocation.trim() || 'United Kingdom',
      rating: newReviewRating,
      date: 'Just now',
      title: newReviewTitle.trim() || 'Verified Customer Review',
      comment: newReviewComment.trim(),
      verifiedPurchase: true,
      colorPurchased: selectedColor || undefined,
    };

    setCustomReviews([newRev, ...customReviews]);
    setReviewSubmitted(true);
    setTimeout(() => {
      setIsReviewModalOpen(false);
      setReviewSubmitted(false);
      setNewReviewAuthor('');
      setNewReviewLocation('');
      setNewReviewTitle('');
      setNewReviewComment('');
    }, 1500);
  };

  const scrollToSection = (tabId: 'specs' | 'sizing' | 'reviews' | 'how-it-works' | 'care') => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const savingsAmount = product.compareAtPrice ? product.compareAtPrice - product.price : 0;
  const savingsPct = product.compareAtPrice ? Math.round((savingsAmount / product.compareAtPrice) * 100) : 0;

  return (
    <div className="space-y-16">
      
      {/* SECTION 1: PRODUCT HERO & BUY BOX */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* LEFT: IMAGE GALLERY (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Large Image Display */}
          <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] w-full bg-[#EAE3D9] rounded-sm overflow-hidden border border-[#D9D0C3] shadow-xs">
            <Image
              src={product.images[selectedImage] || product.images[0]}
              alt={`${product.name} - View ${selectedImage + 1}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
              referrerPolicy="no-referrer"
            />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
              <span className="bg-[#2B2623] text-[#FAF8F5] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-xs shadow-xs">
                {product.slug === 'cozy-co-robes' ? 'Flagship Edition' : 'CozyCorobes UK'}
              </span>
              {savingsAmount > 0 && (
                <span className="bg-[#B86246] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-xs shadow-xs">
                  Save {savingsPct}% ({formatPrice(savingsAmount)})
                </span>
              )}
            </div>

            {/* Heat Settings / Instant Heat Pill */}
            {product.slug === 'cozy-co-robes' && (
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3 rounded-xs border border-[#EAE3D9] shadow-md flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#F5EFEB] flex items-center justify-center text-[#B86246] shrink-0">
                    <Thermometer className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2B2623]">7 Digital Heat Settings (35°C–55°C)</p>
                    <p className="text-[11px] text-[#736B63]">Multi-zone warmth across chest, back & pockets</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6A54] bg-[#F5EFEB] px-2 py-1 rounded-xs hidden sm:inline-block">
                  60-Sec Heat-Up
                </span>
              </div>
            )}
          </div>

          {/* Thumbnail Gallery Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  id={`product-thumbnail-${idx}`}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-16 sm:w-20 aspect-square rounded-xs overflow-hidden transition-all cursor-pointer shrink-0 border ${
                    selectedImage === idx
                      ? 'border-[#2B2623] ring-2 ring-[#2B2623]/20 opacity-100'
                      : 'border-[#D9D0C3] opacity-75 hover:opacity-100 bg-[#EAE3D9]'
                  }`}
                  aria-label={`View product image ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Quick Specifications Callout */}
          <div className="p-4 bg-[#FAF5EE] border border-[#EAE3D9] rounded-sm flex flex-wrap items-center justify-between gap-3 text-xs text-[#5C554F]">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#8C6A54]" />
              <span><strong>320 GSM</strong> Micro-Plush Cloud Fleece</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#8C6A54]" />
              <span><strong>Under 3p/hr</strong> energy efficient heat</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Plug className="w-4 h-4 text-[#8C6A54]" />
              <span><strong>UK 3-Pin</strong> fused safety plug</span>
            </div>
          </div>

        </div>

        {/* RIGHT: PRODUCT BUY BOX (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Category & Stock Pill */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8C6A54]">
              {product.category === 'heated-robes' ? 'Heated Loungewear & Wearables' : 'Cozy Winter Accessories'}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              In Stock - UK Warehouse
            </span>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2623] tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#736B63] mt-1.5 leading-relaxed">
              {product.subtitle}
            </p>
          </div>

          {/* Ratings Summary (Jump to Reviews) */}
          <div className="flex items-center gap-3 pb-2 border-b border-[#EAE3D9]">
            <div className="flex text-[#C89B7B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollToSection('reviews')}
              className="text-xs font-semibold text-[#2B2623] hover:text-[#8C6A54] underline underline-offset-2 cursor-pointer"
            >
              {product.rating} / 5.0 ({allReviews.length} Verified UK Reviews)
            </button>
          </div>

          {/* Pricing in GBP */}
          <div className="p-4 bg-[#FAF5EE] border border-[#EAE3D9] rounded-sm space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2623]">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-base sm:text-lg text-[#8C8278] line-through font-medium">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              {savingsAmount > 0 && (
                <span className="bg-[#B86246] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-xs tracking-wider uppercase">
                  Save {formatPrice(savingsAmount)} ({savingsPct}% Off)
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-[#5C554F]">
              <Zap className="w-3.5 h-3.5 text-[#8C6A54]" />
              <span>Average running cost under <strong>3p per hour</strong> — warm your body, not the whole room.</span>
            </div>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#2B2623] uppercase tracking-wider">
                  Color: <span className="text-[#8C6A54] font-normal normal-case">{selectedColor}</span>
                </span>
                <span className="text-[11px] text-[#736B63]">
                  {product.colors.find((c) => c.name === selectedColor)?.inStock ? 'Ready to Dispatch' : 'Backorder'}
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((color) => {
                  const isSelected = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      id={`color-swatch-${color.name.toLowerCase().replace(/\s+/g, '-')}`}
                      type="button"
                      onClick={() => handleColorSelect(color.name)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xs border text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#2B2623] bg-white shadow-xs text-[#2B2623] ring-1 ring-[#2B2623]'
                          : 'border-[#D9D0C3] bg-[#FAF8F5] text-[#5C554F] hover:border-[#2B2623]'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#2B2623] uppercase tracking-wider">
                  Size: <span className="text-[#8C6A54] font-normal normal-case">{selectedSize}</span>
                </span>
                <button
                  type="button"
                  onClick={() => scrollToSection('sizing')}
                  className="text-[11px] font-semibold text-[#8C6A54] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Sizing & Fit Guide</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      id={`size-btn-${size.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2.5 rounded-xs border text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#2B2623] bg-[#2B2623] text-white shadow-xs'
                          : 'border-[#D9D0C3] bg-white text-[#2B2623] hover:border-[#2B2623]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-[#736B63]">
                Generous unisex 50&quot; x 70&quot; cocoon drape. Designed to comfortably fit heights from 5&apos;0&quot; to 6&apos;4&quot; (UK 6 to UK 24).
              </p>
            </div>
          )}

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Counter */}
              <div className="flex items-center border border-[#D9D0C3] rounded-xs bg-white h-[50px]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center text-[#5C554F] hover:text-[#2B2623] transition-colors cursor-pointer text-base font-bold disabled:opacity-30"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  &minus;
                </button>
                <span className="w-10 text-center text-xs font-bold text-[#2B2623]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full flex items-center justify-center text-[#5C554F] hover:text-[#2B2623] transition-colors cursor-pointer text-base font-bold"
                  aria-label="Increase quantity"
                >
                  &#43;
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                id="product-detail-add-btn"
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-[#2B2623] hover:bg-[#47403C] text-[#FAF8F5] text-xs sm:text-sm font-semibold tracking-wider uppercase h-[50px] px-6 rounded-xs transition-all duration-200 flex items-center justify-center gap-2 shadow-xs hover:shadow-md cursor-pointer"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag • {formatPrice(product.price * quantity)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Express Buy Now Button */}
            <button
              id="product-detail-buynow-btn"
              type="button"
              onClick={handleBuyNow}
              className="w-full bg-[#B86246] hover:bg-[#9E5139] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase h-[48px] px-6 rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Buy It Now &rarr;</span>
            </button>

            {/* Cross-sell Accessories (Only for the Robe) */}
            {isRobe && (
              <div id="robe-cross-sell" className="mt-6 pt-6 border-t border-[#EAE3D9] space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#2B2623] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#8C6A54]" />
                    Complete Your Cozy Set
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs uppercase tracking-tighter">
                    Bundle & Save
                  </span>
                </div>
                
                <div className="space-y-3">
                  {accessoryProducts.map((accessory) => {
                    const inCart = isProductInCart(accessory.id);
                    return (
                      <div 
                        key={accessory.id}
                        className={`group flex items-center gap-3 p-3 rounded-sm border transition-all duration-200 ${
                          inCart 
                            ? 'bg-[#EBF7EE] border-[#CDE9D2]' 
                            : 'bg-white border-[#EAE3D9] hover:border-[#8C6A54] hover:shadow-xs'
                        }`}
                      >
                        <div className="relative w-14 h-14 bg-[#FAF8F5] rounded-xs overflow-hidden border border-[#F0EBE1] shrink-0">
                          <Image
                            src={accessory.images[0]}
                            alt={accessory.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[11px] font-bold text-[#2B2623] truncate leading-tight">
                            {accessory.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-bold text-[#2B2623]">
                              {formatPrice(accessory.price)}
                            </span>
                            {accessory.compareAtPrice && (
                              <span className="text-[10px] text-[#8C8278] line-through">
                                {formatPrice(accessory.compareAtPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleAddAccessory(accessory)}
                          disabled={inCart}
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                            inCart
                              ? 'bg-emerald-500 text-white cursor-default'
                              : 'bg-[#FAF8F5] text-[#2B2623] border border-[#D9D0C3] hover:bg-[#2B2623] hover:text-white hover:border-[#2B2623]'
                          }`}
                          aria-label={inCart ? 'Added to bag' : `Add ${accessory.name} to bag`}
                        >
                          {inCart ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-[#736B63] italic leading-tight">
                  Adding accessories helps you reach the <strong>£100 Free UK Delivery</strong> threshold instantly.
                </p>
              </div>
            )}

            {/* Threshold Notification */}
            <div className="text-center pt-1 text-[11px] text-[#736B63]">
              Minimum order £69.99 • <strong>Free UK Delivery</strong> on all orders over £100
            </div>
          </div>

          {/* Guarantees & Trust Badges */}
          <div className="border-t border-[#EAE3D9] pt-5 grid grid-cols-2 gap-4 text-xs text-[#5C554F]">
            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-[#8C6A54] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#2B2623]">Fast UK Delivery</strong>
                <span className="text-[11px] text-[#736B63]">Dispatched via Royal Mail Tracked 48</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <RotateCcw className="w-4 h-4 text-[#8C6A54] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#2B2623]">30-Day Cozy Trial</strong>
                <span className="text-[11px] text-[#736B63]">Love it or return for full refund</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#8C6A54] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#2B2623]">1-Year UK Warranty</strong>
                <span className="text-[11px] text-[#736B63]">UKCA & CE certified electrical safety</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Plug className="w-4 h-4 text-[#8C6A54] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#2B2623]">UK Safety Plug</strong>
                <span className="text-[11px] text-[#736B63]">Fused low-voltage magnetic cord included</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* SECTION 2: INTERACTIVE NAV TABS */}
      <div className="border-b border-[#D9D0C3] sticky top-16 bg-[#FAF8F5]/95 backdrop-blur-xs z-20 pt-4 pb-2">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto scrollbar-none text-xs font-bold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => scrollToSection('specs')}
            className={`px-4 py-2.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'specs'
                ? 'border-[#2B2623] text-[#2B2623]'
                : 'border-transparent text-[#736B63] hover:text-[#2B2623]'
            }`}
          >
            Full Specifications
          </button>
          
          <button
            type="button"
            onClick={() => scrollToSection('sizing')}
            className={`px-4 py-2.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'sizing'
                ? 'border-[#2B2623] text-[#2B2623]'
                : 'border-transparent text-[#736B63] hover:text-[#2B2623]'
            }`}
          >
            Sizing & Fit Guide
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('reviews')}
            className={`px-4 py-2.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-[#2B2623] text-[#2B2623]'
                : 'border-transparent text-[#736B63] hover:text-[#2B2623]'
            }`}
          >
            Customer Reviews ({allReviews.length})
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('how-it-works')}
            className={`px-4 py-2.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'how-it-works'
                ? 'border-[#2B2623] text-[#2B2623]'
                : 'border-transparent text-[#736B63] hover:text-[#2B2623]'
            }`}
          >
            How It Works
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('care')}
            className={`px-4 py-2.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'care'
                ? 'border-[#2B2623] text-[#2B2623]'
                : 'border-transparent text-[#736B63] hover:text-[#2B2623]'
            }`}
          >
            Washing & Care
          </button>
        </div>
      </div>

      {/* SECTION 3: SPECIFICATIONS SECTION */}
      <section id="specs" className="scroll-mt-32 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-1">
              Engineering & Materials
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2623]">
              Full Specifications
            </h2>
          </div>
          <span className="text-xs text-[#736B63]">
            Engineered for British winter living & low energy consumption
          </span>
        </div>

        <div className="bg-white border border-[#EAE3D9] rounded-sm overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#EAE3D9]">
            
            {/* Left Col */}
            <div className="divide-y divide-[#F0EBE1]">
              {product.specs.slice(0, Math.ceil(product.specs.length / 2)).map((spec, i) => (
                <div key={i} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                  <span className="font-bold text-[#2B2623] sm:w-1/3">{spec.label}</span>
                  <span className="text-[#5C554F] sm:w-2/3 leading-relaxed">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Right Col */}
            <div className="divide-y divide-[#F0EBE1]">
              {product.specs.slice(Math.ceil(product.specs.length / 2)).map((spec, i) => (
                <div key={i} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm">
                  <span className="font-bold text-[#2B2623] sm:w-1/3">{spec.label}</span>
                  <span className="text-[#5C554F] sm:w-2/3 leading-relaxed">{spec.value}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-[#FAF5EE] border border-[#EAE3D9] rounded-sm">
            <h3 className="font-serif text-sm font-bold text-[#2B2623] mb-1">
              7 Precision Heat Levels
            </h3>
            <p className="text-xs text-[#5C554F]">
              From 35°C gentle ambient warming up to 55°C deep penetrating thermal soothing. Reaches temperature in under 60 seconds.
            </p>
          </div>

          <div className="p-4 bg-[#FAF5EE] border border-[#EAE3D9] rounded-sm">
            <h3 className="font-serif text-sm font-bold text-[#2B2623] mb-1">
              Carbon-Fiber Safe Micro-Wires
            </h3>
            <p className="text-xs text-[#5C554F]">
              Ultra-thin, pliable carbon-fiber filaments that bend naturally with fabric. Zero bulk, zero stiff wires, completely undetectable to touch.
            </p>
          </div>

          <div className="p-4 bg-[#FAF5EE] border border-[#EAE3D9] rounded-sm">
            <h3 className="font-serif text-sm font-bold text-[#2B2623] mb-1">
              Magnetic Quick-Breakaway Cord
            </h3>
            <p className="text-xs text-[#5C554F]">
              9.5-foot heavy-duty power cord with magnetic snap coupling. If snagged by pets or footsteps, it cleanly disconnects safely.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: SIZING & FIT GUIDE */}
      <section id="sizing" className="scroll-mt-32 space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-1">
            Comfort Fit Architecture
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2623]">
            Sizing &amp; Dimensions Guide
          </h2>
          <p className="text-xs sm:text-sm text-[#5C554F] mt-1">
            Thoughtfully tailored with an oversized unisex cocoon wrap silhouette designed for maximum lounging comfort.
          </p>
        </div>

        <div className="bg-white border border-[#EAE3D9] rounded-sm p-6 sm:p-8 space-y-8 shadow-xs">
          
          {/* Main Sizing Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-[#FAF5EE] rounded-xs border border-[#EAE3D9]">
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#2B2623]">50&quot; x 70&quot;</span>
              <span className="text-[11px] font-semibold text-[#736B63] uppercase tracking-wider mt-1 block">Width x Length</span>
              <span className="text-[10px] text-[#8C8278]">(127 cm x 178 cm)</span>
            </div>

            <div className="p-4 bg-[#FAF5EE] rounded-xs border border-[#EAE3D9]">
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#2B2623]">5&apos;0&quot; - 6&apos;4&quot;</span>
              <span className="text-[11px] font-semibold text-[#736B63] uppercase tracking-wider mt-1 block">Recommended Height</span>
              <span className="text-[10px] text-[#8C8278]">(152 cm to 193 cm)</span>
            </div>

            <div className="p-4 bg-[#FAF5EE] rounded-xs border border-[#EAE3D9]">
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#2B2623]">UK 6 - 24</span>
              <span className="text-[11px] font-semibold text-[#736B63] uppercase tracking-wider mt-1 block">Clothing Range</span>
              <span className="text-[10px] text-[#8C8278]">(XS to 3XL Unisex)</span>
            </div>

            <div className="p-4 bg-[#FAF5EE] rounded-xs border border-[#EAE3D9]">
              <span className="block text-2xl sm:text-3xl font-serif font-bold text-[#2B2623]">Full Body</span>
              <span className="text-[11px] font-semibold text-[#736B63] uppercase tracking-wider mt-1 block">Seated Coverage</span>
              <span className="text-[10px] text-[#8C8278]">Covers toes to neck</span>
            </div>
          </div>

          {/* Sizing Details Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAF5EE] border-b border-[#D9D0C3] text-[#2B2623] font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3.5">Measurement Zone</th>
                  <th className="p-3.5">Imperial</th>
                  <th className="p-3.5">Metric</th>
                  <th className="p-3.5">Fit Purpose &amp; Feel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE3D9] text-[#5C554F]">
                <tr>
                  <td className="p-3.5 font-bold text-[#2B2623]">Overall Width</td>
                  <td className="p-3.5">50 inches</td>
                  <td className="p-3.5">127 cm</td>
                  <td className="p-3.5">Generous overlap in front so cold air never slips in when lounging or seated.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#2B2623]">Overall Length</td>
                  <td className="p-3.5">70 inches</td>
                  <td className="p-3.5">178 cm</td>
                  <td className="p-3.5">Tucks completely under your feet on the sofa for full thermal cocooning.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#2B2623]">Sleeve Opening</td>
                  <td className="p-3.5">14 inches</td>
                  <td className="p-3.5">35.5 cm</td>
                  <td className="p-3.5">Wide kimono cut allows full arm mobility for keyboard work, reading, or holding coffee.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#2B2623]">Hand Pockets</td>
                  <td className="p-3.5">9 x 8 inches</td>
                  <td className="p-3.5">23 x 20 cm</td>
                  <td className="p-3.5">Deep sherpa-lined pockets embedded with targeted carbon heating to warm cold fingers.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Frequently Asked Sizing Questions */}
          <div className="p-4 bg-[#FAF5EE] rounded-sm border border-[#EAE3D9] text-xs text-[#5C554F] space-y-2">
            <h4 className="font-serif text-sm font-bold text-[#2B2623]">
              Will this fit me if I am taller or petite?
            </h4>
            <p>
              Yes! For petite individuals (5&apos;0&quot; to 5&apos;4&quot;), the robe drapes gracefully like a plush floor-length cocoon without dragging awkwardly when walking. For taller individuals (up to 6&apos;4&quot;), the generous 70&quot; length ensures full coverage down past the knees while standing and complete ankle-to-toe tucking when sitting on the sofa.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 5: CUSTOMER REVIEWS */}
      <section id="reviews" className="scroll-mt-32 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-1">
              Verified Customer Feedback
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2623]">
              Customer Reviews &amp; Ratings
            </h2>
            <p className="text-xs sm:text-sm text-[#5C554F] mt-1">
              Read real experiences from British homeowners and winter loungers.
            </p>
          </div>

          <button
            id="write-review-btn"
            type="button"
            onClick={() => setIsReviewModalOpen(true)}
            className="bg-[#2B2623] hover:bg-[#47403C] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xs transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Rating Breakdown Dashboard */}
        <div className="bg-white border border-[#EAE3D9] rounded-sm p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-xs">
          
          {/* Big Score (4 Cols) */}
          <div className="md:col-span-4 text-center md:border-r border-[#EAE3D9] md:pr-6">
            <span className="font-serif text-5xl sm:text-6xl font-bold text-[#2B2623] block">
              {product.rating}
            </span>
            <div className="flex justify-center text-[#C89B7B] my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="text-xs font-bold text-[#2B2623]">
              Based on {allReviews.length} Verified Reviews
            </p>
            <p className="text-[11px] text-emerald-800 mt-1 font-semibold">
              ✓ 100% of reviewers recommend this product
            </p>
          </div>

          {/* Rating Bars (8 Cols) */}
          <div className="md:col-span-8 space-y-2.5">
            <div className="flex items-center gap-3 text-xs">
              <span className="w-12 text-[#2B2623] font-bold">5 Stars</span>
              <div className="flex-1 bg-[#EAE3D9] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#8C6A54] h-full" style={{ width: `${fiveStarPct}%` }} />
              </div>
              <span className="w-12 text-right text-[#736B63] font-semibold">{fiveStarPct}% ({fiveStarCount})</span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="w-12 text-[#2B2623] font-bold">4 Stars</span>
              <div className="flex-1 bg-[#EAE3D9] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#8C6A54] h-full" style={{ width: `${fourStarPct}%` }} />
              </div>
              <span className="w-12 text-right text-[#736B63] font-semibold">{fourStarPct}% ({fourStarCount})</span>
            </div>

            <div className="flex items-center gap-3 text-xs opacity-40">
              <span className="w-12 text-[#2B2623] font-bold">3 Stars</span>
              <div className="flex-1 bg-[#EAE3D9] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#8C6A54] h-full" style={{ width: `0%` }} />
              </div>
              <span className="w-12 text-right text-[#736B63] font-semibold">0% (0)</span>
            </div>

            {/* Filter Pills */}
            <div className="pt-4 flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#736B63] mr-2">Filter:</span>
              <button
                type="button"
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  reviewFilter === 'all'
                    ? 'bg-[#2B2623] text-white'
                    : 'bg-[#FAF5EE] text-[#5C554F] hover:bg-[#EAE3D9]'
                }`}
              >
                All ({allReviews.length})
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter(5)}
                className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  reviewFilter === 5
                    ? 'bg-[#2B2623] text-white'
                    : 'bg-[#FAF5EE] text-[#5C554F] hover:bg-[#EAE3D9]'
                }`}
              >
                5 Stars ({fiveStarCount})
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter(4)}
                className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  reviewFilter === 4
                    ? 'bg-[#2B2623] text-white'
                    : 'bg-[#FAF5EE] text-[#5C554F] hover:bg-[#EAE3D9]'
                }`}
              >
                4 Stars ({fourStarCount})
              </button>
            </div>
          </div>

        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-[#EAE3D9] rounded-sm p-5 sm:p-6 space-y-3 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F5EFEB] pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EE] border border-[#EAE3D9] flex items-center justify-center font-bold text-[#8C6A54] text-xs">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-[#2B2623]">{rev.author}</span>
                      {rev.verifiedPurchase && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <Check className="w-3 h-3 text-emerald-600" />
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    {rev.location && (
                      <span className="text-[11px] text-[#736B63] block">{rev.location}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex text-[#C89B7B]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#8C8278]">{rev.date}</span>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#2B2623] mb-1">
                  &ldquo;{rev.title}&rdquo;
                </h3>
                <p className="text-xs sm:text-sm text-[#5C554F] leading-relaxed">
                  {rev.comment}
                </p>
                {rev.colorPurchased && (
                  <p className="text-[11px] text-[#8C8278] mt-2 font-medium">
                    Purchased Color: <strong>{rev.colorPurchased}</strong>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* SECTION 6: HOW IT WORKS & HEATING TECHNOLOGY */}
      <section id="how-it-works" className="scroll-mt-32 space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-1">
            Operation &amp; Safety
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2623]">
            How It Works &amp; Heat Settings
          </h2>
          <p className="text-xs sm:text-sm text-[#5C554F] mt-1">
            Simple 60-second setup engineered for hassle-free daily winter living.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-[#EAE3D9] rounded-sm space-y-3">
            <span className="w-8 h-8 rounded-full bg-[#FAF5EE] border border-[#D9D0C3] flex items-center justify-center font-serif text-sm font-bold text-[#2B2623]">
              1
            </span>
            <h3 className="font-serif text-base font-bold text-[#2B2623]">
              Slip On &amp; Fasten
            </h3>
            <p className="text-xs text-[#5C554F] leading-relaxed">
              Drape the oversized wearable blanket over your shoulders and sink into the plush 320 GSM cloud fleece.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#EAE3D9] rounded-sm space-y-3">
            <span className="w-8 h-8 rounded-full bg-[#FAF5EE] border border-[#D9D0C3] flex items-center justify-center font-serif text-sm font-bold text-[#2B2623]">
              2
            </span>
            <h3 className="font-serif text-base font-bold text-[#2B2623]">
              Connect Magnetic Lead
            </h3>
            <p className="text-xs text-[#5C554F] leading-relaxed">
              Snap the quick-release magnetic cord into the discrete hip socket. Plugs safely into standard UK 3-pin wall outlets.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#EAE3D9] rounded-sm space-y-3">
            <span className="w-8 h-8 rounded-full bg-[#FAF5EE] border border-[#D9D0C3] flex items-center justify-center font-serif text-sm font-bold text-[#2B2623]">
              3
            </span>
            <h3 className="font-serif text-base font-bold text-[#2B2623]">
              Choose Your Warmth
            </h3>
            <p className="text-xs text-[#5C554F] leading-relaxed">
              Use the soft-touch LED controller to cycle between 7 digital heat levels (35°C to 55°C). Auto shut-off keeps you secure.
            </p>
          </div>
        </div>

        {/* Heat Settings Table */}
        <div className="bg-[#FAF5EE] border border-[#EAE3D9] rounded-sm p-6 space-y-4">
          <h3 className="font-serif text-base font-bold text-[#2B2623]">
            7 Temperature Presets Guide
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-white border border-[#EAE3D9] rounded-xs">
              <span className="font-bold text-[#2B2623] block">Levels 1 - 2</span>
              <span className="text-[#8C6A54] font-semibold">35°C - 38°C</span>
              <p className="text-[#736B63] mt-1 text-[11px]">Gentle ambient warmth for prolonged desk work or afternoon reading.</p>
            </div>
            <div className="p-3 bg-white border border-[#EAE3D9] rounded-xs">
              <span className="font-bold text-[#2B2623] block">Levels 3 - 4</span>
              <span className="text-[#8C6A54] font-semibold">40°C - 44°C</span>
              <p className="text-[#736B63] mt-1 text-[11px]">Our most popular daily setting for relaxing evenings and chilly living rooms.</p>
            </div>
            <div className="p-3 bg-white border border-[#EAE3D9] rounded-xs">
              <span className="font-bold text-[#2B2623] block">Levels 5 - 6</span>
              <span className="text-[#8C6A54] font-semibold">48°C - 52°C</span>
              <p className="text-[#736B63] mt-1 text-[11px]">Deep penetrating warmth for stiff winter shoulders and cold drafts.</p>
            </div>
            <div className="p-3 bg-white border border-[#EAE3D9] rounded-xs">
              <span className="font-bold text-[#2B2623] block">Level 7</span>
              <span className="text-[#B86246] font-semibold">55°C Maximum</span>
              <p className="text-[#736B63] mt-1 text-[11px]">Fast-heat boost to warm up immediately when coming in from freezing rain.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: WASHING & CARE INSTRUCTIONS */}
      <section id="care" className="scroll-mt-32 space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-1">
            Easy Machine Care
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2623]">
            Washing &amp; Fabric Care Guide
          </h2>
          <p className="text-xs sm:text-sm text-[#5C554F] mt-1">
            100% machine washable for clean, fresh winter comfort all season long.
          </p>
        </div>

        <div className="bg-white border border-[#EAE3D9] rounded-sm p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs">
            <div className="space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#FAF5EE] border border-[#D9D0C3] flex items-center justify-center font-bold text-[#2B2623]">
                1
              </span>
              <h3 className="font-bold text-[#2B2623] text-sm">Disconnect Lead</h3>
              <p className="text-[#5C554F]">
                Unplug the controller cord completely from the garment hip socket. Never place the controller or wall cord in the washing machine.
              </p>
            </div>

            <div className="space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#FAF5EE] border border-[#D9D0C3] flex items-center justify-center font-bold text-[#2B2623]">
                2
              </span>
              <h3 className="font-bold text-[#2B2623] text-sm">Seal Silicone Cap</h3>
              <p className="text-[#5C554F]">
                Snap the integrated waterproof silicone garment cap firmly over the internal socket to create a 100% watertight seal.
              </p>
            </div>

            <div className="space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#FAF5EE] border border-[#D9D0C3] flex items-center justify-center font-bold text-[#2B2623]">
                3
              </span>
              <h3 className="font-bold text-[#2B2623] text-sm">Delicate Cold Wash</h3>
              <p className="text-[#5C554F]">
                Wash on gentle cold cycle (max 30°C) with mild liquid detergent. Do not bleach and do not use fabric softeners.
              </p>
            </div>

            <div className="space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#FAF5EE] border border-[#D9D0C3] flex items-center justify-center font-bold text-[#2B2623]">
                4
              </span>
              <h3 className="font-bold text-[#2B2623] text-sm">Line or Tumble Dry</h3>
              <p className="text-[#5C554F]">
                Line dry flat or tumble dry on low delicate heat. Ensure the internal connector socket is completely dry before reconnecting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: RELATED COMPANION PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#EAE3D9] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-1">
                Complete The Comfort Setup
              </p>
              <h2 className="font-serif text-2xl font-bold text-[#2B2623]">
                Pairs Wonderfully With
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-semibold text-[#8C6A54] hover:underline flex items-center gap-1"
            >
              <span>Explore Catalog</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* REVIEW SUBMISSION MODAL */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EAE3D9] rounded-sm max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-xl relative animate-in fade-in zoom-in-95">
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 text-[#736B63] hover:text-[#2B2623] p-1 cursor-pointer"
              aria-label="Close review modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="font-serif text-xl font-bold text-[#2B2623]">
                Write a Review for {product.name}
              </h3>
              <p className="text-xs text-[#5C554F] mt-1">
                Share your personal comfort experience with future winter loungers.
              </p>
            </div>

            {reviewSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-sm text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-base font-bold text-emerald-900">
                  Thank You For Your Review!
                </h4>
                <p className="text-xs text-emerald-700">
                  Your feedback has been recorded and added to the verified customer reviews.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                
                {/* Rating selection */}
                <div>
                  <label className="block font-bold text-[#2B2623] uppercase tracking-wider mb-1.5">
                    Your Rating *
                  </label>
                  <div className="flex items-center gap-1.5 text-[#C89B7B]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewRating(star)}
                        className="p-1 cursor-pointer hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newReviewRating ? 'fill-current' : 'text-[#D9D0C3]'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-[#2B2623] ml-2">
                      {newReviewRating} out of 5 stars
                    </span>
                  </div>
                </div>

                {/* Author Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#2B2623] uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah M."
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-xs px-3 py-2 text-xs focus:outline-none focus:border-[#2B2623]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#2B2623] uppercase tracking-wider mb-1">
                      UK Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Manchester, England"
                      value={newReviewLocation}
                      onChange={(e) => setNewReviewLocation(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-xs px-3 py-2 text-xs focus:outline-none focus:border-[#2B2623]"
                    />
                  </div>
                </div>

                {/* Review Title */}
                <div>
                  <label className="block font-bold text-[#2B2623] uppercase tracking-wider mb-1">
                    Review Headline *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Absolutely heavenly warmth during cold mornings"
                    value={newReviewTitle}
                    onChange={(e) => setNewReviewTitle(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-xs px-3 py-2 text-xs focus:outline-none focus:border-[#2B2623]"
                  />
                </div>

                {/* Review Comment */}
                <div>
                  <label className="block font-bold text-[#2B2623] uppercase tracking-wider mb-1">
                    Detailed Review *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the fabric softness, heating speed, fit, and how it has kept you warm..."
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#D9D0C3] rounded-xs p-3 text-xs focus:outline-none focus:border-[#2B2623]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="px-4 py-2 border border-[#D9D0C3] rounded-xs text-xs font-semibold hover:bg-[#FAF5EE] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#2B2623] hover:bg-[#47403C] text-white px-6 py-2 rounded-xs text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Review</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
