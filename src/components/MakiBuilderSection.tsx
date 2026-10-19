import React, { useState } from 'react';
import { RotateCcw, Check } from 'lucide-react';
import {
  PROMO_3X2_DISH,
  MAKI_3X2_FLAVORS,
  formatSoles,
  validateMakiBoardSelection,
  isPromo3x2Day,
  type MenuDish,
  type MakiFlavor,
} from '../utils/orderLogic';
import { DishImage } from './DishImage';

interface MakiBuilderSectionProps {
  onAddBoard: (
    dish: MenuDish,
    options: { selectedFlavors: MakiFlavor[] }
  ) => void;
}

export const MakiBuilderSection: React.FC<MakiBuilderSectionProps> = ({
  onAddBoard,
}) => {
  const [selectedFlavors, setSelectedFlavors] = useState<MakiFlavor[]>([
    'Acevichado',
    'Furai',
    'Pulpo al Olivo',
  ]);
  const [recentlyAdded, setRecentlyAdded] = useState(false);

  const isTuesday = isPromo3x2Day();
  const validation = validateMakiBoardSelection(selectedFlavors);

  const handleAddFlavor = (flavor: MakiFlavor) => {
    if (selectedFlavors.length < 3) {
      setSelectedFlavors([...selectedFlavors, flavor]);
    } else {
      setSelectedFlavors([selectedFlavors[1], selectedFlavors[2], flavor]);
    }
  };

  const handleRemoveFlavor = (index: number) => {
    setSelectedFlavors(selectedFlavors.filter((_, idx) => idx !== index));
  };

  const handleReset = () => {
    setSelectedFlavors([]);
  };

  const handleConfirm = () => {
    if (!validation.valid) return;
    onAddBoard(PROMO_3X2_DISH, { selectedFlavors });
    setRecentlyAdded(true);
    window.setTimeout(() => setRecentlyAdded(false), 1500);
  };

  return (
    <section
      id="armador-3x2"
      className="py-16 sm:py-20 border-b border-white/10 bg-[#0F1014]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header in Sans */}
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Armador de tabla 3x2
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Elige 3 sabores para armar tu tabla de 30 cortes (10 cortes por
            rollo). Incluye salsas de la casa.
          </p>

          {/* Tuesday notice / availability */}
          <div className="mt-3">
            {isTuesday ? (
              <p className="text-sm font-medium text-[#D4AF37]">
                Disponible hoy martes por {formatSoles(PROMO_3X2_DISH.price)}.
              </p>
            ) : (
              <p className="text-sm text-slate-400 bg-white/5 border border-white/10 px-3.5 py-2 rounded-md">
                Esta promo aplica los días martes. Puedes armar tu tabla y
                consultar disponibilidad o coordinar tu pedido para el próximo
                martes.
              </p>
            )}
          </div>
        </div>

        {/* Builder Container */}
        <div className="rounded-lg bg-[#14161C] border border-white/10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Visual preview */}
            <div className="lg:col-span-5 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between bg-[#111217]">
              <div>
                <DishImage
                  src={PROMO_3X2_DISH.imageUrl}
                  alt={PROMO_3X2_DISH.name}
                  aspect="aspect-[4/3]"
                  className="rounded-md border border-white/10 mb-5"
                />
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  {PROMO_3X2_DISH.name}
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {PROMO_3X2_DISH.description}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-baseline justify-between">
                <span className="text-sm text-slate-400">Total tabla 3x2</span>
                <span className="font-mono text-2xl font-bold text-white">
                  {formatSoles(PROMO_3X2_DISH.price)}
                </span>
              </div>
            </div>

            {/* Flavor selection controls */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-sm font-medium text-slate-200">
                    Tus 3 rollos elegidos
                  </span>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Reiniciar selección</span>
                  </button>
                </div>

                {/* 3 Roll Slots */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
                  {[0, 1, 2].map((slotIdx) => {
                    const flavor = selectedFlavors[slotIdx];
                    return (
                      <div
                        key={slotIdx}
                        className={`p-3.5 rounded-md border text-left transition-colors ${
                          flavor
                            ? 'bg-[#181B22] border-white/20'
                            : 'bg-white/[0.02] border-dashed border-white/15'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                          <span className="font-mono">Rollo {slotIdx + 1} (10c)</span>
                          {flavor && (
                            <button
                              type="button"
                              onClick={() => handleRemoveFlavor(slotIdx)}
                              className="text-slate-400 hover:text-[#E11D48] transition-colors"
                            >
                              Cambiar
                            </button>
                          )}
                        </div>
                        <p className="text-sm font-medium text-white truncate">
                          {flavor ? `Maki ${flavor}` : 'Por elegir'}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* 5 Flavor Choices */}
                <div className="space-y-2">
                  <p className="text-xs text-slate-400">
                    Haz clic en un sabor para asignarlo:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {MAKI_3X2_FLAVORS.map((f) => {
                      const count = selectedFlavors.filter((s) => s === f.id).length;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => handleAddFlavor(f.id)}
                          className={`p-3 rounded-md border text-left transition-colors flex items-start justify-between gap-3 ${
                            count > 0
                              ? 'bg-white/10 border-white/30 text-white'
                              : 'bg-[#111317] hover:bg-white/5 border-white/10 text-slate-300'
                          }`}
                        >
                          <div>
                            <p className="text-sm font-medium text-white">
                              {f.name} {count > 0 && `(${count}x)`}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                              {f.description}
                            </p>
                          </div>
                          <span className="text-xs text-slate-400 shrink-0 font-mono">
                            +10c
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  {validation.valid
                    ? `Sabores: ${selectedFlavors.join(' · ')}`
                    : validation.message}
                </span>

                <button
                  type="button"
                  disabled={!validation.valid}
                  onClick={handleConfirm}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md text-sm font-semibold transition-colors ${
                    validation.valid
                      ? 'bg-[#E11D48] hover:bg-[#BE123C] text-white cursor-pointer'
                      : 'bg-white/10 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {recentlyAdded ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" />
                      <span>Tabla agregada</span>
                    </>
                  ) : (
                    <span>
                      Agregar tabla ({formatSoles(PROMO_3X2_DISH.price)})
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
