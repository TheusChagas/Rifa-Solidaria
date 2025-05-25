// app/components/PaginaRifa.tsx
"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/assets/Logo.png"

export interface RifaConfig {
    id: string;
    titulo: React.ReactNode;
    descricao: React.ReactNode;
    progresso: React.ReactNode;
    metodoPagamento: React.ReactNode;
    disponivel: any;
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

export default function PaginaRifa({ config }: { config: RifaConfig & { imagensPremioPrincipal?: string[], premios?: { nome: string, imagens?: string[] }[] } }) {
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
        contatos,
        imagensPremioPrincipal,
        premios
    } = config as any;

    const [numeros, setNumeros] = useState<
        { numero: number; status: "disponivel" | "vendido" | "selecionado" }[]
    >([]);
    const [selecionados, setSelecionados] = useState<number[]>([]);

    // 1º console.log: mostra os números iniciais após o setup
    useEffect(() => {
        const lista = Array.from(
            { length: totalNumbers },
            (_, i): { numero: number; status: "disponivel" | "vendido" } => ({
                numero: i,
                status: numerosVendidos.includes(i) ? "vendido" : "disponivel",
            })
        );
        const inicial = lista.map((n) => ({ ...n, status: n.status }));
        setNumeros(inicial);
        console.log("[PaginaRifa] Números iniciais:", inicial);
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

    const total = selecionados.length * preco;

    return (
        <div className="min-h-screen bg-yellow-50 p-6">
            {/* Cabeçalho */}
            <div className="
                bg-white
                flex flex-col md:flex-row
                justify-center items-center
                space-y-6 md:space-y-0
                md:space-x-40
                p-6 rounded-lg shadow mb-6
                text-center">
                <div>
                    <h1 className="text-3xl font-bold">{titulo}</h1>
                    {/* Imagens do prêmio principal */}
                    {imagensPremioPrincipal && imagensPremioPrincipal.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                            {imagensPremioPrincipal.map((img: string, idx: number) => (
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
                </div>
                <div>
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

                    {/* Prêmios adicionais com imagens */}
                    {premios && premios.length > 0 && (
                        <div className="mt-4">
                            <strong>Prêmios adicionais:</strong>
                            <ul className="mt-2 flex flex-col items-center gap-4">
                                {premios.map((premio: { nome: string; imagens?: string[] }, idx: number) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        {premio.imagens && premio.imagens.length > 0 && (
                                            <div className="flex gap-2">
                                                {premio.imagens.map((img, imgIdx) => (
                                                    <img
                                                        key={imgIdx}
                                                        src={img}
                                                        alt={`Imagem prêmio adicional ${idx + 1} - ${imgIdx + 1}`}
                                                        width={60}
                                                        height={60}
                                                        className="object-contain rounded"
                                                    />
                                                ))}
                                            </div>
                                        )}
                                        <span>{premio.nome}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

            </div>

            {/* Seletor de números */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h2 className="text-center font-semibold mb-4">Selecione seus números</h2>
                <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 justify-items-center mx-[5%] lg:mx-[12.5%]">
                    {numeros.map((n) => (
                        <button
                            key={n.numero}
                            onClick={() => {
                                if (n.status !== "vendido") {
                                    toggleNumero(n.numero);
                                    console.log("[PaginaRifa] Selecionados:", selecionados.includes(n.numero)
                                        ? selecionados.filter(x => x !== n.numero)
                                        : [...selecionados, n.numero]
                                    );
                                }
                            }}
                            disabled={n.status === "vendido"}
                            className={cn(
                                "h-10 w-20 rounded-md text-sm font-medium transition flex items-center justify-center",
                                {
                                    "bg-green-400 text-white hover:bg-green-500": n.status === "disponivel",
                                    "bg-blue-600 text-white": n.status === "selecionado",
                                    "bg-gray-300 text-gray-500 cursor-not-allowed": n.status === "vendido",
                                }
                            )}
                        >
                            {n.numero.toString().padStart(2, "0")}
                        </button>
                    ))}
                </div>
            </div>

            {/* Resumo e Ações */}
            <div className="bg-white p-6 rounded-lg shadow flex justify-between items-center mb-6">
                <div>
                    <p className="text-gray-700">
                        Selecionados: {selecionados.length
                            ? selecionados.map((x) => x.toString().padStart(2, "0")).join(", ")
                            : "nenhum"}
                    </p>
                    <p className="text-gray-700">Total: R$ {total.toFixed(2)}</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={() => window.location.reload()}>
                        Cancelar
                    </Button>

                    {/* Dialog com formulário puro */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button disabled={selecionados.length === 0}>Confirmar</Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[425px] z-50">
                            <DialogHeader>
                                <DialogTitle>Reservar Rifa</DialogTitle>
                            </DialogHeader>

                            <form
                                method="post"
                                action="/api/reservar"
                                className="grid gap-4 py-4"
                            >
                                {/* Campos do usuário */}
                                <div className="space-y-2">
                                    <Label htmlFor="nome">Nome ou apelido</Label>
                                    <Input id="nome" name="nome" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="telefone">Telefone (BR)</Label>
                                    <Input id="telefone" name="telefone" placeholder="(DD) XXXXX-XXXX" required />
                                </div>
                                <div className="flex gap-4">
                                    <div className="space-y-2 flex-1">
                                        <Label htmlFor="uf">UF</Label>
                                        <Input id="uf" name="uf" required />
                                    </div>
                                    <div className="space-y-2 flex-1">
                                        <Label htmlFor="cidade">Cidade</Label>
                                        <Input id="cidade" name="cidade" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bairro">Bairro</Label>
                                    <Input id="bairro" name="bairro" required />
                                </div>

                                {/* Campos ocultos */}
                                <input type="hidden" name="numeros" value={JSON.stringify(selecionados)} />
                                <input type="hidden" name="total" value={total.toString()} />

                                {/* Checkbox de termos */}
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms" name="terms" required />
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Aceito os Termos de Uso e a Política de Privacidade.
                                    </label>
                                </div>

                                <Button type="submit" className="w-full">
                                    RESERVAR
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Rodapé */}
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
                        {contatos.map((c: { nome: string; telefone: string; avatarUrl?: string }) => (
                            <li key={c.telefone} className="flex items-center">
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
