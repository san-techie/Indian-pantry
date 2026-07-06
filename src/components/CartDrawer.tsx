import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { useCart } from '../store/cart';

export default function CartDrawer() {
  const { items, isOpen, close, setQty, remove, subtotal, count } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 7.5;
  const freeShipRemaining = Math.max(0, 75 - subtotal);
  const freeShipPct = Math.min(100, (subtotal / 75) * 100);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-chai-950/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={close}
      />
      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-chai-50 shadow-lift transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-chai-200 px-6 py-5">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-spice-700" />
            <h2 className="font-display text-lg font-600 text-chai-950">
              Your Cart
            </h2>
            <span className="text-sm text-chai-500">({count})</span>
          </div>
          <button
            onClick={close}
            className="rounded-lg p-2 text-chai-700 hover:bg-chai-100 transition"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free shipping progress */}
        {items.length > 0 && (
          <div className="border-b border-chai-200 bg-spice-50 px-6 py-4">
            <p className="text-xs text-chai-800">
              {freeShipRemaining > 0 ? (
                <>
                  Add <span className="font-600 text-spice-700">${freeShipRemaining.toFixed(2)}</span> more for{' '}
                  <span className="font-600">free shipping</span>
                </>
              ) : (
                <span className="font-600 text-leaf-700">You've unlocked free shipping!</span>
              )}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-chai-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-spice-500 to-saffron-500 transition-all duration-700"
                style={{ width: `${freeShipPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="rounded-full bg-chai-100 p-6">
                <ShoppingBag size={32} className="text-chai-400" />
              </div>
              <p className="mt-5 font-display text-lg font-600 text-chai-900">Your cart is empty</p>
              <p className="mt-1 text-sm text-chai-500">Discover something delicious to get started.</p>
              <button
                onClick={close}
                className="mt-6 rounded-full bg-chai-950 px-6 py-3 text-sm font-500 text-chai-50 transition hover:bg-chai-800"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-4 animate-slide-in-right">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-chai-100">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-spice-600">
                          {item.product.category}
                        </p>
                        <h3 className="font-display text-base font-600 leading-snug text-chai-950">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-chai-500">{item.product.weight}</p>
                      </div>
                      <button
                        onClick={() => remove(item.product.id)}
                        className="rounded-md p-1 text-chai-400 hover:text-clay-700 transition"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full border border-chai-300">
                        <button
                          onClick={() => setQty(item.product.id, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-chai-700 hover:bg-chai-100 transition"
                          aria-label="Decrease"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-600 text-chai-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => setQty(item.product.id, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-chai-700 hover:bg-chai-100 transition"
                          aria-label="Increase"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-600 text-chai-950">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-chai-200 bg-chai-50 px-6 py-5">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-chai-700">
                <span>Subtotal</span>
                <span className="font-600 text-chai-950">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-chai-700">
                <span>Shipping</span>
                <span className="font-600 text-chai-950">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between border-t border-chai-200 pt-2 text-base">
                <span className="font-600 text-chai-950">Total</span>
                <span className="font-display text-lg font-700 text-chai-950">
                  ${(subtotal + shipping).toFixed(2)}
                </span>
              </div>
            </div>
            <button className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-chai-950 py-4 text-sm font-600 uppercase tracking-wider text-chai-50 transition hover:bg-spice-700">
              Checkout
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={close}
              className="mt-2 w-full rounded-full py-2.5 text-xs font-500 uppercase tracking-wider text-chai-600 transition hover:text-chai-950"
            >
              Continue shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
