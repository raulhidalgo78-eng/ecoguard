-- Esquema módulo de facturación EcoGuard
-- Ejecutar en Supabase: SQL Editor > New query > pegar y Run

create table if not exists clientes (
  id uuid primary key default gen_random_uuid(),
  rut text not null,
  razon_social text not null,
  giro text,
  direccion text,
  comuna text,
  ciudad text,
  email text,
  contacto text,
  telefono text,
  created_at timestamptz default now()
);

create table if not exists facturas (
  id uuid primary key default gen_random_uuid(),
  folio integer,
  fecha_emision date not null default current_date,
  cliente_id uuid references clientes(id),
  detalle text,
  neto integer not null default 0,
  iva integer not null default 0,
  total integer not null default 0,
  forma_pago text default 'Transferencia',
  fecha_vencimiento date,
  estado text not null default 'Pendiente', -- Pendiente | Pagada | Vencida | Anulada
  fecha_pago date,
  created_at timestamptz default now()
);

create index if not exists idx_facturas_fecha on facturas(fecha_emision);
create index if not exists idx_facturas_estado on facturas(estado);

-- Seguridad: bloquear acceso anónimo (el sitio usa la service_role key desde el servidor)
alter table clientes enable row level security;
alter table facturas enable row level security;
