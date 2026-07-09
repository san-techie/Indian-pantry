import { ArrowUpRight } from 'lucide-react';
import { categories } from '../data/catalog';
import { useReveal } from '../hooks/useReveal';

type Props = {
  onNav: (target: string) => void;
};

export default function CategoryShowcase({ onNav }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="bg-chai-50 py-20 lg:py-28">
      <div className="container-x">
        {/* Header */}
        <div
          ref={ref}
          className={`reveal mb-12 flex flex-col items-end justify-between gap-6 lg:mb-16 lg:flex-row ${visible ? 'is-visible' : ''}`}
        >
          <div className="max-w-xl">
            <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-spice-600">
              The Pantry
            </p>
            <h2 className="font-display text-4xl font-600 leading-tight text-chai-950 sm:text-5xl text-balance">
              Six shelves of flavor, made the slow way.
            </h2>
          </div>
          <p className="max-w-sm text-chai-600 lg:text-right">
            Each category is crafted in small batches with whole spices and
            time-honored technique — no shortcuts, no preservatives.
          </p>
        </div>

        {/* Grid — asymmetric editorial layout */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {/* Rotis — large */}
          <CategoryCard
            category={categories[0]}
            onNav={onNav}
            className="sm:col-span-2 lg:row-span-2"
            large
          />
          {/* Chutneys */}
          <CategoryCard category={categories[1]} onNav={onNav} />
          {/* Sweets */}
          <CategoryCard category={categories[3]} onNav={onNav} />
          {/* Thokkus */}
          <CategoryCard category={categories[4]} onNav={onNav} />
          {/* Makhana */}
          <CategoryCard category={categories[5]} onNav={onNav} />
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  category,
  onNav,
  className = '',
  large = false,
}: {
  category: (typeof categories)[number];
  onNav: (t: string) => void;
  className?: string;
  large?: boolean;
}) {
  return (
    <button
      onClick={() => onNav(category.id)}
      className={`group relative overflow-hidden rounded-2xl bg-chai-200 text-left shadow-soft transition-all duration-500 hover:shadow-lift ${className}`}
    >
      <div className={`relative ${large ? 'h-72 lg:h-full' : 'h-56'}`}>
        {category.isVideo ? <video
    src={category.video}
    autoPlay
    muted
    loop
    playsInline
    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
  /> :  <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          loading="lazy"
        />}
       
        <div className="absolute inset-0 bg-gradient-to-t from-chai-950/85 via-chai-950/20 to-transparent transition-opacity duration-500 group-hover:from-chai-950/90" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-saffron-200">
          {category.tagline}
        </p>
        <h3
          className={`mt-1 font-display font-600 text-chai-50 ${
            large ? 'text-3xl lg:text-4xl' : 'text-2xl'
          }`}
        >
          {category.name}
        </h3>
        <p className="mt-1 max-w-xs text-sm text-chai-100/80 line-clamp-2">
          {category.description}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-sm font-600 text-chai-50">
          <span>Shop {category.name}</span>
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </div>
      </div>

      {/* count chip */}
      <span className="absolute right-4 top-4 rounded-full bg-chai-50/90 px-3 py-1 text-[11px] font-600 text-chai-800 backdrop-blur-sm">
        {category.count} items
      </span>
    </button>
  );
}
