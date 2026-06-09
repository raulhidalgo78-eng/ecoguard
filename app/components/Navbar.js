'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const navLinks = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#precios', label: 'Precios' },
  { href: '#cobertura', label: 'Cobertura' },
  { href: '#contacto', label: 'Cotizar' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#" className="flex items-center">
          <Image
            src="/images/logo-ecoguard-horizontal.svg"
            alt="EcoGuard"
            width={180}
            height={50}
            priority
            className={scrolled ? 'brightness-100' : 'brightness-0 invert'}
          />
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={`text-sm font-medium transition-colors hover:text-brand-green ${scrolled ? 'text-gray-700' : 'text-white/90'}`}>
              {link.label}
            </a>
          ))}
          <a href="#contacto" className="btn-primary text-sm px-5 py-2.5">Cotiza gratis</a>
        </div>
        <button className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-gray-700' : 'text-white'}`} onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-gray-700 font-medium" onClick={() => setOpen(false)}>{link.label}</a>
          ))}
          <a href="#contacto" className="btn-primary justify-center" onClick={() => setOpen(false)}>Cotiza gratis</a>
        </div>
      )}
    </header>
  )
}
