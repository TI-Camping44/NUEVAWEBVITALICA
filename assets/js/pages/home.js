/* ==========================================================================
   VITALICA — pages/home.js  ·  PARTES DINÁMICAS DEL HOME
   --------------------------------------------------------------------------
   Rellena cuatro bloques del index.html leyendo data.js:
     • [data-hero]      → carrusel de 3 slides (con autoplay, flechas y puntos)
     • [data-metas]     → tarjetas "¿Qué querés lograr?" (3 objetivos)
     • [data-productos] → grilla con toda la línea de productos
     • [data-articulos] → tarjetas del blog
   ========================================================================== */
(function () {

  /* ---------- HERO: carrusel ---------- */
  var hero = document.querySelector('[data-hero]');
  if (hero && typeof VITALICA_HERO !== 'undefined') {

    // 1) Armamos el HTML de los slides.
    //    modo 'banner'  → la imagen cubre TODO el rectángulo (con velo oscuro para leer el texto)
    //    modo 'producto' → foto del envase flotando a la derecha (layout clásico)
    var slides = VITALICA_HERO.map(function (s, i) {
      var esBanner = (s.modo === 'banner');
      return '<div class="hero__slide hero__slide--' + (i + 1) + (esBanner ? ' hero__slide--banner' : '') + '">' +
               (esBanner ? '<img class="hero__cover" src="' + s.imagen + '" alt="">' : '') +
               '<div class="contenedor hero__inner">' +
                 '<div class="hero__contenido">' +
                   '<p class="hero__eyebrow">' + s.eyebrow + '</p>' +
                   '<h1 class="hero__titulo">' + s.titulo + '</h1>' +
                   '<p class="hero__texto">' + s.texto + '</p>' +
                   '<div class="hero__acciones">' +
                     '<a href="' + s.cta1.href + '" class="btn btn--primario btn--grande">' + s.cta1.texto + '</a>' +
                     (s.cta2 ? '<a href="' + s.cta2.href + '" class="btn btn--claro btn--grande">' + s.cta2.texto + '</a>' : '') +
                   '</div>' +
                 '</div>' +
                 (esBanner ? '' : '<div class="hero__media"><img src="' + s.imagen + '" alt="" width="700" height="700"></div>') +
               '</div>' +
             '</div>';
    }).join('');

    // 2) Puntos indicadores (uno por slide)
    var puntos = VITALICA_HERO.map(function (_, i) {
      return '<button class="hero__dot' + (i === 0 ? ' activo' : '') + '" data-ir="' + i + '" aria-label="Ir al slide ' + (i + 1) + '"></button>';
    }).join('');

    hero.innerHTML =
      '<div class="hero__track">' + slides + '</div>' +
      '<button class="hero__flecha hero__flecha--prev" aria-label="Anterior">&#8249;</button>' +
      '<button class="hero__flecha hero__flecha--next" aria-label="Siguiente">&#8250;</button>' +
      '<div class="hero__dots">' + puntos + '</div>';

    // 3) Lógica del carrusel
    var track = hero.querySelector('.hero__track');
    var dots = hero.querySelectorAll('.hero__dot');
    var total = VITALICA_HERO.length;
    var actual = 0;
    var timer;

    function ir(i) {
      actual = (i + total) % total;
      track.style.transform = 'translateX(-' + (actual * 100) + '%)';
      dots.forEach(function (d, di) { d.classList.toggle('activo', di === actual); });
    }
    function reiniciarAutoplay() {
      clearInterval(timer);
      timer = setInterval(function () { ir(actual + 1); }, 6000);
    }

    hero.querySelector('.hero__flecha--next').addEventListener('click', function () { ir(actual + 1); reiniciarAutoplay(); });
    hero.querySelector('.hero__flecha--prev').addEventListener('click', function () { ir(actual - 1); reiniciarAutoplay(); });
    dots.forEach(function (d) {
      d.addEventListener('click', function () { ir(parseInt(d.dataset.ir, 10)); reiniciarAutoplay(); });
    });
    hero.addEventListener('mouseenter', function () { clearInterval(timer); });
    hero.addEventListener('mouseleave', reiniciarAutoplay);

    reiniciarAutoplay();
  }

  /* ---------- METAS ("¿Qué querés lograr?") ---------- */
  var contMetas = document.querySelector('[data-metas]');
  if (contMetas) {
    contMetas.innerHTML = VITALICA_METAS.map(function (m) {
      return '<a class="categoria-card" href="productos.html?meta=' + m.id + '">' +
               '<span class="categoria-card__nombre">' + (m.accion || m.nombre) + '</span>' +
               '<span class="categoria-card__desc">' + m.descripcion + '</span>' +
               '<span class="categoria-card__cta">Ver productos →</span>' +
             '</a>';
    }).join('');
  }

  /* ---------- PRODUCTOS (toda la línea) ---------- */
  var contProductos = document.querySelector('[data-productos]');
  if (contProductos) {
    contProductos.innerHTML = VITALICA_PRODUCTOS.map(function (p) {
      return Vitalica.cardProducto(p);
    }).join('');
  }

  /* ---------- BLOG ---------- */
  var contArticulos = document.querySelector('[data-articulos]');
  if (contArticulos) {
    contArticulos.innerHTML = VITALICA_ARTICULOS.map(function (a) {
      return Vitalica.cardArticulo(a);
    }).join('');
  }

  /* ---------- COMUNIDAD / INSTAGRAM ("Sumate a la comunidad") ----------
     Posteos simulados que enlazan al perfil real. En producción, IT conecta
     el feed verdadero de Instagram (ver HANDOFF-IT.md). */
  var contIg = document.querySelector('[data-instagram]');
  if (contIg && VITALICA_CONFIG.comunidad) {
    var com = VITALICA_CONFIG.comunidad;
    var urlIg = (VITALICA_CONFIG.redes && VITALICA_CONFIG.redes.instagram) || '#';
    contIg.innerHTML = (com.posts || []).filter(Boolean).map(function (src) {
      return '<a class="ig-tile" href="' + urlIg + '" target="_blank" rel="noopener" aria-label="Ver publicación en Instagram">' +
               '<img src="' + src + '" alt="Publicación de Instagram de Vitalica" loading="lazy">' +
               '<span class="ig-tile__overlay">' + Vitalica.iconos.instagram + '</span>' +
             '</a>';
    }).join('');
    var handleEl = document.querySelector('[data-ig-handle]');
    if (handleEl) handleEl.textContent = com.handle || '@vitalica.py';
    var linkEl = document.querySelector('[data-ig-link]');
    if (linkEl) {
      linkEl.href = urlIg;
      linkEl.textContent = 'Seguir a ' + (com.handle || '@vitalica.py');
    }
  }

})();
