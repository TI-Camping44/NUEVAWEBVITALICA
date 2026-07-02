/* ==========================================================================
   VITALICA — pages/checkout.js  ·  CHECKOUT (compra como invitado)
   --------------------------------------------------------------------------
   Flujo completo SIN cobro real (es una maqueta):
     1) Datos de contacto
     2) Envío: Gran Asunción vs Interior (costos distintos, actualizan el total)
     3) Pago simulado
     → Al confirmar: genera un nº de pedido, vacía el carrito y muestra la
       pantalla de "pedido confirmado".
   NOTA (IT): en producción, acá va la integración con la pasarela (Bancard),
   la creación real del pedido y el cálculo de envío. Esto es una simulación.
   ========================================================================== */
(function () {
  var cont = document.querySelector('[data-checkout]');
  if (!cont) return;

  // Tomamos una "foto" de los items al entrar al checkout
  var items = Carrito.itemsDetallados();

  // --- Carrito vacío: no se puede finalizar ---
  if (items.length === 0) {
    cont.innerHTML =
      '<div class="carrito-vacio">' +
        '<h2>Tu carrito está vacío</h2>' +
        '<p class="texto-apagado">Agregá productos antes de finalizar la compra.</p>' +
        '<a class="btn btn--primario btn--grande" href="productos.html">Ver productos</a>' +
      '</div>';
    return;
  }

  function fmt(v) { return v == null ? 'A confirmar' : Vitalica.formatearGs(v); }
  var envios = VITALICA_CONFIG.envio;
  var checkIcon = '<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7"/></svg>';

  // ---- Helpers de render ----
  function campo(label, name, tipo, req) {
    return '<div class="campo">' +
      '<label for="c-' + name + '">' + label + (req ? '' : ' <span class="texto-apagado">(opcional)</span>') + '</label>' +
      '<input id="c-' + name + '" name="' + name + '" type="' + tipo + '"' + (req ? ' required' : '') + '>' +
    '</div>';
  }
  function opcionEnvio(val, titulo, desc, costo, checked) {
    return '<label class="opcion">' +
      '<input type="radio" name="envio" value="' + val + '"' + (checked ? ' checked' : '') + '>' +
      '<span class="opcion__texto"><strong>' + titulo + '</strong><span class="opcion__desc">' + desc + '</span></span>' +
      '<span class="opcion__precio">' + Vitalica.formatearGs(costo) + '</span>' +
    '</label>';
  }
  function opcionPago(val, titulo, checked) {
    return '<label class="opcion">' +
      '<input type="radio" name="pago" value="' + val + '"' + (checked ? ' checked' : '') + '>' +
      '<span class="opcion__texto"><strong>' + titulo + '</strong></span>' +
    '</label>';
  }
  function resumen(envioCosto) {
    var lineas = items.map(function (it) {
      return '<div class="resumen-linea"><span>' + it.cantidad + '× ' + it.producto.nombre + '</span><span>' + fmt(it.subtotalLinea) + '</span></div>';
    }).join('');
    var sub = Carrito.subtotal();
    // Total = subtotal + envío. Si algún precio está "a confirmar" (null), el total también.
    var total = (sub == null) ? null : sub + envioCosto;
    return lineas +
      '<div class="resumen-linea resumen-linea--sep"><span>Subtotal</span><span>' + fmt(sub) + '</span></div>' +
      '<div class="resumen-linea"><span>Envío</span><span>' + Vitalica.formatearGs(envioCosto) + '</span></div>' +
      '<div class="resumen-total"><span>Total</span><span>' + fmt(total) + '</span></div>';
  }

  // ---- Render del formulario + resumen ----
  cont.innerHTML =
    '<form class="checkout" id="form-checkout" novalidate>' +
      '<div class="checkout__form">' +

        '<div class="form-bloque">' +
          '<h2>1 · Tus datos</h2>' +
          '<p class="form-bloque__nota">Comprá como invitado, sin necesidad de crear una cuenta.</p>' +
          '<div class="campos-grid">' +
            campo('Nombre', 'nombre', 'text', true) +
            campo('Apellido', 'apellido', 'text', true) +
            campo('Email', 'email', 'email', true) +
            campo('Teléfono (WhatsApp)', 'telefono', 'tel', true) +
          '</div>' +
        '</div>' +

        '<div class="form-bloque">' +
          '<h2>2 · Envío</h2>' +
          '<div class="opciones">' +
            opcionEnvio('gran-asuncion', 'Gran Asunción', 'Asunción y alrededores', envios.granAsuncion, true) +
            opcionEnvio('interior', 'Interior del país', 'Envío al interior del Paraguay', envios.interior, false) +
          '</div>' +
          '<div class="campos-grid" style="margin-top:var(--space-4)">' +
            campo('Ciudad / Localidad', 'ciudad', 'text', true) +
            campo('Dirección', 'direccion', 'text', true) +
          '</div>' +
          campo('Referencia para la entrega', 'referencia', 'text', false) +
        '</div>' +

        '<div class="form-bloque">' +
          '<h2>3 · Pago</h2>' +
          '<div class="opciones">' +
            opcionPago('transferencia', 'Transferencia bancaria', true) +
            opcionPago('tarjeta', 'Tarjeta de crédito/débito (Bancard)', false) +
            opcionPago('efectivo', 'Efectivo contra entrega', false) +
          '</div>' +
          '<p class="form-bloque__nota">🔒 Pago simulado — esta es una maqueta, no se cobra nada.</p>' +
        '</div>' +

        '<button type="submit" class="btn btn--primario btn--grande btn--bloque">Confirmar pedido</button>' +
      '</div>' +

      '<aside class="carrito__resumen">' +
        '<h2>Tu pedido</h2>' +
        '<div data-resumen>' + resumen(envios.granAsuncion) + '</div>' +
        '<p class="carrito__nota">Maqueta de demostración: no se realiza ningún cobro real.</p>' +
      '</aside>' +
    '</form>';

  var form = document.getElementById('form-checkout');

  // ---- Cambiar envío actualiza el resumen ----
  form.querySelectorAll('input[name="envio"]').forEach(function (r) {
    r.addEventListener('change', function () {
      var costo = (r.value === 'interior') ? envios.interior : envios.granAsuncion;
      form.querySelector('[data-resumen]').innerHTML = resumen(costo);
    });
  });

  // ---- Confirmar pedido ----
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    var nombre = (form.querySelector('[name="nombre"]').value || 'cliente').trim();
    var envioSel = form.querySelector('input[name="envio"]:checked');
    var costoEnvio = (envioSel && envioSel.value === 'interior') ? envios.interior : envios.granAsuncion;

    var orden = 'VIT-' + Math.floor(1000 + Math.random() * 9000);
    var sub = Carrito.subtotal();
    var lineas = items.map(function (it) {
      return '<div class="resumen-linea"><span>' + it.cantidad + '× ' + it.producto.nombre + '</span><span>' + fmt(it.subtotalLinea) + '</span></div>';
    }).join('');

    // Vaciar carrito (el badge del header se actualiza solo por el evento)
    Carrito.vaciar();

    cont.innerHTML =
      '<div class="confirmacion">' +
        '<div class="confirmacion__icono">' + checkIcon + '</div>' +
        '<h1>¡Pedido confirmado!</h1>' +
        '<p>Gracias, ' + nombre + '. Tu pedido <strong>' + orden + '</strong> fue recibido.</p>' +
        '<p class="texto-apagado">Te vamos a contactar por WhatsApp para confirmar el pago y coordinar la entrega.</p>' +
        '<div class="confirmacion__resumen">' +
          lineas +
          '<div class="resumen-linea resumen-linea--sep"><span>Subtotal</span><span>' + fmt(sub) + '</span></div>' +
          '<div class="resumen-linea"><span>Envío</span><span>' + Vitalica.formatearGs(costoEnvio) + '</span></div>' +
          '<div class="resumen-total"><span>Total</span><span>' + fmt(sub == null ? null : sub + costoEnvio) + '</span></div>' +
        '</div>' +
        '<div class="confirmacion__acciones">' +
          '<a class="btn btn--primario btn--grande" href="index.html">Volver al inicio</a>' +
          '<a class="btn btn--contorno btn--grande" href="productos.html">Seguir comprando</a>' +
        '</div>' +
        '<p class="texto-apagado" style="font-size:var(--fs-xs)">Maqueta de demostración: no se realizó ningún cobro real.</p>' +
      '</div>';

    window.scrollTo({ top: 0, behavior: 'instant' });
  });

})();
