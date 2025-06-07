'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Logo from "@/assets/Logo.png"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

const formSchema = z.object({
    email: z.string().email(),
    senha: z.string().min(8).max(20)
});

export default function Page() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // 1. Defina o formulário
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "usuario@teste.com", // Pré-preencher com usuário de teste
            senha: "12345678" // Pré-preencher com senha de teste
        }
    });

    // 2. Defina o manipulador de envio
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (data.success) {
                // Redirecionar para a página do vendedor
                router.push('/vendedor');
                router.refresh(); // Refresh para atualizar o estado da navbar
            } else {
                setError(data.message || 'Erro ao fazer login');
            }
        } catch (error) {
            console.error('Erro no login:', error);
            setError('Erro de conexão. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-5">
                        <div className="items-center justify-center flex flex-col mb-6">
                            <Image
                                src={Logo}
                                alt="Logo"
                                className="w-24 h-24 md:w-32 md:h-32"
                                priority
                            />
                            <h1 className="text-2xl font-bold text-gray-800 mt-4">Login</h1>
                            <p className="text-gray-600 text-sm mt-2">
                                Use: usuario@teste.com / 12345678
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="senha"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Senha" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="text-gray-500 font-medium md:flex items-center md:justify-between pt-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    className="data-[state=checked]:bg-verde-600"
                                />
                                <label htmlFor="remember" className="text-sm">
                                    Lembrar senha
                                </label>
                            </div>
                            <p className="text-sm hover:text-green-600 cursor-pointer">
                                Trocar senha
                            </p>
                        </div>

                        <div className="flex items-center flex-col space-y-4 pt-4">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="bg-verde-600 hover:bg-verde-700 p-2 w-full rounded-lg text-white font-bold"
                            >
                                {isLoading ? 'Entrando...' : 'Entrar'}
                            </Button>
                            <a
                                className="text-gray-500 font-medium hover:text-green-600"
                                href="/register"
                            >
                                Não possui conta ainda?
                            </a>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}