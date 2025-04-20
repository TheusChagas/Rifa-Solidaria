'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Ticket } from "lucide-react";
import Card from "@/components/Card";
import { RifaDialog } from "@/components/RifaDialog";
import { Rifa } from "@/types";

export default function Rifas() {
    const [selectedStatus, setSelectedStatus] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedRifa, setSelectedRifa] = useState<Rifa | null>(null);

    const rifas: Rifa[] = [
        //A função para puxar do backend vem aqui
        { id: 1, titulo: "Rifa 1", descricao: "Descrição da Rifa 1", progresso: 20, preco: 10, metodoPagamento: "Pix", disponivel: true },
        { id: 2, titulo: "Rifa 2", descricao: "Descrição da Rifa 2", progresso: 0, preco: 20, metodoPagamento: "Cartão", disponivel: false },
        { id: 3, titulo: "Rifa 3", descricao: "Descrição da Rifa 3", progresso: 100, preco: 30, metodoPagamento: "Boleto", disponivel: true },
        { id: 4, titulo: "Rifa 4", descricao: "Descrição da Rifa 4", progresso: 0, preco: 40, metodoPagamento: "Pix", disponivel: false },
        { id: 5, titulo: "Rifa 5", descricao: "Descrição da Rifa 5", progresso: 100, preco: 50, metodoPagamento: "Cartão", disponivel: true },
    ];

    const filteredRifas = rifas.filter((rifa) => (rifa.progresso === 100 ? 1 : 0) === selectedStatus);

    return (
        <div className="absolute top-20 left-8 md:top-24 md:left-72 w-[70%] overflow-x-hidden">
            <div className="flex items-center gap-2 text-lg font-semibold">
                <span>👋 Olá, usuário!</span>
            </div>
            <div className="mt-2">
                <Button className="flex rounded-xl bg-branco-100 items-center gap-1 text-sm font-bold text-preto-700 shadow-xl
                            relative px-4 py-2 text-sm font-medium rounded-md transition-colors overflow-hidden
                            before:absolute before:inset-0 before:bg-verde-200 before:scale-x-0 before:origin-left
                            before:transition-transform before:duration-300 hover:before:scale-x-100">
                    <Plus className="z-10" size={16} />
                    <span className="z-10">CRIAR RIFA</span>
                </Button>
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
                                    id={rifa.id}
                                    title={rifa.titulo}
                                    progress={rifa.progresso}
                                    variant={
                                        rifa.disponivel
                                            ? (rifa.progresso === 100 ? "finalizado" : "progresso")
                                            : "pagamento"
                                    }
                                    onVisualizar={() => {
                                        setSelectedRifa(rifa);
                                        setDialogOpen(true);
                                    }}
                                />
                            </div>
                        ))}
                        <div className="min-w-[50px]" />
                    </div>
                </div>
                <div className="pointer-events-none absolute top-0 right-0 h-[95%] w-24 bg-gradient-to-l from-branco-200 to-transparent" />
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