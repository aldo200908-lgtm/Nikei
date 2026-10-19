import {
  RESTAURANT,
  getLimaStatus,
} from '../constants/restaurant';

export type MenuCategoryId = 'all' | 'tablas' | 'makis' | 'ramen' | 'caliente';

export type MakiFlavor =
  | 'Acevichado'
  | 'Furai'
  | 'Pulpo al Olivo'
  | 'Lomo Saltado'
  | 'Avocado';

export interface MakiFlavorInfo {
  id: MakiFlavor;
  name: string;
  description: string;
}

export interface MenuDish {
  id: string;
  name: string;
  category: Exclude<MenuCategoryId, 'all'>;
  categoryLabel: string;
  description: string;
  price: number;
  pieces: number;
  unitLabel: string;
  imageUrl: string;
  isCustomizable3x2?: boolean;
}

export interface CartItem {
  cartItemId: string;
  dishId: string;
  name: string;
  price: number;
  piecesPerUnit: number;
  unitLabel: string;
  quantity: number;
  selectedFlavors?: MakiFlavor[];
  proteinChoice?: 'Cerdo' | 'Pollo';
}

export type OrderModality = 'delivery' | 'pickup' | 'reservation';
export type PaymentMethod = 'Yape / Plin' | 'Tarjeta' | 'Efectivo';

export interface CheckoutFormState {
  customerName: string;
  customerPhone: string;
  modality: OrderModality;
  deliveryAddress: string;
  deliveryReference: string;
  reservationDate: string;
  reservationTime: string;
  reservationGuests: number;
  chopsticksCount: number;
  extraSauceTare: boolean;
  extraSauceSoya: boolean;
  paymentMethod: PaymentMethod;
  notes: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof CheckoutFormState | 'cart', string>>;
}

export const MAKI_3X2_FLAVORS: MakiFlavorInfo[] = [
  {
    id: 'Acevichado',
    name: 'Acevichado',
    description: 'Langostino furai y palta, cubierto con pescado fresco y salsa acevichada.',
  },
  {
    id: 'Furai',
    name: 'Furai',
    description: 'Empanizado en panko con salmón, queso crema, palta y salsa tare.',
  },
  {
    id: 'Pulpo al Olivo',
    name: 'Pulpo al Olivo',
    description: 'Palta y queso crema con láminas de pulpo en crema de aceituna botija.',
  },
  {
    id: 'Lomo Saltado',
    name: 'Lomo Saltado',
    description: 'Langostino y palta cubierto con lomo flambeado al wok y papas al hilo.',
  },
  {
    id: 'Avocado',
    name: 'Avocado',
    description: 'Palta cremosa sobre langostino empanizado, queso crema y ajonjolí.',
  },
];

export const MENU_CATEGORIES: { id: MenuCategoryId; label: string }[] = [
  { id: 'all', label: 'Toda la carta' },
  { id: 'tablas', label: 'Tablas' },
  { id: 'makis', label: 'Makis de autor' },
  { id: 'ramen', label: 'Ramen' },
  { id: 'caliente', label: 'Cocina caliente y bowls' },
];

// Special promo 3x2 dish definition (rendered in its own dedicated section, NOT repeated in the main dishes grid)
export const PROMO_3X2_DISH: MenuDish = {
  id: 'promo-martes-3x2',
  name: 'Promo Martes 3x2 en makis (30 cortes)',
  category: 'tablas',
  categoryLabel: 'Tablas',
  description:
    'Elige 3 rollos de 10 cortes cada uno (Acevichado, Furai, Pulpo al olivo, Lomo saltado o Avocado). Incluye salsas de la casa.',
  price: 56.0,
  pieces: 30,
  unitLabel: '30 cortes',
  imageUrl: '/images/promo-3x2-makis.svg',
  isCustomizable3x2: true,
};

// Main restaurant dishes (without repeating promo 3x2)
export const NIZUMI_MENU_DISHES: MenuDish[] = [
  {
    id: 'tabla-nizumi-imperial',
    name: 'Tabla Nizumi (40 cortes y 2 bebidas)',
    category: 'tablas',
    categoryLabel: 'Tablas',
    description:
      'Selección de la casa con cortes flambeados, nigiris y makis variados, acompañados de 2 bebidas.',
    price: 85.0,
    pieces: 40,
    unitLabel: '40 cortes',
    imageUrl: '/images/tabla-imperial.svg',
  },
  {
    id: 'ramen-tonkotsu-caliente',
    name: 'Ramen caliente',
    category: 'ramen',
    categoryLabel: 'Ramen',
    description:
      'Caldo concentrado, fideos artesanales, huevo marinado ajitsuke y alga nori. Elige cerdo o pollo.',
    price: 32.0,
    pieces: 1,
    unitLabel: '1 bowl',
    imageUrl: '/images/ramen-tonkotsu.svg',
  },
  {
    id: 'maki-acevichado-nikkei',
    name: 'Maki acevichado (10 cortes)',
    category: 'makis',
    categoryLabel: 'Makis de autor',
    description:
      'Langostino furai y palta, cubierto con atún fresco, salsa acevichada de la casa y togarashi.',
    price: 28.0,
    pieces: 10,
    unitLabel: '10 cortes',
    imageUrl: '/images/maki-acevichado.svg',
  },
  {
    id: 'maki-pulpo-al-olivo',
    name: 'Maki pulpo al olivo (10 cortes)',
    category: 'makis',
    categoryLabel: 'Makis de autor',
    description:
      'Palta y queso crema, cubierto con láminas de pulpo y crema de aceituna botija.',
    price: 30.0,
    pieces: 10,
    unitLabel: '10 cortes',
    imageUrl: '/images/pulpo-olivo.svg',
  },
  {
    id: 'chicken-teriyaki-bowl',
    name: 'Chicken teriyaki bowl',
    category: 'caliente',
    categoryLabel: 'Cocina caliente y bowls',
    description:
      'Pollo crocante glaseado con salsa teriyaki sobre arroz gohan, palta y ajonjolí tostado.',
    price: 26.0,
    pieces: 1,
    unitLabel: '1 bowl',
    imageUrl: '/images/teriyaki-bowl.svg',
  },
  {
    id: 'tiradito-nikkei-aji-amarillo',
    name: 'Tiradito al ají amarillo (12 láminas)',
    category: 'caliente',
    categoryLabel: 'Cocina caliente y bowls',
    description:
      'Cortes finos de pesca fresca en crema de ají amarillo con toque cítrico y cancha chullpi.',
    price: 34.0,
    pieces: 12,
    unitLabel: '12 láminas',
    imageUrl: '/images/tiradito-nikkei.svg',
  },
];

export function filterMenuByCategory(
  items: MenuDish[],
  category: MenuCategoryId
): MenuDish[] {
  if (category === 'all') return items;
  return items.filter((dish) => dish.category === category);
}

export function validateMakiBoardSelection(flavors: MakiFlavor[]): {
  valid: boolean;
  message: string;
} {
  const allowedIds = new Set<MakiFlavor>(MAKI_3X2_FLAVORS.map((f) => f.id));
  if (!Array.isArray(flavors) || flavors.length !== 3) {
    const remaining = Math.max(0, 3 - (Array.isArray(flavors) ? flavors.length : 0));
    return {
      valid: false,
      message:
        remaining > 0
          ? `Selecciona ${remaining} sabor${remaining === 1 ? '' : 'es'} más para completar los 30 cortes.`
          : 'Debes elegir exactamente 3 sabores (10 cortes cada uno).',
    };
  }
  for (const flavor of flavors) {
    if (!allowedIds.has(flavor)) {
      return {
        valid: false,
        message: `Sabor no válido: ${flavor}`,
      };
    }
  }
  return {
    valid: true,
    message: '30 cortes seleccionados.',
  };
}

export function isPromo3x2Day(date: Date = new Date()): boolean {
  const status = getLimaStatus(date);
  return status.isTuesday;
}

export function buildCartItemKey(
  dishId: string,
  selectedFlavors?: MakiFlavor[],
  proteinChoice?: string
): string {
  const flavorKey =
    selectedFlavors && selectedFlavors.length > 0
      ? selectedFlavors.join('|')
      : 'standard';
  const proteinKey = proteinChoice || 'default';
  return `${dishId}::${flavorKey}::${proteinKey}`;
}

export function addToCart(
  cart: CartItem[],
  dish: MenuDish,
  options?: {
    selectedFlavors?: MakiFlavor[];
    proteinChoice?: 'Cerdo' | 'Pollo';
  }
): CartItem[] {
  const flavors = options?.selectedFlavors ? [...options.selectedFlavors] : undefined;
  const protein = options?.proteinChoice;
  const cartItemId = buildCartItemKey(dish.id, flavors, protein);

  const existingIndex = cart.findIndex((item) => item.cartItemId === cartItemId);
  if (existingIndex > -1) {
    return cart.map((item, idx) =>
      idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  const newItem: CartItem = {
    cartItemId,
    dishId: dish.id,
    name: dish.name,
    price: dish.price,
    piecesPerUnit: dish.pieces,
    unitLabel: dish.unitLabel,
    quantity: 1,
    selectedFlavors: flavors,
    proteinChoice: protein,
  };
  return [...cart, newItem];
}

export function updateCartItemQuantity(
  cart: CartItem[],
  cartItemId: string,
  delta: number
): CartItem[] {
  return cart
    .map((item) => {
      if (item.cartItemId !== cartItemId) return item;
      return { ...item, quantity: item.quantity + delta };
    })
    .filter((item) => item.quantity > 0);
}

export function formatSoles(amount: number): string {
  return `S/ ${amount.toFixed(2)}`;
}

export function calculateCartSummary(cart: CartItem[]): {
  totalSoles: number;
  totalPieces: number;
  totalDishes: number;
  formattedTotal: string;
} {
  let totalSoles = 0;
  let totalPieces = 0;
  let totalDishes = 0;

  for (const item of cart) {
    totalSoles += item.price * item.quantity;
    totalPieces += item.piecesPerUnit * item.quantity;
    totalDishes += item.quantity;
  }

  return {
    totalSoles: Number(totalSoles.toFixed(2)),
    totalPieces,
    totalDishes,
    formattedTotal: formatSoles(totalSoles),
  };
}

export function validateCheckoutForm(
  form: CheckoutFormState,
  cart: CartItem[]
): ValidationResult {
  const errors: Partial<Record<keyof CheckoutFormState | 'cart', string>> = {};

  if (!form.customerName || form.customerName.trim().length < 2) {
    errors.customerName = 'Ingresa tu nombre completo.';
  }

  if (form.modality === 'reservation') {
    // A table reservation does NOT require dishes in cart!
    if (!form.reservationDate || form.reservationDate.trim().length === 0) {
      errors.reservationDate = 'Selecciona la fecha de la reserva.';
    } else {
      // Validate date is not past
      const todayStr = new Date().toISOString().split('T')[0];
      if (form.reservationDate < todayStr) {
        errors.reservationDate = 'La fecha no puede ser anterior a hoy.';
      }
    }

    if (!form.reservationTime || form.reservationTime.trim().length === 0) {
      errors.reservationTime = 'Selecciona la hora de la reserva.';
    } else {
      // Validate time within schedule
      const [hStr, mStr] = form.reservationTime.split(':');
      const h = parseInt(hStr, 10);
      const m = parseInt(mStr || '0', 10);
      const totalMin = h * 60 + m;
      if (
        isNaN(totalMin) ||
        totalMin < RESTAURANT.schedule.openMinutes ||
        totalMin > RESTAURANT.schedule.closeMinutes
      ) {
        errors.reservationTime = `El horario de atención es de ${RESTAURANT.schedule.hoursDisplay}.`;
      }
    }

    if (
      !Number.isInteger(form.reservationGuests) ||
      form.reservationGuests < RESTAURANT.reservationLimits.minGuests ||
      form.reservationGuests > RESTAURANT.reservationLimits.maxGuests
    ) {
      errors.reservationGuests = `Indica entre ${RESTAURANT.reservationLimits.minGuests} y ${RESTAURANT.reservationLimits.maxGuests} personas.`;
    }

    if (!form.customerPhone || form.customerPhone.trim().length < 6) {
      errors.customerPhone = 'Ingresa un teléfono para confirmar la reserva.';
    }
  } else {
    // Delivery or Pickup: Cart must NOT be empty
    if (!cart || cart.length === 0) {
      errors.cart = 'Agrega al menos un plato a tu pedido.';
    }

    if (form.modality === 'delivery') {
      if (!form.customerPhone || form.customerPhone.trim().length < 6) {
        errors.customerPhone = 'El teléfono es obligatorio para delivery.';
      }
      if (!form.deliveryAddress || form.deliveryAddress.trim().length < 5) {
        errors.deliveryAddress = 'Ingresa tu dirección exacta en Puno.';
      }
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildWhatsAppOrderMessage(
  form: CheckoutFormState,
  cart: CartItem[]
): string {
  const summary = calculateCartSummary(cart);

  if (form.modality === 'reservation') {
    const lines: string[] = [
      `*RESERVA DE MESA — ${RESTAURANT.name.toUpperCase()}*`,
      `Cliente: ${form.customerName.trim()}`,
      `Teléfono: ${form.customerPhone.trim()}`,
      `Fecha: ${form.reservationDate.trim()}`,
      `Hora: ${form.reservationTime.trim()}`,
      `Personas: ${form.reservationGuests}`,
      `Local: ${RESTAURANT.address}`,
    ];

    if (cart.length > 0) {
      lines.push('');
      lines.push('Platos pre-seleccionados:');
      cart.forEach((item, index) => {
        lines.push(`${index + 1}. ${item.quantity}x ${item.name} (${formatSoles(item.price * item.quantity)})`);
        if (item.selectedFlavors && item.selectedFlavors.length > 0) {
          lines.push(`   Sabores: ${item.selectedFlavors.join(', ')}`);
        }
      });
      lines.push(`Total estimado: ${summary.formattedTotal}`);
    }

    if (form.notes && form.notes.trim()) {
      lines.push('');
      lines.push(`Notas / alergias: ${form.notes.trim()}`);
    }

    return lines.join('\n');
  }

  // Delivery or Pickup
  const modalityTitle =
    form.modality === 'delivery'
      ? 'DELIVERY EN PUNO'
      : `RECOJO EN LOCAL (${RESTAURANT.address})`;

  const lines: string[] = [
    `*PEDIDO — ${RESTAURANT.name.toUpperCase()}*`,
    `Cliente: ${form.customerName.trim()}`,
    `Teléfono: ${form.customerPhone.trim() || 'No especificado'}`,
    `Modalidad: ${modalityTitle}`,
  ];

  if (form.modality === 'delivery') {
    lines.push(`Dirección: ${form.deliveryAddress.trim()}`);
    if (form.deliveryReference && form.deliveryReference.trim()) {
      lines.push(`Referencia: ${form.deliveryReference.trim()}`);
    }
  }

  lines.push('');
  lines.push('Detalle del pedido:');
  cart.forEach((item, index) => {
    const lineTotal = formatSoles(item.price * item.quantity);
    lines.push(`${index + 1}. ${item.quantity}x ${item.name} — ${lineTotal}`);
    if (item.selectedFlavors && item.selectedFlavors.length > 0) {
      lines.push(`   Sabores: ${item.selectedFlavors.join(', ')}`);
    }
    if (item.proteinChoice) {
      lines.push(`   Proteína: ${item.proteinChoice}`);
    }
  });

  lines.push('');
  lines.push(`Palillos (hashi): ${form.chopsticksCount} par(es)`);
  const extras: string[] = [];
  if (form.extraSauceTare) extras.push('Tare extra');
  if (form.extraSauceSoya) extras.push('Soya extra');
  if (extras.length > 0) {
    lines.push(`Salsas adicionales: ${extras.join(', ')}`);
  }
  lines.push(`Método de pago: ${form.paymentMethod}`);

  if (form.notes && form.notes.trim()) {
    lines.push(`Notas / alergias: ${form.notes.trim()}`);
  }

  lines.push('');
  lines.push(`Total: ${summary.formattedTotal} (${summary.totalPieces} piezas/unidades)`);

  return lines.join('\n');
}

export function buildWhatsAppOrderUrl(
  form: CheckoutFormState,
  cart: CartItem[]
): string {
  const message = buildWhatsAppOrderMessage(form, cart);
  return `https://wa.me/${RESTAURANT.phoneRaw}?text=${encodeURIComponent(message)}`;
}

// LocalStorage persistence helpers
const CART_STORAGE_KEY = 'nizumi_cart_v1';

export function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCartToStorage(cart: CartItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // Ignore storage quota errors
  }
}
