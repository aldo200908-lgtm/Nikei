import React, { useState } from 'react';
import { Check, Plus, Sparkles, UtensilsCrossed, RotateCcw } from 'lucide-react';
import {
  MENU_CATEGORIES,
  MAKI_3X2_FLAVORS,
  formatSoles,
  validateMakiBoardSelection,
  type MenuCategoryId,
  type MenuDish,
  type MakiFlavor,
} from '../utils/orderLogic';

interface MenuSectionProps {
  dishes: MenuDish[];
  selectedCategory: MenuCategoryId;
  onSelectCategory: (cat: MenuCategoryId) => void;
  onAddStandardDish: (
    dish: MenuDish,
    options?: {
      selectedFlavors?: MakiFlavor[];
      proteinChoice?: 'Cerdo Chashu' | 'Pollo Crocante';
    }
  ) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  dishes,
  selectedCategory,
  onSelectCategory,
  onAddStandardDish,
}) => {
  // Interactive 3x2 Maki Board Builder state (defaults to 3 beloved flavors so user can customize or add immediately)
  const [selectedFlavors, setSelectedFlavors] = useState<MakiFlavor[]>([
    'Acevichado',
    'Furai',
    'Pulpo al Olivo',
  ]);
  const [ramenProtein, setRamenProtein] = useState<
    'Cerdo Chashu' | 'Pollo Crocante'
  >('Cerdo Chashu');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const promo3x2Dish = dishes.find((d) => d.id === 'promo-martes-3x2');
  const validation = validateMakiBoardSelection(selectedFlavors);

  const triggerAddedFeedback = (id: string) => {
    setRecentlyAddedId(id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === id ? null : prev));
    }, 1200);
  };

  const handleAddFlavorToSlot = (flavor: MakiFlavor) => {
    if (selectedFlavors.length < 3) {
      setSelectedFlavors([...selectedFlavors, flavor]);
    } else {
      // Replace the oldest slot in a smooth FIFO cycle so clicking a flavor always responds immediately
      setSelectedFlavors([selectedFlavors[1], selectedFlavors[2], flavor]);
    }
  };

  const handleRemoveFlavorAtIndex = (index: number) => {
    setSelectedFlavors(selectedFlavors.filter((_, idx) => idx !== index));
  };

  const handleResetFlavors = () => {
    setSelectedFlavors([]);
  };

  const handleApplyPreset = (preset: [MakiFlavor, MakiFlavor, MakiFlavor]) => {
    setSelectedFlavors(preset);
  };

  const handleConfirm3x2Board = (dish: MenuDish) => {
    if (!validation.valid) return;
    onAddStandardDish(dish, { selectedFlavors });
    triggerAddedFeedback(dish.id);
  };

  const filteredDishes =
    selectedCategory === 'all'
      ? dishes
      : dishes.filter((d) => d.category === selectedCategory);

  return (
    <section
      id="carta-nikkei"
      className="py-16 lg:py-24 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Section Editorial Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-[#D4AF37] mb-2">
            01. CARTA NIKKEI &amp; ARMADOR INTERACTIVO
          </p>
          <h2
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F8FAFC] tracking-wide"
            style={{ textWrap: 'balance' }}
          >
            Selección del Itamae &amp; Tablas de Autor
          </h2>
        </div>
        <p className="text-sm text-slate-400 max-w-md">
          Cada pieza se elabora al momento con pesca fresca, arroz shari
          templado y emulsiones peruanas. Precios expresados en Soles (S/).
        </p>
      </div>

      {/* Interactive 3x2 Maki Board Configurator ("Armador Interactivo de Tabla de Makis") */}
      {promo3x2Dish && (
        <div
          id="armador-3x2"
          className="reveal-item mb-14 rounded-xl bg-[#121316] border border-white/10 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Showcase Image + Breakdown */}
            <div className="lg:col-span-5 relative min-h-[280px] bg-[#0A0A0C] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
              <img
                src={promo3x2Dish.imageUrl}
                alt={promo3x2Dish.name}
                referrerPolicy="no-referrer"
                className="w-full h-64 lg:h-full object-cover"
              />
              <div className="p-6 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/95 to-transparent">
                <p className="text-xs font-medium text-[#D4AF37] tracking-wider">
                  FUNCIÓN ESTRELLA · 30 CORTES A ELECCIÓN
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F8FAFC] mt-1">
                  {promo3x2Dish.name}
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {promo3x2Dish.description}
                </p>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-baseline justify-between">
                  <span className="text-xs text-slate-400">
                    Incluye 3 rollos (10 cortes c/u) + salsas
                  </span>
                  <span className="font-mono-tabular text-2xl font-bold text-[#F8FAFC]">
                    {formatSoles(promo3x2Dish.price)}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Interactive 3-Slot Selector */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-[#F8FAFC]">
                      Armador Interactivo de Tabla 3x2
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Elige tus 3 sabores favoritos de makis (puedes combinar o repetir sabores).
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleApplyPreset([
                          'Acevichado',
                          'Furai',
                          'Pulpo al Olivo',
                        ])
                      }
                      className="px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-[#D4AF37] transition-colors whitespace-nowrap shrink-0"
                    >
                      Trilogía Favorita
                    </button>
                    <button
                      type="button"
                      onClick={handleResetFlavors}
                      aria-label="Limpiar selección de sabores"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 transition-colors whitespace-nowrap shrink-0"
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Reiniciar</span>
                    </button>
                  </div>
                </div>

                {/* 3 Visual Roll Slots (10 cuts each = 30 cuts) */}
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5">
                    <span>TU TABLA PERSONALIZADA (3 ROLLOS = 30 CORTES)</span>
                    <span className="font-mono-tabular text-[#D4AF37]">
                      {selectedFlavors.length * 10} / 30 cortes seleccionados
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[0, 1, 2].map((slotIndex) => {
                      const flavor = selectedFlavors[slotIndex];
                      return (
                        <div
                          key={slotIndex}
                          className={`p-3.5 rounded-lg border transition-colors ${
                            flavor
                              ? 'bg-[#0A0A0C] border-[#D4AF37]/50'
                              : 'bg-[#0A0A0C]/50 border-dashed border-white/15'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono-tabular text-[11px] text-slate-400 whitespace-nowrap">
                              ROLLO 0{slotIndex + 1} (10 CORTES)
                            </span>
                            {flavor && (
                              <button
                                type="button"
                                onClick={() => handleRemoveFlavorAtIndex(slotIndex)}
                                className="text-[11px] text-slate-400 hover:text-[#E11D48] transition-colors whitespace-nowrap shrink-0"
                                aria-label={`Quitar ${flavor} del rollo ${slotIndex + 1}`}
                              >
                                Cambiar
                              </button>
                            )}
                          </div>
                          <p className="text-sm font-semibold text-[#F8FAFC] mt-1">
                            {flavor ? `Maki ${flavor}` : 'Selecciona un sabor abajo'}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 5 Selectable Authentic Flavors */}
                <div className="mt-6">
                  <p className="text-xs text-slate-400 mb-3">
                    HAZ CLIC EN UN SABOR PARA AGREGARLO A TU TABLA (10 CORTES C/U):
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {MAKI_3X2_FLAVORS.map((flavorObj) => {
                      const countInBoard = selectedFlavors.filter(
                        (f) => f === flavorObj.id
                      ).length;
                      return (
                        <button
                          key={flavorObj.id}
                          type="button"
                          onClick={() => handleAddFlavorToSlot(flavorObj.id)}
                          className={`text-left p-3 rounded-lg border transition-all duration-150 flex items-start justify-between gap-3 ${
                            countInBoard > 0
                              ? 'bg-white/[0.07] border-[#D4AF37]/60 text-[#F8FAFC]'
                              : 'bg-[#0A0A0C]/70 hover:bg-white/[0.04] border-white/10 text-slate-200'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-[#F8FAFC]">
                                {flavorObj.name}
                              </span>
                              {countInBoard > 0 && (
                                <span className="font-mono-tabular text-xs font-semibold text-[#D4AF37]">
                                  · {countInBoard * 10} cortes ({countInBoard}x)
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                              {flavorObj.shortDesc}
                            </p>
                          </div>
                          <span className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-xs font-bold text-[#F8FAFC] shrink-0 mt-0.5">
                            +
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Footer inside 3x2 Builder */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p
                  className={`text-xs ${
                    validation.valid ? 'text-slate-300' : 'text-[#D4AF37]'
                  }`}
                >
                  {validation.valid
                    ? `Sabores elegidos: ${selectedFlavors.join(' + ')}`
                    : validation.message}
                </p>

                <button
                  type="button"
                  disabled={!validation.valid}
                  onClick={() => handleConfirm3x2Board(promo3x2Dish)}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-150 whitespace-nowrap shrink-0 ${
                    validation.valid
                      ? 'bg-[#E11D48] hover:bg-[#BE123C] text-[#F8FAFC] cursor-pointer active:scale-[0.98]'
                      : 'bg-white/10 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {recentlyAddedId === promo3x2Dish.id ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" />
                      <span>¡Tabla 3x2 Agregada!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" aria-hidden="true" />
                      <span>
                        Agregar Tabla 3x2 ({formatSoles(promo3x2Dish.price)})
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Glassmorphism Category Filter Bar */}
      <div className="sticky top-14 md:top-16 z-30 py-3 bg-[#0A0A0C]/85 backdrop-blur-xl border-y border-white/10 mb-10">
        <div
          role="tablist"
          aria-label="Filtrar carta por categoría"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0"
        >
          {MENU_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                  isActive
                    ? 'bg-[#E11D48] text-[#F8FAFC]'
                    : 'bg-[#121316] text-slate-300 hover:text-[#F8FAFC] hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Uniform 3-Column Featured Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredDishes.map((dish) => {
          const isAdded = recentlyAddedId === dish.id;
          const isPromo3x2 = dish.id === 'promo-martes-3x2';
          const isRamen = dish.id === 'ramen-tonkotsu-caliente';

          return (
            <article
              key={dish.id}
              data-testid={`dish-card-${dish.id}`}
              className="reveal-item group rounded-xl bg-[#121316] border border-white/10 overflow-hidden flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5"
            >
              <div>
                {/* Dish Photography Container (4:3 aspect ratio) */}
                <div className="relative aspect-[4/3] w-full bg-[#0A0A0C] overflow-hidden border-b border-white/10">
                  <img
                    src={dish.imageUrl}
                    alt={dish.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent opacity-65"
                    aria-hidden="true"
                  />
                </div>

                {/* Card Copy & Clean Unboxed Metadata */}
                <div className="p-6">
                  <p className="text-xs font-medium tracking-wider text-[#D4AF37] uppercase">
                    {dish.kicker}
                  </p>
                  <h3 className="font-display text-lg font-bold text-[#F8FAFC] mt-1.5 leading-snug">
                    {dish.name}
                  </h3>
                  <p className="text-sm text-slate-300 mt-2.5 leading-relaxed">
                    {dish.description}
                  </p>

                  {/* Ramen Protein Selector */}
                  {isRamen && (
                    <div className="mt-4 pt-3 border-t border-white/10">
                      <p className="text-xs text-slate-400 mb-2">
                        ELIGE TU PROTEÍNA CALIENTE:
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {(['Cerdo Chashu', 'Pollo Crocante'] as const).map(
                          (prot) => (
                            <button
                              key={prot}
                              type="button"
                              onClick={() => setRamenProtein(prot)}
                              className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
                                ramenProtein === prot
                                  ? 'bg-white/15 border-[#D4AF37] text-[#F8FAFC]'
                                  : 'bg-[#0A0A0C] border-white/10 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {prot}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Quick preview of selected 3x2 flavors on the card */}
                  {isPromo3x2 && (
                    <div className="mt-4 pt-3 border-t border-white/10">
                      <p className="text-xs text-slate-400">
                        Sabores activos en el armador:{' '}
                        <span className="text-[#F8FAFC] font-medium">
                          {selectedFlavors.length === 3
                            ? selectedFlavors.join(', ')
                            : 'Personaliza arriba tus 3 rollos'}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Add to Order Footer */}
              <div className="px-6 pb-6 pt-3 border-t border-white/10 flex items-center justify-between gap-4">
                <div>
                  <span className="block text-[11px] text-slate-400 uppercase">
                    Precio Carta
                  </span>
                  <span className="font-mono-tabular text-xl font-bold text-[#F8FAFC]">
                    {formatSoles(dish.price)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (isPromo3x2) {
                      const flavorsToUse: MakiFlavor[] =
                        selectedFlavors.length === 3
                          ? selectedFlavors
                          : ['Acevichado', 'Furai', 'Pulpo al Olivo'];
                      onAddStandardDish(dish, {
                        selectedFlavors: flavorsToUse,
                      });
                    } else if (isRamen) {
                      onAddStandardDish(dish, { proteinChoice: ramenProtein });
                    } else {
                      onAddStandardDish(dish);
                    }
                    triggerAddedFeedback(dish.id);
                  }}
                  aria-label={`Agregar ${dish.name} al pedido por ${formatSoles(dish.price)}`}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    isAdded
                      ? 'bg-[#D4AF37] text-[#0A0A0C]'
                      : 'bg-[#E11D48] hover:bg-[#BE123C] text-[#F8FAFC] active:scale-[0.98]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Agregado</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Agregar al Pedido</span>
                    </>
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
