'use client'

import { getAllRifas } from "@/lib/getRifaID";
import { Rifa } from "@/types";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Trophy, Users, Phone, Mail } from "lucide-react";

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
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
                            <Button>Voltar ao início</Button>
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
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="text-verde-600 hover:text-verde-700 font-medium">
                            ← Voltar ao início
                        </Link>
                        <Badge variant="outline" className="text-verde-600 border-verde-300">
                            Catálogo do Vendedor
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Vendor Profile Section */}
                <Card className="mb-8">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-verde-100 rounded-full flex items-center justify-center">
                                    <Users className="w-8 h-8 text-verde-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl text-gray-900 mb-2">
                                        {vendedorInfo.vendedorNome || 'Vendedor'}
                                    </CardTitle>
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
                                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        <Phone className="w-4 h-4" />
                                        WhatsApp
                                    </a>
                                )}
                                {vendedorInfo.emailContato && (
                                    <a
                                        href={`mailto:${vendedorInfo.emailContato}`}
                                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        <Mail className="w-4 h-4" />
                                        Email
                                    </a>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                    
                    <CardContent>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-verde-50 to-verde-100 p-4 rounded-xl border border-verde-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-verde-600 text-sm font-medium">Total de Rifas</p>
                                        <p className="text-2xl font-bold text-verde-800">{rifasDoVendedor.length}</p>
                                    </div>
                                    <Trophy className="w-8 h-8 text-verde-600" />
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-600 text-sm font-medium">Rifas Ativas</p>
                                        <p className="text-2xl font-bold text-blue-800">{rifasAtivas.length}</p>
                                    </div>
                                    <Trophy className="w-8 h-8 text-blue-600" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Active Raffles Section */}
                {rifasAtivas.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <Trophy className="w-6 h-6 mr-2 text-verde-600" />
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
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
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
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
                    <div className="text-center py-12">
                        <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhuma rifa encontrada</h3>
                        <p className="text-gray-600">Este vendedor ainda não criou nenhuma rifa.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Raffle Card Component
function RifaCard({ rifa }: { rifa: Rifa }) {
    const progresso = Math.round((rifa.numerosVendidos.length / rifa.totalNumbers) * 100);
    const isFinished = rifa.status === 'finalizado' || !rifa.disponivel || progresso >= 100;
    const isPaused = rifa.status === 'pausado';
    
    return (
        <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
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
                
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                    <Badge 
                        variant={isFinished ? "secondary" : isPaused ? "outline" : "default"}
                        className={
                            isFinished ? "bg-gray-500 text-white" : 
                            isPaused ? "bg-yellow-500 text-white" : 
                            "bg-verde-600 text-white"
                        }
                    >
                        {isFinished ? "Finalizada" : isPaused ? "Pausada" : "Ativa"}
                    </Badge>
                </div>
                
                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                    <div className="w-full bg-gray-300 rounded-full h-2">
                        <div 
                            className="bg-verde-500 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${progresso}%` }}
                        ></div>
                    </div>
                    <p className="text-white text-xs mt-1 text-center">
                        {progresso}% vendido
                    </p>
                </div>
            </div>
            
            <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-verde-600 transition-colors">
                    {rifa.titulo}
                </h3>
                
                <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Valor:</span>
                        <span className="font-semibold text-verde-600">R$ {rifa.preco.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Números:</span>
                        <span>{rifa.numerosVendidos.length}/{rifa.totalNumbers}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Sorteio:</span>
                        <span>{new Date(rifa.dataSorteio).toLocaleDateString('pt-BR')}</span>
                    </div>
                </div>
                
                <Link href={`/compra/${rifa.id}`}>
                    <Button 
                        className="w-full" 
                        disabled={isFinished || isPaused}
                        variant={isFinished || isPaused ? "secondary" : "default"}
                    >
                        {isFinished ? "Finalizada" : isPaused ? "Pausada" : "Participar"}
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}
