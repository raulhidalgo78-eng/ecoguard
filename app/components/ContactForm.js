'use client'

import { useState } from 'react'
import { ChevronRight, CheckCircle, AlertCircle } from 'lucide-react'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mkoaogpl'

export default function ContactForm() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.target)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      if (res.ok) { setStatus('success'); e.target.reset() } else { setStatus('error') }
    } catch { setStatus('error') }
  }

  if (status === 'success') return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="w-9 h-9 text-brand-green" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">¡Solicitud enviada!</h3>
      <p className="text-gray-500 max-w-xs">Te contactaremos dentro de 24 horas hábiles para preparar tu cotización.</p>
      <button onClick={() => setStatus('idle')} className="mt-6 text-sm text-brand-green hover:underline">Enviar otra solicitud</button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre</label>
          <input type="text" name="nombre" required placeholder="Tu nombre" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Teléfono</label>
          <input type="tel" name="telefono" required placeholder="+56 9 7151 6101" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-colors" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
        <input type="email" name="email" required placeholder="tu@email.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-colors" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">¿Qué necesitas?</label>
        <select name="servicio" required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-colors">
          <option value="">Selecciona una opción</option>
          <option value="Cámaras solares con 4G e IA">Cámaras solares con 4G e IA</option>
          <option value="Sistema fotovoltaico">Sistema fotovoltaico</option>
          <option value="Ambos servicios">Ambos servicios</option>
          <option value="Solo información">Solo quiero información</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Cuéntanos de tu propiedad</label>
        <textarea name="mensaje" rows={4} placeholder="Tipo de propiedad, ubicación (comuna), necesidades específicas..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-colors resize-none" />
      </div>
      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Hubo un error al enviar. Intenta de nuevo o escríbenos directamente.
        </div>
      )}
      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed">
        {status === 'sending' ? 'Enviando...' : 'Enviar solicitud'}
        {status !== 'sending' && <ChevronRight className="w-5 h-5" />}
      </button>
      <p className="text-xs text-gray-400 text-center">Te respondemos dentro de 24 horas hábiles. Sin costo ni compromiso.</p>
    </form>
  )
}
