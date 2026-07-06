import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const EMPRESA = {
  nombre: 'Aconcagua Tec. e Inn. SpA',
  rut:    '78.433.166-0',
  email:  'ventas@ecoguard.cl',
  web:    'ecoguard.cl',
  marca:  'EcoGuard',
}

const s = StyleSheet.create({
  page: {
    paddingTop: 50, paddingBottom: 60,
    paddingHorizontal: 50,
    fontSize: 9, fontFamily: 'Helvetica',
    color: '#111827', lineHeight: 1.6,
    backgroundColor: '#ffffff',
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  marca:    { fontSize: 28, fontFamily: 'Helvetica-Bold', color: '#111827', letterSpacing: 0.5 },
  empresa:  { fontSize: 8, color: '#6b7280', marginTop: 4 },
  contacto: { fontSize: 8, color: '#6b7280', marginTop: 1 },

  numBlk:   { alignItems: 'flex-end' },
  numLbl:   { fontSize: 7, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1 },
  numVal:   { fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#111827', marginTop: 3 },
  numFecha: { fontSize: 8, color: '#6b7280', marginTop: 3 },
  numVenc:  { fontSize: 8, color: '#374151', fontFamily: 'Helvetica-Bold', marginTop: 1 },

  // Línea divisora principal
  hr:     { borderBottomWidth: 1.5, borderBottomColor: '#111827', marginVertical: 12 },
  hrThin: { borderBottomWidth: 0.5, borderBottomColor: '#d1d5db', marginVertical: 10 },

  // ── Secciones ──
  secTit: {
    fontSize: 7, fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase', letterSpacing: 1,
    color: '#374151', marginBottom: 8,
  },
  sec: { marginTop: 16 },

  row2: { flexDirection: 'row' },
  col:  { flex: 1 },
  lbl:  { fontSize: 7, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 1 },
  val:  { fontSize: 9, color: '#111827', marginBottom: 9 },

  // ── Items del servicio ──
  itemFila: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 },
  bullet:   { width: 12, color: '#374151', fontSize: 8, marginTop: 1 },
  itemTxt:  { flex: 1, fontSize: 9 },

  planNombre: { fontSize: 12, fontFamily: 'Helvetica-Bold', marginBottom: 2 },
  planTag:    { fontSize: 8, color: '#6b7280', marginBottom: 10 },

  // ── Precios ──
  precioFila: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 6, borderBottomWidth: 0.5, borderBottomColor: '#e5e7eb',
  },
  precioLbl: { color: '#6b7280' },
  precioVal: { fontFamily: 'Helvetica-Bold' },

  totalFila: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginTop: 8, paddingVertical: 8, paddingHorizontal: 10,
    borderWidth: 1.5, borderColor: '#111827',
  },
  totalLbl: { fontSize: 11, fontFamily: 'Helvetica-Bold' },
  totalVal: { fontSize: 11, fontFamily: 'Helvetica-Bold' },
  ivaNote:  { fontSize: 7, color: '#9ca3af', marginTop: 5 },

  // ── Crédito verde ──
  creditBox: {
    marginTop: 16,
    padding: 12,
    borderWidth: 0.5,
    borderColor: '#d1d5db',
  },
  creditTit: { fontSize: 8, fontFamily: 'Helvetica-Bold', marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 },
  creditTxt: { fontSize: 8, color: '#374151', lineHeight: 1.7 },

  validez: { marginTop: 16, fontSize: 7.5, color: '#9ca3af', lineHeight: 1.6 },

  // ── Footer ──
  footer: {
    position: 'absolute', bottom: 24, left: 50, right: 50,
    borderTopWidth: 0.5, borderTopColor: '#d1d5db',
    paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between',
  },
  footerTxt: { fontSize: 7, color: '#9ca3af' },
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

        {/* ── Header ── */}
        <View style={s.header}>
          <View>
            <Text style={s.marca}>{EMPRESA.marca}</Text>
            <Text style={s.empresa}>{EMPRESA.nombre}  ·  RUT {EMPRESA.rut}</Text>
            <Text style={s.contacto}>{EMPRESA.email}  ·  {EMPRESA.web}</Text>
          </View>
          <View style={s.numBlk}>
            <Text style={s.numLbl}>Cotización</Text>
            <Text style={s.numVal}>N° {numero}</Text>
            <Text style={s.numFecha}>Emitida: {fecha}</Text>
            <Text style={s.numVenc}>Válida hasta: {validaHasta}</Text>
          </View>
        </View>

        <View style={s.hr} />

        {/* ── Datos del cliente ── */}
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

        <View style={s.hrThin} />

        {/* ── Descripción del servicio ── */}
        <View style={s.sec}>
          <Text style={s.secTit}>Descripción del servicio</Text>
          <Text style={s.planNombre}>{plan.nombre}</Text>
          <Text style={s.planTag}>{plan.tag}</Text>
          {plan.items.map((item, i) => (
            <View key={i} style={s.itemFila}>
              <Text style={s.bullet}>—</Text>
              <Text style={s.itemTxt}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={s.hrThin} />

        {/* ── Valores ── */}
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

        {/* ── Cláusula crédito verde (solo solar) ── */}
        {esSolar && (
          <View style={s.creditBox}>
            <Text style={s.creditTit}>Elegibilidad para Crédito Verde Bancario — ERNC con almacenamiento</Text>
            <Text style={s.creditTxt}>
              El sistema cotizado corresponde a un proyecto de energía renovable no convencional (ERNC)
              con almacenamiento en baterías de litio-hierro-fosfato (LiFePO4), operación híbrida
              y control inteligente mediante inversor PULSE S4. Este tipo de proyecto es elegible para
              la línea de Crédito Verde y financiamiento sostenible ofrecido por instituciones bancarias
              en Chile (Banco Estado, BCI, Santander, entre otros). Esta cotización puede ser presentada
              como respaldo técnico y económico ante cualquier institución financiera.
            </Text>
          </View>
        )}

        <Text style={s.validez}>
          Cotización válida por 30 días desde su emisión. No constituye contrato hasta ser aceptada formalmente
          por ambas partes. Precios referenciales; la distancia y condiciones del sitio pueden ajustar el valor final.
        </Text>

        {/* ── Footer ── */}
        <View style={s.footer} fixed>
          <Text style={s.footerTxt}>{EMPRESA.marca} · {EMPRESA.nombre} · RUT {EMPRESA.rut}</Text>
          <Text style={s.footerTxt}>N° {numero}</Text>
        </View>

      </Page>
    </Document>
  )
}
