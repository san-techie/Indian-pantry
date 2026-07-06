import { useCallback, useEffect, useState } from 'react';
import { CartProvider } from './store/cart';
import type { Product } from './data/catalog';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryShowcase from './components/CategoryShowcase';
import FlashBanner from './components/FlashBanner';
import ProductGrid from './components/ProductGrid';
import StorySection from './components/StorySection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchOverlay from './components/SearchOverlay';
import MobileNav from './components/MobileNav';
import QuickView from './components/QuickView';

function App() {
  const [active, setActive] = useState('home');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const scrollTo = useCallback((target: string) => {
    if (target === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActive('home');
      return;
    }
    const el = document.getElementById(target);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const handleNav = useCallback(
    (target: string) => {
      // category ids scroll to the shop section and filter
      const categoryIds = ['rotis', 'chutneys', 'ready-to-cook', 'sweets', 'thokkus', 'makhana'];
      if (categoryIds.includes(target)) {
        setActiveCategory(target);
        scrollTo('shop');
        setActive(target);
        return;
      }
      scrollTo(target);
      setActive(target);
    },
    [scrollTo],
  );

  // Track active section while scrolling
  useEffect(() => {
    const sections = ['home', 'shop', 'story', 'contact'];
    const onScroll = () => {
      const y = window.scrollY + 140;
      let current = 'home';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= y) {
          current = id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handlePickProduct = useCallback((p: Product) => {
    setQuickViewProduct(p);
    setSearchOpen(false);
  }, []);

  const handlePickCategory = useCallback(
    (id: string) => {
      setSearchOpen(false);
      handleNav(id);
    },
    [handleNav],
  );

  return (
    <CartProvider>
      <div className="min-h-screen bg-chai-50">
        <Header
          onSearchOpen={() => setSearchOpen(true)}
          onMobileNavOpen={() => setMobileNavOpen(true)}
          onNav={handleNav}
          active={active}
        />

        <main>
          <Hero onShopAll={() => handleNav('shop')} onNav={handleNav} />
          <CategoryShowcase onNav={handleNav} />
          <FlashBanner onNav={handleNav} />
          <ProductGrid
            onQuickView={setQuickViewProduct}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <StorySection />
        </main>

        <Footer onNav={handleNav} />

        {/* Overlays */}
        <CartDrawer />
        <SearchOverlay
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          onPickProduct={handlePickProduct}
          onPickCategory={handlePickCategory}
        />
        <MobileNav
          open={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
          onNav={handleNav}
        />
        <QuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      </div>
    </CartProvider>
  );
}

export default App;
