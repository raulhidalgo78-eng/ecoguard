'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { CheckCircle, Calendar, MapPin, User, ChevronRight, Camera, Sun, Minus, Plus } from 'lucide-react'

const PLANES = [
  // Cámaras
  { id: 'plan-estandar',   nombre: 'Plan Estándar',   precio: '$499.000',   tag: 'Sobre estructura existente', tipo: 'camara' },
  { id: 'plan-integral',   nombre: 'Plan Integral',   precio: '$699.000',   tag: 'Con poste 75×75',           tipo: 'camara' },
  // Solar
  { id: 'pack-inicial',    nombre: 'Pack Inicial',    precio: '$2.290.000', tag: '1.83 kW · 5.12 kWh',       tipo: 'solar' },
  { id: 'pack-intermedio', nombre: 'Pack Intermedio', precio: '$3.790.000', tag: '3.66 kW · 10.24 kWh',      tipo: 'solar' },
  { id: 'pack-full',       nombre: 'Pack Full',       precio: '$5.590.000', tag: '6.1 kW · 15.36 kWh',       tipo: 'solar' },
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

  const defaultPlan = searchParams.get('plan') || 'pack-inicial'

  const [form, setForm] = useState({
    plan: PLANES.find(p => p.id === defaultPlan) ? defaultPlan : 'pack-inicial',
    cantidad: 1,
    fecha: '',
    hora: '',
    slotLabel: '',
    slotEndLabel: '',
    nombre: '',
    email: '',
    telefono: '',
    comuna: '',
    direccion: '',
  })

  const planSeleccionado = PLANES.find(p => p.id === form.plan)
  const esCamara = planSeleccionado?.tipo === 'camara'
  const duracionEstimada = esCamara ? (form.cantidad > 5 ? 2 : 1) : 1

  // Refetch slots cuando cambia plan o cantidad (cámaras)
  useEffect(() => {
    let cancelled = false
    setLoadingSlots(true)
    setSlots([])
    setForm(f => ({ ...f, fecha: '', hora: '', slotLabel: '', slotEndLabel: '' }))
    const url = `/api/agendar/slots?plan=${form.plan}&cantidad=${form.cantidad}`
    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (!cancelled) {
          setSlots(Array.isArray(data) ? data : [])
          setLoadingSlots(false)
        }
      })
      .catch(() => { if (!cancelled) setLoadingSlots(false) })
    return () => { cancelled = true }
  }, [form.plan, form.cantidad])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const setCantidad = (v) => {
    const n = Math.max(1, Math.min(20, v))
    setForm(f => ({ ...f, cantidad: n }))
  }

  const selectSlot = (slot) => {
    setForm(f => ({
      ...f,
      fecha: slot.fecha,
      hora: slot.hora,
      slotLabel: slot.label,
      slotEndLabel: slot.endLabel || '',
    }))
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
          cantidad: form.cantidad,
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

  const camaras = PLANES.filter(p => p.tipo === 'camara')
  const solares = PLANES.filter(p => p.tipo === 'solar')

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
          {[{ n:1, label:'Servicio y fecha' }, { n:2, label:'Tus datos' }, { n:3, label:'Pago' }].map((s, i) => (
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
              {/* Selector de servicio */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-green" /> Selecciona tu servicio
                </h2>

                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" /> Cámaras Solares
                </p>
                <div className="grid gap-2 mb-4">
                  {camaras.map(p => (
                    <button
                      key={p.id}
                      onClick={() => set('plan', p.id)}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all ${
                        form.plan === p.id ? 'border-brand-green bg-brand-green/5' : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div>
                        <p className={`font-bold ${form.plan === p.id ? 'text-brand-green' : 'text-gray-900'}`}>{p.nombre}</p>
                        <p className="text-xs text-gray-400 font-mono mt-0.5">{p.tag}</p>
                      </div>
                      <p className="font-black text-gray-900 shrink-0 ml-3">{p.precio}</p>
                    </button>
                  ))}
                </div>

                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5" /> Energía Solar
                </p>
                <div className="grid gap-2">
                  {solares.map(p => (
                    <button
                      key={p.id}
                      onClick={() => set('plan', p.id)}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all ${
                        form.plan === p.id ? 'border-brand-green bg-brand-green/5' : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div>
                        <p className={`font-bold ${form.plan === p.id ? 'text-brand-green' : 'text-gray-900'}`}>{p.nombre}</p>
                        <p className="text-xs text-gray-400 font-mono mt-0.5">{p.tag}</p>
                      </div>
                      <p className="font-black text-gray-900 shrink-0 ml-3">{p.precio}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cantidad de cámaras */}
              {esCamara && (
                <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
                  <p className="text-sm font-semibold text-gray-800 mb-3">¿Cuántas cámaras quieres instalar?</p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setCantidad(form.cantidad - 1)}
                      className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-brand-green hover:text-brand-green transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-2xl font-black text-gray-900 w-8 text-center">{form.cantidad}</span>
                    <button
                      onClick={() => setCantidad(form.cantidad + 1)}
                      className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-brand-green hover:text-brand-green transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <div className={`ml-2 text-sm font-medium px-3 py-1 rounded-full ${
                      duracionEstimada > 1
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-brand-green/10 text-brand-green'
                    }`}>
                      Instalación de {duracionEstimada} día{duracionEstimada > 1 ? 's' : ''}
                    </div>
                  </div>
                  {duracionEstimada > 1 && (
                    <p className="text-xs text-amber-600 mt-2">Para más de 5 cámaras la instalación requiere 2 días hábiles.</p>
                  )}
                </div>
              )}

              {/* Selector de fecha */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
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
                  <div className="grid gap-2 mt-3">
                    {slots.map(slot => {
                      const selected = form.fecha === slot.fecha
                      return (
                        <button
                          key={slot.fecha}
                          onClick={() => selectSlot(slot)}
                          className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                            selected ? 'border-brand-green bg-brand-green/5' : 'border-gray-100 hover:border-gray-200'
                          }`}
                        >
                          <div className="text-left">
                            <span className={`font-semibold ${selected ? 'text-brand-green' : 'text-gray-900'}`}>
                              {slot.label}
                              {slot.endLabel && (
                                <span className="font-normal text-gray-400"> → {slot.endLabel}</span>
                              )}
                            </span>
                          </div>
                          <span className={`text-sm font-mono px-3 py-1 rounded-full shrink-0 ml-3 ${
                            selected ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-600'
                          }`}>09:00</span>
                        </button>
                      )
                    })}
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
                <p className="text-sm font-semibold text-brand-green">
                  {planSeleccionado?.nombre}
                  {esCamara && ` · ${form.cantidad} cámara${form.cantidad > 1 ? 's' : ''}`}
                  {' · '}{planSeleccionado?.precio}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {form.slotLabel}
                  {form.slotEndLabel ? ` → ${form.slotEndLabel}` : ''}
                  {' · 09:00'}
                </p>
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
          Tu fecha queda reservada por 24 horas mientras completas el pago
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
