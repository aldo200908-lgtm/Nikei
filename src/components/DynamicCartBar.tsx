import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface DynamicCartBarProps {
  totalPieces: number;
  totalDishes: number;
  formattedTotal: string;
  onOpenDrawer: () => void;
}

export const DynamicCartBar: React.FC<DynamicCartBarProps> = ({
  totalPieces,
  totalDishes,
  formattedTotal,
  onOpenDrawer,
}) => {
  // Completely hidden if cart is empty
  if (totalDishes === 0) {
    return null;
  }

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-md md:hidden"
      role="region"
      aria-label="Resumen del pedido"
    >
      <div className="bg-[#14161D] border border-white/20 rounded-lg p-3 shadow-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#D4AF37]">
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="truncate">
            <p className="text-sm font-semibold text-white truncate">
              {formattedTotal}
              <span className="text-slate-400 font-normal ml-2 font-mono text-xs">
                ({totalPieces} {totalPieces === 1 ? 'corte/unidad' : 'cortes'})
              </span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenDrawer}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-[#E11D48] hover:bg-[#BE123C] text-white text-[13px] font-semibold transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        >
          <span>Ver pedido</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
