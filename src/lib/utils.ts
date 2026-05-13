import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO, addDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | null | undefined, pattern = 'dd/MM/yyyy') {
  if (!date) return '—'
  try {
    return format(parseISO(date), pattern, { locale: ptBR })
  } catch {
    return '—'
  }
}

export function formatDateTime(date: string | null | undefined) {
  return formatDate(date, "dd/MM/yyyy 'às' HH:mm")
}

export function maskCPF(cpf: string) {
  const clean = cpf.replace(/\D/g, '')
  if (clean.length !== 11) return cpf
  return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.***.${clean.slice(9)}`
}

export function formatCPF(cpf: string) {
  const clean = cpf.replace(/\D/g, '')
  if (clean.length !== 11) return cpf
  return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6, 9)}-${clean.slice(9)}`
}

export function formatWhatsApp(number: string) {
  const clean = number.replace(/\D/g, '')
  if (clean.length === 11) return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7)}`
  if (clean.length === 10) return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`
  return number
}

export function nextConsultationDate(fromDate: string) {
  return addDays(parseISO(fromDate), 21).toISOString().split('T')[0]
}

export function creditResultLabel(result: string) {
  const map: Record<string, string> = {
    approved: 'Aprovado',
    restriction: 'Restrição',
    denied: 'Negado',
    pending: 'Pendente',
  }
  return map[result] ?? result
}

export function creditResultColor(result: string) {
  const map: Record<string, string> = {
    approved: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    restriction: 'text-amber-600 bg-amber-50 border-amber-200',
    denied: 'text-red-600 bg-red-50 border-red-200',
    pending: 'text-slate-600 bg-slate-50 border-slate-200',
  }
  return map[result] ?? 'text-slate-600 bg-slate-50 border-slate-200'
}
