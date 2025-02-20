'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Plus, Ticket } from "lucide-react";
import Card from "@/components/Card";

export default function rifas() {
    const [selectedStatus, setSelectedStatus] = useState(0);

    const rifas = [
        //Aqui vem a função para puxar as rifas
        { id: 1, nome: "Rifa 1", progress: 20, status: 0 },
        { id: 2, nome: "Rifa 2", progress: 70, status: 0 },
        { id: 3, nome: "Rifa 3", progress: 100, status: 1 },
        { id: 4, nome: "Rifa 4", progress: 50, status: 0 },
        { id: 5, nome: "Rifa 5", progress: 100, status: 1 },
        { id: 6, nome: "Rifa 6", progress: 100, status: 1 },
        { id: 7, nome: "Rifa 7", progress: 100, status: 1 },
        { id: 8, nome: "Rifa 8", progress: 50, status: 0 },
    ];

    const filteredRifas = rifas.filter((rifa) => rifa.status === selectedStatus);

    return (
        <div className="absolute top-24 left-72 w-[70%] overflow-x-hidden">
            <div className="flex items-center gap-2 text-lg font-semibold">
                <span>👋 Olá, usuário!</span>
            </div>
            <div className="mt-2">
                <Button 
                    variant={'flat'}
                    className="flex rounded-xl bg-branco-100 items-center gap-1 text-sm font-bold text-preto-700 shadow-xl
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
                            variant={'flat'}
                            className={`relative rounded-md px-3 py-1 bg-white border overflow-hidden transition-colors font-medium text-sm
                            before:absolute before:inset-0 before:bg-verde-200 before:scale-x-0 before:origin-left
                            before:transition-transform before:duration-300 hover:before:scale-x-100 shadow-lg
                            ${selectedStatus === 0 ? "border-verde-300 border-2 text-verde-700" : "border-gray-300 text-preto-500"}`}
                            onClick={() => setSelectedStatus(0)}
                        >
                            <span className="relative z-10">Em andamento</span>
                        </Button>
                        <Button
                            variant={'flat'}
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
                            <div key={rifa.id} className="min-w-[250px]">
                                <Card
                                    title={rifa.nome}
                                    variant="rifa"
                                    progress={rifa.progress}
                                />
                            </div>
                        ))}
                        <div className="min-w-[50px]" />
                    </div>
                </div>
                <div className="pointer-events-none absolute top-0 right-0 h-[95%] w-24 bg-gradient-to-l from-white to-transparent" />
            </div>
        </div>
    );
};
