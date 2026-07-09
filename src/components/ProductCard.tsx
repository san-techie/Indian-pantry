import { Plus, Eye } from 'lucide-react';
import type { Product } from '../data/catalog';
import { useCart } from '../store/cart';

type Props = {
  product: Product;
  onQuickView: (p: Product) => void;
};

const badgeStyles: Record<NonNullable<Product['badge']>, { label: string; class: string }> = {
  new: { label: 'New', class: 'bg-leaf-600 text-leaf-50' },
  sale: { label: 'Sale', class: 'bg-saffron-500 text-white' },
  soldout: { label: 'Sold out', class: 'bg-chai-900 text-chai-100' },
  bestseller: { label: 'Bestseller', class: 'bg-spice-700 text-spice-50' },
};

export default function ProductCard({ product, onQuickView }: Props) {
  const { add } = useCart();
  const soldOut = product.badge === 'soldout';
  const badge = product.badge ? badgeStyles[product.badge] : null;

  return (
    <article className="group relative flex flex-col">
      {/* Image */}
      <div  onClick={() => onQuickView(product)} className="relative aspect-square overflow-hidden rounded-2xl bg-chai-100 cursor-pointer">
        <img
          src={product.image}
          alt={product.name}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
            soldOut ? 'opacity-100' : 'group-hover:opacity-0'
          } group-hover:scale-[1.03]`}
          loading="lazy"
        />
        {!soldOut && (
          <img
            src={product.hoverImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-[1.03] object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
            loading="lazy"
          />
        )}

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {badge && (
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-600 uppercase tracking-wider ${badge.class}`}>
              {badge.label}
            </span>
          )}
          {product.compareAt && (
            <span className="rounded-full bg-chai-50/95 px-2.5 py-1 text-[10px] font-700 text-clay-700 backdrop-blur-sm">
              Save ${(product.compareAt - product.price).toFixed(2)}
            </span>
          )}
        </div>

        {/* Sold out overlay */}
        {soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-chai-950/40">
            <span className="rounded-full bg-chai-50 px-5 py-2 text-xs font-700 uppercase tracking-wider text-chai-900">
              Sold out
            </span>
          </div>
        )}

        {/* Quick actions */}
        {!soldOut && (
          <div className="absolute bottom-3 left-3 right-3 flex translate-y-3 items-center gap-2 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={() => add(product)}
              className="group/btn flex flex-1 items-center justify-center gap-1.5 rounded-full bg-chai-950 py-3 text-xs font-600 uppercase tracking-wider text-chai-50 transition hover:bg-spice-700"
            >
              <Plus size={15} className="transition-transform group-hover/btn:rotate-90" />
              Add
            </button>
            {/* <button
              onClick={() => onQuickView(product)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-chai-50/95 text-chai-900 backdrop-blur-sm transition hover:bg-chai-50"
              aria-label={`Quick view ${product.name}`}
            >
              <Eye size={16} />
            </button> */}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.18em] text-spice-600">
            {product.category}
          </p>
          <h3 className="mt-0.5 font-display text-lg font-600 leading-snug text-chai-950 transition-colors group-hover:text-spice-700">
            {product.name}
          </h3>
          <p className="mt-0.5 text-xs text-chai-500">{product.weight}</p>
        </div>
        <div className="shrink-0 text-right">
          {product.compareAt && (
            <p className="text-xs text-chai-400 line-through">
              ${product.compareAt.toFixed(2)}
            </p>
          )}
          <p className="font-display text-lg font-700 text-chai-950">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </article>
  );
}
