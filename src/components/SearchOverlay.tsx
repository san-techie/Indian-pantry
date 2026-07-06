import { Search, X, TrendingUp } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { products, categories } from '../data/catalog';
import type { Product } from '../data/catalog';

type Props = {
  open: boolean;
  onClose: () => void;
  onPickProduct: (p: Product) => void;
  onPickCategory: (id: string) => void;
};

const suggestions = ['Roti', 'Chutney', 'Makhana', 'Gluten-free', 'Biryani', 'Sweet'];

export default function SearchOverlay({ open, onClose, onPickProduct, onPickCategory }: Props) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      )
      .slice(0, 6);
  }, [query]);

  const matchedCategories = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return categories.filter((c) => c.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div
      className={`fixed inset-0 z-[80] transition-all duration-300 ${
        open ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 bg-chai-950/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative mx-auto mt-0 w-full bg-chai-50 shadow-lift transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? 'translate-y-0' : '-translate-y-8'
        }`}
      >
        <div className="container-x py-6 lg:py-8">
          <div className="flex items-center gap-4 border-b border-chai-300 pb-4">
            <Search size={24} className="text-spice-600" />
            <input
              autoFocus={open}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the pantry — rotis, chutneys, sweets…"
              className="flex-1 bg-transparent font-display text-xl text-chai-950 placeholder:text-chai-400 focus:outline-none lg:text-2xl"
            />
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-chai-700 hover:bg-chai-100 transition"
              aria-label="Close search"
            >
              <X size={22} />
            </button>
          </div>

          {/* Suggestions or results */}
          {!query.trim() ? (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 text-xs uppercase tracking-wider text-chai-500">
                <TrendingUp size={14} /> Popular
              </span>
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="rounded-full border border-chai-300 px-4 py-1.5 text-sm text-chai-800 transition hover:border-spice-500 hover:bg-spice-50 hover:text-spice-700"
                >
                  {s}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {/* Products */}
              <div className="lg:col-span-2">
                <p className="mb-3 text-xs uppercase tracking-wider text-chai-500">
                  {results.length} product{results.length !== 1 ? 's' : ''}
                </p>
                {results.length === 0 ? (
                  <p className="text-chai-600">No products match "{query}". Try another term.</p>
                ) : (
                  <ul className="divide-y divide-chai-200">
                    {results.map((p) => (
                      <li key={p.id}>
                        <button
                          onClick={() => onPickProduct(p)}
                          className="flex w-full items-center gap-4 py-3 text-left transition hover:bg-chai-100/60 rounded-lg px-2"
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-14 w-14 rounded-lg object-cover"
                            loading="lazy"
                          />
                          <div className="flex-1">
                            <p className="text-[11px] uppercase tracking-wider text-spice-600">
                              {p.category}
                            </p>
                            <p className="font-display text-base font-600 text-chai-950">{p.name}</p>
                          </div>
                          <span className="font-600 text-chai-800">${p.price.toFixed(2)}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* Categories */}
              <div>
                <p className="mb-3 text-xs uppercase tracking-wider text-chai-500">Categories</p>
                {matchedCategories.length === 0 ? (
                  <p className="text-sm text-chai-500">No categories match.</p>
                ) : (
                  <ul className="space-y-2">
                    {matchedCategories.map((c) => (
                      <li key={c.id}>
                        <button
                          onClick={() => onPickCategory(c.id)}
                          className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition hover:bg-chai-100"
                        >
                          <img src={c.image} alt={c.name} className="h-12 w-12 rounded-lg object-cover" />
                          <div>
                            <p className="font-600 text-chai-950">{c.name}</p>
                            <p className="text-xs text-chai-500">{c.count} items</p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
