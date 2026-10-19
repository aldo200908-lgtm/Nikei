import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface NavbarProps {
  totalDishes: number;
  formattedTotal: string;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalDishes,
  formattedTotal,
  onOpenCart,
}) => {
  return (
    <header className="sticky top-0 z-40 h-14 md:h-16 w-full bg-[#0A0A0C]/85 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-[1280px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 md:gap-8">
        {/* Zone 1: Single text element Brand Wordmark */}
        <a
          href="#inicio"
          className="font-display text-base sm:text-lg md:text-xl font-bold tracking-[0.12em] sm:tracking-[0.18em] text-[#F8FAFC] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
        >
          NIZUMI SUSHI
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300"
        >
          <a
            href="#armador-3x2"
            className="hover:text-[#F8FAFC] transition-colors duration-150 underline-offset-8 hover:underline whitespace-nowrap shrink-0"
          >
            Armador 3x2
          </a>
          <a
            href="#carta-nikkei"
            className="hover:text-[#F8FAFC] transition-colors duration-150 underline-offset-8 hover:underline whitespace-nowrap shrink-0"
          >
            Carta Nikkei
          </a>
          <a
            href="#experiencia"
            className="hover:text-[#F8FAFC] transition-colors duration-150 underline-offset-8 hover:underline whitespace-nowrap shrink-0"
          >
            Arte Itamae
          </a>
          <a
            href="#ubicacion"
            className="hover:text-[#F8FAFC] transition-colors duration-150 underline-offset-8 hover:underline whitespace-nowrap shrink-0"
          >
            Ubicación
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action Button */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Ver mi Pedido (${totalDishes} platos, ${formattedTotal})`}
            className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 rounded-lg bg-[#E11D48] hover:bg-[#BE123C] text-[#F8FAFC] text-xs md:text-sm font-semibold transition-transform duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
            <span>Ver mi Pedido</span>
            <span className="font-mono-tabular text-white/90">
              · {totalDishes > 0 ? formattedTotal : 'S/ 0.00'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
