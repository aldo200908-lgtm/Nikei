import React from 'react';
import { ArrowDown } from 'lucide-react';
import { RESTAURANT } from '../constants/restaurant';

interface HeroSectionProps {
  onExploreMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreMenu }) => {
  return (
    <section id="inicio" className="relative border-b border-white/10 bg-[#0D0E11]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-[#D4AF37] mb-4">
              {RESTAURANT.city} · {RESTAURANT.address.split(',')[0]}
            </p>

            {/* Title max 8 words in Cinzel */}
            <h1
              className="font-display font-bold text-white tracking-wide leading-[1.15] mb-6 text-3xl sm:text-4xl lg:text-5xl"
              style={{ textWrap: 'balance' }}
            >
              Cocina nikkei y fusión en Puno
            </h1>

            {/* Single supportive sentence */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
              Makis artesanales, ramen caliente y pesca fresca en el paseo
              peatonal de Jr. Lima, a pocos pasos de la Plaza de Armas.
            </p>

            {/* Exactly one primary CTA button */}
            <div>
              <button
                type="button"
                onClick={onExploreMenu}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-md bg-[#E11D48] hover:bg-[#BE123C] text-white text-sm sm:text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <span>Ver la carta</span>
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Photo column with clean 4:3 or 16:9 framing, no heavy gradients or glass */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/10 bg-[#131519]">
              <img
                src="/images/hero-nikkei.svg"
                alt="Platos y makis de Nizumi Sushi en Puno"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
