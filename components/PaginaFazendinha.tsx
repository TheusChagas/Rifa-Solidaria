"use client";

import Image from "next/image";
import logo from "@/assets/Logo.png";
import { Rifa, jogoDoBicho } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

export default function PaginaFazendinha({ config }: { config: Rifa }) {
    const {
        titulo,
        descricao,
        progresso,
        metodoPagamento,
        disponivel,
        preco,
        saleMode,
        premios,
        premio,
        dataSorteio,
        canalTransmissao,
        contatos,
        imagensPremioPrincipal,
    } = config;

    return (
        <div className="min-h-screen bg-green-50 p-6">
            {/* Header da rifa */}
            <div className="relative bg-white p-6 rounded-lg shadow mb-6 text-center overflow-hidden">
                {/* BG image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={logo}
                        alt="BG"
                        fill
                        style={{ objectFit: "cover", opacity: 0.10 }}
                        className="pointer-events-none select-none"
                        priority
                    />
                </div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold">{titulo}</h1>
                    {imagensPremioPrincipal && imagensPremioPrincipal.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                            {imagensPremioPrincipal.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`Imagem prêmio principal ${idx + 1}`}
                                    width={180}
                                    height={180}
                                    className="object-contain rounded"
                                />
                            ))}
                        </div>
                    ) : (
                        <Image
                            src={logo}
                            alt="Imagem da rifa"
                            width={300}
                            height={300}
                            className="mx-auto mt-4 object-contain"
                        />
                    )}
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
                    {premios && premios.length > 0 && (
                        <div className="mt-4">
                            <strong>Prêmios adicionais:</strong>
                            <ul className="mt-2 flex flex-col items-center gap-4">
                                {premios.map((p, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        {(p.imagens ?? []).length > 0 && (
                                            <div className="flex gap-2">
                                                {(p.imagens ?? []).map((img, j) => (
                                                    <img
                                                        key={j}
                                                        src={img}
                                                        alt={`Prêmio adicional ${i + 1}`}
                                                        width={60}
                                                        height={60}
                                                        className="object-contain rounded"
                                                    />
                                                ))}
                                            </div>
                                        )}
                                        <span>{p.nome}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="mt-2 text-gray-700">
                        <strong>Prêmio principal:</strong> R$ {premio !== undefined ? Number(premio).toFixed(2) : ""}
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

            {/* Nova seção: Tabela do Jogo do Bicho */}
            <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
                <h2 className="text-2xl font-semibold mb-4 text-center">Jogo do Bicho</h2>
                <div className="w-[70%] grid grid-cols-2 sm:grid-cols-5 gap-x-[0px] gap-y-2 justify-items-center mx-auto">
                    {jogoDoBicho.map((animal) => (
                        <Card
                            key={animal.id}
                            className="text-center w-[100px] sm:w-[140px] p-1 sm:p-2 flex flex-col items-center justify-center"
                        >
                            <CardContent className="flex flex-col items-center p-0">
                                <div className="mt-1 mb-1 mx-auto">
                                    {/* Use <img> para evitar problemas de AVIF */}
                                    <img
                                        src={typeof animal.icone === "string" ? animal.icone : (animal.icone as { src: string }).src ?? ""}
                                        alt={animal.nome}
                                        width={64}
                                        height={64}
                                        className="object-contain"
                                        loading="lazy"
                                        style={{ maxWidth: 64, maxHeight: 64 }}
                                    />
                                </div>
                                <p className="font-bold mt-1 text-xs">
                                    {String(animal.id).padStart(2, "0")} – {animal.nome}
                                </p>
                                <p className="text-xs text-gray-600">
                                    {animal.numeros.join(", ")}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
