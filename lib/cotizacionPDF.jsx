import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const EMPRESA = {
  nombre: 'Aconcagua Tec. e Inn. SpA',
  rut:    '78.433.166-0',
  email:  'ventas@ecoguard.cl',
  web:    'ecoguard.cl',
  marca:  'EcoGuard',
}

const C = {
  verde:       '#16a34a',
  verdeOscuro: '#14532d',
  oscuro:      '#0f172a',
  gris:        '#6b7280',
  borde:       '#e5e7eb',
  fondo:       '#f0fdf4',
  blanco:      '#ffffff',
}

const s = StyleSheet.create({
  page: { paddingBottom: 70, fontSize: 9, fontFamily: 'Helvetica', color: C.oscuro, lineHeight: 1.5 },

  // ── Cabecera con banda verde ──
  headerBanda: {
    backgroundColor: C.verdeOscuro,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  marca:    { fontSize: 30, fontFamily: 'Helvetica-Bold', color: C.blanco, letterSpacing: 1 },
  tagline:  { fontSize: 8, color: '#86efac', marginTop: 3, letterSpacing: 0.4 },

  // Bloque número (lado derecho de la banda)
  numBlk:   { alignItems: 'flex-end' },
  numLbl:   { fontSize: 7, color: '#86efac', textTransform: 'uppercase', letterSpacing: 1 },
  numVal:   { fontSize: 18, fontFamily: 'Helvetica-Bold', color: C.blanco, marginTop: 2 },
  numFecha: { fontSize: 7.5, color: '#d1fae5', marginTop: 2 },

  // Franja de datos de la empresa (bajo la banda verde)
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: C.fondo,
    paddingHorizontal: 40,
    paddingVertical: 8,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#bbf7d0',
  },
  infoTxt: { fontSize: 7.5, color: '#374151' },

  // Contenido con padding horizontal
  content: { paddingHorizontal: 40 },

  // Secciones
  sec:    { marginTop: 14, marginBottom: 4 },
  secTit: { fontSize: 7, fontFamily: 'Helvetica-Bold', color: C.verde,
            textTransform: 'uppercase', letterSpacing: 0.8,
            paddingBottom: 4, borderBottomWidth: 0.5, borderBottomColor: C.borde, marginBottom: 7 },
  row2:   { flexDirection: 'row' },
  col:    { flex: 1 },
  lbl:    { fontSize: 7, color: C.gris, textTransform: 'uppercase', letterSpacing: 0.4 },
  val:    { fontSize: 9, marginTop: 1, marginBottom: 7 },

  // Items del pack
  itemFila: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 3 },
  bullet:   { width: 10, color: C.verde, fontFamily: 'Helvetica-Bold', fontSize: 10 },
  itemTxt:  { flex: 1 },

  // Precios
  precioFila: { flexDirection: 'row', justifyContent: 'space-between',
                paddingVertical: 5, borderBottomWidth: 0.5, borderBottomColor: C.borde },
  precioLbl:  { color: C.gris },
  precioVal:  { fontFamily: 'Helvetica-Bold' },
  totalFila:  { flexDirection: 'row', justifyContent: 'space-between',
                marginTop: 5, paddingVertical: 7, paddingHorizontal: 10,
                backgroundColor: C.fondo, borderRadius: 4 },
  totalLbl:   { fontFamily: 'Helvetica-Bold', fontSize: 11 },
  totalVal:   { fontFamily: 'Helvetica-Bold', fontSize: 11, color: C.verde },
  ivaNote:    { fontSize: 7, color: C.gris, marginTop: 4 },

  // Crédito verde
  creditBox:  { marginTop: 14, padding: 10,
                backgroundColor: C.fondo,
                borderLeftWidth: 3, borderLeftColor: C.verde },
  creditTit:  { fontFamily: 'Helvetica-Bold', fontSize: 8, color: C.verde, marginBottom: 4 },
  creditTxt:  { fontSize: 8, color: '#374151', lineHeight: 1.6 },

  validez:    { marginTop: 14, fontSize: 7.5, color: C.gris, fontStyle: 'italic' },

  // Footer
  footer:     { position: 'absolute', bottom: 0, left: 0, right: 0,
                backgroundColor: C.verdeOscuro,
                paddingHorizontal: 40, paddingVertical: 8,
                flexDirection: 'row', justifyContent: 'space-between' },
  footerTxt:  { fontSize: 7, color: '#86efac' },
})

function fmt(n) {
  return '$' + Math.round(n).toLocaleString('es-CL')
}

export function CotizacionPDF({ numero, fecha, validaHasta, cliente, plan }) {
  const neto    = Math.round(plan.precio / 1.19)
  const iva     = plan.precio - neto
  const esSolar = plan.id?.startsWith('pack')

  return (
    <Document title={`Cotizacion EcoGuard N° ${numero}`} author={EMPRESA.marca}>
      <Page size="A4" style={s.page}>

        {/* ── Cabecera: banda verde ── */}
        <View style={s.headerBanda}>
          <View>
            <Text style={s.marca}>{EMPRESA.marca}</Text>
            <Text style={s.tagline}>Seguridad solar · Energía renovable · Chile</Text>
          </View>
          <View style={s.numBlk}>
            <Text style={s.numLbl}>Cotización</Text>
            <Text style={s.numVal}>N° {numero}</Text>
            <Text style={s.numFecha}>Emitida: {fecha}</Text>
            <Text style={s.numFecha}>Válida hasta: {validaHasta}</Text>
          </View>
        </View>

        {/* ── Franja info empresa ── */}
        <View style={s.headerInfo}>
          <Text style={s.infoTxt}>{EMPRESA.nombre}  ·  RUT {EMPRESA.rut}</Text>
          <Text style={s.infoTxt}>{EMPRESA.email}  ·  {EMPRESA.web}</Text>
        </View>

        {/* ── Cuerpo ── */}
        <View style={s.content}>

          {/* Datos cliente */}
          <View style={s.sec}>
            <Text style={s.secTit}>Datos del cliente</Text>
            <View style={s.row2}>
              <View style={s.col}>
                <Text style={s.lbl}>Nombre</Text>
                <Text style={s.val}>{cliente.nombre}</Text>
                <Text style={s.lbl}>RUT</Text>
                <Text style={s.val}>{cliente.rut}</Text>
              </View>
              <View style={s.col}>
                <Text style={s.lbl}>Email</Text>
                <Text style={s.val}>{cliente.email}</Text>
                <Text style={s.lbl}>Teléfono</Text>
                <Text style={s.val}>{cliente.telefono}</Text>
              </View>
            </View>
            <Text style={s.lbl}>Dirección de instalación</Text>
            <Text style={s.val}>{cliente.direccion}, {cliente.comuna}, Región de Valparaíso</Text>
          </View>

          {/* Descripción del servicio */}
          <View style={s.sec}>
            <Text style={s.secTit}>Descripción del servicio</Text>
            <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 10.5, marginBottom: 3 }}>
              {plan.nombre}
            </Text>
            <Text style={{ color: C.gris, marginBottom: 9 }}>{plan.tag}</Text>
            {plan.items.map((item, i) => (
              <View key={i} style={s.itemFila}>
                <Text style={s.bullet}>·</Text>
                <Text style={s.itemTxt}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Valores */}
          <View style={s.sec}>
            <Text style={s.secTit}>Valores</Text>
            <View style={s.precioFila}>
              <Text style={s.precioLbl}>Precio neto</Text>
              <Text style={s.precioVal}>{fmt(neto)}</Text>
            </View>
            <View style={s.precioFila}>
              <Text style={s.precioLbl}>IVA (19%)</Text>
              <Text style={s.precioVal}>{fmt(iva)}</Text>
            </View>
            <View style={s.totalFila}>
              <Text style={s.totalLbl}>TOTAL</Text>
              <Text style={s.totalVal}>{fmt(plan.precio)}</Text>
            </View>
            <Text style={s.ivaNote}>Precios en pesos chilenos (CLP) · IVA incluido en el total</Text>
          </View>

          {/* Cláusula crédito verde (solo solar) */}
          {esSolar && (
            <View style={s.creditBox}>
              <Text style={s.creditTit}>Apto para Crédito Verde Bancario — ERNC con almacenamiento</Text>
              <Text style={s.creditTxt}>
                El sistema cotizado corresponde a un proyecto de energía renovable no convencional (ERNC)
                con almacenamiento en baterías de litio-hierro-fosfato (LiFePO4), operación híbrida
                (solar + red) y control inteligente mediante inversor PULSE S4. Este tipo de proyecto es
                elegible para la línea de Crédito Verde y financiamiento sostenible ofrecido por
                instituciones bancarias en Chile (Banco Estado, BCI, Santander, entre otros).
                Esta cotización puede ser presentada como respaldo técnico y económico ante cualquier
                institución financiera.
              </Text>
            </View>
          )}

          <Text style={s.validez}>
            Cotización válida por 30 días desde su emisión. No constituye contrato hasta ser aceptada formalmente por ambas partes.
            Precios referenciales; la distancia y condiciones del sitio pueden ajustar el valor final.
          </Text>

        </View>

        {/* Footer */}
        <View style={s.footer} fixed>
          <Text style={s.footerTxt}>{EMPRESA.marca} · {EMPRESA.nombre} · RUT {EMPRESA.rut}</Text>
          <Text style={s.footerTxt}>Cotización N° {numero}  ·  Página 1</Text>
        </View>

      </Page>
    </Document>
  )
}
