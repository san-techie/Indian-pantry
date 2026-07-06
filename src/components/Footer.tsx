import { useState } from 'react';
import { Instagram, Facebook, Mail, Phone, MapPin, ArrowRight, Check } from 'lucide-react';
import { categories } from '../data/catalog';

type Props = {
  onNav: (target: string) => void;
};

export default function Footer({ onNav }: Props) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <footer id="contact" className="bg-chai-950 text-chai-200">
      {/* Newsletter */}
      <div className="border-b border-chai-800">
        <div className="container-x grid gap-10 py-16 lg:grid-cols-2 lg:items-center lg:py-20">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-saffron-300">
              We send tasty emails
            </p>
            <h2 className="font-display text-3xl font-600 leading-tight text-chai-50 sm:text-4xl text-balance">
              Get 10% off your first order, plus restock alerts.
            </h2>
            <p className="mt-3 text-chai-300">
              No spam — just new batches, seasonal treats, and the occasional recipe.
            </p>
          </div>

          <form onSubmit={subscribe} className="w-full">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-chai-400"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-full border border-chai-700 bg-chai-900 py-4 pl-12 pr-4 text-chai-100 placeholder:text-chai-500 focus:border-saffron-400 focus:outline-none focus:ring-1 focus:ring-saffron-400"
                />
              </div>
              <button
                type="submit"
                className={`group flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-600 uppercase tracking-wider transition ${
                  subscribed
                    ? 'bg-leaf-600 text-leaf-50'
                    : 'bg-saffron-500 text-white hover:bg-saffron-400'
                }`}
              >
                {subscribed ? (
                  <>
                    <Check size={16} /> Subscribed
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
            <p className="mt-3 text-xs text-chai-500">
              By subscribing you agree to receive marketing emails. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="container-x grid grid-cols-2 gap-8 py-16 md:grid-cols-4 lg:grid-cols-5">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-1">
          <div className="font-display text-2xl font-600 text-chai-50">Sāvana</div>
          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-spice-400">
            Indian Pantry
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-chai-400">
            Heritage Indian flavors, handcrafted in small batches and shipped
            fresh across the USA.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="Instagram" className="rounded-full border border-chai-700 p-2.5 text-chai-300 transition hover:border-saffron-400 hover:text-saffron-300">
              <Instagram size={18} />
            </a>
            <a href="#" aria-label="Facebook" className="rounded-full border border-chai-700 p-2.5 text-chai-300 transition hover:border-saffron-400 hover:text-saffron-300">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-chai-400">Shop</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => onNav(c.id)}
                  className="text-chai-300 transition hover:text-saffron-300"
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-chai-400">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><button onClick={() => onNav('story')} className="text-chai-300 transition hover:text-saffron-300">Our Story</button></li>
            <li><button onClick={() => onNav('home')} className="text-chai-300 transition hover:text-saffron-300">Reviews</button></li>
            <li><a href="#" className="text-chai-300 transition hover:text-saffron-300">Wholesale</a></li>
            <li><a href="#" className="text-chai-300 transition hover:text-saffron-300">Careers</a></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-chai-400">Help</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href="#" className="text-chai-300 transition hover:text-saffron-300">FAQ</a></li>
            <li><a href="#" className="text-chai-300 transition hover:text-saffron-300">Shipping</a></li>
            <li><a href="#" className="text-chai-300 transition hover:text-saffron-300">Returns</a></li>
            <li><a href="#" className="text-chai-300 transition hover:text-saffron-300">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-xs uppercase tracking-[0.2em] text-chai-400">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-chai-300">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-spice-400" />
              <span>1402 Spice Mill Rd,<br />Edison, NJ 08817</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="shrink-0 text-spice-400" />
              <span>(732) 555-0142</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="shrink-0 text-spice-400" />
              <span>hello@savanafoods.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-chai-800">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-chai-500 sm:flex-row">
          <p>© 2026 Sāvana Foods USA. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="transition hover:text-chai-200">Privacy</a>
            <a href="#" className="transition hover:text-chai-200">Terms</a>
            <a href="#" className="transition hover:text-chai-200">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
