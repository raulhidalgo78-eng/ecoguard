import { adminToken } from '../../../../lib/adminAuth';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const { password } = await request.json();
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Contraseña incorrecta' }, { status: 401 });
  }
  const res = Response.json({ ok: true });
  res.headers.set(
    'Set-Cookie',
    `eg_admin=${adminToken()}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax; Secure`
  );
  return res;
}
