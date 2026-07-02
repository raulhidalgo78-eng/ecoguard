'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, CreditCard, Building2, Clock, MapPin } from 'lucide-react'

export default function PagoPage() {
  const { id } = useParams()
  const [reserva, setReserva] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/agendar/reserva/${id}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) setError(data.error)
        else setReserva(data)
        setLoading(false)
      })
      .catch(() => { setError('Error de conexión'); setLoading(false) })
  }, [id])

  if (loading) return (
    <main className="min-h-screen bg-brand-gray flex items-center justify-center">
      <p className="text-gray-400">Cargando reserva...</p>
    </main>
  )

  if (error) return (
    <main className="min-h-screen bg-brand-gray flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-red-500 font-medium mb-2">{error}</p>
        <Link href="/agendar" className="text-brand-green underline text-sm">Volver a agendar</Link>
      </div>
    </main>
  )

  const fecha = new Date(reserva.fecha + 'T12:00:00').toLocaleDateString('es-CL', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  const precioFormateado = `$${reserva.plan_precio.toLocaleString('es-CL')}`

  const isPagado = reserva.estado === 'pagado' || reserva.estado === 'confirmado'

  return (
    <main className="min-h-screen bg-brand-gray py-16 px-4">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          {isPagado ? (
            <>
              <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-brand-green" />
              </div>
              <h1 className="text-2xl font-black text-gray-900 mb-1">¡Pago confirmado!</h1>
              <p className="text-gray-500">Te enviamos los detalles a {reserva.email}</p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 bg-brand-solar/10 text-brand-solar-dark rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                <Clock className="w-4 h-4" /> Reserva pendiente de pago
              </div>
              <h1 className="text-2xl font-black text-gray-900 mb-1">Completa tu reserva</h1>
              <p className="text-gray-500">Tu horario está reservado por 24 horas</p>
            </>
          )}
        </div>

        {/* Resumen */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-4">
          <h2 className="text-base font-bold text-gray-900 mb-4">Resumen de tu reserva</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Pack</span>
              <span className="font-semibold text-gray-900">{reserva.plan_nombre}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total</span>
              <span className="font-black text-gray-900 text-base">{precioFormateado}</span>
            </div>
            <div className="border-t border-gray-100 pt-3 mt-1">
              <div className="flex gap-2 text-gray-600">
                <CheckCircle className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                <span>{fecha} a las {reserva.hora}</span>
              </div>
              <div className="flex gap-2 text-gray-600 mt-2">
                <MapPin className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                <span>{reserva.direccion}, {reserva.comuna}</span>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-3">
              <p className="text-gray-500">Cliente: <span className="text-gray-900 font-medium">{reserva.nombre}</span></p>
              <p className="text-gray-500">Email: <span className="text-gray-900 font-medium">{reserva.email}</span></p>
            </div>
          </div>
        </div>

        {!isPagado && (
          <>
            {/* Pago con tarjeta */}
            {reserva.mpInitPoint && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="w-5 h-5 text-brand-green" />
                  <h2 className="text-base font-bold text-gray-900">Pagar con tarjeta</h2>
                </div>
                <p className="text-sm text-gray-500 mb-4">Pago seguro a través de Mercado Pago. Acepta débito, crédito y cuotas.</p>
                <a
                  href={reserva.mpInitPoint}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white bg-brand-green hover:bg-brand-green-dark transition-all"
                >
                  <CreditCard className="w-4 h-4" />
                  Pagar {precioFormateado} con tarjeta
                </a>
              </div>
            )}

            {/* Transferencia */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-5 h-5 text-brand-solar-dark" />
                <h2 className="text-base font-bold text-gray-900">Transferencia o depósito</h2>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Obtén un descuento pagando por transferencia. Envía el comprobante a <span className="font-medium text-gray-700">ventas@ecoguard.cl</span> con tu nombre y número de reserva.
              </p>
              <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-500">Banco</span>
                  <span className="font-semibold text-gray-900">BancoEstado</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Cuenta</span>
                  <span className="font-semibold text-gray-900">Cuenta RUT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">RUT</span>
                  <span className="font-semibold text-gray-900">78.433.166-0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Titular</span>
                  <span className="font-semibold text-gray-900">Aconcagua Tec. e Inn. SpA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Monto</span>
                  <span className="font-black text-brand-solar-dark">{precioFormateado}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Asunto</span>
                  <span className="font-semibold text-gray-900 break-all">{id.slice(0, 8).toUpperCase()}</span>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-gray-400 mt-4">
              Ante cualquier consulta escríbenos a ventas@ecoguard.cl
            </p>
          </>
        )}

        {isPagado && (
          <div className="bg-brand-green/5 border border-brand-green/20 rounded-3xl p-6 text-center">
            <p className="text-sm text-gray-700 mb-1">¡Listo! Nos pondremos en contacto contigo para coordinar los últimos detalles de la instalación.</p>
            <p className="text-xs text-gray-400 mt-2">N° de reserva: <span className="font-mono">{id.slice(0, 8).toUpperCase()}</span></p>
          </div>
        )}
      </div>
    </main>
  )
}
