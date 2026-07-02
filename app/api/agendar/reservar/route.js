import { db } from '../../../../lib/supabase'
import { generateWorkingDays, getWorkingDaysFrom } from '../../../../lib/slots'

export const dynamic = 'force-dynamic'

const TIMEOUT_MS = 24 * 60 * 60 * 1000

const PLANES = {
  'pack-inicial':    { nombre: 'Pack Inicial',    precio: 2290000, tipo: 'solar'  },
  'pack-intermedio': { nombre: 'Pack Intermedio', precio: 3790000, tipo: 'solar'  },
  'pack-full':       { nombre: 'Pack Full',       precio: 5590000, tipo: 'solar'  },
  'plan-estandar':   { nombre: 'Plan Estándar',   precio: 499000,  tipo: 'camara' },
  'plan-integral':   { nombre: 'Plan Integral',   precio: 699000,  tipo: 'camara' },
}

function getTipo(planNombre) {
  if (!planNombre) return 'solar'
  return planNombre.startsWith('Pack') ? 'solar' : 'camara'
}

export async function POST(request) {
  try {
    const { plan, fecha, hora, nombre, email, telefono, comuna, direccion, cantidad } = await request.json()

    const planData = PLANES[plan]
    if (!planData) return Response.json({ error: 'Plan inválido' }, { status: 400 })

    // Validar día hábil
    const allDays = generateWorkingDays()
    const validDay = allDays.find(s => s.fecha === fecha && s.hora === hora)
    if (!validDay) return Response.json({ error: 'Fecha/hora no disponible' }, { status: 400 })

    const cantidadNum = planData.tipo === 'camara' ? Math.max(1, parseInt(cantidad || 1, 10)) : 1
    const duracion = planData.tipo === 'camara' ? (cantidadNum > 5 ? 2 : 1) : 1
    const needed = getWorkingDaysFrom(fecha, duracion)

    // Reservas activas
    const existing = await db.select(
      'reservas',
      'estado=in.(pendiente_pago,pagado,confirmado)&select=fecha,hora,estado,plan_nombre,cantidad,created_at'
    )
    const now = Date.now()
    const active = existing.filter(r =>
      r.estado !== 'pendiente_pago' ||
      now - new Date(r.created_at).getTime() < TIMEOUT_MS
    )

    if (planData.tipo === 'solar') {
      // Solar: 1 por día
      if (active.some(r => getTipo(r.plan_nombre) === 'solar' && r.fecha === fecha)) {
        return Response.json({ error: 'Esa fecha ya está reservada. Por favor elige otro día.' }, { status: 409 })
      }
    } else {
      // Cámara: 1 cliente por día, verificar solapamiento con duracion
      for (const r of active) {
        if (getTipo(r.plan_nombre) !== 'camara') continue
        const rCantidad = r.cantidad || 1
        const rDuracion = rCantidad > 5 ? 2 : 1
        const rBlocked = getWorkingDaysFrom(r.fecha, rDuracion)
        if (needed.some(d => rBlocked.includes(d))) {
          return Response.json(
            { error: 'Esa fecha ya está reservada. Por favor elige otro día.' },
            { status: 409 }
          )
        }
      }
    }

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
      cantidad: cantidadNum,
    })

    return Response.json(reserva)
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
