import React from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Instagram,
  CalendarCheck,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { RESTAURANT, getLimaStatus } from '../constants/restaurant';

interface LocationAndContactSectionProps {
  onOpenReservation: () => void;
}

export const LocationAndContactSection: React.FC<
  LocationAndContactSectionProps
> = ({ onOpenReservation }) => {
  const limaStatus = getLimaStatus();

  return (
    <section id="local" className="py-16 sm:py-24 border-b border-white/10 bg-[#0D0E11]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Location, schedule, contact */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Visítanos o comunícate con nosotros
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              Atendemos en nuestro salón en el segundo piso del paseo peatonal
              Jr. Lima y realizamos envíos a domicilio en la ciudad de Puno.
            </p>

            <div className="mt-8 space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-[#16181F] border border-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#D4AF37]">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Dirección</h3>
                  <p className="text-sm text-slate-300 mt-0.5">
                    {RESTAURANT.address}
                  </p>
                  <a
                    href={RESTAURANT.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:underline mt-1.5 font-medium"
                  >
                    <span>Ver en Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-[#16181F] border border-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#D4AF37]">
                  <Clock className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">Horario de atención</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-medium ${
                        limaStatus.isOpenNow
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                      }`}
                    >
                      {limaStatus.isOpenNow ? 'Abierto' : 'Cerrado'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 mt-0.5">
                    {RESTAURANT.schedule.daysDisplay}: {RESTAURANT.schedule.hoursDisplay}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Hora local Puno / Lima: {limaStatus.timeString}
                  </p>
                </div>
              </div>

              {/* Phone & Instagram */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-[#16181F] border border-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#D4AF37]">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Teléfono y WhatsApp</h3>
                  <div className="flex flex-wrap items-center gap-4 mt-0.5">
                    <a
                      href={RESTAURANT.phoneTel}
                      className="text-sm text-slate-300 hover:text-white font-mono"
                    >
                      {RESTAURANT.phoneDisplay}
                    </a>
                    <span className="text-white/20">·</span>
                    <a
                      href={RESTAURANT.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-300 hover:text-white"
                    >
                      Escribir a WhatsApp
                    </a>
                  </div>

                  {/* Instagram */}
                  <div className="flex items-center gap-2 mt-2">
                    <Instagram className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                    <a
                      href={RESTAURANT.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-400 hover:text-slate-200"
                    >
                      Instagram: @nizumi_sushi_puno [COMPLETAR]
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Reservation card & Real reviews block */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Reservation Card */}
            <div className="p-6 sm:p-7 rounded-lg bg-[#14161C] border border-white/10">
              <h3 className="text-lg font-semibold text-white">
                Reserva de mesa
              </h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Coordina tu visita con anticipación sin costo alguno. No es
                necesario preordenar platos para reservar.
              </p>
              <button
                type="button"
                onClick={onOpenReservation}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-md bg-[#E11D48] hover:bg-[#BE123C] text-white text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <CalendarCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Reservar mesa</span>
              </button>
            </div>

            {/* Real Reviews Block (No fabricated testimonials or fake figures) */}
            <div className="p-6 rounded-lg bg-[#14161C] border border-white/10">
              <div className="flex items-center gap-2 text-slate-200">
                <MessageSquare className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-white">
                  Reseñas de comensales
                </h3>
              </div>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                Revisa los comentarios reales de clientes que han comido en el
                local o déjanos tu opinión tras tu visita:
              </p>
              <div className="mt-4 pt-4 border-t border-white/10">
                <a
                  href={RESTAURANT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:underline font-medium"
                >
                  <span>Ver opiniones en Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
