'use client'

import Image from 'next/image'
import { Camera, Sun, CheckCircle } from 'lucide-react'

const camaras = {
  icon: Camera,
  color: 'bg-brand-green/10 text-brand-green',
  image: '/images/camara-4g-solar-01.png',
  imagePosition: 'center 40%',
  title: 'Cámaras Solares con 4G e IA',
  description: 'Vigilancia 24/7 completamente autónoma. Nuestras cámaras funcionan con energía solar, transmiten por 4G y detectan personas, vehículos y animales con inteligencia artificial.',
  features: ['Detección inteligente con IA', 'Transmisión 4G sin cable ni WiFi', 'Panel solar integrado + batería', 'Alertas en tiempo real al celular', 'Visión nocturna avanzada', 'Instalación profesional incluida'],
  planes: [
    {
      featured: true,
      badge: 'Más popular',
      name: 'Plan Estándar',
      tag: 'Sobre estructura existente',
      desc: 'Instalación sobre muro, fachada, poste o construcción ya disponible en tu propiedad.',
      precio: '$490.000',
      nota: 'Precio transferencia · IVA incluido · instalada',
      mpLink: 'https://mpago.la/1tVYaXP',
      items: ['Cámara Dahua Solar PTZ 4G doble lente', 'Tarjeta microSD 256 GB', 'SIM de datos activada', 'Instalación profesional', 'Configuración y puesta en marcha'],
    },
    {
      featured: false,
      badge: 'Llave en mano',
      name: 'Plan Integral',
      tag: 'Con poste 75×75',
      desc: 'Instalación completa con poste de acero 75×75 y base de hormigón.',
      precio: '$690.000',
      nota: 'Precio transferencia · IVA incluido · instalada',
      mpLink: 'https://mpago.la/1MgposN',
      items: ['Cámara Dahua Solar PTZ 4G doble lente', 'Tarjeta microSD 256 GB', 'SIM de datos activada', 'Poste de acero 75×75 con fundación', 'Instalación profesional + puesta en marcha'],
    },
  ],
}

const solar = {
  icon: Sun,
  color: 'bg-brand-solar/10 text-brand-solar-dark',
  image: '/images/instalacion-paneles.png',
  imagePosition: 'center',
  title: 'Sistemas Fotovoltaicos Llave en Mano',
  description: 'Energía solar para tu propiedad rural sin depender de la red. Diseñamos, instalamos y ponemos en marcha tu sistema fotovoltaico completo con respaldo de batería.',
  features: ['Diseño personalizado a tu consumo', 'Paneles Trina Solar N-TOPCon N-Type 720W', 'Baterías LiFePO4 ≥6.000 ciclos · 10 años', 'Instalación certificada', 'Puesta en marcha incluida', 'Asesoría y soporte post-venta'],
  planes: [
    {
      featured: false,
      badge: 'Entrada',
      name: 'Solar Hogar',
      tag: '4.3 kW · 4.8 kWh',
      desc: 'Para hogares y parcelas hasta ~150 kWh/mes. Consumo moderado sin depender de la red.',
      precio: '$3.490.000',
      nota: 'Precio transferencia · IVA incluido · instalado',
      mpLink: 'https://mpago.la/2vPPdij',
      items: ['6 paneles Trina Solar 720W N-TOPCon N-Type', 'Inversor híbrido', 'Batería LiFePO4 48V 100Ah · 4,8 kWh', 'Estructura aluminio, cableado y protecciones', 'Instalación y puesta en marcha'],
    },
    {
      featured: true,
      badge: '⭐ Recomendado',
      name: 'Solar Hogar+',
      tag: '8 kW · 9.6 kWh',
      desc: 'Para hogares de 150 a 300 kWh/mes. El equilibrio ideal entre potencia y autonomía.',
      precio: '$5.490.000',
      nota: 'Precio transferencia · IVA incluido · instalado',
      mpLink: 'https://mpago.la/2bLL29f',
      items: ['11 paneles Trina Solar 720W N-TOPCon N-Type', 'Inversor híbrido 10.2 kW MPPT', 'Batería LiFePO4 48V 200Ah · 9,6 kWh', 'Estructura aluminio, cableado y protecciones', 'Instalación y puesta en marcha'],
    },
    {
      featured: false,
      badge: 'Alto consumo',
      name: 'Solar Pro',
      tag: '12 kW · 19.2 kWh',
      desc: 'Para hogares sobre 300 kWh/mes. Máxima potencia para alto consumo o uso productivo.',
      precio: '$9.490.000',
      nota: 'Precio transferencia · IVA incluido · instalado',
      mpLink: 'https://mpago.la/1FWedZr',
      items: ['17 paneles Trina Solar 720W N-TOPCon N-Type', 'Inversor híbrido 10.2 kW MPPT', '2× Batería LiFePO4 48V 200Ah · 19,2 kWh', 'Estructura aluminio inclinada, cableado y protecciones', 'Instalación y puesta en marcha'],
    },
  ],
}

function PlanCard({ plan, accentColor }) {
  return (
    <div className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
      plan.featured ? 'bg-brand-dark border-brand-solar shadow-md' : 'bg-white border-gray-100 shadow-sm'
    }`}>
      <span className={`absolute -top-3 left-5 text-xs font-bold px-3 py-1 rounded-full ${
        plan.featured ? 'bg-brand-solar text-white' : 'bg-brand-green text-white'
      }`}>
        {plan.badge}
      </span>
      <h4 className={`text-lg font-bold mb-0.5 ${plan.featured ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h4>
      <p className={`text-xs font-mono uppercase tracking-wider mb-3 ${plan.featured ? 'text-brand-solar' : 'text-gray-400'}`}>{plan.tag}</p>
      <p className={`text-xs leading-relaxed mb-4 ${plan.featured ? 'text-white/60' : 'text-gray-500'}`}>{plan.desc}</p>
      <div className="mb-0.5">
        <span className={`text-3xl font-black ${plan.featured ? 'text-white' : 'text-gray-900'}`}>{plan.precio}</span>
      </div>
      <p className={`text-xs font-mono uppercase tracking-wider mb-4 ${plan.featured ? 'text-white/40' : 'text-gray-400'}`}>{plan.nota}</p>
      <ul className="space-y-2 flex-1 mb-5">
        {plan.items.map((item) => (
          <li key={item} className={`flex items-start gap-2 text-xs ${plan.featured ? 'text-white/75' : 'text-gray-600'}`}>
            <CheckCircle className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${plan.featured ? 'text-brand-solar' : 'text-brand-green'}`} />
            {item}
          </li>
        ))}
      </ul>
      <a href="#contacto" className={`inline-flex items-center justify-center font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 text-sm w-full ${
        plan.featured ? 'bg-brand-solar hover:bg-brand-solar-dark text-white' : 'bg-brand-green hover:bg-brand-green-dark text-white'
      }`}>
        Solicitar este plan
      </a>
      {plan.mpLink ? (
        <a
          href={plan.mpLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 text-sm w-full mt-2 border ${
            plan.featured
              ? 'border-white/20 text-white/70 hover:bg-white/10'
              : 'border-[#009EE3]/40 text-[#009EE3] hover:bg-[#009EE3]/5'
          }`}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="currentColor">
            <path d="M19.59 7.13C19.02 4.6 17.1 3 14.18 3H7.5C6.67 3 6 3.67 6 4.5v.09L4.27 16.5H7.5l.9-5.7h2.15c3.9 0 6.44-1.85 7.04-4.67zM9.2 9.05l.52-3.3h2.52c1.66 0 2.53.74 2.28 2.2-.22 1.3-1.35 1.97-3.1 1.97H9.2v-.87zM19.04 10.63c-.66 3.07-3.22 5.04-7.1 5.04H9.5l-.56 3.56H5.78L6 17.5H3l-.05.33c-.11.72.4 1.17.98 1.17H7.5l.94-5.96h2.5c5.13 0 8.22-2.44 9.03-6.41z"/>
          </svg>
          Pagar con Mercado Pago
        </a>
      ) : (
        <p className={`text-xs text-center mt-2 ${plan.featured ? 'text-white/30' : 'text-gray-400'}`}>
          4% dcto. pagando con transferencia
        </p>
      )}
    </div>
  )
}

function ServicioBloque({ servicio }) {
  const Icon = servicio.icon
  const esSolar = servicio.planes.length === 3

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Imagen */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/7] overflow-hidden">
        <Image
          src={servicio.image}
          alt={servicio.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          style={{ objectPosition: servicio.imagePosition }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Info del servicio */}
      <div className="p-8 pb-4">
        <div className={`w-12 h-12 ${servicio.color} rounded-2xl flex items-center justify-center mb-4`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{servicio.title}</h3>
        <p className="text-gray-600 leading-relaxed mb-5">{servicio.description}</p>
        <ul className={`grid grid-cols-2 gap-2 mb-8`}>
          {servicio.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0" />{f}
            </li>
          ))}
        </ul>
      </div>

      {/* Planes */}
      <div className={`px-8 pb-8 grid gap-5 ${esSolar ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
        {servicio.planes.map((plan) => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>
    </div>
  )
}

export default function ServiciosPrecios() {
  return (
    <section id="servicios" className="py-24 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            Servicios y Precios
          </div>
          <h2 className="section-title mb-4">Dos soluciones. Un solo proveedor.</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Integramos seguridad y energía en una propuesta completa para el campo chileno, sin depender de infraestructura existente.
          </p>
        </div>
        <div className="flex flex-col gap-10">
          <ServicioBloque servicio={camaras} />
          <ServicioBloque servicio={solar} />
        </div>
        <p className="text-center text-sm text-gray-400 mt-6">
          Precios referenciales · La distancia y condiciones del sitio pueden ajustar el valor final
        </p>
      </div>
    </section>
  )
}
