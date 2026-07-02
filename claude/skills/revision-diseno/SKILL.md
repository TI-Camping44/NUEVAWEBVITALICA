---
name: revision-diseno
description: >-
  Auditar la UX y el diseño visual de la maqueta Vitalica (o cualquier sitio
  web estático del proyecto). Usar cuando el usuario pida "revisar el diseño",
  "auditar la UX", "mejorar la experiencia" o "los diseños", o cuando haya que
  revisar jerarquía visual, espaciado, tipografía, consistencia de marca,
  botones/CTAs, estados (vacío/cargando/error), responsive (celular) o
  conversión de e-commerce. Incluye CÓMO ver el sitio renderizado sin depender
  de Google Drive, y un checklist priorizado con los hallazgos ya conocidos.
---

# Revisión de diseño / UX (Vitalica)

Objetivo: revisar la experiencia y el diseño como lo haría un diseñador senior, de
forma **sistemática** (no "a ojo"), y entregar hallazgos **priorizados y accionables**.
No se toca código salvo que el usuario lo pida explícitamente.

## 1. Primero: poder VER el sitio renderizado

La vista previa interna de Claude NO puede leer Google Drive ni el Escritorio
(restricción de privacidad de macOS / TCC). Workaround probado que sí funciona:

1. Copiar el sitio a una carpeta del **home** (Claude sí puede leer ahí):
   `rsync -a --delete "<RUTA_DRIVE>/vitalica-maqueta/" "$HOME/vitalica-preview/"`
2. Servir esa copia con `~/serve-preview.py` (puerto 4322, cabecera `Cache-Control: no-store`).
3. Declararlo en `~/Desktop/.claude/launch.json` (`name: "vitalica"`, `port: 4322`) y llamar `preview_start`.
4. Capturar. **El screenshot NO sigue el scroll hecho por JavaScript; el `resize` SÍ fuerza el re-render.** Técnicas:
   - Página entera de una: `preview_resize` con alto = `document.body.scrollHeight`.
   - Por tramos en detalle: `document.body.style.marginTop='-Npx'` (sube el contenido) + `preview_resize` (fuerza refresh) + `preview_screenshot`.
   - **Verificá SIEMPRE con medición** (`preview_eval`), no solo con la captura: el carrusel y las animaciones salen "a mitad de transición" y engañan (ej.: parecía haber desborde horizontal y la medición demostró que no).

Alternativa: extensión **Claude in Chrome** apuntada a `http://localhost:4321` (servidor de Drive). Da clic/responsive reales.

Tras terminar, restaurá: `document.body.style.marginTop=''`.

## 2. Recorrido mínimo

Revisar SIEMPRE en **desktop (1280px)** y **celular (390px)**: home (hero, productos, metas,
value props, banda "Sin Atajos", reviews, guías, newsletter, footer), página de producto,
grilla de productos, **drawer del carrito**, sobre, contacto (dónde comprar), guía, checkout.

## 3. Checklist

- **Jerarquía visual:** un foco por sección; títulos > subtítulos > cuerpo bien diferenciados; el ojo va al CTA correcto.
- **Espaciado / ritmo:** usar la escala de tokens (`--space-*`); espacios entre secciones consistentes; sin valores sueltos.
- **Tipografía:** escala coherente (`--fs-*`); largo de línea legible; Montserrat (títulos) + Inter (texto).
- **Consistencia de marca:** SOLO la paleta definida en tokens (naranja `#EF7D2A` + navy `#0B55A3` + grises). Marcar cualquier color hardcodeado fuera de tokens (buscar `gradient` y hex en el CSS).
- **CTAs:** un primario por vista; texto accionable; mismo estilo de botón en todo el sitio; contraste suficiente (ver skill `accesibilidad`).
- **Estados:** carrito vacío, cargando, error de formulario, foco de teclado, hover.
- **Imágenes:** encuadre y fondo consistentes; sin deformar; peso razonable.
- **Mobile:** sin desborde horizontal (medir `document.documentElement.scrollWidth` vs `window.innerWidth`); tap targets ≥ 44px; menú usable; nada cortado.
- **E-commerce / conversión:** precio y CTA visibles sin scroll; prueba social; mínima fricción; drawer claro (subtotal, envío, finalizar); checkout corto; relacionados/upsell relevantes.
- **Coherencia de datos:** breadcrumb, eyebrow de categoría, chips de meta y footer deben nombrar las cosas igual.

## 4. Cómo reportar

Agrupar por severidad **ALTO / MEDIO / BAJO** y agregar **"Lo que está bien"** (para dar balance).
Cada hallazgo: *qué* + *dónde* (archivo y sección) + *por qué importa* + *fix concreto sugerido*.

## 5. Estado de la auditoría (jun-2026)

**Resuelto (✓):**
- Contraste de botones → texto oscuro sobre naranja (6.4:1). Naranja como TEXTO sobre claro → token `--color-primario-texto` (#A85410, 5.3:1) en "Leer más", "Ver todos", "+ Agregar" y nav activo; `.eyebrow` base → gris; eyebrow del hero navy → peach claro.
- Paleta a naranja+navy: metas (navy/naranja con texto oscuro), guías (sin violeta), categorías legacy limpias.
- Fila huérfana → grilla de 5 columnas en desktop (10 productos = 2 filas exactas).
- Tap targets del stepper del drawer → 44×44px.
- Footer "Envíos y entregas" / "Cambios y devoluciones" → secciones reales con ancla (`contacto.html#envios`, `#cambios`).

**Resuelto en la 2ª ronda (crítica de diseño, jun-2026):**
- Cards de producto "calladas" estilo BPN: la card entera es UN enlace, sin botón naranja repetido ×10; pista sutil "Ver producto →" en `--color-primario-texto`; precio alineado al fondo (`margin-top:auto`, desvío 0px medido). Botones naranjas del home: 16 → 6.
- Buscador real: la lupa abre overlay que filtra los productos en vivo (nombre+categoría+tags+resumen, sin acentos — "proteína" encuentra "Whey Protein"). Esc cierra, Enter va al primer resultado.
- Chips de filtro → `<button aria-pressed>`; hovers naranjas sobre claro → `--color-primario-texto`; `prefers-reduced-motion` apaga autoplay del carrusel, rotación de anuncios y transiciones decorativas.

**Pendiente / menor:**
- Barra de anuncios: es un crossfade normal (NO bug); se puede pasar a slide si molesta el solape de la transición.
- `.hero__eyebrow` naranja sobre el hero navy: pasa en la zona oscura, borderline en la clara.
- Breadcrumb usa la meta y el eyebrow la categoría (se ven distintos).
- CONTENIDO (lo que más falta para "premium"): banner real 1920×760 en el slide 1 (modo banner ya existe), 6 fotos de comunidad reales en la sección Instagram (hoy repiten packshots), precios reales.

**Bien (confirmado):** 0 imágenes sin `alt`; redes del footer CON `aria-label`; texto apagado `#565C66` sobre blanco 6.73:1; copy honesto (sin "envío gratis" ni "12 cuotas"; reviews "demo"; footer "Maqueta de demostración"); drawer fiel a BPN; sin desborde horizontal en mobile; sistema de diseño con tokens.
