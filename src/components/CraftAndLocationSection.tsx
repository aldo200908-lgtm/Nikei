import React from 'react';
import { MapPin, Clock, Phone, CalendarCheck } from 'lucide-react';
import { NIZUMI_ADDRESS } from '../utils/orderLogic';

interface CraftAndLocationSectionProps {
  onOpenReservation: () => void;
}

export const CraftAndLocationSection: React.FC<
  CraftAndLocationSectionProps
> = ({ onOpenReservation }) => {
  return (
    <>
      {/* Section 02: Asymmetric Nikkei Craft & Proof Section */}
      <section
        id="experiencia"
        className="py-16 lg:py-24 border-t border-white/10 bg-[#0D0E11]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-medium tracking-[0.16em] text-[#D4AF37] mb-2">
              02. FILOSOFÍA ITAMAE &amp; FUSIÓN ALTIPLÁNICA
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F8FAFC] tracking-wide"
              style={{ textWrap: 'balance' }}
            >
              Precisión de Tokio, Carácter del Sur Peruano
            </h2>
          </div>

          {/* Asymmetric Bento Grid (col-span-2 alongside col-span-1) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="reveal-item lg:col-span-2 p-8 rounded-xl bg-[#121316] border border-white/10 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium text-[#D4AF37] tracking-wider uppercase">
                  01. TÉCNICA DE BARRA &amp; ARROZ SHARI
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F8FAFC] mt-2">
                  Emulsiones al Momento y Cortes Flambeados en Mesa
                </h3>
                <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed max-w-[65ch]">
                  Nuestra barra Nikkei trabaja exclusivamente con arroz de grano
                  corto sazonado en vinagre de arroz tibio, pesca fresca
                  seleccionada cada mañana y reducciones propias de ají amarillo,
                  aceituna botija de Tacna y salsa tare envejecida con nabo y
                  jengibre.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <span className="font-mono-tabular text-2xl font-bold text-[#F8FAFC]">
                    12 Horas
                  </span>
                  <p className="text-xs text-slate-400 mt-1">
                    Cocción lenta de nuestro caldo Tonkotsu para las noches de 4°C en Puno.
                  </p>
                </div>
                <div>
                  <span className="font-mono-tabular text-2xl font-bold text-[#D4AF37]">
                    30 Cortes
                  </span>
                  <p className="text-xs text-slate-400 mt-1">
                    En nuestra tabla 3x2 de los martes, recién enrollados al confirmar tu pedido.
                  </p>
                </div>
                <div>
                  <span className="font-mono-tabular text-2xl font-bold text-[#F8FAFC]">
                    25 Minutos
                  </span>
                  <p className="text-xs text-slate-400 mt-1">
                    Tiempo promedio de despacho directo al centro de Puno y Barrio Porteño.
                  </p>
                </div>
              </div>
            </div>

            {/* Adjacent Attributable Testimonial Card */}
            <div className="reveal-item p-8 rounded-xl bg-[#121316] border border-white/10 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium text-[#D4AF37] tracking-wider uppercase">
                  02. EXPERIENCIA COMPROBADA EN PUNO
                </p>
                <blockquote className="text-sm sm:text-base text-slate-200 mt-4 leading-relaxed italic">
                  “Buscábamos una cena especial cerca de la Plaza de Armas y el
                  Ramen Tonkotsu junto con la Tabla 3x2 de Acevichado y Pulpo al
                  Olivo superaron todo. El caldo llega hirviendo y los cortes de
                  pescado tienen una frescura impecable.”
                </blockquote>
              </div>
              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-sm font-semibold text-[#F8FAFC]">
                  Dr. Rodrigo Cáceres &amp; Elena Mendoza
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Comensales habituales · Salón Jr. Lima 439, Puno
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 03: Location, Hours & Direct Reservation Callout */}
      <section
        id="ubicacion"
        className="py-16 lg:py-24 border-t border-white/10 bg-[#0A0A0C]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-[#121316] border border-white/10 p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs font-medium tracking-[0.16em] text-[#D4AF37]">
                03. VISÍTANOS O PIDE POR WHATSAPP
              </p>
              <h2
                className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]"
                style={{ textWrap: 'balance' }}
              >
                Salón Nocturno en el Paseo Peatonal Jr. Lima 439
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Ubicados en el segundo piso del corredor gastronómico de Jr.
                Lima, ofrecemos ambiente cálido climatizado, barra a la vista y
                atención personalizada para cenas en pareja, grupos o envío a
                domicilio en toda la ciudad de Puno.
              </p>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin
                    className="w-4 h-4 text-[#E11D48] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="block font-semibold text-[#F8FAFC]">
                      Dirección
                    </span>
                    <span className="text-slate-400">{NIZUMI_ADDRESS}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock
                    className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="block font-semibold text-[#F8FAFC]">
                      Horario
                    </span>
                    <span className="text-slate-400">
                      Lun – Dom: 12:30 p.m. – 11:00 p.m.
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone
                    className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="block font-semibold text-[#F8FAFC]">
                      WhatsApp Directo
                    </span>
                    <span className="font-mono-tabular text-slate-400">
                      +51 937 377 991
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-xl bg-[#0A0A0C] border border-white/10 space-y-4">
              <p className="text-xs font-medium text-[#D4AF37] uppercase tracking-wider">
                RESERVAS &amp; ATENCIÓN INMEDIATA
              </p>
              <h3 className="font-display text-lg font-bold text-[#F8FAFC]">
                ¿Vienes hoy al salón o prefieres Delivery caliente?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Aceptamos pagos con Yape, Plin, todas las tarjetas de crédito o
                débito y efectivo. Configura tu pedido en segundos.
              </p>
              <button
                type="button"
                onClick={onOpenReservation}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#E11D48] hover:bg-[#BE123C] text-[#F8FAFC] text-sm font-semibold transition-colors cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Abrir Reserva o Configurar Delivery</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-white/10 bg-[#0A0A0C] pt-12 pb-28">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="font-display font-bold tracking-[0.16em] text-[#F8FAFC]">
              NIZUMI SUSHI
            </span>
            <span aria-hidden="true">·</span>
            <span>Cocina Nikkei &amp; Fusión · Jr. Lima 439, 2do Piso, Puno</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#armador-3x2" className="hover:text-[#F8FAFC] transition-colors">
              Promo 3x2
            </a>
            <a href="#carta-nikkei" className="hover:text-[#F8FAFC] transition-colors">
              Carta Nikkei
            </a>
            <a
              href="https://wa.me/51937377991"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors font-mono-tabular"
            >
              WhatsApp: +51 937 377 991
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
