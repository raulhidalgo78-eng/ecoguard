import { db } from '../../../../lib/supabase';
import { isAuthed, unauthorized } from '../../../../lib/adminAuth';

export const dynamic = 'force-dynamic';

const IVA = 0.19;

export async function GET(request) {
  if (!isAuthed(request)) return unauthorized();
  try {
    const data = await db.select(
      'facturas',
      'select=*,clientes(razon_social,rut)&order=fecha_emision.desc,created_at.desc'
    );
    return Response.json(data);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  if (!isAuthed(request)) return unauthorized();
  try {
    const body = await request.json();
    const neto = Math.round(Number(body.neto) || 0);
    const iva = Math.round(neto * IVA);
    const row = {
      folio: body.folio ? Number(body.folio) : null,
      fecha_emision: body.fecha_emision || new Date().toISOString().slice(0, 10),
      cliente_id: body.cliente_id || null,
      detalle: body.detalle || '',
      neto,
      iva,
      total: neto + iva,
      forma_pago: body.forma_pago || 'Transferencia',
      fecha_vencimiento: body.fecha_vencimiento || null,
      estado: body.estado || 'Pendiente',
    };
    const data = await db.insert('facturas', row);
    return Response.json(data[0]);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  if (!isAuthed(request)) return unauthorized();
  try {
    const { id, ...patch } = await request.json();
    if (patch.neto !== undefined) {
      const neto = Math.round(Number(patch.neto) || 0);
      patch.neto = neto;
      patch.iva = Math.round(neto * IVA);
      patch.total = neto + patch.iva;
    }
    const data = await db.update('facturas', id, patch);
    return Response.json(data[0]);
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
