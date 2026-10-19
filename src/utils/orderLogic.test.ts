import test from 'node:test';
import assert from 'node:assert/strict';
import {
  NIZUMI_MENU,
  filterMenuByCategory,
  validateMakiBoardSelection,
  addToCart,
  updateCartItemQuantity,
  calculateCartSummary,
  validateCheckoutForm,
  buildWhatsAppOrderUrl,
  buildWhatsAppOrderMessage,
  type CheckoutFormState,
} from './orderLogic.ts';

test('filterMenuByCategory returns all 7 authentic Nizumi dishes for "all" and filters accurately', () => {
  assert.equal(filterMenuByCategory(NIZUMI_MENU, 'all').length, 7);
  assert.equal(filterMenuByCategory(NIZUMI_MENU, 'promos').length, 2);
  assert.equal(filterMenuByCategory(NIZUMI_MENU, 'makis').length, 2);
  assert.equal(filterMenuByCategory(NIZUMI_MENU, 'ramen').length, 1);
  assert.equal(filterMenuByCategory(NIZUMI_MENU, 'caliente').length, 2);
});

test('validateMakiBoardSelection enforces choosing exactly 3 valid maki flavors', () => {
  const incomplete = validateMakiBoardSelection(['Acevichado', 'Furai']);
  assert.equal(incomplete.valid, false);
  assert.match(incomplete.message, /Selecciona 1 sabor más/);

  const complete = validateMakiBoardSelection([
    'Acevichado',
    'Pulpo al Olivo',
    'Lomo Saltado',
  ]);
  assert.equal(complete.valid, true);
});

test('addToCart and calculateCartSummary compute S/ totals and pieces accurately', () => {
  const promo3x2 = NIZUMI_MENU.find((d) => d.id === 'promo-martes-3x2')!;
  const ramen = NIZUMI_MENU.find((d) => d.id === 'ramen-tonkotsu-caliente')!;

  let cart = addToCart([], promo3x2, {
    selectedFlavors: ['Acevichado', 'Furai', 'Avocado'],
  });
  cart = addToCart(cart, ramen, { proteinChoice: 'Cerdo Chashu' });

  const summary = calculateCartSummary(cart);
  assert.equal(summary.totalSoles, 88.0);
  assert.equal(summary.formattedTotal, 'S/ 88.00');
  assert.equal(summary.totalPieces, 31);
  assert.equal(summary.totalDishes, 2);

  // Incrementing promo quantity
  cart = updateCartItemQuantity(cart, cart[0].cartItemId, 1);
  const updatedSummary = calculateCartSummary(cart);
  assert.equal(updatedSummary.totalSoles, 144.0);
  assert.equal(updatedSummary.totalPieces, 61);
});

test('validateCheckoutForm enforces required fields per modality (delivery, pickup, reservation)', () => {
  const promo3x2 = NIZUMI_MENU[0];
  const cart = addToCart([], promo3x2, {
    selectedFlavors: ['Acevichado', 'Furai', 'Lomo Saltado'],
  });

  const baseForm: CheckoutFormState = {
    customerName: 'Carlos Mamani',
    customerPhone: '951234567',
    modality: 'delivery',
    deliveryAddress: '',
    deliveryReference: '',
    reservationTime: '20:00',
    reservationGuests: 2,
    chopsticksCount: 3,
    extraSauceTare: true,
    extraSauceSoya: false,
    paymentMethod: 'Yape / Plin',
    notes: '',
  };

  // Delivery without address fails
  const invalidDelivery = validateCheckoutForm(baseForm, cart);
  assert.equal(invalidDelivery.valid, false);
  assert.ok(invalidDelivery.errors.deliveryAddress);

  // Delivery with address succeeds
  const validDelivery = validateCheckoutForm(
    { ...baseForm, deliveryAddress: 'Av. La Torre 340, Puno' },
    cart
  );
  assert.equal(validDelivery.valid, true);

  // Pickup without delivery address succeeds
  const validPickup = validateCheckoutForm(
    { ...baseForm, modality: 'pickup' },
    cart
  );
  assert.equal(validPickup.valid, true);

  // Reservation validates time and guests
  const invalidReservation = validateCheckoutForm(
    { ...baseForm, modality: 'reservation', reservationTime: '' },
    cart
  );
  assert.equal(invalidReservation.valid, false);
  assert.ok(invalidReservation.errors.reservationTime);
});

test('buildWhatsAppOrderUrl encodes structured order to real Nizumi Sushi Puno WhatsApp 51937377991', () => {
  const promo3x2 = NIZUMI_MENU[0];
  const cart = addToCart([], promo3x2, {
    selectedFlavors: ['Acevichado', 'Pulpo al Olivo', 'Lomo Saltado'],
  });

  const form: CheckoutFormState = {
    customerName: 'Valeria Quispe',
    customerPhone: '987654321',
    modality: 'delivery',
    deliveryAddress: 'Jr. Deustua 520, Puno',
    deliveryReference: 'Frente a la Plaza Pino',
    reservationTime: '19:30',
    reservationGuests: 2,
    chopsticksCount: 3,
    extraSauceTare: true,
    extraSauceSoya: true,
    paymentMethod: 'Yape / Plin',
    notes: 'Sin picante por favor',
  };

  const msg = buildWhatsAppOrderMessage(form, cart);
  assert.match(msg, /Valeria Quispe/);
  assert.match(msg, /Acevichado, Pulpo al Olivo, Lomo Saltado/);
  assert.match(msg, /S\/ 56\.00/);
  assert.match(msg, /3 par\(es\)/);
  assert.match(msg, /Yape \/ Plin/);

  const url = buildWhatsAppOrderUrl(form, cart);
  assert.ok(url.startsWith('https://wa.me/51937377991?text='));
});
