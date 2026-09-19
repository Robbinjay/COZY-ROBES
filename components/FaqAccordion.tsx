'use client';

import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import Link from 'next/link';
import Markdown from 'react-markdown';
import { FAQItem } from '@/lib/types';

interface FaqAccordionProps {
  items: FAQItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Products', 'Orders', 'Shipping', 'Returns', 'Payments', 'Care Instructions'];

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="faq-accordion-container" className="space-y-8">
      
      {/* Search Input */}
      <div className="relative max-w-xl">
        <Search className="w-4 h-4 text-[#8C6A54] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          id="faq-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search questions (e.g. contact, washing, shipping, delivery)..."
          className="w-full bg-white border border-[#D9D0C3] rounded-sm py-3 pl-10 pr-4 text-xs sm:text-sm text-[#2B2623] focus:outline-none focus:border-[#8C6A54] shadow-xs"
        />
        {searchQuery && (
          <button
            id="faq-search-clear-btn"
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8A8177] hover:text-[#2B2623] cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div id="faq-category-filters" className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`faq-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-sm text-xs transition-colors cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#2B2623] text-white font-semibold'
                : 'bg-white border border-[#EAE3D9] text-[#5C554F] hover:bg-[#FAF8F5]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-xs text-[#736B63]">
        Showing <strong>{filteredItems.length}</strong> questions in{' '}
        <span className="font-semibold text-[#2B2623]">{activeCategory}</span>
      </div>

      {/* Accordion List */}
      {filteredItems.length === 0 ? (
        <div id="faq-no-results" className="py-12 bg-white rounded-sm border border-[#EAE3D9] text-center p-6">
          <p className="font-serif text-base font-semibold text-[#2B2623] mb-1">
            No matching questions found
          </p>
          <p className="text-xs text-[#736B63] max-w-sm mx-auto mb-4">
            Try searching for a different keyword or browse all categories.
          </p>
          <button
            id="faq-show-all-btn"
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
            }}
            className="text-xs bg-[#2B2623] text-white px-4 py-2 rounded-sm cursor-pointer"
          >
            Show All Questions
          </button>
        </div>
      ) : (
        <div id="faq-items-list" className="space-y-3">
          {filteredItems.map((item, idx) => (
            <details
              key={idx}
              id={`faq-item-${idx}`}
              className="group bg-white p-5 rounded-sm border border-[#EAE3D9] cursor-pointer"
            >
              <summary className="flex items-center justify-between font-serif text-sm sm:text-base font-bold text-[#2B2623] list-none">
                <span className="flex-1 pr-4">{item.question}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-xs bg-[#F0EBE1] text-[#736B63] mr-3 hidden sm:inline-block">
                  {item.category}
                </span>
                <ChevronDown className="w-4 h-4 text-[#8C6A54] group-open:rotate-180 transition-transform duration-200 shrink-0" />
              </summary>
              <div className="text-xs sm:text-sm text-[#5C554F] leading-relaxed mt-3 pt-3 border-t border-[#F0EBE1]">
                <Markdown
                  components={{
                    a: ({ href, children }) => {
                      if (href && href.startsWith('/')) {
                        return (
                          <Link
                            href={href}
                            className="text-[#8C6A54] font-semibold underline hover:text-[#2B2623] transition-colors"
                          >
                            {children}
                          </Link>
                        );
                      }
                      return (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#8C6A54] font-semibold underline hover:text-[#2B2623] transition-colors"
                        >
                          {children}
                        </a>
                      );
                    },
                    p: ({ children }) => <p className="mb-0">{children}</p>,
                  }}
                >
                  {item.answer}
                </Markdown>
              </div>
            </details>
          ))}
        </div>
      )}

    </div>
  );
}
