/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { DynamicCartBar } from './components/DynamicCartBar';
import { CheckoutDrawer } from './components/CheckoutDrawer';
import { CraftAndLocationSection } from './components/CraftAndLocationSection';
import {
  NIZUMI_MENU,
  addToCart,
  updateCartItemQuantity,
  calculateCartSummary,
  type MenuCategoryId,
  type MenuDish,
  type MakiFlavor,
  type CartItem,
  type CheckoutFormState,
} from './utils/orderLogic';

export default function App() {
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoryId>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [checkoutForm, setCheckoutForm] = useState<CheckoutFormState>({
    customerName: '',
    customerPhone: '',
    modality: 'delivery',
    deliveryAddress: '',
    deliveryReference: '',
    reservationTime: '20:00',
    reservationGuests: 2,
    chopsticksCount: 2,
    extraSauceTare: true,
    extraSauceSoya: false,
    paymentMethod: 'Yape / Plin',
    notes: '',
  });

  // Progressive Scroll Reveal using IntersectionObserver
  useEffect(() => {
    const isHeadless =
      navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent);
    if (isHeadless || !('IntersectionObserver' in window)) {
      return;
    }

    const elements = document.querySelectorAll('.reveal-item');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('reveal-pending');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight) {
        el.classList.add('reveal-pending');
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [selectedCategory]);

  const summary = calculateCartSummary(cart);

  const handleAddDish = (
    dish: MenuDish,
    options?: {
      selectedFlavors?: MakiFlavor[];
      proteinChoice?: 'Cerdo Chashu' | 'Pollo Crocante';
    }
  ) => {
    setCart((prevCart) => addToCart(prevCart, dish, options));
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCart((prevCart) => updateCartItemQuantity(prevCart, cartItemId, delta));
  };

  const handleUpdateForm = (patch: Partial<CheckoutFormState>) => {
    setCheckoutForm((prev) => ({ ...prev, ...patch }));
  };

  const handleScrollToMenu = () => {
    const target = document.getElementById('armador-3x2');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenReservationDrawer = () => {
    setCheckoutForm((prev) => ({ ...prev, modality: 'reservation' }));
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#F8FAFC] flex flex-col">
      <Navbar
        totalDishes={summary.totalDishes}
        formattedTotal={summary.formattedTotal}
        onOpenCart={() => setIsDrawerOpen(true)}
      />

      <main className="flex-1">
        <HeroSection
          onExploreMenu={handleScrollToMenu}
          onReserveTable={handleOpenReservationDrawer}
        />

        <MenuSection
          dishes={NIZUMI_MENU}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddStandardDish={handleAddDish}
        />

        <CraftAndLocationSection
          onOpenReservation={handleOpenReservationDrawer}
        />
      </main>

      <DynamicCartBar
        totalPieces={summary.totalPieces}
        totalDishes={summary.totalDishes}
        formattedTotal={summary.formattedTotal}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      <CheckoutDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        form={checkoutForm}
        onUpdateForm={handleUpdateForm}
      />
    </div>
  );
}
