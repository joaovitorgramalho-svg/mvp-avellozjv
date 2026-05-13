# Setup — MVP Avelloz

## 1. Supabase

1. Crie um projeto no [supabase.com](https://supabase.com)
2. Vá em **SQL Editor** e execute o conteúdo de `supabase/migrations/001_initial_schema.sql`
3. Crie um bucket chamado `avelloz` em **Storage** → marque como **público**
4. Copie a **URL** e a **anon key** em **Settings → API**

## 2. Variáveis de ambiente

Edite `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

## 3. Rodar localmente

```bash
npm run dev
```

Acesse http://localhost:3000 — redireciona para /dashboard.

## 4. Deploy (Vercel)

1. Push para GitHub
2. Importe no Vercel
3. Configure as mesmas variáveis de ambiente no painel do Vercel
4. Deploy automático

## Estrutura de rotas

| Rota | Descrição |
|------|-----------|
| `/dashboard` | Visão geral com cards e gráficos |
| `/atendimentos` | Lista de atendimentos com filtros |
| `/atendimentos/novo` | Novo atendimento |
| `/atendimentos/[id]` | Detalhe + histórico de consultas |
| `/atendimentos/[id]/editar` | Edição |
| `/lembretes` | Reconsultas pendentes |
| `/relatorios` | Desempenho por vendedor |
| `/vendedores` | CRUD vendedores |
| `/motos` | CRUD tipos de moto |
| `/status` | CRUD status |
| `/motivos-perda` | CRUD motivos de perda |
