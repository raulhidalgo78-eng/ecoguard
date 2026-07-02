// Envío de email vía Resend API (sin dependencias npm)
// Requiere env: RESEND_API_KEY
// Requiere dominio ecoguard.cl verificado en resend.com

export async function sendEmail({ to, subject, html }) {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.warn('RESEND_API_KEY no configurada — email omitido')
    return null
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'EcoGuard <instalaciones@ecoguard.cl>',
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    }),
  })
  if (!res.ok) {
    const txt = await res.text()
    console.error('Resend error:', txt)
    throw new Error(`Email error: ${txt}`)
  }
  return res.json()
}

export function emailOrdenInstalacion(reserva) {
  return {
    to: 'ventas@ecoguard.cl',
    subject: `🔧 Nueva Orden de Instalación — ${reserva.plan_nombre} — ${reserva.fecha}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#1a3a2a">Nueva Orden de Instalación</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;width:140px">Plan</td>
              <td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">${reserva.plan_nombre}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Monto</td>
              <td style="padding:8px;border-bottom:1px solid #eee">$${Number(reserva.plan_precio).toLocaleString('es-CL')}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Fecha</td>
              <td style="padding:8px;border-bottom:1px solid #eee">${reserva.fecha} a las ${reserva.hora}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Cliente</td>
              <td style="padding:8px;border-bottom:1px solid #eee">${reserva.nombre}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Email</td>
              <td style="padding:8px;border-bottom:1px solid #eee">${reserva.email}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Teléfono</td>
              <td style="padding:8px;border-bottom:1px solid #eee">${reserva.telefono}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Comuna</td>
              <td style="padding:8px;border-bottom:1px solid #eee">${reserva.comuna}</td></tr>
          <tr><td style="padding:8px;color:#666">Dirección</td>
              <td style="padding:8px">${reserva.direccion}</td></tr>
        </table>
        <p style="margin-top:20px;padding:12px;background:#dcfce7;border-radius:8px;color:#166534">
          ✅ <strong>Pago confirmado por Mercado Pago</strong>${reserva.mp_payment_id ? ` (ID: ${reserva.mp_payment_id})` : ''}
        </p>
      </div>
    `,
  }
}

export function emailConfirmacionCliente(reserva) {
  return {
    to: reserva.email,
    subject: `✅ Tu instalación EcoGuard está confirmada — ${reserva.fecha}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#1a3a2a">¡Instalación confirmada!</h2>
        <p>Hola <strong>${reserva.nombre}</strong>,</p>
        <p>Tu pago fue recibido y tu instalación está agendada para el
           <strong>${reserva.fecha} a las ${reserva.hora}</strong>.</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;width:120px">Plan</td>
              <td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">${reserva.plan_nombre}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Dirección</td>
              <td style="padding:8px;border-bottom:1px solid #eee">${reserva.direccion}, ${reserva.comuna}</td></tr>
        </table>
        <p>Nuestro equipo se pondrá en contacto contigo para coordinar los detalles de acceso.</p>
        <p style="color:#666">Consultas: <a href="mailto:ventas@ecoguard.cl">ventas@ecoguard.cl</a></p>
        <p style="color:#666;font-size:13px">EcoGuard · Seguridad y Energía Solar</p>
      </div>
    `,
  }
}
