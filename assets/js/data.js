/* ==========================================================================
   VITALICA — data.js  ·  FUENTE ÚNICA DE DATOS
   --------------------------------------------------------------------------
   Este es el archivo más importante para vos. Acá vive TODO el contenido
   editable de la maqueta: configuración del negocio, categorías, las 4 metas,
   los 10 productos (con su contenido de marketing), las tiendas donde se
   vende y las guías de uso.

   👉 Para cargar precios reales, cambiar textos, WhatsApp, tiendas, etc.,
      editás ACÁ y se actualiza en todo el sitio.

   NOTA (para IT): en producción esto vendría de una base de datos / API
   (catálogo, stock, precios). La forma de los objetos sirve de referencia
   del modelo de datos.
   ========================================================================== */


/* --------------------------------------------------------------------------
   1) CONFIGURACIÓN DEL NEGOCIO
   -------------------------------------------------------------------------- */
const VITALICA_CONFIG = {
  whatsapp: {
    numero: '595976383922',
    numeroVisible: '+595 976 383922',
    mensaje: 'Hola Vitalica, vengo de la página web. Me gustaría tener más información sobre los productos.'
  },

  // Redes sociales (URLs reales de Vitalica)
  redes: {
    instagram: 'https://www.instagram.com/vitalica.py/',
    tiktok: 'https://www.tiktok.com/@vitalica.py',
    facebook: 'https://www.facebook.com/vitalica.py'
  },

  // Costos de envío (Gs.) — PLACEHOLDER, ajustá a tus tarifas reales
  envio: {
    granAsuncion: 25000,
    interior: 40000
  },

  // Mensajes que rotan en la barra superior de anuncios
  anuncios: [
    'Productos 100% originales de Olimp Sport Nutrition',
    'Envíos a todo el Paraguay',
    'Asesoramiento personalizado por WhatsApp',
    'Compra 100% segura'
  ],

  // Datos para la prueba social del home (demo)
  prueba_social: { puntaje: 4.8, cantidad: 1240 },

  // Marca: logos (editables desde el panel de administrador)
  marca: {
    logoVitalica: 'assets/img/logo-vitalica.png',
    logoOlimp: 'assets/img/logo-olimp.png'
  },

  // Menú de navegación (editable desde el panel de administrador)
  nav: [
    { label: 'Productos',     href: 'productos.html', megamenu: true },
    { label: 'Guía de uso',   href: 'guia.html' },
    { label: 'Quiénes somos', href: 'sobre.html' },
    { label: 'Contacto',      href: 'contacto.html' }
  ],

  // Sección "Sumate a la comunidad" del home (estilo vitalica.com.py).
  // En la maqueta los posteos son imágenes simuladas que enlazan al perfil;
  // en producción se conectan al feed real de Instagram (ver HANDOFF-IT.md).
  comunidad: {
    handle: '@vitalica.py',
    posts: [
      'assets/img/products/whey-protein-complex.webp',
      'assets/img/products/redweiler.webp',
      'assets/img/products/creatine-monohydrate.webp',
      'assets/img/products/iso-plus-powder.webp',
      'assets/img/products/knockout-2.webp',
      'assets/img/products/beta-alanina-xplode.webp'
    ]
  }
};


/* --------------------------------------------------------------------------
   2) CATEGORÍAS DE OLIMP (tipo de producto). Se muestran como etiqueta en
   cada producto y se usan para mapear a las metas. NO son la navegación.
   -------------------------------------------------------------------------- */
const VITALICA_CATEGORIAS = [
  { id: 'construccion-muscular', nombre: 'Construcción Muscular' },
  { id: 'resistencia',           nombre: 'Resistencia' },
  { id: 'fuerza',                nombre: 'Fuerza' },
  { id: 'enfoque',               nombre: 'Enfoque' },
  { id: 'vitalidad',             nombre: 'Vitalidad' }
];


/* --------------------------------------------------------------------------
   3) METAS / OBJETIVOS (la navegación "¿Qué querés lograr?")
   Cada meta agrupa una o más categorías de Olimp.
   -------------------------------------------------------------------------- */
const VITALICA_METAS = [
  {
    id: 'deporte-resistencia',
    nombre: 'Deporte de resistencia',   // nombre corto (filtros, footer, breadcrumb)
    accion: 'Aumentar la Resistencia',  // etiqueta de acción (tarjetas del home)
    descripcion: 'Energía, hidratación y resistencia para entrenamientos largos.',
    categorias: ['resistencia']
  },
  {
    id: 'fuerza',
    nombre: 'Fuerza',
    accion: 'Incrementar la Fuerza',
    descripcion: 'Creatina y pre-entrenos para potencia y rendimiento.',
    categorias: ['fuerza', 'enfoque']
  },
  {
    id: 'recuperacion',
    nombre: 'Recuperación',
    accion: 'Recuperación más rápida',
    descripcion: 'Proteínas e hidratación para recuperarte mejor.',
    categorias: ['construccion-muscular', 'resistencia']
  },
  {
    id: 'salud',
    nombre: 'Salud',
    accion: 'Mejorar la Salud',
    descripcion: 'Vitaminas, omega 3 y soporte articular para tu día a día.',
    categorias: ['vitalidad']
  }
];


/* --------------------------------------------------------------------------
   4) SLIDES DEL HERO (carrusel del home).
   -------------------------------------------------------------------------- */
const VITALICA_HERO = [
  // "modo" controla cómo se usa la imagen del slide:
  //   'producto' → foto del envase flotando sobre el fondo azul (como ahora)
  //   'banner'   → la imagen cubre TODO el rectángulo (banner completo)
  {
    modo: 'producto',
    eyebrow: 'Sin Atajos',
    titulo: 'Resultados que se entrenan,<br>no se prometen.',
    texto: 'Suplementación deportiva de calidad europea. Representante exclusivo de Olimp Sport Nutrition en Paraguay.',
    imagen: 'assets/img/products/whey-protein-complex.webp',
    cta1: { texto: 'Ver productos', href: 'productos.html' },
    cta2: { texto: 'Conocé Olimp', href: 'sobre.html' }
  },
  {
    modo: 'producto',
    eyebrow: 'Performance de alto nivel',
    titulo: 'Más potencia<br>en cada serie.',
    texto: 'Creatina y pre-entrenos para entrenar al máximo. Energía, foco y fuerza cuando más lo necesitás.',
    imagen: 'assets/img/products/redweiler.webp',
    cta1: { texto: 'Ver productos', href: 'productos.html' },
    cta2: { texto: 'Guía de uso', href: 'guia.html' }
  },
  {
    modo: 'producto',
    eyebrow: 'Calidad europea',
    titulo: '35+ años de<br>ciencia deportiva.',
    texto: 'Olimp fabrica en Polonia con estándares europeos. Productos originales, con respaldo y resultados.',
    imagen: 'assets/img/products/creatine-monohydrate.webp',
    cta1: { texto: 'Conocé Olimp', href: 'sobre.html' },
    cta2: { texto: 'Ver productos', href: 'productos.html' }
  }
];


/* --------------------------------------------------------------------------
   5) PRODUCTOS (10 de Olimp)
   Campos de marketing (para la página de producto, estilo BPN):
     bandaBeneficio → titular corto de beneficio
     beneficios[]   → { icono, titulo, texto }  (3 por producto)
     ingredientes[] → { nombre, texto }
   -------------------------------------------------------------------------- */
const VITALICA_PRODUCTOS = [
  {
    id: 'whey-protein-complex',
    nombre: 'Whey Protein Complex 100%',
    categoria: 'construccion-muscular',
    categoriasExtra: [],
    precio: null,
    imagen: 'assets/img/products/whey-protein-complex.webp',
    rating: 4.8, reviews: 124, tags: ['Lanzamiento'], destacado: true,
    resumen: 'Proteína de suero premium (WPI + WPC), filtrada en frío (CFM) para absorción rápida y recuperación muscular óptima.',
    descripcion: 'Whey Protein Complex 100% combina aislado y concentrado de suero filtrados en frío mediante tecnología CFM, preservando las fracciones proteicas y reduciendo grasa y lactosa. Su perfil completo de aminoácidos y su rápida absorción la hacen ideal para después de entrenar, cuando el músculo más necesita reconstruirse.',
    modoDeUso: 'Mezclá 1 medida (~30 g) con 250–300 ml de agua o leche. 1 a 2 porciones por día, idealmente una después de entrenar.',
    bandaBeneficio: 'Proteína de suero premium · filtrada en frío (CFM) · recuperación rápida',
    beneficios: [
      { icono: 'pesa',   titulo: 'Recuperación muscular', texto: 'Aporta los aminoácidos que el músculo necesita para repararse después de entrenar.' },
      { icono: 'rayo',   titulo: 'Absorción rápida',      texto: 'El filtrado en frío CFM conserva las fracciones proteicas para una asimilación veloz.' },
      { icono: 'escudo', titulo: 'Más limpia',            texto: 'Más proteína por porción, con menos grasa y lactosa que un concentrado común.' }
    ],
    ingredientes: [
      { nombre: 'WPI + WPC',        texto: 'Mezcla de aislado y concentrado de suero para calidad y rendimiento.' },
      { nombre: 'Tecnología CFM',   texto: 'Filtrado en frío que preserva las proteínas y minimiza su desnaturalización.' }
    ]
  },
  {
    id: 'creatine-monohydrate',
    nombre: 'Creatine Monohydrate',
    categoria: 'fuerza',
    categoriasExtra: [],
    precio: null,
    imagen: 'assets/img/products/creatine-monohydrate.webp',
    rating: 4.9, reviews: 210, tags: [], destacado: true,
    resumen: 'Creatina monohidrato micronizada 200 Mesh: solubilidad inmediata y máxima absorción, sin molestias estomacales.',
    descripcion: 'El suplemento más estudiado del deporte, en su forma más pura. La micronización 200 Mesh mejora la solubilidad y la tolerancia digestiva. Tomada a diario, ayuda a aumentar la fuerza, la potencia y el rendimiento en entrenamientos de alta intensidad.',
    modoDeUso: '3 a 5 g por día, todos los días, con agua o tu bebida habitual. La clave es la constancia.',
    bandaBeneficio: 'Creatina micronizada 200 Mesh · el suplemento más estudiado del deporte',
    beneficios: [
      { icono: 'rayo',   titulo: 'Más fuerza y potencia', texto: 'Ayuda a producir energía en los esfuerzos cortos e intensos.' },
      { icono: 'pesa',   titulo: 'Mejor rendimiento',     texto: 'Apoya más repeticiones y series de alta intensidad.' },
      { icono: 'escudo', titulo: 'Máxima absorción',      texto: 'La micronización 200 Mesh mejora la solubilidad y la tolerancia digestiva.' }
    ],
    ingredientes: [
      { nombre: 'Creatina monohidrato', texto: 'La forma más pura y respaldada por la ciencia.' }
    ]
  },
  {
    id: 'redweiler',
    nombre: 'Redweiler',
    categoria: 'fuerza',
    categoriasExtra: ['enfoque'],
    precio: null,
    imagen: 'assets/img/products/redweiler.webp',
    rating: 4.7, reviews: 98, tags: ['Nuevo'], destacado: true,
    resumen: 'Pre-entreno de alta intensidad con beta-alanina, creatina y citrulina para potencia y bombeo muscular.',
    descripcion: 'Redweiler es un pre-entreno de fórmula completa pensado para sesiones exigentes: combina beta-alanina, creatina, citrulina y cafeína para más energía, foco y un bombeo muscular notable. Para quienes entrenan en serio y quieren dar un paso más.',
    modoDeUso: '1 medida en 200 ml de agua, 20–30 min antes de entrenar. No superar 1 porción por día y evitar cerca de dormir.',
    bandaBeneficio: 'Pre-entreno de alta intensidad · energía, foco y bombeo',
    beneficios: [
      { icono: 'rayo',  titulo: 'Energía explosiva', texto: 'Cafeína y activos para entrenar a la máxima intensidad.' },
      { icono: 'gota',  titulo: 'Bombeo muscular',   texto: 'Citrulina para más flujo sanguíneo y congestión.' },
      { icono: 'diana', titulo: 'Resistencia',       texto: 'Beta-alanina y creatina para sostener el esfuerzo.' }
    ],
    ingredientes: [
      { nombre: 'Beta-alanina', texto: 'Retrasa la aparición de la fatiga muscular.' },
      { nombre: 'Citrulina',    texto: 'Favorece el bombeo y el flujo sanguíneo.' },
      { nombre: 'Cafeína',      texto: 'Energía y foco para el entrenamiento.' }
    ]
  },
  {
    id: 'knockout-2',
    nombre: 'Knockout 2.0',
    categoria: 'enfoque',
    categoriasExtra: [],
    precio: null,
    imagen: 'assets/img/products/knockout-2.webp',
    rating: 4.6, reviews: 64, tags: [], destacado: true,
    resumen: 'Pre-entreno con cafeína y pimienta de cayena para foco mental agudo y termogénesis.',
    descripcion: 'Knockout 2.0 está formulado para el foco: cafeína y extracto de pimienta de cayena para energía mental sostenida y un efecto termogénico. Ideal para entrenamientos donde la concentración hace la diferencia.',
    modoDeUso: '1 medida en 200 ml de agua, 15–30 min antes de entrenar. Empezá con media porción para evaluar tolerancia.',
    bandaBeneficio: 'Pre-entreno con foco mental · cafeína + pimienta de cayena',
    beneficios: [
      { icono: 'cerebro', titulo: 'Foco mental',     texto: 'Concentración aguda para tus entrenamientos más exigentes.' },
      { icono: 'rayo',    titulo: 'Energía sostenida', texto: 'Cafeína para empuje sin caídas bruscas.' },
      { icono: 'hoja',    titulo: 'Termogénesis',     texto: 'Pimienta de cayena que suma efecto termogénico.' }
    ],
    ingredientes: [
      { nombre: 'Cafeína',            texto: 'Energía y concentración.' },
      { nombre: 'Pimienta de cayena', texto: 'Aporta efecto termogénico.' }
    ]
  },
  {
    id: 'beta-alanina-xplode',
    nombre: 'Beta Alanina Xplode',
    categoria: 'resistencia',
    categoriasExtra: [],
    precio: null,
    imagen: 'assets/img/products/beta-alanina-xplode.webp',
    rating: 4.5, reviews: 41, tags: [], destacado: false,
    resumen: 'L-histidina + Vitamina B6: eleva la carnosina muscular y retrasa la aparición de la fatiga.',
    descripcion: 'La beta-alanina aumenta los niveles de carnosina en el músculo, ayudando a amortiguar la acidez del esfuerzo y a retrasar la fatiga. Sumada a L-histidina y Vitamina B6, es una aliada para series largas y entrenamientos de resistencia.',
    modoDeUso: '3 a 4 g por día. Es normal una leve sensación de hormigueo (inofensiva). Funciona por acumulación: tomala todos los días.',
    bandaBeneficio: 'Más carnosina muscular · menos fatiga en series largas',
    beneficios: [
      { icono: 'escudo', titulo: 'Retrasa la fatiga', texto: 'Amortigua la acidez del músculo durante el esfuerzo.' },
      { icono: 'pesa',   titulo: 'Series más largas', texto: 'Ideal para entrenamientos de resistencia y alto volumen.' },
      { icono: 'hoja',   titulo: 'Con Vitamina B6',   texto: 'Suma L-histidina y B6 para potenciar el efecto.' }
    ],
    ingredientes: [
      { nombre: 'Beta-alanina',      texto: 'Eleva la carnosina muscular.' },
      { nombre: 'L-histidina + B6',  texto: 'Apoyan la síntesis de carnosina.' }
    ]
  },
  {
    id: 'iso-plus-powder',
    nombre: 'Iso Plus Powder',
    categoria: 'resistencia',
    categoriasExtra: [],
    precio: null,
    imagen: 'assets/img/products/iso-plus-powder.webp',
    rating: 4.6, reviews: 58, tags: [], destacado: true,
    resumen: 'Bebida isotónica con electrolitos, vitaminas y L-carnitina para reponer energía e hidratación.',
    descripcion: 'Iso Plus repone líquidos, sales minerales y energía durante y después del esfuerzo. Con electrolitos, vitaminas y L-carnitina, ayuda a mantener la hidratación y el rendimiento en entrenamientos largos o días de calor.',
    modoDeUso: 'Disolvé 1 medida en 500 ml de agua. Tomá durante o después del entrenamiento.',
    bandaBeneficio: 'Isotónico con electrolitos · hidratación y energía',
    beneficios: [
      { icono: 'gota',  titulo: 'Hidratación', texto: 'Repone líquidos y sales minerales perdidos al entrenar.' },
      { icono: 'rayo',  titulo: 'Energía',     texto: 'Carbohidratos para sostener el rendimiento.' },
      { icono: 'hoja',  titulo: 'Con L-carnitina', texto: 'Suma vitaminas y L-carnitina a la fórmula.' }
    ],
    ingredientes: [
      { nombre: 'Electrolitos', texto: 'Sodio, potasio y magnesio para la hidratación.' },
      { nombre: 'L-carnitina',  texto: 'Apoya el metabolismo energético.' }
    ]
  },
  {
    id: 'vitamin-multiple-sport',
    nombre: 'Vita-min Multiple Sport',
    categoria: 'vitalidad',
    categoriasExtra: [],
    precio: null,
    imagen: 'assets/img/products/vitamin-multiple-sport.webp',
    rating: 4.7, reviews: 89, tags: [], destacado: false,
    resumen: 'Complejo de vitaminas y minerales Albion de alta absorción para un estilo de vida activo.',
    descripcion: 'Un multivitamínico pensado para personas activas: vitaminas y minerales en formas Albion de alta absorción, que ayudan a cubrir los requerimientos extra que impone el entrenamiento. Soporte diario para tu energía y tu sistema inmune.',
    modoDeUso: '1 cápsula por día, con una comida principal.',
    bandaBeneficio: 'Vitaminas y minerales Albion · alta absorción',
    beneficios: [
      { icono: 'escudo',  titulo: 'Cubre tus requerimientos', texto: 'Pensado para los extra que exige el entrenamiento.' },
      { icono: 'corazon', titulo: 'Energía y defensas',       texto: 'Apoya tu energía diaria y tu sistema inmune.' },
      { icono: 'hoja',    titulo: 'Alta absorción',           texto: 'Minerales en formas Albion mejor asimiladas.' }
    ],
    ingredientes: [
      { nombre: 'Minerales Albion',    texto: 'Formas queladas de alta biodisponibilidad.' },
      { nombre: 'Complejo vitamínico', texto: 'Vitaminas esenciales para personas activas.' }
    ]
  },
  {
    id: 'vitamin-multiple-sport-40',
    nombre: 'Vita-min Multiple Sport 40+',
    categoria: 'vitalidad',
    categoriasExtra: [],
    precio: null,
    imagen: 'assets/img/products/vitamin-multiple-sport-40.webp',
    rating: 4.8, reviews: 52, tags: ['Nuevo'], destacado: false,
    resumen: 'Multivitamínico +40 con Saw Palmetto y Ashwagandha KSM-66 para soporte hormonal y vitalidad.',
    descripcion: 'Formulado para quienes pasan los 40 y siguen entrenando: suma Saw Palmetto y Ashwagandha KSM-66 al complejo de vitaminas y minerales, apoyando el equilibrio hormonal, la energía y la recuperación en esta etapa.',
    modoDeUso: '1 cápsula por día, con una comida principal.',
    bandaBeneficio: 'Multivitamínico +40 · con Saw Palmetto y Ashwagandha KSM-66',
    beneficios: [
      { icono: 'balanza', titulo: 'Soporte +40',        texto: 'Formulado para quienes pasan los 40 y siguen entrenando.' },
      { icono: 'hoja',    titulo: 'Equilibrio hormonal', texto: 'Saw Palmetto y Ashwagandha KSM-66 como apoyo.' },
      { icono: 'rayo',    titulo: 'Energía',             texto: 'Ayuda en la energía y la recuperación de esta etapa.' }
    ],
    ingredientes: [
      { nombre: 'Ashwagandha KSM-66', texto: 'Adaptógeno que apoya el manejo del estrés.' },
      { nombre: 'Saw Palmetto',       texto: 'Soporte para la salud masculina.' }
    ]
  },
  {
    id: 'gold-omega-3-sport',
    nombre: 'Gold Omega 3 Sport',
    categoria: 'vitalidad',
    categoriasExtra: [],
    precio: null,
    imagen: 'assets/img/products/gold-omega-3-sport.webp',
    rating: 4.8, reviews: 76, tags: [], destacado: true,
    resumen: 'Aceite de pescado concentrado, rico en EPA y DHA para salud cardiovascular y cerebral.',
    descripcion: 'Ácidos grasos omega 3 de alta concentración (EPA y DHA) a partir de aceite de pescado purificado. Apoyan la salud cardiovascular, la función cerebral y el manejo de la inflamación propia del entrenamiento intenso.',
    modoDeUso: '1 a 2 cápsulas por día, con las comidas.',
    bandaBeneficio: 'Omega 3 concentrado · rico en EPA y DHA',
    beneficios: [
      { icono: 'corazon', titulo: 'Salud cardiovascular', texto: 'EPA y DHA que apoyan el corazón.' },
      { icono: 'cerebro', titulo: 'Función cerebral',     texto: 'Ácidos grasos esenciales para el cerebro.' },
      { icono: 'escudo',  titulo: 'Antiinflamatorio',     texto: 'Ayuda con la inflamación del entrenamiento intenso.' }
    ],
    ingredientes: [
      { nombre: 'EPA y DHA',                  texto: 'Omega 3 de alta concentración.' },
      { nombre: 'Aceite de pescado purificado', texto: 'Fuente limpia y concentrada.' }
    ]
  },
  {
    id: 'arthroblock-forte',
    nombre: 'Arthroblock Forte',
    categoria: 'vitalidad',
    categoriasExtra: [],
    precio: null,
    imagen: 'assets/img/products/arthroblock-forte.webp',
    rating: 4.6, reviews: 33, tags: [], destacado: false,
    resumen: 'Fórmula de 7 activos con condroitina y ácido hialurónico para el refuerzo de las articulaciones.',
    descripcion: 'Arthroblock Forte combina 7 ingredientes activos —entre ellos condroitina y ácido hialurónico— para cuidar y reforzar las articulaciones sometidas a carga. Pensado para uso sostenido en quienes entrenan fuerte y quieren proteger sus movimientos.',
    modoDeUso: 'Seguí la dosis indicada en el envase, junto a una comida. Pensado para uso sostenido en el tiempo.',
    bandaBeneficio: '7 activos articulares · con condroitina y ácido hialurónico',
    beneficios: [
      { icono: 'hueso',  titulo: 'Refuerzo articular', texto: 'Cuida las articulaciones sometidas a carga.' },
      { icono: 'escudo', titulo: '7 activos',          texto: 'Fórmula completa para el cuidado de tus movimientos.' },
      { icono: 'diana',  titulo: 'Uso sostenido',      texto: 'Pensado para quienes entrenan fuerte a largo plazo.' }
    ],
    ingredientes: [
      { nombre: 'Condroitina',       texto: 'Componente del cartílago articular.' },
      { nombre: 'Ácido hialurónico', texto: 'Apoya la lubricación de las articulaciones.' }
    ]
  }
];


/* --------------------------------------------------------------------------
   6) GUÍAS DE USO (la sección "Guía de uso de productos", ex "Blog")
   El contenido completo de cada guía vive en su propio archivo .html.
   -------------------------------------------------------------------------- */
const VITALICA_ARTICULOS = [
  {
    id: 'creatina',
    titulo: 'Creatina: cómo tomarla y por qué funciona (sin mitos)',
    tema: 'Fuerza',
    resumen: 'Qué dice la ciencia sobre la creatina, la dosis correcta y los mitos más comunes que conviene dejar atrás.',
    archivo: 'guia-creatina.html',
    fecha: '2026-05-20', leeMin: 5, acento: 'naranja'
  },
  {
    id: 'proteina-suero',
    titulo: 'Proteína de suero: cuándo, cuánto y para qué',
    tema: 'Recuperación',
    resumen: 'Timing, cantidad y para quién tiene sentido la proteína en polvo. Lo esencial, sin vueltas.',
    archivo: 'guia-proteina-suero.html',
    fecha: '2026-05-12', leeMin: 6, acento: 'navy'
  },
  {
    id: 'pre-entrenos',
    titulo: 'Pre-entrenos: beta-alanina, citrulina y cafeína explicados',
    tema: 'Deporte de resistencia',
    resumen: 'Qué hace cada ingrediente de tu pre-entreno y cómo usarlo bien, sin pasarte de la raya.',
    archivo: 'guia-pre-entrenos.html',
    fecha: '2026-04-30', leeMin: 7, acento: 'mixto'
  }
];


/* --------------------------------------------------------------------------
   7) TIENDAS — dónde se consigue Vitalica / Olimp (página Contacto)
   ⚠️ Direcciones PLACEHOLDER: reemplazá por las reales.
   -------------------------------------------------------------------------- */
const VITALICA_TIENDAS = [
  { nombre: 'Negros Suplementos', ciudad: 'Asunción',        direccion: 'Dirección a confirmar' },
  { nombre: 'Fit Way',            ciudad: 'Asunción',        direccion: 'Dirección a confirmar' },
  { nombre: 'Vitamin Shop',       ciudad: 'Asunción',        direccion: 'Dirección a confirmar' },
  { nombre: 'Cell Shop',          ciudad: 'Ciudad del Este', direccion: 'Dirección a confirmar' },
  { nombre: 'Shopping China',     ciudad: 'Ciudad del Este', direccion: 'Dirección a confirmar' },
  { nombre: 'Nutrición Total',    ciudad: 'Encarnación',     direccion: 'Dirección a confirmar' }
];


/* --------------------------------------------------------------------------
   8) GUÍAS DE USO POR PRODUCTO (contenido real de las "Guías Esenciales")
   Se muestran INLINE en cada página de producto. Campos (todos opcionales
   salvo comoTomar): comoTomar, pasos[], siSirve[], noSirve[], queEsperar[],
   cuidados[], faqs[].
   -------------------------------------------------------------------------- */
const VITALICA_GUIAS = {
  'whey-protein-complex': {
    comoTomar: '1 medida (1 scoop ≈ 35 g) aporta ~26 g de proteína —más o menos lo que un bife mediano. 1 scoop por día es la base; si tomás 2, repartilas (una post-entreno y otra como merienda). Para tu dosis exacta según tu objetivo, consultá con un nutricionista.',
    pasos: ['150 a 200 ml de agua', 'Primero el líquido, después el polvo', 'Agitá 10 a 15 segundos', 'Nunca con agua hirviendo: el calor le saca propiedades'],
    siSirve: ['Llegar a la proteína que tu cuerpo necesita cuando la comida sola no alcanza', 'Acelerar la recuperación después de entrenar fuerte', 'Cuidar el músculo cuando bajás de peso o entrenás mucho'],
    noSirve: ['No "quema grasa" por sí sola', 'No construye músculo si no entrenás', 'No reemplaza la comida: es un complemento'],
    queEsperar: [
      { etapa: 'Semanas 1-2', texto: 'Te recuperás mejor: menos cansancio entre entrenamientos.' },
      { etapa: 'Semanas 6-12', texto: 'Cambios visibles: más músculo y mejor forma, si entrenás, comés y dormís bien.' }
    ],
    cuidados: ['Contiene lactosa: no apta para intolerantes a la lactosa', 'El horario no es clave: lo que importa es la proteína total del día', 'Consultá a tu médico si estás embarazada, amamantando, tenés problemas renales o sos alérgico a la leche'],
    faqs: [
      { q: '¿Engorda?', a: 'No por sí sola. Lo que engorda es comer de más en general.' },
      { q: '¿La tomo si no entreno?', a: 'Sí, completa la proteína del día igual.' },
      { q: '¿Sirve para mujeres?', a: 'Sí, funciona exactamente igual.' },
      { q: '¿Daña el riñón?', a: 'No, si tu riñón está sano. Con problemas renales, consultá a tu médico.' }
    ]
  },
  'creatine-monohydrate': {
    comoTomar: '0,1 g por cada kilo de tu peso, en una sola toma al día (50 kg ≈ 5 g · 70 kg ≈ 7 g · 90 kg ≈ 9 g). 1 scoop de Olimp = 3 g. No hace falta "fase de carga": con tu dosis diaria llegás al máximo en ~3 semanas.',
    pasos: ['Tomala todos los días, también los que no entrenás', 'Mejor con una comida o algo de carbohidrato', 'Mantené 2 a 3 litros de agua al día', 'Mezclala y tomala en el momento (no la dejes preparada)'],
    queEsperar: [
      { etapa: 'Días 1-15', texto: 'Saturación: tus músculos se llenan de creatina. Quizás no sientas nada todavía.' },
      { etapa: 'Día 20 en adelante', texto: 'Más fuerza y mejor recuperación: esa última repetición empieza a salir.' }
    ],
    cuidados: ['No con líquido hirviendo (el calor la degrada)', 'Si sos sensible, evitá tomarla con el estómago vacío', 'Guardala en lugar fresco y seco, bien cerrada (la humedad la afecta)', 'Sube el valor de "creatinina" en los análisis sin ser daño renal: avisá a tu médico antes de un análisis de sangre'],
    faqs: [
      { q: '¿Me va a hinchar?', a: 'No. Retiene agua DENTRO del músculo, no debajo de la piel: te ves más denso y definido, no hinchado.' },
      { q: '¿Necesito fase de carga?', a: 'No. Con tu dosis diaria llegás al máximo en ~3 semanas.' },
      { q: '¿La tomo los días que no entreno?', a: 'Sí. Funciona por acumulación: la constancia es todo.' }
    ]
  },
  'redweiler': {
    comoTomar: 'La dosis va según tu peso: hasta 75 kg → 6 g (¼ medida, 100 mg de cafeína); 75 a 90 kg → 12 g (½ medida, 200 mg); más de 90 kg → 18 g (¾ medida, 300 mg). Tomalo 30 minutos antes de entrenar. ¿Primera vez o sensible a la cafeína? Empezá por la dosis más baja.',
    pasos: ['Disolvé en 100 a 300 ml de agua según tu dosis', 'Agitá el envase antes de usar', 'Usalo en tus días pesados, no todos los días', 'Acompañá con agua o Iso Plus para reponer las sales'],
    queEsperar: [
      { etapa: 'Durante el entreno', texto: 'Más energía, foco y fuerza en las últimas series, con un bombeo notable (músculos firmes, venas marcadas).' },
      { etapa: 'A los ~10 min', texto: 'Posible hormigueo por la beta-alanina: inofensivo, se va apenas empezás a moverte.' }
    ],
    cuidados: ['No lo tomes de noche (hasta 300 mg de cafeína, como 4-5 cafés)', 'No lo mezcles con café, energizantes, quemadores ni alcohol', 'No te pases de la dosis: puede dar taquicardia o mareos', 'Evitalo si tenés problemas de corazón o presión, embarazo, lactancia o sos menor de edad']
  },
  'knockout-2': {
    comoTomar: 'Dosis normal: 6,1 g = media medida (trae 200 mg de cafeína, ~3 cafés). ¿Primera vez o sensible? Empezá con la mitad (~3 g). Nunca llenes la medida completa. Tomalo 30 minutos antes de entrenar, en ~200 ml de agua.',
    pasos: ['Mejor con el estómago liviano (no después de una comida pesada)', 'Agitá el envase antes de cada uso', 'Usalo en tus días pesados, no todos los días', 'Acompañá con Iso Plus para reponer las sales'],
    queEsperar: [
      { etapa: 'Durante el entreno', texto: 'Energía, foco y bombeo muscular para empujar en el último esfuerzo.' },
      { etapa: 'A los ~10 min', texto: 'Posible hormigueo por la beta-alanina: normal e inofensivo.' }
    ],
    cuidados: ['No lo tomes de noche (200 mg de cafeína)', 'No lo mezcles con más cafeína ni alcohol', 'No te pases de la dosis: puede dar taquicardia o mareos', 'Evitalo si tenés problemas de corazón o presión, embarazo, lactancia o sos menor de edad']
  },
  'beta-alanina-xplode': {
    comoTomar: '3,2 g (1 scoop) por día para la mayoría. 4,8 a 6,4 g si sos atleta, entrenás mucho o pesás más de 85-90 kg (partila en 2 tomas). El horario no importa: no es un pre-entreno, tomala cuando te quede cómodo.',
    pasos: ['Disolvé cada scoop en 150 a 200 ml de agua', 'Ya viene con sabor naranja: no le agregues jugo', 'Tomala todos los días, también los que no entrenás', 'Si el hormigueo molesta, partila en 2 tomas o tomala con comida'],
    queEsperar: [
      { etapa: 'Semana 1', texto: 'Arranca por dentro: vas a sentir el hormigueo, todavía sin diferencia al entrenar.' },
      { etapa: 'Semana 3-4 en adelante', texto: 'Aguantás más: ese ardor que te hacía parar aparece más tarde.' }
    ],
    cuidados: ['El hormigueo es normal e inofensivo y NO indica que funcione mejor', 'Se nota en esfuerzos fuertes y seguidos de 1 a 4 min (series largas, intervalos, funcional)', 'Va muy bien con la creatina: fuerza + aguante se complementan']
  },
  'iso-plus-powder': {
    comoTomar: 'Entreno moderado (~1 h): 1 scoop (17,5 g) en 250 ml. Entreno intenso o mucho calor: hasta 2 scoops en 500 ml por hora. Recuperación o día de calor: 1 medida en 500 ml bien fría.',
    pasos: ['Tomala bien fría (rendís mejor bajo el sol)', 'Sorbos chicos y seguidos, no todo de una vez', 'No le agregues azúcar ni jugo (deja de ser isotónica)', 'Agitá antes de usar si el polvo se compacta'],
    queEsperar: [
      { etapa: 'Durante el esfuerzo', texto: 'Hidratación más rápida que el agua sola y energía sostenida.' },
      { etapa: 'Al final', texto: 'Menos fatiga y menor probabilidad de calambres al reponer líquidos y sales.' }
    ],
    cuidados: ['Con L-carnitina: ayuda a usar la grasa como fuente de energía', 'En Paraguay la humedad endurece el polvo: es normal y no pierde efecto', 'Guardalo en lugar fresco y seco, bien cerrado']
  },
  'vitamin-multiple-sport': {
    comoTomar: '1 cápsula de cada color al día, con comida. Lo ideal: la naranja (vitaminas) en el desayuno o almuerzo, y la azul (minerales) en la cena. ¿Día caótico? Las dos juntas en el almuerzo.',
    pasos: ['Siempre con comida, no en ayunas', 'Lejos del café y el té (bloquean minerales): dejá pasar 30 min', 'Tomalas todos los días, también los que no entrenás'],
    queEsperar: [
      { etapa: 'Día a día', texto: 'Soporte de energía y defensas. Es como el aceite del motor: el efecto es acumulativo, no se siente el primer día.' }
    ],
    cuidados: ['Orina amarilla fuerte: normal e inofensivo (exceso de vitamina B2)', 'Va bien con Gold Omega 3 (las vitaminas A, D, E y K se absorben mejor con el aceite)', 'Con alcohol o medicación diaria, dejá 3-4 h de separación y consultá a tu médico']
  },
  'gold-omega-3-sport': {
    comoTomar: '1 cápsula al día para mantenimiento (ya cubre lo que tu corazón necesita). 2 al día si querés más apoyo para el cerebro o la recuperación. Siempre con la comida (es una grasa: se absorbe mejor).',
    pasos: ['Con el almuerzo o la cena (si tomás 2, una en cada comida)', 'Tomalo todos los días: el efecto es acumulativo', 'Sacá la cápsula del blister recién al tomarla (al aire se oxida)'],
    queEsperar: [
      { etapa: 'Semanas 3-4', texto: 'Los beneficios reales (corazón, cerebro, vista) se notan con uso diario sostenido.' }
    ],
    cuidados: ['No lo dejes al sol ni en el auto (el calor lo oxida)', 'No lo tomes en ayunas', 'Combo con el multivitamínico', 'Consultá a tu médico si tomás anticoagulantes o estás embarazada']
  },
  'arthroblock-forte': {
    comoTomar: 'Mantenimiento: 1 cápsula al día (con el desayuno o el almuerzo). Dolor o lesión: 1 cápsula 2 veces al día (después del almuerzo y de la cena). Siempre con comida.',
    pasos: ['Siempre con comida (la boswellia y el jengibre pueden caer pesados en ayunas)', 'Por ciclos: usalo 2-3 meses seguidos y después descansá 1-2 meses'],
    queEsperar: [
      { etapa: 'Primeras semanas', texto: 'Menos rigidez al despertar.' },
      { etapa: '2-3 meses', texto: 'Menos dolor al moverte. Trabaja lento: no es un analgésico.' }
    ],
    cuidados: ['Contiene derivados de mariscos (crustáceos): no tomar si sos alérgico', 'Guardalo en su blister (la humedad degrada la vitamina C y el ácido hialurónico)', 'Combo con Gold Omega 3 para cuidar mejor las articulaciones', 'Consultá a tu médico si tomás anticoagulantes; no recomendado en embarazo ni lactancia']
  }
};
// Vita-min 40+ usa la misma guía que Vita-min (no tiene PDF propio).
VITALICA_GUIAS['vitamin-multiple-sport-40'] = VITALICA_GUIAS['vitamin-multiple-sport'];


/* --------------------------------------------------------------------------
   9) COMBOS — productos que "van juntos" (relacionados y upsell)
   -------------------------------------------------------------------------- */
const VITALICA_COMBOS = [
  // Grupo A — recuperación / salud
  ['whey-protein-complex', 'creatine-monohydrate', 'vitamin-multiple-sport', 'vitamin-multiple-sport-40', 'gold-omega-3-sport', 'arthroblock-forte'],
  // Grupo B — rendimiento / resistencia
  ['iso-plus-powder', 'knockout-2', 'redweiler', 'beta-alanina-xplode']
];


/* --------------------------------------------------------------------------
   Helpers de acceso a los datos
   -------------------------------------------------------------------------- */
const Datos = {
  producto: function (id) {
    return VITALICA_PRODUCTOS.find(function (p) { return p.id === id; });
  },
  categoria: function (id) {
    return VITALICA_CATEGORIAS.find(function (c) { return c.id === id; });
  },
  porCategoria: function (idCategoria) {
    return VITALICA_PRODUCTOS.filter(function (p) {
      return p.categoria === idCategoria || (p.categoriasExtra || []).indexOf(idCategoria) !== -1;
    });
  },
  destacados: function () {
    return VITALICA_PRODUCTOS.filter(function (p) { return p.destacado; });
  },
  meta: function (id) {
    return VITALICA_METAS.find(function (m) { return m.id === id; });
  },
  // Productos de una meta (unión de sus categorías, sin repetir)
  porMeta: function (idMeta) {
    var m = this.meta(idMeta);
    if (!m) return [];
    var vistos = {}, res = [];
    VITALICA_PRODUCTOS.forEach(function (p) {
      var cats = [p.categoria].concat(p.categoriasExtra || []);
      var coincide = cats.some(function (c) { return m.categorias.indexOf(c) !== -1; });
      if (coincide && !vistos[p.id]) { vistos[p.id] = 1; res.push(p); }
    });
    return res;
  },
  // Guía de uso de un producto (objeto de VITALICA_GUIAS)
  guia: function (id) {
    return (typeof VITALICA_GUIAS !== 'undefined') ? VITALICA_GUIAS[id] : null;
  },
  // Productos que "van juntos" (mismo combo de VITALICA_COMBOS), sin el actual
  relacionados: function (id) {
    var combo = VITALICA_COMBOS.find(function (g) { return g.indexOf(id) !== -1; });
    if (!combo) return [];
    return combo.filter(function (x) { return x !== id; })
                .map(function (x) { return Datos.producto(x); })
                .filter(Boolean);
  }
};


/* --------------------------------------------------------------------------
   10) CAPA DE CAMBIOS DEL PANEL DE ADMINISTRADOR (overrides)
   Aplica lo guardado por el panel (localStorage) SOBRE los valores por defecto
   de arriba. Así TODAS las páginas reflejan los cambios sin tocar el resto.
   Objeto en localStorage['vitalica_overrides']:
     { config:{whatsapp,redes,marca,nav,anuncios,envio},
       hero:[ {eyebrow,titulo,texto,imagen,cta1:{texto,href},cta2:{texto,href}} ],
       productos:{ <id>:{nombre,precio,imagen,resumen} },
       tiendas:[ {nombre,ciudad,direccion} ] }
   -------------------------------------------------------------------------- */
(function aplicarOverrides() {
  var ov;
  try { ov = JSON.parse(localStorage.getItem('vitalica_overrides')); }
  catch (e) { ov = null; }
  if (!ov || typeof ov !== 'object') return;

  // Config
  if (ov.config) {
    ['whatsapp', 'redes', 'marca', 'envio'].forEach(function (k) {
      if (ov.config[k]) {
        VITALICA_CONFIG[k] = VITALICA_CONFIG[k] || {};
        Object.assign(VITALICA_CONFIG[k], ov.config[k]);
      }
    });
    if (Array.isArray(ov.config.anuncios)) VITALICA_CONFIG.anuncios = ov.config.anuncios;
    if (Array.isArray(ov.config.nav))      VITALICA_CONFIG.nav = ov.config.nav;
    // Normaliza los costos de envío a entero (acepta "25.000" o "25000").
    if (VITALICA_CONFIG.envio) {
      ['granAsuncion', 'interior'].forEach(function (k) {
        if (VITALICA_CONFIG.envio[k] != null) {
          var de = String(VITALICA_CONFIG.envio[k]).replace(/[^\d]/g, '');
          if (de !== '') VITALICA_CONFIG.envio[k] = Number(de);
        }
      });
    }
    // Comunidad / Instagram: handle + posts (solo pisa los slots con imagen nueva).
    if (ov.config.comunidad) {
      VITALICA_CONFIG.comunidad = VITALICA_CONFIG.comunidad || { handle: '@vitalica.py', posts: [] };
      if (ov.config.comunidad.handle) VITALICA_CONFIG.comunidad.handle = ov.config.comunidad.handle;
      if (Array.isArray(ov.config.comunidad.posts)) {
        ov.config.comunidad.posts.forEach(function (img, i) {
          if (img) VITALICA_CONFIG.comunidad.posts[i] = img;
        });
      }
    }
  }

  // Hero (por índice)
  if (Array.isArray(ov.hero)) {
    ov.hero.forEach(function (o, i) {
      var s = VITALICA_HERO[i];
      if (!o || !s) return;
      ['eyebrow', 'titulo', 'texto', 'imagen', 'modo'].forEach(function (k) {
        if (o[k] != null && o[k] !== '') s[k] = o[k];
      });
      ['cta1', 'cta2'].forEach(function (c) {
        if (o[c]) {
          s[c] = s[c] || {};
          if (o[c].texto != null) s[c].texto = o[c].texto;
          if (o[c].href != null)  s[c].href = o[c].href;
        }
      });
    });
  }

  // Productos (por id)
  if (ov.productos) {
    VITALICA_PRODUCTOS.forEach(function (p) {
      var o = ov.productos[p.id];
      if (!o) return;
      ['nombre', 'imagen', 'resumen'].forEach(function (k) {
        if (o[k] != null && o[k] !== '') p[k] = o[k];
      });
      if (o.precio != null && o.precio !== '') {
        // Aceptamos número o texto ("375.000", "Gs. 375.000"): solo los dígitos.
        var dig = String(o.precio).replace(/[^\d]/g, '');
        if (dig !== '') p.precio = Number(dig);
      }
    });
  }

  // Tiendas (lista completa; mutamos el array)
  if (Array.isArray(ov.tiendas)) {
    VITALICA_TIENDAS.length = 0;
    ov.tiendas.forEach(function (t) { VITALICA_TIENDAS.push(t); });
  }
})();
// Catálogo Real de Olimp Sport Nutrition para Vitalica
const fichas = {
  whey: {
    titulo: "Whey Protein Complex 100%",
    beneficio: "Tecnología CFM y fórmula doble WPC + WPI para recuperación.",
    corto: "Proteína premium con textura gourmet y estándar farmacéutico.",
    imagen: "OLIMP%20PRODUCTOS/WheyProteinComplex-ZIP-2270g-universal-0014-ol-5-0001-66a2447fa4762.webp",
    secciones: {
      "Descripción": "Proteína con filtrado de flujo cruzado (CFM) que maximiza la pureza y conserva las fracciones de crecimiento muscular.",
      "Beneficios": ["Tecnología CFM superior sin procesos químicos.","Fórmula doble WPC + WPI para absorción eficiente.","Textura cremosa tipo batido real."],
      "Ingredientes": "Proteína de suero concentrada (WPC) y aislada (WPI), saborizantes.",
      "Modo de uso": "Mezclar 1 porción (35 g) con agua o leche.",
      "Ficha técnica": "Por porción (35 g): 26 g de proteínas, 3,9 g de carbohidratos y 1,5 g de grasas."
    }
  },
  iso: {
    titulo: "Iso Plus Powder",
    beneficio: "Powder isotonic sport drink con L-carnitina y L-glutamina.",
    corto: "Apoyo de hidratación y rendimiento durante el entrenamiento.",
    imagen: "iso.webp",
    secciones: {
      "Descripción": "Bebida isotónica en polvo diseñada para hidratación y vitalidad con perfil completo de soporte deportivo.",
      "Beneficios": ["Reposición de electrolitos y prevención de calambres.","Energía limpia y vitalidad constante.","L-carnitina y L-glutamina para rendimiento y recuperación."],
      "Ingredientes": "Carbohidratos, electrolitos, vitaminas, L-carnitina, L-glutamina.",
      "Modo de uso": "Disolver 1 porción (17,5 g) en 250 ml de agua.",
      "Ficha técnica": "Por porción (17,5 g): 60 kcal, 18 g carbohidratos, 0,29 g sal."
    }
  },
  redweiler: {
    titulo: "Redweiler",
    beneficio: "Pre workout con Armageddon Pump Formula y Berserker blend.",
    corto: "Matriz Red Fury para energía y activación intensa.",
    imagen: "red.webp",
    secciones: {
      "Descripción": "Pre-workout orientado a potencia, enfoque y condición de alta precisión en sesiones exigentes.",
      "Beneficios": ["Beta-alanina 2200 mg y creatina 1845 mg por porción.","Citrulina + AAKG para vasodilatación intensa.","Cafeína 200 mg y matriz térmica con cayena y piperina."],
      "Ingredientes": "Beta-alanina, creatina, L-arginina AAKG, malato de citrulina, cafeína, pimienta de cayena y pimienta negra.",
      "Modo de uso": "Tomar 1 porción (12 g) antes del entrenamiento.",
      "Ficha técnica": "Por porción (12 g): beta-alanina 2200 mg, creatina total 1845 mg, cafeína 200 mg."
    }
  },
  knockout: {
    titulo: "Knockout 2.0",
    beneficio: "Mind blowing pre-workout con energía real.",
    corto: "Fórmula sin creatina para enfoque y activación térmica.",
    imagen: "OLIMP%20PRODUCTOS/Knockout-2-0-citrus-punch-305g-UK-amazon-01-png0000-66c2fbe8a26be.webp",
    secciones: {
      "Descripción": "Pre-workout para energía limpia, resistencia y enfoque mental con activación térmica.",
      "Beneficios": ["Cafeína 200 mg para energía real.","Beta-alanina y taurina para resistencia sostenida.","Termogénesis con capsaicina y piperina."],
      "Ingredientes": "Beta-alanina, L-arginina, L-citrulina, taurina, cafeína, pimienta de cayena, pimienta negra.",
      "Modo de uso": "Tomar 1 porción (6,1 g) antes del entrenamiento.",
      "Ficha técnica": "Por porción (6,1 g): beta-alanina 2100 mg, L-arginina 1100 mg, L-citrulina 600 mg, taurina 600 mg, cafeína 200 mg."
    }
  },
  creatina: {
    titulo: "Creatine Monohydrate",
    beneficio: "Monohidrato de creatina con micronización 200 mesh.",
    corto: "Estándar farmacéutico europeo para fuerza y potencia.",
    imagen: "creatine.webp",
    secciones: {
      "Descripción": "Creatina monohidrato en polvo con fórmula 200 mesh de micronización para disolución eficiente.",
      "Beneficios": ["Micronización 200 mesh para máxima absorción.","Apoya fuerza explosiva y potencia.","Controles farmacéuticos de pureza."],
      "Ingredientes": "Creatina monohidrato micronizada.",
      "Modo de uso": "Tomar 1 porción (3,4 g) al día con agua.",
      "Ficha técnica": "Por porción (3,4 g): 3,4 g de creatina, 0 kcal."
    }
  },
  amino: {
    titulo: "Beta Alanina Xplode",
    beneficio: "Sistema de transporte ácido intra y extracelular.",
    corto: "Beta alanina con vitamina B6, bicarbonato y L-histidina.",
    imagen: "beta.webp",
    secciones: {
      "Descripción": "Beta alanina Xplode Powder con enfoque en resistencia y apoyo anti-fatiga durante el esfuerzo.",
      "Beneficios": ["Beta-alanina y L-histidina para crear carnosina.","Buffers extracelulares con bicarbonato para reducir fatiga.","Vitamina B6 para optimizar la absorción."],
      "Ingredientes": "Beta-alanina, L-histidina, bicarbonato de sodio, sales de potasio, vitamina B6.",
      "Modo de uso": "Mezclar 1 porción (9,6 g) con agua.",
      "Ficha técnica": "Por porción (9,6 g): beta-alanina 1600 mg, vitamina B6 0,98 mg, L-histidina 80 mg, bicarbonato de sodio 400 mg."
    }
  },
  vitaminSport: {
    titulo: "Vita-min Multiple Sport",
    beneficio: "Vitaminas y minerales en blísteres farmacéuticos.",
    corto: "Tecnología Vita-Plex y Chela-Min para absorción eficiente.",
    imagen: "vitamin.webp",
    secciones: {
      "Descripción": "Sistema químicamente estable de vitaminas y minerales para soporte diario del rendimiento.",
      "Beneficios": ["Vita-Plex con complejo B completo.","Minerales Albion quelados de alta absorción.","Extractos detox con alcachofa, ortiga y té verde."],
      "Ingredientes": "Vitaminas A, D, E, C y complejo B, minerales quelados, extractos de alcachofa, ortiga y té verde, ALA, pimienta negra.",
      "Modo de uso": "Tomar 1 cápsula al día.",
      "Ficha técnica": "Por porción (1 cápsula): Vit A 800 µg, Vit D 10 µg, Vit E 24 mg, Vit C 290 mg, Vit B1 19,4 mg, Vit B2 19,6 mg."
    }
  },
  vitaminSport40: {
    titulo: "Vita-min Multiple Sport 40+",
    beneficio: "Fórmula específica Master 40+ para entrenamiento adulto.",
    corto: "Con KSM-66, saw palmetto y minerales quelados Albion®.",
    imagen: "OLIMP PRODUCTOS/Vita-Min-Multiple-Sport-40-kartonik-PL-EN-0006-0001-66a9f462ddf4d.webp",
    secciones: {
      "Descripción": "Multivitamínico 40+ orientado a vitalidad, energía y recuperación para entrenamiento sostenido.",
      "Beneficios": ["Ashwagandha KSM-66 y saw palmetto para soporte hormonal.","Minerales Albion quelados para absorción premium.","Vitaminas B y antioxidantes para combatir fatiga."],
      "Ingredientes": "Vitaminas, minerales quelados, extracto de saw palmetto, ashwagandha KSM-66.",
      "Modo de uso": "Tomar 2 cápsulas al día.",
      "Ficha técnica": "Por porción (2 cápsulas): Vit C 290 mg, Vit B1 19,4 mg, Vit B6 18,8 mg, Vit B12 23 µg, saw palmetto 100 mg, ashwagandha 50 mg."
    }
  },
  goldOmega: {
    titulo: "Gold Omega 3 Sport Edition",
    beneficio: "Omega-3 altamente concentrado Sport Edition.",
    corto: "Aceite de pescado 1000 mg con EPA y DHA.",
    imagen: "OLIMP PRODUCTOS/Gold-Omega-3-SportEdition-kartonik-120caps-EN-SE-FR-ES-IT-PL-0022-0001-66d6d15b6fb69.webp",
    secciones: {
      "Descripción": "Fórmula de omega-3 concentrada para soporte cardiovascular, cerebral y deportivo.",
      "Beneficios": ["EPA 330 mg y DHA 220 mg por cápsula.","Protección blíster para frescura total.","Apoyo antiinflamatorio y cognitivo."],
      "Ingredientes": "Aceite de pescado omega-3, vitamina E.",
      "Modo de uso": "Tomar 1 cápsula diaria con comida.",
      "Ficha técnica": "Por porción: aceite de pescado 1000 mg, EPA 330 mg, DHA 220 mg, vitamina E 12 mg."
    }
  },
  arthroblock: {
    titulo: "Arthroblock Forte",
    beneficio: "Funcionamiento adecuado de las articulaciones.",
    corto: "Con glucosamina, condroitina, ácido hialurónico y extractos.",
    imagen: "OLIMP PRODUCTOS/Arthroblock-Forte-OSN-kartonik-EN-PL-0006-ol-4-0001-67d949c0c9f20_1.webp",
    secciones: {
      "Descripción": "Suplemento articular con componentes estructurales y soporte de confort para movilidad diaria.",
      "Beneficios": ["Glucosamina sulfato 1000 mg y condroitina 200 mg.","Ácido hialurónico 50 mg para lubricación.","Boswellia, jengibre, vitamina C y manganeso."],
      "Ingredientes": "Sulfato de glucosamina, sulfato de condroitina, ácido hialurónico, boswellia, jengibre, vitamina C, manganeso.",
      "Modo de uso": "Tomar según porción indicada en el envase.",
      "Ficha técnica": "Por porción: glucosamina 1000 mg, condroitina 200 mg, ácido hialurónico 50 mg, boswellia 100 mg, jengibre 100 mg."
    }
  }
};

// Hacer la variable accesible en la ventana global del navegador
window.fichas = fichas;
