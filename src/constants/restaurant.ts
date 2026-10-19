export interface RestaurantConfig {
  name: string;
  tagline: string;
  address: string;
  city: string;
  googleMapsUrl: string;
  phoneDisplay: string;
  phoneRaw: string;
  phoneTel: string;
  whatsappUrl: string;
  instagramUrl: string;
  schedule: {
    daysDisplay: string;
    hoursDisplay: string;
    openTime: string;
    closeTime: string;
    openMinutes: number;
    closeMinutes: number;
  };
  promo3x2: {
    dayName: string;
    dayIndex: number;
  };
  reservationLimits: {
    minGuests: number;
    maxGuests: number;
  };
}

export const RESTAURANT: RestaurantConfig = {
  name: 'Nizumi Sushi',
  tagline: 'Cocina nikkei y fusión',
  address: 'Jr. Lima 439, 2do Piso, Puno, Perú',
  city: 'Puno',
  googleMapsUrl: 'https://maps.google.com/?q=Jr.+Lima+439,+Puno,+Peru',
  phoneDisplay: '+51 937 377 991',
  phoneRaw: '51937377991',
  phoneTel: 'tel:+51937377991',
  whatsappUrl: 'https://wa.me/51937377991',
  instagramUrl: 'https://instagram.com/nizumi_sushi_puno', // [COMPLETAR: Enlace oficial de Instagram]
  schedule: {
    daysDisplay: 'Lunes a domingo',
    hoursDisplay: '12:30 a 23:00',
    openTime: '12:30',
    closeTime: '23:00',
    openMinutes: 12 * 60 + 30, // 750 min
    closeMinutes: 23 * 60, // 1380 min
  },
  promo3x2: {
    dayName: 'Martes',
    dayIndex: 2, // 2 = Martes
  },
  reservationLimits: {
    minGuests: 1,
    maxGuests: 12,
  },
};

export interface LimaStatus {
  dayOfWeek: number;
  dayName: string;
  timeString: string;
  isTuesday: boolean;
  isOpenNow: boolean;
}

export function getLimaStatus(now: Date = new Date()): LimaStatus {
  try {
    const formatter = new Intl.DateTimeFormat('es-PE', {
      timeZone: 'America/Lima',
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const parts = formatter.formatToParts(now);
    const weekdayPart = parts.find((p) => p.type === 'weekday')?.value || '';
    const hourPart = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
    const minutePart = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
    const totalMinutes = hourPart * 60 + minutePart;

    // In America/Lima timezone, get day of week index
    const limaDateStr = now.toLocaleString('en-US', { timeZone: 'America/Lima' });
    const limaDate = new Date(limaDateStr);
    const dayOfWeek = isNaN(limaDate.getTime()) ? now.getDay() : limaDate.getDay();

    const isTuesday = dayOfWeek === 2;
    const isOpenNow =
      totalMinutes >= RESTAURANT.schedule.openMinutes &&
      totalMinutes < RESTAURANT.schedule.closeMinutes;

    return {
      dayOfWeek,
      dayName: weekdayPart,
      timeString: `${String(hourPart).padStart(2, '0')}:${String(minutePart).padStart(2, '0')}`,
      isTuesday,
      isOpenNow,
    };
  } catch {
    // Fallback if Intl timeZone fails
    const dayOfWeek = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const total = hours * 60 + minutes;
    return {
      dayOfWeek,
      dayName: 'hoy',
      timeString: `${hours}:${minutes}`,
      isTuesday: dayOfWeek === 2,
      isOpenNow: total >= 750 && total < 1380,
    };
  }
}
