'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store-context';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addToCart } = useStore();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [added, setAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedColor, selectedSize, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const currentImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  return (
    <div
      className="group relative flex flex-col bg-white border border-[#EAE3D9] rounded-sm overflow-hidden hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.isBestSeller && (
          <span className="bg-[#2B2623] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs">
            Best Seller
          </span>
        )}
        {product.isNewArrival && !product.isBestSeller && (
          <span className="bg-[#8C6A54] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs">
            New
          </span>
        )}
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <span className="bg-[#B86246] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs">
            Save {formatPrice(product.compareAtPrice - product.price)}
          </span>
        )}
      </div>

      {/* Image link */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block w-full aspect-4/5 bg-[#F2ECE4] overflow-hidden"
      >
        <Image
          src={currentImage}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-103"
          referrerPolicy="no-referrer"
        />

        {/* Quick Add Overlay on desktop */}
        <div className="absolute inset-x-3 bottom-3 hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full bg-[#2B2623]/95 hover:bg-[#2B2623] text-[#FAF8F5] text-xs font-semibold py-2.5 px-3 rounded-sm shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#A5D6A7]" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add • {formatPrice(product.price)}</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex text-[#C89B7B]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-current'
                      : 'fill-none stroke-current'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-[#736B63] font-medium">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-sm font-bold text-[#2B2623] group-hover:text-[#8C6A54] transition-colors line-clamp-1">
            <Link href={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* Subtitle */}
          <p className="text-xs text-[#736B63] mt-0.5 line-clamp-1">
            {product.subtitle}
          </p>

          {/* Color swatch circles */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 mt-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  title={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  style={{ backgroundColor: c.hex }}
                  className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                    selectedColor === c.name
                      ? 'border-[#2B2623] ring-1 ring-[#2B2623] scale-110'
                      : 'border-[#D1C7BA] hover:scale-105'
                  }`}
                  aria-label={`Select color ${c.name}`}
                />
              ))}
              <span className="text-[10px] text-[#8C8278] ml-1">
                {product.colors.length} colors
              </span>
            </div>
          )}
        </div>

        {/* Pricing & Mobile Action */}
        <div className="mt-3 pt-3 border-t border-[#F0EBE1] flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-sm text-[#2B2623]">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-[#9E948B] line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className="md:hidden p-1.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm text-[#2B2623] hover:bg-[#2B2623] hover:text-white transition-colors"
            aria-label={`Add ${product.name} to bag`}
          >
            {added ? <Check className="w-4 h-4 text-green-600" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
