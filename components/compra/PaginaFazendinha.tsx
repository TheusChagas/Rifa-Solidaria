"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/assets/Logo.png";
import { Rifa, jogoDoBicho } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

export default function PaginaFazendinha({ config }: { config: Rifa }) {
    const {
        titulo,
        descricao,
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

    const [selectedMainImage, setSelectedMainImage] = useState<string>("");
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [currentSecondaryImageIndex, setCurrentSecondaryImageIndex] = useState<number>(0);
    const [selectedAnimals, setSelectedAnimals] = useState<number[]>([]);
    const [showReservationForm, setShowReservationForm] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const getFirstPrizeImages = () => {
        if (premios && premios.length > 0 && premios[0].imagens && premios[0].imagens.length > 0) {
            return premios[0].imagens;
        }
        if (imagensPremioPrincipal && imagensPremioPrincipal.length > 0) {
            return imagensPremioPrincipal;
        }
        return [];
    };

    const getSecondaryPrizesImages = () => {
        if (!premios || premios.length <= 1) return [];
        
        const allSecondaryImages: string[] = [];
        premios.slice(1).forEach((premio: { nome: string, imagens?: string[] }) => {
            if (premio.imagens && premio.imagens.length > 0) {
                allSecondaryImages.push(...premio.imagens);
            }
        });
        return allSecondaryImages;
    };

    const firstPrizeImages = getFirstPrizeImages();
    const secondaryPrizesImages = getSecondaryPrizesImages();

    const goToNextImage = () => {
        const newIndex = currentImageIndex === firstPrizeImages.length - 1 ? 0 : currentImageIndex + 1;
        setCurrentImageIndex(newIndex);
        setSelectedMainImage(firstPrizeImages[newIndex]);
    };

    const goToPreviousImage = () => {
        const newIndex = currentImageIndex === 0 ? firstPrizeImages.length - 1 : currentImageIndex - 1;
        setCurrentImageIndex(newIndex);
        setSelectedMainImage(firstPrizeImages[newIndex]);
    };

    const selectImage = (index: number) => {
        setCurrentImageIndex(index);
        setSelectedMainImage(firstPrizeImages[index]);
    };

    const goToNextSecondaryImage = () => {
        const newIndex = currentSecondaryImageIndex === secondaryPrizesImages.length - 1 ? 0 : currentSecondaryImageIndex + 1;
        setCurrentSecondaryImageIndex(newIndex);
    };

    const goToPreviousSecondaryImage = () => {
        const newIndex = currentSecondaryImageIndex === 0 ? secondaryPrizesImages.length - 1 : currentSecondaryImageIndex - 1;
        setCurrentSecondaryImageIndex(newIndex);
    };

    const selectSecondaryImage = (index: number) => {
        setCurrentSecondaryImageIndex(index);
    };

    const handleAnimalSelection = (animalId: number) => {
        setSelectedAnimals(prev => {
            if (prev.includes(animalId)) {
                return prev.filter(id => id !== animalId);
            } else {
                return [...prev, animalId];
            }
        });
    };

    const handleAnimalDeselection = (animalId: number) => {
        setSelectedAnimals(prev => prev.filter(id => id !== animalId));
    };

    const isAnimalSelected = (animalId: number) => {
        return selectedAnimals.includes(animalId);
    };

    const clearSelection = () => {
        setSelectedAnimals([]);
    };

    const totalPrice = selectedAnimals.length * (preco || 0);

    const handleReservation = async () => {
        if (!phoneNumber.trim()) {
            alert("Por favor, informe seu telefone para continuar.");
            return;
        }

        if (selectedAnimals.length === 0) {
            alert("Por favor, selecione ao menos um animal.");
            return;
        }

        setIsSubmitting(true);
        
        try {
            // TODO: Implement API call for reservation
            console.log('Reserving animals:', {
                animals: selectedAnimals,
                phone: phoneNumber,
                rifaId: config.id
            });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            alert(`Reserva realizada com sucesso! ${selectedAnimals.length} animal${selectedAnimals.length > 1 ? 'is' : ''} reservado${selectedAnimals.length > 1 ? 's' : ''}.`);
            
            setShowReservationForm(false);
            setSelectedAnimals([]);
            setPhoneNumber("");
        } catch (error) {
            console.error('Erro ao fazer reserva:', error);
            alert("Erro ao realizar reserva. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatPhoneNumber = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 11) {
            return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
        return value;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        setPhoneNumber(formatted);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4" style={{ paddingBottom: selectedAnimals.length > 0 ? '180px' : '80px' }}>
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
                    {/* Banner */}
                    <div className="bg-green-500 text-white text-center py-3 font-bold text-lg">
                        Primeiro Premio - Fazendinha 🚜
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
                                        <button
                                            onClick={goToPreviousImage}
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        
                                        <button
                                            onClick={goToNextImage}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                        
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
                        {/* Título da Rifa */}
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

                        {/* Informações do Sorteio */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="text-center bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-sm">
                                <p className="text-sm text-green-600 font-semibold mb-2">DATA DO SORTEIO</p>
                                <p className="text-2xl font-bold text-green-800">{new Date(dataSorteio).toLocaleDateString("pt-BR")}</p>
                                <p className="text-sm text-green-600 mt-1">{new Date(dataSorteio).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                            <div className="text-center bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-sm">
                                <p className="text-sm text-green-600 font-semibold mb-2">VALOR POR NÚMERO</p>
                                <p className="text-3xl font-bold text-green-800">R$ {preco?.toFixed(2)}</p>
                                <p className="text-sm text-green-600 mt-1">{saleMode}</p>
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
                                            <div className="flex items-center gap-2">
                                                <span className="w-6 h-6 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm font-bold">{idx + 2}</span>
                                                <span className="font-medium">{premio.nome}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Carrossel de Imagens dos Prêmios Secundários */}
                            {secondaryPrizesImages.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="font-semibold text-md mb-3">Imagens dos Prêmios:</h4>
                                    <div className="relative">
                                        <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
                                            <img
                                                src={secondaryPrizesImages[currentSecondaryImageIndex]}
                                                alt={`Prêmio ${currentSecondaryImageIndex + 1}`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = "/placeholder.png";
                                                }}
                                            />
                                            
                                            {secondaryPrizesImages.length > 1 && (
                                                <>
                                                    <button
                                                        onClick={goToPreviousSecondaryImage}
                                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                        </svg>
                                                    </button>
                                                    
                                                    <button
                                                        onClick={goToNextSecondaryImage}
                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                    
                                                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                                                        {currentSecondaryImageIndex + 1} / {secondaryPrizesImages.length}
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {secondaryPrizesImages.length > 1 && (
                                            <div className="flex gap-2 mt-3 flex-wrap">
                                                {secondaryPrizesImages.map((imagem: string, imgIdx: number) => (
                                                    <div
                                                        key={imgIdx}
                                                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                                                            imgIdx === currentSecondaryImageIndex 
                                                                ? 'border-blue-500 ring-2 ring-blue-200' 
                                                                : 'border-gray-300 hover:border-gray-400'
                                                        }`}
                                                        onClick={() => selectSecondaryImage(imgIdx)}
                                                    >
                                                        <img
                                                            src={imagem}
                                                            alt={`Miniatura ${imgIdx + 1}`}
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
                                </div>
                            )}
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

                {/* Jogo do Bicho Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
                    <h2 className="text-2xl font-semibold mb-4 text-center">🐾 Jogo do Bicho</h2>
                    <div className="w-full grid grid-cols-4 md:grid-cols-5 gap-4 justify-items-center mx-auto">
                        {jogoDoBicho.map((animal) => (
                            <Card
                                key={animal.id}
                                className={`text-center w-full max-w-[160px] p-2 sm:p-3 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
                                    isAnimalSelected(animal.id)
                                        ? 'bg-verde-500 text-white shadow-lg ring-2 ring-verde-300'
                                        : 'hover:shadow-md hover:bg-gray-50'
                                }`}
                                onClick={() => handleAnimalSelection(animal.id)}
                            >
                                <CardContent className="flex flex-col items-center p-0 w-full">
                                    <div className="mt-1 mb-2 mx-auto w-full flex justify-center">
                                        <img
                                            src={typeof animal.icone === "string" ? animal.icone : (animal.icone as { src: string }).src ?? ""}
                                            alt={animal.nome}
                                            className="object-contain w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                                            loading="lazy"
                                        />
                                    </div>
                                    <p className={`font-bold mt-1 text-xs sm:text-sm ${
                                        isAnimalSelected(animal.id) ? 'text-white' : 'text-gray-900'
                                    }`}>
                                        {String(animal.id).padStart(2, "0")} – {animal.nome}
                                    </p>
                                    <p className={`text-xs mt-1 ${
                                        isAnimalSelected(animal.id) ? 'text-verde-100' : 'text-gray-600'
                                    }`}>
                                        {animal.numeros.join(", ")}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

            </div>

            {/* Fixed Bottom Selected Animals Section */}
            {selectedAnimals.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-verde-200 shadow-2xl z-50 max-h-44 overflow-hidden">
                    <div className="max-w-4xl mx-auto p-3">
                        {/* Selected Animals Display */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-gray-800">Animais Selecionados:</h3>
                            <div className="flex flex-wrap gap-1.5 max-h-12 overflow-y-auto scrollbar-thin">
                                {selectedAnimals.map(animalId => {
                                    const animal = jogoDoBicho.find(a => a.id === animalId);
                                    if (!animal) return null;
                                    
                                    return (
                                        <div
                                            key={animalId}
                                            className="flex items-center gap-1.5 bg-verde-500 text-white px-2 py-1 rounded-md font-medium text-xs"
                                        >
                                            <img
                                                src={typeof animal.icone === "string" ? animal.icone : (animal.icone as { src: string }).src ?? ""}
                                                alt={animal.nome}
                                                className="w-3 h-3 object-contain"
                                            />
                                            <span className="text-xs">
                                                {String(animal.id).padStart(2, "0")} - {animal.nome}
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAnimalDeselection(animalId);
                                                }}
                                                className="hover:bg-verde-600 rounded-full p-0.5 transition-colors"
                                                title="Remover animal"
                                            >
                                                <X size={10} />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Selection Summary and Actions */}
                        <div className="mt-2 p-2 bg-verde-50 border border-verde-200 rounded-lg">
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                                <div className="text-center sm:text-left">
                                    <p className="text-xs text-verde-600 font-medium">
                                        {selectedAnimals.length} animal{selectedAnimals.length > 1 ? 'is' : ''} selecionado{selectedAnimals.length > 1 ? 's' : ''}
                                    </p>
                                    <p className="text-sm font-bold text-verde-800">
                                        Total: R$ {totalPrice.toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={clearSelection}
                                        className="border-verde-300 text-verde-700 hover:bg-verde-50 text-xs px-3 py-1"
                                        size="sm"
                                    >
                                        Limpar
                                    </Button>
                                    <Dialog open={showReservationForm} onOpenChange={setShowReservationForm}>
                                        <DialogTrigger asChild>
                                            <Button
                                                className="bg-verde-600 hover:bg-verde-700 text-white text-xs px-4 py-1"
                                                size="sm"
                                            >
                                                Continuar
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle className="text-lg font-bold text-gray-800">
                                                    Reservar Animais
                                                </DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4">
                                                <div className="bg-verde-50 p-3 rounded-lg border border-verde-200">
                                                    <h4 className="font-semibold text-verde-800 mb-2">Resumo da Reserva:</h4>
                                                    <div className="space-y-1">
                                                        {selectedAnimals.map(animalId => {
                                                            const animal = jogoDoBicho.find(a => a.id === animalId);
                                                            if (!animal) return null;
                                                            return (
                                                                <div key={animalId} className="flex items-center gap-2 text-sm">
                                                                    <img
                                                                        src={typeof animal.icone === "string" ? animal.icone : (animal.icone as { src: string }).src ?? ""}
                                                                        alt={animal.nome}
                                                                        className="w-4 h-4 object-contain"
                                                                    />
                                                                    <span>{String(animal.id).padStart(2, "0")} - {animal.nome}</span>
                                                                    <span className="text-verde-600">({animal.numeros.join(", ")})</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    <div className="mt-2 pt-2 border-t border-verde-200">
                                                        <p className="font-bold text-verde-800">
                                                            Total: R$ {totalPrice.toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                                                    <Input
                                                        id="phone"
                                                        type="tel"
                                                        placeholder="(11) 99999-9999"
                                                        value={phoneNumber}
                                                        onChange={handlePhoneChange}
                                                        maxLength={15}
                                                        className="border-verde-200 focus:border-verde-500"
                                                    />
                                                    <p className="text-xs text-gray-600">
                                                        Você receberá uma confirmação por WhatsApp
                                                    </p>
                                                </div>

                                                <div className="flex gap-2 pt-4">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => setShowReservationForm(false)}
                                                        className="flex-1 border-verde-300 text-verde-700 hover:bg-verde-50"
                                                        disabled={isSubmitting}
                                                    >
                                                        Cancelar
                                                    </Button>
                                                    <Button
                                                        onClick={handleReservation}
                                                        className="flex-1 bg-verde-600 hover:bg-verde-700 text-white"
                                                        disabled={isSubmitting || !phoneNumber.trim()}
                                                    >
                                                        {isSubmitting ? "Reservando..." : "Confirmar Reserva"}
                                                    </Button>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
