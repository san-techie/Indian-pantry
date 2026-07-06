import { Search, ShoppingBag, User, Menu, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { categories } from '../data/catalog';
import { useCart } from '../store/cart';

type Props = {
  onSearchOpen: () => void;
  onMobileNavOpen: () => void;
  onNav: (target: string) => void;
  active: string;
};

const announcements = [
  'Free shipping on orders over $75 across the USA',
  'New batch roasted every Tuesday — order by Monday midnight',
  'Use code SAVANA10 for 10% off your first pantry order',
];

export default function Header({ onSearchOpen, onMobileNavOpen, onNav, active }: Props) {
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [announceIdx, setAnnounceIdx] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setAnnounceIdx((i) => (i + 1) % announcements.length), 4500);
    return () => clearInterval(t);
  }, []);

  const navItems = [
    { label: 'Home', target: 'home' },
    ...categories.map((c) => ({ label: c.name, target: c.id })),
    { label: 'Our Story', target: 'story' },
    { label: 'Contact', target: 'contact' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-chai-950 text-chai-100 text-[11px] tracking-[0.18em] uppercase">
        <div className="container-x flex h-9 items-center justify-center overflow-hidden">
          <div key={announceIdx} className="animate-fade-in text-center font-medium">
            {announcements[announceIdx]}
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? 'bg-chai-50/95 backdrop-blur-md shadow-soft'
            : 'bg-chai-50/70 backdrop-blur-sm'
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
          {/* Left: mobile menu + nav */}
          <div className="flex items-center gap-2">
            <button
              onClick={onMobileNavOpen}
              className="lg:hidden -ml-2 rounded-lg p-2 text-chai-800 hover:bg-chai-100 transition"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.slice(0, 4).map((item) => (
                <NavButton
                  key={item.target}
                  label={item.label}
                  active={active === item.target}
                  hovered={hovered === item.target}
                  onMouseEnter={() => setHovered(item.target)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => onNav(item.target)}
                />
              ))}
            </nav>
          </div>

          {/* Center: logo */}
          <button
            onClick={() => onNav('home')}
            className="absolute left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center leading-none"
            aria-label="Sāvana home"
          >
            <span className="font-display text-2xl font-600 tracking-tight text-chai-950">
              Sāvana
            </span>
            <span className="mt-0.5 text-[9px] tracking-[0.4em] uppercase text-spice-600">
              Indian Pantry
            </span>
          </button>

          {/* Mobile logo */}
          <button
            onClick={() => onNav('home')}
            className="lg:hidden font-display text-xl font-600 text-chai-950"
          >
            Sāvana
          </button>

          {/* Right: actions + nav */}
          <div className="flex items-center gap-1 lg:gap-2">
            <nav className="hidden lg:flex items-center gap-1 mr-1">
              {navItems.slice(4).map((item) => (
                <NavButton
                  key={item.target}
                  label={item.label}
                  active={active === item.target}
                  hovered={hovered === item.target}
                  onMouseEnter={() => setHovered(item.target)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => onNav(item.target)}
                />
              ))}
            </nav>
            <button
              onClick={onSearchOpen}
              className="rounded-lg p-2 text-chai-800 hover:bg-chai-100 transition"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              className="hidden sm:flex rounded-lg p-2 text-chai-800 hover:bg-chai-100 transition"
              aria-label="Account"
            >
              <User size={20} />
            </button>
            <button
              onClick={open}
              className="relative rounded-lg p-2 text-chai-800 hover:bg-chai-100 transition"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-saffron-500 px-1 text-[10px] font-600 text-white animate-scale-in">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category mega-strip */}
        <div className="hidden lg:block border-t border-chai-200/60">
          <div className="container-x flex h-11 items-center justify-center gap-7 text-[12px] tracking-[0.12em] uppercase font-500">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => onNav(c.id)}
                onMouseEnter={() => setHovered(c.id)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative flex items-center gap-1.5 py-1 transition-colors ${
                  active === c.id ? 'text-spice-700' : 'text-chai-700 hover:text-chai-950'
                }`}
              >
                {c.name}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-spice-600 transition-all duration-300 ${
                    active === c.id || hovered === c.id ? 'w-full' : 'w-0'
                  }`}
                />
                <ChevronRight
                  size={12}
                  className={`transition-all duration-300 ${
                    hovered === c.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function NavButton({
  label,
  active,
  hovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  label: string;
  active: boolean;
  hovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}) {
  return (
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`relative px-3 py-2 text-sm font-500 tracking-wide transition-colors ${
        active ? 'text-spice-700' : 'text-chai-800 hover:text-chai-950'
      }`}
    >
      {label}
      <span
        className={`absolute bottom-1 left-3 right-3 h-px bg-spice-600 transition-all duration-300 ${
          active || hovered ? 'scale-x-100' : 'scale-x-0'
        } origin-left`}
      />
    </button>
  );
}
