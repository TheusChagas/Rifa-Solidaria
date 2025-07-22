"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import { Rifa } from "@/types";

interface RifaCardProps {
    rifa: Rifa;
}

export function RifaCard({ rifa }: RifaCardProps) {
    const progresso = Math.round((rifa.numerosVendidos.length / rifa.totalNumbers) * 100);
    const isFinished = rifa.status === 'finalizado' || !rifa.disponivel || progresso >= 100;
    const isPaused = rifa.status === 'pausado';
    
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = "/placeholder.png";
    };
    
    return (
        <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
            {/* Raffle Image */}
            <div className="relative h-48 bg-gray-100">
                {rifa.imagensPremioPrincipal && rifa.imagensPremioPrincipal[0] ? (
                    <img
                        src={rifa.imagensPremioPrincipal[0]}
                        alt={rifa.titulo}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 ${
                            (isFinished || isPaused) ? 'opacity-75 grayscale' : ''
                        }`}
                        onError={handleImageError}
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
