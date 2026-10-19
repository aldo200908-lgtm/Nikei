import React from 'react';
import { MapPin, Clock, Phone, Instagram, ExternalLink } from 'lucide-react';
import { RESTAURANT } from '../constants/restaurant';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0A0B0E] pt-12 pb-20 text-slate-400 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-display text-lg font-bold tracking-[0.16em] text-white">
              {RESTAURANT.name.toUpperCase()}
            </span>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              {RESTAURANT.tagline} en el corazón de Puno.
            </p>
          </div>

          {/* Location */}
          <div>
            <span className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
              Ubicación
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {RESTAURANT.address}
            </p>
            <a
              href={RESTAURANT.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[#D4AF37] hover:underline mt-1"
            >
              <span>Ver mapa</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>

          {/* Schedule */}
          <div>
            <span className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
              Horario
            </span>
            <p className="text-xs text-slate-300">
              {RESTAURANT.schedule.daysDisplay}
            </p>
            <p className="text-xs text-slate-300 mt-0.5">
              {RESTAURANT.schedule.hoursDisplay}
            </p>
          </div>

          {/* Contact */}
          <div>
            <span className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
              Contacto
            </span>
            <p className="text-xs">
              <a
                href={RESTAURANT.phoneTel}
                className="text-slate-300 hover:text-white font-mono"
              >
                {RESTAURANT.phoneDisplay}
              </a>
            </p>
            <p className="text-xs mt-1">
              <a
                href={RESTAURANT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white"
              >
                WhatsApp directo
              </a>
            </p>
            <p className="text-xs mt-1">
              <a
                href={RESTAURANT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-200"
              >
                Instagram [COMPLETAR]
              </a>
            </p>
          </div>
        </div>

        {/* Bottom copyright & quick links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {RESTAURANT.name}. Puno, Perú.</p>
          <div className="flex items-center gap-6">
            <a href="#carta" className="hover:text-slate-300 transition-colors">
              Carta
            </a>
            <a href="#armador-3x2" className="hover:text-slate-300 transition-colors">
              Armador 3x2
            </a>
            <a href="#local" className="hover:text-slate-300 transition-colors">
              Local y contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
