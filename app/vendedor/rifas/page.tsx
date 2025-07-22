'use client'

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Ticket, Eye } from "lucide-react";
import Card from "@/components/vendedor/rifas/Card";
import { RifaDialog } from "@/components/vendedor/rifas/RifaDialog";
import { Rifa as RifaBase } from "@/types";
import { useVendorContext } from "@/app/vendedor/layout";

type Rifa = RifaBase & { progresso: number };

export default function Rifas() {
    const [selectedStatus, setSelectedStatus] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedRifa, setSelectedRifa] = useState<Rifa | null>(null);
    const [rifas, setRifas] = useState<Rifa[]>([]);
    const [loading, setLoading] = useState(true);
    
    const { vendorInfo, vendorData, vendorId, loading: vendorLoading } = useVendorContext();

    useEffect(() => {
        if (vendorLoading || !vendorId) return;

        setLoading(true);
        fetch(`/api/rifas?vendorId=${vendorId}`)
            .then(res => res.ok ? res.json() : [])
            .then((data: any[]) => {
                setRifas(
                    (Array.isArray(data) ? data : [])
                        .filter(Boolean)
                        .filter((r: any) => r.vendorId === vendorId || (!r.vendorId && vendorId === 'vendor1'))
                        .map((r: any) => {
                            const calculatedProgress = Math.round((r.numerosVendidos.length / r.totalNumbers) * 100);
                            return {
                                ...r,
                                progresso: calculatedProgress,
                                titulo: typeof r.titulo === "string" ? r.titulo : String(r.titulo),
                                descricao: typeof r.descricao === "string" ? r.descricao : String(r.descricao),
                                metodoPagamento: typeof r.metodoPagamento === "string" ? r.metodoPagamento : String(r.metodoPagamento),
                                disponivel: !!r.disponivel,
                                preco: Number(r.preco),
                                totalNumbers: Number(r.totalNumbers),
                                premio: typeof r.premio === "number" ? r.premio : Number(r.premio),
                                saleMode: r.saleMode || "",
                                numerosVendidos: Array.isArray(r.numerosVendidos) ? r.numerosVendidos : [],
                                dataSorteio: r.dataSorteio || "",
                                canalTransmissao: r.canalTransmissao || "",
                                contatos: Array.isArray(r.contatos) ? r.contatos : [],
                                imagensPremioPrincipal: r.imagensPremioPrincipal || [],
                                premios: r.premios || [],
                                vendorId: r.vendorId || vendorId
                            };
                        })
                );
            })
            .catch(error => {
                console.error('Erro ao carregar rifas:', error);
                setRifas([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [vendorId, vendorLoading]);

    // 0 = Em andamento, 1 = Concluídas
    const filteredRifas = rifas.filter((rifa) =>
        selectedStatus === 0
            ? rifa.progresso < 100
            : rifa.progresso >= 100
    );

    if (vendorLoading) {
        return (
            <div className="absolute top-20 left-8 md:top-16 md:left-72 w-[70%] overflow-x-hidden">
                <div className="flex justify-center items-center py-8">
                    <div className="text-gray-500">Carregando dados do vendedor...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="absolute top-20 left-8 md:top-16 md:left-72 w-[70%] overflow-x-hidden">
            <div className="flex items-center gap-2 text-lg font-semibold">
                <span>👋 Olá, {vendorInfo?.name || 'Vendedor'}!</span>
                {vendorData && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>({vendorId})</span>
                        {vendorData.verificacao?.documentoAprovado && (
                            <span className="px-2 py-1 bg-verde-100 text-verde-700 rounded-full text-xs">
                                ✓ Verificado
                            </span>
                        )}
                    </div>
                )}
            </div>
            <div className="mt-2 flex gap-3">
                <Link href={`/vendedor/rifas/cria?vendorId=${vendorId}`}>
                    <Button
                        className="flex rounded-xl bg-branco-100 items-center gap-1 text-sm font-bold text-preto-700 shadow-xl
                                relative px-4 py-2 text-sm font-medium rounded-md transition-colors overflow-hidden
                                before:absolute before:inset-0 before:bg-verde-200 before:scale-x-0 before:origin-left
                                before:transition-transform before:duration-300 hover:before:scale-x-100 cursor-pointer"
                        role="link"
                    >
                        <Plus className="z-10" size={16} />
                        <span className="z-10">CRIAR RIFA</span>
                    </Button>
                </Link>
                <Link href={`/catalogo?vendorId=${vendorId}`}>
                    <Button
                        className="flex rounded-xl bg-branco-100 items-center gap-1 text-sm font-bold text-preto-700 shadow-xl
                                relative px-4 py-2 text-sm font-medium rounded-md transition-colors overflow-hidden
                                before:absolute before:inset-0 before:bg-verde-200 before:scale-x-0 before:origin-left
                                before:transition-transform before:duration-300 hover:before:scale-x-100 cursor-pointer"
                        role="link"
                    >
                        <Eye className="z-10" size={16} />
                        <span className="z-10">VER CATÁLOGO</span>
                    </Button>
                </Link>
            </div>

            {vendorData?.estatisticas && (
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                        <div className="text-gray-500">Total de Rifas</div>
                        <div className="font-bold text-lg">{vendorData.estatisticas.totalRifas}</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                        <div className="text-gray-500">Rifas Ativas</div>
                        <div className="font-bold text-lg">{vendorData.estatisticas.rifasAtivas}</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                        <div className="text-gray-500">Total Arrecadado</div>
                        <div className="font-bold text-lg">R$ {vendorData.estatisticas.totalArrecadado?.toLocaleString('pt-BR')}</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                        <div className="text-gray-500">Avaliação</div>
                        <div className="font-bold text-lg">{vendorData.estatisticas.mediaAvaliacoes}⭐</div>
                    </div>
                </div>
            )}

            <div className="mt-6">
                <div className="flex items-center gap-2 text-base font-semibold">
                    <Ticket size={18} />
                    <span>Minhas Rifas</span>
                </div>
                <p className="text-sm text-gray-500">
                    Aqui estão suas rifas criadas.
                </p>
            </div>

            <div className="mb-8">
                <div className="flex my-2 items-center text-base font-semibold">
                    <div className="flex gap-2">
                        <Button
                            className={`relative rounded-md px-3 py-1 bg-white border overflow-hidden transition-colors font-medium text-sm
                                    before:absolute before:inset-0 before:bg-verde-200 before:scale-x-0 before:origin-left
                                    before:transition-transform before:duration-300 hover:before:scale-x-100 shadow-lg
                                    ${selectedStatus === 0 ? "border-verde-300 border-2 text-verde-700" : "border-gray-300 text-preto-500"}`}
                            onClick={() => setSelectedStatus(0)}
                        >
                            <span className="relative z-10">Em andamento</span>
                        </Button>
                        <Button
                            className={`relative rounded-md px-3 py-1 bg-white border overflow-hidden transition-colors font-medium text-sm
                                    before:absolute before:inset-0 before:bg-verde-200 before:scale-x-0 before:origin-left
                                    before:transition-transform before:duration-300 hover:before:scale-x-100 shadow-lg
                                    ${selectedStatus === 1 ? "border-verde-300 border-2 text-verde-700" : "border-gray-300 text-preto-500"}`}
                            onClick={() => setSelectedStatus(1)}
                        >
                            <span className="relative z-10">Concluídas</span>
                        </Button>
                    </div>
                </div>
                <p className="text-sm text-gray-500">
                    Aqui estão suas rifas criadas.
                </p>
            </div>

            <div className="relative mt-4">
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="text-gray-500">Carregando rifas...</div>
                    </div>
                ) : filteredRifas.length === 0 ? (
                    <div className="flex flex-col justify-center items-center py-8">
                        <div className="text-gray-500 mb-4">
                            {selectedStatus === 0 ? 'Nenhuma rifa em andamento' : 'Nenhuma rifa concluída'}
                        </div>
                        {selectedStatus === 0 && (
                            <Link href={`/vendedor/rifas/cria?vendorId=${vendorId}`}>
                                <Button className="bg-verde-500 hover:bg-verde-600 text-white">
                                    Criar primeira rifa
                                </Button>
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <div className="flex gap-4">
                            {filteredRifas.map((rifa) => (
                                <div key={rifa.id}>
                                    <Card
                                        id={String(rifa.id)}
                                        name={typeof rifa.titulo === "string" ? rifa.titulo : ""}
                                        progress={rifa.progresso}
                                        variant={
                                            rifa.disponivel
                                                ? (rifa.progresso === 100 ? "finalizado" : "progresso")
                                                : "pagamento"
                                        }
                                        imagensPremioPrincipal={rifa.imagensPremioPrincipal}
                                        disponivel={rifa.disponivel}
                                        preco={rifa.preco}
                                        numerosVendidos={rifa.numerosVendidos}
                                        totalNumbers={rifa.totalNumbers}
                                        rifaData={rifa}
                                    />
                                </div>
                            ))}
                            <div className="min-w-[50px]" />
                        </div>
                    </div>
                )}
            </div>

            {/* Dialog para visualizar os detalhes da rifa */}
            {dialogOpen && selectedRifa && (
                <RifaDialog
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                    rifa={selectedRifa}
                />
            )}
        </div>
    );
}