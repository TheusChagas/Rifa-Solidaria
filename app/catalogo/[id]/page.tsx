'use client'

import { getAllRifas } from "@/lib/getRifaID";
import { Rifa } from "@/types";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Trophy, Users, Phone, Mail } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/Logo.png";

interface Props {
    params: { id: string };
}

// Client component for image with error handling
function RifaImage({ src, alt, className }: { src: string; alt: string; className: string }) {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={(e) => {
                e.currentTarget.src = "/placeholder.png";
            }}
        />
    );
}

export default async function VendedorCatalogoPage(props: Props) {
    const params = await props.params;
    const vendedorId = params.id;
    
    // Fetch all raffles and filter by vendor
    const todasRifas = await getAllRifas();
    const rifasDoVendedor = todasRifas.filter(rifa => rifa.vendedorId === vendedorId);
    
    // If no vendor found
    if (rifasDoVendedor.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Vendedor não encontrado</h1>
                    <p className="text-gray-600 mb-4">
                        Não foi possível encontrar rifas para o vendedor ID: <code className="bg-gray-200 px-2 py-1 rounded">{vendedorId}</code>
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                        Vendedores disponíveis: {[...new Set(todasRifas.map(r => r.vendedorId))].join(', ')}
                    </p>
                    <div className="space-x-2">
                        <Link href="/">
                            <Button className="bg-green-500 hover:bg-green-600">Voltar ao início</Button>
                        </Link>
                        <Link href="/catalogo/vendor1">
                            <Button variant="outline">Ver Vendor 1</Button>
                        </Link>
                        <Link href="/catalogo/vendor2">
                            <Button variant="outline">Ver Vendor 2</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Get vendor info from the first raffle
    const vendedorInfo = rifasDoVendedor[0];
    const rifasAtivas = rifasDoVendedor.filter(rifa => rifa.status === 'ativo' && rifa.disponivel);
    const rifasFinalizadas = rifasDoVendedor.filter(rifa => rifa.status === 'finalizado' || !rifa.disponivel || rifa.percentualVendido === 100);
    const rifasPausadas = rifasDoVendedor.filter(rifa => rifa.status === 'pausado');
    
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header com Logo - Matching PaginaRifa style */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <Image
                            src={logo}
                            alt="Rifa Entre Amigos"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                        <h1 className="text-xl font-bold text-gray-800">RIFA ENTRE AMIGOS</h1>
                    </div>
                    <Link href="/" className="text-green-600 hover:text-green-700 font-medium">
                        ← Voltar ao início
                    </Link>
                </div>

                {/* Vendor Profile Section - White card with shadow like PaginaRifa */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                    {/* Banner similar to PaginaRifa */}
                    <div className="bg-green-500 text-white text-center py-3 font-bold text-lg">
                        Catálogo do Vendedor
                    </div>

                    <div className="p-6">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <Users className="w-8 h-8 text-green-600" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                        {vendedorInfo.vendedorNome || 'Vendedor'}
                                    </h2>
                                    <div className="flex items-center text-gray-600 space-x-4">
                                        <div className="flex items-center">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            <span className="text-sm">{vendedorInfo.categoria || 'Categoria não informada'}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            <span className="text-sm">
                                                Membro desde {new Date(vendedorInfo.dataInicio || Date.now()).getFullYear()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Contact Info */}
                            <div className="flex space-x-2">
                                {vendedorInfo.contatos && vendedorInfo.contatos[0] && (
                                    <a
                                        href={`https://wa.me/${vendedorInfo.contatos[0].telefone.replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        <Phone className="w-4 h-4" />
                                        <span>WhatsApp</span>
                                    </a>
                                )}
                                {vendedorInfo.emailContato && (
                                    <a
                                        href={`mailto:${vendedorInfo.emailContato}`}
                                        className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        <Mail className="w-4 h-4" />
                                        <span>Email</span>
                                    </a>
                                )}
                            </div>
                        </div>
                        
                        {/* Stats Grid - Matching PaginaRifa gradient style */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-green-600 font-semibold mb-2">Total de Rifas</p>
                                        <p className="text-3xl font-bold text-green-800">{rifasDoVendedor.length}</p>
                                        <p className="text-sm text-green-600 mt-1">Todas as rifas</p>
                                    </div>
                                    <Trophy className="w-8 h-8 text-green-600" />
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-green-600 font-semibold mb-2">Rifas Ativas</p>
                                        <p className="text-3xl font-bold text-green-800">{rifasAtivas.length}</p>
                                        <p className="text-sm text-green-600 mt-1">Disponíveis para compra</p>
                                    </div>
                                    <Trophy className="w-8 h-8 text-green-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Raffles Section */}
                {rifasAtivas.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <Trophy className="w-6 h-6 mr-2 text-green-600" />
                            Rifas Ativas ({rifasAtivas.length})
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rifasAtivas.map((rifa) => (
                                <RifaCard key={rifa.id} rifa={rifa} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Paused Raffles Section */}
                {rifasPausadas.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <Calendar className="w-6 h-6 mr-2 text-yellow-600" />
                            Rifas Pausadas ({rifasPausadas.length})
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rifasPausadas.map((rifa) => (
                                <RifaCard key={rifa.id} rifa={rifa} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Finished Raffles Section */}
                {rifasFinalizadas.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <Calendar className="w-6 h-6 mr-2 text-gray-600" />
                            Rifas Finalizadas ({rifasFinalizadas.length})
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rifasFinalizadas.map((rifa) => (
                                <RifaCard key={rifa.id} rifa={rifa} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State for no active raffles */}
                {rifasAtivas.length === 0 && rifasPausadas.length === 0 && rifasFinalizadas.length === 0 && (
                    <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                        <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhuma rifa encontrada</h3>
                        <p className="text-gray-600 mb-6">Este vendedor ainda não criou nenhuma rifa.</p>
                        <Link href="/">
                            <Button className="bg-green-500 hover:bg-green-600">
                                Voltar ao início
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

// Raffle Card Component - Updated to match PaginaRifa styling
function RifaCard({ rifa }: { rifa: Rifa }) {
    const progresso = Math.round((rifa.numerosVendidos.length / rifa.totalNumbers) * 100);
    const isFinished = rifa.status === 'finalizado' || !rifa.disponivel || progresso >= 100;
    const isPaused = rifa.status === 'pausado';
    
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
            {/* Status Banner - Similar to PaginaRifa */}
            <div className={`text-white text-center py-2 font-bold text-sm ${
                isFinished ? 'bg-gray-500' : isPaused ? 'bg-yellow-500' : 'bg-green-500'
            }`}>
                {isFinished ? 'FINALIZADA' : isPaused ? 'PAUSADA' : 'DISPONÍVEL'}
            </div>

            {/* Raffle Image */}
            <div className="relative h-48 bg-gray-100">
                {rifa.imagensPremioPrincipal && rifa.imagensPremioPrincipal[0] ? (
                    <RifaImage
                        src={rifa.imagensPremioPrincipal[0]}
                        alt={rifa.titulo}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 ${
                            (isFinished || isPaused) ? 'opacity-75 grayscale' : ''
                        }`}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Trophy className="w-12 h-12 text-gray-400" />
                    </div>
                )}
                
                {/* Progress Bar - Bottom overlay like PaginaRifa */}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                    <div className="w-full bg-gray-300 rounded-full h-2">
                        <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${progresso}%` }}
                        ></div>
                    </div>
                    <p className="text-white text-xs mt-1 text-center font-semibold">
                        {progresso}% vendido ({rifa.numerosVendidos.length}/{rifa.totalNumbers})
                    </p>
                </div>
            </div>
            
            <div className="p-6">
                <h3 className="font-bold text-xl mb-4 line-clamp-2 group-hover:text-green-600 transition-colors leading-tight">
                    {rifa.titulo}
                </h3>
                
                {/* Info Grid - Similar to PaginaRifa stats */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                        <p className="text-sm text-green-600 font-semibold mb-1">VALOR POR NÚMERO</p>
                        <p className="text-2xl font-bold text-green-800">R$ {rifa.preco.toFixed(2)}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-center bg-gray-50 p-2 rounded">
                            <span className="text-gray-600 block">Sorteio</span>
                            <span className="font-semibold">{new Date(rifa.dataSorteio).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="text-center bg-gray-50 p-2 rounded">
                            <span className="text-gray-600 block">Canal</span>
                            <span className="font-semibold text-xs">{rifa.canalTransmissao || 'A definir'}</span>
                        </div>
                    </div>
                </div>
                
                <Link href={`/compra/${rifa.id}`}>
                    <Button 
                        className={`w-full font-semibold py-3 transition-all duration-200 shadow-lg hover:shadow-xl ${
                            isFinished || isPaused 
                                ? 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed' 
                                : 'bg-green-500 hover:bg-green-600'
                        }`}
                        disabled={isFinished || isPaused}
                    >
                        {isFinished ? "Rifa Finalizada" : isPaused ? "Rifa Pausada" : "Participar da Rifa"}
                    </Button>
                </Link>
            </div>
        </div>
    );
}
