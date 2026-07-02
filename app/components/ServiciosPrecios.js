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
      precio: '$499.000',
      nota: 'IVA incluido · instalada',
      ahorro: '$9.000',
      agendarLink: '/agendar?plan=plan-estandar',
      items: ['Cámara Dahua Solar PTZ 4G doble lente', 'Tarjeta microSD 256 GB', 'SIM de datos activada', 'Instalación profesional', 'Configuración y puesta en marcha'],
    },
    {
      featured: false,
      badge: 'Llave en mano',
      name: 'Plan Integral',
      tag: 'Con poste 75×75',
      desc: 'Instalación completa con poste de acero 75×75 y base de hormigón.',
      precio: '$699.000',
      nota: 'IVA incluido · instalada',
      ahorro: '$9.000',
      agendarLink: '/agendar?plan=plan-integral',
      items: ['Cámara Dahua Solar PTZ 4G doble lente', 'Tarjeta microSD 256 GB', 'SIM de datos activada', 'Poste de acero 75×75 con fundación', 'Instalación profesional + puesta en marcha'],
    },
  ],
}

const alpsolar = {
  icon: Sun,
  color: 'bg-brand-solar/10 text-brand-solar-dark',
  image: '/images/instalacion-paneles.png',
  imagePosition: 'center',
  title: 'Energía Solar · Packs Instalados AlpSolar',
  description: '¿Estás construyendo una cabaña o quieres dejar de pagar una cuenta elevada de luz? Aprovecha nuestros packs instalados llave en mano. Todos los packs incluyen el mismo inversor PULSE S4 de 12 kW — puedes partir con el Pack Inicial y escalar añadiendo paneles y baterías cuando lo necesites, sin cambiar el inversor.',
  features: ['Inversor 12 kW · escala sin cambiarlo', 'WiFi y Bluetooth + app móvil', 'Compatible con generador diésel/gasolina', 'Inyección a red · reduce tu cuenta', 'Paneles 610W N-TYPE alta eficiencia', 'IP66 · apto intemperie'],
  planes: [
    {
      featured: false,
      badge: 'Pack Inicial',
      name: 'Pack Inicial',
      tag: '1.83 kW producción · 5.12 kWh almacenamiento',
      desc: 'Para cabañas y casas de campo. El inversor PULSE S4 soporta hasta 12 kW — parte con 3 paneles y escala añadiendo más paneles y baterías sin cambiar el inversor.',
      precio: '$2.290.000',
      nota: 'IVA incluido · instalado',
      ahorro: '$50.000',
      agendarLink: '/agendar?plan=pack-inicial',
      items: ['3 paneles AlpSolar 610W N-TYPE', 'Inversor híbrido PULSE S4 12 kW', 'Batería LiFePO4 5.12 kWh LIVO-Y', 'Cableado, cajas de protección y soporte', 'Instalación y puesta en marcha'],
    },
    {
      featured: false,
      badge: 'Pack Intermedio',
      name: 'Pack Intermedio',
      tag: '3.66 kW producción · 10.24 kWh almacenamiento',
      desc: 'Para hogares con consumo moderado. Autonomía real con doble batería y mayor generación diaria.',
      precio: '$3.790.000',
      nota: 'IVA incluido · instalado',
      ahorro: '$100.000',
      agendarLink: '/agendar?plan=pack-intermedio',
      items: ['6 paneles AlpSolar 610W N-TYPE', 'Inversor híbrido PULSE S4 12 kW', '2× Batería LiFePO4 5.12 kWh LIVO-Y', 'Cableado, cajas de protección y soporte', 'Instalación y puesta en marcha'],
    },
    {
      featured: true,
      badge: '⭐ Recomendado',
      name: 'Pack Full',
      tag: '6.1 kW producción · 15.36 kWh almacenamiento',
      desc: 'Para hogares de consumo alto o uso productivo. Máxima autonomía con 10 paneles y triple batería.',
      precio: '$5.590.000',
      nota: 'IVA incluido · instalado',
      ahorro: '$150.000',
      agendarLink: '/agendar?plan=pack-full',
      items: ['10 paneles AlpSolar 610W N-TYPE', 'Inversor híbrido PULSE S4 12 kW', '3× Batería LiFePO4 5.12 kWh LIVO-Y', 'Cableado, cajas de protección y soporte', 'Instalación y puesta en marcha'],
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
      <a href={plan.agendarLink || '#contacto'} className={`inline-flex items-center justify-center font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 text-sm w-full ${
        plan.featured ? 'bg-brand-solar hover:bg-brand-solar-dark text-white' : 'bg-brand-green hover:bg-brand-green-dark text-white'
      }`}>
        {plan.agendarLink ? 'Agendar instalación' : 'Solicitar este plan'}
      </a>
      {plan.ahorro && (
        <p className={`text-xs text-center mt-2 font-medium ${plan.featured ? 'text-brand-solar' : 'text-brand-green'}`}>
          Con transferencia o depósito ahorras <span className="font-bold">{plan.ahorro}</span>
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
          <h2 className="section-title mb-4">Seguridad y energía solar. Llave en mano.</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Cámaras solares con 4G e IA y sistemas fotovoltaicos instalados para el campo chileno, sin depender de infraestructura existente.
          </p>
        </div>
        <div className="flex flex-col gap-10">
          <ServicioBloque servicio={camaras} />
          <ServicioBloque servicio={alpsolar} />
        </div>
        <p className="text-center text-sm text-gray-400 mt-6">
          Precios referenciales · La distancia y condiciones del sitio pueden ajustar el valor final
        </p>
      </div>
    </section>
  )
}
