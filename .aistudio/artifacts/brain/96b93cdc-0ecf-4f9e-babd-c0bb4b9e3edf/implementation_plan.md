# Plan de Corrección para Vista Previa en Vivo (Nizumi Sushi)

Permitir que la aplicación React de alta cocina Nikkei "Nizumi Sushi" se renderice de manera fluida y sin bloqueos de host en la ventana de vista previa (iframe de Cloud Run) de Google AI Studio.

### Decisiones Críticas Confirmadas

> [!IMPORTANT]
> El diagnóstico técnico confirmó que Vite 8 bloquea las solicitudes provenientes del dominio de Cloud Run (`*.run.app`) con un error HTTP `403 Forbidden: Blocked request. This host is not allowed`. Se mantendrá la arquitectura React y se configurará `allowedHosts` en Vite para habilitar el preview de inmediato.

- **Confirmación 1**: Mantener la arquitectura completa en React (componentes modulares, estado interactivo del Armador 3x2, checkout a WhatsApp y Tailwind CSS).
- **Confirmación 2**: Habilitar `server.allowedHosts: true` y `cors: true` en `vite.config.ts` para permitir el acceso mediante cualquier subdominio de Cloud Run (`.run.app`).

---

### 1. Diagnóstico y Causa Raíz

```
[ Navegador del Usuario / IFrame ]
               │
               ▼
   https://ais-dev-...run.app
               │
               ▼  (HTTP Host Header: *.run.app)
      [ Vite Dev Server ]  ──►  ❌ HTTP 403 Forbidden (Blocked host)
```

Al solicitar el preview desde la plataforma, el encabezado `Host` no es `localhost`, sino el dominio asignado de Cloud Run. Al actualizar la configuración de Vite, el servidor responderá con código 200 y cargará la aplicación completa.

---

### 2. Plan de Acción y Cambios a Realizar

1. **Configuración de Host en Vite (`vite.config.ts`)**:
   - Agregar `server.allowedHosts: true` (o admitir comodín `.run.app`) para autorizar el proxy de AI Studio.
   - Establecer `server.cors: true` y garantizar que el puerto continúe en `3000`.

2. **Garantía de Visibilidad Inmediata (`src/App.tsx` y `src/index.css`)**:
   - Asegurar que ningún elemento dependa exclusivamente del evento de scroll dentro del iframe para mostrarse (contenido 100% visible sin retardo de opacidad).

3. **Reinicio y Verificación Visual**:
   - Recompilar con `compile_applet`.
   - Reiniciar el servidor de desarrollo (`restart_dev_server`).
   - Validar con `curl` y capturas de pantalla en navegador que el preview carga el DOM completo con status HTTP 200.

---

### 3. Diagrama de la Solución

```
┌────────────────────────────────────────────────────────┐
│                   AI Studio Preview                    │
│           (https://ais-dev-...run.app)                 │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│              Vite Dev Server (Port 3000)               │
│  • server.allowedHosts: true   [NUEVO]                 │
│  • server.cors: true                                   │
│  • server.host: 0.0.0.0                                │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│            Nizumi Sushi React Application              │
│  • Navbar & Hero Cinematográfico Nikkei                │
│  • Armador Interactivo 3x2 (30 cortes / S/ 56.00)      │
│  • Carta Completa con Filtros y Fotos SVG Locales      │
│  • Dynamic Island flotante y Checkout a WhatsApp       │
└────────────────────────────────────────────────────────┘
```
