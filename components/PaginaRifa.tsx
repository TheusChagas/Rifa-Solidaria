// app/components/PaginaRifa.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface RifaConfig {
    id: string;
    totalNumbers: number;
    preco: number;
    premio: number;
    saleMode: string;
    numerosVendidos: number[];
    dataSorteio: string;
    canalTransmissao: string;
    contatos: {
        nome: string;
        telefone: string;
        avatarUrl?: string;
    }[];
}

export default function PaginaRifa({ config }: { config: RifaConfig }) {
    const {
        id,
        totalNumbers,
        preco,
        premio,
        saleMode,
        numerosVendidos,
        dataSorteio,
        canalTransmissao,
        contatos,
    } = config;

    const [numeros, setNumeros] = useState<
        { numero: number; status: "disponivel" | "vendido" | "selecionado" }[]
    >([]);
    const [selecionados, setSelecionados] = useState<number[]>([]);

    useEffect(() => {
        const lista = Array.from(
            { length: totalNumbers },
            (_, i): { numero: number; status: "disponivel" | "vendido" } => ({
                numero: i,
                status: numerosVendidos.includes(i) ? "vendido" : "disponivel",
            })
        );

        setNumeros(
            // agora TS sabe que status é sempre "vendido" ou "disponivel"
            lista.map((n) => ({ ...n, status: n.status }))
        );
    }, [totalNumbers, numerosVendidos]);

    function toggleNumero(n: number) {
        setNumeros((prev) =>
            prev.map((x) =>
                x.numero === n
                    ? {
                        ...x,
                        status:
                            x.status === "disponivel"
                                ? "selecionado"
                                : x.status === "selecionado"
                                    ? "disponivel"
                                    : x.status,
                    }
                    : x
            )
        );
        setSelecionados((prev) =>
            prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
        );
    }

    return (
        <div className="min-h-screen bg-yellow-50 p-6">
            {/* → Cabeçalho */}
            <div className="bg-white p-6 rounded-lg shadow text-center mb-6">
                <h1 className="text-3xl font-bold">Rifa do Xerifão JB</h1>
                <p className="mt-2 text-gray-700">
                    Apenas R$ {preco.toFixed(2)} {saleMode}
                </p>
                <div className="mt-4 flex justify-center gap-6">
                    <div className="bg-green-400 text-white px-4 py-2 rounded">
                        Valor<br />R$ {preco.toFixed(2)}
                    </div>
                    <div className="bg-yellow-500 text-white px-4 py-2 rounded">
                        Prêmio<br />R$ {premio.toFixed(2)}
                    </div>
                </div>
            </div>

            {/* → Filtro de números */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h2 className="text-center font-semibold mb-4">Selecione seus números</h2>
                <div className="grid grid-cols-10 gap-2">
                    {numeros.map((n) => (
                        <button
                            key={n.numero}
                            onClick={() => n.status !== "vendido" && toggleNumero(n.numero)}
                            disabled={n.status === "vendido"}
                            className={cn(
                                "h-10 rounded-md text-sm font-medium transition",
                                "flex items-center justify-center",
                                {
                                    "bg-green-400 text-white hover:bg-green-500":
                                        n.status === "disponivel",
                                    "bg-blue-600 text-white": n.status === "selecionado",
                                    "bg-gray-300 text-gray-500 cursor-not-allowed":
                                        n.status === "vendido",
                                }
                            )}
                        >
                            {n.numero.toString().padStart(2, "0")}
                        </button>
                    ))}
                </div>
            </div>

            {/* → Resumo e ações */}
            <div className="bg-white p-6 rounded-lg shadow flex justify-between items-center mb-6">
                <div>
                    <p className="text-gray-700">
                        Selecionados:{" "}
                        {selecionados.length > 0
                            ? selecionados
                                .map((x) => x.toString().padStart(2, "0"))
                                .join(", ")
                            : "nenhum"}
                    </p>
                    <p className="text-gray-700">
                        Total: R$ {(selecionados.length * preco).toFixed(2)}
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={() => window.location.reload()}>
                        Cancelar
                    </Button>
                    <Button disabled={selecionados.length === 0}>Confirmar</Button>
                </div>
            </div>

            {/* → Rodapé com data, canal e contatos */}
            <div className="bg-white p-4 rounded-lg shadow space-y-2 text-gray-600">
                <p>
                    <strong>Data do sorteio:</strong>{" "}
                    {new Date(dataSorteio).toLocaleString("pt-BR")}
                </p>
                <p>
                    <strong>Transmissão ao vivo:</strong> {canalTransmissao}
                </p>
                <div>
                    <strong>Suporte / Contatos:</strong>
                    <ul className="mt-1 space-y-1">
                        {contatos.map((c) => (
                            <li key={c.telefone}>
                                {c.avatarUrl && (
                                    <img
                                        src={c.avatarUrl}
                                        alt={c.nome}
                                        className="inline-block h-6 w-6 rounded-full mr-2"
                                    />
                                )}
                                <span>{c.nome}</span> –{" "}
                                <a
                                    href={`https://wa.me/${c.telefone.replace(/\D/g, "")}`}
                                    className="text-green-600 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {c.telefone}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
