import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Flame,
  Power,
  HeartHandshake,
  Coffee,
  Moon,
  Laptop,
  Check,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { PRODUCTS, FAQ_ITEMS } from '@/lib/store-data';
import FeaturedProductSection from '@/components/FeaturedProductSection';
import ProductCard from '@/components/ProductCard';
import { getFaqSchema } from '@/lib/seo';
import { formatPrice } from '@/lib/utils';

export default function HomePage() {
  const featuredProduct = PRODUCTS.find((p) => p.slug === 'cozy-co-robes') || PRODUCTS[0];
  const catalogProducts = PRODUCTS.slice(0, 4);
  const bundleProducts = PRODUCTS.filter((p) => p.slug !== 'cozy-co-robes').slice(0, 3);
  const homepageFaqs = FAQ_ITEMS.slice(0, 8);
  const faqSchema = getFaqSchema(homepageFaqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* SECTION 1: HERO */}
      <section id="hero" className="relative bg-[#FAF8F5] pt-8 pb-16 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 bg-[#EFE9DF] text-[#634E3F] text-xs font-semibold px-3 py-1.5 rounded-full tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#B86246]" />
                <span>Next-Generation Heated Loungewear</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2B2623] leading-[1.12]">
                Warmth You Can Wear.
              </h1>

              <p className="text-base sm:text-lg text-[#5C554F] leading-relaxed max-w-xl">
                Wrap yourself in everyday comfort with soft, cozy heated robes designed for slow mornings, chilly evenings, work-from-home days and everything in between.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  id="hero-primary-cta"
                  href="/collections/heated-robes"
                  className="bg-[#2B2623] hover:bg-[#47403C] text-[#FAF8F5] text-xs sm:text-sm font-semibold tracking-wider uppercase px-8 py-4 rounded-sm transition-all duration-200 text-center shadow-xs hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Shop Heated Robes</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  id="hero-secondary-cta"
                  href="#why-cozycorobes"
                  className="bg-transparent hover:bg-[#EAE3D9]/60 text-[#2B2623] border border-[#D9D0C3] text-xs sm:text-sm font-semibold tracking-wider uppercase px-6 py-4 rounded-sm transition-colors text-center cursor-pointer"
                >
                  Why CozyCorobes?
                </a>
              </div>

              {/* Verified rating summary */}
              <div className="flex items-center gap-4 pt-4 border-t border-[#EAE3D9] text-xs text-[#5C554F]">
                <div className="flex text-[#C89B7B]">
                  {'★★★★★'}
                </div>
                <span>
                  Rated <strong>4.9 / 5</strong> by 140+ early winter adopters
                </span>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-16/10 sm:aspect-4/3 lg:aspect-5/4 w-full rounded-sm overflow-hidden shadow-lg border border-[#EAE3D9] bg-[#EAE3D9]">
                <Image
                  src="/images/hero_heated_robe.jpg"
                  alt="Person wearing CozyCorobes premium heated robe relaxing in a sunlit living room"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating pill badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs p-3 rounded-sm shadow-md border border-[#EAE3D9] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F5EFEB] flex items-center justify-center text-[#B86246]">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2B2623]">Instant Radiant Heat</p>
                    <p className="text-[11px] text-[#736B63]">60-sec fast warm-up • 3 levels</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: TRUST / BENEFIT BAR */}
      <section id="trust-bar" aria-label="Trust and Guarantees" className="bg-[#FAF5EE] border-y border-[#EAE3D9] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center md:text-left">
            
            <div className="flex items-center justify-center md:justify-start gap-2.5 text-xs text-[#2B2623] font-medium">
              <Check className="w-4 h-4 text-[#8C6A54] shrink-0" />
              <span>Comfortable, Cozy Materials</span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2.5 text-xs text-[#2B2623] font-medium">
              <ShieldCheck className="w-4 h-4 text-[#8C6A54] shrink-0" />
              <span>Secure Encrypted Checkout</span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2.5 text-xs text-[#2B2623] font-medium">
              <Truck className="w-4 h-4 text-[#8C6A54] shrink-0" />
              <span>Fast UK Delivery via Royal Mail</span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2.5 text-xs text-[#2B2623] font-medium">
              <RotateCcw className="w-4 h-4 text-[#8C6A54] shrink-0" />
              <span>30-Day Easy Returns</span>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED PRODUCT */}
      <FeaturedProductSection product={featuredProduct} />

      {/* SECTION 4: WHY COZY COROBES */}
      <section id="why-cozycorobes" className="py-16 sm:py-24 bg-[#F5EFEB] border-t border-[#EAE3D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-2">
              Everyday Comfort Reimagined
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2623]">
              More Than a Robe. Your New Favorite Comfort.
            </h2>
            <p className="text-sm text-[#5C554F] mt-3">
              Traditional heated blankets trap you in one spot. CozyCorobes gives you liberating, wearable warmth designed for moving, living, and resting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-7 rounded-sm border border-[#EAE3D9] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-sm bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center text-[#8C6A54] mb-5">
                  <Sparkles className="w-6 h-6 stroke-1.5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2B2623] mb-2">
                  COMFORT FIRST
                </h3>
                <p className="text-xs sm:text-sm text-[#5C554F] leading-relaxed">
                  Ultra-soft plush materials designed specifically for relaxing at home. Featherlight against the skin without synthetic stiffness.
                </p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-sm border border-[#EAE3D9] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-sm bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center text-[#8C6A54] mb-5">
                  <Flame className="w-6 h-6 stroke-1.5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2B2623] mb-2">
                  WEARABLE WARMTH
                </h3>
                <p className="text-xs sm:text-sm text-[#5C554F] leading-relaxed">
                  Stay comfortable while reading, working, watching TV or moving around the house freely with our cordless power pouch options.
                </p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-sm border border-[#EAE3D9] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-sm bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center text-[#8C6A54] mb-5">
                  <Power className="w-6 h-6 stroke-1.5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2B2623] mb-2">
                  EASY TO USE
                </h3>
                <p className="text-xs sm:text-sm text-[#5C554F] leading-relaxed">
                  Simple single-touch LED controls and intuitive operation. Instant temperature adjustment with intelligent auto-shutoff built in.
                </p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-sm border border-[#EAE3D9] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-sm bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-center text-[#8C6A54] mb-5">
                  <HeartHandshake className="w-6 h-6 stroke-1.5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2B2623] mb-2">
                  MADE FOR EVERYDAY LIFE
                </h3>
                <p className="text-xs sm:text-sm text-[#5C554F] leading-relaxed">
                  Designed around real daily routines rather than sitting motionless under a cord. Fully machine-washable for simple ongoing care.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-2">
              Intuitive Simplicity
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2623]">
              How It Works
            </h2>
            <p className="text-xs sm:text-sm text-[#736B63] mt-2">
              Three effortless steps to personalized warmth in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            <div className="relative p-6 bg-white border border-[#EAE3D9] rounded-sm text-center">
              <span className="font-serif text-4xl font-bold text-[#D9CFC4] block mb-3">
                01
              </span>
              <h3 className="font-serif text-lg font-bold text-[#2B2623] mb-2">
                Put It On
              </h3>
              <p className="text-xs text-[#5C554F] leading-relaxed">
                Slip into the cloud-fleece robe, tie the belt to your preferred fit, and sink into immediate plush softness.
              </p>
            </div>

            <div className="relative p-6 bg-white border border-[#EAE3D9] rounded-sm text-center">
              <span className="font-serif text-4xl font-bold text-[#D9CFC4] block mb-3">
                02
              </span>
              <h3 className="font-serif text-lg font-bold text-[#2B2623] mb-2">
                Set Your Comfort
              </h3>
              <p className="text-xs text-[#5C554F] leading-relaxed">
                Press the soft-touch LED lapel button to toggle between Low (40°C / 104°F), Medium (46°C / 115°F), or High (53°C / 128°F) soothing heat.
              </p>
            </div>

            <div className="relative p-6 bg-white border border-[#EAE3D9] rounded-sm text-center">
              <span className="font-serif text-4xl font-bold text-[#D9CFC4] block mb-3">
                03
              </span>
              <h3 className="font-serif text-lg font-bold text-[#2B2623] mb-2">
                Relax
              </h3>
              <p className="text-xs text-[#5C554F] leading-relaxed">
                Feel radiant warmth spread across your back, chest, and pockets. The built-in 2-hour timer takes care of the rest.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: LIFESTYLE SECTION */}
      <section id="lifestyle" className="py-16 sm:py-24 bg-[#F3EDE5] border-y border-[#EAE3D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-2">
              Designed For Daily Living
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2623]">
              Comfort That Goes Wherever You Do.
            </h2>
            <p className="text-xs sm:text-sm text-[#5C554F] mt-2">
              Whether you are brewing dawn coffee, attending video meetings, or winding down before sleep.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Slow Mornings */}
            <div className="bg-white rounded-sm overflow-hidden border border-[#EAE3D9] shadow-xs group">
              <div className="relative aspect-4/3 w-full bg-[#EAE3D9] overflow-hidden">
                <Image
                  src="/images/img_8.webp"
                  alt="Woman in robe having morning coffee"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8C6A54] mb-1.5">
                  <Coffee className="w-4 h-4" />
                  <span>Slow Mornings</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2B2623] mb-2">
                  Gentle Morning Dawn
                </h3>
                <p className="text-xs text-[#5C554F] leading-relaxed">
                  Step out of bed into instant warmth. Savor your hot coffee or tea without shivering in drafty hallways or waiting for central heating to kick in.
                </p>
              </div>
            </div>

            {/* Card 2: Cold Evenings */}
            <div className="bg-white rounded-sm overflow-hidden border border-[#EAE3D9] shadow-xs group">
              <div className="relative aspect-4/3 w-full bg-[#EAE3D9] overflow-hidden">
                <Image
                  src="/images/img_10.webp"
                  alt="Cozy evening on the sofa with heated blanket"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8C6A54] mb-1.5">
                  <Moon className="w-4 h-4" />
                  <span>Cold Evenings</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2B2623] mb-2">
                  Peaceful Evening Unwind
                </h3>
                <p className="text-xs text-[#5C554F] leading-relaxed">
                  Curl up with a novel or your favorite film. Targeted warming soothing tired muscles and melting away the tension of a long, chilly day.
                </p>
              </div>
            </div>

            {/* Card 3: Work From Home */}
            <div className="bg-white rounded-sm overflow-hidden border border-[#EAE3D9] shadow-xs group">
              <div className="relative aspect-4/3 w-full bg-[#EAE3D9] overflow-hidden">
                <Image
                  src="/images/img_7.webp"
                  alt="Working comfortably from home desk in cozy wrap"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8C6A54] mb-1.5">
                  <Laptop className="w-4 h-4" />
                  <span>Work From Home</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2B2623] mb-2">
                  Warm & Productive Focus
                </h3>
                <p className="text-xs text-[#5C554F] leading-relaxed">
                  Stay cozy at your home office desk without running noisy space heaters or paying hundreds to heat unused rooms in your home.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: PRODUCT BENEFITS */}
      <section id="benefits" className="py-16 sm:py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative aspect-4/5 rounded-sm overflow-hidden border border-[#EAE3D9] bg-[#EAE3D9] shadow-xs">
              <Image
                src="/images/featured_robe_studio.jpg"
                alt="CozyCorobes material and stitching details"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-2">
                  Thoughtfully Engineered
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2623]">
                  The Standards Behind Every CozyCorobes Piece
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#5C554F]">
                <div className="p-4 bg-white border border-[#EAE3D9] rounded-sm">
                  <h3 className="font-serif text-base font-bold text-[#2B2623] mb-1">
                    Soft & Cozy Materials
                  </h3>
                  <p>
                    Premium 320 GSM cloud fleece paired with high-pile sherpa lining creates a luxuriously soft barrier against winter drafts, even before power is connected.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#EAE3D9] rounded-sm">
                  <h3 className="font-serif text-base font-bold text-[#2B2623] mb-1">
                    Adjustable Radiant Warmth
                  </h3>
                  <p>
                    Three precisely calibrated heat settings allow you to dial in your personal comfort level, from gentle ambient warmth (40°C / 104°F) to deep soothing heat (53°C / 128°F).
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#EAE3D9] rounded-sm">
                  <h3 className="font-serif text-base font-bold text-[#2B2623] mb-1">
                    Comfortable Full-Body Coverage
                  </h3>
                  <p>
                    Oversized kimono wrap cut ensures your shoulders, back, and knees remain fully cocooned in comfort with spacious heated hand-warming front pockets.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#EAE3D9] rounded-sm">
                  <h3 className="font-serif text-base font-bold text-[#2B2623] mb-1">
                    Easy Machine-Washable Care
                  </h3>
                  <p>
                    Disconnect the magnetic power lead and toss into the washing machine on gentle cold cycle. Safe, reliable, and designed for real households.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 8: PRODUCT COLLECTION GRID */}
      <section id="collection-grid" className="py-16 sm:py-24 bg-[#F5EFEB] border-t border-[#EAE3D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-2">
                Curated Comfort Catalog
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2623]">
                Shop CozyCorobes
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-bold uppercase tracking-wider text-[#2B2623] hover:text-[#8C6A54] flex items-center gap-1.5 underline underline-offset-4"
            >
              <span>View All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {catalogProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 9: BUNDLE / MULTI-PRODUCT SECTION */}
      <section id="bundles" className="py-16 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#EFE9DF] p-8 sm:p-12 rounded-sm border border-[#DDD4C7]">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-2 block">
                Comfort Pairings
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2623]">
                Make Home Even Cozier.
              </h2>
              <p className="text-xs sm:text-sm text-[#5C554F] mt-2">
                Pair your heated robe with our rechargeable bootie slippers or soothing weighted neck wraps for head-to-toe comfort.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {bundleProducts.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-sm border border-[#EAE3D9] flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-4/3 rounded-xs overflow-hidden mb-3 bg-[#F2ECE4]">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        sizes="250px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <h3 className="font-serif text-sm font-bold text-[#2B2623] line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-[#736B63] mt-0.5 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#F0EBE1] flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2B2623]">
                      {formatPrice(item.price)}
                    </span>
                    <Link
                      href={`/products/${item.slug}`}
                      className="text-xs text-[#8C6A54] hover:underline font-semibold"
                    >
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 10: FAQ */}
      <section id="faq-section" className="py-16 sm:py-24 bg-[#F5EFEB] border-t border-[#EAE3D9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8C6A54] mb-2">
              Common Questions
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B2623]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#736B63] mt-2">
              Everything you need to know about our heating technology, sizing, care, and guarantee.
            </p>
          </div>

          <div className="space-y-4">
            {homepageFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white p-5 rounded-sm border border-[#EAE3D9] cursor-pointer"
              >
                <summary className="flex items-center justify-between font-serif text-sm sm:text-base font-bold text-[#2B2623] list-none">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-4 h-4 text-[#8C6A54] group-open:rotate-180 transition-transform duration-200 shrink-0 ml-2" />
                </summary>
                <p className="text-xs sm:text-sm text-[#5C554F] leading-relaxed mt-3 pt-3 border-t border-[#F0EBE1]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-[#736B63]">
            Have more questions? Visit our{' '}
            <Link href="/faq" className="text-[#8C6A54] underline font-semibold">
              Complete FAQ Page
            </Link>{' '}
            or contact our customer care team at{' '}
            <a href="mailto:support@cozyrobe.co.uk" className="text-[#8C6A54] underline font-semibold">
              support@cozyrobe.co.uk
            </a>.
          </div>

        </div>
      </section>

      {/* SECTION 11: FINAL CTA */}
      <section id="final-cta" className="py-20 bg-[#231F1D] text-[#FAF8F5] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#C89B7B]">
            Embrace Everyday Warmth
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Stay Cozy. Stay Comfortable.
          </h2>
          <p className="text-sm sm:text-base text-[#BDB2A7] max-w-xl mx-auto leading-relaxed">
            Find your new favorite way to relax. Covered by our 30-Day Cozy Trial and free UK delivery on orders over £100.
          </p>
          <div className="pt-2">
            <Link
              id="final-cta-shop-btn"
              href="/shop"
              className="inline-block bg-[#C89B7B] hover:bg-[#B88A6A] text-[#231F1D] text-xs sm:text-sm font-bold uppercase tracking-wider px-9 py-4 rounded-sm transition-colors shadow-sm cursor-pointer"
            >
              Shop Now &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
