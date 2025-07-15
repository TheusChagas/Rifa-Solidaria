'use client';

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card as UICard, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RifaDetailsDialog } from "@/components/vendedor/rifas/RifaDetailsDialog";

export interface CardProps {
    id: string;
    name: string;
    progress: number;
    variant: string;
    imagensPremioPrincipal?: string[];
    disponivel: boolean;
    preco?: number;
    numerosVendidos?: number[];
    totalNumbers?: number;
    rifaData?: any; // Add full rifa data
}

const Card = ({ id, name, progress, variant, imagensPremioPrincipal, disponivel, preco, numerosVendidos, totalNumbers, rifaData }: CardProps) => {
    const [isDialogOpen, setDialogOpen] = useState(false);

    // Calculate total raised if data is available
    const totalArrecadado = (preco && numerosVendidos) ? preco * numerosVendidos.length : 0;

    const cardVariantStyles = {
        progresso: {
            card: "border border-green-400 rounded-lg shadow-sm lg:w-[400px] h-auto",
            progressIndicator: "bg-green-400",
            button: cn(
                buttonVariants({ variant: "outline" }),
                "w-[100px] md:w-[120px] h-[35px] rounded-xl border-2 border-green-500",
                "text-green-500 font-semibold hover:bg-green-500 hover:text-white",
                "hover:scale-[103%] md:hover:scale-[115%] transition-transform"
            )
        },
        finalizado: {
            card: "border border-green-400 rounded-lg shadow-lg lg:w-[400px] h-auto bg-green-50",
            progressIndicator: "bg-green-500",
            button: cn(
                buttonVariants({ variant: "outline" }),
                "w-[100px] md:w-[120px] h-[35px] rounded-xl border-2 border-green-500",
                "text-green-500 font-semibold hover:bg-green-500 hover:text-white",
                "hover:scale-[103%] md:hover:scale-[115%] transition-transform"
            )
        },
        pagamento: {
            card: "border border-red-500 rounded-lg shadow-sm lg:w-[400px] h-auto",
            progressIndicator: "bg-red-500",
            button: cn(
                buttonVariants({ variant: "outline" }),
                "w-[100px] md:w-[120px] h-[35px] rounded-xl border-2 border-red-500",
                "text-red-500 font-semibold hover:bg-red-500 hover:text-white",
                "hover:scale-[103%] md:hover:scale-[115%] transition-transform"
            )
        }
    };

    const styles = cardVariantStyles[variant as keyof typeof cardVariantStyles] || cardVariantStyles.progresso;

    return (
        <>
            <UICard className={styles.card}>
                {/* Imagem de capa */}
                {imagensPremioPrincipal && imagensPremioPrincipal[0] && (
                    <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                        <img
                            src={imagensPremioPrincipal[0]}
                            alt="Premio"
                            className={`w-full h-full object-cover ${!disponivel ? 'opacity-50 grayscale' : ''}`}
                        />
                        {!disponivel && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                                <span className="text-white text-sm font-bold">Bloqueado</span>
                            </div>
                        )}
                    </div>
                )}

                <CardHeader className="pb-2">
                    <div className="flex flex-col">
                        <CardTitle className="text-lg font-bold line-clamp-2 mb-2">
                            {name}
                        </CardTitle>
                        {!disponivel && (
                            <div>
                                <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                                    Rifa Indisponível
                                </span>
                            </div>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="pt-0">
                    <div className="space-y-3">
                        {disponivel ? (
                            <>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-medium">Progresso</span>
                                        <span className="text-sm font-bold">{progress}%</span>
                                    </div>
                                    <Progress value={progress} className="h-2" indicatorColor={styles.progressIndicator} />
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="bg-gray-50 p-2 rounded">
                                        <span className="text-gray-600">Preço</span>
                                        <p className="font-semibold text-green-600">
                                            R$ {preco ? preco.toFixed(2) : '0,00'}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-2 rounded">
                                        <span className="text-gray-600">Vendidos</span>
                                        <p className="font-semibold">
                                            {numerosVendidos ? numerosVendidos.length : 0}/{totalNumbers || 0}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 p-2 rounded">
                                    <span className="text-sm text-blue-600">Total Arrecadado</span>
                                    <p className="font-bold text-blue-700 text-lg">
                                        R$ {totalArrecadado.toFixed(2)}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-gray-400">Progresso</span>
                                    <span className="text-sm font-bold text-gray-400">--</span>
                                </div>
                                <Progress value={0} className="h-2 opacity-50" indicatorColor="bg-gray-300" />
                            </div>
                        )}

                        {!disponivel && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-semibold text-yellow-800">Aguardando Pagamento</span>
                                </div>
                                <p className="text-xs text-yellow-700">
                                    Tempo restante: <span className="font-bold">23h 45m</span>
                                </p>
                                <p className="text-xs text-yellow-600 mt-1">
                                    Complete o pagamento para ativar sua rifa
                                </p>
                            </div>
                        )}

                        <div className="flex gap-2 pt-2">
                            <Button
                                className={styles.button}
                                onClick={() => {
                                    setDialogOpen(true);
                                }}
                                disabled={!disponivel}
                            >
                                Visualizar
                            </Button>

                            <Link href={`/compra/${id}`} className="flex-1">
                                <Button
                                    className={cn(
                                        styles.button,
                                        "w-full"
                                    )}
                                    disabled={!disponivel}
                                >
                                    {disponivel ? 'Acessar' : 'Indisponível'}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </UICard>

            <RifaDetailsDialog
                open={isDialogOpen}
                onOpenChange={setDialogOpen}
                id={Number(id)}
                rifa={rifaData} // Pass the full rifa data
            />
        </>
    );
};

export default Card;
