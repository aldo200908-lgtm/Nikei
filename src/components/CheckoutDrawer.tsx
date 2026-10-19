import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Send,
  MapPin,
  Utensils,
  Calendar,
} from 'lucide-react';
import {
  calculateCartSummary,
  formatSoles,
  validateCheckoutForm,
  buildWhatsAppOrderUrl,
  type CartItem,
  type CheckoutFormState,
  type OrderModality,
  type PaymentMethod,
} from '../utils/orderLogic';
import { RESTAURANT } from '../constants/restaurant';

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

  const drawerRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Background scroll lock
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close on Escape & Focus trap
  useEffect(() => {
    if (!isOpen) return;

    // Focus close button initially
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const summary = calculateCartSummary(cart);

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateCheckoutForm(form, cart);
    if (!result.valid) {
      setValidationErrors(result.errors as Record<string, string>);
      return;
    }

    setValidationErrors({});
    const url = buildWhatsAppOrderUrl(form, cart);
    // Direct WhatsApp dispatch without intermediate curtain
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const modalities: { id: OrderModality; label: string; sub: string }[] = [
    {
      id: 'delivery',
      label: 'Delivery en Puno',
      sub: 'A tu domicilio',
    },
    {
      id: 'pickup',
      label: 'Recojo en local',
      sub: 'Jr. Lima 439, 2do Piso',
    },
    {
      id: 'reservation',
      label: 'Reservar mesa',
      sub: 'Sin orden mínima',
    },
  ];

  const paymentMethods: { id: PaymentMethod; label: string }[] = [
    { id: 'Yape / Plin', label: 'Yape / Plin' },
    { id: 'Tarjeta', label: 'Tarjeta' },
    { id: 'Efectivo', label: 'Efectivo' },
  ];

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      {/* Backdrop */}
      <div className="flex-1" onClick={onClose} aria-hidden="true" />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-lg bg-[#111317] border-l border-white/10 h-full flex flex-col justify-between overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#0D0E11]">
          <div>
            <h2
              id="drawer-title"
              className="text-lg font-bold text-white tracking-tight"
            >
              {form.modality === 'reservation'
                ? 'Reserva de mesa'
                : 'Tu pedido'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Nizumi Sushi · Puno
            </p>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-7 text-[13px] sm:text-sm">
          {/* Cart items list (only if not reserving or if items exist) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Platos seleccionados
              </h3>
              {cart.length > 0 && (
                <span className="font-mono text-sm font-semibold text-[#D4AF37]">
                  {summary.formattedTotal}
                </span>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="p-5 rounded-md bg-[#16181F] border border-white/10 text-center">
                <p className="text-slate-300">
                  {form.modality === 'reservation'
                    ? 'No has pre-ordenado platos (puedes reservar tu mesa directamente o agregar platos si deseas).'
                    : 'Aún no has agregado platos a tu pedido.'}
                </p>
              </div>
            ) : (
              <ul className="space-y-3" aria-label="Platos en tu pedido">
                {cart.map((item) => (
                  <li
                    key={item.cartItemId}
                    className="p-3.5 rounded-md bg-[#16181F] border border-white/10 flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-white truncate">
                        {item.name}
                      </p>
                      {item.selectedFlavors && item.selectedFlavors.length > 0 && (
                        <p className="text-xs text-[#D4AF37] mt-0.5">
                          {item.selectedFlavors.join(' · ')}
                        </p>
                      )}
                      {item.proteinChoice && (
                        <p className="text-xs text-slate-300 mt-0.5">
                          Proteína: {item.proteinChoice}
                        </p>
                      )}
                      <p className="font-mono text-xs text-slate-400 mt-1">
                        {formatSoles(item.price)} c/u · Subtotal:{' '}
                        <span className="text-white font-medium">
                          {formatSoles(item.price * item.quantity)}
                        </span>
                      </p>
                    </div>

                    {/* Steppers */}
                    <div className="flex items-center gap-1 bg-[#101216] border border-white/10 rounded p-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                        aria-label={`Disminuir ${item.name}`}
                        className="w-7 h-7 flex items-center justify-center text-slate-300 hover:text-white"
                      >
                        {item.quantity === 1 ? (
                          <Trash2 className="w-3.5 h-3.5 text-[#E11D48]" />
                        ) : (
                          <Minus className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <span className="font-mono text-xs font-semibold px-2 text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                        aria-label={`Aumentar ${item.name}`}
                        className="w-7 h-7 flex items-center justify-center text-slate-300 hover:text-white"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {validationErrors.cart && (
              <p className="text-xs text-[#E11D48] mt-2 font-medium">
                {validationErrors.cart}
              </p>
            )}
          </div>

          {/* Form */}
          <form id="checkout-form" onSubmit={handleConfirmOrder} className="space-y-6">
            {/* Modality Selector */}
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                Modalidad
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {modalities.map((mod) => {
                  const active = form.modality === mod.id;
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => onUpdateForm({ modality: mod.id })}
                      className={`p-3 rounded-md border text-left transition-colors ${
                        active
                          ? 'bg-[#E11D48]/15 border-[#E11D48] text-white'
                          : 'bg-[#16181F] border-white/10 text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <span className="block font-semibold">{mod.label}</span>
                      <span className="block text-xs text-slate-400 mt-0.5">
                        {mod.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Customer Contact */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="customer-name"
                  className="block text-xs font-medium text-slate-300 mb-1"
                >
                  Nombre completo *
                </label>
                <input
                  id="customer-name"
                  type="text"
                  required
                  value={form.customerName}
                  onChange={(e) => onUpdateForm({ customerName: e.target.value })}
                  placeholder="Ej. Valeria Quispe"
                  className="w-full px-3.5 py-2.5 rounded-md bg-[#16181F] border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
                {validationErrors.customerName && (
                  <p className="text-xs text-[#E11D48] mt-1 font-medium">
                    {validationErrors.customerName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="customer-phone"
                  className="block text-xs font-medium text-slate-300 mb-1"
                >
                  Número de teléfono {form.modality === 'delivery' || form.modality === 'reservation' ? '*' : '(Opcional)'}
                </label>
                <input
                  id="customer-phone"
                  type="tel"
                  value={form.customerPhone}
                  onChange={(e) => onUpdateForm({ customerPhone: e.target.value })}
                  placeholder="Ej. 951 234 567"
                  className="w-full px-3.5 py-2.5 rounded-md bg-[#16181F] border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
                {validationErrors.customerPhone && (
                  <p className="text-xs text-[#E11D48] mt-1 font-medium">
                    {validationErrors.customerPhone}
                  </p>
                )}
              </div>
            </div>

            {/* Specific Modality Fields */}
            {form.modality === 'delivery' && (
              <div className="p-4 rounded-md bg-[#16181F] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
                  <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Dirección de entrega en Puno</span>
                </div>
                <div>
                  <label
                    htmlFor="delivery-address"
                    className="block text-xs text-slate-300 mb-1"
                  >
                    Dirección exacta *
                  </label>
                  <input
                    id="delivery-address"
                    type="text"
                    required
                    value={form.deliveryAddress}
                    onChange={(e) => onUpdateForm({ deliveryAddress: e.target.value })}
                    placeholder="Ej. Jr. Deustua 520 / Av. La Torre 340"
                    className="w-full px-3.5 py-2 rounded-md bg-[#101216] border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                  {validationErrors.deliveryAddress && (
                    <p className="text-xs text-[#E11D48] mt-1 font-medium">
                      {validationErrors.deliveryAddress}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="delivery-reference"
                    className="block text-xs text-slate-300 mb-1"
                  >
                    Referencia
                  </label>
                  <input
                    id="delivery-reference"
                    type="text"
                    value={form.deliveryReference}
                    onChange={(e) => onUpdateForm({ deliveryReference: e.target.value })}
                    placeholder="Ej. Frente al Parque Pino"
                    className="w-full px-3.5 py-2 rounded-md bg-[#101216] border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            )}

            {form.modality === 'pickup' && (
              <div className="p-4 rounded-md bg-[#16181F] border border-white/10 flex items-start gap-3">
                <Utensils className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-xs text-slate-300 space-y-0.5">
                  <p className="font-semibold text-white">
                    Punto de recojo: {RESTAURANT.address}
                  </p>
                  <p className="text-slate-400">
                    Se prepara al momento tras enviar el mensaje por WhatsApp.
                  </p>
                </div>
              </div>
            )}

            {form.modality === 'reservation' && (
              <div className="p-4 rounded-md bg-[#16181F] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
                  <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Datos de la reserva</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="res-date"
                      className="block text-xs text-slate-300 mb-1"
                    >
                      Fecha *
                    </label>
                    <input
                      id="res-date"
                      type="date"
                      min={todayStr}
                      required
                      value={form.reservationDate}
                      onChange={(e) => onUpdateForm({ reservationDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-md bg-[#101216] border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                    {validationErrors.reservationDate && (
                      <p className="text-xs text-[#E11D48] mt-1 font-medium">
                        {validationErrors.reservationDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="res-time"
                      className="block text-xs text-slate-300 mb-1"
                    >
                      Hora (12:30 a 23:00) *
                    </label>
                    <input
                      id="res-time"
                      type="time"
                      required
                      value={form.reservationTime}
                      onChange={(e) => onUpdateForm({ reservationTime: e.target.value })}
                      className="w-full px-3 py-2 rounded-md bg-[#101216] border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                    {validationErrors.reservationTime && (
                      <p className="text-xs text-[#E11D48] mt-1 font-medium">
                        {validationErrors.reservationTime}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="res-guests"
                    className="block text-xs text-slate-300 mb-1"
                  >
                    Número de personas (máximo 12) *
                  </label>
                  <input
                    id="res-guests"
                    type="number"
                    min={1}
                    max={12}
                    required
                    value={form.reservationGuests}
                    onChange={(e) =>
                      onUpdateForm({
                        reservationGuests: Math.max(1, parseInt(e.target.value, 10) || 1),
                      })
                    }
                    className="w-full px-3 py-2 rounded-md bg-[#101216] border border-white/15 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  {validationErrors.reservationGuests && (
                    <p className="text-xs text-[#E11D48] mt-1 font-medium">
                      {validationErrors.reservationGuests}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Chopsticks & extra sauces (only relevant for food orders) */}
            {form.modality !== 'reservation' && (
              <div className="p-4 rounded-md bg-[#16181F] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-200">
                    Pares de palillos (hashi)
                  </span>
                  <div className="flex items-center gap-1 bg-[#101216] border border-white/10 rounded p-1">
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateForm({
                          chopsticksCount: Math.max(1, form.chopsticksCount - 1),
                        })
                      }
                      className="w-7 h-7 flex items-center justify-center text-slate-300 hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono text-xs font-semibold px-2 text-white">
                      {form.chopsticksCount}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateForm({
                          chopsticksCount: Math.min(10, form.chopsticksCount + 1),
                        })
                      }
                      className="w-7 h-7 flex items-center justify-center text-slate-300 hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <span className="block text-xs font-medium text-slate-200 mb-2">
                    Salsas adicionales
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <label className="flex items-center gap-2 p-2 rounded bg-[#101216] border border-white/10 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.extraSauceTare}
                        onChange={(e) => onUpdateForm({ extraSauceTare: e.target.checked })}
                        className="rounded accent-[#E11D48]"
                      />
                      <span>Tare dulce extra</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 rounded bg-[#101216] border border-white/10 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.extraSauceSoya}
                        onChange={(e) => onUpdateForm({ extraSauceSoya: e.target.checked })}
                        className="rounded accent-[#E11D48]"
                      />
                      <span>Soya extra</span>
                    </label>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="pt-3 border-t border-white/10">
                  <span className="block text-xs font-medium text-slate-200 mb-2">
                    Método de pago
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {paymentMethods.map((pm) => {
                      const selected = form.paymentMethod === pm.id;
                      return (
                        <button
                          key={pm.id}
                          type="button"
                          onClick={() => onUpdateForm({ paymentMethod: pm.id })}
                          className={`py-2 px-2.5 rounded border text-xs font-medium transition-colors ${
                            selected
                              ? 'bg-white/15 border-white/40 text-white'
                              : 'bg-[#101216] border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          {pm.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Notes / Allergies field */}
            <div>
              <label
                htmlFor="notes"
                className="block text-xs font-medium text-slate-300 mb-1"
              >
                Notas o alergias (opcional)
              </label>
              <textarea
                id="notes"
                rows={2}
                value={form.notes}
                onChange={(e) => onUpdateForm({ notes: e.target.value })}
                placeholder="Ej. Alergia a mariscos, sin cebollita china, timbre no funciona..."
                className="w-full px-3.5 py-2.5 rounded-md bg-[#16181F] border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </form>
        </div>

        {/* Sticky Footer CTA */}
        <div className="p-6 border-t border-white/10 bg-[#0D0E11] space-y-3">
          {form.modality !== 'reservation' && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Total a pagar:</span>
              <span className="font-mono text-xl font-bold text-white">
                {summary.formattedTotal}
              </span>
            </div>
          )}

          <button
            type="submit"
            form="checkout-form"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-md bg-[#E11D48] hover:bg-[#BE123C] text-white text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <Send className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>
              {form.modality === 'reservation'
                ? 'Confirmar y enviar reserva por WhatsApp'
                : 'Confirmar y enviar pedido por WhatsApp'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
