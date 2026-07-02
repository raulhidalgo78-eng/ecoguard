// Días hábiles (Lun-Vie) de 09:00 · mín. 7 días, máx. 35 días desde hoy
const MIN_DAYS = 7
const MAX_DAYS = 35

const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const MESES_CORTO = ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

// Genera todos los días hábiles disponibles para agendar
export function generateWorkingDays() {
  const days = []
  const now = new Date()
  for (let i = MIN_DAYS; i <= MAX_DAYS; i++) {
    const d = new Date(now)
    d.setDate(now.getDate() + i)
    const dow = d.getDay()
    if (dow === 0 || dow === 6) continue // saltar sábado y domingo
    const fecha = d.toISOString().slice(0, 10)
    const label = `${DIAS[dow]} ${d.getDate()} de ${MESES[d.getMonth()]}`
    days.push({ fecha, hora: '09:00', label })
  }
  return days
}

// Devuelve N días hábiles consecutivos a partir de startFecha (inclusive)
export function getWorkingDaysFrom(startFecha, count) {
  const result = []
  const d = new Date(startFecha + 'T12:00:00')
  while (result.length < count) {
    const dow = d.getDay()
    if (dow !== 0 && dow !== 6) {
      result.push(d.toISOString().slice(0, 10))
    }
    d.setDate(d.getDate() + 1)
  }
  return result
}

// Formatea una fecha para mostrar en forma corta (ej: "Mar 8 ene")
export function formatFechaCorta(fecha) {
  const d = new Date(fecha + 'T12:00:00')
  const dow = d.getDay()
  return `${DIAS[dow]} ${d.getDate()} ${MESES_CORTO[d.getMonth()]}`
}
