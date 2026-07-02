import { db } from '../../../../lib/supabase'
import { getPayment } from '../../../../lib/mercadopago'
import { sendEmail, emailOrdenInstalacion, emailConfirmacionCliente } from '../../../../lib/email'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const body = await request.json()

    // MP envía distintos tipos de eventos; solo nos interesa payment
    if (body.type !== 'payment') return Response.json({ ok: true })

    const payment = await getPayment(body.data.id)
    if (payment.status !== 'approved') return Response.json({ ok: true })

    const reservaId = payment.external_reference
    if (!reservaId) return Response.json({ ok: true })

    const reservas = await db.select('reservas', `id=eq.${reservaId}`)
    if (!reservas.length) return Response.json({ ok: true })
    const reserva = reservas[0]

    // Evitar procesar dos veces
    if (reserva.estado === 'pagado' || reserva.estado === 'confirmado') {
      return Response.json({ ok: true })
    }

    // Marcar como pagado
    await db.update('reservas', reservaId, {
      estado: 'pagado',
      mp_payment_id: String(payment.id),
    })

    const reservaActualizada = { ...reserva, mp_payment_id: String(payment.id) }

    // Enviar emails (sin bloquear la respuesta al webhook)
    await Promise.allSettled([
      sendEmail(emailOrdenInstalacion(reservaActualizada)),
      sendEmail(emailConfirmacionCliente(reservaActualizada)),
    ])

    return Response.json({ ok: true })
  } catch (e) {
    console.error('MP webhook error:', e)
    // Siempre devolver 200 a MP para que no reintente
    return Response.json({ ok: true })
  }
}
