// Mercado Pago API — creación de preferencias y consulta de pagos
// Requiere env: MERCADOPAGO_ACCESS_TOKEN, NEXT_PUBLIC_BASE_URL

const MP_BASE = 'https://api.mercadopago.com'
const token = () => process.env.MERCADOPAGO_ACCESS_TOKEN

async function mp(path, options = {}) {
  const res = await fetch(`${MP_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`MP ${res.status}: ${txt}`)
  }
  return res.json()
}

export async function createPreference({ reservaId, planNombre, planPrecio }) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecoguard.cl'
  return mp('/checkout/preferences', {
    method: 'POST',
    body: JSON.stringify({
      items: [{
        title: `${planNombre} — Instalación EcoGuard`,
        quantity: 1,
        unit_price: planPrecio,
        currency_id: 'CLP',
      }],
      external_reference: reservaId,
      notification_url: `${base}/api/agendar/mp-webhook`,
      back_urls: {
        success: `${base}/agendar/confirmado/${reservaId}`,
        failure: `${base}/agendar/pago/${reservaId}?error=1`,
        pending: `${base}/agendar/confirmado/${reservaId}`,
      },
      auto_return: 'approved',
    }),
  })
}

export async function getPayment(paymentId) {
  return mp(`/v1/payments/${paymentId}`)
}
