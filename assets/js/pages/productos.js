/* ==========================================================================
   VITALICA — pages/productos.js  ·  PÁGINA "PRODUCTOS"
   --------------------------------------------------------------------------
   Grilla plana con todos los productos + chips para filtrar por objetivo
   (meta). Si la URL trae ?meta=fuerza, arranca filtrado por esa meta
   (así funcionan los enlaces del home, mega-menú y footer).
   ========================================================================== */
(function () {
  var grilla = document.querySelector('[data-grilla-productos]');
  var nav = document.querySelector('[data-filtro-metas]');
  if (!grilla || !nav) return;

  var metaActual = new URLSearchParams(location.search).get('meta') || 'todos';

  // Chips: "Todos" + las 4 metas. Son <button> (no enlaces falsos "#"):
  // accionan con teclado y los lectores de pantalla anuncian su estado.
  var filtros = [{ id: 'todos', nombre: 'Todos' }].concat(VITALICA_METAS);
  nav.innerHTML = filtros.map(function (m) {
    return '<button type="button" data-meta="' + m.id + '" aria-pressed="false">' + m.nombre + '</button>';
  }).join('');

  function pintar() {
    var lista = (metaActual === 'todos') ? VITALICA_PRODUCTOS : Datos.porMeta(metaActual);
    grilla.innerHTML = lista.map(function (p) { return Vitalica.cardProducto(p); }).join('');
    nav.querySelectorAll('[data-meta]').forEach(function (b) {
      var activo = (b.dataset.meta === metaActual);
      b.classList.toggle('activo', activo);
      b.setAttribute('aria-pressed', activo ? 'true' : 'false');
    });
  }

  pintar();

  nav.addEventListener('click', function (e) {
    var b = e.target.closest('[data-meta]');
    if (!b) return;
    metaActual = b.dataset.meta;
    // Actualizamos la URL sin recargar (para poder compartir el filtro)
    var url = (metaActual === 'todos') ? 'productos.html' : ('productos.html?meta=' + metaActual);
    history.replaceState(null, '', url);
    pintar();
  });
})();
