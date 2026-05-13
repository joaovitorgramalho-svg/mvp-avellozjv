-- =============================================
-- MVP Avelloz — Correções de performance e dados
-- =============================================

-- Índice em entry_date (coluna mais usada em ORDER BY)
create index if not exists idx_customer_services_entry_date
  on customer_services(entry_date desc);

-- "Reconsulta agendada" é status informativo, não deve gerar lembrete de 21 dias
update statuses
  set generates_reminder = false
  where description = 'Reconsulta agendada'
    and generates_reminder = true;
