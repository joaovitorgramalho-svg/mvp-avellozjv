'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Bike, AlertTriangle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Preencha e-mail e senha')
      return
    }
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError('E-mail ou senha incorretos')
      setLoading(false)
      return
    }
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center">
              <Bike className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900 leading-none">Avelloz</p>
              <p className="text-xs text-slate-500 mt-0.5">Gestão comercial</p>
            </div>
          </div>

          <h1 className="text-xl font-semibold text-slate-900 mb-1">Entrar</h1>
          <p className="text-sm text-slate-500 mb-6">Use suas credenciais para acessar o sistema</p>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 mb-4">
              <AlertTriangle className="h-4 w-4 text-red-600 shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="E-mail"
              type="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError('') }}
              placeholder="seu@email.com"
              autoComplete="email"
            />
            <Input
              label="Senha"
              type="password"
              required
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder="Sua senha"
              autoComplete="current-password"
            />
            <Button type="submit" className="w-full" loading={loading}>
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
