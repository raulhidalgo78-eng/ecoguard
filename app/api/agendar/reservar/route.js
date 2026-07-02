import { db } from '../../../../lib/supabase'
import { generateWorkingDays, getWorkingDaysFrom } from '../../../../lib/slots'

export const dynamic = 'force-dynamic'

const TIMEOUT_MS = 24 * 60 * 60 * 1000

const PLANES = {
  'pack-inicial':    { nombre: 'Pack Inicial',    precio: 2290000, tipo: 'solar',            duracion: 1 },
  'pack-intermedio': { nombre: 'Pack Intermedio', precio: 3790000, tipo: 'solar',            duracion: 2 },
  'pack-full':       { nombre: 'Pack Full',       precio: 5590000, tipo: 'solar',            duracion: 2 },
  'plan-estandar':   { nombre: 'Plan Estándar',   precio: 499000,  tipo: 'camara-sin-poste', duracion: 1 },
  'plan-integral':   { nombre: 'Plan Integral',   precio: 699000,  tipo: 'camara-con-poste', duracion: 1 },
}

const CAPACIDAD = {
  'camara-con-poste': 4,
  'camara-sin-poste': 6,
}

// Obtiene tipo desde plan_nombre (para reservas existentes en DB)
function getTipo(planNombre) {
  const map = {
    'Pack Inicial': 'solar', 'Pack Intermedio': 'solar', 'Pack Full': 'solar',
    'Plan Estándar': 'camara-sin-poste', 'Plan Integral': 'camara-con-poste',
  }
  return map[planNombre] || 'solar'
}

// Obtiene duración desde plan_nombre
function getDuracion(planNombre) {
  const map = { 'Pack Inicial': 1, 'Pack Intermedio': 2, 'Pack Full': 2,
    'Plan Estándar': 1, 'Plan Integral': 1 }
  return map[planNombre] || 1
}

export async function POST(request) {
  try {
    const { plan, fecha, hora, nombre, email, telefono, comuna, direccion } = await request.json()

    // Validar plan
    const planData = PLANES[plan]
    if (!planData) return Response.json({ error: 'Plan inválido' }, { status: 400 })

    // Validar que es un día hábil válido (hora debe ser 09:00)
    const allDays = generateWorkingDays()
    const validDay = allDays.find(s => s.fecha === fecha && s.hora === hora)
    if (!validDay) return Response.json({ error: 'Fecha/hora no disponible' }, { status: 400 })

    // Obtener reservas activas
    const existing = await db.select(
      'reservas',
      'estado=in.(pendiente_pago,pagado,confirmado)&select=fecha,hora,estado,plan_nombre,created_at'
    )
    const now = Date.now()
    const active = existing.filter(r =>
      r.estado !== 'pendiente_pago' ||
      now - new Date(r.created_at).getTime() < TIMEOUT_MS
    )

    if (planData.tipo === 'solar') {
      // Verificar que todos los días necesarios están libres de solar
      const needed = getWorkingDaysFrom(fecha, planData.duracion)
      for (const r of active) {
        if (getTipo(r.plan_nombre) !== 'solar') continue
        const rBlocked = getWorkingDaysFrom(r.fecha, getDuracion(r.plan_nombre))
        if (needed.some(d => rBlocked.includes(d))) {
          return Response.json(
            { error: 'Una o más fechas ya están reservadas. Por favor elige otro día.' },
            { status: 409 }
          )
        }
      }
    } else {
      // Cámara: verificar capacidad del día
      const cap = CAPACIDAD[planData.tipo]
      const count = active.filter(r =>
        r.fecha === fecha && getTipo(r.plan_nombre) === planData.tipo
      ).length
      if (count >= cap) {
        return Response.json(
          { error: 'No hay más cupos disponibles para esa fecha. Por favor elige otro día.' },
          { status: 409 }
        )
      }
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
