/* ==========================================================================
   VITALICA — cart.js  ·  CARRITO DE COMPRAS
   --------------------------------------------------------------------------
   Maneja el carrito usando "localStorage", que es una memoria del navegador:
   los productos quedan guardados aunque recargues la página o navegues a otra.

   Guardamos solo lo mínimo por producto: { id, cantidad }. Los datos del
   producto (nombre, precio, foto) se obtienen de data.js cuando hacen falta.

   Cada vez que el carrito cambia, dispara un evento 'carrito:cambio'. Otras
   partes del sitio (como el contador del header) escuchan ese evento y se
   actualizan solas.

   NOTA (para IT): en producción el carrito vive en el servidor / sesión del
   usuario, no en localStorage. Esto es una simulación de front-end.
   ========================================================================== */

const Carrito = {
  CLAVE: 'vitalica_carrito',

  /* Lee el carrito guardado. Devuelve un array de { id, cantidad }. */
  obtener: function () {
    try {
      return JSON.parse(localStorage.getItem(this.CLAVE)) || [];
    } catch (e) {
      return []; // si el dato está corrupto, empezamos de cero
    }
  },

  /* Guarda el array y avisa al resto del sitio que algo cambió. */
  _guardar: function (items) {
    localStorage.setItem(this.CLAVE, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('carrito:cambio'));
  },

  /* Agrega un producto (o suma cantidad si ya estaba). */
  agregar: function (id, cantidad) {
    cantidad = cantidad || 1;
    var items = this.obtener();
    var existente = items.find(function (i) { return i.id === id; });
    if (existente) {
      existente.cantidad += cantidad;
    } else {
      items.push({ id: id, cantidad: cantidad });
    }
    this._guardar(items);
  },

  /* Cambia la cantidad exacta de un producto. Si llega a 0, lo quita. */
  actualizarCantidad: function (id, cantidad) {
    var items = this.obtener();
    var item = items.find(function (i) { return i.id === id; });
    if (!item) return;
    item.cantidad = cantidad;
    if (item.cantidad <= 0) {
      items = items.filter(function (i) { return i.id !== id; });
    }
    this._guardar(items);
  },

  /* Quita un producto del carrito. */
  quitar: function (id) {
    var items = this.obtener().filter(function (i) { return i.id !== id; });
    this._guardar(items);
  },

  /* Vacía el carrito por completo. */
  vaciar: function () {
    this._guardar([]);
  },

  /* Suma total de unidades (para el badge del header). */
  cantidadTotal: function () {
    return this.obtener().reduce(function (suma, i) { return suma + i.cantidad; }, 0);
  },

  /* Devuelve los items "enriquecidos" con los datos del producto (nombre,
     precio, foto, etc.), listos para mostrar en el carrito y el checkout. */
  itemsDetallados: function () {
    return this.obtener().map(function (i) {
      var producto = Datos.producto(i.id);
      return {
        id: i.id,
        cantidad: i.cantidad,
        producto: producto,
        // subtotal de la línea (null si el precio aún es placeholder)
        subtotalLinea: (producto && producto.precio != null)
          ? producto.precio * i.cantidad
          : null
      };
    }).filter(function (x) { return x.producto; }); // descarta ids inválidos
  },

  /* Subtotal de productos. Devuelve null si ALGÚN precio es placeholder
     (no se puede calcular un total real todavía). */
  subtotal: function () {
    var items = this.itemsDetallados();
    if (items.length === 0) return 0;
    var hayPlaceholder = items.some(function (x) { return x.subtotalLinea == null; });
    if (hayPlaceholder) return null;
    return items.reduce(function (suma, x) { return suma + x.subtotalLinea; }, 0);
  }
};
