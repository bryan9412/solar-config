# Configuración solar

App web (PWA) con guía por menús para configurar dos inversores solares:

- **Sumry HGX 4KW** (24 V) con batería Dumfume 24V 100Ah o Felicity FLA24171-EU.
- **ExpertPower IVV48V6.5KW** (48 V) con batería Ogrphy 51.2V 100Ah.

Todas las baterías van en modo USE (sin RS485), carga cuidadosa y ~10 % de reserva. Funciona sin internet una vez instalada.

**App publicada:** https://bryan9412.github.io/solar-config/

## Instalar en el celular (Android, Chrome)

1. Abre el enlace de arriba en Chrome.
2. Toca el botón **Instalar app** (arriba) o el menú ⋮ → **Instalar app**.

## Actualizar

Al cambiar cualquier archivo, sube `VERSION` en `sw.js` (`solar-v1` → `solar-v2`) y haz push; si no, el celular sigue con la versión vieja en caché.
