/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { MakiBuilderSection } from './components/MakiBuilderSection';
import { LocationAndContactSection } from './components/LocationAndContactSection';
import { Footer } from './components/Footer';
import { DynamicCartBar } from './components/DynamicCartBar';
import { CheckoutDrawer } from './components/CheckoutDrawer';
import {
  NIZUMI_MENU_DISHES,
  addToCart,
  updateCartItemQuantity,
  calculateCartSummary,
  loadCartFromStorage,
  saveCartToStorage,
  type MenuCategoryId,
  type MenuDish,
  type MakiFlavor,
  type CartItem,
  type CheckoutFormState,
} from './utils/orderLogic';

export default function App() {
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoryId>('all');
  const [cart, setCart] = useState<CartItem[]>(() => loadCartFromStorage());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [checkoutForm, setCheckoutForm] = useState<CheckoutFormState>({
    customerName: '',
    customerPhone: '',
    modality: 'delivery',
    deliveryAddress: '',
    deliveryReference: '',
    reservationDate: '',
    reservationTime: '20:00',
    reservationGuests: 2,
    chopsticksCount: 2,
    extraSauceTare: true,
    extraSauceSoya: false,
    paymentMethod: 'Yape / Plin',
    notes: '',
  });

  // Persist cart to localStorage
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const summary = calculateCartSummary(cart);

  const handleAddDish = (
    dish: MenuDish,
    options?: {
      selectedFlavors?: MakiFlavor[];
      proteinChoice?: 'Cerdo' | 'Pollo';
    }
  ) => {
    setCart((prevCart) => addToCart(prevCart, dish, options));
  };

  const handleAdd3x2Board = (
    dish: MenuDish,
    options: { selectedFlavors: MakiFlavor[] }
  ) => {
    setCart((prevCart) => addToCart(prevCart, dish, options));
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCart((prevCart) => updateCartItemQuantity(prevCart, cartItemId, delta));
  };

  const handleUpdateForm = (patch: Partial<CheckoutFormState>) => {
    setCheckoutForm((prev) => ({ ...prev, ...patch }));
  };

  const handleScrollToCarta = () => {
    const el = document.getElementById('carta');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenReservationDrawer = () => {
    setCheckoutForm((prev) => ({ ...prev, modality: 'reservation' }));
    setIsDrawerOpen(true);
  };

  const handleOpenCart = () => {
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0D0E11] text-[#F8FAFC] flex flex-col antialiased">
      <Navbar
        totalDishes={summary.totalDishes}
        formattedTotal={summary.formattedTotal}
        onOpenCart={handleOpenCart}
      />

      <main className="flex-1">
        {/* 1. Hero con foto */}
        <HeroSection onExploreMenu={handleScrollToCarta} />

        {/* 2. Carta */}
        <MenuSection
          dishes={NIZUMI_MENU_DISHES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddDish={handleAddDish}
        />

        {/* 3. Armador 3x2 */}
        <MakiBuilderSection onAddBoard={handleAdd3x2Board} />

        {/* 4. Local y contacto */}
        <LocationAndContactSection
          onOpenReservation={handleOpenReservationDrawer}
        />
      </main>

      {/* 5. Footer */}
      <Footer />

      {/* Dynamic Cart Bar: visible only on mobile when cart has items */}
      <DynamicCartBar
        totalPieces={summary.totalPieces}
        totalDishes={summary.totalDishes}
        formattedTotal={summary.formattedTotal}
        onOpenDrawer={handleOpenCart}
      />

      {/* Checkout and Reservation Drawer */}
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
