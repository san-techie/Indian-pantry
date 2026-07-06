import { X, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Product } from '../data/catalog';
import { useCart } from '../store/cart';

type Props = {
  product: Product | null;
  onClose: () => void;
};

export default function QuickView({ product, onClose }: Props) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setQty(1);
      setAdded(false);
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!product) return null;
  const soldOut = product.badge === 'soldout';

  const handleAdd = () => {
    add(product, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-chai-950/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl animate-scale-in overflow-hidden rounded-3xl bg-chai-50 shadow-lift">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-chai-50/90 p-2 text-chai-800 backdrop-blur-sm transition hover:bg-chai-100"
          aria-label="Close quick view"
        >
          <X size={20} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square bg-chai-100 md:aspect-auto">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-chai-950 px-3 py-1 text-[10px] font-600 uppercase tracking-wider text-chai-50">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col p-7 lg:p-9">
            <p className="text-[11px] uppercase tracking-[0.2em] text-spice-600">
              {product.category}
            </p>
            <h2 className="mt-1 font-display text-3xl font-600 leading-tight text-chai-950">
              {product.name}
            </h2>
            <div className="mt-3 flex items-center gap-3">
              <span className="font-display text-2xl font-700 text-chai-950">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAt && (
                <span className="text-base text-chai-400 line-through">
                  ${product.compareAt.toFixed(2)}
                </span>
              )}
              <span className="text-sm text-chai-500">· {product.weight}</span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-chai-700">
              {product.description}
            </p>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-spice-100 px-3 py-1 text-xs font-500 text-spice-800"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-7">
              {/* Quantity */}
              <div className="mb-4 flex items-center gap-4">
                <span className="text-sm font-600 text-chai-800">Quantity</span>
                <div className="flex items-center rounded-full border border-chai-300">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-chai-700 hover:bg-chai-100 transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="w-10 text-center font-600 text-chai-950">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-chai-700 hover:bg-chai-100 transition"
                    aria-label="Increase quantity"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              {/* Add button */}
              <button
                onClick={handleAdd}
                disabled={soldOut}
                className={`flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-600 uppercase tracking-wider transition ${
                  soldOut
                    ? 'cursor-not-allowed bg-chai-200 text-chai-500'
                    : added
                      ? 'bg-leaf-600 text-leaf-50'
                      : 'bg-chai-950 text-chai-50 hover:bg-spice-700'
                }`}
              >
                {soldOut ? (
                  'Sold out'
                ) : added ? (
                  <>
                    <Check size={16} /> Added to cart
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} /> Add to cart · ${(product.price * qty).toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
