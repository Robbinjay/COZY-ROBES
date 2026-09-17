'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, BookOpen, Layers, HelpCircle, Package } from 'lucide-react';
import { useStore } from '@/lib/store-context';
import { PRODUCTS, COLLECTIONS, BLOG_POSTS, FAQ_ITEMS } from '@/lib/store-data';
import { formatPrice } from '@/lib/utils';

export default function SearchModal() {
  const { isSearchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    const matchedProducts = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.features.some((f) => f.toLowerCase().includes(q))
    );

    const matchedCollections = COLLECTIONS.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );

    const matchedArticles = BLOG_POSTS.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    );

    const matchedFaqs = FAQ_ITEMS.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q)
    );

    return {
      products: matchedProducts,
      collections: matchedCollections,
      articles: matchedArticles,
      faqs: matchedFaqs,
      total:
        matchedProducts.length +
        matchedCollections.length +
        matchedArticles.length +
        matchedFaqs.length,
    };
  }, [query]);

  if (!isSearchOpen) return null;

  const popularSearches = ['Heated Robe', 'Washable', 'CloudPlush Slippers', 'Size Guide', 'Return Policy'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="search-modal-title">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={closeSearch}
      />

      <div className="min-h-screen px-4 text-center flex items-start justify-center pt-16 pb-20">
        <div className="relative inline-block w-full max-w-2xl bg-[#FAF8F5] rounded-sm text-left shadow-2xl overflow-hidden border border-[#EAE3D9] transform transition-all">
          
          {/* Search Input Bar */}
          <div className="p-4 sm:p-5 border-b border-[#EAE3D9] flex items-center gap-3">
            <Search className="w-5 h-5 text-[#8C6A54] shrink-0" />
            <input
              id="site-search-modal-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search heated robes, accessories, care guides, FAQs..."
              autoFocus
              className="w-full bg-transparent border-none text-[#2B2623] placeholder-[#8A8177] focus:outline-none text-base"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-xs text-[#8A8177] hover:text-[#2B2623] px-1"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={closeSearch}
              className="p-1.5 text-[#736B63] hover:text-[#2B2623] hover:bg-[#EAE3D9]/60 rounded-full transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 max-h-[70vh] overflow-y-auto">
            {!query ? (
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#736B63]">
                  Popular Suggestions
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="bg-[#EAE3D9]/70 hover:bg-[#EAE3D9] text-[#2B2623] text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#EAE3D9]">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#736B63] mb-3">
                    Quick Navigation
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <Link
                      href="/shop"
                      onClick={closeSearch}
                      className="p-2.5 bg-white border border-[#EAE3D9] rounded-sm hover:border-[#8C6A54] transition-colors flex items-center gap-2"
                    >
                      <Package className="w-4 h-4 text-[#8C6A54]" />
                      <span>All Products</span>
                    </Link>
                    <Link
                      href="/collections/heated-robes"
                      onClick={closeSearch}
                      className="p-2.5 bg-white border border-[#EAE3D9] rounded-sm hover:border-[#8C6A54] transition-colors flex items-center gap-2"
                    >
                      <Layers className="w-4 h-4 text-[#8C6A54]" />
                      <span>Heated Robes</span>
                    </Link>
                    <Link
                      href="/faq"
                      onClick={closeSearch}
                      className="p-2.5 bg-white border border-[#EAE3D9] rounded-sm hover:border-[#8C6A54] transition-colors flex items-center gap-2"
                    >
                      <HelpCircle className="w-4 h-4 text-[#8C6A54]" />
                      <span>FAQ Help</span>
                    </Link>
                    <Link
                      href="/blog"
                      onClick={closeSearch}
                      className="p-2.5 bg-white border border-[#EAE3D9] rounded-sm hover:border-[#8C6A54] transition-colors flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4 text-[#8C6A54]" />
                      <span>Care Blog</span>
                    </Link>
                  </div>
                </div>
              </div>
            ) : searchResults && searchResults.total === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm font-semibold text-[#2B2623] mb-1">
                  No matches found for &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-[#736B63] max-w-sm mx-auto mb-4">
                  Check your spelling or browse our full catalog of heated robes and cozy loungewear.
                </p>
                <Link
                  href="/shop"
                  onClick={closeSearch}
                  className="inline-block bg-[#2B2623] text-[#FAF8F5] text-xs px-4 py-2 rounded-sm font-medium hover:bg-[#47403C] transition-colors"
                >
                  View All Products &rarr;
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Products */}
                {searchResults && searchResults.products.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#736B63] mb-3 flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5" />
                      <span>Products ({searchResults.products.length})</span>
                    </h3>
                    <div className="space-y-2">
                      {searchResults.products.map((prod) => (
                        <Link
                          key={prod.id}
                          href={`/products/${prod.slug}`}
                          onClick={closeSearch}
                          className="flex items-center gap-3 p-2 rounded-sm hover:bg-[#F2ECE4] transition-colors group"
                        >
                          <div className="relative w-12 h-14 bg-[#EAE3D9] rounded-sm overflow-hidden shrink-0">
                            <Image
                              src={prod.images[0]}
                              alt={prod.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#2B2623] group-hover:text-[#8C6A54] truncate">
                              {prod.name}
                            </p>
                            <p className="text-xs text-[#736B63] truncate">
                              {prod.subtitle}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold text-[#2B2623]">
                              {formatPrice(prod.price)}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Collections */}
                {searchResults && searchResults.collections.length > 0 && (
                  <div className="pt-2 border-t border-[#EAE3D9]">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#736B63] mb-3 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Collections ({searchResults.collections.length})</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {searchResults.collections.map((col) => (
                        <Link
                          key={col.slug}
                          href={`/collections/${col.slug}`}
                          onClick={closeSearch}
                          className="p-3 bg-white border border-[#EAE3D9] rounded-sm hover:border-[#8C6A54] transition-colors flex items-center justify-between"
                        >
                          <div>
                            <p className="text-xs font-semibold text-[#2B2623]">{col.title}</p>
                            <p className="text-[11px] text-[#736B63] line-clamp-1">{col.subtitle}</p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[#8C6A54]" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Articles */}
                {searchResults && searchResults.articles.length > 0 && (
                  <div className="pt-2 border-t border-[#EAE3D9]">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#736B63] mb-3 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Guides & Articles ({searchResults.articles.length})</span>
                    </h3>
                    <div className="space-y-2">
                      {searchResults.articles.map((art) => (
                        <Link
                          key={art.slug}
                          href={`/blog/${art.slug}`}
                          onClick={closeSearch}
                          className="block p-2.5 rounded-sm hover:bg-[#F2ECE4] transition-colors"
                        >
                          <p className="text-xs font-semibold text-[#2B2623]">{art.title}</p>
                          <p className="text-[11px] text-[#736B63] line-clamp-1 mt-0.5">{art.excerpt}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* FAQ questions */}
                {searchResults && searchResults.faqs.length > 0 && (
                  <div className="pt-2 border-t border-[#EAE3D9]">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#736B63] mb-3 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Frequently Asked Questions ({searchResults.faqs.length})</span>
                    </h3>
                    <div className="space-y-2">
                      {searchResults.faqs.map((faq, i) => (
                        <Link
                          key={i}
                          href="/faq"
                          onClick={closeSearch}
                          className="block p-2.5 rounded-sm hover:bg-[#F2ECE4] transition-colors text-xs"
                        >
                          <p className="font-semibold text-[#2B2623]">{faq.question}</p>
                          <p className="text-[11px] text-[#736B63] line-clamp-1 mt-0.5">{faq.answer}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
