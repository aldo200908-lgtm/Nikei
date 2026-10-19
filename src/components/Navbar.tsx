import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { RESTAURANT, getLimaStatus } from '../constants/restaurant';

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
  const limaStatus = getLimaStatus();

  return (
    <header className="sticky top-0 z-40 h-16 w-full bg-[#0D0E11]/95 border-b border-white/10">
      <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-baseline gap-3 shrink-0">
          <a
            href="#inicio"
            className="font-display text-lg sm:text-xl font-bold tracking-[0.16em] text-[#F8FAFC] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] rounded"
          >
            {RESTAURANT.name.toUpperCase()}
          </a>
          <span className="hidden lg:inline text-[13px] text-slate-400">
            {limaStatus.isOpenNow ? 'Abierto ahora' : 'Cerrado ahora'}
          </span>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300"
        >
          <a
            href="#carta"
            className="hover:text-white transition-colors duration-150 underline-offset-8 hover:underline whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] rounded"
          >
            Carta
          </a>
          <a
            href="#armador-3x2"
            className="hover:text-white transition-colors duration-150 underline-offset-8 hover:underline whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] rounded"
          >
            Armador 3x2
          </a>
          <a
            href="#local"
            className="hover:text-white transition-colors duration-150 underline-offset-8 hover:underline whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] rounded"
          >
            Local y contacto
          </a>
        </nav>

        {/* Cart button */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Ver pedido: ${totalDishes} platos, total ${formattedTotal}`}
            className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 rounded-md bg-[#E11D48] hover:bg-[#BE123C] text-white text-[13px] sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Pedido</span>
            {totalDishes > 0 && (
              <span className="font-mono text-white/90">
                · {formattedTotal}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
