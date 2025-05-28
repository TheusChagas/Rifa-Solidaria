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
    email: z.string().email(),
    senha: z.string().min(8).max(20),
    celular: z.string().min(11, "Número incompleto")
        .regex(/^\(\d{2}\) \d{5}-\d{4}$/, { message: "Formato inválido. Use (99) 99999-9999" })
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
            celular: "",
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

    // 2. Defina o manipulador de envio
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div className='md:w-[50%] justify-self-center'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-5">
                    <Image src={Logo} alt='Logo' className='w-24 h-24 md:w-32 md:h-32' priority={true} />
                    {/* Corrigir para usar Image do Next.js ou garantir caminho absoluto */}
                    <Image src="/assets/logo rifa sem fundo.png" alt="" width={128} height={128} />
                    <header className=''>
                        <h1 className='font-bold text-xl'>Registre-se!</h1>
                        <p className='text-gray-500 font-semibold'>Preencha os campos abaixo para registrar - se.</p>
                    </header>
                    <div className='flex md:flex-row justify-between'>
                        <FormField
                            control={form.control}
                            name="nome"
                            render={({ field }) => (
                                <FormItem className='w-[48%]'>
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
                                <FormItem className='w-[48%]'>
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                        <Input placeholder="Sobrenome" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel></FormLabel>
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
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <Input placeholder="Senha" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="celular"
                        render={({ field }) => (
                            <FormItem>
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
                    <div className='text-gray-500 font-medium flex items-center justify-between space-x-4 '>
                        <Checkbox id="checktermo" className='data-[state=checked]:bg-verde-600 ' ></Checkbox>
                        <label htmlFor="termo" id='termo'>Ao se registrar, você aceita os <a className='text-black underline' href='register/termo'>Termos de Uso</a> e a <a className='text-black underline' href='register/privacidade'>nossa Politica de Privacidade</a>.   </label>
                    </div>
                    <div className='flex items-center space-x-44   xl:justify-between'>
                        <a className='text-gray-500 font-medium' href='login'>Já tem conta?</a>
                        <Button type="submit" className='bg-verde-600 hover:bg-verde-700 p-2 xl:w-1/5 1/4 rounded-lg  text-white font-bold'>Registre-se</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}