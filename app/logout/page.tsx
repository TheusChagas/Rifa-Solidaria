'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            try {
                await fetch('/api/auth/logout', {
                    method: 'POST',
                });
                
                // Redirecionar para a página inicial
                router.push('/');
                router.refresh();
            } catch (error) {
                console.error('Erro no logout:', error);
                // Mesmo com erro, redirecionar
                router.push('/');
            }
        };

        logout();
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Saindo...</h1>
                <p className="text-gray-600">Você está sendo desconectado.</p>
            </div>
        </div>
    );
}
