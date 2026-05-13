'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { formatDate, formatDateTime, formatCPF, creditResultLabel, creditResultColor, nextConsultationDate, cn } from '@/lib/utils'
import { ArrowLeft, Edit, Plus, Bell, Upload, FileText, CheckCircle, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import type { CustomerService, CreditCheck, Status, LossReason } from '@/types'

const GENERATES_REMINDER = ['Consulta com restrição', 'Financiamento negado']

export default function AtendimentoDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [service, setService] = useState<CustomerService | null>(null)
  const [checks, setChecks] = useState<CreditCheck[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddCheck, setShowAddCheck] = useState(false)
  const [addingCheck, setAddingCheck] = useState(false)
  const [statuses, setStatuses] = useState<Status[]>([])

  const [checkForm, setCheckForm] = useState({ check_date: '', result: '', notes: '' })
  const [checkFile, setCheckFile] = useState<File | null>(null)
  const [checkErrors, setCheckErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const [svc, chk, st] = await Promise.all([
        supabase
          .from('customer_services')
          .select(`*, seller:seller_id(*), motorcycle_type:motorcycle_type_id(*), status:status_id(*), loss_reason:loss_reason_id(*)`)
          .eq('id', id)
          .single(),
        supabase
          .from('credit_checks')
          .select('*')
          .eq('customer_service_id', id)
          .order('check_date', { ascending: false }),
        supabase.from('statuses').select('*').eq('active', true).order('sort_order'),
      ])
      if (svc.data) setService(svc.data as CustomerService)
      if (chk.data) setChecks(chk.data as CreditCheck[])
      if (st.data) setStatuses(st.data as Status[])
      setLoading(false)
    }
    load()
  }, [id])

  async function handleAddCheck(e: React.FormEvent) {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!checkForm.check_date) errs.check_date = 'Obrigatório'
    if (!checkForm.result) errs.result = 'Obrigatório'
    if (Object.keys(errs).length) { setCheckErrors(errs); return }

    setAddingCheck(true)
    const supabase = createClient()

    let file_url: string | null = null
    let file_name: string | null = null

    if (checkFile) {
      const ext = checkFile.name.split('.').pop()
      const path = `credit-checks/${id}/${Date.now()}.${ext}`
      const { data } = await supabase.storage.from('avelloz').upload(path, checkFile)
      if (data) {
        const { data: urlData } = supabase.storage.from('avelloz').getPublicUrl(path)
        file_url = urlData.publicUrl
        file_name = checkFile.name
      }
    }

    const generates = GENERATES_REMINDER.includes(
      statuses.find((s) => s.id === service?.status_id)?.description ?? ''
    ) || ['restriction', 'denied'].includes(checkForm.result)

    const nextDate = generates ? nextConsultationDate(checkForm.check_date) : null

    const { data: newCheck } = await supabase
      .from('credit_checks')
      .insert({
        customer_service_id: id,
        check_date: checkForm.check_date,
        result: checkForm.result,
        notes: checkForm.notes || null,
        file_url,
        file_name,
        next_check_date: nextDate,
      })
      .select()
      .single()

    if (nextDate) {
      await Promise.all([
        supabase.from('customer_services').update({
          reminder_active: true,
          next_consultation_date: nextDate,
        }).eq('id', id),
        supabase.from('reminders').insert({
          customer_service_id: id,
          credit_check_id: newCheck?.id,
          seller_id: service?.seller_id,
          due_date: nextDate,
          type: 'reconsultation',
          status: 'pending',
        }),
      ])
    }

    setChecks((prev) => [newCheck as CreditCheck, ...prev])
    setCheckForm({ check_date: '', result: '', notes: '' })
    setCheckFile(null)
    setShowAddCheck(false)
    setAddingCheck(false)

    // refresh service
    const { data } = await supabase
      .from('customer_services')
      .select(`*, seller:seller_id(*), motorcycle_type:motorcycle_type_id(*), status:status_id(*), loss_reason:loss_reason_id(*)`)
      .eq('id', id)
      .single()
    if (data) setService(data as CustomerService)
  }

  if (loading) {
    return (
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Atendimento" />
        <div className="flex-1 flex items-center justify-center text-slate-400">Carregando...</div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Atendimento" />
        <div className="flex-1 flex items-center justify-center text-slate-400">Atendimento não encontrado</div>
      </div>
    )
  }

  const status = service.status as Status | null
  const isClosedOrLost = status?.is_closed || status?.is_lost

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Header
        title={service.name}
        subtitle={`CPF: ${formatCPF(service.cpf)}`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <Link href={`/atendimentos/${id}/editar`}>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
                Editar
              </Button>
            </Link>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Info principal */}
          <div className="lg:col-span-2 space-y-5">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Dados do atendimento</CardTitle>
                  {status && (
                    <Badge variant={status.is_closed ? 'success' : status.is_lost ? 'danger' : status.generates_reminder ? 'warning' : 'default'}>
                      {status.description}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
                  {[
                    { label: 'Nome', value: service.name },
                    { label: 'CPF', value: formatCPF(service.cpf) },
                    { label: 'Entrada', value: formatDateTime(service.entry_date) },
                    { label: 'Vendedor', value: service.seller?.name ?? '—' },
                    { label: 'Moto de interesse', value: service.motorcycle_type?.model ?? '—' },
                    { label: 'Motivo da perda', value: service.loss_reason?.description ?? '—' },
                  ].map((item) => (
                    <div key={item.label}>
                      <dt className="text-xs font-medium text-slate-500 uppercase tracking-wide">{item.label}</dt>
                      <dd className="mt-1 text-sm font-medium text-slate-900">{item.value}</dd>
                    </div>
                  ))}
                </dl>
                {service.notes && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <dt className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Observações</dt>
                    <dd className="text-sm text-slate-700">{service.notes}</dd>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Histórico de consultas */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Histórico de consultas ({checks.length})</CardTitle>
                  <Button size="sm" variant="outline" onClick={() => setShowAddCheck(true)}>
                    <Plus className="h-4 w-4" />
                    Nova consulta
                  </Button>
                </div>
              </CardHeader>
              <div className="divide-y divide-slate-100">
                {checks.length === 0 ? (
                  <div className="px-6 py-8 text-center text-sm text-slate-400">Nenhuma consulta registrada</div>
                ) : (
                  checks.map((c) => (
                    <div key={c.id} className="px-6 py-4 flex items-start gap-4">
                      <div className={cn('h-8 w-8 rounded-full flex items-center justify-center shrink-0',
                        c.result === 'approved' ? 'bg-emerald-100' : c.result === 'restriction' ? 'bg-amber-100' : 'bg-red-100'
                      )}>
                        {c.result === 'approved'
                          ? <CheckCircle className="h-4 w-4 text-emerald-600" />
                          : <AlertTriangle className="h-4 w-4 text-amber-600" />
                        }
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', creditResultColor(c.result))}>
                            {creditResultLabel(c.result)}
                          </span>
                          <span className="text-xs text-slate-500">{formatDate(c.check_date)}</span>
                        </div>
                        {c.notes && <p className="text-sm text-slate-600 mt-1">{c.notes}</p>}
                        {c.next_check_date && (
                          <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                            <Bell className="h-3 w-3" />
                            Próxima consulta: {formatDate(c.next_check_date)}
                          </p>
                        )}
                        {c.file_url && (
                          <a href={c.file_url} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:underline mt-1">
                            <FileText className="h-3 w-3" />
                            {c.file_name ?? 'Ver arquivo'}
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar info */}
          <div className="space-y-4">
            {service.reminder_active && service.next_consultation_date && (
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Bell className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-semibold text-amber-800">Reconsulta pendente</span>
                </div>
                <p className="text-xs text-amber-700">
                  Data prevista: <strong>{formatDate(service.next_consultation_date)}</strong>
                </p>
                <p className="text-xs text-amber-700 mt-0.5">
                  Vendedor: <strong>{service.seller?.name ?? '—'}</strong>
                </p>
              </div>
            )}

            <Card>
              <CardContent className="pt-4 space-y-3">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Cadastrado em</p>
                  <p className="text-sm text-slate-800 mt-0.5">{formatDateTime(service.created_at)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Atualizado em</p>
                  <p className="text-sm text-slate-800 mt-0.5">{formatDateTime(service.updated_at)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Consultas realizadas</p>
                  <p className="text-sm text-slate-800 mt-0.5">{checks.length}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal nova consulta */}
      <Modal open={showAddCheck} onClose={() => setShowAddCheck(false)} title="Nova consulta de crédito" size="md">
        <form onSubmit={handleAddCheck} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Data da consulta"
              type="date"
              required
              value={checkForm.check_date}
              onChange={(e) => setCheckForm((f) => ({ ...f, check_date: e.target.value }))}
              error={checkErrors.check_date}
            />
            <Select
              label="Resultado"
              required
              value={checkForm.result}
              onChange={(e) => setCheckForm((f) => ({ ...f, result: e.target.value }))}
              placeholder="Selecione"
              options={[
                { value: 'approved', label: 'Aprovado' },
                { value: 'restriction', label: 'Restrição' },
                { value: 'denied', label: 'Negado' },
                { value: 'pending', label: 'Pendente' },
              ]}
              error={checkErrors.result}
            />
          </div>
          <Textarea
            label="Observações"
            value={checkForm.notes}
            onChange={(e) => setCheckForm((f) => ({ ...f, notes: e.target.value }))}
            placeholder="Informações adicionais..."
          />
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">
              Arquivo da consulta
            </label>
            <label className="flex items-center gap-3 px-4 py-3 rounded-lg border-2 border-dashed border-slate-200 hover:border-indigo-300 cursor-pointer transition-colors">
              <Upload className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-500">
                {checkFile ? checkFile.name : 'Clique para selecionar (JPG, PNG, PDF, WEBP)'}
              </span>
              <input
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf,.webp"
                onChange={(e) => setCheckFile(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>
          {['restriction', 'denied'].includes(checkForm.result) && checkForm.check_date && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
              <Bell className="h-4 w-4 text-amber-600 shrink-0" />
              <p className="text-xs text-amber-700">
                Lembrete de reconsulta para <strong>{new Date(nextConsultationDate(checkForm.check_date)).toLocaleDateString('pt-BR')}</strong> será criado automaticamente.
              </p>
            </div>
          )}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setShowAddCheck(false)}>Cancelar</Button>
            <Button type="submit" loading={addingCheck}>Salvar consulta</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
