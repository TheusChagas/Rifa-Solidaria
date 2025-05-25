"use client";

import Image from "next/image";
import logo from "@/assets/Logo.png";
import { Rifa } from "@/types";

export default function PaginaFazendinha({ config }: { config: Rifa }) {
    const {
        titulo,
        descricao,
        progresso,
        metodoPagamento,
        disponivel,
        totalNumbers,
        preco,
        premio,
        saleMode,
        numerosVendidos,
        dataSorteio,
        canalTransmissao,
        contatos
    } = config;

    return (
        <div className="min-h-screen bg-green-50 p-6">
            <div className="bg-white p-6 rounded-lg shadow mb-6 text-center">
                <h1 className="text-3xl font-bold">{titulo}</h1>
                <Image
                    src={logo}
                    alt="Imagem da rifa"
                    width={300}
                    height={300}
                    className="mx-auto mt-4 object-contain"
                />
                <div className="mt-4 text-red-600 font-semibold">
                    Página temporária para rifas do tipo Fazendinha 🚜
                </div>
                <p className="mt-2 text-gray-700">{descricao}</p>
                <div className="mt-2 text-gray-700">
                    <strong>Progresso:</strong> {progresso}
                </div>
                <div className="mt-2 text-gray-700">
                    <strong>Métodos de pagamento:</strong> {metodoPagamento}
                </div>
                <div className="mt-2 text-gray-700">
                    <strong>Status:</strong> {disponivel ? "Disponível" : "Indisponível"}
                </div>
                <div className="mt-2 text-gray-700">
                    <strong>Valor:</strong> R$ {preco?.toFixed(2)} {saleMode}
                </div>
                <div className="mt-2 text-gray-700">
                    <strong>Prêmio:</strong> R$ {premio !== undefined ? Number(premio).toFixed(2) : ""}
                </div>
                <div className="mt-2 text-gray-700">
                    <strong>Data do sorteio:</strong> {new Date(dataSorteio).toLocaleString("pt-BR")}
                </div>
                <div className="mt-2 text-gray-700">
                    <strong>Transmissão ao vivo:</strong> {canalTransmissao}
                </div>
                <div className="mt-4">
                    <strong>Suporte / Contatos:</strong>
                    <ul className="mt-1 space-y-1">
                        {contatos?.map((c: any) => (
                            <li key={c.telefone} className="flex items-center justify-center">
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
