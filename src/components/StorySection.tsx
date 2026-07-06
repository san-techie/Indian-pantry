import { Leaf, Flame, HandHeart, Truck } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const values = [
  { icon: Flame, title: 'Small-batch roasted', text: 'Spices roasted fresh every Tuesday for peak aroma.' },
  { icon: Leaf, title: 'No preservatives', text: 'Just whole ingredients and time-honored technique.' },
  { icon: HandHeart, title: 'Family recipes', text: 'Methods passed down through three generations.' },
  { icon: Truck, title: 'Shipped in 48 hrs', text: 'Sealed at peak freshness and rushed to your door.' },
];

const testimonials = [
  {
    quote:
      'The jowar roti tastes exactly like my grandmother used to make. I cried a little, honestly.',
    name: 'Ananya R.',
    location: 'Edison, NJ',
    rating: 5,
  },
  {
    quote:
      "I've been hunting for authentic karadantu in the States for years. Sāvana's is the real thing.",
    name: 'Vikram S.',
    location: 'Plano, TX',
    rating: 5,
  },
  {
    quote:
      'The peri-peri makhana is dangerously good. The whole family demolished a bag in one sitting.',
    name: 'Meera D.',
    location: 'Fremont, CA',
    rating: 5,
  },
];

export default function StorySection() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const { ref: tRef, visible: tVisible } = useReveal<HTMLDivElement>();

  return (
    <>
      {/* Story */}
      <section id="story" className="relative overflow-hidden bg-chai-950 py-24 text-chai-100 lg:py-32">
        <div className="absolute inset-0 bg-grain opacity-30" />
        <div
          ref={ref}
          className={`container-x relative grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${visible ? 'is-visible' : ''}`}
        >
          <div className="reveal">
            <p className="mb-4 text-[11px] uppercase tracking-[0.25em] text-saffron-300">
              Our Story
            </p>
            <h2 className="font-display text-4xl font-600 leading-tight text-chai-50 sm:text-5xl text-balance">
              A family tradition of bold, fresh flavor.
            </h2>
            <div className="mt-6 space-y-4 text-chai-200/90 leading-relaxed">
              <p>
                Food has the power to connect generations — the intense
                memories triggered by the flavors and aromas of childhood.
                Sāvana began in a home kitchen, trying to recreate the rotis
                and chutneys our grandparents made in South India.
              </p>
              <p>
                Today we make every batch the slow way: stone-ground grains,
                dry-roasted spices, and recipes measured by hand, never by
                shortcut. We ship it all fresh so your table tastes like home,
                wherever home was.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {values.map((v) => (
                <div key={v.title} className="rounded-2xl border border-chai-100/10 bg-chai-100/5 p-4 backdrop-blur-sm">
                  <v.icon size={22} className="text-saffron-300" />
                  <p className="mt-3 text-sm font-600 text-chai-50">{v.title}</p>
                  <p className="mt-1 text-xs text-chai-300/80 leading-relaxed">{v.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image collage */}
          <div className="relative grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Freshly cooked flatbread"
                className="aspect-[3/4] w-full rounded-2xl object-cover shadow-lift"
                loading="lazy"
              />
              <img
                src="https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Chutney preparation"
                className="aspect-square w-full rounded-2xl object-cover shadow-soft"
                loading="lazy"
              />
            </div>
            <div className="space-y-4 pt-10">
              <img
                src="https://images.pexels.com/photos/5946617/pexels-photo-5946617.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Slow-cooked relish"
                className="aspect-square w-full rounded-2xl object-cover shadow-soft"
                loading="lazy"
              />
              <img
                src="https://images.pexels.com/photos/18488298/pexels-photo-18488298.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Indian sweets"
                className="aspect-[3/4] w-full rounded-2xl object-cover shadow-lift"
                loading="lazy"
              />
            </div>
            {/* decorative ring */}
            <div className="absolute -right-8 -top-8 -z-10 h-32 w-32 rounded-full border border-saffron-400/20" />
            <div className="absolute -bottom-6 -left-6 -z-10 h-24 w-24 rounded-full border border-spice-400/20" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-chai-100 py-20 lg:py-28">
        <div ref={tRef} className={`container-x ${tVisible ? 'is-visible' : ''}`}>
          <div className="reveal mb-12 text-center">
            <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-spice-600">
              Loved across America
            </p>
            <h2 className="font-display text-4xl font-600 leading-tight text-chai-950 sm:text-5xl">
              2,400 families served and counting
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="reveal flex flex-col rounded-3xl bg-chai-50 p-7 shadow-soft transition hover:shadow-card"
                style={{ transitionDelay: '80ms' }}
              >
                <div className="mb-4 flex gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-saffron-500">
                      <path d="M10 1l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.3 4.8 17.1l1-5.8L1.5 7.2l5.9-.9L10 1z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="flex-1 font-display text-lg leading-relaxed text-chai-800">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-5 border-t border-chai-200 pt-4">
                  <p className="font-600 text-chai-950">{t.name}</p>
                  <p className="text-sm text-chai-500">{t.location}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
