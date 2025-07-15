'use client'

import { Apoiador } from "@/types";

interface CarrosselApoiadoresProps {
    apoiadores: Apoiador[];
    loading: boolean;
}

export function CarrosselApoiadores({ apoiadores, loading }: CarrosselApoiadoresProps) {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-emerald-100 rounded-full animate-pulse"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Gradient overlays for scroll effect */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-emerald-50 to-transparent z-10 pointer-events-none"></div>
            
            <div className="overflow-hidden py-8">
                <div className="flex animate-scroll-left">
                    {/* First set of cards */}
                    <div className="flex space-x-6 flex-shrink-0">
                        {apoiadores.map((apoiador, index) => (
                            <ApoiadorCard key={index} apoiador={apoiador} />
                        ))}
                    </div>
                    
                    {/* Second set of cards (duplicate for infinite scroll) */}
                    <div className="flex space-x-6 flex-shrink-0 ml-6">
                        {apoiadores.map((apoiador, index) => (
                            <ApoiadorCard key={`duplicate-${index}`} apoiador={apoiador} />
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Mobile scroll hint */}
            <div className="flex justify-center mt-6 md:hidden">
                <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium border border-emerald-200">
                    Movimento automático contínuo
                </div>
            </div>
        </div>
    );
}

interface ApoiadorCardProps {
    apoiador: Apoiador;
}

function ApoiadorCard({ apoiador }: ApoiadorCardProps) {
    return (
        <div className="group relative flex-shrink-0 w-[200px] sm:w-[220px] md:w-[240px]">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-300 to-green-400 rounded-3xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            
            {/* Card */}
            <div className="relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:scale-105 border border-emerald-100">
                {/* Background pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
                
                <div className="relative z-10 flex flex-col items-center space-y-4">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-emerald-200 group-hover:border-emerald-300 transition-colors duration-300">
                            <img 
                                src={apoiador.imagem} 
                                alt={apoiador.nome}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center text-emerald-700 font-bold text-xl">${apoiador.nome.charAt(0)}</div>`;
                                }}
                            />
                        </div>
                    </div>
                    
                    {/* Content */}
                    <div className="text-center">
                        <h4 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-emerald-700 transition-colors duration-300">
                            {apoiador.nome}
                        </h4>
                        <p className="text-emerald-600 text-sm font-medium">Apoiador</p>
                    </div>
                    
                    {/* Badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium border border-emerald-200">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                        Ativo
                    </div>
                </div>
            </div>
        </div>
    );
}
