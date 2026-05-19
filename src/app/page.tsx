import Link from 'next/link'
import {
  BarChart3,
  CreditCard,
  Bell,
  Users,
  FileText,
  CheckCircle,
  ArrowRight,
  Star,
  TrendingUp,
  AlertCircle,
  ClipboardList,
  ChevronDown,
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <span className="text-xl font-bold text-indigo-600 tracking-tight">Avelloz</span>
          <Link
            href="/login"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Quero testar grátis
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-4 sm:px-6 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
            CRM para concessionárias de motos
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            Sua concessionária sem planilhas,{' '}
            <span className="text-indigo-600">WhatsApp e post-it</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Controle seu funil de vendas do zero — do cliente que entrou na loja até a moto saindo pela porta. Tudo em um lugar, em tempo real.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
            >
              Quero testar grátis
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#como-funciona"
              className="border border-slate-200 hover:border-indigo-300 text-slate-700 font-semibold px-8 py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-2"
            >
              Ver como funciona
            </a>
          </div>
          <p className="mt-5 text-sm text-slate-400">Sem cartão de crédito. Acesso imediato.</p>
        </div>
      </section>

      {/* PROBLEMA / SOLUÇÃO */}
      <section className="py-20 px-4 sm:px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Você reconhece alguma dessas situações?
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              São os problemas que todo gerente de concessionária enfrenta — e que o Avelloz resolve.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Problema 1 */}
            <div className="space-y-6">
              <div className="bg-red-900/30 border border-red-700/40 rounded-xl p-6">
                <AlertCircle className="w-8 h-8 text-red-400 mb-3" />
                <h3 className="font-bold text-lg text-red-300 mb-2">Cliente some sem fechar</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Crédito aprovado, cliente animado — e três dias depois sumiu. Vendedor não fez o follow-up. Negócio perdido.
                </p>
              </div>
              <div className="bg-indigo-900/40 border border-indigo-600/40 rounded-xl p-6">
                <CheckCircle className="w-8 h-8 text-indigo-400 mb-3" />
                <h3 className="font-bold text-lg text-indigo-300 mb-2">Lembretes automáticos</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  O Avelloz avisa o vendedor quando o prazo do crédito vence — antes do cliente desaparecer.
                </p>
              </div>
            </div>

            {/* Problema 2 */}
            <div className="space-y-6">
              <div className="bg-red-900/30 border border-red-700/40 rounded-xl p-6">
                <AlertCircle className="w-8 h-8 text-red-400 mb-3" />
                <h3 className="font-bold text-lg text-red-300 mb-2">Gerente sem visão do funil</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Quantos clientes entraram essa semana? Quantos foram aprovados? Qual vendedor está convertendo mais? Ninguém sabe ao certo.
                </p>
              </div>
              <div className="bg-indigo-900/40 border border-indigo-600/40 rounded-xl p-6">
                <CheckCircle className="w-8 h-8 text-indigo-400 mb-3" />
                <h3 className="font-bold text-lg text-indigo-300 mb-2">Dashboard em tempo real</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Taxa de conversão, aprovações, vendas e performance por vendedor — tudo visível de qualquer lugar, no celular.
                </p>
              </div>
            </div>

            {/* Problema 3 */}
            <div className="space-y-6">
              <div className="bg-red-900/30 border border-red-700/40 rounded-xl p-6">
                <AlertCircle className="w-8 h-8 text-red-400 mb-3" />
                <h3 className="font-bold text-lg text-red-300 mb-2">Histórico perdido</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Vendedor saiu da empresa e levou o histórico dos clientes no WhatsApp. Caderno de anotações sumiu. Começa do zero.
                </p>
              </div>
              <div className="bg-indigo-900/40 border border-indigo-600/40 rounded-xl p-6">
                <CheckCircle className="w-8 h-8 text-indigo-400 mb-3" />
                <h3 className="font-bold text-lg text-indigo-300 mb-2">Histórico centralizado</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Todo atendimento, consulta e resultado registrado no sistema. O histórico é da loja, não do vendedor.
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
              Desenvolvido especificamente para o dia a dia de concessionárias de motos — não é um CRM genérico adaptado.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <BarChart3 className="w-7 h-7 text-indigo-600" />,
                title: 'Dashboard em tempo real',
                desc: 'Taxa de conversão, clientes em aberto, aprovações e vendas fechadas. Visão completa do funil sem abrir uma planilha.',
              },
              {
                icon: <CreditCard className="w-7 h-7 text-indigo-600" />,
                title: 'Consultas de crédito',
                desc: 'Registre o resultado de cada consulta (aprovado, com restrição, negado) e acompanhe o histórico de financeiras por cliente.',
              },
              {
                icon: <Bell className="w-7 h-7 text-indigo-600" />,
                title: 'Lembretes de reconsulta',
                desc: 'Quando o prazo do crédito aprovado está vencendo, o sistema avisa o vendedor para acionar o cliente antes de perder o negócio.',
              },
              {
                icon: <Users className="w-7 h-7 text-indigo-600" />,
                title: 'Gestão de vendedores',
                desc: 'Veja quantos atendimentos, consultas e vendas cada vendedor realizou. Identifique quem precisa de apoio e quem está performando.',
              },
              {
                icon: <FileText className="w-7 h-7 text-indigo-600" />,
                title: 'Relatórios exportáveis',
                desc: 'Exporte os dados de atendimentos, conversões e resultados para analisar fora do sistema ou apresentar para sócios.',
              },
              {
                icon: <ClipboardList className="w-7 h-7 text-indigo-600" />,
                title: 'Controle de status do funil',
                desc: 'Cada cliente tem um status claro: em análise, aprovado, fechado ou perdido — com motivo registrado para análise futura.',
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-md transition-all"
              >
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
                desc: 'O vendedor cadastra o cliente em segundos: nome, telefone e interesse. Nada de formulários longos.',
              },
              {
                step: '2',
                icon: <CreditCard className="w-6 h-6 text-indigo-600" />,
                title: 'Consulta de crédito',
                desc: 'Registre o resultado na financeira: aprovado, com restrição ou negado. O histórico fica salvo.',
              },
              {
                step: '3',
                icon: <TrendingUp className="w-6 h-6 text-indigo-600" />,
                title: 'Acompanha no funil',
                desc: 'O status do cliente avança conforme a negociação: em análise, aprovado, fechado ou perdido.',
              },
              {
                step: '4',
                icon: <BarChart3 className="w-6 h-6 text-indigo-600" />,
                title: 'Dashboard atualizado',
                desc: 'O gerente vê tudo em tempo real: conversão, aprovações, volume por vendedor e motivos de perda.',
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

      {/* PLANOS */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Planos e preços
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Sem taxa de implantação. Cancele quando quiser.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {/* Starter */}
            <div className="border border-slate-200 rounded-2xl p-8">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Starter</p>
              <p className="text-4xl font-extrabold text-slate-900 mb-1">R$ 197</p>
              <p className="text-slate-400 text-sm mb-6">/mês por loja</p>
              <ul className="space-y-3 mb-8">
                {[
                  '1 loja cadastrada',
                  'Até 3 vendedores',
                  'Atendimentos ilimitados',
                  'Consultas de crédito',
                  'Dashboard básico',
                  'Suporte por WhatsApp',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className="block text-center border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-3 rounded-xl transition-colors"
              >
                Começar grátis
              </Link>
            </div>

            {/* Pro */}
            <div className="border-2 border-indigo-600 rounded-2xl p-8 relative shadow-xl shadow-indigo-100">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                Mais popular
              </div>
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">Pro</p>
              <p className="text-4xl font-extrabold text-slate-900 mb-1">R$ 397</p>
              <p className="text-slate-400 text-sm mb-6">/mês por loja</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Tudo do Starter',
                  'Vendedores ilimitados',
                  'Relatórios avançados',
                  'Exportação de dados',
                  'Lembretes automáticos',
                  'Dashboard completo com métricas',
                  'Suporte prioritário',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors"
              >
                Assinar agora
              </Link>
            </div>

            {/* Enterprise */}
            <div className="border border-slate-200 rounded-2xl p-8">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Enterprise</p>
              <p className="text-4xl font-extrabold text-slate-900 mb-1">Consulta</p>
              <p className="text-slate-400 text-sm mb-6">personalizado</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Tudo do Pro',
                  'Múltiplas lojas',
                  'Gestão de rede',
                  'Dashboard consolidado',
                  'Onboarding dedicado',
                  'Personalização de campos',
                  'SLA garantido em contrato',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/5511999999999?text=Quero+saber+mais+sobre+o+plano+Enterprise+do+Avelloz"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center border border-slate-300 text-slate-700 hover:border-indigo-300 hover:bg-slate-50 font-semibold py-3 rounded-xl transition-colors"
              >
                Falar com vendas
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              O que dizem os gerentes que já usam
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Rodrigo Faria',
                role: 'Gerente Comercial',
                company: 'Moto Center Uberlândia',
                text: 'Antes eu dependia do WhatsApp do vendedor pra saber o que estava acontecendo. Hoje abro o Avelloz e vejo tudo. Minha taxa de aprovação subiu 18% em dois meses porque paramos de perder cliente aprovado.',
              },
              {
                name: 'Tatiane Monteiro',
                role: 'Proprietária',
                company: 'Honda Motos Franca',
                text: 'Implantamos em um dia. No dia seguinte já estava todo mundo usando. O lembrete de reconsulta foi o que mais fez diferença — nunca mais perdemos cliente por prazo de crédito vencido.',
              },
              {
                name: 'Alessandro Souza',
                role: 'Diretor de Vendas',
                company: 'Yamaha Brasil Ribeirão Preto',
                text: 'Agora consigo ver a performance de cada vendedor sem precisar perguntar. Identificamos que um vendedor estava abrindo muitos atendimentos mas não estava consultando o crédito. Resolvemos o gargalo.',
              },
            ].map((t, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-slate-400 text-xs">{t.role} · {t.company}</p>
                </div>
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
                a: 'Sim. Os dados são armazenados no Supabase, infraestrutura de nível enterprise com criptografia e backups automáticos. Nenhum dado da sua loja é compartilhado com terceiros.',
              },
              {
                q: 'Funciona no celular?',
                a: 'Sim. O sistema é totalmente responsivo — vendedor pode cadastrar atendimento pelo celular enquanto está com o cliente, e o gerente acompanha tudo pelo dashboard mobile.',
              },
              {
                q: 'Posso exportar meus dados?',
                a: 'Sim. No plano Pro e Enterprise você pode exportar relatórios de atendimentos, consultas de crédito e performance de vendedores para análise externa.',
              },
              {
                q: 'Como é o suporte?',
                a: 'Atendimento por WhatsApp em horário comercial. No plano Pro o suporte é prioritário, com resposta em até 2 horas.',
              },
              {
                q: 'Quanto tempo leva para implementar?',
                a: 'Um dia, no máximo. O onboarding é simples: cadastra a loja, adiciona os vendedores e começa a registrar atendimentos. Sem dados para migrar, sem treinamento longo.',
              },
            ].map((item, i) => (
              <details
                key={i}
                className="group border border-slate-200 rounded-xl overflow-hidden"
              >
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

      {/* CTA FINAL */}
      <section className="py-20 px-4 sm:px-6 bg-indigo-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Chega de perder venda por falta de controle
          </h2>
          <p className="text-indigo-200 text-lg mb-10 max-w-xl mx-auto">
            Comece hoje e veja seu funil de vendas funcionar sem planilha, sem WhatsApp e sem achismo.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-white hover:bg-indigo-50 text-indigo-700 font-bold px-10 py-4 rounded-xl text-lg transition-colors shadow-xl"
          >
            Quero testar grátis
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-indigo-300 text-sm">Sem cartão de crédito. Configuração em menos de 1 dia.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg mb-1">Avelloz</p>
            <p className="text-sm">Gestão comercial para concessionárias de motos</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
            <Link href="/login" className="hover:text-white transition-colors">
              Entrar na plataforma
            </Link>
            <span className="hidden sm:block text-slate-700">·</span>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Suporte via WhatsApp
            </a>
          </div>
          <p className="text-xs text-slate-600">© 2026 Avelloz. Todos os direitos reservados.</p>
        </div>
      </footer>

    </div>
  )
}
