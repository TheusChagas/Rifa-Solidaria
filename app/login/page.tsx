'use client'

import React from 'react'
import { Input } from '@/components/ui/input' 
import Image from 'next/image'
import Logo from "@/assets/Logo.png"
import { Checkbox } from '@/components/ui/checkbox'

function page() {
  return (
    <div className='items-center space-y-4 md:mt-[5%] mt-[40%]'>
      
      <div className=' justify-self-center'>
        <Image src={Logo} alt='Logo' className='w-24 h-24 md:w-32 md:h-32' priority={true} ></Image>
        <img src="assets/logo rifa sem fundo.png" alt="" />
      </div>

      <div className='m-5  justify-self-center w-1/2 space-y-1  '>
          <Input type="email" placeholder='Email' className='' />
          <Input type="password" placeholder='Senha' className='' />
      </div>
      <div className='md:justify-self-center ml-28 md:ml-0'>
        <div className='sm:flex sm:space-x-[150px] md:space-x-[275px] xl:space-x-[400px]'>
          <div className='flex items-center space-x-2'>
            <Checkbox id="remember" className='data-[state=checked]:bg-verde-600' ></Checkbox>
            <label htmlFor="remember" id='lembrar'>Lembrar Senha</label>
          </div>
          <label htmlFor="forget" className='text-verde-600 font-semibold hover:text-verde-700'>Trocar Senha</label>
        </div>
      </div>
      <div className='justify-self-center w-1/2'>
        <button className='bg-verde-600 hover:bg-verde-700 p-2 w-full rounded-lg  text-white font-bold'>
          Entrar
        </button>
      </div>
      <div className='justify-self-center '>
      <a href="" className='text-gray-600 font-semibold'>Não possui conta ainda?</a>
      </div>
      
    </div>
  )
}

export default page