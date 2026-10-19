import React, { useEffect, useRef } from 'react';
import { ArrowDownRight, CalendarClock } from 'lucide-react';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onReserveTable: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onReserveTable,
}) => {
  const parallaxImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const isHeadless =
      navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent);
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (isHeadless || prefersReducedMotion) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (parallaxImgRef.current) {
            const offset = Math.min(window.scrollY * 0.22, 120);
            parallaxImgRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.05)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const marqueeText =
    'COCINA NIKKEI EN EL CORAZÓN DE PUNO • MARTES 3X2 EN MAKIS • RAMEN CALIENTE PARA EL FRÍO • TABLAS DE AUTOR • PEDIDOS DIRECTOS A WHATSAPP • ';

  return (
    <section id="inicio" className="relative overflow-hidden border-b border-white/10">
      {/* Main Split-Column / Parallax Hero Container */}
      <div className="relative min-h-[580px] lg:min-h-[640px] flex items-center">
        {/* Parallax Backdrop Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#0A0A0C]">
          <img
            ref={parallaxImgRef}
            src="/images/hero-nikkei.svg"
            alt="Selección de makis y nigiris Nikkei servidos sobre piedra volcánica negra en Nizumi Sushi Puno"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-right opacity-85 transition-transform duration-150 will-change-transform"
          />
          {/* Measured Multi-Stage Contrast Scrim */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C] via-[#0A0A0C]/85 to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-[#0A0A0C]/50"
            aria-hidden="true"
          />
        </div>

        {/* Editorial Content Container */}
        <div className="relative z-10 max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-2xl">
            {/* Unboxed Live Location Kicker (Zero-Pill & No Pulsing Dot compliance) */}
            <p className="text-xs sm:text-sm font-medium tracking-wide text-[#D4AF37] mb-5">
              <span>🍣 Abierto en Jr. Lima 439 (2do Piso), Puno</span>
              <span className="mx-2 text-white/30" aria-hidden="true">
                •
              </span>
              <span className="text-slate-200">Delivery &amp; Reservas</span>
            </p>

            {/* Primary Display Headline */}
            <h1
              className="font-display font-bold text-[#F8FAFC] tracking-wide leading-[1.12] mb-6"
              style={{
                fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
                textWrap: 'balance',
              }}
            >
              Alta Cocina Nikkei &amp; Fusión Nocturna en el Corazón de Puno
            </h1>

            {/* Body Lead */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-9 max-w-[62ch]">
              Técnica japonesa de precisión y el carácter intenso de los insumos
              peruanos. Disfruta nuestros makis acevichados, cortes flambeados y
              ramen concentrado por 12 horas para las noches del altiplano.
            </p>

            {/* Action Hierarchy: 1 Primary CTA + 1 Secondary Text/Outline Link */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onExploreMenu}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#E11D48] hover:bg-[#BE123C] text-[#F8FAFC] text-sm font-semibold tracking-wide transition-transform duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 shadow-lg shadow-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <span>Armar Tabla 3x2 o Ver Carta</span>
                <ArrowDownRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onReserveTable}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-[#F8FAFC] text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <CalendarClock className="w-4 h-4 text-[#D4AF37] shrink-0" aria-hidden="true" />
                <span>Reservar Mesa en Jr. Lima 439</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width 4-Column Architectural Proof Strip Below Hero */}
      <div className="bg-[#121316]/90 border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          <div className="pt-2 sm:pt-0 sm:px-4 first:pl-0">
            <p className="text-xs text-slate-400 tracking-wider">PROMO INSIGNIA</p>
            <p className="font-mono-tabular text-lg font-semibold text-[#F8FAFC] mt-1">
              3x2 en Makis · S/ 56.00
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              30 cortes · 3 sabores a elección
            </p>
          </div>
          <div className="pt-2 sm:pt-0 sm:px-4">
            <p className="text-xs text-slate-400 tracking-wider">CLIMA DE PUNO</p>
            <p className="font-mono-tabular text-lg font-semibold text-[#D4AF37] mt-1">
              Caldo Ramen 12 Horas
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Tonkotsu o pollo tierno · S/ 32.00
            </p>
          </div>
          <div className="pt-4 lg:pt-0 sm:px-4">
            <p className="text-xs text-slate-400 tracking-wider">UBICACIÓN CENTRAL</p>
            <p className="text-base font-semibold text-[#F8FAFC] mt-1">
              Jr. Lima 439 · 2do Piso
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              A pasos de la Plaza de Armas, Puno
            </p>
          </div>
          <div className="pt-4 lg:pt-0 sm:px-4">
            <p className="text-xs text-slate-400 tracking-wider">ATENCIÓN DIRECTA</p>
            <p className="font-mono-tabular text-lg font-semibold text-[#F8FAFC] mt-1">
              +51 937 377 991
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Lun – Dom · 12:30 p.m. a 11:00 p.m.
            </p>
          </div>
        </div>
      </div>

      {/* Infinite Crimson Marquee Ribbon */}
      <div
        className="bg-[#E11D48] text-[#F8FAFC] py-2.5 overflow-hidden border-t border-white/15 select-none"
        aria-label="Promociones destacadas de Nizumi Sushi Puno"
      >
        <div className="animate-marquee-track">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] px-4 whitespace-nowrap">
            {marqueeText.repeat(3)}
          </span>
          <span
            className="text-xs sm:text-sm font-semibold tracking-[0.18em] px-4 whitespace-nowrap"
            aria-hidden="true"
          >
            {marqueeText.repeat(3)}
          </span>
        </div>
      </div>
    </section>
  );
};
