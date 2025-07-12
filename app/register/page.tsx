'use client'

import React from 'react'
import Image from 'next/image'
import Logo from "@/assets/Logo.png"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

const formSchema = z.object({
    nome: z.string().min(2, { message: "Mínimo 2 caracteres" }).max(10, { message: "Máximo 10 caracteres" }),
    sobrenome: z.string().min(2, { message: "Mínimo 2 caracteres" }).max(50, { message: "Máximo 50 caracteres" }),
    email: z.string().email({ message: "E-mail inválido" }),
    senha: z.string().min(8, { message: "Mínimo 8 caracteres" }).max(20, { message: "Máximo 20 caracteres" }),
    confirmarSenha: z.string().min(8, { message: "Mínimo 8 caracteres" }).max(20, { message: "Máximo 20 caracteres" }),
    cpf: z.string().min(14, "CPF incompleto")
        .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: "Formato inválido. Use 999.999.999-99" }),
    celular: z.string().min(15, "Número incompleto")
        .regex(/^\(\d{2}\) \d{5}-\d{4}$/, { message: "Formato inválido. Use (99) 99999-9999" }),
    cidade: z.string().min(2, { message: "Mínimo 2 caracteres" }).max(50, { message: "Máximo 50 caracteres" }),
    cep: z.string().min(9, "CEP incompleto")
        .regex(/^\d{5}-\d{3}$/, { message: "Formato inválido. Use 99999-999" })
}).refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"]
});
export default function Page() {
    // 1. Defina o formulário
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            sobrenome: "",
            email: "",
            senha: "",
            confirmarSenha: "",
            cpf: "",
            celular: "",
            cidade: "",
            cep: "",
        },
    })
    const applyPhoneMask = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);

        if (!match) return "";

        let formatted = "";

        if (match[1]) formatted += `(${match[1]}`;
        if (match[2]) formatted += `) ${match[2]}`;
        if (match[3]) formatted += `-${match[3]}`;

        return formatted;
    };

    const applyCpfMask = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);

        if (!match) return "";

        let formatted = "";

        if (match[1]) formatted += match[1];
        if (match[2]) formatted += `.${match[2]}`;
        if (match[3]) formatted += `.${match[3]}`;
        if (match[4]) formatted += `-${match[4]}`;

        return formatted;
    };

    const applyCepMask = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{0,5})(\d{0,3})$/);

        if (!match) return "";

        let formatted = "";

        if (match[1]) formatted += match[1];
        if (match[2]) formatted += `-${match[2]}`;

        return formatted;
    };

    // 2. Defina o manipulador de envio
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div className='w-full max-w-md mx-auto px-4 sm:px-6 md:max-w-2xl lg:max-w-3xl'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 p-4 sm:p-6">
                    <div className='flex justify-center'>
                        <Image src={Logo} alt='Logo' className='w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32' priority={true} />
                    </div>
                    <div className='pt-2 sm:pt-4'>
                        <header className='text-center'>
                            <h1 className='font-bold text-lg sm:text-xl md:text-2xl'>Registre-se!</h1>
                            <p className='text-gray-500 font-semibold text-sm sm:text-base'>Preencha os campos abaixo para registrar-se.</p>
                        </header>
                    </div>
                    <div className='flex flex-col sm:flex-row justify-between gap-2 sm:gap-3'>
                        <FormField
                            control={form.control}
                            name="nome"
                            render={({ field }) => (
                                <FormItem className='w-full sm:w-[48%]'>
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nome" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sobrenome"
                            render={({ field }) => (
                                <FormItem className='w-full sm:w-[48%]'>
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                        <Input placeholder="Sobrenome" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='pt-[1px]'>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                        <Input placeholder="E-mail" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex flex-col sm:flex-row justify-between gap-2 sm:gap-3'>
                        <FormField
                            control={form.control}
                            name="senha"
                            render={({ field }) => (
                                <FormItem className='w-full sm:w-[48%]'>
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                        <Input placeholder="Senha" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmarSenha"
                            render={({ field }) => (
                                <FormItem className='w-full sm:w-[48%]'>
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                        <Input placeholder="Confirmar Senha" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex flex-col sm:flex-row justify-between gap-2 sm:gap-3'>
                        <FormField
                            control={form.control}
                            name="cpf"
                            render={({ field }) => (
                                <FormItem className='w-full sm:w-[48%]'>
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="CPF"
                                            {...field}
                                            onChange={(e) => {
                                                const formattedValue = applyCpfMask(e.target.value);
                                                field.onChange(formattedValue);
                                            }}
                                            maxLength={14}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="celular"
                            render={({ field }) => (
                                <FormItem className='w-full sm:w-[48%]'>
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="(99) 99999-9999"
                                            {...field}
                                            onChange={(e) => {
                                                const formattedValue = applyPhoneMask(e.target.value);
                                                field.onChange(formattedValue);
                                            }}
                                            maxLength={15}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex flex-col sm:flex-row justify-between gap-2 sm:gap-3'>
                        <FormField
                            control={form.control}
                            name="cidade"
                            render={({ field }) => (
                                <FormItem className='w-full sm:w-[48%]'>
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                        <Input placeholder="Cidade" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cep"
                            render={({ field }) => (
                                <FormItem className='w-full sm:w-[48%]'>
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="CEP"
                                            {...field}
                                            onChange={(e) => {
                                                const formattedValue = applyCepMask(e.target.value);
                                                field.onChange(formattedValue);
                                            }}
                                            maxLength={9}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='text-gray-500 font-medium flex items-start space-x-2 pt-2'>
                        <Checkbox id="checktermo" className='data-[state=checked]:bg-verde-600 mt-1 flex-shrink-0' />
                        <label htmlFor="checktermo" className='text-xs sm:text-sm leading-tight'>
                            Ao se registrar, você aceita os{' '}
                            <a className='text-black underline hover:text-gray-800' href='register/termo'>
                                Termos de Uso
                            </a>
                            {' '}e a{' '}
                            <a className='text-black underline hover:text-gray-800' href='register/privacidade'>
                                nossa Política de Privacidade
                            </a>
                            .
                        </label>
                    </div>
                    <div className='flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-3'>
                        <a className='text-gray-500 font-medium text-sm sm:text-base hover:text-gray-700' href='login'>
                            Já tem conta?
                        </a>
                        <Button 
                            type="submit" 
                            className='w-full sm:w-auto bg-verde-600 hover:bg-verde-700 px-6 py-2 rounded-lg text-white font-bold text-sm sm:text-base'
                        >
                            Registre-se
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}