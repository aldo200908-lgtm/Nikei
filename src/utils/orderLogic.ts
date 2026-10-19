export type MenuCategoryId = 'all' | 'promos' | 'makis' | 'ramen' | 'caliente';

export type MakiFlavor =
  | 'Acevichado'
  | 'Furai'
  | 'Pulpo al Olivo'
  | 'Lomo Saltado'
  | 'Avocado';

export interface MakiFlavorInfo {
  id: MakiFlavor;
  name: MakiFlavor;
  shortDesc: string;
  accentColor: string;
}

export interface MenuDish {
  id: string;
  name: string;
  category: Exclude<MenuCategoryId, 'all'>;
  categoryLabel: string;
  kicker: string;
  description: string;
  price: number;
  pieces: number;
  unitLabel: string;
  imageUrl: string;
  isCustomizable3x2?: boolean;
  featured?: boolean;
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
  proteinChoice?: 'Cerdo Chashu' | 'Pollo Crocante';
}

export type OrderModality = 'delivery' | 'pickup' | 'reservation';
export type PaymentMethod = 'Yape / Plin' | 'Tarjeta' | 'Efectivo';

export interface CheckoutFormState {
  customerName: string;
  customerPhone: string;
  modality: OrderModality;
  deliveryAddress: string;
  deliveryReference: string;
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

export const NIZUMI_WHATSAPP_NUMBER = '51937377991';
export const NIZUMI_ADDRESS = 'Jr. Lima 439, 2do Piso, Puno, Perú';

export const MAKI_3X2_FLAVORS: MakiFlavorInfo[] = [
  {
    id: 'Acevichado',
    name: 'Acevichado',
    shortDesc: 'Langostino furai, palta, láminas de pescado fresco y emulsión acevichada cítrica.',
    accentColor: '#D4AF37',
  },
  {
    id: 'Furai',
    name: 'Furai',
    shortDesc: 'Empanizado crocante en panko japonés con salmón, queso crema, palta y salsa tare.',
    accentColor: '#E11D48',
  },
  {
    id: 'Pulpo al Olivo',
    name: 'Pulpo al Olivo',
    shortDesc: 'Palta y queso crema coronado con láminas de pulpo en crema de aceituna botija.',
    accentColor: '#A855F7',
  },
  {
    id: 'Lomo Saltado',
    name: 'Lomo Saltado',
    shortDesc: 'Langostino y palta cubierto con lomo fino flambeado al wok, salsa anticuchera y papas hilo.',
    accentColor: '#F97316',
  },
  {
    id: 'Avocado',
    name: 'Avocado',
    shortDesc: 'Cobertura de palta cremosa sobre langostino empanizado, queso crema y ajonjolí tostado.',
    accentColor: '#22C55E',
  },
];

export const MENU_CATEGORIES: { id: MenuCategoryId; label: string; countLabel: string }[] = [
  { id: 'all', label: 'Toda la Carta', countLabel: '7 especialidades' },
  { id: 'promos', label: '🔥 Promos & Tablas', countLabel: '2 opciones' },
  { id: 'makis', label: '🍣 Makis de Autor', countLabel: '2 opciones' },
  { id: 'ramen', label: '🍜 Ramen para el Frío', countLabel: '1 especialidad' },
  { id: 'caliente', label: '🥢 Cocina Caliente & Bowls', countLabel: '2 opciones' },
];

export const NIZUMI_MENU: MenuDish[] = [
  {
    id: 'promo-martes-3x2',
    name: 'Promo Martes 3x2 en Makis (30 cortes)',
    category: 'promos',
    categoryLabel: 'Promos & Tablas',
    kicker: '30 CORTES · 3 ROLLOS A ELECCIÓN',
    description:
      'Arma tu tabla eligiendo tus 3 sabores favoritos de 10 cortes cada uno (Acevichado, Furai, Pulpo al Olivo, Lomo Saltado o Avocado). Incluye salsas acevichada, tare y soya.',
    price: 56.0,
    pieces: 30,
    unitLabel: '30 cortes',
    imageUrl: '/images/promo-3x2-makis.svg',
    isCustomizable3x2: true,
    featured: true,
  },
  {
    id: 'tabla-nizumi-imperial',
    name: 'Tabla Nizumi Imperial (40 piezas + 2 Bebidas)',
    category: 'promos',
    categoryLabel: 'Promos & Tablas',
    kicker: '40 PIEZAS + 2 BEBIDAS · SELECCIÓN DEL ITAMAE',
    description:
      'Selección especial del Itamae con cortes flambeados en mesa, nigiris de autor, makis clásicos Nikkei y salsas artesanales de la casa más 2 bebidas.',
    price: 85.0,
    pieces: 40,
    unitLabel: '40 piezas',
    imageUrl: '/images/tabla-imperial.svg',
    featured: true,
  },
  {
    id: 'ramen-tonkotsu-caliente',
    name: 'Ramen Tonkotsu / Pollo Caliente',
    category: 'ramen',
    categoryLabel: 'Ramen para el Frío',
    kicker: 'CALDO 12 HORAS · ESPECIAL CLIMA DE PUNO',
    description:
      'Caldo concentrado por 12 horas, cerdo chashu o pollo tierno, huevo marinado ajitsuke de yema cremosa, alga nori y fideos artesanales, ideal para el frío altiplánico.',
    price: 32.0,
    pieces: 1,
    unitLabel: '1 bowl caliente',
    imageUrl: '/images/ramen-tonkotsu.svg',
    featured: true,
  },
  {
    id: 'maki-acevichado-nikkei',
    name: 'Maki Acevichado Nikkei (10 cortes)',
    category: 'makis',
    categoryLabel: 'Makis de Autor',
    kicker: '10 CORTES · CLÁSICO INSUPERABLE',
    description:
      'Relleno de langostino furai crocante y palta en su punto, cubierto con láminas de atún y pescado fresco, bañado en salsa acevichada de la casa y togarashi.',
    price: 28.0,
    pieces: 10,
    unitLabel: '10 cortes',
    imageUrl: '/images/maki-acevichado.svg',
  },
  {
    id: 'maki-pulpo-al-olivo',
    name: 'Maki Pulpo al Olivo (10 cortes)',
    category: 'makis',
    categoryLabel: 'Makis de Autor',
    kicker: '10 CORTES · EMULSIÓN DE ACEITUNA BOTIJA',
    description:
      'Palta cremosa y queso philadelphia coronado con finas láminas de pulpo tierno bañadas en crema de aceituna botija peruana y láminas crocantes.',
    price: 30.0,
    pieces: 10,
    unitLabel: '10 cortes',
    imageUrl: '/images/pulpo-olivo.svg',
  },
  {
    id: 'chicken-teriyaki-bowl',
    name: 'Chicken Teriyaki Bowl',
    category: 'caliente',
    categoryLabel: 'Cocina Caliente & Bowls',
    kicker: 'COCINA CALIENTE · ARROZ GOHAN & PALTA',
    description:
      'Pollo crocante glaseado en reducción de salsa teriyaki artesanal sobre cama de arroz gohan japonés, abanico de palta fresca y ajonjolí tostado.',
    price: 26.0,
    pieces: 1,
    unitLabel: '1 donburi bowl',
    imageUrl: '/images/teriyaki-bowl.svg',
  },
  {
    id: 'tiradito-nikkei-aji-amarillo',
    name: 'Tiradito Nikkei en Crema de Ají Amarillo',
    category: 'caliente',
    categoryLabel: 'Cocina Caliente & Bowls',
    kicker: 'CORTES DE AUTOR · TOQUE CÍTRICO ORIENTAL',
    description:
      'Cortes finos de pescado fresco con toque cítrico oriental, leche de tigre al ají amarillo ahumado, gotas de aceite de sésamo y cancha chullpi.',
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
          : 'Debes elegir exactamente 3 sabores de maki (10 cortes c/u).',
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
    message: 'Tabla 3x2 completa (30 cortes listos para armar).',
  };
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
  const proteinKey = proteinChoice ? proteinChoice : 'default';
  return `${dishId}::${flavorKey}::${proteinKey}`;
}

export function addToCart(
  cart: CartItem[],
  dish: MenuDish,
  options?: {
    selectedFlavors?: MakiFlavor[];
    proteinChoice?: 'Cerdo Chashu' | 'Pollo Crocante';
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
  const errors: ValidationResult['errors'] = {};

  if (!cart || cart.length === 0) {
    errors.cart = 'Agrega al menos un plato o tabla Nikkei a tu pedido.';
  }

  if (!form.customerName || form.customerName.trim().length < 2) {
    errors.customerName = 'Ingresa tu nombre para registrar el pedido.';
  }

  if (form.modality === 'delivery') {
    if (!form.deliveryAddress || form.deliveryAddress.trim().length < 5) {
      errors.deliveryAddress =
        'Ingresa tu dirección exacta en Puno (Jr./Av. y número o referencia).';
    }
  }

  if (form.modality === 'reservation') {
    if (!form.reservationTime || form.reservationTime.trim().length === 0) {
      errors.reservationTime = 'Selecciona la hora de tu reserva en el local.';
    }
    if (
      !Number.isInteger(form.reservationGuests) ||
      form.reservationGuests < 1 ||
      form.reservationGuests > 20
    ) {
      errors.reservationGuests = 'Indica un número válido de personas (1 a 20).';
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
  const modalityHeader =
    form.modality === 'delivery'
      ? '🛵 *MODALIDAD: DELIVERY EN PUNO*'
      : form.modality === 'pickup'
      ? '🥢 *MODALIDAD: RECOJO EN LOCAL (Jr. Lima 439, 2do Piso)*'
      : '🥂 *MODALIDAD: RESERVA DE MESA EN EL LOCAL*';

  const lines: string[] = [
    '🍣 *NUEVO PEDIDO — NIZUMI SUSHI PUNO*',
    '────────────────────',
    `👤 *Cliente:* ${form.customerName.trim()}`,
  ];

  if (form.customerPhone && form.customerPhone.trim()) {
    lines.push(`📱 *Teléfono:* ${form.customerPhone.trim()}`);
  }

  lines.push(modalityHeader);

  if (form.modality === 'delivery') {
    lines.push(`📍 *Dirección:* ${form.deliveryAddress.trim()}`);
    if (form.deliveryReference && form.deliveryReference.trim()) {
      lines.push(`🗺️ *Referencia:* ${form.deliveryReference.trim()}`);
    }
  } else if (form.modality === 'pickup') {
    lines.push(`📍 *Punto de Recojo:* ${NIZUMI_ADDRESS}`);
  } else if (form.modality === 'reservation') {
    lines.push(`🕒 *Hora solicitada:* ${form.reservationTime.trim()}`);
    lines.push(`👥 *Comensales:* ${form.reservationGuests} persona(s)`);
    lines.push(`📍 *Ubicación:* ${NIZUMI_ADDRESS}`);
  }

  lines.push('');
  lines.push('*DETALLE DEL PEDIDO:*');

  cart.forEach((item, index) => {
    const lineTotal = formatSoles(item.price * item.quantity);
    lines.push(`${index + 1}. *${item.quantity}x ${item.name}* — ${lineTotal}`);
    if (item.selectedFlavors && item.selectedFlavors.length > 0) {
      lines.push(
        `   • Sabores 3x2 (10 cortes c/u): ${item.selectedFlavors.join(', ')}`
      );
    }
    if (item.proteinChoice) {
      lines.push(`   • Proteína: ${item.proteinChoice}`);
    }
  });

  lines.push('');
  lines.push('*COMPLEMENTOS & UTENSILIOS:*');
  lines.push(`🥢 *Palillos (Hashi):* ${form.chopsticksCount} par(es)`);

  const extraSauces: string[] = [];
  if (form.extraSauceTare) extraSauces.push('Salsa Tare Extra');
  if (form.extraSauceSoya) extraSauces.push('Salsa Soya Extra');
  lines.push(
    `🍶 *Salsas extra:* ${extraSauces.length > 0 ? extraSauces.join(' + ') : 'Estándar de la casa'}`
  );

  lines.push(`💳 *Método de Pago:* ${form.paymentMethod}`);

  if (form.notes && form.notes.trim()) {
    lines.push(`📝 *Nota:* ${form.notes.trim()}`);
  }

  lines.push('────────────────────');
  lines.push(`🔥 *TOTAL A PAGAR: ${summary.formattedTotal}* (${summary.totalPieces} piezas/unidades)`);

  return lines.join('\n');
}

export function buildWhatsAppOrderUrl(
  form: CheckoutFormState,
  cart: CartItem[]
): string {
  const message = buildWhatsAppOrderMessage(form, cart);
  return `https://wa.me/${NIZUMI_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
