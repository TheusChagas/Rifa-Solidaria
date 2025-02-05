// app/privacy-policy/page.tsx
'use client'

import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Introdução",
      content: "Esta Política de Privacidade explica como coletamos, usamos e protegemos suas informações pessoais. Ao utilizar nossos serviços, você concorda com as práticas descritas neste documento."
    },
    {
      title: "2. Dados Coletados",
      content: (
        <>
          Coletamos os seguintes tipos de informações:
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Dados pessoais (nome, e-mail, CPF)</li>
            <li>Informações de contato</li>
            <li>Dados de uso da plataforma</li>
            <li>Informações de pagamento</li>
            <li>Dados técnicos (IP, navegador, dispositivo)</li>
          </ul>
        </>
      )
    },
    {
      title: "3. Finalidade do Tratamento",
      content: (
        <>
          Seus dados são utilizados para:
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Fornecer e melhorar nossos serviços</li>
            <li>Processar transações</li>
            <li>Comunicações importantes</li>
            <li>Segurança e prevenção de fraudes</li>
            <li>Cumprimento de obrigações legais</li>
          </ul>
        </>
      )
    },
    {
      title: "4. Compartilhamento de Dados",
      content: (
        <>
          Seus dados podem ser compartilhados com:
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Parceiros de processamento de pagamento</li>
            <li>Provedores de serviços tecnológicos</li>
            <li>Autoridades legais competentes</li>
            <li>Empresas do mesmo grupo econômico</li>
          </ul>
          <p className="mt-4">Nunca vendemos seus dados pessoais.</p>
        </>
      )
    },
    {
      title: "5. Direitos do Titular",
      content: (
        <>
          Você tem direito a:
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Acesso aos seus dados</li>
            <li>Correção de informações</li>
            <li>Exclusão de dados</li>
            <li>Portabilidade de informações</li>
            <li>Revogar consentimento</li>
          </ul>
          <p className="mt-4">Para exercer seus direitos, entre em contato através do nosso canal de suporte.</p>
        </>
      )
    },
    {
      title: "6. Retenção de Dados",
      content: "Mantemos suas informações pelo tempo necessário para cumprir as finalidades descritas, obrigações legais ou resolução de disputas. Dados anonimizados podem ser retidos indefinidamente."
    },
    {
      title: "7. Segurança",
      content: "Utilizamos medidas técnicas como criptografia, firewalls e auditorias regulares para proteger seus dados. No entanto, nenhum sistema é 100% seguro e não podemos garantir segurança absoluta."
    },
    {
      title: "8. Alterações",
      content: "Esta política pode ser atualizada periodicamente. Alterações significativas serão notificadas por e-mail ou através de aviso em nossa plataforma."
    },
    {
      title: "9. Contato",
      content: (
        <>
          Dúvidas sobre esta política devem ser direcionadas para:
          <a 
            href="mailto:privacidade@empresa.com" 
            className="block mt-2 text-blue-600 hover:text-blue-800"
          >
            privacidade@empresa.com
          </a>
        </>
      )
    }
  ]

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-sm">
          <a href="./" className="inline-flex items-center text-gray-600 hover:text-gray-900 text-sm mb-8">
            ← Voltar para o site
          </a>

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Política de Privacidade</h1>
            <p className="text-sm text-gray-500">Última atualização: 01 de Janeiro de 2024</p>
          </div>

          <div className="space-y-2">
            {sections.map((section, index) => (
              <Disclosure key={index}>
                {({ open }) => (
                  <div className="border rounded-lg">
                    <Disclosure.Button className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors">
                      <h2 className="text-lg font-semibold">{section.title}</h2>
                      <ChevronDownIcon
                        className={`h-6 w-6 text-gray-600 transform transition-transform ${
                          open ? 'rotate-180' : ''
                        }`}
                      />
                    </Disclosure.Button>
                    
                    <Disclosure.Panel className="px-4 pb-4 pt-2 text-gray-600 border-t">
                      {section.content}
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}