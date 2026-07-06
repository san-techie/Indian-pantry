import { useMemo, useState } from 'react';
import { products, categories } from '../data/catalog';
import type { Product } from '../data/catalog';
import ProductCard from './ProductCard';
import { useReveal } from '../hooks/useReveal';

type Props = {
  onQuickView: (p: Product) => void;
  activeCategory: string;
  onCategoryChange: (id: string) => void;
};

export default function ProductGrid({ onQuickView, activeCategory, onCategoryChange }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [sort, setSort] = useState<'featured' | 'price-low' | 'price-high'>('featured');

  const filtered = useMemo(() => {
    const list =
      activeCategory === 'all'
        ? products
        : products.filter((p) => p.categoryId === activeCategory);
    const sorted = [...list];
    if (sort === 'price-low') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [activeCategory, sort]);

  const activeName =
    activeCategory === 'all'
      ? 'Everything'
      : categories.find((c) => c.id === activeCategory)?.name ?? 'Everything';

  return (
    <section id="shop" className="bg-grain bg-chai-50 py-20 lg:py-28">
      <div className="container-x">
        {/* Header */}
        <div
          ref={ref}
          className={`reveal mb-10 text-center ${visible ? 'is-visible' : ''}`}
        >
          <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-spice-600">
            The Collection
          </p>
          <h2 className="font-display text-4xl font-600 leading-tight text-chai-950 sm:text-5xl">
            {activeCategory === 'all' ? 'Shop the whole pantry' : activeName}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-chai-600">
            {activeCategory === 'all'
              ? 'Browse every small-batch batch we make — from stone-ground rotis to festive sweets.'
              : categories.find((c) => c.id === activeCategory)?.description}
          </p>
        </div>

        {/* Filter + sort bar */}
        <div className="mb-10 flex flex-col items-center justify-between gap-4 border-y border-chai-200 py-4 sm:flex-row">
          <div className="no-scrollbar flex w-full gap-2 overflow-x-auto sm:w-auto">
            <FilterChip
              label="All"
              active={activeCategory === 'all'}
              onClick={() => onCategoryChange('all')}
            />
            {categories.map((c) => (
              <FilterChip
                key={c.id}
                label={c.name}
                active={activeCategory === c.id}
                onClick={() => onCategoryChange(c.id)}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-chai-500">Sort</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="appearance-none rounded-full border border-chai-300 bg-chai-50 py-2 pl-4 pr-9 text-sm font-500 text-chai-800 focus:border-spice-500 focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-chai-400">
                ▾
              </span>
            </div>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-display text-xl text-chai-700">Nothing here yet.</p>
            <p className="mt-2 text-chai-500">This shelf is being restocked — check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
            ))}
          </div>
        )}

        {/* Footer note */}
        <p className="mt-12 text-center text-sm text-chai-500">
          Showing {filtered.length} of {products.length} products · All prices in USD
        </p>
      </div>
    </section>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-500 transition ${
        active
          ? 'bg-chai-950 text-chai-50 shadow-soft'
          : 'border border-chai-300 text-chai-700 hover:border-chai-500 hover:bg-chai-100'
      }`}
    >
      {label}
    </button>
  );
}
