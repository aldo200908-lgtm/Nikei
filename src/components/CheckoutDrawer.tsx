import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Send,
  Copy,
  Check,
  MapPin,
  Utensils,
  CalendarClock,
} from 'lucide-react';
import {
  calculateCartSummary,
  formatSoles,
  validateCheckoutForm,
  buildWhatsAppOrderMessage,
  buildWhatsAppOrderUrl,
  NIZUMI_ADDRESS,
  type CartItem,
  type CheckoutFormState,
  type OrderModality,
  type PaymentMethod,
} from '../utils/orderLogic';

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  form: CheckoutFormState;
  onUpdateForm: (patch: Partial<CheckoutFormState>) => void;
}

export const CheckoutDrawer: React.FC<CheckoutDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  form,
  onUpdateForm,
}) => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [confirmedOrderReady, setConfirmedOrderReady] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  if (!isOpen) return null;

  const summary = calculateCartSummary(cart);
  const whatsappMessage = buildWhatsAppOrderMessage(form, cart);
  const whatsappUrl = buildWhatsAppOrderUrl(form, cart);

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateCheckoutForm(form, cart);
    if (!result.valid) {
      setValidationErrors(result.errors as Record<string, string>);
      setConfirmedOrderReady(false);
      return;
    }
    setValidationErrors({});
    setConfirmedOrderReady(true);
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopiedToClipboard(true);
      window.setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch {
      setCopiedToClipboard(false);
    }
  };

  const modalities: { id: OrderModality; label: string; sub: string }[] = [
    {
      id: 'delivery',
      label: '🛵 Delivery en Puno',
      sub: 'A domicilio',
    },
    {
      id: 'pickup',
      label: '🥢 Recojo en Local',
      sub: 'Jr. Lima 439, 2do Piso',
    },
    {
      id: 'reservation',
      label: '🥂 Reservar Mesa',
      sub: 'En salón Nikkei',
    },
  ];

  const paymentMethods: { id: PaymentMethod; label: string }[] = [
    { id: 'Yape / Plin', label: '📱 Yape / Plin' },
    { id: 'Tarjeta', label: '💳 Tarjeta' },
    { id: 'Efectivo', label: '💵 Efectivo' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      {/* Backdrop click to close */}
      <div className="flex-1" onClick={onClose} aria-hidden="true" />

      {/* Dark Glassmorphic Slide-Over Panel */}
      <div className="relative w-full max-w-xl bg-[#121316] border-l border-white/15 h-full flex flex-col justify-between overflow-hidden shadow-2xl">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#0A0A0C]">
          <div>
            <p className="text-xs font-medium tracking-wider text-[#D4AF37]">
              NIZUMI SUSHI PUNO · PEDIDO DIRECTO
            </p>
            <h2
              id="drawer-title"
              className="font-display text-xl font-bold text-[#F8FAFC] mt-0.5"
            >
              Tu Pedido &amp; Despacho a WhatsApp
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Confirmed Order Preview & Direct WhatsApp Dispatch at top when ready */}
          {confirmedOrderReady && (
            <div
              data-testid="whatsapp-order-ready"
              className="p-4 rounded-xl bg-[#0A0A0C] border border-[#D4AF37] space-y-3 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#D4AF37]">
                  ✓ Pedido Estructurado Listo para WhatsApp
                </span>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white"
                >
                  {copiedToClipboard ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar texto</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-[11px] text-slate-300 whitespace-pre-wrap font-mono bg-[#121316] p-3 rounded-lg border border-white/10 max-h-36 overflow-y-auto">
                {whatsappMessage}
              </pre>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>Abrir WhatsApp Oficial (+51 937 377 991)</span>
              </a>
            </div>
          )}

          {/* 1. Itemized Dish Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                1. Desglose de Platos ({summary.totalPieces} piezas/unidades)
              </h3>
              <span className="font-mono-tabular text-sm font-semibold text-[#D4AF37]">
                {summary.formattedTotal}
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="p-6 rounded-xl bg-[#0A0A0C] border border-white/10 text-center">
                <p className="text-sm text-slate-300 font-medium">
                  Tu tabla aún está vacía.
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Agrega una Promo 3x2 en Makis, Ramen Caliente o Reserva tu Mesa.
                </p>
              </div>
            ) : (
              <ul className="space-y-3" aria-label="Platos en el pedido">
                {cart.map((item) => (
                  <li
                    key={item.cartItemId}
                    className="p-4 rounded-xl bg-[#0A0A0C] border border-white/10 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-[#F8FAFC]">
                        {item.name}
                      </p>
                      {item.selectedFlavors && item.selectedFlavors.length > 0 && (
                        <p className="text-xs text-[#D4AF37]">
                          Sabores 3x2: {item.selectedFlavors.join(' · ')}
                        </p>
                      )}
                      {item.proteinChoice && (
                        <p className="text-xs text-slate-300">
                          Proteína: {item.proteinChoice}
                        </p>
                      )}
                      <p className="font-mono-tabular text-xs text-slate-400">
                        {formatSoles(item.price)} c/u · Subtotal:{' '}
                        <span className="text-[#F8FAFC] font-semibold">
                          {formatSoles(item.price * item.quantity)}
                        </span>
                      </p>
                    </div>

                    {/* Quantity Steppers */}
                    <div className="flex items-center gap-1.5 bg-[#121316] border border-white/10 rounded-lg p-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          onUpdateQuantity(item.cartItemId, -1);
                          setConfirmedOrderReady(false);
                        }}
                        aria-label={`Disminuir cantidad de ${item.name}`}
                        className="w-7 h-7 rounded flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        {item.quantity === 1 ? (
                          <Trash2 className="w-3.5 h-3.5 text-[#E11D48]" />
                        ) : (
                          <Minus className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <span className="font-mono-tabular text-xs font-semibold text-[#F8FAFC] px-2">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          onUpdateQuantity(item.cartItemId, 1);
                          setConfirmedOrderReady(false);
                        }}
                        aria-label={`Aumentar cantidad de ${item.name}`}
                        className="w-7 h-7 rounded flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {validationErrors.cart && (
              <p className="text-xs text-[#E11D48] mt-2">
                {validationErrors.cart}
              </p>
            )}
          </div>

          {/* 2. Modality Selector (Delivery, Pickup, Table Reservation) */}
          <form id="checkout-form" onSubmit={handleConfirmOrder} className="space-y-6">
            <div>
              <span className="block text-xs font-semibold tracking-wider text-slate-400 uppercase mb-2.5">
                2. Elige Modalidad de Atención
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {modalities.map((mod) => {
                  const active = form.modality === mod.id;
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => {
                        onUpdateForm({ modality: mod.id });
                        setConfirmedOrderReady(false);
                      }}
                      className={`p-3 rounded-lg border text-left transition-colors ${
                        active
                          ? 'bg-[#E11D48]/15 border-[#E11D48] text-[#F8FAFC]'
                          : 'bg-[#0A0A0C] border-white/10 text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <span className="block text-xs font-semibold whitespace-nowrap">
                        {mod.label}
                      </span>
                      <span className="block text-[11px] text-slate-400 mt-0.5">
                        {mod.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Customer Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="customer-name"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Tu Nombre Completo *
                </label>
                <input
                  id="customer-name"
                  type="text"
                  value={form.customerName}
                  onChange={(e) => {
                    onUpdateForm({ customerName: e.target.value });
                    setConfirmedOrderReady(false);
                  }}
                  placeholder="Ej. Valeria Quispe"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0C] border border-white/15 text-sm text-[#F8FAFC] placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
                {validationErrors.customerName && (
                  <p className="text-xs text-[#E11D48] mt-1">
                    {validationErrors.customerName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="customer-phone"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Celular de Contacto (Opcional)
                </label>
                <input
                  id="customer-phone"
                  type="tel"
                  value={form.customerPhone}
                  onChange={(e) =>
                    onUpdateForm({ customerPhone: e.target.value })
                  }
                  placeholder="Ej. 951 234 567"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0C] border border-white/15 text-sm text-[#F8FAFC] placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Conditional Modality Fields */}
            {form.modality === 'delivery' && (
              <div className="p-4 rounded-xl bg-[#0A0A0C] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
                  <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Datos de Entrega a Domicilio en Puno</span>
                </div>
                <div>
                  <label
                    htmlFor="delivery-address"
                    className="block text-xs font-medium text-slate-300 mb-1"
                  >
                    Dirección Exacta en Puno *
                  </label>
                  <input
                    id="delivery-address"
                    type="text"
                    value={form.deliveryAddress}
                    onChange={(e) => {
                      onUpdateForm({ deliveryAddress: e.target.value });
                      setConfirmedOrderReady(false);
                    }}
                    placeholder="Ej. Jr. Deustua 520 / Av. La Torre 340"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#121316] border border-white/15 text-sm text-[#F8FAFC] placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                  {validationErrors.deliveryAddress && (
                    <p className="text-xs text-[#E11D48] mt-1">
                      {validationErrors.deliveryAddress}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="delivery-reference"
                    className="block text-xs font-medium text-slate-300 mb-1"
                  >
                    Referencia (Parque, esquina, color de puerta)
                  </label>
                  <input
                    id="delivery-reference"
                    type="text"
                    value={form.deliveryReference}
                    onChange={(e) =>
                      onUpdateForm({ deliveryReference: e.target.value })
                    }
                    placeholder="Ej. A media cuadra del Parque Pino, portón negro"
                    className="w-full px-3.5 py-2 rounded-lg bg-[#121316] border border-white/15 text-sm text-[#F8FAFC] placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            )}

            {form.modality === 'pickup' && (
              <div className="p-4 rounded-xl bg-[#0A0A0C] border border-white/10 flex items-start gap-3">
                <Utensils
                  className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="text-xs text-slate-300 space-y-1">
                  <p className="font-semibold text-[#F8FAFC]">
                    Punto de Recojo: {NIZUMI_ADDRESS}
                  </p>
                  <p className="text-slate-400">
                    Tiempo estimado de preparación: 20 – 25 minutos tras confirmar por WhatsApp.
                  </p>
                </div>
              </div>
            )}

            {form.modality === 'reservation' && (
              <div className="p-4 rounded-xl bg-[#0A0A0C] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
                  <CalendarClock className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Reserva de Mesa en {NIZUMI_ADDRESS}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="reservation-time"
                      className="block text-xs font-medium text-slate-300 mb-1"
                    >
                      Hora de Reserva *
                    </label>
                    <input
                      id="reservation-time"
                      type="time"
                      value={form.reservationTime}
                      onChange={(e) => {
                        onUpdateForm({ reservationTime: e.target.value });
                        setConfirmedOrderReady(false);
                      }}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#121316] border border-white/15 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#D4AF37]"
                    />
                    {validationErrors.reservationTime && (
                      <p className="text-xs text-[#E11D48] mt-1">
                        {validationErrors.reservationTime}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="reservation-guests"
                      className="block text-xs font-medium text-slate-300 mb-1"
                    >
                      Número de Personas *
                    </label>
                    <input
                      id="reservation-guests"
                      type="number"
                      min={1}
                      max={20}
                      value={form.reservationGuests}
                      onChange={(e) =>
                        onUpdateForm({
                          reservationGuests: Math.max(
                            1,
                            parseInt(e.target.value, 10) || 1
                          ),
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-lg bg-[#121316] border border-white/15 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. Hashi (Chopsticks) & Extra Tare / Soya Sauces */}
            <div className="p-4 rounded-xl bg-[#0A0A0C] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-xs font-semibold text-[#F8FAFC]">
                    🥢 Pares de Palillos (Hashi)
                  </span>
                  <span className="block text-[11px] text-slate-400">
                    ¿Cuántos pares de palillos incluimos sin costo?
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-[#121316] border border-white/10 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateForm({
                        chopsticksCount: Math.max(1, form.chopsticksCount - 1),
                      })
                    }
                    aria-label="Menos pares de palillos"
                    className="w-7 h-7 rounded flex items-center justify-center text-slate-300 hover:bg-white/10"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono-tabular text-xs font-semibold text-[#F8FAFC] px-2">
                    {form.chopsticksCount} par{form.chopsticksCount === 1 ? '' : 'es'}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateForm({
                        chopsticksCount: Math.min(12, form.chopsticksCount + 1),
                      })
                    }
                    aria-label="Más pares de palillos"
                    className="w-7 h-7 rounded flex items-center justify-center text-slate-300 hover:bg-white/10"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <span className="block text-xs font-semibold text-[#F8FAFC] mb-2">
                  🍶 ¿Requieres Salsa Tare o Soya Extra?
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#121316] border border-white/10 cursor-pointer text-xs text-slate-200">
                    <input
                      type="checkbox"
                      checked={form.extraSauceTare}
                      onChange={(e) =>
                        onUpdateForm({ extraSauceTare: e.target.checked })
                      }
                      className="rounded accent-[#E11D48]"
                    />
                    <span>Salsa Tare Dulce Extra</span>
                  </label>
                  <label className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#121316] border border-white/10 cursor-pointer text-xs text-slate-200">
                    <input
                      type="checkbox"
                      checked={form.extraSauceSoya}
                      onChange={(e) =>
                        onUpdateForm({ extraSauceSoya: e.target.checked })
                      }
                      className="rounded accent-[#E11D48]"
                    />
                    <span>Salsa Soya (Shoyu) Extra</span>
                  </label>
                </div>
              </div>
            </div>

            {/* 4. Payment Method Selector */}
            <div>
              <span className="block text-xs font-semibold tracking-wider text-slate-400 uppercase mb-2.5">
                4. Selecciona Método de Pago
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {paymentMethods.map((pm) => {
                  const selected = form.paymentMethod === pm.id;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => onUpdateForm({ paymentMethod: pm.id })}
                      className={`py-2.5 px-3 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                        selected
                          ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#F8FAFC]'
                          : 'bg-[#0A0A0C] border-white/10 text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      {pm.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </form>
        </div>

        {/* Sticky Drawer Footer */}
        <div className="p-6 border-t border-white/10 bg-[#0A0A0C] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Total a pagar ({summary.totalPieces} piezas/unidades)
            </span>
            <span className="font-mono-tabular text-2xl font-bold text-[#F8FAFC]">
              {summary.formattedTotal}
            </span>
          </div>

          <button
            type="submit"
            form="checkout-form"
            className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-lg bg-[#E11D48] hover:bg-[#BE123C] text-[#F8FAFC] text-sm font-semibold transition-transform active:scale-[0.99] cursor-pointer"
          >
            <Send className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Confirmar y Enviar Pedido a WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
