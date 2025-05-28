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
  email: z.string().email(),
  senha: z.string().min(8).max(20),
});
export default function Page() {
  // 1. Defina o formulário
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  })
 
  // 2. Defina o manipulador de envio
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className='md:w-[50%] justify-self-center mt-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-5">
          <div className='items-center justify-self-center'>
          <Image src={Logo} alt='Logo' className='w-24 h-24 md:w-32 md:h-32' priority={true} />
          {/* Corrigir para usar Image do Next.js ou garantir caminho absoluto */}
          <Image src="/assets/logo rifa sem fundo.png" alt="" width={128} height={128} />

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

          <div className='text-gray-500 font-medium md:flex items-center md:justify-between pt-4'>
            <div className='space-x-1'>
            <Checkbox id="remember" className='data-[state=checked]:bg-verde-600 '></Checkbox>
            <label htmlFor="remember" id='lembrar'>Lembrar senha</label>
            </div>
            
            <p>Trocar senha</p>
          </div>
          <div className='flex items-center flex-col space-y-4'>
            <Button type="submit" className='bg-verde-600 hover:bg-verde-700 p-2  w-full rounded-lg  text-white font-bold'>Entrar</Button>
            <a className='text-gray-500 font-medium' href='register'>Não possui conta ainda?</a>
          </div>
        </form>
      </Form>
    </div>
  )
}