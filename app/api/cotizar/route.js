import { renderToBuffer } from '@react-pdf/renderer'
import { createElement } from 'react'
import { CotizacionPDF } from '../../../lib/cotizacionPDF'

export const dynamic = 'force-dynamic'

const PLANES_INFO = {
  'pack-inicial': {
    nombre: 'Pack Inicial',
    precio: 2490000,
    tag: 'Sistema fotovoltaico híbrido · 1.83 kW producción · 5.12 kWh almacenamiento',
    items: ['3 paneles Trina Solar 610W Bifacial', 'Inversor híbrido SUNPRO 11 kW',
            'Batería LiFePO4 5.12 kWh SPRO LC', 'Cableado, cajas de protección y soporte',
            'Instalación y puesta en marcha'],
  },
  'pack-intermedio': {
    nombre: 'Pack Intermedio',
    precio: 3990000,
    tag: 'Sistema fotovoltaico híbrido · 3.66 kW producción · 10.24 kWh almacenamiento',
    items: ['6 paneles Trina Solar 610W Bifacial', 'Inversor híbrido SUNPRO 11 kW',
            '2× Batería LiFePO4 5.12 kWh SPRO LC', 'Cableado, cajas de protección y soporte',
            'Instalación y puesta en marcha'],
  },
  'pack-full': {
    nombre: 'Pack Full',
    precio: 5590000,
    tag: 'Sistema fotovoltaico híbrido · 6.1 kW producción · 15.36 kWh almacenamiento',
    items: ['10 paneles Trina Solar 610W Bifacial', 'Inversor híbrido SUNPRO 11 kW',
            '3× Batería LiFePO4 5.12 kWh SPRO LC', 'Cableado, cajas de protección y soporte',
            'Instalación y puesta en marcha'],
  },
  'plan-estandar': {
    nombre: 'Plan Estándar',
    precio: 499000,
    tag: 'Cámara solar 4G con IA · Instalación sobre estructura existente',
    items: ['Cámara Dahua Solar PTZ 4G doble lente', 'Tarjeta microSD 256 GB',
            'SIM de datos activada', 'Instalación profesional', 'Configuración y puesta en marcha'],
  },
  'plan-integral': {
    nombre: 'Plan Integral',
    precio: 699000,
    tag: 'Cámara solar 4G con IA · Instalación con poste de acero 75×75',
    items: ['Cámara Dahua Solar PTZ 4G doble lente', 'Tarjeta microSD 256 GB',
            'SIM de datos activada', 'Poste de acero 75×75 con fundación de hormigón',
            'Instalación profesional + puesta en marcha'],
  },
}

function numero() {
  return Math.random().toString(36).slice(2, 10).toUpperCase()
}

function fmtFecha(d) {
  return d.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export async function POST(request) {
  try {
    const { planId, nombre, rut, email, telefono, comuna, direccion, cantidad } = await request.json()

    const base = PLANES_INFO[planId]
    if (!base) return Response.json({ error: 'Plan inválido' }, { status: 400 })

    const esCamara  = planId.startsWith('plan')
    const cant      = esCamara ? Math.max(1, parseInt(cantidad || 1, 10)) : 1
    const precio    = base.precio * cant
    const planLabel = cant > 1 ? `${base.nombre} × ${cant} unidades` : base.nombre

    const num  = numero()
    const hoy  = new Date()
    const venc = new Date(hoy); venc.setDate(hoy.getDate() + 30)

    // Generar PDF
    const pdfBuffer = await renderToBuffer(
      createElement(CotizacionPDF, {
        numero:      num,
        fecha:       fmtFecha(hoy),
        validaHasta: fmtFecha(venc),
        cliente:     { nombre, rut, email, telefono, comuna, direccion },
        plan:        { id: planId, nombre: planLabel, precio, tag: base.tag, items: base.items, cantidad: cant },
      })
    )

    // Intentar enviar email (no bloquea si falla)
    try {
      if (process.env.RESEND_API_KEY) {
        await fetch('https://api.resend.com/emails', {
          method:  'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type':  'application/json',
          },
          body: JSON.stringify({
            from:    'EcoGuard <instalaciones@ecoguard.cl>',
            to:      [email],
            bcc:     ['ventas@ecoguard.cl'],
            subject: `Cotización EcoGuard N° ${num} — ${planLabel}`,
            html: `
              <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111;">
                <h2 style="color:#16a34a;margin-bottom:4px;">Hola ${nombre},</h2>
                <p>Adjunto encontrarás tu cotización formal <strong>N° ${num}</strong> para el servicio <strong>${planLabel}</strong>.</p>
                <p>Este documento tiene una validez de <strong>30 días</strong> y puede ser presentado en instituciones bancarias para solicitar financiamiento o crédito verde.</p>
                <p>Para agendar tu instalación visita <a href="https://ecoguard.cl/agendar">ecoguard.cl/agendar</a></p>
                <p>¿Tienes preguntas? Escríbenos a <a href="mailto:ventas@ecoguard.cl">ventas@ecoguard.cl</a></p>
                <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;">
                <p style="color:#6b7280;font-size:12px;">EcoGuard · Aconcagua Tec. e Inn. SpA · RUT 78.433.166-0</p>
              </div>`,
            attachments: [{
              filename: `Cotizacion-EcoGuard-${num}.pdf`,
              content:  Buffer.from(pdfBuffer).toString('base64'),
            }],
          }),
        })
      }
    } catch (emailErr) {
      console.error('[cotizar] email error (non-blocking):', emailErr)
    }

    // Siempre devolver el PDF en base64 para descarga directa en el browser
    return Response.json({
      ok:     true,
      numero: num,
      pdf:    Buffer.from(pdfBuffer).toString('base64'),
      filename: `Cotizacion-EcoGuard-${num}.pdf`,
    })
  } catch (e) {
    console.error('[cotizar]', e)
    return Response.json({ error: e.message }, { status: 500 })
  }
}
