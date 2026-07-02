import { db } from '../../../../lib/supabase'
import { generateWorkingDays, getWorkingDaysFrom, formatFechaCorta } from '../../../../lib/slots'

export const dynamic = 'force-dynamic'

const TIMEOUT_MS = 24 * 60 * 60 * 1000

// Solar = Pack*, Camara = Plan*
function getTipo(planNombre) {
  if (!planNombre) return 'solar'
  return planNombre.startsWith('Pack') ? 'solar' : 'camara'
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const plan = searchParams.get('plan') || 'pack-inicial'
    const cantidad = parseInt(searchParams.get('cantidad') || '1', 10)

    const esSolar = plan.startsWith('pack')
    const duracion = esSolar ? 1 : (cantidad > 5 ? 2 : 1)

    // Traer reservas activas con cantidad
    const reservas = await db.select(
      'reservas',
      'estado=in.(pendiente_pago,pagado,confirmado)&select=fecha,hora,estado,plan_nombre,cantidad,created_at'
    )
    const now = Date.now()
    const active = reservas.filter(r =>
      r.estado !== 'pendiente_pago' ||
      now - new Date(r.created_at).getTime() < TIMEOUT_MS
    )

    const workingDays = generateWorkingDays()

    const available = workingDays.filter(slot => {
      const needed = getWorkingDaysFrom(slot.fecha, duracion)

      if (esSolar) {
        // Solar: 1 día — verificar que no hay otra solar ese día
        for (const r of active) {
          if (getTipo(r.plan_nombre) !== 'solar') continue
          if (r.fecha === slot.fecha) return false
        }
        return true
      } else {
        // Cámara: 1 cliente por día, duracion según cantidad
        for (const r of active) {
          if (getTipo(r.plan_nombre) !== 'camara') continue
          const rCantidad = r.cantidad || 1
          const rDuracion = rCantidad > 5 ? 2 : 1
          const rBlocked = getWorkingDaysFrom(r.fecha, rDuracion)
          if (needed.some(d => rBlocked.includes(d))) return false
        }
        return true
      }
    })

    // Agregar endLabel para instalaciones de 2 días
    const result = available.map(slot => {
      if (duracion > 1) {
        const days = getWorkingDaysFrom(slot.fecha, duracion)
        const endFecha = days[days.length - 1]
        return { ...slot, duracion, endFecha, endLabel: formatFechaCorta(endFecha) }
      }
      return { ...slot, duracion: 1 }
    })

    return Response.json(result)
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
