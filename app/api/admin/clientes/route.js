import { db } from '../../../../lib/supabase';
import { isAuthed, unauthorized } from '../../../../lib/adminAuth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  if (!isAuthed(request)) return unauthorized();
  try {
    const data = await db.select('clientes', 'select=*&order=razon_social.asc');
    return Response.json(data);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  if (!isAuthed(request)) return unauthorized();
  try {
    const body = await request.json();
    const data = await db.insert('clientes', body);
    return Response.json(data[0]);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  if (!isAuthed(request)) return unauthorized();
  try {
    const { id, ...patch } = await request.json();
    const data = await db.update('clientes', id, patch);
    return Response.json(data[0]);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!isAuthed(request)) return unauthorized();
  try {
    const { id } = await request.json();
    await db.remove('clientes', id);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
