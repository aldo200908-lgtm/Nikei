# Nizumi Sushi – Cocina Nikkei & Fusión

Sitio web oficial y sistema de pedidos directos por WhatsApp para **Nizumi Sushi**, ubicado en Jr. Lima 439, 2do Piso, Puno, Perú.

Desarrollado con **React 19**, **TypeScript**, **Vite** y **Tailwind CSS**.

---

## Características

- **Diseño editorial sobrio y cálido**: Espaciado generoso, paleta en negro obsidiana con acentos en carmesí y dorado Wasabi, tipografía jerarquizada (`Cinzel` para marca y titular principal; `Plus Jakarta Sans` para lectura y componentes).
- **La Carta**: Filtrado por categorías (`Tablas`, `Makis de autor`, `Ramen`, `Cocina caliente y bowls`) con platos reales de Nizumi Sushi y opción de proteína para el ramen.
- **Armador de Tabla 3x2**: Selector interactivo de 3 rollos (30 cortes en total) eligiendo entre Acevichado, Furai, Pulpo al Olivo, Lomo Saltado y Avocado, con control de disponibilidad según el día de la promoción (martes).
- **Carrito y Reserva**:
  - Persistencia de selección en `localStorage`.
  - Drawer accesible con cierre en `Esc`, bloqueo de scroll de fondo y trampa de foco.
  - Soporte de 3 modalidades: **Delivery en Puno** (teléfono y dirección obligatorios), **Recojo en local** y **Reserva de mesa** (no exige preordenar platos, valida fecha, comensales y horario de atención).
  - Envío directo a WhatsApp (`+51 937 377 991`) sin pantallas intermedias.
- **Horario en tiempo real**: Cálculo dinámico del estado de atención (Abierto / Cerrado) basado en la zona horaria de Lima (`America/Lima`).
- **SEO & Accesibilidad**: JSON-LD estructurado de `Restaurant`, OpenGraph (`og:image`), `favicon.svg`, `robots.txt`, `sitemap.xml` y soporte para `prefers-reduced-motion`.

---

## Instalación y Desarrollo Local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo (puerto 3000)
npm run dev

# 3. Ejecutar pruebas unitarias (Vitest)
npm test

# 4. Compilar para producción
npm run build
```

---

## Datos Reales a Completar `[COMPLETAR]`

En el código se dejaron marcados los campos donde el restaurante debe ingresar sus datos definitivos o reemplazar las imágenes referenciales:

1. **Fotografías reales de los platos**: En `/public/images/`, sustituir los archivos SVG referenciales por fotografías reales en proporción 4:3 (`maki-acevichado.svg`, `ramen-tonkotsu.svg`, `tabla-imperial.svg`, etc.) y el hero en 16:9 (`hero-nikkei.svg`).
2. **Instagram oficial**: En `src/constants/restaurant.ts`, actualizar `instagramUrl` con el enlace o usuario exacto de Instagram.
3. **Enlace exacto de Google Maps**: En `src/constants/restaurant.ts`, verificar si el enlace de Google Maps a Jr. Lima 439 corresponde a la ficha de negocio verificada en Google Business.
4. **Reseñas reales**: En `LocationAndContactSection.tsx`, el bloque enlaza directamente a Google Maps para que los comensales lean u opinen; puede sustituirse por citas directas si se recopilan testimonios reales autorizados.

---

## Despliegue en Vercel

El proyecto incluye `vercel.json` preconfigurado con soporte para SPA (Single Page Application) y caché optimizado para recursos estáticos.

Para desplegar:
```bash
npx vercel --prod
```
O conecta tu repositorio de GitHub directamente en el panel de [Vercel](https://vercel.com).
