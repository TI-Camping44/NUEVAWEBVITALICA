/* ==========================================================================
   VITALICA — pages/contacto.js  ·  DÓNDE COMPRAR (store locator)
   --------------------------------------------------------------------------
   Pinta las tarjetas de tiendas desde VITALICA_TIENDAS (data.js).
   El formulario de contacto lo maneja main.js (data-form-demo).
   ========================================================================== */
(function () {
  var cont = document.querySelector('[data-tiendas]');
  if (!cont || typeof VITALICA_TIENDAS === 'undefined') return;

  cont.innerHTML = VITALICA_TIENDAS.map(function (t) {
    return '<div class="tienda-card">' +
             '<h3>' + t.nombre + '</h3>' +
             '<p class="tienda-card__ciudad">' + t.ciudad + '</p>' +
             '<p class="tienda-card__dir">' + t.direccion + '</p>' +
           '</div>';
  }).join('');
})();
