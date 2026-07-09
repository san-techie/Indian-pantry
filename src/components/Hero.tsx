import { ArrowRight, Star } from 'lucide-react';
import { useCart } from '../store/cart';
import { products } from '../data/catalog';
import HeroImage from '../assets/hero_banner.jpg'

type Props = {
  onShopAll: () => void;
  onNav: (target: string) => void;
};

export default function Hero({ onShopAll, onNav }: Props) {
  const { add } = useCart();
  const featured = products.find((p) => p.id === 'jowar-roti')!;

  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden bg-chai-950">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HeroImage}
          alt="Flat lay of vibrant Indian cuisine"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-chai-950/70 via-chai-950/40 to-chai-950/80" /> */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-chai-950/70 to-transparent" /> */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-20 pt-36 lg:justify-center lg:pb-28">
        <div className="container-x">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="reveal is-visible mb-6 inline-flex items-center gap-2 rounded-full border border-chai-100/30 bg-chai-100/10 px-4 py-1.5 backdrop-blur-sm">
              <span className="flex h-1.5 w-1.5 rounded-full bg-saffron-400" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-chai-100">
                Small-batch · Shipped fresh
              </span>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-up font-display text-5xl font-600 leading-[1.02] text-chai-50 shadow-text sm:text-6xl lg:text-7xl text-balance">
              Savor every.
              <br />
              last. <span className="italic text-saffron-300">bite.</span>
            </h1>

            <p className="animate-fade-up mt-6 max-w-md text-lg leading-relaxed text-chai-50 [animation-delay:120ms]">
              Heritage Indian flavors, handcrafted in small batches and shipped
              fresh across the USA — rotis, chutneys, sweets and more, the way
              your family made them.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up mt-8 flex flex-wrap items-center gap-4 [animation-delay:200ms]">
              <button
                onClick={onShopAll}
                className="group inline-flex items-center gap-2 rounded-full bg-chai-50 px-7 py-3.5 text-sm font-600 uppercase tracking-wider text-chai-950 transition hover:bg-saffron-300 hover:text-chai-950"
              >
                Shop all
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => onNav('story')}
                className="inline-flex items-center gap-2 rounded-full border border-chai-100/40 px-7 py-3.5 text-sm font-600 uppercase tracking-wider text-chai-50 transition hover:border-chai-100 hover:bg-chai-100/10"
              >
                Our story
              </button>
            </div>

            {/* Trust row */}
            <div className="animate-fade-up mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-chai-100/80 [animation-delay:300ms]">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-saffron-400 text-saffron-400" />
                  ))}
                </div>
                <span className="text-sm">2,400+ five-star reviews</span>
              </div>
              <div className="hidden h-4 w-px bg-chai-100/30 sm:block" />
              <span className="text-sm">Made in the USA</span>
              <div className="hidden h-4 w-px bg-chai-100/30 sm:block" />
              <span className="text-sm">No preservatives</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating featured card */}
      <div className="absolute bottom-10 right-10 z-20 hidden w-72 animate-float lg:block">
        <div className="rounded-2xl border border-chai-100/20 bg-chai-50/95 p-4 shadow-lift backdrop-blur-md">
          <div className="flex items-center gap-4">
            <img
              src={featured.image}
              alt={featured.name}
              className="h-16 w-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-wider text-spice-600">Bestseller</p>
              <p className="font-display text-base font-600 text-chai-950">{featured.name}</p>
              <p className="text-xs text-chai-500">{featured.weight}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-display text-lg font-700 text-chai-950">
              ${featured.price.toFixed(2)}
            </span>
            <button
              onClick={() => add(featured)}
              className="rounded-full bg-chai-950 px-4 py-2 text-xs font-600 uppercase tracking-wider text-chai-50 transition hover:bg-spice-700"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-chai-100/60 lg:flex">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-chai-100/60 to-transparent" />
      </div>
    </section>
  );
}
