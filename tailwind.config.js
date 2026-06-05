/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#1a7a4a',
          'green-dark': '#0f5c35',
          'green-light': '#2fa866',
          solar: '#f59e0b',
          'solar-dark': '#d97706',
          dark: '#0d1f13',
          gray: '#f4f7f5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
