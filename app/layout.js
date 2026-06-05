import './globals.css'

export const metadata = {
  title: 'EcoGuard – Seguridad y Energía Solar para el Campo Chileno',
  description: 'Cámaras solares con 4G e IA y sistemas fotovoltaicos llave en mano para parcelas, fundos y propiedades rurales. Cobertura en la Región de Valparaíso.',
  keywords: 'cámaras solares, seguridad rural, energía solar, fotovoltaico, Valparaíso, Chile, campo',
  openGraph: {
    title: 'EcoGuard – Seguridad y Energía Solar para el Campo Chileno',
    description: 'Protegemos y energizamos propiedades rurales sin depender de la red eléctrica ni de internet por cable.',
    type: 'website',
    locale: 'es_CL',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
