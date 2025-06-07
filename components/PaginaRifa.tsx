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
    const [hoveredImage, setHoveredImage] = useState<string | null>(null);
    const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [selectedMainImage, setSelectedMainImage] = useState<string>("");

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

    // Set initial main image
    useEffect(() => {
        if (premios && premios.length > 0 && premios[0].imagens && premios[0].imagens.length > 0) {
            setSelectedMainImage(premios[0].imagens[0]);
        } else if (imagensPremioPrincipal && imagensPremioPrincipal.length > 0) {
            setSelectedMainImage(imagensPremioPrincipal[0]);
        }
    }, [premios, imagensPremioPrincipal]);

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

    const handleImageHover = (imageSrc: string, event: React.MouseEvent) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
        
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
        }
        
        if (!hoveredImage) {
            const timeout = setTimeout(() => {
                setHoveredImage(imageSrc);
            }, 500);
            setHoverTimeout(timeout);
        } else {
            setHoveredImage(imageSrc);
        }
    };

    const handleImageLeave = () => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            setHoverTimeout(null);
        }
        setHoveredImage(null);
    };

    return (
        <div className="min-h-screen bg-yellow-50 p-6">
            {/* Cabeçalho */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
                {/* Layout Desktop */}
                <div className="hidden lg:grid lg:grid-cols-2 gap-6">
                    {/* Topo Esquerda - Título, Descrição e Logo */}
                    <div className="flex items-center gap-6">
                        {/* Logo do Site */}
                        <div className="flex-shrink-0">
                            <Image
                                src={logo}
                                alt="Rifa Entre Amigos"
                                width={200}
                                height={200}
                                className="object-contain"
                            />
                        </div>
                        
                        {/* Título e Descrição */}
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold text-gray-800 mb-3">{titulo}</h1>
                            <p className="text-lg text-gray-600 mb-4">{descricao}</p>
                        </div>
                    </div>

                    {/* Topo Direita - Informações da Rifa */}
                    <div>
                        <h4 className="font-semibold text-lg text-gray-800 mb-3 flex items-center gap-2">
                            💰 Informações da Rifa
                        </h4>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="text-center mb-3 bg-white p-3 rounded-lg shadow-sm">
                                <p className="text-sm text-gray-600 font-medium">Valor por número</p>
                                <p className="font-bold text-3xl text-blue-700 bg-blue-100 px-4 py-2 rounded-full inline-block mt-1">
                                    R$ {preco.toFixed(2)}
                                </p>
                                <p className="text-xs text-gray-500 mt-1 font-medium">{saleMode}</p>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                                    <span className="text-gray-600 font-medium">Pagamento:</span>
                                    <span className="font-bold text-blue-700">{metodoPagamento}</span>
                                </div>
                                <div className="flex justify-between items-center bg-white p-2 rounded-lg shadow-sm">
                                    <span className="text-gray-600 font-bold">Números faltantes:</span>
                                    <span className="font-bold text-xl text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                                        {totalNumbers - numerosVendidos.length}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Layout Mobile */}
                <div className="lg:hidden space-y-6">
                    {/* Logo */}
                    <div className="flex justify-center">
                        <Image
                            src={logo}
                            alt="Rifa Entre Amigos"
                            width={150}
                            height={150}
                            className="object-contain"
                        />
                    </div>
                    
                    {/* Título e Descrição */}
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800 mb-3">{titulo}</h1>
                        <p className="text-lg text-gray-600">{descricao}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {/* Baixo Esquerda - Prêmio Principal */}
                    <div>
                        <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
                            🏆 Prêmio Principal
                        </h3>
                        
                        {/* Prêmio principal - primeiro item do array de prêmios ou imagens principais */}
                        {premios && premios.length > 0 ? (
                            <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                                <p className="font-bold text-xl text-green-800 mb-3 text-center">{premios[0].nome}</p>
                                <div className="flex flex-wrap gap-4 mb-4">
                                    <img
                                        src={selectedMainImage || (premios[0].imagens && premios[0].imagens.length > 0 ? premios[0].imagens[0] : "")}
                                        alt="Prêmio principal"
                                        width={380}
                                        height={380}
                                        className="object-contain rounded border-2 border-green-300"
                                        onError={(e) => {
                                            e.currentTarget.src = "/placeholder.png";
                                        }}
                                    />
                                </div>
                                
                                {/* Carousel de imagens */}
                                {((premios[0].imagens && premios[0].imagens.length > 1) || (imagensPremioPrincipal && imagensPremioPrincipal.length > 1)) && (
                                    <div className="overflow-x-auto">
                                        <div className="flex gap-2 pb-2">
                                            {(premios[0].imagens || imagensPremioPrincipal || []).map((img: string, idx: number) => (
                                                <img
                                                    key={idx}
                                                    src={img}
                                                    alt={`Prêmio principal ${idx + 1}`}
                                                    width={70}
                                                    height={70}
                                                    className={`object-contain rounded border-2 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0 ${
                                                        selectedMainImage === img ? 'border-green-600 border-4' : 'border-green-300'
                                                    }`}
                                                    onClick={() => setSelectedMainImage(img)}
                                                    onError={(e) => {
                                                        e.currentTarget.src = "/placeholder.png";
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : imagensPremioPrincipal && imagensPremioPrincipal.length > 0 ? (
                            <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                                <div className="flex flex-wrap gap-4 mb-4">
                                    <img
                                        src={selectedMainImage || imagensPremioPrincipal[0]}
                                        alt="Prêmio principal"
                                        width={320}
                                        height={320}
                                        className="object-contain rounded border-2 border-green-300"
                                        onError={(e) => {
                                            e.currentTarget.src = "/placeholder.png";
                                        }}
                                    />
                                </div>
                                
                                {/* Carousel de imagens */}
                                {imagensPremioPrincipal.length > 1 && (
                                    <div className="overflow-x-auto">
                                        <div className="flex gap-2 pb-2">
                                            {imagensPremioPrincipal.map((img: string, idx: number) => (
                                                <img
                                                    key={idx}
                                                    src={img}
                                                    alt={`Prêmio principal ${idx + 1}`}
                                                    width={70}
                                                    height={70}
                                                    className={`object-contain rounded border-2 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0 ${
                                                        selectedMainImage === img ? 'border-green-600 border-4' : 'border-green-300'
                                                    }`}
                                                    onClick={() => setSelectedMainImage(img)}
                                                    onError={(e) => {
                                                        e.currentTarget.src = "/placeholder.png";
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                                <Image
                                    src={logo}
                                    alt="Prêmio da rifa"
                                    width={320}
                                    height={320}
                                    className="object-contain rounded"
                                />
                            </div>
                        )}
                    </div>

                    {/* Baixo Direita - Prêmios adicionais */}
                    <div>
                        {premios && premios.length > 1 && (
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
                                    🎁 Prêmios Adicionais
                                </h3>
                                <div className="bg-green-50 p-4 rounded-lg border border-green-200 relative h-[544px]">
                                    <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-green-100">
                                        <div className="space-y-3 pr-2 pb-16">
                                            {premios.slice(1).map((premio: { nome: string; imagens?: string[] }, idx: number) => (
                                                <div 
                                                    key={idx} 
                                                    className="bg-white p-4 rounded-lg border-2 border-green-300 shadow-sm hover:shadow-md transition-shadow"
                                                >
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span className="text-lg font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                                                            🎁 {premio.nome}
                                                        </span>
                                                    </div>
                                                    {premio.imagens && premio.imagens.length > 0 && (
                                                        <div className="flex gap-2 flex-wrap">
                                                            {premio.imagens.map((img, imgIdx) => (
                                                                <img
                                                                    key={imgIdx}
                                                                    src={img}
                                                                    alt={`Prêmio adicional ${idx + 1} - ${imgIdx + 1}`}
                                                                    width={70}
                                                                    height={70}
                                                                    className="object-contain rounded border cursor-pointer hover:opacity-80 transition-opacity"
                                                                    onMouseEnter={(e) => handleImageHover(img, e)}
                                                                    onMouseLeave={handleImageLeave}
                                                                    onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
                                                                    onError={(e) => {
                                                                        e.currentTarget.src = "/placeholder.png";
                                                                    }}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Fade effect at bottom - positioned to avoid scrollbar */}
                                    <div className="absolute bottom-4 left-4 right-8 h-12 bg-gradient-to-t from-green-50 via-green-50/80 to-transparent pointer-events-none rounded-b-lg"></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Informações da Rifa - Mobile (aparece por último) */}
                <div className="lg:hidden mt-6">
                    <h4 className="font-semibold text-lg text-gray-800 mb-3 flex items-center gap-2">
                        💰 Informações da Rifa
                    </h4>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="text-center mb-3 bg-white p-3 rounded-lg shadow-sm">
                            <p className="text-sm text-gray-600 font-medium">Valor por número</p>
                            <p className="font-bold text-3xl text-blue-700 bg-blue-100 px-4 py-2 rounded-full inline-block mt-1">
                                R$ {preco.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 font-medium">{saleMode}</p>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                                <span className="text-gray-600 font-medium">Pagamento:</span>
                                <span className="font-bold text-blue-700">{metodoPagamento}</span>
                            </div>
                            <div className="flex justify-between items-center bg-white p-2 rounded-lg shadow-sm">
                                <span className="text-gray-600 font-bold">Números faltantes:</span>
                                <span className="font-bold text-xl text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                                    {totalNumbers - numerosVendidos.length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Hover Popup */}
            {hoveredImage && (
                <div
                    className="fixed pointer-events-none z-50 transition-opacity duration-300 ease-in-out"
                    style={{
                        left: mousePosition.x + 15,
                        top: Math.max(10, mousePosition.y - 200),
                    }}
                >
                    <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-4 max-w-lg">
                        <img
                            src={hoveredImage}
                            alt="Preview"
                            className="w-96 h-96 object-contain rounded transition-opacity duration-300"
                            style={{
                                imageRendering: 'auto',
                                filter: 'contrast(1.1) saturate(1.1)',
                            }}
                            onError={(e) => {
                                e.currentTarget.src = "/placeholder.png";
                            }}
                        />
                    </div>
                </div>
            )}

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
                    {new Date(dataSorteio).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}
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
