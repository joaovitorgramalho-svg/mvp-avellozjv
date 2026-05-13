-- =============================================
-- MVP Avelloz — Schema inicial
-- =============================================

-- Extensões
create extension if not exists "uuid-ossp";

-- =============================================
-- Tabelas de suporte
-- =============================================

create table if not exists sellers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  whatsapp text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists motorcycle_types (
  id uuid primary key default uuid_generate_v4(),
  model text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists statuses (
  id uuid primary key default uuid_generate_v4(),
  description text not null,
  generates_reminder boolean not null default false,
  is_closed boolean not null default false,
  is_lost boolean not null default false,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists loss_reasons (
  id uuid primary key default uuid_generate_v4(),
  description text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- =============================================
-- Tabela principal — atendimentos
-- =============================================

create table if not exists customer_services (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  cpf text not null,
  entry_date timestamptz not null default now(),
  seller_id uuid references sellers(id),
  motorcycle_type_id uuid references motorcycle_types(id),
  status_id uuid references statuses(id),
  loss_reason_id uuid references loss_reasons(id),
  notes text,
  reminder_active boolean not null default false,
  next_consultation_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_customer_services_cpf on customer_services(cpf);
create index if not exists idx_customer_services_seller on customer_services(seller_id);
create index if not exists idx_customer_services_status on customer_services(status_id);
create index if not exists idx_customer_services_next_consult on customer_services(next_consultation_date);

-- =============================================
-- Histórico de consultas de crédito
-- =============================================

create table if not exists credit_checks (
  id uuid primary key default uuid_generate_v4(),
  customer_service_id uuid not null references customer_services(id) on delete cascade,
  check_date date not null,
  result text not null check (result in ('approved', 'restriction', 'denied', 'pending')),
  file_url text,
  file_name text,
  notes text,
  next_check_date date,
  created_by uuid,
  created_at timestamptz not null default now()
);

create index if not exists idx_credit_checks_service on credit_checks(customer_service_id);

-- =============================================
-- Lembretes
-- =============================================

create table if not exists reminders (
  id uuid primary key default uuid_generate_v4(),
  customer_service_id uuid not null references customer_services(id) on delete cascade,
  credit_check_id uuid references credit_checks(id),
  seller_id uuid references sellers(id),
  due_date date not null,
  type text not null default 'reconsultation',
  status text not null default 'pending' check (status in ('pending', 'completed', 'overdue')),
  created_at timestamptz not null default now()
);

create index if not exists idx_reminders_seller on reminders(seller_id);
create index if not exists idx_reminders_due on reminders(due_date);
create index if not exists idx_reminders_status on reminders(status);

-- =============================================
-- Trigger: atualiza updated_at automaticamente
-- =============================================

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger customer_services_updated_at
  before update on customer_services
  for each row execute function update_updated_at();

-- =============================================
-- Dados iniciais
-- =============================================

insert into statuses (description, generates_reminder, is_closed, is_lost, sort_order) values
  ('Cliente entrou na loja',    false, false, false, 1),
  ('Atendido',                  false, false, false, 2),
  ('Consulta pendente',         false, false, false, 3),
  ('Consulta aprovada',         false, false, false, 4),
  ('Consulta com restrição',    true,  false, false, 5),
  ('Financiamento negado',      true,  false, true,  6),
  ('Venda fechada',             false, true,  false, 7),
  ('Venda perdida',             false, false, true,  8),
  ('Reconsulta agendada',       true,  false, false, 9),
  ('Reconsulta realizada',      false, false, false, 10)
on conflict do nothing;

insert into loss_reasons (description) values
  ('Restrição no CPF'),
  ('Score baixo'),
  ('Financiamento negado'),
  ('Entrada insuficiente'),
  ('Parcela ficou alta'),
  ('Cliente desistiu'),
  ('Cliente comprou em outra loja'),
  ('Não retornou contato'),
  ('Sem CNH ou documentação incompleta'),
  ('Outro motivo')
on conflict do nothing;

insert into motorcycle_types (model) values
  ('Honda Biz 125'),
  ('Honda CG 160'),
  ('Yamaha Factor'),
  ('Yamaha Fazer'),
  ('Pop 110i')
on conflict do nothing;
