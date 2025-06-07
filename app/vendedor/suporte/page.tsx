'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function SuportePage() {
    const [countdown, setCountdown] = useState(10)
    const [isRedirecting, setIsRedirecting] = useState(false)

    const whatsappUrl = "https://wa.me/5511983282956?text=Ol%C3%A1!%20Preciso%20de%20suporte%20com%20o%20sistema%20de%20rifas.%20Poderia%20me%20ajudar%3F"

    const redirectToWhatsApp = () => {
        try {
            window.location.href = whatsappUrl
        } catch (error) {
            console.error('Erro ao redirecionar para WhatsApp:', error)
            window.open(whatsappUrl, '_blank')
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    setIsRedirecting(true)
                    setTimeout(() => {
                        redirectToWhatsApp()
                    }, 500)
                    clearInterval(timer)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [whatsappUrl])

    return (
        <div className="max-w-2xl mx-auto p-8 text-center">
            <h1 className="text-2xl font-bold mb-6">Suporte via WhatsApp</h1>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <p className="text-gray-700 mb-4">
                    Você será redirecionado automaticamente para nosso WhatsApp em:
                </p>
                <div className="text-4xl font-bold text-green-600 mb-4">
                    {countdown}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                    Uma mensagem automática será enviada para agilizar o atendimento.
                </p>
            </div>

            <div className="space-y-4">
                <Button 
                    onClick={redirectToWhatsApp}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3"
                    disabled={isRedirecting}
                >
                    {isRedirecting ? 'Redirecionando...' : 'Ir para WhatsApp Agora'}
                </Button>
                
                <p className="text-sm text-gray-500">
                    Mensagem que será enviada:<br/>
                    <em>"Olá! Preciso de suporte com o sistema de rifas. Poderia me ajudar?"</em>
                </p>
            </div>
        </div>
    )
}
