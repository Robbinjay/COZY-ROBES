'use client';

import React, { useState, useMemo } from 'react';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

interface ShopCatalogProps {
  initialProducts: Product[];
}

export default function ShopCatalog({ initialProducts }: ShopCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(200);

  // Extract all unique categories and colors
  const categories = [
    { label: 'All Items', value: 'all' },
    { label: 'Heated Robes', value: 'heated-robes' },
    { label: 'Cozy Accessories', value: 'cozy-accessories' },
  ];

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        if (selectedColor !== 'all' && !p.colors.some((c) => c.name.toLowerCase().includes(selectedColor.toLowerCase()))) {
          return false;
        }
        if (p.price > maxPrice) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [initialProducts, selectedCategory, selectedColor, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedColor('all');
    setMaxPrice(200);
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedColor !== 'all' || maxPrice < 200 || sortBy !== 'featured';

  return (
    <div className="space-y-8">
      
      {/* Controls Bar: Filters & Sort */}
      <div className="bg-white p-4 rounded-sm border border-[#EAE3D9] flex flex-wrap items-center justify-between gap-4">
        
        {/* Category tabs */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-[#2B2623] text-white font-semibold'
                  : 'bg-[#FAF8F5] text-[#5C554F] hover:bg-[#EAE3D9]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sorting & secondary controls */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="flex items-center gap-1.5 text-xs text-[#5C554F]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#8C6A54]" />
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FAF8F5] border border-[#D9D0C3] rounded-sm py-1.5 px-2 text-xs text-[#2B2623] focus:outline-none focus:border-[#8C6A54]"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-[#8C6A54] hover:text-[#2B2623] flex items-center gap-1 underline underline-offset-2"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#736B63] px-1">
        <span>
          Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'item' : 'items'}
        </span>
        <span>Free UK delivery on all orders over £150</span>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-sm border border-[#EAE3D9] p-8">
          <h3 className="font-serif text-lg font-bold text-[#2B2623] mb-2">
            No products match your filters
          </h3>
          <p className="text-xs text-[#736B63] max-w-sm mx-auto mb-4">
            Try adjusting your category or price range to see more comfortable items.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="bg-[#2B2623] text-white text-xs font-semibold px-4 py-2 rounded-sm hover:bg-[#47403C] transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
