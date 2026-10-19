import { describe, it, expect } from 'vitest';
import {
  NIZUMI_MENU_DISHES,
  PROMO_3X2_DISH,
  filterMenuByCategory,
  validateMakiBoardSelection,
  addToCart,
  updateCartItemQuantity,
  calculateCartSummary,
  validateCheckoutForm,
  buildWhatsAppOrderMessage,
  buildWhatsAppOrderUrl,
  type CheckoutFormState,
} from './orderLogic';

describe('orderLogic tests', () => {
  it('filterMenuByCategory filters dishes correctly and main dishes list excludes repeated promo 3x2', () => {
    // Main dishes does not include promo 3x2 (promo 3x2 has its own section)
    expect(NIZUMI_MENU_DISHES.find((d) => d.id === PROMO_3X2_DISH.id)).toBeUndefined();
    expect(NIZUMI_MENU_DISHES.length).toBe(6);

    const makis = filterMenuByCategory(NIZUMI_MENU_DISHES, 'makis');
    expect(makis.length).toBe(2);

    const ramen = filterMenuByCategory(NIZUMI_MENU_DISHES, 'ramen');
    expect(ramen.length).toBe(1);

    const caliente = filterMenuByCategory(NIZUMI_MENU_DISHES, 'caliente');
    expect(caliente.length).toBe(2);
  });

  it('validateMakiBoardSelection enforces choosing exactly 3 valid flavors', () => {
    const invalid = validateMakiBoardSelection(['Acevichado', 'Furai']);
    expect(invalid.valid).toBe(false);
    expect(invalid.message).toContain('Selecciona 1 sabor más');

    const valid = validateMakiBoardSelection([
      'Acevichado',
      'Pulpo al Olivo',
      'Avocado',
    ]);
    expect(valid.valid).toBe(true);
    expect(valid.message).toBe('30 cortes seleccionados.');
  });

  it('addToCart and updateCartItemQuantity compute totals and pieces accurately', () => {
    const acevichado = NIZUMI_MENU_DISHES.find((d) => d.id === 'maki-acevichado-nikkei')!;
    const ramen = NIZUMI_MENU_DISHES.find((d) => d.id === 'ramen-tonkotsu-caliente')!;

    let cart = addToCart([], acevichado);
    cart = addToCart(cart, ramen, { proteinChoice: 'Cerdo' });

    const summary = calculateCartSummary(cart);
    expect(summary.totalSoles).toBe(60.0);
    expect(summary.formattedTotal).toBe('S/ 60.00');
    expect(summary.totalPieces).toBe(11); // 10 cortes + 1 bowl
    expect(summary.totalDishes).toBe(2);

    // Quantity update
    cart = updateCartItemQuantity(cart, cart[0].cartItemId, 1);
    const updatedSummary = calculateCartSummary(cart);
    expect(updatedSummary.totalSoles).toBe(88.0);
    expect(updatedSummary.totalPieces).toBe(21);
  });

  it('reservation allows booking without items in the cart', () => {
    const emptyCart: [] = [];
    const validReservationForm: CheckoutFormState = {
      customerName: 'Elena Quispe',
      customerPhone: '951234567',
      modality: 'reservation',
      deliveryAddress: '',
      deliveryReference: '',
      reservationDate: '2026-10-25',
      reservationTime: '19:30',
      reservationGuests: 4,
      chopsticksCount: 4,
      extraSauceTare: false,
      extraSauceSoya: false,
      paymentMethod: 'Tarjeta',
      notes: 'Mesa cerca a la ventana',
    };

    const result = validateCheckoutForm(validReservationForm, emptyCart);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});

    const msg = buildWhatsAppOrderMessage(validReservationForm, emptyCart);
    expect(msg).toContain('RESERVA DE MESA');
    expect(msg).toContain('Elena Quispe');
    expect(msg).toContain('Personas: 4');
    expect(msg).toContain('Fecha: 2026-10-25');
  });

  it('delivery requires customer phone and address, and cart cannot be empty', () => {
    const baseForm: CheckoutFormState = {
      customerName: 'Carlos Mamani',
      customerPhone: '',
      modality: 'delivery',
      deliveryAddress: '',
      deliveryReference: '',
      reservationDate: '',
      reservationTime: '',
      reservationGuests: 2,
      chopsticksCount: 2,
      extraSauceTare: true,
      extraSauceSoya: false,
      paymentMethod: 'Yape / Plin',
      notes: 'Sin cebollita china',
    };

    // Empty cart fails
    const emptyResult = validateCheckoutForm(baseForm, []);
    expect(emptyResult.valid).toBe(false);
    expect(emptyResult.errors.cart).toBeDefined();

    // With cart but missing phone and address
    const cart = addToCart([], NIZUMI_MENU_DISHES[0]);
    const invalidResult = validateCheckoutForm(baseForm, cart);
    expect(invalidResult.valid).toBe(false);
    expect(invalidResult.errors.customerPhone).toContain('obligatorio para delivery');
    expect(invalidResult.errors.deliveryAddress).toContain('dirección');

    // Valid delivery
    const validDelivery = validateCheckoutForm(
      {
        ...baseForm,
        customerPhone: '951234567',
        deliveryAddress: 'Jr. Deustua 520, Puno',
      },
      cart
    );
    expect(validDelivery.valid).toBe(true);
  });

  it('buildWhatsAppOrderUrl encodes direct wa.me link with 51937377991', () => {
    const cart = addToCart([], NIZUMI_MENU_DISHES[0]);
    const form: CheckoutFormState = {
      customerName: 'Valeria',
      customerPhone: '951234567',
      modality: 'pickup',
      deliveryAddress: '',
      deliveryReference: '',
      reservationDate: '',
      reservationTime: '',
      reservationGuests: 2,
      chopsticksCount: 2,
      extraSauceTare: true,
      extraSauceSoya: true,
      paymentMethod: 'Efectivo',
      notes: '',
    };

    const url = buildWhatsAppOrderUrl(form, cart);
    expect(url.startsWith('https://wa.me/51937377991?text=')).toBe(true);
  });
});
