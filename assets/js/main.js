/* ==========================================================================
   VITALICA — main.js  ·  ARRANQUE COMÚN E INTERACCIONES
   --------------------------------------------------------------------------
   Se ejecuta en TODAS las páginas. Su trabajo:
     1) Insertar el chrome (barra de anuncios, header, footer, WhatsApp).
     2) Hacer rotar la barra de anuncios.
     3) Manejar el menú móvil (hamburguesa) y el mega-menú en celular.
     4) Mantener actualizado el contador del carrito.
     5) Marcar el link activo del menú según la página.
     6) Mostrar avisos (toasts) y manejar formularios de demostración.

   Cada página HTML debe tener:
     <div id="chrome-top"></div>   (arriba del <main>)
     <div id="chrome-bottom"></div>(abajo del <main>)
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- 1) Insertar el chrome ---------- */
  function montarChrome() {
    var top = document.getElementById('chrome-top');
    var bottom = document.getElementById('chrome-bottom');
    if (top) top.innerHTML = Vitalica.barraAnuncios() + Vitalica.header();
    if (bottom) bottom.innerHTML = Vitalica.footer();

    // Menú móvil y botón de WhatsApp se agregan al final del body
    document.body.insertAdjacentHTML('beforeend', construirMenuMovil());
    document.body.insertAdjacentHTML('beforeend', Vitalica.cartDrawer());
    document.body.insertAdjacentHTML('beforeend', Vitalica.buscador());
    document.body.insertAdjacentHTML('beforeend', Vitalica.botonWhatsapp());
  }

  // HTML del menú móvil (drawer lateral). En desktop queda oculto por CSS.
  function construirMenuMovil() {
    var marca = VITALICA_CONFIG.marca || {};
    var logo = marca.logoVitalica || 'assets/img/logo-vitalica.png';
    var nav = VITALICA_CONFIG.nav || [];
    var itemMega = nav.find(function (it) { return it.megamenu; }) || { label: 'Productos', href: 'productos.html' };
    var metas = VITALICA_METAS.map(function (m) {
      return '<a href="productos.html?meta=' + m.id + '">' + m.nombre + '</a>';
    }).join('');
    var otros = nav.filter(function (it) { return !it.megamenu; }).map(function (it) {
      return '<a href="' + it.href + '">' + it.label + '</a>';
    }).join('');

    return '' +
      '<div class="menu-movil" id="menu-movil" hidden>' +
        '<div class="menu-movil__overlay" data-cerrar-menu></div>' +
        '<div class="menu-movil__panel">' +
          '<div class="menu-movil__head">' +
            '<img src="' + logo + '" alt="Vitalica" width="110" height="52">' +
            '<button class="menu-movil__cerrar" aria-label="Cerrar menú" data-cerrar-menu>' + Vitalica.iconos.cerrar + '</button>' +
          '</div>' +
          '<nav class="menu-movil__nav" aria-label="Menú móvil">' +
            '<button class="menu-movil__acordeon" aria-expanded="false">' + itemMega.label + ' ' + Vitalica.iconos.chevron + '</button>' +
            '<div class="menu-movil__sub">' + metas + '</div>' +
            '<a href="' + itemMega.href + '" class="menu-movil__link-fuerte">Ver todos los productos</a>' +
            otros +
            '<a class="btn btn--primario btn--bloque" style="margin-top:1rem" href="' + Vitalica.linkWhatsapp() + '" target="_blank" rel="noopener">Escribinos por WhatsApp</a>' +
          '</nav>' +
        '</div>' +
      '</div>';
  }


  /* ---------- 2) Rotación de la barra de anuncios ---------- */
  function iniciarBarraAnuncios() {
    var items = document.querySelectorAll('.barra-anuncios__item');
    if (items.length < 2) return;
    // Respeta "reducir movimiento" del sistema operativo (accesibilidad).
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var i = 0;
    var timer = setInterval(function () {
      items[i].classList.remove('activo');
      i = (i + 1) % items.length;
      items[i].classList.add('activo');
    }, 3500);

    // Pausa al pasar el mouse (detalle de UX)
    var barra = document.querySelector('.barra-anuncios');
    if (barra) {
      barra.addEventListener('mouseenter', function () { clearInterval(timer); });
    }
  }


  /* ---------- 3) Menú móvil ---------- */
  function iniciarMenuMovil() {
    var menu = document.getElementById('menu-movil');
    var abrir = document.querySelector('.boton-menu');
    if (!menu || !abrir) return;

    function abrirMenu() {
      menu.hidden = false;
      // pequeño retardo para que la animación CSS se dispare
      requestAnimationFrame(function () { menu.classList.add('abierto'); });
      document.body.style.overflow = 'hidden';
      abrir.setAttribute('aria-expanded', 'true');
    }
    function cerrarMenu() {
      menu.classList.remove('abierto');
      document.body.style.overflow = '';
      abrir.setAttribute('aria-expanded', 'false');
      setTimeout(function () { menu.hidden = true; }, 250);
    }

    abrir.addEventListener('click', abrirMenu);
    menu.addEventListener('click', function (e) {
      if (e.target.closest('[data-cerrar-menu]')) cerrarMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) cerrarMenu();
    });

    // Acordeón "Catálogo" dentro del menú móvil
    var acordeon = menu.querySelector('.menu-movil__acordeon');
    var sub = menu.querySelector('.menu-movil__sub');
    if (acordeon && sub) {
      acordeon.addEventListener('click', function () {
        var abierto = sub.classList.toggle('abierto');
        acordeon.classList.toggle('abierto', abierto);
        acordeon.setAttribute('aria-expanded', abierto ? 'true' : 'false');
      });
    }
  }


  /* ---------- 4) Contador del carrito ---------- */
  function actualizarBadgeCarrito() {
    var total = Carrito.cantidadTotal();
    document.querySelectorAll('[data-carrito-badge]').forEach(function (badge) {
      badge.textContent = total;
      badge.hidden = total === 0;
    });
  }


  /* ---------- 5) Link activo del menú ---------- */
  function marcarLinkActivo() {
    var archivo = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-principal__link, .menu-movil__nav a').forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('#')[0].split('?')[0];
      if (href === archivo) a.classList.add('activo');
    });
  }


  /* ---------- 6) Toast (aviso flotante) ---------- */
  // Se expone en Vitalica para que otras páginas lo usen (ej: "agregado al carrito").
  Vitalica.toast = function (mensaje) {
    var t = document.createElement('div');
    t.className = 'toast';
    t.textContent = mensaje;
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('visible'); });
    setTimeout(function () {
      t.classList.remove('visible');
      setTimeout(function () { t.remove(); }, 300);
    }, 2600);
  };

  // Formularios de demostración (newsletter, contacto): no envían nada real.
  function iniciarFormulariosDemo() {
    document.querySelectorAll('[data-form-demo]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var msg = form.getAttribute('data-form-demo') || '¡Listo! (demostración)';
        form.reset();
        Vitalica.toast(msg);
      });
    });
  }


  /* ---------- 7) Carrito drawer (panel lateral, estilo BPN) ---------- */
  function fmtMonto(v) { return v == null ? 'A confirmar' : Vitalica.formatearGs(v); }

  // Arma el contenido del drawer (items + upsell + resumen)
  function drawerCuerpoHTML() {
    var items = Carrito.itemsDetallados();

    if (items.length === 0) {
      return '<div class="drawer__vacio">' +
               '<p class="texto-apagado">Tu carrito está vacío.</p>' +
               '<a class="btn btn--primario btn--bloque" href="productos.html" data-cerrar-drawer>Ver productos</a>' +
             '</div>';
    }

    var filas = items.map(function (it) {
      var p = it.producto;
      return '<div class="drawer-item" data-id="' + p.id + '">' +
        '<a class="drawer-item__media" href="producto.html?id=' + p.id + '"><img src="' + p.imagen + '" alt="' + p.nombre + '"></a>' +
        '<div class="drawer-item__info">' +
          '<a class="drawer-item__nombre" href="producto.html?id=' + p.id + '">' + p.nombre + '</a>' +
          '<span class="drawer-item__precio">' + Vitalica.formatearGs(p.precio) + '</span>' +
          '<div class="selector-cantidad selector-cantidad--sm">' +
            '<button type="button" data-menos aria-label="Restar">−</button>' +
            '<input type="text" value="' + it.cantidad + '" readonly aria-label="Cantidad">' +
            '<button type="button" data-mas aria-label="Sumar">+</button>' +
          '</div>' +
        '</div>' +
        '<button class="drawer-item__quitar" data-quitar aria-label="Quitar ' + p.nombre + '">' + Vitalica.iconos.cerrar + '</button>' +
      '</div>';
    }).join('');

    // Upsell: productos que "van juntos" (mismo combo) con lo que hay en el carrito,
    // que todavía no estén agregados.
    var enCarrito = {};
    Carrito.obtener().forEach(function (i) { enCarrito[i.id] = 1; });
    var idsSugeridos = {};
    Carrito.obtener().forEach(function (i) {
      (Datos.relacionados(i.id) || []).forEach(function (p) {
        if (!enCarrito[p.id]) idsSugeridos[p.id] = 1;
      });
    });
    var sugeridos = Object.keys(idsSugeridos).map(function (id) { return Datos.producto(id); }).filter(Boolean).slice(0, 3);
    // Respaldo: si no hubo coincidencias de combo, sugerimos cualquier otro
    if (!sugeridos.length) {
      sugeridos = VITALICA_PRODUCTOS.filter(function (p) { return !enCarrito[p.id]; }).slice(0, 3);
    }
    var upsell = '';
    if (sugeridos.length) {
      upsell = '<div class="drawer-upsell"><h3>Sumá a tu pedido</h3>' +
        sugeridos.map(function (p) {
          return '<div class="upsell-item">' +
            '<img src="' + p.imagen + '" alt="' + p.nombre + '">' +
            '<span class="upsell-item__nombre">' + p.nombre + '</span>' +
            '<button class="upsell-item__add" type="button" data-agregar-upsell="' + p.id + '">+ Agregar</button>' +
          '</div>';
        }).join('') +
      '</div>';
    }

    var sub = Carrito.subtotal();
    var footer = '<div class="drawer__footer">' +
      '<div class="resumen-linea"><span>Subtotal</span><span>' + fmtMonto(sub) + '</span></div>' +
      '<p class="drawer__nota">Envío e impuestos se calculan en el checkout.</p>' +
      '<a class="btn btn--primario btn--bloque btn--grande" href="checkout.html">Finalizar compra</a>' +
      '<a class="btn btn--contorno btn--bloque" href="carrito.html">Ver carrito</a>' +
    '</div>';

    return '<div class="drawer__items">' + filas + '</div>' + upsell + footer;
  }

  function renderDrawer() {
    var cuerpo = document.querySelector('[data-drawer-cuerpo]');
    if (cuerpo) cuerpo.innerHTML = drawerCuerpoHTML();
  }

  function abrirCarrito() {
    var drawer = document.getElementById('drawer-carrito');
    if (!drawer) return;
    renderDrawer();
    drawer.hidden = false;
    requestAnimationFrame(function () { drawer.classList.add('abierto'); });
    document.body.style.overflow = 'hidden';
  }
  function cerrarCarrito() {
    var drawer = document.getElementById('drawer-carrito');
    if (!drawer) return;
    drawer.classList.remove('abierto');
    document.body.style.overflow = '';
    setTimeout(function () { drawer.hidden = true; }, 250);
  }
  // Exponemos abrir para que otras páginas (producto) abran el drawer al agregar
  Vitalica.abrirCarrito = abrirCarrito;

  function iniciarDrawer() {
    var drawer = document.getElementById('drawer-carrito');
    if (!drawer) return;

    // El ícono del carrito del header abre el drawer
    document.querySelectorAll('[data-abrir-carrito]').forEach(function (b) {
      b.addEventListener('click', abrirCarrito);
    });

    // Delegación de clics dentro del drawer
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('[data-cerrar-drawer]')) { cerrarCarrito(); return; }

      var addUp = e.target.closest('[data-agregar-upsell]');
      if (addUp) { Carrito.agregar(addUp.getAttribute('data-agregar-upsell'), 1); return; }

      var row = e.target.closest('.drawer-item');
      if (row) {
        var id = row.dataset.id;
        var item = Carrito.obtener().find(function (i) { return i.id === id; });
        var c = item ? item.cantidad : 1;
        if (e.target.closest('[data-mas]')) Carrito.actualizarCantidad(id, c + 1);
        else if (e.target.closest('[data-menos]')) Carrito.actualizarCantidad(id, c - 1);
        else if (e.target.closest('[data-quitar]')) Carrito.quitar(id);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !drawer.hidden) cerrarCarrito();
    });
  }


  /* ---------- Arranque ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    montarChrome();
    iniciarBarraAnuncios();
    iniciarMenuMovil();
    iniciarDrawer();
    actualizarBadgeCarrito();
    marcarLinkActivo();
    iniciarFormulariosDemo();
  });

  // El carrito avisa cuando cambia → actualizamos contador y drawer en vivo.
  window.addEventListener('carrito:cambio', function () {
    actualizarBadgeCarrito();
    renderDrawer();
  });


  /* ---------- 8) Buscador en vivo (overlay de la lupa) ----------
     Filtra los productos de data.js al escribir: nombre, categoría, tags y
     resumen, ignorando mayúsculas y acentes ("creatina" encuentra "Creatine"). */
  function normalizar(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function abrirBusqueda() {
    var b = document.querySelector('[data-buscador]');
    if (!b) return;
    b.hidden = false;
    requestAnimationFrame(function () { b.classList.add('abierto'); });
    var inp = b.querySelector('[data-buscador-input]');
    if (inp) { inp.value = ''; inp.focus(); }
    renderResultadosBusqueda('');
  }

  function cerrarBusqueda() {
    var b = document.querySelector('[data-buscador]');
    if (!b || b.hidden) return;
    b.classList.remove('abierto');
    b.hidden = true;
  }

  function renderResultadosBusqueda(q) {
    var cont = document.querySelector('[data-buscador-resultados]');
    if (!cont) return;
    var nq = normalizar(q).trim();

    if (!nq) {
      cont.innerHTML = '<p class="buscador__ayuda">Escribí para buscar entre nuestros ' +
        VITALICA_PRODUCTOS.length + ' productos.</p>';
      return;
    }

    var lista = VITALICA_PRODUCTOS.filter(function (p) {
      var cat = Datos.categoria(p.categoria);
      var texto = normalizar(p.nombre + ' ' + (cat ? cat.nombre : '') + ' ' +
        (p.tags || []).join(' ') + ' ' + (p.resumen || ''));
      return texto.indexOf(nq) !== -1;
    }).slice(0, 6);

    if (!lista.length) {
      cont.innerHTML = '<p class="buscador__ayuda">Sin resultados para &ldquo;' + q +
        '&rdquo;. <a href="productos.html">Ver todos los productos</a></p>';
      return;
    }

    cont.innerHTML = lista.map(function (p) {
      return '<a class="buscador__item" href="producto.html?id=' + p.id + '">' +
               '<img src="' + p.imagen + '" alt="">' +
               '<span class="buscador__item-info">' +
                 '<span class="buscador__item-nombre">' + p.nombre + '</span>' +
                 '<span class="buscador__item-precio">' + Vitalica.formatearGs(p.precio) + '</span>' +
               '</span>' +
             '</a>';
    }).join('') +
    '<a class="buscador__todos" href="productos.html">Ver todos los productos &rarr;</a>';
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-abrir-busqueda]')) abrirBusqueda();
    else if (e.target.closest('[data-cerrar-busqueda]')) cerrarBusqueda();
  });
  document.addEventListener('input', function (e) {
    if (e.target.matches && e.target.matches('[data-buscador-input]')) {
      renderResultadosBusqueda(e.target.value);
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrarBusqueda();
    // Enter en el buscador = ir al primer resultado
    if (e.key === 'Enter' && e.target.matches && e.target.matches('[data-buscador-input]')) {
      var primero = document.querySelector('[data-buscador-resultados] .buscador__item');
      if (primero) window.location.href = primero.getAttribute('href');
    }
  });

})();
