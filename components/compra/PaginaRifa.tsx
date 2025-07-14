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
    numerosReservados?: number[];
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
        { numero: number; status: "disponivel" | "vendido" | "selecionado" | "reservado" }[]
    >([]);
    const [selecionados, setSelecionados] = useState<number[]>([]);
    const [hoveredImage, setHoveredImage] = useState<string | null>(null);
    const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [selectedMainImage, setSelectedMainImage] = useState<string>("");
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [isNewBuyer, setIsNewBuyer] = useState<boolean>(false);
    const [phoneValidated, setPhoneValidated] = useState<boolean>(false);
    const [existingBuyer, setExistingBuyer] = useState<Comprador | null>(null);
    const [isValidating, setIsValidating] = useState<boolean>(false);
    const [showAdditionalFields, setShowAdditionalFields] = useState<boolean>(false);
    const [randomQuantity, setRandomQuantity] = useState<string>("");
    const [numberFilter, setNumberFilter] = useState<"todos" | "disponivel" | "vendido" | "reservado">("todos");

    // 1º console.log: mostra os números iniciais após o setup
    useEffect(() => {
        const lista = Array.from(
            { length: totalNumbers },
            (_, i): { numero: number; status: "disponivel" | "vendido" | "reservado" } => {
                const numero = i + 1;
                if (numerosVendidos.includes(numero)) {
                    return { numero, status: "vendido" };
                } else if (config.numerosReservados?.includes(numero)) {
                    return { numero, status: "reservado" };
                } else {
                    return { numero, status: "disponivel" };
                }
            }
        );
        const inicial = lista.map((n) => ({ ...n, status: n.status }));
        setNumeros(inicial);
        console.log("[PaginaRifa] Números iniciais:", inicial);
    }, [totalNumbers, numerosVendidos, config.numerosReservados]);

    // Set initial main image
    useEffect(() => {
        if (premios && premios.length > 0 && premios[0].imagens && premios[0].imagens.length > 0) {
            setSelectedMainImage(premios[0].imagens[0]);
            setCurrentImageIndex(0);
        } else if (imagensPremioPrincipal && imagensPremioPrincipal.length > 0) {
            setSelectedMainImage(imagensPremioPrincipal[0]);
            setCurrentImageIndex(0);
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

    const selectRandomNumbers = (quantity: number) => {
        // Get available numbers (not sold and not selected)
        const availableNumbers = numeros
            .filter(n => n.status === "disponivel")
            .map(n => n.numero);
        
        if (availableNumbers.length < quantity) {
            alert(`Apenas ${availableNumbers.length} números disponíveis! Você está tentando sortear ${quantity} números.`);
            return;
        }

        // Randomly select the requested quantity
        const randomSelected: number[] = [];
        const availableCopy = [...availableNumbers];
        
        for (let i = 0; i < quantity; i++) {
            const randomIndex = Math.floor(Math.random() * availableCopy.length);
            randomSelected.push(availableCopy[randomIndex]);
            availableCopy.splice(randomIndex, 1);
        }

        // Update numbers status and selected list
        setNumeros(prev => prev.map(n => ({
            ...n,
            status: randomSelected.includes(n.numero) ? "selecionado" : n.status
        })));

        setSelecionados(prev => [...prev, ...randomSelected]);
    };

    const handleRandomQuantitySelect = () => {
        const quantity = parseInt(randomQuantity);
        if (isNaN(quantity) || quantity <= 0) {
            alert("Digite uma quantidade válida!");
            return;
        }
        
        const availableCount = numeros.filter(n => n.status === "disponivel").length;
        if (quantity > availableCount) {
            alert(`Apenas ${availableCount} números disponíveis! Você está tentando sortear ${quantity} números.`);
            return;
        }
        
        selectRandomNumbers(quantity);
        setRandomQuantity("");
    };

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

    const getFirstPrizeImages = () => {
        if (premios && premios.length > 0 && premios[0].imagens && premios[0].imagens.length > 0) {
            return premios[0].imagens;
        }
        if (imagensPremioPrincipal && imagensPremioPrincipal.length > 0) {
            return imagensPremioPrincipal;
        }
        return [];
    };

    const firstPrizeImages = getFirstPrizeImages();

    const goToPreviousImage = () => {
        const newIndex = currentImageIndex === 0 ? firstPrizeImages.length - 1 : currentImageIndex - 1;
        setCurrentImageIndex(newIndex);
        setSelectedMainImage(firstPrizeImages[newIndex]);
    };

    const goToNextImage = () => {
        const newIndex = currentImageIndex === firstPrizeImages.length - 1 ? 0 : currentImageIndex + 1;
        setCurrentImageIndex(newIndex);
        setSelectedMainImage(firstPrizeImages[newIndex]);
    };

    const selectImage = (index: number) => {
        setCurrentImageIndex(index);
        setSelectedMainImage(firstPrizeImages[index]);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 pb-32">
            <div className="max-w-4xl mx-auto">
                {/* Header com Logo */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <Image
                            src={logo}
                            alt="Rifa Entre Amigos"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                        <h1 className="text-xl font-bold text-gray-800">RIFA ENTRE AMIGOS</h1>
                    </div>
                </div>

                {/* Card Principal da Rifa */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Banner "SÓ GANHA QUEM JOGA" */}
                    <div className="bg-green-500 text-white text-center py-3 font-bold text-lg">
                        Primeiro Premio
                    </div>

                    {/* Primeiro Prêmio */}
                    {premios && premios.length > 0 && (
                        <div className="bg-gray-50 border-b border-gray-200 py-4 px-6">
                            <div className="flex items-center justify-center gap-2">
                                <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1º</span>
                                <span className="text-lg font-bold text-gray-800">{premios[0].nome}</span>
                            </div>
                        </div>
                    )}

                    {/* Imagem Principal do Prêmio - Carrossel */}
                    <div className="relative h-96 bg-gray-100">
                        {selectedMainImage ? (
                            <>
                                <img
                                    src={selectedMainImage}
                                    alt="Prêmio Principal"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = "/placeholder.png";
                                    }}
                                />
                                
                                {/* Navegação do Carrossel */}
                                {firstPrizeImages.length > 1 && (
                                    <>
                                        {/* Botão Anterior */}
                                        <button
                                            onClick={goToPreviousImage}
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        
                                        {/* Botão Próximo */}
                                        <button
                                            onClick={goToNextImage}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                        
                                        {/* Indicadores */}
                                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                            {firstPrizeImages.map((_: string, index: number) => (
                                                <button
                                                    key={index}
                                                    onClick={() => selectImage(index)}
                                                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                                        index === currentImageIndex 
                                                            ? 'bg-white' 
                                                            : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        
                                        {/* Contador de Imagens */}
                                        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                                            {currentImageIndex + 1} / {firstPrizeImages.length}
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <span>Imagem do prêmio não disponível</span>
                            </div>
                        )}
                    </div>

                    {/* Informações da Rifa */}
                    <div className="p-6">

                        {/* Título da Rifa - Com mais destaque */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">{titulo}</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{descricao}</p>
                        </div>

                        {/* Botão Grupo WhatsApp */}
                        <div className="text-center mb-8">
                            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg flex items-center gap-2 mx-auto text-lg shadow-lg hover:shadow-xl transition-all duration-200">
                                <span>📱</span> Grupo WhatsApp
                            </button>
                        </div>

                        {/* Informações do Sorteio - Com mais destaque */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="text-center bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-sm">
                                <p className="text-sm text-green-600 font-semibold mb-2">DATA DO SORTEIO</p>
                                <p className="text-2xl font-bold text-green-800">{new Date(dataSorteio).toLocaleDateString("pt-BR")}</p>
                                <p className="text-sm text-green-600 mt-1">{new Date(dataSorteio).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                            <div className="text-center bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-sm">
                                <p className="text-sm text-green-600 font-semibold mb-2">VALOR POR NÚMERO</p>
                                <p className="text-3xl font-bold text-green-800">R$ {preco.toFixed(2)}</p>
                                <p className="text-sm text-green-600 mt-1">Cada bilhete</p>
                            </div>
                            <div className="text-center bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-sm">
                                <p className="text-sm text-green-600 font-semibold mb-2">SORTEIO</p>
                                <p className="text-xl font-bold text-green-800">{canalTransmissao}</p>
                                <p className="text-sm text-green-600 mt-1">Transmissão ao vivo</p>
                            </div>
                        </div>

                        {/* Prêmios */}
                        <div className="mb-6">
                            <h3 className="font-bold text-lg mb-4">Prêmios:</h3>
                            {premios && premios.length > 1 && (
                                <div className="space-y-4">
                                    {premios.slice(1).map((premio: { nome: string, imagens?: string[] }, idx: number) => (
                                        <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="w-6 h-6 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm font-bold">{idx + 2}</span>
                                                <span className="font-medium">{premio.nome}</span>
                                            </div>
                                            {premio.imagens && premio.imagens.length > 0 && (
                                                <div className="flex gap-2 overflow-x-auto">
                                                    {premio.imagens.map((imagem: string, imgIdx: number) => (
                                                        <div
                                                            key={imgIdx}
                                                            className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-gray-300 cursor-pointer hover:border-gray-400 transition-all duration-200"
                                                            onMouseEnter={(e) => handleImageHover(imagem, e)}
                                                            onMouseLeave={handleImageLeave}
                                                        >
                                                            <img
                                                                src={imagem}
                                                                alt={`${premio.nome} - Imagem ${imgIdx + 1}`}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    e.currentTarget.src = "/placeholder.png";
                                                                }}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Promoções */}
                        <div className="mb-6">
                            <h3 className="font-bold text-lg mb-4">Promoções</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="border border-purple-300 rounded-lg p-3 text-center">
                                    <p className="font-bold text-purple-600">4 números por R$ 10,00</p>
                                    <p className="text-sm text-gray-600">Cada bilhete sai por R$ 2,5</p>
                                </div>
                                <div className="border border-purple-300 rounded-lg p-3 text-center">
                                    <p className="font-bold text-purple-600">10 números por R$ 25,00</p>
                                    <p className="text-sm text-gray-600">Cada bilhete sai por R$ 2,5</p>
                                </div>
                            </div>
                        </div>

                        {/* Seleção Aleatória de Números */}
                        <div className="mb-6">
                            <h3 className="font-bold text-lg mb-4">Seleção Aleatória</h3>
                            
                            {/* Input para quantidade personalizada */}
                            <div className="mb-4">
                                <div className="flex gap-2">
                                    <Input
                                        type="number"
                                        placeholder="Quantidade de números"
                                        value={randomQuantity}
                                        onChange={(e) => setRandomQuantity(e.target.value)}
                                        min="1"
                                        max={numeros.filter(n => n.status === "disponivel").length}
                                        className="flex-1"
                                    />
                                    <Button 
                                        onClick={handleRandomQuantitySelect}
                                        disabled={!randomQuantity || parseInt(randomQuantity) <= 0}
                                        variant="outline"
                                        className="px-6"
                                    >
                                        Selecionar
                                    </Button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Números disponíveis: {numeros.filter(n => n.status === "disponivel").length}
                                </p>
                            </div>

                            {/* Botões de quantidade fixa */}
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                <Button 
                                    onClick={() => selectRandomNumbers(Math.ceil(totalNumbers * 0.025))}
                                    disabled={numeros.filter(n => n.status === "disponivel").length < Math.ceil(totalNumbers * 0.025)}
                                    variant="outline"
                                    className="bg-green-400 hover:bg-green-500 border-green-600 text-white hover:text-white font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                                >
                                    {Math.ceil(totalNumbers * 0.025)} números
                                </Button>
                                <Button 
                                    onClick={() => selectRandomNumbers(Math.ceil(totalNumbers * 0.05))}
                                    disabled={numeros.filter(n => n.status === "disponivel").length < Math.ceil(totalNumbers * 0.05)}
                                    variant="outline"
                                    className="bg-green-400 hover:bg-green-500 border-green-600 text-white hover:text-white font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                                >
                                    {Math.ceil(totalNumbers * 0.05)} números
                                </Button>
                                <Button 
                                    onClick={() => selectRandomNumbers(Math.ceil(totalNumbers * 0.1))}
                                    disabled={numeros.filter(n => n.status === "disponivel").length < Math.ceil(totalNumbers * 0.1)}
                                    variant="outline"
                                    className="bg-green-400 hover:bg-green-500 border-green-600 text-white hover:text-white font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                                >
                                    {Math.ceil(totalNumbers * 0.1)} números
                                </Button>
                            </div>
                        </div>

                        {/* Seletor de números */}
                        <div className="mb-6">
                            <h3 className="font-bold text-lg mb-4">Selecione seus números</h3>
                            
                            {/* Filtro de números */}
                            <div className="mb-4">
                                <Label className="text-sm font-medium mb-2 block">Filtrar números:</Label>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Button
                                        variant={numberFilter === "todos" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setNumberFilter("todos")}
                                        className="text-xs flex items-center gap-1"
                                    >
                                        Todos ({numeros.length})
                                    </Button>
                                    <Button
                                        variant={numberFilter === "disponivel" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setNumberFilter("disponivel")}
                                        className="text-xs flex items-center gap-1 bg-gray-400"
                                    >
                                        <span className="text-white font-bold">Disponíveis ({numeros.filter(n => n.status === "disponivel").length})</span>
                                    </Button>
                                    <Button
                                        variant={numberFilter === "vendido" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setNumberFilter("vendido")}
                                        className="text-xs flex items-center gap-1 bg-green-500"
                                    >
                                        <span className="text-white font-bold">Pagos ({numeros.filter(n => n.status === "vendido").length})</span>
                                    </Button>
                                    <Button
                                        variant={numberFilter === "reservado" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setNumberFilter("reservado")}
                                        className="text-xs flex items-center gap-1 bg-orange-500"
                                    >
                                        <span className="text-white font-bold">Reservados ({numeros.filter(n => n.status === "reservado").length})</span>
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
                                {numeros
                                    .filter(n => {
                                        if (numberFilter === "todos") return true;
                                        if (numberFilter === "reservado") return n.status === "reservado";
                                        return n.status === numberFilter;
                                    })
                                    .map((n) => (
                                    <button
                                        key={n.numero}
                                        onClick={() => {
                                            if (n.status !== "vendido" && n.status !== "reservado") {
                                                toggleNumero(n.numero);
                                            }
                                        }
                                        }
                                        disabled={n.status === "vendido" || n.status === "reservado"}
                                        className={cn(
                                            "h-12 rounded-lg text-sm font-medium transition flex items-center justify-center",
                                            {
                                                "bg-gray-400 text-white hover:bg-gray-500 border-2 border-gray-500": n.status === "disponivel",
                                                "bg-blue-600 text-white border-2 border-blue-700": n.status === "selecionado",
                                                "bg-green-500 text-white cursor-not-allowed": n.status === "vendido",
                                                "bg-orange-500 text-white cursor-not-allowed border-2 border-orange-600": n.status === "reservado",
                                            }
                                        )}
                                    >
                                        {n.numero.toString().padStart(2, "0")}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Botão de Contato WhatsApp */}
                        <div className="text-center pt-6 border-t border-gray-200">
                            {contatos && contatos.length > 0 && (
                                <a
                                    href={`https://wa.me/${contatos[0].telefone.replace(/\D/g, "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    <span>📱</span>
                                    <span>Falar no WhatsApp</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Resumo da seleção - Fixo na parte inferior */}
            {selecionados.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-40">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1 mr-4">
                                    <p className="font-semibold text-blue-800 mb-2">
                                        Números selecionados ({selecionados.length}):
                                    </p>
                                    <div className="max-h-20 overflow-y-auto">
                                        <p className="text-sm text-blue-600">
                                            {selecionados.sort((a, b) => a - b).map((x) => x.toString().padStart(2, "0")).join(", ")}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="font-bold text-blue-800 text-xl">
                                        Total: R$ {total.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button 
                                    variant="outline" 
                                    onClick={() => {
                                        setSelecionados([]);
                                        setNumeros(prev => prev.map(n => ({
                                            ...n,
                                            status: n.status === "selecionado" ? "disponivel" : n.status
                                        })));
                                    }}
                                    className="flex-1"
                                >
                                    Limpar Seleção
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="flex-1 bg-green-500 hover:bg-green-600">
                                            Confirmar Compra
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px] z-50 max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>Reservar Rifa</DialogTitle>
                                        </DialogHeader>

                                        {!showAdditionalFields ? (
                                            <form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="telefone3">Telefone (WhatsApp)</Label>
                                                    <Input 
                                                        id="telefone3" 
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
                                            <form
                                                onSubmit={handleFinalSubmit}
                                                method="post"
                                                action="/api/reservar"
                                                className="grid gap-4 py-4"
                                            >
                                                {/* Same form fields as above dialog */}
                                                <div className="space-y-2">
                                                    <Label htmlFor="telefone_final2">Telefone (WhatsApp)</Label>
                                                    <Input 
                                                        id="telefone_final2" 
                                                        name="telefone" 
                                                        value={phoneNumber}
                                                        readOnly
                                                        className="bg-gray-100"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="nome2">Nome completo</Label>
                                                    <Input 
                                                        id="nome2" 
                                                        name="nome" 
                                                        required 
                                                        placeholder="Digite seu nome completo"
                                                    />
                                                </div>
                                                
                                                <div className="space-y-2">
                                                    <Label htmlFor="email2">Email</Label>
                                                    <Input 
                                                        id="email2" 
                                                        name="email" 
                                                        type="email" 
                                                        required 
                                                        placeholder="seuemail@exemplo.com"
                                                    />
                                                </div>
                                                
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="cidade2">Cidade</Label>
                                                        <Input 
                                                            id="cidade2" 
                                                            name="cidade" 
                                                            required 
                                                            placeholder="Digite sua cidade"
                                                        />
                                                    </div>
                                                    
                                                    <div className="space-y-2">
                                                        <Label htmlFor="estado2">Estado</Label>
                                                        <Input 
                                                            id="estado2" 
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

                                                <input type="hidden" name="numeros" value={JSON.stringify(selecionados)} />
                                                <input type="hidden" name="total" value={total.toString()} />
                                                <input type="hidden" name="isNewBuyer" value="true" />

                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id="terms2" name="terms" required />
                                                    <label
                                                        htmlFor="terms2"
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
                    </div>
                </div>
            )}

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
        </div>
    );
}
