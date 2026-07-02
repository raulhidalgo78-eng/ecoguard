import { db } from '../../../../lib/supabase'
import { isAuthed, unauthorized } from '../../../../lib/adminAuth'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  if (!isAuthed(request)) return unauthorized()
  try {
    const data = await db.select(
      'reservas',
      'select=*&order=fecha.asc,hora.asc'
    )
    return Response.json(data)
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export async function PATCH(request) {
  if (!isAuthed(request)) return unauthorized()
  try {
    const { id, estado } = await request.json()
    if (!id || !estado) return Response.json({ error: 'Faltan datos' }, { status: 400 })
    const [updated] = await db.update('reservas', id, { estado })
    return Response.json(updated)
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
