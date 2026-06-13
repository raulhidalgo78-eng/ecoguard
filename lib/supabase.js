// Cliente mínimo de Supabase vía REST (PostgREST) — sin dependencias.
const URL_BASE = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function sb(path, { method = 'GET', body, headers = {} } = {}) {
  const res = await fetch(`${URL_BASE}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Supabase ${res.status}: ${txt}`);
  }
  return res.status === 204 ? null : res.json();
}

export const db = {
  select: (table, query = '') => sb(`${table}?${query}`),
  insert: (table, row) => sb(table, { method: 'POST', body: row }),
  update: (table, idEq, patch) =>
    sb(`${table}?id=eq.${idEq}`, { method: 'PATCH', body: patch }),
  remove: (table, idEq) => sb(`${table}?id=eq.${idEq}`, { method: 'DELETE' }),
};
