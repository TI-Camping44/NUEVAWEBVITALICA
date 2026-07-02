---
name: accesibilidad
description: >-
  Auditar la accesibilidad web (WCAG) de la maqueta Vitalica. Usar cuando se
  pida revisar "accesibilidad", "contraste", "que se lea bien", "WCAG", foco de
  teclado, textos alternativos (alt), tamaños táctiles, HTML semántico, labels
  de formularios o nombres accesibles de botones/íconos. Incluye la fórmula de
  contraste, los umbrales WCAG y snippets listos para medir con preview_eval.
---

# Accesibilidad (a11y) — Vitalica

Objetivo: encontrar barreras concretas y dar fixes claros. La accesibilidad además
mejora el SEO y la usabilidad para todos. No se toca código salvo que lo pidan.

## Umbrales WCAG (nivel AA)

- **Contraste de texto normal:** ≥ **4.5:1**.
- **Texto grande** (≥ 24px normal, o ≥ 18.66px **bold**): ≥ **3:1**.
- **Componentes de UI y íconos** (bordes de inputs, íconos informativos): ≥ **3:1**.
- **Tap targets** (táctil): ≥ **44×44px** (Apple) / 48px (Material). WCAG 2.2 mínimo 24px.

## Medir contraste (snippet para `preview_eval`)

```js
(() => {
  const lum=(r,g,b)=>{const f=c=>{c/=255;return c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4)};return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)};
  const px=c=>(c.match(/\d+/g)||[0,0,0]).map(Number);
  const ratio=(c1,c2)=>{const a=lum(...px(c1)),b=lum(...px(c2));const L=Math.max(a,b),D=Math.min(a,b);return ((L+0.05)/(D+0.05)).toFixed(2)};
  const el=document.querySelector('SELECTOR');
  const cs=getComputedStyle(el), r=el.getBoundingClientRect();
  return {bg:cs.backgroundColor, color:cs.color, contraste:ratio(cs.color,cs.backgroundColor), fs:cs.fontSize, fw:cs.fontWeight, alto:Math.round(r.height)};
})()
```

## Checklist

1. **Contraste** de todos los textos sobre su fondo (titulares, cuerpo, texto apagado, botones, badges, banda navy, footer).
2. **Color como único indicador:** no depender solo del color (ej. ✓/✗ además del verde/rojo).
3. **Foco de teclado:** `:focus-visible` visible en links, botones, inputs; orden de tabulación lógico; el drawer y el menú móvil atrapan/retornan el foco.
4. **Textos alternativos:** toda `<img>` informativa con `alt`; decorativas con `alt=""`.
5. **Nombres accesibles:** botones e íconos sin texto necesitan `aria-label` (carrito, menú, redes, cerrar).
6. **Semántica:** usar `<button>` para acciones JS (no `<a href="#">`); encabezados `<h1>..<h3>` en orden; `<nav>`, `<main>`, `<footer>`.
7. **Formularios:** cada campo con `<label>` asociado; errores anunciados (no solo color); `type` correcto (email, tel).
8. **Tap targets** ≥ 44px (medir altura/ancho real).
9. **Movimiento:** respetar `prefers-reduced-motion` en carrusel/animaciones.
10. **Zoom / texto:** usar `rem` (ya lo hace); que a 200% no se rompa.

## Hallazgos (jun-2026)

**Resuelto (✓):**
- Botones: texto oscuro `#16191D` sobre naranja = **6.41:1** (antes blanco 2.75). Aplica a "Ver producto", "Agregar al carrito", "Finalizar compra", "Suscribirme".
- Naranja como TEXTO sobre claro: nuevo token `--color-primario-texto` (#A85410) = **5.33:1** en "Leer más", "Ver todos los productos", "+ Agregar", nav activo. `.eyebrow` base → gris (6.73:1); eyebrow del hero navy → peach (6.5:1).
- Stepper del drawer **44×44px** (antes 34×36).

**Resuelto (2ª ronda):**
- Hovers naranjas sobre claro → `--color-primario-texto` (5.33:1) en los 8 casos (megamenú, breadcrumb, drawer, carrito, íconos, volver).
- Chips de filtro = `<button aria-pressed>` (accionan con teclado, anuncian estado).
- Lupa = buscador real con `aria-label`, foco al abrir, Esc cierra.
- `prefers-reduced-motion`: sin autoplay de carrusel ni rotación de anuncios; transiciones decorativas apagadas (CSS + JS).

**Pendiente / menor:**
- `.hero__eyebrow` naranja sobre hero navy: borderline en la zona clara del gradiente.
- Trampa de foco (focus trap) en drawer/buscador/menú móvil: el foco puede salirse con Tab (refinamiento de producción).

**Bien (confirmado):** 0 imágenes sin `alt`; redes del footer **CON** `aria-label` (Instagram/TikTok/Facebook); texto apagado `#565C66` sobre blanco 6.73:1; tamaños en `rem`.

## Para el HANDOFF / producción

La maqueta es estática: en producción, mantener estos chequeos en el pipeline (lint a11y,
contraste en el sistema de diseño) y validar formularios reales con teclado y lector de pantalla.
