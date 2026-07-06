import { Flame, ArrowRight, Clock } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { useCart } from '../store/cart';
import { products } from '../data/catalog';

type Props = {
  onNav: (target: string) => void;
};

export default function FlashBanner({ onNav }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const { add } = useCart();
  const combo = products.find((p) => p.id === 'biryani-kit')!;

  return (
    <section className="bg-chai-50 py-10">
      <div className="container-x">
        <div
          ref={ref}
          className={`reveal overflow-hidden rounded-3xl bg-gradient-to-br from-spice-700 via-spice-800 to-chai-950 px-6 py-8 shadow-card lg:px-12 lg:py-10 ${
            visible ? 'is-visible' : ''
          }`}
        >
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-saffron-500/20 text-saffron-300 sm:flex">
                <Flame size={28} />
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center gap-2 lg:justify-start">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron-500 px-3 py-1 text-[10px] font-700 uppercase tracking-wider text-white">
                    <Clock size={11} /> Flash Sale
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-spice-200">
                    Ends Sunday
                  </span>
                </div>
                <h3 className="mt-2 font-display text-2xl font-600 text-chai-50 sm:text-3xl">
                  {combo.name} — ${combo.price.toFixed(2)}{' '}
                  {combo.compareAt && (
                    <span className="text-base text-spice-300 line-through">
                      ${combo.compareAt.toFixed(2)}
                    </span>
                  )}
                </h3>
                <p className="mt-1 text-sm text-spice-200">
                  Save ${(combo.compareAt! - combo.price).toFixed(2)} this week only — serves four, ready in 20 minutes.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <button
                onClick={() => add(combo)}
                className="rounded-full bg-chai-50 px-6 py-3 text-sm font-600 uppercase tracking-wider text-chai-950 transition hover:bg-saffron-300"
              >
                Add to cart
              </button>
              <button
                onClick={() => onNav('shop')}
                className="group flex items-center gap-1.5 text-sm font-600 uppercase tracking-wider text-chai-50 transition hover:text-saffron-300"
              >
                Shop all
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
