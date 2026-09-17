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
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store-context';
import ProductCard from './ProductCard';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedBundle, setSelectedBundle] = useState<number>(2); // Default to Buy 2 as in screenshot
  const [added, setAdded] = useState(false);
  const [openSection, setOpenSection] = useState<string>('details');

  // Hardcode these to match the requested visual perfectly if this is the "cozy-co-robe"
  const isCozyRobe = product.slug === 'cozy-co-robes' || product.slug === 'cozy-co-robe';
  
  // Custom images for the thumbnails based on the screenshot
  const screenshotImages = [
    '/images/cozy_co_robe.jpg', 
    '/images/plush_sherpa_robe.jpg', 
    '/images/cozy_co_robe.jpg', 
    '/images/throw_blanket_cream.jpg',
    '/images/img_10.webp',
    '/images/img_8.webp',
    '/images/img_7.webp'
  ];
  
  const displayImages = isCozyRobe ? screenshotImages : product.images;

  // Bundle Pricing
  const bundles = [
    { 
      id: 1, 
      title: 'Buy 1',
      subtitle: 'Standard price',
      price: 119.00,
      compareAt: 279.99,
      saveTag: null
    },
    { 
      id: 2, 
      title: 'Buy 2',
      subtitle: 'You save 63%',
      price: 205.00,
      compareAt: 559.98,
      saveTag: 'SAVE $354.98',
      popular: true
    },
    { 
      id: 3, 
      title: 'Buy 3',
      subtitle: 'You save 65%',
      price: 294.99,
      compareAt: 839.97,
      saveTag: 'SAVE $544.98'
    }
  ];

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? '' : id);
  };

  const handleAddToCart = () => {
    addToCart(product, product.colors[0]?.name || '', 'Standard', selectedBundle);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-16">
      
      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        
        {/* LEFT: Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] w-full bg-[#3B312A] rounded-2xl overflow-hidden shadow-sm">
            <Image
              src={displayImages[selectedImage] || displayImages[0]}
              alt={`${product.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Thumbnails */}
          {displayImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {displayImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-[72px] aspect-[4/5] rounded-xl overflow-hidden transition-all cursor-pointer shrink-0 ${
                    selectedImage === idx
                      ? 'border-2 border-[#D97757] ring-1 ring-[#D97757]/20 opacity-100'
                      : 'border-2 border-transparent opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`Show image ${idx + 1}`}
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
          )}
        </div>

        {/* RIGHT: Product Buy Box */}
        <div className="space-y-5 lg:pl-6 pt-4">
          
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D97757] mb-3">
              HEATED LOUNGEWEAR
            </div>
            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-[18px] h-[18px] fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium text-[#736B63]">
                Rated 4.8 /5.0 (1073 Reviews)
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-[44px] font-bold text-[#2B2623] mb-4 tracking-tight leading-[1.1]">
              The CozyCo Robe
            </h1>
            <p className="text-[15px] text-[#5C554F] leading-[1.6] max-w-[95%]">
              A sherpa-lined robe with seven adjustable heat levels and 50&quot; × 70&quot; full-body coverage — so you can turn the thermostat down and stay warm anyway.
            </p>

            {/* Price block */}
            <div className="flex items-center gap-4 mt-6">
              <span className="font-serif text-[38px] font-bold text-[#2B2623] leading-none">
                $119.00
              </span>
              <span className="text-lg text-[#8C8278] line-through decoration-1 font-medium">
                $279.99
              </span>
              <span className="bg-[#EAE1D3] text-[#2B2623] text-[11px] font-bold px-3 py-1.5 rounded-full tracking-wide">
                Save $160.99
              </span>
            </div>
          </div>

          <div className="py-2">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px bg-[#D9D0C3] flex-1"></div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#2B2623]">
                BUY MORE - SAVE MORE
              </span>
              <div className="h-px bg-[#D9D0C3] flex-1"></div>
            </div>

            {/* Bundle Selector */}
            <div className="space-y-3">
              {bundles.map((bundle) => {
                const isSelected = selectedBundle === bundle.id;
                return (
                  <div 
                    key={bundle.id}
                    onClick={() => setSelectedBundle(bundle.id)}
                    className={`relative rounded-[4px] border-2 p-4 cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-[#1A1817] bg-white' 
                        : 'border-[#EAE3D9] bg-[#EAE3D9]/30 hover:bg-[#EAE3D9]/60'
                    }`}
                  >
                    {bundle.popular && (
                      <div className="absolute -right-5 -top-4 z-10 scale-90 sm:scale-100">
                        <div className="relative w-16 h-16 flex items-center justify-center text-white text-[10px] font-bold leading-[1.1] text-center transform rotate-[15deg]">
                          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full fill-[#1A1817]">
                            <path d="M50 0 L55 35 L90 20 L70 50 L100 70 L65 75 L60 100 L45 75 L10 80 L30 50 L0 30 L35 25 Z" />
                          </svg>
                          <span className="relative z-10 -rotate-[15deg] pt-0.5">Most<br/>Popular</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-[#1A1817]' : 'border-[#A39A8F] bg-white'
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-[#1A1817]" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[17px] font-bold text-[#2B2623]">{bundle.title}</span>
                            {bundle.saveTag && (
                              <span className="bg-[#D1C8BA]/60 text-[#2B2623] text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                                {bundle.saveTag}
                              </span>
                            )}
                          </div>
                          <div className="text-[13px] text-[#736B63] mt-0.5">{bundle.subtitle}</div>
                        </div>
                      </div>
                      
                      <div className="text-right pr-2">
                        <div className="text-[17px] font-bold text-[#2B2623]">${bundle.price.toFixed(2)}</div>
                        <div className="text-[13px] text-[#A39A8F] line-through font-medium mt-0.5">${bundle.compareAt.toFixed(2)}</div>
                      </div>
                    </div>

                    {/* Dropdowns for selected bundle */}
                    {isSelected && bundle.id > 1 && (
                      <div className="mt-4 pt-4 border-t border-[#EAE3D9] space-y-3">
                        <div className="text-[10px] font-semibold text-[#8C8278] uppercase tracking-wider mb-2">Plug, Style, Color</div>
                        
                        {[...Array(bundle.id)].map((_, idx) => (
                          <div key={idx} className="flex gap-2 sm:gap-3">
                            <div className="w-10 h-12 bg-[#EAE3D9] rounded-[3px] overflow-hidden relative shrink-0">
                               <Image src="/images/cozy_co_robe.jpg" alt="Option" fill className="object-cover" />
                            </div>
                            <div className="flex-1 grid grid-cols-3 gap-2">
                              <select className="bg-white border border-[#D9D0C3] rounded-[3px] text-[11px] px-2 text-[#2B2623] focus:outline-none focus:border-[#8C6A54] cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%232B2623%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_8px_center] pr-6">
                                <option>US</option>
                                <option>UK</option>
                                <option>EU</option>
                              </select>
                              <select className="bg-white border border-[#D9D0C3] rounded-[3px] text-[11px] px-2 text-[#2B2623] focus:outline-none focus:border-[#8C6A54] cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%232B2623%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_8px_center] pr-6">
                                <option>Hooded</option>
                                <option>No Hood</option>
                              </select>
                              <select className="bg-white border border-[#D9D0C3] rounded-[3px] text-[11px] px-2 text-[#2B2623] focus:outline-none focus:border-[#8C6A54] cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%232B2623%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_8px_center] pr-6">
                                <option>Charcoal</option>
                                <option>Cream</option>
                                <option>Blush</option>
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <button
              id="product-detail-add-btn"
              type="button"
              onClick={handleAddToCart}
              className="w-full bg-[#2A2320] hover:bg-[#1A1613] text-[#FAF8F5] text-[15px] font-medium py-[18px] px-4 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              {added ? (
                <>
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <span>Add to bag</span>
              )}
            </button>
          </div>
          
        </div>
      </div>

      {/* DETAILED TABS / ACCORDIONS */}
      <div className="border-t border-[#EAE3D9] pt-12">
        <h2 className="font-serif text-2xl font-bold text-[#2B2623] mb-6">
          Detailed Information & Care
        </h2>

        <div className="divide-y divide-[#EAE3D9] border-y border-[#EAE3D9] bg-white rounded-sm">
          
          {/* Section: Features */}
          <div className="p-5">
            <button
              type="button"
              onClick={() => toggleSection('features')}
              className="w-full flex items-center justify-between font-serif text-base font-bold text-[#2B2623] text-left"
            >
              <span>Key Features & Innovations</span>
              {openSection === 'features' ? <ChevronUp className="w-5 h-5 text-[#8C6A54]" /> : <ChevronDown className="w-5 h-5 text-[#736B63]" />}
            </button>
            {openSection === 'features' && (
              <div className="pt-4 text-xs sm:text-sm text-[#5C554F] space-y-2">
                <ul className="list-disc pl-5 space-y-2">
                  {product.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Section: Specifications */}
          <div className="p-5">
            <button
              type="button"
              onClick={() => toggleSection('specs')}
              className="w-full flex items-center justify-between font-serif text-base font-bold text-[#2B2623] text-left"
            >
              <span>Product Specifications</span>
              {openSection === 'specs' ? <ChevronUp className="w-5 h-5 text-[#8C6A54]" /> : <ChevronDown className="w-5 h-5 text-[#736B63]" />}
            </button>
            {openSection === 'specs' && (
              <div className="pt-4 text-xs sm:text-sm text-[#5C554F]">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="border-b border-[#F0EBE1] pb-2">
                      <dt className="font-semibold text-[#2B2623]">{spec.label}</dt>
                      <dd className="text-[#736B63] mt-0.5">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          {/* Section: How It Works */}
          <div className="p-5">
            <button
              type="button"
              onClick={() => toggleSection('how-it-works')}
              className="w-full flex items-center justify-between font-serif text-base font-bold text-[#2B2623] text-left"
            >
              <span>How It Works & Operation</span>
              {openSection === 'how-it-works' ? <ChevronUp className="w-5 h-5 text-[#8C6A54]" /> : <ChevronDown className="w-5 h-5 text-[#736B63]" />}
            </button>
            {openSection === 'how-it-works' && (
              <div className="pt-4 text-xs sm:text-sm text-[#5C554F]">
                <ol className="list-decimal pl-5 space-y-2">
                  {product.howItWorks.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Section: Care Instructions */}
          <div className="p-5">
            <button
              type="button"
              onClick={() => toggleSection('care')}
              className="w-full flex items-center justify-between font-serif text-base font-bold text-[#2B2623] text-left"
            >
              <span>Washing & Fabric Care Instructions</span>
              {openSection === 'care' ? <ChevronUp className="w-5 h-5 text-[#8C6A54]" /> : <ChevronDown className="w-5 h-5 text-[#736B63]" />}
            </button>
            {openSection === 'care' && (
              <div className="pt-4 text-xs sm:text-sm text-[#5C554F]">
                <ul className="list-disc pl-5 space-y-2">
                  {product.careInstructions.map((inst, i) => (
                    <li key={i}>{inst}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-[#EAE3D9]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-1">
                Complete The Sanctuary
              </p>
              <h2 className="font-serif text-2xl font-bold text-[#2B2623]">
                Pairs Wonderfully With
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-semibold text-[#8C6A54] hover:underline"
            >
              Explore Catalog &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
