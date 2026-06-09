import './globals.css'
import { Inter } from 'next/font/google'
import WhatsAppButton from './components/WhatsAppButton'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const siteUrl = 'https://ecoguard.cl'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'EcoGuard – Seguridad y Energía Solar para el Campo Chileno',
  description: 'Cámaras solares con 4G e IA y sistemas fotovoltaicos llave en mano para parcelas, fundos y propiedades rurales en la Región de Valparaíso, Chile.',
  keywords: 'cámaras solares, seguridad rural, energía solar, fotovoltaico, Valparaíso, Chile, campo, parcelas, fundos',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'EcoGuard – Seguridad y Energía Solar para el Campo Chileno',
    description: 'Protegemos y energizamos propiedades rurales sin depender de la red eléctrica ni de internet por cable. Región de Valparaíso.',
    type: 'website',
    locale: 'es_CL',
    url: siteUrl,
    siteName: 'EcoGuard',
    images: [{ url: '/images/camara-instalada.jpg', width: 1200, height: 630, alt: 'EcoGuard – Cámaras solares para el campo chileno' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EcoGuard – Seguridad y Energía Solar para el Campo Chileno',
    description: 'Cámaras solares 4G con IA y sistemas fotovoltaicos llave en mano. Región de Valparaíso.',
    images: ['/images/camara-instalada.jpg'],
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'EcoGuard',
  description: 'Cámaras solares con 4G e IA y sistemas fotovoltaicos llave en mano para propiedades rurales en la Región de Valparaíso.',
  url: siteUrl,
  telephone: '+56971516101',
  email: 'ventas@ecoguard.cl',
  areaServed: { '@type': 'AdministrativeArea', name: 'Región de Valparaíso, Chile' },
  serviceType: ['Cámaras de seguridad solar', 'Sistemas fotovoltaicos', 'Energía solar rural'],
  priceRange: '$$',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={inter.className}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
