'use client'

import { CheckCircle, Star } from 'lucide-react'

const planesCamaras = [
  {
    badge: 'Más popular',
    badgeColor: 'bg-brand-solar text-white',
    featured: true,
    name: 'Plan Estándar',
    tag: 'Sobre estructura existente',
    desc: 'Instalación de la cámara sobre muro, fachada, poste o construcción ya disponible en tu propiedad.',
    precio: '$500.000',
    nota: 'IVA incluido · instalada',
    items: [
      'Cámara Dahua Solar PTZ 4G doble lente',
      'Tarjeta microSD 256 GB',
      'SIM de datos activada',
      'Instalación profesional',
      'Configuración y puesta en marcha',
    ],
    cta: 'Solicitar este plan',
    ctaStyle: 'btn-primary',
  },
  {
    badge: 'Llave en mano',
    badgeColor: 'bg-brand-green text-white',
    featured: false,
    name: 'Plan Integral',
    tag: 'Con poste 75×75',
    desc: 'Instalación completa con poste de acero 75×75 y base de hormigón. Para cuando no hay dónde montar o necesitas más altura.',
    precio: '$700.000',
    nota: 'IVA incluido · instalada',
    items: [
      'Cámara Dahua Solar PTZ 4G doble lente',
      'Tarjeta microSD 256 GB',
      'SIM de datos activada',
      'Poste de acero 75×75 con fundación',
      'Instalación profesional + puesta en marcha',
    ],
    cta: 'Solicitar este plan',
    ctaStyle: 'btn-solar',
  },
]

const planesSolar = [
  {
    badge: 'Entrada',
    badgeColor: 'bg-brand-solar text-white',
    featured: false,
    name: 'Solar Hogar',
    tag: '4.3 kW · 4.8 kWh',
    desc: 'Solución de entrada para hogares y parcelas de consumo moderado, con respaldo de batería.',
    precio: '$3.482.500',
    nota: 'IVA incluido · instalado',
    items: [
      '6 paneles Trina 720W N-TOPCon',
      'Inversor híbrido (gestiona batería)',
      'Batería litio LiFePO4 4,8 kWh',
      'Estructura aluminio, cableado y protecciones DC/AC',
      'Instalación y puesta en marcha',
    ],
    cta: 'Cotizar',
    ctaStyle: 'btn-primary',
  },
  {
    badge: '⭐ Recomendado',
    badgeColor: 'bg-brand-solar text-white',
    featured: true,
    name: 'Solar Hogar+',
    tag: '8 kW · 9.6 kWh',
    desc: 'El equilibrio ideal entre potencia y autonomía. Cubre electrodomésticos exigentes con respaldo robusto.',
    precio: '$5.551.600',
    nota: 'IVA incluido · instalado',
    items: [
      '11 paneles Trina 720W N-TOPCon',
      'Inversor híbrido 10 kW (3 MPPT)',
      'Batería litio LiFePO4 9,6 kWh',
      'Estructura aluminio, cableado y protecciones DC/AC',
      'Instalación y puesta en marcha',
    ],
    cta: 'Cotizar',
    ctaStyle: 'btn-solar',
  },
  {
    badge: 'Alto consumo',
    badgeColor: 'bg-brand-green text-white',
    featured: false,
    name: 'Solar Pro',
    tag: '12 kW · 19.2 kWh',
    desc: 'Máxima potencia y almacenamiento para grandes propiedades o uso productivo y agrícola.',
    precio: '$9.405.800',
    nota: 'IVA incluido · instalado',
    items: [
      '17 paneles Trina 720W N-TOPCon',
      'Inversor híbrido 10 kW (3 MPPT)',
      '19,2 kWh en baterías litio LiFePO4',
      'Estructura inclinada, cableado y protecciones DC/AC',
      'Instalación y puesta en marcha',
    ],
    cta: 'Cotizar',
    ctaStyle: 'btn-primary',
  },
]

function PlanCard({ plan }) {
  return (
    <div className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
      plan.featured
        ? 'bg-brand-dark border-brand-solar shadow-md'
        : 'bg-white border-gray-100 shadow-sm'
    }`}>
      {/* Badge */}
      <span className={`absolute -top-3 left-6 text-xs font-bold px-3 py-1 rounded-full ${plan.badgeColor}`}>
        {plan.badge}
      </span>

      <h3 className={`text-2xl font-bold mb-1 ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
        {plan.name}
      </h3>
      <p className={`text-xs font-mono uppercase tracking-wider mb-4 ${plan.featured ? 'text-brand-solar' : 'text-gray-400'}`}>
        {plan.tag}
      </p>
      <p className={`text-sm leading-relaxed mb-6 ${plan.featured ? 'text-white/70' : 'text-gray-500'}`}>
        {plan.desc}
      </p>

      {/* Price */}
      <div className="mb-1">
        <span className={`text-4xl font-black ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
          {plan.precio}
        </span>
      </div>
      <p className={`text-xs font-mono uppercase tracking-wider mb-6 ${plan.featured ? 'text-white/50' : 'text-gray-400'}`}>
        {plan.nota}
      </p>

      {/* Features */}
      <ul className="space-y-3 flex-1 mb-8">
        {plan.items.map((item) => (
          <li key={item} className={`flex items-start gap-3 text-sm ${plan.featured ? 'text-white/80' : 'text-gray-600'}`}>
            <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.featured ? 'text-brand-solar' : 'text-brand-green'}`} />
            {item}
          </li>
        ))}
      </ul>

      <a href="#contacto" className={`${plan.ctaStyle} w-full justify-center`}>
        {plan.cta}
      </a>
    </div>
  )
}

export default function Precios() {
  return (
    <section id="precios" className="py-24 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cámaras */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              01 · Cámaras de Seguridad
            </div>
            <h2 className="section-title mb-3">Elige cómo la instalamos</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Cámara Dahua Solar PTZ 4G con doble lente e IA. Dos planes según tu propiedad.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {planesCamaras.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>

        {/* Solar */}
        <div>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-brand-solar/10 text-brand-solar-dark rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              02 · Energía Solar
            </div>
            <h2 className="section-title mb-3">Sistemas fotovoltaicos llave en mano</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Paneles Trina N-TOPCon + inversor híbrido + baterías LiFePO4. Instalados por nuestro equipo en Valparaíso.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {planesSolar.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-6">
            Precios referenciales · La distancia y condiciones del techo pueden ajustar el valor final
          </p>
        </div>

      </div>
    </section>
  )
}
