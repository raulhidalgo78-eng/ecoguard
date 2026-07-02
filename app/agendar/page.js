'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { CheckCircle, Calendar, MapPin, User, ChevronRight } from 'lucide-react'

const PLANES = [
  { id: 'pack-inicial',    nombre: 'Pack Inicial',    precio: '$2.290.000', tag: '1.83 kW · 5.12 kWh' },
  { id: 'pack-intermedio', nombre: 'Pack Intermedio', precio: '$3.790.000', tag: '3.66 kW · 10.24 kWh' },
  { id: 'pack-full',       nombre: 'Pack Full',       precio: '$5.590.000', tag: '6.1 kW · 15.36 kWh' },
]

const COMUNAS = [
  'Algarrobo','Cabildo','Calera','Calle Larga','Cartagena','Casablanca','Catemu',
  'Concón','El Quisco','El Tabo','Hijuelas','Juan Fernández','La Cruz','La Ligua',
  'Limache','Llaillay','Los Andes','Nogales','Olmué','Panquehue','Papudo','Petorca',
  'Putaendo','Quillota','Quilpué','Quintero','Rinconada','San Antonio','San Esteban',
  'San Felipe','Santa María','Santo Domingo','Valparaíso','Villa Alemana','Viña del Mar','Zapallar',
]

function AgendarContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [slots, setSlots] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    plan: searchParams.get('plan') || 'pack-inicial',
    fecha: '',
    hora: '',
    slotLabel: '',
    nombre: '',
    email: '',
    telefono: '',
    comuna: '',
    direccion: '',
  })

  useEffect(() => {
    fetch('/api/agendar/slots')
      .then(r => r.json())
      .then(data => { setSlots(data); setLoadingSlots(false) })
      .catch(() => setLoadingSlots(false))
  }, [])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const selectSlot = (slot) => {
    set('fecha', slot.fecha)
    set('hora', slot.hora)
    set('slotLabel', slot.label)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/agendar/reservar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: form.plan,
          fecha: form.fecha,
          hora: form.hora,
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono,
          comuna: form.comuna,
          direccion: form.direccion,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Error al crear reserva'); return }
      router.push(`/agendar/pago/${data.id}`)
    } catch {
      setError('Error de conexión. Intenta nuevamente.')
    } finally {
      setSubmitting(false)
    }
  }

  const planSeleccionado = PLANES.find(p => p.id === form.plan)

  return (
    <main className="min-h-screen bg-brand-gray py-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            Agenda tu instalación
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Reserva tu fecha</h1>
          <p className="text-gray-500">Solo atendemos en la Región de Valparaíso · Instalación profesional garantizada</p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[{ n:1, label:'Plan y fecha' }, { n:2, label:'Tus datos' }, { n:3, label:'Pago' }].map((s, i) => (
            <div key={s.n} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 ${step >= s.n ? 'text-brand-green' : 'text-gray-300'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= s.n ? 'bg-brand-green text-white' : 'bg-gray-200 text-gray-400'}`}>{s.n}</div>
                <span className="text-sm font-medium hidden sm:block">{s.label}</span>
              </div>
              {i < 2 && <ChevronRight className="w-4 h-4 text-gray-300" />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

          {/* PASO 1 */}
          {step === 1 && (
            <div>
              {/* Plan */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-green" /> Selecciona tu pack
                </h2>
                <div className="grid gap-3">
                  {PLANES.map(p => (
                    <button
                      key={p.id}
                      onClick={() => set('plan', p.id)}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all ${
                        form.plan === p.id
                          ? 'border-brand-green bg-brand-green/5'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div>
                        <p className={`font-bold ${form.plan === p.id ? 'text-brand-green' : 'text-gray-900'}`}>{p.nombre}</p>
                        <p className="text-xs text-gray-400 font-mono mt-0.5">{p.tag}</p>
                      </div>
                      <p className="font-black text-gray-900">{p.precio}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fecha */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-green" /> Elige tu fecha
                </h2>
                {loadingSlots ? (
                  <div className="text-center py-8 text-gray-400">Cargando disponibilidad...</div>
                ) : slots.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <p>No hay fechas disponibles en este momento.</p>
                    <p className="text-sm mt-1">Contáctanos a ventas@ecoguard.cl</p>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {slots.map(slot => (
                      <button
                        key={`${slot.fecha}_${slot.hora}`}
                        onClick={() => selectSlot(slot)}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                          form.fecha === slot.fecha && form.hora === slot.hora
                            ? 'border-brand-green bg-brand-green/5'
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <span className={`font-semibold ${form.fecha === slot.fecha && form.hora === slot.hora ? 'text-brand-green' : 'text-gray-900'}`}>
                          {slot.label}
                        </span>
                        <span className={`text-sm font-mono px-3 py-1 rounded-full ${
                          form.fecha === slot.fecha && form.hora === slot.hora
                            ? 'bg-brand-green text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}>{slot.hora}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!form.plan || !form.fecha}
                className="w-full py-3 rounded-xl font-bold text-white bg-brand-green hover:bg-brand-green-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continuar →
              </button>
            </div>
          )}

          {/* PASO 2 */}
          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <div className="mb-6 p-4 bg-brand-green/5 rounded-xl border border-brand-green/20">
                <p className="text-sm font-semibold text-brand-green">{planSeleccionado?.nombre} · {planSeleccionado?.precio}</p>
                <p className="text-xs text-gray-500 mt-0.5">{form.slotLabel} a las {form.hora}</p>
              </div>

              <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <User className="w-5 h-5 text-brand-green" /> Tus datos
              </h2>

              <div className="grid gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
                  <input required value={form.nombre} onChange={e => set('nombre', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-green" placeholder="Juan Pérez" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input required type="email" value={form.email} onChange={e => set('email', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-green" placeholder="juan@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                    <input required value={form.telefono} onChange={e => set('telefono', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-green" placeholder="+56 9 1234 5678" />
                  </div>
                </div>
              </div>

              <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-green" /> Lugar de instalación
              </h2>
              <p className="text-xs text-gray-400 mb-4">Solo atendemos en la Región de Valparaíso</p>

              <div className="grid gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Comuna *</label>
                  <select required value={form.comuna} onChange={e => set('comuna', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-green bg-white">
                    <option value="">Selecciona tu comuna</option>
                    {COMUNAS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dirección *</label>
                  <input required value={form.direccion} onChange={e => set('direccion', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-green" placeholder="Camino Los Boldos 1234, Parcela 5" />
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">{error}</div>
              )}

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-xl font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all">
                  ← Volver
                </button>
                <button type="submit" disabled={submitting}
                  className="flex-2 flex-grow py-3 rounded-xl font-bold text-white bg-brand-green hover:bg-brand-green-dark transition-all disabled:opacity-60">
                  {submitting ? 'Reservando...' : 'Confirmar y pagar →'}
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Tu horario queda reservado por 24 horas mientras completas el pago
        </p>
      </div>
    </main>
  )
}

export default function AgendarPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-gray flex items-center justify-center text-gray-400">Cargando...</div>}>
      <AgendarContent />
    </Suspense>
  )
}
