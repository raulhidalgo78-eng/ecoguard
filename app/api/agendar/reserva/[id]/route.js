import { db } from '../../../../../lib/supabase'
import { createPreference } from '../../../../../lib/mercadopago'

export const dynamic = 'force-dynamic'

export async function GET(request, { params }) {
  try {
    const reservas = await db.select('reservas', `id=eq.${params.id}`)
    if (!reservas.length) return Response.json({ error: 'No encontrado' }, { status: 404 })
    const reserva = reservas[0]

    // Si está pendiente de pago y no tiene preference, crear una
    let mpInitPoint = null
    if (reserva.estado === 'pendiente_pago') {
      if (!reserva.mp_preference_id && process.env.MERCADOPAGO_ACCESS_TOKEN) {
        try {
          const pref = await createPreference({
            reservaId: reserva.id,
            planNombre: reserva.plan_nombre,
            planPrecio: reserva.plan_precio,
          })
          await db.update('reservas', reserva.id, { mp_preference_id: pref.id })
          mpInitPoint = pref.init_point
        } catch (e) {
          console.error('MP preference error:', e.message)
        }
      }
    }

    return Response.json({ ...reserva, mpInitPoint })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
