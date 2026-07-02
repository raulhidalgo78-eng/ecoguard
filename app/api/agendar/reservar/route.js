import { db } from '../../../../lib/supabase'
import { generateSlots } from '../../../../lib/slots'

export const dynamic = 'force-dynamic'

const TIMEOUT_MS = 24 * 60 * 60 * 1000

const PLANES = {
  'pack-inicial':    { nombre: 'Pack Inicial',    precio: 2290000 },
  'pack-intermedio': { nombre: 'Pack Intermedio', precio: 3790000 },
  'pack-full':       { nombre: 'Pack Full',       precio: 5590000 },
}

export async function POST(request) {
  try {
    const { plan, fecha, hora, nombre, email, telefono, comuna, direccion } = await request.json()

    // Validar plan
    const planData = PLANES[plan]
    if (!planData) return Response.json({ error: 'Plan inválido' }, { status: 400 })

    // Validar que el slot es uno de los generados
    const allSlots = generateSlots()
    const validSlot = allSlots.find(s => s.fecha === fecha && s.hora === hora)
    if (!validSlot) return Response.json({ error: 'Fecha/hora no disponible' }, { status: 400 })

    // Verificar que no esté tomado
    const existing = await db.select(
      'reservas',
      `fecha=eq.${fecha}&hora=eq.${hora}&estado=in.(pendiente_pago,pagado,confirmado)&select=estado,created_at`
    )
    const now = Date.now()
    const reallyTaken = existing.filter(r =>
      r.estado !== 'pendiente_pago' ||
      now - new Date(r.created_at).getTime() < TIMEOUT_MS
    )
    if (reallyTaken.length > 0) {
      return Response.json({ error: 'Este horario ya fue reservado. Por favor elige otro.' }, { status: 409 })
    }

    // Crear reserva
    const [reserva] = await db.insert('reservas', {
      plan_nombre: planData.nombre,
      plan_precio: planData.precio,
      fecha,
      hora,
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      telefono: telefono.trim(),
      comuna,
      direccion: direccion.trim(),
      estado: 'pendiente_pago',
    })

    return Response.json(reserva)
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
