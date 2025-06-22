// app/components/PaginaRifa.tsx
"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { validatePhoneNumber, formatPhoneNumber, getCompradorByPhone } from "@/lib/getCompradores";
import { Comprador } from "@/types";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [isNewBuyer, setIsNewBuyer] = useState<boolean>(false);
    const [phoneValidated, setPhoneValidated] = useState<boolean>(false);
    const [existingBuyer, setExistingBuyer] = useState<Comprador | null>(null);
    const [isValidating, setIsValidating] = useState<boolean>(false);
    const [showAdditionalFields, setShowAdditionalFields] = useState<boolean>(false);

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

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!phoneNumber.trim()) {
            alert('Por favor, digite um número de telefone.');
            return;
        }

        setIsValidating(true);
        
        try {
            if (validatePhoneNumber(phoneNumber)) {
                const formattedPhone = formatPhoneNumber(phoneNumber);
                const buyer = await getCompradorByPhone(formattedPhone);
                
                if (buyer) {
                    setExistingBuyer(buyer);
                    setIsNewBuyer(false);
                    setShowAdditionalFields(false);
                    setPhoneValidated(true);
                    
                    // Auto-submit after 1 second for existing buyer
                    setTimeout(() => {
                        // Create and submit form programmatically
                        const form = document.createElement('form');
                        form.method = 'post';
                        form.action = '/api/reservar';
                        form.style.display = 'none';

                        const fields = [
                            { name: 'telefone', value: formattedPhone },
                            { name: 'numeros', value: JSON.stringify(selecionados) },
                            { name: 'total', value: total.toString() },
                            { name: 'isNewBuyer', value: 'false' },
                            { name: 'existingBuyerName', value: buyer.nome },
                            { name: 'existingBuyerEmail', value: buyer.email },
                            { name: 'existingBuyerCity', value: buyer.cidade },
                            { name: 'existingBuyerState', value: buyer.estado }
                        ];

                        fields.forEach(field => {
                            const input = document.createElement('input');
                            input.type = 'hidden';
                            input.name = field.name;
                            input.value = field.value;
                            form.appendChild(input);
                        });

                        document.body.appendChild(form);
                        form.submit();
                    }, 1000);
                } else {
                    setExistingBuyer(null);
                    setIsNewBuyer(true);
                    setShowAdditionalFields(true);
                    setPhoneValidated(true);
                }
            } else {
                alert('Número de telefone inválido. Use o formato (DD) XXXXX-XXXX');
                setPhoneValidated(false);
                setIsNewBuyer(false);
                setShowAdditionalFields(false);
            }
        } catch (error) {
            alert('Erro ao validar telefone. Tente novamente.');
            setPhoneValidated(false);
            setIsNewBuyer(false);
            setShowAdditionalFields(false);
        } finally {
            setIsValidating(false);
        }
    };

    const handleFinalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        form.submit();
    };

    return (
        <div className="min-h-screen bg-yellow-50 p-6">
            {/* Novo Cabeçalho Simplificado */}
            <div className="bg-white p-6 rounded-lg shadow mb-6 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold text-gray-800 mb-3">{titulo}</h1>
                        <p className="text-lg text-gray-600 mb-4">{descricao}</p>
                        <p className="text-sm text-gray-500 font-medium">{saleMode}</p>
                    </div>

                    {/* Lista de Prêmios */}
                    {(premios && premios.length > 0) && (
                        <div className="bg-transparent rounded-lg p-4">
                            {/* Primeiro Prêmio Centralizado */}
                            <div className="text-center mb-2">
                                <div className="bg-white rounded-lg border border-gray-200 p-4 inline-block shadow-sm">
                                    <h3 className="font-bold text-xl text-gray-800">🏆 1° {premios[0].nome}</h3>
                                </div>
                            </div>

                            {/* Dropdown de Prêmios Adicionais */}
                            {premios.length > 1 && (
                                <div className="flex justify-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 flex items-center gap-2">
                                                🎁 Prêmios Adicionais
                                                <div className="relative">
                                                    <svg 
                                                        className="w-4 h-4 text-gray-600" 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                    <div className="absolute inset-0 animate-ping">
                                                        <svg 
                                                            className="w-4 h-4 text-gray-400 opacity-75" 
                                                            fill="none" 
                                                            stroke="currentColor" 
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56" align="center">
                                            {premios.slice(1).map((premio: { nome: string; imagens?: string[] }, idx: number) => (
                                                <DropdownMenuItem key={idx} className="flex items-center gap-2">
                                                    <span className="bg-gray-600 text-white font-bold px-2 py-1 rounded-full text-xs">
                                                        {idx + 2}°
                                                    </span>
                                                    <span>{premio.nome}</span>
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

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
                                                            {idx + 2}° 🎁 {premio.nome}
                                                        </span>
                                                    </div>
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

                    {/* Dialog com formulário */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button disabled={selecionados.length === 0}>Confirmar</Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[425px] z-50 max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Reservar Rifa</DialogTitle>
                            </DialogHeader>

                            {!showAdditionalFields ? (
                                // Primeira etapa: apenas telefone
                                <form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="telefone">Telefone (WhatsApp)</Label>
                                        <Input 
                                            id="telefone" 
                                            name="telefone" 
                                            placeholder="(DD) XXXXX-XXXX" 
                                            required 
                                            type="tel"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            disabled={isValidating}
                                        />
                                        {phoneValidated && existingBuyer && (
                                            <p className="text-sm text-green-600">
                                                🎉 Bem-vindo de volta {existingBuyer.nome}! Redirecionando em 1 segundo...
                                            </p>
                                        )}
                                    </div>

                                    <Button 
                                        type="submit" 
                                        className="w-full"
                                        disabled={isValidating || !phoneNumber.trim()}
                                    >
                                        {isValidating ? 'Validando...' : 'RESERVAR'}
                                    </Button>
                                </form>
                            ) : (
                                // Segunda etapa: dados completos para novo comprador
                                <form
                                    onSubmit={handleFinalSubmit}
                                    method="post"
                                    action="/api/reservar"
                                    className="grid gap-4 py-4"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="telefone_final">Telefone (WhatsApp)</Label>
                                        <Input 
                                            id="telefone_final" 
                                            name="telefone" 
                                            value={phoneNumber}
                                            readOnly
                                            className="bg-gray-100"
                                        />
                                        <p className="text-sm text-green-600">
                                            🎉 Bem-vindo à plataforma! Por favor, preencha os campos abaixo para concluir sua reserva
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="nome">Nome completo</Label>
                                        <Input 
                                            id="nome" 
                                            name="nome" 
                                            required 
                                            placeholder="Digite seu nome completo"
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input 
                                            id="email" 
                                            name="email" 
                                            type="email" 
                                            required 
                                            placeholder="seuemail@exemplo.com"
                                        />
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="cidade">Cidade</Label>
                                            <Input 
                                                id="cidade" 
                                                name="cidade" 
                                                required 
                                                placeholder="Digite sua cidade"
                                            />
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="estado">Estado</Label>
                                            <Input 
                                                id="estado" 
                                                name="estado" 
                                                required 
                                                placeholder="UF"
                                                maxLength={2}
                                                style={{ textTransform: 'uppercase' }}
                                                onChange={(e) => {
                                                    e.target.value = e.target.value.toUpperCase();
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Campos ocultos */}
                                    <input type="hidden" name="numeros" value={JSON.stringify(selecionados)} />
                                    <input type="hidden" name="total" value={total.toString()} />
                                    <input type="hidden" name="isNewBuyer" value="true" />

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

                                    <div className="flex gap-2">
                                        <Button 
                                            type="button" 
                                            variant="outline"
                                            onClick={() => {
                                                setShowAdditionalFields(false);
                                                setPhoneValidated(false);
                                                setIsNewBuyer(false);
                                            }}
                                            className="flex-1"
                                        >
                                            Voltar
                                        </Button>
                                        <Button type="submit" className="flex-1">
                                            CONFIRMAR RESERVA
                                        </Button>
                                    </div>
                                </form>
                            )}
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
