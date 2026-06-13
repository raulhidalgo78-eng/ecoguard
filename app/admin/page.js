'use client';

import { useEffect, useMemo, useState } from 'react';

const CLP = (n) => '$' + (Number(n) || 0).toLocaleString('es-CL');
const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const ESTADOS = ['Pendiente', 'Pagada', 'Vencida', 'Anulada'];
const ESTADO_COLOR = {
  Pendiente: 'bg-amber-100 text-amber-800',
  Pagada: 'bg-green-100 text-green-800',
  Vencida: 'bg-red-100 text-red-800',
  Anulada: 'bg-gray-200 text-gray-500',
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [tab, setTab] = useState('facturas');
  const [facturas, setFacturas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function cargar() {
    setLoading(true);
    setError('');
    try {
      const [rf, rc] = await Promise.all([
        fetch('/api/admin/facturas'),
        fetch('/api/admin/clientes'),
      ]);
      if (rf.status === 401) { setAuthed(false); return; }
      if (!rf.ok || !rc.ok) throw new Error('Error cargando datos');
      setFacturas(await rf.json());
      setClientes(await rc.json());
      setAuthed(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { cargar(); }, []);

  async function login(e) {
    e.preventDefault();
    setLoginError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) { setPassword(''); cargar(); }
    else setLoginError('Contraseña incorrecta');
  }

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-brand-gray px-4">
        <form onSubmit={login} className="bg-white rounded-xl shadow p-8 w-full max-w-sm">
          <h1 className="text-xl font-bold text-brand-dark mb-1">Panel EcoGuard</h1>
          <p className="text-sm text-gray-500 mb-6">Acceso administración</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-brand-green"
          />
          {loginError && <p className="text-sm text-red-600 mb-3">{loginError}</p>}
          <button className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-semibold rounded-lg py-2">
            Entrar
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-gray">
      <header className="bg-brand-dark text-white px-6 py-4 flex items-center justify-between">
        <h1 className="font-bold text-lg">EcoGuard · Facturación</h1>
        <nav className="flex gap-2">
          {[
            ['facturas', 'Facturas'],
            ['clientes', 'Clientes'],
            ['resumen', 'Resumen'],
          ].map(([k, label]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
                tab === k ? 'bg-brand-green text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {loading && <p className="text-gray-500 mb-4">Cargando…</p>}
        {tab === 'facturas' && (
          <Facturas facturas={facturas} clientes={clientes} onChange={cargar} />
        )}
        {tab === 'clientes' && <Clientes clientes={clientes} onChange={cargar} />}
        {tab === 'resumen' && <Resumen facturas={facturas} />}
      </div>
    </main>
  );
}

function Facturas({ facturas, clientes, onChange }) {
  const vacio = {
    folio: '', fecha_emision: new Date().toISOString().slice(0, 10),
    cliente_id: '', detalle: '', neto: '', forma_pago: 'Transferencia', fecha_vencimiento: '',
  };
  const [form, setForm] = useState(vacio);
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const neto = Math.round(Number(form.neto) || 0);

  async function guardar(e) {
    e.preventDefault();
    setSaving(true);
    await fetch('/api/admin/facturas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, cliente_id: form.cliente_id || null }),
    });
    setForm(vacio);
    setSaving(false);
    onChange();
  }

  async function cambiarEstado(f, estado) {
    const patch = { id: f.id, estado };
    if (estado === 'Pagada') patch.fecha_pago = new Date().toISOString().slice(0, 10);
    await fetch('/api/admin/facturas', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
    onChange();
  }

  return (
    <div className="space-y-6">
      <form onSubmit={guardar} className="bg-white rounded-xl shadow p-5 grid grid-cols-2 md:grid-cols-4 gap-3">
        <h2 className="col-span-2 md:col-span-4 font-semibold text-brand-dark">Registrar factura</h2>
        <input value={form.folio} onChange={set('folio')} placeholder="Folio" type="number" className="input-admin" />
        <input value={form.fecha_emision} onChange={set('fecha_emision')} type="date" className="input-admin" />
        <select value={form.cliente_id} onChange={set('cliente_id')} className="input-admin col-span-2">
          <option value="">— Cliente —</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>{c.razon_social} ({c.rut})</option>
          ))}
        </select>
        <input value={form.detalle} onChange={set('detalle')} placeholder="Detalle del servicio" className="input-admin col-span-2" />
        <input value={form.neto} onChange={set('neto')} placeholder="Neto $" type="number" required className="input-admin" />
        <div className="text-sm text-gray-500 self-center">
          IVA {CLP(Math.round(neto * 0.19))} · Total <b>{CLP(neto + Math.round(neto * 0.19))}</b>
        </div>
        <select value={form.forma_pago} onChange={set('forma_pago')} className="input-admin">
          <option>Transferencia</option><option>Contado</option><option>Crédito</option>
        </select>
        <input value={form.fecha_vencimiento} onChange={set('fecha_vencimiento')} type="date" className="input-admin" />
        <button disabled={saving} className="col-span-2 bg-brand-green hover:bg-brand-green-dark text-white font-semibold rounded-lg py-2">
          {saving ? 'Guardando…' : 'Guardar factura'}
        </button>
      </form>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="p-3">Folio</th><th className="p-3">Fecha</th><th className="p-3">Cliente</th>
              <th className="p-3">Detalle</th><th className="p-3 text-right">Neto</th>
              <th className="p-3 text-right">IVA</th><th className="p-3 text-right">Total</th>
              <th className="p-3">Vence</th><th className="p-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((f) => (
              <tr key={f.id} className="border-t border-gray-100">
                <td className="p-3">{f.folio ?? '—'}</td>
                <td className="p-3 whitespace-nowrap">{f.fecha_emision}</td>
                <td className="p-3">{f.clientes?.razon_social ?? '—'}</td>
                <td className="p-3 max-w-[220px] truncate" title={f.detalle}>{f.detalle}</td>
                <td className="p-3 text-right">{CLP(f.neto)}</td>
                <td className="p-3 text-right">{CLP(f.iva)}</td>
                <td className="p-3 text-right font-semibold">{CLP(f.total)}</td>
                <td className="p-3 whitespace-nowrap">{f.fecha_vencimiento ?? '—'}</td>
                <td className="p-3">
                  <select
                    value={f.estado}
                    onChange={(e) => cambiarEstado(f, e.target.value)}
                    className={`rounded-full px-2 py-1 text-xs font-medium ${ESTADO_COLOR[f.estado]}`}
                  >
                    {ESTADOS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {facturas.length === 0 && (
              <tr><td colSpan={9} className="p-6 text-center text-gray-400">Sin facturas registradas</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Clientes({ clientes, onChange }) {
  const vacio = { rut: '', razon_social: '', giro: '', direccion: '', comuna: '', ciudad: '', email: '', contacto: '', telefono: '' };
  const [form, setForm] = useState(vacio);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function guardar(e) {
    e.preventDefault();
    await fetch('/api/admin/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm(vacio);
    onChange();
  }

  async function eliminar(id) {
    if (!confirm('¿Eliminar este cliente?')) return;
    await fetch('/api/admin/clientes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    onChange();
  }

  return (
    <div className="space-y-6">
      <form onSubmit={guardar} className="bg-white rounded-xl shadow p-5 grid grid-cols-2 md:grid-cols-3 gap-3">
        <h2 className="col-span-2 md:col-span-3 font-semibold text-brand-dark">Nuevo cliente</h2>
        <input value={form.rut} onChange={set('rut')} placeholder="RUT (12.345.678-9)" required className="input-admin" />
        <input value={form.razon_social} onChange={set('razon_social')} placeholder="Razón social" required className="input-admin col-span-2" />
        <input value={form.giro} onChange={set('giro')} placeholder="Giro" className="input-admin" />
        <input value={form.direccion} onChange={set('direccion')} placeholder="Dirección" className="input-admin" />
        <input value={form.comuna} onChange={set('comuna')} placeholder="Comuna" className="input-admin" />
        <input value={form.ciudad} onChange={set('ciudad')} placeholder="Ciudad" className="input-admin" />
        <input value={form.email} onChange={set('email')} placeholder="Email" type="email" className="input-admin" />
        <input value={form.contacto} onChange={set('contacto')} placeholder="Contacto" className="input-admin" />
        <input value={form.telefono} onChange={set('telefono')} placeholder="Teléfono" className="input-admin" />
        <button className="col-span-2 bg-brand-green hover:bg-brand-green-dark text-white font-semibold rounded-lg py-2">
          Guardar cliente
        </button>
      </form>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="p-3">RUT</th><th className="p-3">Razón social</th><th className="p-3">Giro</th>
              <th className="p-3">Comuna</th><th className="p-3">Email</th><th className="p-3">Teléfono</th><th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id} className="border-t border-gray-100">
                <td className="p-3 whitespace-nowrap">{c.rut}</td>
                <td className="p-3">{c.razon_social}</td>
                <td className="p-3">{c.giro}</td>
                <td className="p-3">{c.comuna}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.telefono}</td>
                <td className="p-3">
                  <button onClick={() => eliminar(c.id)} className="text-red-500 hover:text-red-700 text-xs">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {clientes.length === 0 && (
              <tr><td colSpan={7} className="p-6 text-center text-gray-400">Sin clientes registrados</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Resumen({ facturas }) {
  const resumen = useMemo(() => {
    const map = {};
    for (const f of facturas) {
      if (f.estado === 'Anulada') continue;
      const key = (f.fecha_emision || '').slice(0, 7);
      if (!key) continue;
      map[key] ??= { n: 0, neto: 0, iva: 0, total: 0, pendiente: 0 };
      const m = map[key];
      m.n++; m.neto += f.neto; m.iva += f.iva; m.total += f.total;
      if (f.estado === 'Pendiente' || f.estado === 'Vencida') m.pendiente += f.total;
    }
    return Object.entries(map).sort((a, b) => b[0].localeCompare(a[0]));
  }, [facturas]);

  const tot = resumen.reduce(
    (a, [, m]) => ({ n: a.n + m.n, neto: a.neto + m.neto, iva: a.iva + m.iva, total: a.total + m.total, pendiente: a.pendiente + m.pendiente }),
    { n: 0, neto: 0, iva: 0, total: 0, pendiente: 0 }
  );

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 text-left">
          <tr>
            <th className="p-3">Mes</th><th className="p-3 text-right">N° Fact.</th>
            <th className="p-3 text-right">Neto</th><th className="p-3 text-right">IVA Débito (F29)</th>
            <th className="p-3 text-right">Total</th><th className="p-3 text-right">Pendiente de pago</th>
          </tr>
        </thead>
        <tbody>
          {resumen.map(([key, m]) => {
            const [y, mo] = key.split('-');
            return (
              <tr key={key} className="border-t border-gray-100">
                <td className="p-3 font-medium">{MESES[Number(mo) - 1]} {y}</td>
                <td className="p-3 text-right">{m.n}</td>
                <td className="p-3 text-right">{CLP(m.neto)}</td>
                <td className="p-3 text-right font-semibold text-brand-green">{CLP(m.iva)}</td>
                <td className="p-3 text-right">{CLP(m.total)}</td>
                <td className="p-3 text-right text-amber-700">{CLP(m.pendiente)}</td>
              </tr>
            );
          })}
          {resumen.length === 0 && (
            <tr><td colSpan={6} className="p-6 text-center text-gray-400">Sin datos aún</td></tr>
          )}
        </tbody>
        {resumen.length > 0 && (
          <tfoot className="bg-gray-50 font-semibold">
            <tr>
              <td className="p-3">TOTAL</td>
              <td className="p-3 text-right">{tot.n}</td>
              <td className="p-3 text-right">{CLP(tot.neto)}</td>
              <td className="p-3 text-right">{CLP(tot.iva)}</td>
              <td className="p-3 text-right">{CLP(tot.total)}</td>
              <td className="p-3 text-right">{CLP(tot.pendiente)}</td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
