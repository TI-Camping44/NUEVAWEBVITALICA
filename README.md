# Vitalica — Maqueta de e-commerce (prototipo)

Maqueta navegable de la tienda online de **Vitalica** (representante exclusivo de **Olimp Sport
Nutrition** en Paraguay). Sirve como **referencia de diseño y experiencia** para el equipo de IT y para
mostrar cómo se vería y funcionaría la tienda.

> ⚠️ **Es una maqueta, no la tienda real.** No tiene backend ni cobros: el catálogo y los textos están
> en un archivo, y el checkout termina en una pantalla de "pedido confirmado" **sin mover dinero**.
> Para el detalle técnico y qué construir en producción, ver **`HANDOFF-IT.md`**.

---

## Cómo abrir la maqueta

**Forma fácil:** doble clic en `index.html` (se abre en el navegador).

**Forma recomendada** (el carrito y las imágenes funcionan igual que en la web real) — levantar un
servidor local en esta carpeta:

```bash
# con Python (viene en Mac):
python3 -m http.server 4321
# luego abrir en el navegador:
#   http://localhost:4321
```

> Si trabajás desde Google Drive, abrí esta carpeta en una terminal y corré el comando ahí.
> (También sirve la extensión "Live Server" de VS Code, o `npx serve`.)

---

## Estructura de archivos

```
vitalica-maqueta/
├── index.html              Home
├── productos.html          Grilla de productos + filtro por objetivo
├── producto.html           Detalle de producto (plantilla, lee ?id= de la URL)
├── carrito.html            Carrito (página completa)
├── checkout.html           Checkout → confirmación (sin cobro)
├── sobre.html              Quiénes somos
├── contacto.html           Dónde comprar · Envíos · Cambios · Contacto
├── guia.html               Índice de "Guía de uso" + guia-*.html (3 guías)
├── admin.html              Panel de administrador (demo, oculto)
├── muestra.html            Referencia interna del sistema de diseño
├── README.md               Este archivo
├── HANDOFF-IT.md           Documento de entrega para IT
├── .claude/skills/         Skills de Claude Code (revisión de diseño y accesibilidad)
└── assets/
    ├── css/styles.css      Sistema de diseño + componentes + páginas
    ├── img/                Logos y fotos de producto
    └── js/
        ├── data.js         ⭐ TODO el contenido y la configuración (la fuente única)
        ├── components.js   Header, footer, barra de anuncios, cards, carrito (drawer)
        ├── cart.js         Carrito (se guarda en el navegador)
        ├── main.js         Arma el "marco" común y la lógica compartida
        └── pages/          Lógica de cada página (home, productos, producto, admin, etc.)
```

---

## Cómo editar el contenido

Hay **dos formas**:

### 1) Editando `assets/js/data.js` (la fuente única)
Ahí está **todo**: productos, precios, categorías/metas, tiendas, textos, WhatsApp, redes, costos de
envío, hero y logos. Está comentado en español. Cambiás un valor y se actualiza en todo el sitio.

### 2) Con el panel de administrador (`admin.html`) — sin tocar código
- Abrí `admin.html` y entrá con la clave **`vitalica2026`** (clave **demostrativa**).
- Podés cambiar logos, imágenes (con el tamaño ideal indicado), textos, precios, enlaces (texto +
  destino), anuncios, WhatsApp, redes, envíos y tiendas.
- **Guardar** → recargás el sitio y ves los cambios. **Exportar** baja un `.json` con todo (para
  guardarlo o pasárselo a IT). **Importar** lo carga en otra compu. **Restablecer** vuelve al original.

> Importante: el panel guarda los cambios **solo en tu navegador** (es una demo). La persistencia para
> todos los visitantes la construye IT con un CMS/backend (ver `HANDOFF-IT.md`).

---

## Cómo funciona por dentro (resumen)

- **HTML + CSS + JavaScript puro**, sin frameworks.
- El **header, footer, barra de anuncios y botón de WhatsApp** se generan por JavaScript y se insertan
  en todas las páginas → se editan en un solo lugar (`components.js`).
- El **carrito** se guarda en el navegador (`localStorage`) y persiste entre páginas. Agregar un
  producto abre el **panel lateral (drawer)**, estilo Bare Performance Nutrition.
- El **diseño** sale de variables CSS (colores de marca, tipografía, espaciado) al inicio de
  `styles.css`: cambiar el naranja se hace en un solo lugar.

---

## Notas importantes

- **Precios:** provisorios ("Gs. ——" / "Precio a confirmar"). Cargá los reales en `data.js` o el panel.
- **Reseñas:** son de demostración (marcadas como tal).
- **Marca:** paleta = **naranja `#EF7D2A` + navy `#0B55A3` + grises**. Mantener esa paleta.
- **Sin envío gratis ni cuotas** salvo que el negocio lo confirme (la maqueta no promete eso).

---

## Para el equipo de IT

Todo lo necesario para llevar esto a producción (pasarela **Bancard**, backend, gestión de pedidos,
recomendación de plataforma, etc.) está en **`HANDOFF-IT.md`**.

## Skills de Claude Code incluidas
En `.claude/skills/` hay dos asistentes reutilizables: **`revision-diseno`** (auditoría de UX/diseño) y
**`accesibilidad`** (auditoría WCAG/contraste). Se invocan pidiéndole a Claude, por ejemplo,
"revisá el diseño" o "revisá la accesibilidad".
