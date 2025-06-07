'use client'

import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600 p-5">
      <div className="text-center bg-white p-12 md:p-16 rounded-2xl shadow-2xl max-w-lg w-full">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600 drop-shadow-lg mb-4">
            404
          </h1>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Página não encontrada
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-md mx-auto">
          Ops! A página que você está procurando não existe ou foi movida. Que tal voltar ao início?
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Voltar ao Início
            </Link>
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => router.back()}
            className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Página Anterior
          </Button>
        </div>

        <div className="mt-8 p-4 bg-green-50 rounded-lg">
          <p className="text-green-700 text-sm">
            Precisa de ajuda? Entre em contato conosco através do suporte.
          </p>
        </div>
      </div>
    </div>
  );
}
