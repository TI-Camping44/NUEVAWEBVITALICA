/* ==========================================================================
   VITALICA — pages/producto.js  ·  DETALLE DE PRODUCTO (estilo BPN)
   --------------------------------------------------------------------------
   Lee el ?id= de la URL, arma la zona de compra arriba y, debajo, secciones
   de marketing con bloques de marca + el contenido REAL de la guía de uso
   (Datos.guia): Lo que sí/no hace, Cómo tomarla, Qué esperar, Cuidados y FAQ.
   "Agregar al carrito" abre el carrito drawer. Relacionados = combo (van juntos).
   ========================================================================== */
(function () {
  var cont = document.querySelector('[data-producto]');
  if (!cont) return;

  var id = new URLSearchParams(location.search).get('id');
  var p = id ? Datos.producto(id) : null;
  var bc = document.querySelector('[data-breadcrumb]');

  if (!p) {
    if (bc) bc.innerHTML = '<a href="index.html">Inicio</a><span>/</span><a href="productos.html">Productos</a>';
    cont.innerHTML =
      '<div class="producto-no-encontrado">' +
        '<h1>Producto no encontrado</h1>' +
        '<p class="texto-apagado">El producto que buscás no existe o cambió de dirección.</p>' +
        '<a class="btn btn--primario" href="productos.html">Ver productos</a>' +
      '</div>';
    return;
  }

  document.title = p.nombre + ' · Vitalica';
  var cat = Datos.categoria(p.categoria);
  var meta = VITALICA_METAS.find(function (m) { return m.categorias.indexOf(p.categoria) !== -1; });
  var g = Datos.guia(p.id) || {};

  // Migas de pan
  if (bc) {
    bc.innerHTML =
      '<a href="index.html">Inicio</a><span>/</span>' +
      '<a href="productos.html' + (meta ? '?meta=' + meta.id : '') + '">' + (meta ? meta.nombre : 'Productos') + '</a>' +
      '<span>/</span><span class="breadcrumb__actual">' + p.nombre + '</span>';
  }

  var etiqueta = (p.tags && p.tags.length) ? p.tags[0] : '';
  var claseTag = 'tag--nuevo';
  if (etiqueta.toLowerCase() === 'lanzamiento') claseTag = 'tag--lanzamiento';
  if (etiqueta.toLowerCase() === 'oferta')      claseTag = 'tag--oferta';

  /* ===== ZONA DE COMPRA ===== */
  cont.innerHTML =
    '<div class="producto__media">' +
      (etiqueta ? '<span class="tag ' + claseTag + ' card-producto__tag">' + etiqueta + '</span>' : '') +
      '<img src="' + p.imagen + '" alt="' + p.nombre + '" width="700" height="700">' +
    '</div>' +
    '<div class="producto__info">' +
      '<p class="producto__cat">' + (cat ? cat.nombre : '') + '</p>' +
      '<h1>' + p.nombre + '</h1>' +
      '<div class="producto__rating">' + Vitalica.estrellas(p.rating) +
        '<span>' + p.rating.toFixed(1) + ' · ' + p.reviews + ' opiniones</span></div>' +
      '<div class="producto__precio">' + Vitalica.formatearGs(p.precio) + '</div>' +
      (p.precio == null ? '<p class="producto__precio-nota">Precio a confirmar — consultanos por WhatsApp</p>' : '') +
      '<p class="producto__resumen">' + p.resumen + '</p>' +
      '<div class="producto__compra">' +
        '<div class="selector-cantidad">' +
          '<button type="button" data-menos aria-label="Restar uno">−</button>' +
          '<input type="text" inputmode="numeric" data-cantidad value="1" aria-label="Cantidad">' +
          '<button type="button" data-mas aria-label="Sumar uno">+</button>' +
        '</div>' +
        '<button class="btn btn--primario btn--grande" data-agregar>Agregar al carrito</button>' +
      '</div>' +
      '<a class="btn btn--contorno producto__whatsapp" target="_blank" rel="noopener" href="' +
        Vitalica.linkWhatsapp('Hola Vitalica, quiero consultar por ' + p.nombre + '.') +
        '">Consultar por WhatsApp</a>' +
    '</div>';

  var input = cont.querySelector('[data-cantidad]');
  function cantidad() { var n = parseInt(input.value, 10); return (isNaN(n) || n < 1) ? 1 : n; }
  cont.querySelector('[data-menos]').addEventListener('click', function () { input.value = Math.max(1, cantidad() - 1); });
  cont.querySelector('[data-mas]').addEventListener('click', function () { input.value = cantidad() + 1; });
  input.addEventListener('change', function () { input.value = cantidad(); });
  cont.querySelector('[data-agregar]').addEventListener('click', function () {
    Carrito.agregar(p.id, cantidad());
    if (Vitalica.abrirCarrito) Vitalica.abrirCarrito();
  });

  /* ===== Helpers de render ===== */
  function li(arr) { return arr.map(function (x) { return '<li>' + x + '</li>'; }).join(''); }

  var beneficios = (p.beneficios || []).map(function (b) {
    return '<div class="beneficio-card"><span class="beneficio-card__icono">' + Vitalica.iconoBeneficio(b.icono) +
           '</span><h3>' + b.titulo + '</h3><p>' + b.texto + '</p></div>';
  }).join('');

  var ingredientes = (p.ingredientes || []).map(function (i) {
    return '<div class="ingrediente"><h3>' + i.nombre + '</h3><p>' + i.texto + '</p></div>';
  }).join('');

  // Lo que sí / lo que no
  var siNo = '';
  if ((g.siSirve && g.siSirve.length) || (g.noSirve && g.noSirve.length)) {
    siNo = '<section class="seccion"><div class="contenedor">' +
      '<div class="encabezado-seccion centrado"><p class="eyebrow">Expectativas reales</p><h2>Lo que sí hace (y lo que no)</h2></div>' +
      '<div class="sino-grid">' +
        (g.siSirve ? '<div class="sino sino--si"><h3>Para esto sí sirve</h3><ul>' + li(g.siSirve) + '</ul></div>' : '') +
        (g.noSirve ? '<div class="sino sino--no"><h3>Para esto no</h3><ul>' + li(g.noSirve) + '</ul></div>' : '') +
      '</div></div></section>';
  }

  // Cómo tomarla (reemplaza el "modo de uso" genérico)
  var comoTomar = '';
  if (g.comoTomar) {
    comoTomar = '<section class="seccion seccion--suave"><div class="contenedor guia-uso">' +
      '<div class="encabezado-seccion"><p class="eyebrow">Modo de uso</p><h2>Cómo tomarla</h2></div>' +
      '<p class="guia-uso__dosis">' + g.comoTomar + '</p>' +
      (g.pasos ? '<ol class="guia-pasos">' + li(g.pasos) + '</ol>' : '') +
    '</div></section>';
  }

  // Qué esperar (línea de tiempo)
  var queEsperar = '';
  if (g.queEsperar && g.queEsperar.length) {
    queEsperar = '<section class="seccion"><div class="contenedor">' +
      '<div class="encabezado-seccion centrado"><p class="eyebrow">Resultados reales</p><h2>Qué esperar</h2></div>' +
      '<div class="timeline">' + g.queEsperar.map(function (e) {
        return '<div class="timeline__item"><span class="timeline__etapa">' + e.etapa + '</span><p>' + e.texto + '</p></div>';
      }).join('') + '</div></div></section>';
  }

  // Cuidados
  var cuidados = '';
  if (g.cuidados && g.cuidados.length) {
    cuidados = '<section class="seccion seccion--suave"><div class="contenedor guia-cuidados">' +
      '<div class="encabezado-seccion"><p class="eyebrow">Importante</p><h2>Cuidados</h2></div>' +
      '<ul class="guia-lista">' + li(g.cuidados) + '</ul>' +
    '</div></section>';
  }

  // FAQ (real del producto, o genérica si no hay)
  var faqs = (g.faqs && g.faqs.length) ? g.faqs : [
    { q: '¿Los productos son originales?', a: 'Sí. Vitalica es representante exclusivo de Olimp Sport Nutrition en Paraguay, con garantía oficial.' },
    { q: '¿Hacen envíos?', a: 'Sí, a todo el país: Gran Asunción e interior. El costo se calcula en el checkout.' },
    { q: '¿Me asesoran sobre cómo tomarlo?', a: 'Claro. Escribinos por WhatsApp y te ayudamos según tu objetivo.' }
  ];
  var faqHTML = '<section class="seccion"><div class="contenedor prod-faq">' +
    '<div class="encabezado-seccion centrado"><p class="eyebrow">Preguntas frecuentes</p><h2>Lo que más nos consultan</h2></div>' +
    faqs.map(function (f) { return '<details class="faq-item"><summary>' + f.q + '</summary><p>' + f.a + '</p></details>'; }).join('') +
  '</div></section>';

  var marketing =
    '<section class="prod-banda"><div class="contenedor"><span class="prod-banda__txt">' + (p.bandaBeneficio || '') + '</span></div></section>' +
    '<section class="seccion"><div class="contenedor">' +
      '<div class="encabezado-seccion centrado"><p class="eyebrow">Beneficios</p><h2>¿Qué hace por vos?</h2></div>' +
      '<div class="beneficios-grid">' + beneficios + '</div></div></section>' +
    '<section class="seccion seccion--suave"><div class="contenedor prod-sobre">' +
      '<div class="encabezado-seccion centrado"><p class="eyebrow">Sobre el producto</p><h2>' + p.nombre + '</h2></div>' +
      '<p class="prod-sobre__texto">' + p.descripcion + '</p></div></section>' +
    '<section class="seccion"><div class="contenedor">' +
      '<div class="encabezado-seccion centrado"><p class="eyebrow">Fórmula</p><h2>Ingredientes destacados</h2></div>' +
      '<div class="ingredientes-lista">' + ingredientes + '</div></div></section>' +
    siNo + comoTomar + queEsperar + cuidados + faqHTML +
    // Banda "Sin Atajos" (CTA)
    '<section class="banda-sinatajos"><div class="contenedor banda-sinatajos__inner">' +
      '<p class="eyebrow" style="color:var(--color-primario)">Sin Atajos</p>' +
      '<h2>Sumalo a tu rutina</h2>' +
      '<p>Los resultados llegan con constancia. Si tenés dudas sobre cómo usarlo para tu objetivo, escribinos y te asesoramos.</p>' +
      '<a class="btn btn--primario btn--grande" target="_blank" rel="noopener" href="' +
        Vitalica.linkWhatsapp('Hola Vitalica, quiero consultar por ' + p.nombre + '.') + '">Consultar por WhatsApp</a>' +
    '</div></section>';

  var mk = document.querySelector('[data-producto-marketing]');
  if (mk) mk.innerHTML = marketing;

  /* ===== Relacionados (productos que "van juntos" = mismo combo) ===== */
  var wrap = document.querySelector('[data-relacionados-wrap]');
  var contRel = document.querySelector('[data-relacionados]');
  if (contRel) {
    var rel = Datos.relacionados(p.id).slice(0, 4);
    if (rel.length) {
      contRel.innerHTML = rel.map(function (x) { return Vitalica.cardProducto(x); }).join('');
      if (wrap) wrap.hidden = false;
    }
  }
})();
