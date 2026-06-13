import crypto from 'crypto';

export function adminToken() {
  return crypto
    .createHash('sha256')
    .update('ecoguard-admin:' + (process.env.ADMIN_PASSWORD || ''))
    .digest('hex');
}

export function isAuthed(request) {
  if (!process.env.ADMIN_PASSWORD) return false;
  const cookie = request.cookies.get('eg_admin');
  return cookie?.value === adminToken();
}

export function unauthorized() {
  return Response.json({ error: 'No autorizado' }, { status: 401 });
}
