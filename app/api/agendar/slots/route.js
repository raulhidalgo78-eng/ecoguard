import { db } from '../../../../lib/supabase'
import { generateSlots } from '../../../../lib/slots'

export const dynamic = 'force-dynamic'

const TIMEOUT_MS = 24 * 60 * 60 * 1000 // 24 horas

export async function GET() {
  try {
    const reservas = await db.select(
      'reservas',
      'estado=in.(pendiente_pago,pagado,confirmado)&select=fecha,hora,estado,created_at'
    )

    const now = Date.now()
    // Un slot está tomado si: está pagado/confirmado, O está pendiente y no ha expirado (< 24h)
    const takenKeys = new Set(
      reservas
        .filter(r =>
          r.estado !== 'pendiente_pago' ||
          now - new Date(r.created_at).getTime() < TIMEOUT_MS
        )
        .map(r => `${r.fecha}_${r.hora}`)
    )

    const slots = generateSlots()
    const available = slots.filter(s => !takenKeys.has(`${s.fecha}_${s.hora}`))

    return Response.json(available)
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
