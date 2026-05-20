'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import {
  BarChart3,
  CreditCard,
  Bell,
  Users,
  FileText,
  CheckCircle,
  TrendingUp,
  AlertCircle,
  ClipboardList,
  ChevronDown,
  Bike,
  LogIn,
} from 'lucide-react'

export default function LandingPage() {
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
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
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
    <div className="min-h-screen bg-white text-slate-900 font-sans">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Bike className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-indigo-600 tracking-tight">Avelloz</span>
          </div>
          <a
            href="#acesso"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Acessar sistema
          </a>
        </div>
      </nav>

      {/* HERO + LOGIN */}
      <section className="pt-28 pb-20 px-4 sm:px-6 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

          {/* Texto */}
          <div>
            <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
              Gestão comercial para concessionárias de motos
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              Controle total do seu{' '}
              <span className="text-indigo-600">funil de vendas</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Do cliente que entrou na loja até a moto saindo pela porta — atendimentos, consultas de crédito e lembretes em um só lugar.
            </p>
            <div className="flex flex-col gap-3 text-sm text-slate-600">
              {[
                'Dashboard com métricas em tempo real',
                'Lembretes automáticos de reconsulta de crédito',
                'Histórico completo de cada cliente',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Card de Login */}
          <div id="acesso" className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                <LogIn className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-slate-900 leading-none">Acesse sua conta</p>
                <p className="text-xs text-slate-400 mt-0.5">Plataforma Avelloz</p>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 mb-4">
                <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  placeholder="seu@email.com"
                  autoComplete="email"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError('') }}
                  placeholder="Sua senha"
                  autoComplete="current-password"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors text-sm"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            <div className="mt-5 pt-5 border-t border-slate-100">
              <p className="text-xs text-slate-400 text-center mb-3">Acesso rápido para demonstração</p>
              <button
                type="button"
                onClick={() => { setEmail('demo@avelloz.com.br'); setPassword('demo1234'); setError('') }}
                className="w-full text-sm text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg py-2 px-3 transition-colors"
              >
                Entrar como Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMA / SOLUÇÃO */}
      <section className="py-20 px-4 sm:px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Situações que toda concessionária conhece
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              O Avelloz resolve os gargalos mais comuns do dia a dia comercial.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div className="bg-red-900/30 border border-red-700/40 rounded-xl p-6">
                <AlertCircle className="w-8 h-8 text-red-400 mb-3" />
                <h3 className="font-bold text-lg text-red-300 mb-2">Cliente some sem fechar</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Crédito aprovado, cliente animado — e três dias depois sumiu. Vendedor não fez o follow-up.
                </p>
              </div>
              <div className="bg-indigo-900/40 border border-indigo-600/40 rounded-xl p-6">
                <CheckCircle className="w-8 h-8 text-indigo-400 mb-3" />
                <h3 className="font-bold text-lg text-indigo-300 mb-2">Lembretes automáticos</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  O sistema avisa o vendedor quando o prazo do crédito vence — antes do cliente desaparecer.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-red-900/30 border border-red-700/40 rounded-xl p-6">
                <AlertCircle className="w-8 h-8 text-red-400 mb-3" />
                <h3 className="font-bold text-lg text-red-300 mb-2">Gerente sem visão do funil</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Quantos clientes entraram essa semana? Qual vendedor está convertendo mais? Ninguém sabe.
                </p>
              </div>
              <div className="bg-indigo-900/40 border border-indigo-600/40 rounded-xl p-6">
                <CheckCircle className="w-8 h-8 text-indigo-400 mb-3" />
                <h3 className="font-bold text-lg text-indigo-300 mb-2">Dashboard em tempo real</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Taxa de conversão, aprovações e performance por vendedor — visível de qualquer lugar.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-red-900/30 border border-red-700/40 rounded-xl p-6">
                <AlertCircle className="w-8 h-8 text-red-400 mb-3" />
                <h3 className="font-bold text-lg text-red-300 mb-2">Histórico perdido</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Vendedor saiu e levou o histórico no WhatsApp. Caderno de anotações sumiu.
                </p>
              </div>
              <div className="bg-indigo-900/40 border border-indigo-600/40 rounded-xl p-6">
                <CheckCircle className="w-8 h-8 text-indigo-400 mb-3" />
                <h3 className="font-bold text-lg text-indigo-300 mb-2">Histórico centralizado</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Todo atendimento e resultado registrado no sistema. O histórico é da loja, não do vendedor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FUNCIONALIDADES */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Tudo que sua loja precisa, em um só sistema
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Desenvolvido especificamente para o dia a dia de concessionárias de motos.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <BarChart3 className="w-7 h-7 text-indigo-600" />,
                title: 'Dashboard em tempo real',
                desc: 'Taxa de conversão, clientes em aberto, aprovações e vendas fechadas. Visão completa do funil.',
              },
              {
                icon: <CreditCard className="w-7 h-7 text-indigo-600" />,
                title: 'Consultas de crédito',
                desc: 'Registre o resultado de cada consulta (aprovado, com restrição, negado) e acompanhe o histórico por cliente.',
              },
              {
                icon: <Bell className="w-7 h-7 text-indigo-600" />,
                title: 'Lembretes de reconsulta',
                desc: 'Quando o prazo do crédito aprovado está vencendo, o sistema avisa o vendedor automaticamente.',
              },
              {
                icon: <Users className="w-7 h-7 text-indigo-600" />,
                title: 'Gestão de vendedores',
                desc: 'Veja quantos atendimentos, consultas e vendas cada vendedor realizou. Identifique gargalos rapidamente.',
              },
              {
                icon: <FileText className="w-7 h-7 text-indigo-600" />,
                title: 'Relatórios exportáveis',
                desc: 'Exporte dados de atendimentos, conversões e resultados para análise ou apresentação.',
              },
              {
                icon: <ClipboardList className="w-7 h-7 text-indigo-600" />,
                title: 'Controle de status do funil',
                desc: 'Cada cliente tem um status claro: em análise, aprovado, fechado ou perdido — com motivo registrado.',
              },
            ].map((f, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-md transition-all">
                <div className="bg-indigo-50 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-20 px-4 sm:px-6 bg-indigo-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Como funciona na prática
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Do cliente entrando na loja até o dashboard atualizado — em menos de dois minutos.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                icon: <Users className="w-6 h-6 text-indigo-600" />,
                title: 'Cliente entra na loja',
                desc: 'O vendedor cadastra o cliente em segundos: nome, telefone e interesse.',
              },
              {
                step: '2',
                icon: <CreditCard className="w-6 h-6 text-indigo-600" />,
                title: 'Consulta de crédito',
                desc: 'Registre o resultado na financeira: aprovado, com restrição ou negado.',
              },
              {
                step: '3',
                icon: <TrendingUp className="w-6 h-6 text-indigo-600" />,
                title: 'Acompanha no funil',
                desc: 'O status avança conforme a negociação: em análise, aprovado, fechado ou perdido.',
              },
              {
                step: '4',
                icon: <BarChart3 className="w-6 h-6 text-indigo-600" />,
                title: 'Dashboard atualizado',
                desc: 'O gerente vê tudo em tempo real: conversão, aprovações e volume por vendedor.',
              },
            ].map((s, i) => (
              <div key={i} className="relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="absolute -top-4 left-6 bg-indigo-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shadow">
                  {s.step}
                </div>
                <div className="mt-4 mb-3">{s.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Perguntas frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Precisa instalar algum programa?',
                a: 'Não. O Avelloz é 100% web — funciona direto no navegador, sem instalação. Basta acessar pelo computador, tablet ou celular.',
              },
              {
                q: 'Meus dados ficam seguros?',
                a: 'Sim. Os dados são armazenados em infraestrutura de nível enterprise com criptografia e backups automáticos.',
              },
              {
                q: 'Funciona no celular?',
                a: 'Sim. O sistema é totalmente responsivo — vendedor pode cadastrar atendimento pelo celular enquanto está com o cliente.',
              },
              {
                q: 'Posso exportar meus dados?',
                a: 'Sim. É possível exportar relatórios de atendimentos, consultas de crédito e performance de vendedores.',
              },
              {
                q: 'Quanto tempo leva para começar a usar?',
                a: 'Um dia, no máximo. Cadastra a loja, adiciona os vendedores e começa a registrar atendimentos. Sem treinamento longo.',
              },
            ].map((item, i) => (
              <details key={i} className="group border border-slate-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-semibold text-slate-900 hover:bg-slate-50 transition-colors list-none">
                  {item.q}
                  <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg mb-1">Avelloz</p>
            <p className="text-sm">Gestão comercial para concessionárias de motos</p>
          </div>
          <a
            href="#acesso"
            className="text-sm hover:text-white transition-colors"
          >
            Acessar sistema
          </a>
          <p className="text-xs text-slate-600">© 2026 Avelloz. Todos os direitos reservados.</p>
        </div>
      </footer>

    </div>
  )
}
