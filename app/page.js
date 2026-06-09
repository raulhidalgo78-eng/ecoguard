import Image from 'next/image'
import Navbar from './components/Navbar'
import ContactForm from './components/ContactForm'
import Precios from './components/Precios'
import { Camera, Sun, Shield, Wifi, Zap, MapPin, Phone, Mail, ChevronRight, CheckCircle, Eye, Brain, Battery, Wrench, PhoneCall, Star, Smartphone } from 'lucide-react'

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-green-dark to-brand-green" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/90 mb-6">
            <MapPin className="w-4 h-4 text-brand-solar" />
            Región de Valparaíso, Chile
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Seguridad y energía solar <span className="text-brand-solar">autónoma</span> para el campo
          </h1>
          <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-lg">
            Cámaras solares con 4G e inteligencia artificial y sistemas fotovoltaicos instalados llave en mano. Protegemos y energizamos parcelas, fundos y propiedades rurales sin depender de la red eléctrica ni de internet por cable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contacto" className="btn-solar text-base">Cotiza gratis <ChevronRight className="w-5 h-5" /></a>
            <a href="#servicios" className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200">Ver servicios</a>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-6">
            {[{ value: '100%', label: 'Solar y autónomo' }, { value: '4G', label: 'Conectividad propia' }, { value: 'IA', label: 'Detección inteligente' }].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black text-brand-solar">{stat.value}</div>
                <div className="text-xs text-white/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:flex justify-center">
          <div className="relative w-full max-w-md">
            {/* Foto real de la cámara instalada */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image src="/images/ecoguard01.jpg" alt="Cámara solar EcoGuard instalada en campo" fill sizes="50vw" className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
              {/* Badge "en vivo" */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur rounded-full px-3 py-1.5">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-white text-xs font-semibold">En vivo · 4G</span>
              </div>
              {/* Indicadores abajo */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-black/50 backdrop-blur rounded-full px-3 py-1.5">
                  <Sun className="w-4 h-4 text-brand-solar" />
                  <span className="text-white text-xs">Solar · 98%</span>
                </div>
                <div className="flex items-center gap-2 bg-black/50 backdrop-blur rounded-full px-3 py-1.5">
                  <Wifi className="w-4 h-4 text-green-400" />
                  <span className="text-white text-xs">Señal fuerte</span>
                </div>
              </div>
            </div>
            {/* Tarjeta flotante de alerta */}
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 max-w-[210px]">
              <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900">Alerta detectada</div>
                <div className="text-[11px] text-gray-500">Movimiento · Sector norte</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Servicios() {
  const servicios = [
    {
      icon: Camera, color: 'bg-brand-green/10 text-brand-green',
      image: '/images/camara-4g-solar-01.png',
      imagePosition: 'center bottom',
      title: 'Cámaras Solares con 4G e IA',
      description: 'Vigilancia 24/7 completamente autónoma. Nuestras cámaras funcionan con energía solar, transmiten por 4G y detectan personas, vehículos y animales con inteligencia artificial.',
      features: ['Detección inteligente con IA', 'Transmisión 4G sin cable ni WiFi', 'Panel solar integrado + batería', 'Alertas en tiempo real al celular', 'Visión nocturna avanzada', 'Instalación profesional incluida'],
    },
    {
      icon: Sun, color: 'bg-brand-solar/10 text-brand-solar-dark',
      image: '/images/instalacion-paneles.png',
      title: 'Sistemas Fotovoltaicos Llave en Mano',
      description: 'Energía solar para tu propiedad rural sin depender de la red. Diseñamos, instalamos y ponemos en marcha tu sistema fotovoltaico completo con respaldo de batería.',
      features: ['Diseño personalizado a tu consumo', 'Paneles solares de alta eficiencia', 'Baterías de litio con respaldo', 'Instalación certificada', 'Puesta en marcha incluida', 'Asesoría y soporte post-venta'],
    },
  ]
  return (
    <section id="servicios" className="py-24 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green rounded-full px-4 py-1.5 text-sm font-medium mb-4">Nuestros servicios</div>
          <h2 className="section-title mb-4">Dos soluciones. Un solo proveedor.</h2>
          <p className="section-subtitle max-w-2xl mx-auto">Integramos seguridad y energía en una propuesta completa para el campo chileno, sin depender de infraestructura existente.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {servicios.map((s) => (
            <div key={s.title} className="card overflow-hidden !p-0">
              {s.image && (
                <div className="relative w-full h-52 overflow-hidden">
                  <Image src={s.image} alt={s.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" style={{ objectPosition: s.imagePosition || 'center' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              )}
              <div className="p-8">
              <div className={`w-14 h-14 ${s.color} rounded-2xl flex items-center justify-center mb-6`}><s.icon className="w-7 h-7" /></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{s.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{s.description}</p>
              <ul className="space-y-3">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-gray-700"><CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0" />{f}</li>
                ))}
              </ul>
              <div className="mt-8"><a href="#contacto" className="btn-primary w-full justify-center">Solicitar cotización</a></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ComoFunciona() {
  const pasos = [
    { icon: PhoneCall, step: '01', title: 'Asesoría gratuita', desc: 'Nos contactas y evaluamos tu predio, tus necesidades de seguridad y energía, y te explicamos las opciones sin costo.' },
    { icon: Wrench, step: '02', title: 'Diseño e instalación', desc: 'Nuestro equipo técnico diseña la solución, gestiona los equipos y realiza la instalación profesional en tu propiedad.' },
    { icon: Zap, step: '03', title: 'Puesta en marcha', desc: 'Configuramos todo, te mostramos cómo usar la app y el sistema, y lo dejamos funcionando al 100%.' },
    { icon: Shield, step: '04', title: 'Operación autónoma', desc: 'Tu propiedad queda protegida y energizada de forma autónoma. Sin luz de la red, sin internet por cable, sin preocupaciones.' },
  ]
  return (
    <section id="como-funciona" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green rounded-full px-4 py-1.5 text-sm font-medium mb-4">Proceso</div>
          <h2 className="section-title mb-4">¿Cómo funciona?</h2>
          <p className="section-subtitle max-w-2xl mx-auto">Un proceso simple, desde la asesoría hasta la puesta en marcha. Nosotros nos encargamos de todo.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pasos.map((paso, i) => (
            <div key={paso.step} className="relative">
              {i < pasos.length - 1 && <div className="hidden lg:block absolute top-7 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-gray-200" />}
              <div className="flex flex-col items-center text-center">
                <div className="relative w-14 h-14 bg-brand-green/10 rounded-2xl flex items-center justify-center mb-4">
                  <paso.icon className="w-7 h-7 text-brand-green" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-brand-green text-white text-xs font-bold rounded-full flex items-center justify-center">{i + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{paso.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{paso.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PorQue() {
  const razones = [
    { icon: Wifi, title: 'Sin internet por cable', desc: 'Transmisión 4G propia. No necesitas contratar internet, ni tener cobertura de fibra óptica en tu sector.' },
    { icon: Sun, title: 'Sin luz de la red', desc: 'Todo funciona con energía solar y baterías. Cero dependencia de la red eléctrica de distribución.' },
    { icon: Brain, title: 'Inteligencia artificial', desc: 'La IA distingue personas, vehículos y animales. Menos falsas alarmas, más seguridad real.' },
    { icon: MapPin, title: 'Operamos en tu zona', desc: 'Presencia en toda la Región de Valparaíso. Instalación y soporte técnico en terreno.' },
    { icon: Wrench, title: 'Llave en mano', desc: 'Nos encargamos de todo: diseño, equipos, instalación y puesta en marcha. Tú solo disfrutas el resultado.' },
    { icon: Star, title: 'Asesoría personalizada', desc: 'Cada predio es distinto. Te recomendamos la solución que mejor se adapta a tu terreno y presupuesto.' },
  ]
  return (
    <section className="py-24 bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium text-white/80 mb-4">¿Por qué EcoGuard?</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Diseñado para el campo chileno</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">Entendemos los desafíos únicos del sector rural. Por eso nuestras soluciones son 100% autónomas y listas para operar en cualquier predio.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {razones.map((r) => (
            <div key={r.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 bg-brand-solar/20 rounded-xl flex items-center justify-center mb-4"><r.icon className="w-5 h-5 text-brand-solar" /></div>
              <h3 className="text-white font-bold mb-2">{r.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Cobertura() {
  const comunas = ['Valparaíso', 'Viña del Mar', 'Quillota', 'San Antonio', 'Casablanca', 'Quilpué', 'Villa Alemana', 'La Calera', 'Los Andes', 'San Felipe', 'Limache', 'Olmué', 'Nogales', 'Hijuelas', 'Algarrobo']
  return (
    <section id="cobertura" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green rounded-full px-4 py-1.5 text-sm font-medium mb-4"><MapPin className="w-4 h-4" />Cobertura</div>
            <h2 className="section-title mb-4">Operamos en la Región de Valparaíso</h2>
            <p className="section-subtitle mb-8">Instalamos y damos soporte técnico en terreno en toda la región. Si tienes una parcela, fundo o propiedad rural en la V Región, podemos llegar a ti.</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {comunas.map((c) => (<span key={c} className="bg-brand-gray text-gray-700 text-sm px-3 py-1.5 rounded-full font-medium">{c}</span>))}
              <span className="bg-brand-green text-white text-sm px-3 py-1.5 rounded-full font-medium">y más...</span>
            </div>
            <a href="#contacto" className="btn-primary">Consulta tu zona <ChevronRight className="w-5 h-5" /></a>
          </div>
          <div className="relative rounded-3xl overflow-hidden min-h-[350px] bg-brand-dark">
            <Image src="/images/paisaje-rural.jpg" alt="Región de Valparaíso" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-brand-solar rounded-full animate-pulse" />
                <span className="text-white font-semibold text-sm">Zona de operación activa</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Valparaíso', 'Viña del Mar', 'Quillota', 'Los Andes', 'San Felipe', 'Casablanca'].map((c) => (
                  <span key={c} className="bg-white/15 backdrop-blur text-white text-xs px-3 py-1 rounded-full border border-white/20">{c}</span>
                ))}
                <span className="bg-brand-solar/80 text-white text-xs px-3 py-1 rounded-full">y más...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AppEnAccion() {
  const vistas = [
    { src: '/images/app-vista1.jpg', label: 'Ingreso del predio', desc: 'Vista en tiempo real del acceso principal' },
    { src: '/images/app-vista2.jpg', label: 'Camino interior', desc: 'Control PTZ desde tu celular' },
    { src: '/images/app-vista3.jpg', label: 'Vigilancia 360°', desc: 'Dos lentes simultáneas, 4G permanente' },
  ]
  return (
    <section className="py-24 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Smartphone className="w-4 h-4" /> App en acción
          </div>
          <h2 className="section-title mb-4">Ve tu propiedad en tiempo real</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Desde tu celular, en cualquier parte. Así se ve EcoGuard operando en predios reales de la Región de Valparaíso.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {vistas.map((v) => (
            <div key={v.label} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="relative w-full h-64">
                <Image src={v.src} alt={v.label} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top" />
              </div>
              <div className="p-5">
                <div className="font-bold text-gray-900 mb-1">{v.label}</div>
                <div className="text-sm text-gray-500">{v.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green rounded-full px-5 py-2.5 text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Transmisión 4G · Sin WiFi · Sin cortes de luz
          </div>
        </div>
      </div>
    </section>
  )
}

function Contacto() {
  return (
    <section id="contacto" className="py-24 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green rounded-full px-4 py-1.5 text-sm font-medium mb-4">Contacto</div>
            <h2 className="section-title mb-4">Cotiza sin compromiso</h2>
            <p className="section-subtitle mb-8">Cuéntanos sobre tu propiedad y te preparamos una propuesta personalizada. Asesoría 100% gratuita.</p>
            <div className="space-y-4">
              <a href="tel:+56971516101" className="flex items-center gap-4 bg-white rounded-2xl p-5 hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center group-hover:bg-brand-green/20 transition-colors"><Phone className="w-6 h-6 text-brand-green" /></div>
                <div><div className="text-xs text-gray-500 mb-0.5">Llámanos o escríbenos</div><div className="font-bold text-gray-900">+56 9 7151 6101</div></div>
              </a>
              <a href="mailto:ventas@ecoguard.cl" className="flex items-center gap-4 bg-white rounded-2xl p-5 hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center group-hover:bg-brand-green/20 transition-colors"><Mail className="w-6 h-6 text-brand-green" /></div>
                <div><div className="text-xs text-gray-500 mb-0.5">Escríbenos al email</div><div className="font-bold text-gray-900">ventas@ecoguard.cl</div></div>
              </a>
              <div className="flex items-center gap-4 bg-white rounded-2xl p-5">
                <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center"><MapPin className="w-6 h-6 text-brand-green" /></div>
                <div><div className="text-xs text-gray-500 mb-0.5">Zona de operación</div><div className="font-bold text-gray-900">Región de Valparaíso, Chile</div></div>
              </div>
            </div>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Solicita tu cotización</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Image src="/images/logo-ecoguard-horizontal.svg" alt="EcoGuard" width={160} height={44} className="brightness-0 invert" unoptimized />
          <div className="text-white/50 text-sm text-center">Seguridad y energía solar autónoma para el campo chileno · Región de Valparaíso</div>
          <div className="text-white/50 text-sm">© {new Date().getFullYear()} EcoGuard</div>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Servicios />
        <ComoFunciona />
        <PorQue />
        <AppEnAccion />
        <Precios />
        <Cobertura />
        <Contacto />
      </main>
      <Footer />
    </>
  )
}
