import React from 'react';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';

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
  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-lg"
      role="region"
      aria-label="Resumen rápido del pedido"
    >
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 shadow-2xl shadow-black/80 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#0A0A0C]/90 border border-white/15 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
          </div>
          <div className="truncate">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#F8FAFC]">
              <span className="font-mono-tabular">{formattedTotal}</span>
              <span className="text-white/30" aria-hidden="true">
                ·
              </span>
              <span
                data-testid="dynamic-island-pieces"
                className="font-mono-tabular text-[#D4AF37]"
              >
                {totalPieces} {totalPieces === 1 ? 'pieza/unidad' : 'piezas'}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 truncate hidden sm:block">
              {totalDishes > 0
                ? `${totalDishes} especialidad(es) lista(s) para pedir por WhatsApp`
                : 'Selecciona makis, tablas o ramen para tu pedido'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenDrawer}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#E11D48] hover:bg-[#BE123C] text-[#F8FAFC] text-xs sm:text-sm font-semibold transition-transform duration-150 active:scale-[0.97] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        >
          <span>Ver mi Pedido</span>
          <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
