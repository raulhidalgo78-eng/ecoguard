// Slots disponibles: 3 por semana, lunes a viernes
// Martes 10:00 · Jueves 15:00 · Viernes 10:00
const SLOT_CONFIG = [
  { day: 2, hora: '10:00', label: 'Martes' },
  { day: 4, hora: '15:00', label: 'Jueves' },
  { day: 5, hora: '10:00', label: 'Viernes' },
]

const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

export function generateSlots() {
  const today = new Date()
  // Mínimo: 7 días desde hoy
  const minDate = new Date(today)
  minDate.setDate(today.getDate() + 7)
  minDate.setHours(0, 0, 0, 0)
  // Máximo: 35 días desde hoy (5 semanas)
  const maxDate = new Date(today)
  maxDate.setDate(today.getDate() + 35)

  const slots = []
  const current = new Date(minDate)

  while (current <= maxDate) {
    const dayOfWeek = current.getDay()
    const config = SLOT_CONFIG.find(s => s.day === dayOfWeek)
    if (config) {
      const fecha = current.toISOString().slice(0, 10)
      slots.push({
        fecha,
        hora: config.hora,
        label: `${DIAS[dayOfWeek]} ${current.getDate()} de ${MESES[current.getMonth()]}`,
      })
    }
    current.setDate(current.getDate() + 1)
  }

  return slots
}
