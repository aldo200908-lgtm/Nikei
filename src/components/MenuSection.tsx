import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import {
  MENU_CATEGORIES,
  formatSoles,
  type MenuCategoryId,
  type MenuDish,
} from '../utils/orderLogic';
import { DishImage } from './DishImage';

interface MenuSectionProps {
  dishes: MenuDish[];
  selectedCategory: MenuCategoryId;
  onSelectCategory: (cat: MenuCategoryId) => void;
  onAddDish: (
    dish: MenuDish,
    options?: { proteinChoice?: 'Cerdo' | 'Pollo' }
  ) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  dishes,
  selectedCategory,
  onSelectCategory,
  onAddDish,
}) => {
  const [ramenProtein, setRamenProtein] = useState<'Cerdo' | 'Pollo'>('Cerdo');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const triggerAddedFeedback = (id: string) => {
    setRecentlyAddedId(id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === id ? null : prev));
    }, 1200);
  };

  const filteredDishes =
    selectedCategory === 'all'
      ? dishes
      : dishes.filter((d) => d.category === selectedCategory);

  return (
    <section id="carta" className="py-16 sm:py-24 border-b border-white/10 bg-[#0D0E11]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Nuestra carta
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Platos preparados al momento con arroz shari sazonado, pesca fresca
            y reducciones de la casa.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-10">
          <div
            role="tablist"
            aria-label="Filtrar por categoría"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2"
          >
            {MENU_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-2 rounded-md text-[13px] sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    active
                      ? 'bg-[#E11D48] text-white'
                      : 'bg-[#15171D] hover:bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid: Airy, 3-column / 2-column desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDishes.map((dish) => {
            const isAdded = recentlyAddedId === dish.id;
            const isRamen = dish.id === 'ramen-tonkotsu-caliente';

            return (
              <article
                key={dish.id}
                className="rounded-lg bg-[#14161C] border border-white/10 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Dish Photography 4:3 */}
                  <DishImage
                    src={dish.imageUrl}
                    alt={dish.name}
                    aspect="aspect-[4/3]"
                  />

                  {/* Body */}
                  <div className="p-6">
                    <span className="text-xs text-[#D4AF37] font-medium tracking-wide">
                      {dish.unitLabel}
                    </span>
                    <h3 className="text-lg font-semibold text-white mt-1 leading-snug">
                      {dish.name}
                    </h3>
                    <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                      {dish.description}
                    </p>

                    {/* Ramen protein selector */}
                    {isRamen && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <span className="block text-xs text-slate-400 mb-2">
                          Proteína:
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {(['Cerdo', 'Pollo'] as const).map((protein) => (
                            <button
                              key={protein}
                              type="button"
                              onClick={() => setRamenProtein(protein)}
                              className={`py-1.5 px-3 rounded text-xs font-medium border transition-colors ${
                                ramenProtein === protein
                                  ? 'bg-white/15 border-white/40 text-white'
                                  : 'bg-[#0F1014] border-white/10 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {protein}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer price & action */}
                <div className="px-6 pb-6 pt-2 border-t border-white/10 flex items-center justify-between gap-4">
                  <span className="font-mono text-xl font-bold text-white">
                    {formatSoles(dish.price)}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      if (isRamen) {
                        onAddDish(dish, { proteinChoice: ramenProtein });
                      } else {
                        onAddDish(dish);
                      }
                      triggerAddedFeedback(dish.id);
                    }}
                    aria-label={`Agregar ${dish.name} por ${formatSoles(dish.price)}`}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                      isAdded
                        ? 'bg-[#D4AF37] text-[#0D0E11]'
                        : 'bg-[#E11D48] hover:bg-[#BE123C] text-white active:scale-[0.98]'
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
                        <span>Agregar</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
