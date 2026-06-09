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
      nota: 'IVA incluido · instalada',
      items: ['Cámara Dahua Solar PTZ 4G doble lente', 'Tarjeta microSD 256 GB', 'SIM de datos activada', 'Instalación profesional', 'Configuración y puesta en marcha'],
    },
    {
      featured: false,
      badge: 'Llave en mano',
      name: 'Plan Integral',
      tag: 'Con poste 75×75',
      desc: 'Instalación completa con poste de acero 75×75 y base de hormigón.',
      precio: '$690.000',
      nota: 'IVA incluido · instalada',
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
  features: ['Diseño personalizado a tu consumo', 'Paneles solares de alta eficiencia', 'Baterías de litio con respaldo', 'Instalación certificada', 'Puesta en marcha incluida', 'Asesoría y soporte post-venta'],
  planes: [
    {
      featured: false,
      badge: 'Entrada',
      name: 'Solar Hogar',
      tag: '4.3 kW · 4.8 kWh',
      desc: 'Para hogares y parcelas de consumo moderado.',
      precio: '$3.490.000',
      nota: 'IVA incluido · instalado',
      items: ['6 paneles Trina 720W N-TOPCon', 'Inversor híbrido', 'Batería litio LiFePO4 4,8 kWh', 'Estructura, cableado y protecciones', 'Instalación y puesta en marcha'],
    },
    {
      featured: true,
      badge: '⭐ Recomendado',
      name: 'Solar Hogar+',
      tag: '8 kW · 9.6 kWh',
      desc: 'El equilibrio ideal entre potencia y autonomía.',
      precio: '$5.490.000',
      nota: 'IVA incluido · instalado',
      items: ['11 paneles Trina 720W N-TOPCon', 'Inversor híbrido 10 kW (3 MPPT)', 'Batería litio LiFePO4 9,6 kWh', 'Estructura, cableado y protecciones', 'Instalación y puesta en marcha'],
    },
    {
      featured: false,
      badge: 'Alto consumo',
      name: 'Solar Pro',
      tag: '12 kW · 19.2 kWh',
      desc: 'Máxima potencia para grandes propiedades o uso productivo.',
      precio: '$9.490.000',
      nota: 'IVA incluido · instalado',
      items: ['17 paneles Trina 720W N-TOPCon', 'Inversor híbrido 10 kW (3 MPPT)', '19,2 kWh en baterías litio LiFePO4', 'Estructura inclinada, cableado y protecciones', 'Instalación y puesta en marcha'],
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
      <p className={`text-xs text-center mt-2 ${plan.featured ? 'text-white/30' : 'text-gray-400'}`}>
        Consulta por financiamiento disponible
      </p>
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
