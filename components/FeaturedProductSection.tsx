'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, ShieldCheck, Check, Truck, RotateCcw, ArrowRight } from 'lucide-react';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store-context';
import { formatPrice } from '@/lib/utils';

interface FeaturedProductSectionProps {
  product: Product;
}

export default function FeaturedProductSection({ product }: FeaturedProductSectionProps) {
  const router = useRouter();
  const { addToCart } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    router.push('/checkout');
  };

  return (
    <section id="featured-product" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-2">
            The Flagship Experience
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2623]">
            {product.name}
          </h2>
          <p className="text-sm text-[#5C554F] mt-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-4/5 w-full bg-[#F2ECE4] rounded-sm overflow-hidden border border-[#EAE3D9] shadow-xs">
              <Image
                src={product.images[selectedImage] || product.images[0]}
                alt={`${product.name} - ${selectedColor}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-[#2B2623] text-white text-xs font-semibold px-3 py-1 rounded-xs uppercase tracking-wider">
                Flagship Edition
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 aspect-4/5 rounded-xs overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    selectedImage === idx
                      ? 'border-[#2B2623] opacity-100 ring-2 ring-[#2B2623]/20'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Buy Box & Product Configuration */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-sm border border-[#EAE3D9] shadow-xs space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-[#C89B7B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#2B2623]">
                  {product.rating} / 5.0
                </span>
                <span className="text-xs text-[#736B63]">
                  ({product.reviewCount} verified owners)
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#2B2623]">
                {product.name}
              </h3>
              <p className="text-xs text-[#5C554F] mt-1">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="font-serif text-3xl font-bold text-[#2B2623]">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base text-[#8C8278] line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="bg-[#B86246]/10 text-[#B86246] text-xs font-bold px-2 py-0.5 rounded-xs">
                    Save {formatPrice(product.compareAtPrice - product.price)} Today
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#5C554F] leading-relaxed border-t border-[#F0EBE1] pt-4">
              {product.description}
            </p>

            {/* Color Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#2B2623] flex justify-between">
                <span>Color: <span className="font-normal text-[#5C554F]">{selectedColor}</span></span>
              </label>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border text-xs transition-all cursor-pointer ${
                      selectedColor === c.name
                        ? 'border-[#2B2623] bg-[#F5EFEB] font-semibold text-[#2B2623] ring-1 ring-[#2B2623]'
                        : 'border-[#D9D0C3] hover:border-[#8C6A54] text-[#5C554F]'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/10"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase tracking-wider text-[#2B2623]">
                  Size: <span className="font-normal text-[#5C554F]">{selectedSize}</span>
                </span>
                <Link href="/faq" className="text-[#8C6A54] hover:underline">
                  Size Guide
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 px-3 text-xs rounded-sm border text-center transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'border-[#2B2623] bg-[#2B2623] text-white font-medium'
                        : 'border-[#D9D0C3] hover:border-[#8C6A54] text-[#2B2623] bg-white'
                    }`}
                  >
                    {s.split('(')[0].trim()}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                {/* Quantity selector */}
                <div className="flex items-center border border-[#D9D0C3] rounded-sm bg-white px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-[#736B63] hover:text-[#2B2623] font-bold text-sm px-1"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-semibold text-[#2B2623]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-[#736B63] hover:text-[#2B2623] font-bold text-sm px-1"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  id="featured-add-to-cart-btn"
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#2B2623] hover:bg-[#47403C] text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <span>Add to Bag • {formatPrice(product.price * quantity)}</span>
                  )}
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                id="featured-buy-now-btn"
                type="button"
                onClick={handleBuyNow}
                className="w-full bg-[#8C6A54] hover:bg-[#795B47] text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-sm transition-colors cursor-pointer"
              >
                Buy Now (Fast Checkout)
              </button>
            </div>

            {/* Mini Benefits Checklist */}
            <div className="border-t border-[#F0EBE1] pt-4 space-y-2 text-xs text-[#5C554F]">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#8C6A54]" />
                <span>Ultra-plush 320 GSM cloud fleece interior</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#8C6A54]" />
                <span>3 Multi-zone warmth settings (104°F – 128°F)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#8C6A54]" />
                <span>Full-body coverage with oversized hood & heated pockets</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#8C6A54]" />
                <span>100% Machine Washable with detachable safety cable</span>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-[#736B63] border-t border-[#F0EBE1]">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#8C6A54]" />
                <span>Free UK Delivery Over £150</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-[#8C6A54]" />
                <span>30-Day Cozy Guarantee</span>
              </div>
            </div>

            <div className="pt-1 text-center">
              <Link
                href={`/products/${product.slug}`}
                className="text-xs text-[#8C6A54] hover:text-[#2B2623] underline underline-offset-4 font-semibold"
              >
                View Full Specifications, Sizing & Reviews &rarr;
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
