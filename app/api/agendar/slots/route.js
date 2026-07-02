import { db } from '../../../../lib/supabase'
import { generateWorkingDays, getWorkingDaysFrom, formatFechaCorta } from '../../../../lib/slots'

export const dynamic = 'force-dynamic'

const TIMEOUT_MS = 24 * 60 * 60 * 1000

// Mapa plan_nombre → tipo y duración
const PLAN_INFO = {
  'Pack Inicial':    { tipo: 'solar',            duracion: 1 },
  'Pack Intermedio': { tipo: 'solar',            duracion: 2 },
  'Pack Full':       { tipo: 'solar',            duracion: 2 },
  'Plan Estándar':   { tipo: 'camara-sin-poste', duracion: 1 },
  'Plan Integral':   { tipo: 'camara-con-poste', duracion: 1 },
}

const PLAN_ID_TO_NOMBRE = {
  'pack-inicial':    'Pack Inicial',
  'pack-intermedio': 'Pack Intermedio',
  'pack-full':       'Pack Full',
  'plan-estandar':   'Plan Estándar',
  'plan-integral':   'Plan Integral',
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const planId = searchParams.get('plan') || 'pack-inicial'
    const planNombre = PLAN_ID_TO_NOMBRE[planId] || 'Pack Inicial'
    const planInfo = PLAN_INFO[planNombre]

    // Traer reservas activas (excluir canceladas)
    const reservas = await db.select(
      'reservas',
      'estado=in.(pendiente_pago,pagado,confirmado)&select=fecha,hora,estado,plan_nombre,created_at'
    )
    const now = Date.now()
    const active = reservas.filter(r =>
      r.estado !== 'pendiente_pago' ||
      now - new Date(r.created_at).getTime() < TIMEOUT_MS
    )

    const workingDays = generateWorkingDays()

    const available = workingDays.filter(slot => {
      if (planInfo.tipo === 'solar') {
        // Días que bloquearía esta reserva
        const needed = getWorkingDaysFrom(slot.fecha, planInfo.duracion)
        // Comparar contra días bloqueados por reservas solar activas
        for (const r of active) {
          const rInfo = PLAN_INFO[r.plan_nombre]
          if (!rInfo || rInfo.tipo !== 'solar') continue
          const rBlocked = getWorkingDaysFrom(r.fecha, rInfo.duracion)
          if (needed.some(d => rBlocked.includes(d))) return false
        }
        return true

      } else if (planInfo.tipo === 'camara-con-poste') {
        const count = active.filter(r =>
          r.fecha === slot.fecha &&
          PLAN_INFO[r.plan_nombre]?.tipo === 'camara-con-poste'
        ).length
        return count < 4

      } else { // camara-sin-poste
        const count = active.filter(r =>
          r.fecha === slot.fecha &&
          PLAN_INFO[r.plan_nombre]?.tipo === 'camara-sin-poste'
        ).length
        return count < 6
      }
    })

    // Para packs de 2 días agregar label de fecha fin
    const result = available.map(slot => {
      if (planInfo.duracion > 1) {
        const days = getWorkingDaysFrom(slot.fecha, planInfo.duracion)
        const endFecha = days[days.length - 1]
        const endLabel = formatFechaCorta(endFecha)
        return { ...slot, duracion: planInfo.duracion, endFecha, endLabel }
      }
      return { ...slot, duracion: 1 }
    })

    return Response.json(result)
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
