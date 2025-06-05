'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Ticket } from "lucide-react";
import Card from "@/components/Card";
import { RifaDialog } from "@/components/RifaDialog";
import { Rifa } from "@/types";

export default function Rifas() {
    const [selectedStatus, setSelectedStatus] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedRifa, setSelectedRifa] = useState<Rifa | null>(null);
    const [rifas, setRifas] = useState<Rifa[]>([]);

    useEffect(() => {
        fetch("/api/rifas")
            .then(res => res.ok ? res.json() : [])
            .then((data: any[]) => {
                setRifas(
                    (Array.isArray(data) ? data : []).filter(Boolean).map((r: any) => ({
                        ...r,
                        progresso: typeof r.progresso === "string"
                            ? parseInt(r.progresso.replace("%", ""), 10)
                            : Number(r.progresso),
                        titulo: typeof r.titulo === "string"
                            ? r.titulo
                            : String(r.titulo),
                        descricao: typeof r.descricao === "string"
                            ? r.descricao
                            : String(r.descricao),
                        metodoPagamento: typeof r.metodoPagamento === "string"
                            ? r.metodoPagamento
                            : String(r.metodoPagamento),
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
                    }))
                );
            });
    }, []);

    // 0 = Em andamento, 1 = Concluídas
    const filteredRifas = rifas.filter((rifa) =>
        selectedStatus === 0
            ? Number(rifa.progresso) < 100
            : Number(rifa.progresso) >= 100
    );

    return (
        <div className="absolute top-20 left-8 md:top-16 md:left-72 w-[70%] overflow-x-hidden">
            <div className="flex items-center gap-2 text-lg font-semibold">
                <span>👋 Olá, usuário!</span>
            </div>
            <div className="mt-2">
                <Link href="/vendedor/rifas/cria">
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
            </div>

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
                <div className="overflow-x-auto">
                    <div className="flex gap-4">
                        {filteredRifas.map((rifa) => (
                            <div key={rifa.id}>
                                <Card
                                    id={parseInt(String(rifa.id))}
                                    title={typeof rifa.titulo === "string" ? rifa.titulo : ""}
                                    progress={Number(rifa.progresso)}
                                    variant={
                                        rifa.disponivel
                                            ? (Number(rifa.progresso) === 100 ? "finalizado" : "progresso")
                                            : "pagamento"
                                    }
                                    onVisualizar={() => {
                                        setSelectedRifa(rifa);
                                        setDialogOpen(true);
                                    }}
                                    imagensPremioPrincipal={rifa.imagensPremioPrincipal} // nova prop
                                />
                            </div>
                        ))}
                        <div className="min-w-[50px]" />
                    </div>
                </div>
                {/* Removido gradiente e adicionada borda no Card */}
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