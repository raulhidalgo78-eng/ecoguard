'use client'

import { useState } from 'react'
import { X, FileText, CheckCircle, Minus, Plus } from 'lucide-react'

const COMUNAS = [
  'Algarrobo','Cabildo','Calera','Calle Larga','Cartagena','Casablanca','Catemu',
  'Concón','El Quisco','El Tabo','Hijuelas','Juan Fernández','La Cruz','La Ligua',
  'Limache','Llaillay','Los Andes','Nogales','Olmué','Panquehue','Papudo','Petorca',
  'Putaendo','Quillota','Quilpué','Quintero','Rinconada','San Antonio','San Esteban',
  'San Felipe','Santa María','Santo Domingo','Valparaíso','Villa Alemana','Viña del Mar','Zapallar',
]

export default function CotizarModal({ plan, onClose }) {
  const esCamara = plan.id.startsWith('plan')

  const [form, setForm] = useState({
    nombre: '', rut: '', email: '', telefono: '',
    direccion: '', comuna: '', cantidad: 1,
  })
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [numero, setNumero]     = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const setCant = v => set('cantidad', Math.max(1, Math.min(20, v)))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/cotizar', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ planId: plan.id, ...form }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Error al generar cotización'); return }

      // Descarga automática del PDF
      if (data.pdf) {
        const bytes = Uint8Array.from(atob(data.pdf), c => c.charCodeAt(0))
        const blob  = new Blob([bytes], { type: 'application/pdf' })
        const url   = URL.createObjectURL(blob)
        const a     = document.createElement('a')
        a.href      = url
        a.download  = data.filename || `Cotizacion-EcoGuard-${data.numero}.pdf`
        a.click()
        URL.revokeObjectURL(url)
      }

      setNumero(data.numero)
    } catch {
      setError('Error de conexión. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-brand-green" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Solicitar cotización</h2>
              <p className="text-xs text-gray-400">{plan.nombre}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Éxito */}
          {numero ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-brand-green" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">¡Cotización enviada!</h3>
              <p className="text-gray-500 text-sm mb-1">Número de cotización: <span className="font-mono font-bold text-gray-900">{numero}</span></p>
              <p className="text-gray-500 text-sm mb-6">
                Tu cotización PDF se descargó automáticamente. Válida por 30 días,
                apta para solicitar crédito verde en la banca.
              </p>
              <button onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-brand-green text-white font-semibold hover:bg-brand-green-dark transition-all">
                Cerrar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Cantidad cámaras */}
              {esCamara && (
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-sm font-semibold text-gray-700 mb-3">¿Cuántas cámaras necesitas?</p>
                  <div className="flex items-center gap-4">
                    <button type="button" onClick={() => setCant(form.cantidad - 1)}
                      className="w-9 h-9 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-brand-green hover:text-brand-green transition-all">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-2xl font-black text-gray-900 w-8 text-center">{form.cantidad}</span>
                    <button type="button" onClick={() => setCant(form.cantidad + 1)}
                      className="w-9 h-9 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-brand-green hover:text-brand-green transition-all">
                      <Plus className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-gray-400 ml-1">
                      Total: <strong className="text-gray-900">${(499000 * form.cantidad * (plan.id === 'plan-integral' ? 699000/499000 : 1)).toLocaleString('es-CL')}</strong>
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
                <input required value={form.nombre} onChange={e => set('nombre', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-green"
                  placeholder="Juan Pérez González" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">RUT *</label>
                <input required value={form.rut} onChange={e => set('rut', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-green"
                  placeholder="12.345.678-9" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input required type="email" value={form.email} onChange={e => set('email', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-green"
                    placeholder="juan@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                  <input required value={form.telefono} onChange={e => set('telefono', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-green"
                    placeholder="+56 9 1234 5678" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comuna *</label>
                <select required value={form.comuna} onChange={e => set('comuna', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-green bg-white">
                  <option value="">Selecciona tu comuna</option>
                  {COMUNAS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección de instalación *</label>
                <input required value={form.direccion} onChange={e => set('direccion', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-green"
                  placeholder="Camino Los Boldos 1234, Parcela 5" />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">{error}</div>
              )}

              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-white bg-brand-green hover:bg-brand-green-dark transition-all disabled:opacity-60">
                {loading ? 'Generando PDF...' : 'Recibir cotización por email →'}
              </button>

              <p className="text-xs text-center text-gray-400">
                El PDF se envía al instante · Válido 30 días · Apto para crédito verde bancario
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
