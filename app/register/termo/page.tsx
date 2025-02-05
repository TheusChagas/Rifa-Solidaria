// app/terms-of-use/page.tsx
'use client'

import { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function TermsOfUse() {
  const [openSection, setOpenSection] = useState<number | null>(null)

  const sections = [
    {
      title: "1. Aceitação dos Termos",
      content: "Ao utilizar nosso site e serviços, você declara que leu, compreendeu e concorda com estes Termos de Uso. Estes termos constituem um acordo jurídico entre você e nossa plataforma."
    },
    {
      title: "2. Serviços Oferecidos",
      content: (
        <>
          Nossa plataforma fornece ferramentas para gestão de negócios, incluindo recursos para:
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Gerenciamento de clientes</li>
            <li>Controle financeiro</li>
            <li>Emissão de documentos fiscais</li>
            <li>Relatórios analíticos</li>
          </ul>
        </>
      )
    },
    {
      title: "3. Cadastro",
      content: (
        <>
          Para acessar funcionalidades completas, você deverá:
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Fornecer informações precisas e atualizadas</li>
            <li>Manter a confidencialidade de sua senha</li>
            <li>Ser maior de 18 anos ou ter autorização legal</li>
          </ul>
        </>
      )
    },
    {
      title: "4. Cancelamento",
      content: (
        <>
          Você pode solicitar o cancelamento de sua conta a qualquer momento através:
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Painel de configurações da conta</li>
            <li>Solicitação por e-mail para suporte</li>
            <li>Central de ajuda da plataforma</li>
          </ul>
          <p className="mt-4">O cancelamento não implica em reembolso de valores já pagos.</p>
        </>
      )
    },
    {
      title: "5. Responsabilidades",
      content: (
        <div className="space-y-4">
          <p><strong>Do Usuário:</strong> Garantir a veracidade das informações fornecidas e uso adequado dos recursos.</p>
          <p><strong>Da Plataforma:</strong> Manter os serviços disponíveis e garantir segurança no processamento dos dados.</p>
        </div>
      )
    },
    {
      title: "6. Propriedade Intelectual",
      content: (
        <>
          Todo conteúdo disponibilizado na plataforma (textos, imagens, logotipos) é de nossa propriedade ou de parceiros licenciados. É expressamente proibido:
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Reprodução total ou parcial sem autorização</li>
            <li>Uso comercial não autorizado</li>
            <li>Modificação ou criação de obras derivadas</li>
          </ul>
        </>
      )
    },
    {
      title: "7. Disposições Gerais",
      content: (
        <div className="space-y-4">
          <p>Reservamo-nos o direito de modificar estes termos a qualquer momento, com atualizações publicadas nesta página.</p>
          <p>Casos omissos serão resolvidos conforme legislação brasileira, com foro eleito na cidade de São Paulo/SP.</p>
          <p>Dúvidas podem ser enviadas para <a href="mailto:suporte@empresa.com" className="text-blue-600 hover:text-blue-800">suporte@empresa.com</a>.</p>
        </div>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Termos de Uso</h1>
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
                        className={`h-6 w-6 text-gray-600 transform transition-transform ${open ? 'rotate-180' : ''}`}
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