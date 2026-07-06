import { X, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import { categories } from '../data/catalog';

type Props = {
  open: boolean;
  onClose: () => void;
  onNav: (target: string) => void;
};

export default function MobileNav({ open, onClose, onNav }: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  const go = (t: string) => {
    onNav(t);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-chai-950/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed left-0 top-0 z-[70] flex h-full w-[85%] max-w-sm flex-col bg-chai-50 shadow-lift transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-chai-200 px-6 py-5">
          <span className="font-display text-xl font-600 text-chai-950">Sāvana</span>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-chai-700 hover:bg-chai-100"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <button
            onClick={() => go('home')}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-base font-600 text-chai-950 transition hover:bg-chai-100"
          >
            Home
            <ChevronRight size={18} className="text-chai-400" />
          </button>
          <p className="px-4 pb-1 pt-4 text-[11px] uppercase tracking-[0.2em] text-chai-400">
            Shop by category
          </p>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => go(c.id)}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left transition hover:bg-chai-100"
            >
              <span>
                <span className="block text-base font-600 text-chai-950">{c.name}</span>
                <span className="block text-xs text-chai-500">{c.tagline}</span>
              </span>
              <ChevronRight size={18} className="text-chai-400" />
            </button>
          ))}
          <p className="px-4 pb-1 pt-4 text-[11px] uppercase tracking-[0.2em] text-chai-400">
            Explore
          </p>
          <button
            onClick={() => go('story')}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-base font-600 text-chai-950 transition hover:bg-chai-100"
          >
            Our Story
            <ChevronRight size={18} className="text-chai-400" />
          </button>
          <button
            onClick={() => go('contact')}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-base font-600 text-chai-950 transition hover:bg-chai-100"
          >
            Contact
            <ChevronRight size={18} className="text-chai-400" />
          </button>
        </nav>

        <div className="border-t border-chai-200 px-6 py-5 text-center">
          <p className="text-xs text-chai-500">Free shipping over $75</p>
          <p className="mt-1 text-xs text-chai-500">Code SAVANA10 — 10% off first order</p>
        </div>
      </aside>
    </>
  );
}
