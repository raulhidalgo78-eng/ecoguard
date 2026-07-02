'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Calendar, MapPin, Sun, Camera } from 'lucide-react'

export default function ConfirmadoPage() {
  const { id } = useParams()
  const [reserva, setReserva] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/agendar/reserva/${id}`)
      .then(r => r.json())
      .then(data => { setReserva(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return (
    <main className="min-h-screen bg-brand-gray flex items-center justify-center">
      <p className="text-gray-400">Cargando...</p>
    </main>
  )

  const fecha = reserva
    ? new Date(reserva.fecha + 'T12:00:00').toLocaleDateString('es-CL', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      })
    : ''

  const isSolar = reserva?.plan_nombre?.startsWith('Pack')
  const PlanIcon = isSolar ? Sun : Camera
  const iconColor = isSolar ? 'text-brand-solar' : 'text-brand-green'

  return (
    <main className="min-h-screen bg-brand-gray flex items-center justify-center px-4 py-16">
      <div className="max-w-md mx-auto text-center">

        <div className="w-20 h-20 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-brand-green" />
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-2">¡Todo listo!</h1>
        <p className="text-gray-500 mb-8">Tu instalación está confirmada. Te enviamos los detalles por email.</p>

        {reserva && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6 text-left space-y-3">
            <div className="flex gap-3 items-start">
              <PlanIcon className={`w-5 h-5 ${iconColor} shrink-0 mt-0.5`} />
              <div>
                <p className="font-semibold text-gray-900">{reserva.plan_nombre}</p>
                <p className="text-sm text-gray-500">${reserva.plan_precio.toLocaleString('es-CL')} · instalado</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <Calendar className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">{fecha} a las {reserva.hora}</p>
            </div>
            <div className="flex gap-3 items-start">
              <MapPin className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">{reserva.direccion}, {reserva.comuna}</p>
            </div>
            <div className="border-t border-gray-100 pt-3 text-xs text-gray-400">
              N° de reserva: <span className="font-mono">{id?.slice(0, 8).toUpperCase()}</span>
            </div>
          </div>
        )}

        <p className="text-sm text-gray-500 mb-6">
          Nuestro equipo se pondrá en contacto contigo para coordinar los detalles finales de la instalación.
        </p>

        <Link href="/" className="inline-flex items-center gap-2 text-brand-green font-semibold hover:underline">
          ← Volver al inicio
        </Link>
      </div>
    </main>
  )
}
