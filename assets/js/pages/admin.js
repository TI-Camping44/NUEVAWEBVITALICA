/* ==========================================================================
   VITALICA — pages/admin.js  ·  PANEL DE ADMINISTRADOR (mini-CMS, demo)
   --------------------------------------------------------------------------
   Permite cambiar imágenes, enlaces y textos de toda la maqueta. Cómo funciona:
   • Los cambios se guardan en localStorage['vitalica_overrides'].
   • data.js, al cargar, aplica esos overrides sobre los valores por defecto,
     así TODAS las páginas reflejan los cambios (en este navegador).
   • Exportar/Importar mueven esa configuración como archivo JSON.

   ⚠️ Es una MAQUETA sin backend: la clave es demostrativa y los cambios viven
   en este navegador / en el JSON exportado. La persistencia real para todos
   los visitantes la construye IT con un CMS/backend (ver HANDOFF-IT).
   ========================================================================== */
(function () {
  'use strict';

  var CLAVE_DEMO = 'vitalica2026';
  var app = document.querySelector('[data-admin-app]');
  if (!app) return;

  /* ---------- Utilidades ---------- */
  function v(x) { return x == null ? '' : String(x); }
  function escAttr(s) {
    return v(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function escTxt(s) {
    return v(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  // Crea/recorre rutas tipo "config.hero.0.cta1.texto" dentro de un objeto.
  function setPath(root, path, value) {
    var parts = path.split('.');
    var cur = root;
    for (var i = 0; i < parts.length - 1; i++) {
      var key = parts[i];
      var nextIsIndex = /^\d+$/.test(parts[i + 1]);
      if (cur[key] == null) cur[key] = nextIsIndex ? [] : {};
      cur = cur[key];
    }
    cur[parts[parts.length - 1]] = value;
  }
  function toast(msg) {
    var t = document.createElement('div');
    t.className = 'toast'; t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('visible'); });
    setTimeout(function () { t.classList.remove('visible'); setTimeout(function () { t.remove(); }, 300); }, 2800);
  }

  /* ---------- Builders de campos ---------- */
  function fTexto(label, path, val, hint) {
    return '<label class="admin-campo"><span class="admin-campo__label">' + label + '</span>' +
      '<input type="text" data-ov="' + path + '" value="' + escAttr(val) + '">' +
      (hint ? '<span class="admin-hint">' + hint + '</span>' : '') + '</label>';
  }
  // Muestra un monto en guaraníes (375000 -> "375.000"); vacío si no hay valor.
  function gsMostrar(val) {
    var d = v(val).replace(/[^\d]/g, '');
    return d === '' ? '' : Number(d).toLocaleString('es-PY');
  }
  // Campo de monto en GUARANÍES. Usa type="text" (no "number") para aceptar "375.000"
  // o "375000" sin que el "." se tome como decimal, y para que la rueda del mouse no
  // cambie el valor. Al guardar nos quedamos solo con los dígitos (ver recolectar()).
  function fNum(label, path, val, hint) {
    return '<label class="admin-campo"><span class="admin-campo__label">' + label + '</span>' +
      '<input type="text" inputmode="numeric" data-ov="' + path + '" data-num="gs" value="' + escAttr(gsMostrar(val)) + '">' +
      (hint ? '<span class="admin-hint">' + hint + '</span>' : '') + '</label>';
  }
  function fArea(label, path, val, hint, list) {
    return '<label class="admin-campo"><span class="admin-campo__label">' + label + '</span>' +
      '<textarea data-ov="' + path + '"' + (list ? ' data-list="lines"' : '') + ' rows="3">' + escTxt(val) + '</textarea>' +
      (hint ? '<span class="admin-hint">' + hint + '</span>' : '') + '</label>';
  }
  function fEnlace(label, pathT, pathH, t, h) {
    return '<div class="admin-enlace"><span class="admin-campo__label">' + label + '</span>' +
      '<div class="admin-enlace__row">' +
        '<input type="text" data-ov="' + pathT + '" value="' + escAttr(t) + '" placeholder="Texto (lo que dice)">' +
        '<input type="text" data-ov="' + pathH + '" value="' + escAttr(h) + '" placeholder="Destino (página o URL)">' +
      '</div>' +
      '<span class="admin-hint">Texto = lo que se ve · Destino = página interna (ej. <code>productos.html</code>) o URL externa (https://…)</span>' +
    '</div>';
  }
  function fImg(label, path, val, hint) {
    var id = 'im_' + path.replace(/[^a-z0-9]/gi, '_');
    return '<div class="admin-campo admin-img"><span class="admin-campo__label">' + label + '</span>' +
      '<div class="admin-img__row">' +
        '<img class="admin-img__preview" src="' + escAttr(val) + '" alt="" data-prev="' + id + '">' +
        '<div class="admin-img__ctrl">' +
          '<input type="file" accept="image/*" class="admin-file" data-file="' + id + '">' +
          '<span class="admin-hint">' + hint + '</span>' +
        '</div>' +
      '</div>' +
      '<input type="hidden" id="' + id + '" data-ov="' + path + '" value="' + escAttr(val) + '">' +
    '</div>';
  }
  function seccion(titulo, contenido, abierta) {
    return '<details class="admin-sec"' + (abierta ? ' open' : '') + '>' +
      '<summary>' + titulo + '</summary><div class="admin-sec__body">' + contenido + '</div></details>';
  }
  function filaTienda(t) {
    t = t || {};
    return '<div class="admin-tienda">' +
      '<input type="text" class="t-nombre" value="' + escAttr(t.nombre) + '" placeholder="Nombre del local">' +
      '<input type="text" class="t-ciudad" value="' + escAttr(t.ciudad) + '" placeholder="Ciudad">' +
      '<input type="text" class="t-direccion" value="' + escAttr(t.direccion) + '" placeholder="Dirección / referencia">' +
      '<button type="button" class="admin-tienda__del" data-del-tienda aria-label="Quitar tienda">✕</button>' +
    '</div>';
  }

  /* ---------- Render del panel ---------- */
  function renderPanel() {
    var C = VITALICA_CONFIG, marca = C.marca || {}, wa = C.whatsapp || {}, redes = C.redes || {}, envio = C.envio || {};

    var secciones = '';

    // Marca / logos
    secciones += seccion('🖼️ Marca / Logos',
      fImg('Logo Vitalica', 'config.marca.logoVitalica', marca.logoVitalica, 'PNG con fondo transparente · ~600×160 px') +
      fImg('Logo Olimp (va en el footer oscuro)', 'config.marca.logoOlimp', marca.logoOlimp, 'PNG blanco con fondo transparente · ~400×120 px'),
      true);

    // Menú
    var navHTML = (C.nav || []).map(function (it, i) {
      return '<div class="admin-grupo">' +
        fEnlace('Ítem ' + (i + 1), 'config.nav.' + i + '.label', 'config.nav.' + i + '.href', it.label, it.href) +
        (it.megamenu ? '<input type="hidden" data-ov="config.nav.' + i + '.megamenu" value="true">' : '') +
      '</div>';
    }).join('');
    secciones += seccion('🧭 Menú (navegación)', navHTML);

    // Hero
    var heroHTML = (typeof VITALICA_HERO !== 'undefined' ? VITALICA_HERO : []).map(function (s, i) {
      var esBanner = (s.modo === 'banner');
      return '<div class="admin-grupo"><h3 class="admin-grupo__t">Slide ' + (i + 1) + '</h3>' +
        fTexto('Eyebrow (texto chico de arriba)', 'hero.' + i + '.eyebrow', s.eyebrow) +
        fArea('Título (podés usar &lt;br&gt; para cortar la línea)', 'hero.' + i + '.titulo', s.titulo) +
        fArea('Texto', 'hero.' + i + '.texto', s.texto) +
        '<label class="admin-campo"><span class="admin-campo__label">Modo de la imagen</span>' +
          '<select data-ov="hero.' + i + '.modo">' +
            '<option value="producto"' + (esBanner ? '' : ' selected') + '>Producto flotante (foto del envase sobre el fondo azul)</option>' +
            '<option value="banner"' + (esBanner ? ' selected' : '') + '>Banner completo (la imagen cubre todo el rectángulo)</option>' +
          '</select>' +
          '<span class="admin-hint">«Banner completo» hace que la imagen llene todo el slide (se recorta para cubrir, sin deformarse).</span>' +
        '</label>' +
        fImg('Imagen del slide', 'hero.' + i + '.imagen', s.imagen,
          'Producto flotante: ~800×800 px, fondo transparente · Banner completo: ~1920×760 px, JPG/WebP &lt;500 KB') +
        fEnlace('Botón 1', 'hero.' + i + '.cta1.texto', 'hero.' + i + '.cta1.href', s.cta1 && s.cta1.texto, s.cta1 && s.cta1.href) +
        fEnlace('Botón 2', 'hero.' + i + '.cta2.texto', 'hero.' + i + '.cta2.href', s.cta2 && s.cta2.texto, s.cta2 && s.cta2.href) +
      '</div>';
    }).join('');
    secciones += seccion('🎞️ Hero (carrusel principal)', heroHTML);

    // Comunidad / Instagram (sección "Sumate a la comunidad" del home)
    var comu = C.comunidad || { handle: '@vitalica.py', posts: [] };
    var comuHTML = fTexto('Usuario que se muestra', 'config.comunidad.handle', comu.handle,
      'Ej: @vitalica.py — el botón y los posteos enlazan a la URL de Instagram cargada en «Redes sociales».');
    for (var ci = 0; ci < 6; ci++) {
      comuHTML += fImg('Post ' + (ci + 1), 'config.comunidad.posts.' + ci,
        (comu.posts && comu.posts[ci]) || '',
        'Cuadrada · 1080×1080 px (como un post de Instagram) · JPG/WebP &lt;300 KB');
    }
    secciones += seccion('📸 Comunidad / Instagram (home)', comuHTML);

    // Anuncios
    secciones += seccion('📢 Barra de anuncios',
      fArea('Mensajes (uno por línea)', 'config.anuncios', (C.anuncios || []).join('\n'),
        'Cada línea es un mensaje que rota en la barra de arriba.', true));

    // WhatsApp
    secciones += seccion('💬 WhatsApp',
      fTexto('Número (solo dígitos, formato internacional)', 'config.whatsapp.numero', wa.numero, 'Ej: 595976383922 (sin + ni espacios)') +
      fTexto('Número visible', 'config.whatsapp.numeroVisible', wa.numeroVisible) +
      fArea('Mensaje pre-cargado', 'config.whatsapp.mensaje', wa.mensaje));

    // Redes
    secciones += seccion('🔗 Redes sociales',
      fTexto('Instagram (URL)', 'config.redes.instagram', redes.instagram, 'URL completa de tu perfil') +
      fTexto('TikTok (URL)', 'config.redes.tiktok', redes.tiktok) +
      fTexto('Facebook (URL)', 'config.redes.facebook', redes.facebook));

    // Envíos
    secciones += seccion('🚚 Costos de envío (Gs.)',
      fNum('Gran Asunción', 'config.envio.granAsuncion', envio.granAsuncion, 'Monto en guaraníes (ej. 25000).') +
      fNum('Interior', 'config.envio.interior', envio.interior, 'Monto en guaraníes (ej. 40000).'));

    // Productos
    var prodHTML = VITALICA_PRODUCTOS.map(function (p) {
      return '<div class="admin-grupo"><h3 class="admin-grupo__t">' + escTxt(p.nombre) + '</h3>' +
        fTexto('Nombre', 'productos.' + p.id + '.nombre', p.nombre) +
        fNum('Precio (Gs.) — vacío = "a confirmar"', 'productos.' + p.id + '.precio', p.precio, 'Escribí solo el monto: 375000 o 375.000.') +
        fArea('Resumen (frase corta de la tarjeta)', 'productos.' + p.id + '.resumen', p.resumen) +
        fImg('Foto', 'productos.' + p.id + '.imagen', p.imagen, 'Cuadrada 1000×1000 px · fondo blanco o transparente · .webp/.png · &lt;300 KB') +
      '</div>';
    }).join('');
    secciones += seccion('📦 Productos (' + VITALICA_PRODUCTOS.length + ')', prodHTML);

    // Tiendas
    var tiendasHTML = '<div data-tiendas>' +
      (typeof VITALICA_TIENDAS !== 'undefined' ? VITALICA_TIENDAS : []).map(filaTienda).join('') +
      '</div>' +
      '<button type="button" class="btn btn--contorno" data-add-tienda>+ Agregar tienda</button>';
    secciones += seccion('📍 Tiendas (dónde comprar)', tiendasHTML);

    app.innerHTML =
      '<header class="admin-top">' +
        '<div class="admin-top__brand"><strong>Panel de administrador</strong> · Vitalica <span class="admin-demo">DEMO</span></div>' +
        '<div class="admin-acciones">' +
          '<a class="btn btn--contorno" href="index.html" target="_blank" rel="noopener">Ver el sitio ↗</a>' +
          '<button class="btn btn--contorno" type="button" data-exportar>Exportar</button>' +
          '<label class="btn btn--contorno admin-import">Importar<input type="file" accept="application/json,.json" data-importar hidden></label>' +
          '<button class="btn btn--contorno" type="button" data-reset>Restablecer</button>' +
          '<button class="btn btn--primario" type="button" data-guardar>Guardar</button>' +
        '</div>' +
      '</header>' +
      '<div class="admin-aviso">' +
        '<strong>Maqueta sin backend.</strong> Los cambios se guardan en <strong>este navegador</strong> (vista previa) y se ven al recargar el sitio. ' +
        'Usá <strong>Exportar</strong> para guardar/compartir la configuración (JSON) e <strong>Importar</strong> para cargarla en otra compu. ' +
        'La clave es solo demostrativa. La persistencia real para todos los visitantes la construye IT con un CMS/backend.' +
      '</div>' +
      '<div class="admin-form">' + secciones + '</div>' +
      '<div class="admin-barra-guardar"><button class="btn btn--primario btn--grande" type="button" data-guardar>Guardar cambios</button></div>';

    wirePanel();
  }

  /* ---------- Recolectar valores del formulario → objeto overrides ---------- */
  function recolectar() {
    var ov = {};
    app.querySelectorAll('[data-ov]').forEach(function (el) {
      var path = el.getAttribute('data-ov');
      var val;
      if (el.getAttribute('data-num') === 'gs') {
        // Guaraníes: solo dígitos. "375.000", "Gs. 375.000" o "375000" → 375000. Vacío → "".
        var digitos = el.value.replace(/[^\d]/g, '');
        val = digitos === '' ? '' : Number(digitos);
      } else if (el.getAttribute('data-list') === 'lines') {
        val = el.value.split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
      } else {
        val = el.value;
      }
      setPath(ov, path, val);
    });
    // Tiendas (lista dinámica)
    var tiendas = [];
    app.querySelectorAll('.admin-tienda').forEach(function (row) {
      var n = row.querySelector('.t-nombre').value.trim();
      var c = row.querySelector('.t-ciudad').value.trim();
      var d = row.querySelector('.t-direccion').value.trim();
      if (n || c || d) tiendas.push({ nombre: n, ciudad: c, direccion: d });
    });
    ov.tiendas = tiendas;
    return ov;
  }

  function guardar(silencioso) {
    var ov = recolectar();
    localStorage.setItem('vitalica_overrides', JSON.stringify(ov));
    if (!silencioso) toast('✓ Cambios guardados. Abrí o recargá el sitio para verlos.');
    return ov;
  }

  function exportar() {
    var ov = guardar(true);
    var blob = new Blob([JSON.stringify(ov, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'vitalica-config.json';
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    toast('✓ Configuración exportada (vitalica-config.json)');
  }

  function importar(file) {
    var r = new FileReader();
    r.onload = function () {
      try {
        JSON.parse(r.result); // validar
        localStorage.setItem('vitalica_overrides', r.result);
        toast('✓ Configuración importada. Recargando…');
        setTimeout(function () { location.reload(); }, 900);
      } catch (e) { toast('✕ El archivo no es una configuración válida.'); }
    };
    r.readAsText(file);
  }

  function restablecer() {
    if (confirm('¿Volver a los valores originales? Se borran todos los cambios de este navegador.')) {
      localStorage.removeItem('vitalica_overrides');
      location.reload();
    }
  }

  /* ---------- Eventos del panel ---------- */
  function wirePanel() {
    // Subir imagen → base64 → preview + input oculto
    app.addEventListener('change', function (e) {
      var f = e.target.closest('.admin-file');
      if (f && f.files && f.files[0]) {
        var id = f.getAttribute('data-file');
        var reader = new FileReader();
        reader.onload = function () {
          var hidden = document.getElementById(id);
          if (hidden) hidden.value = reader.result;
          var prev = app.querySelector('[data-prev="' + id + '"]');
          if (prev) prev.src = reader.result;
        };
        reader.readAsDataURL(f.files[0]);
        return;
      }
      var imp = e.target.closest('[data-importar]');
      if (imp && imp.files && imp.files[0]) importar(imp.files[0]);
    });

    app.addEventListener('click', function (e) {
      if (e.target.closest('[data-guardar]')) guardar();
      else if (e.target.closest('[data-exportar]')) exportar();
      else if (e.target.closest('[data-reset]')) restablecer();
      else if (e.target.closest('[data-add-tienda]')) {
        var cont = app.querySelector('[data-tiendas]');
        cont.insertAdjacentHTML('beforeend', filaTienda({}));
      } else if (e.target.closest('[data-del-tienda]')) {
        var row = e.target.closest('.admin-tienda');
        if (row) row.remove();
      }
    });

    // Al salir de un campo de guaraníes, lo reformatea lindo (375000 → "375.000").
    app.addEventListener('focusout', function (e) {
      var g = e.target.closest('[data-num="gs"]');
      if (g) g.value = gsMostrar(g.value);
    });
  }

  /* ---------- Portada con clave (demo) ---------- */
  function renderLogin(error) {
    app.innerHTML =
      '<div class="admin-login">' +
        '<form class="admin-login__card" data-login>' +
          '<h1>Panel de administrador</h1>' +
          '<p class="texto-apagado">Ingresá la clave para administrar la maqueta.</p>' +
          '<input type="password" data-clave placeholder="Clave" autofocus>' +
          (error ? '<p class="admin-login__err">Clave incorrecta. Probá de nuevo.</p>' : '') +
          '<button class="btn btn--primario btn--bloque" type="submit">Entrar</button>' +
          '<p class="admin-login__nota">Demo: clave <code>vitalica2026</code>. En una maqueta sin backend la clave NO es seguridad real — IT la implementa en producción.</p>' +
        '</form>' +
      '</div>';
    app.querySelector('[data-login]').addEventListener('submit', function (e) {
      e.preventDefault();
      var val = app.querySelector('[data-clave]').value;
      if (val === CLAVE_DEMO) { sessionStorage.setItem('vitalica_admin', 'ok'); renderPanel(); }
      else { renderLogin(true); }
    });
  }

  /* ---------- Arranque ---------- */
  if (sessionStorage.getItem('vitalica_admin') === 'ok') renderPanel();
  else renderLogin(false);

})();
