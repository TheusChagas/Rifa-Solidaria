"use client";
import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { drawOptions } from "@/types";

export default function CreateCampaignPage() {
    const [numPrizes, setNumPrizes] = useState(1);
    const [prizes, setPrizes] = useState<string[]>(['']);
    const [drawLocation, setDrawLocation] = useState('');
    const [drawTime, setDrawTime] = useState('');
    const [drawDate, setDrawDate] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [description, setDescription] = useState(''); // Novo estado para descrição
    const [customPrizes, setCustomPrizes] = useState(false);
    const [customPrizesValue, setCustomPrizesValue] = useState('');
    const [prizeImages, setPrizeImages] = useState<File[][]>([[]]);
    const [prizeDragActive, setPrizeDragActive] = useState<boolean[]>([false]);

    const handlePrizeImageUpload = (prizeIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files);
            setPrizeImages(prev => {
                const updated = [...prev];
                updated[prizeIndex] = [...(updated[prizeIndex] || []), ...newImages];
                return updated;
            });
        }
    };

    const handlePrizeDrag = useCallback((prizeIndex: number, e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setPrizeDragActive(prev => {
                const updated = [...prev];
                updated[prizeIndex] = true;
                return updated;
            });
        } else if (e.type === "dragleave") {
            setPrizeDragActive(prev => {
                const updated = [...prev];
                updated[prizeIndex] = false;
                return updated;
            });
        }
    }, []);

    const handlePrizeDrop = useCallback((prizeIndex: number, e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setPrizeDragActive(prev => {
            const updated = [...prev];
            updated[prizeIndex] = false;
            return updated;
        });
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const newImages = Array.from(e.dataTransfer.files);
            setPrizeImages(prev => {
                const updated = [...prev];
                updated[prizeIndex] = [...(updated[prizeIndex] || []), ...newImages];
                return updated;
            });
        }
    }, []);

    const deletePrizeImage = (prizeIndex: number, imageIndex: number) => {
        setPrizeImages(prev => {
            const updated = [...prev];
            updated[prizeIndex] = updated[prizeIndex].filter((_, i) => i !== imageIndex);
            return updated;
        });
    };

    return (
        <div className="container max-w-2xl py-8">
            <Card className="p-6">
                <h1 className="text-2xl font-bold mb-6">Criar Rifa</h1>
                <p className="text-muted-foreground mb-8">
                    Insira os dados de como deseja a sua rifa abaixo
                </p>

                <div className="space-y-8">
                    {/* Seção Título */}
                    <div>
                        <Label className="font-bold block mb-4">Título</Label>
                        <Input
                            placeholder="Digite o título da sua campanha"
                            className="text-lg py-6"
                        />
                    </div>

                    {/* Seção Descrição */}
                    <div>
                        <Label className="font-bold block mb-4">Descrição</Label>
                        <Textarea
                            placeholder="Digite a descrição detalhada da sua campanha..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>

                    {/* Tabela de Cotas */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="block mb-2">Quantidade de números</Label>
                            <Select defaultValue="option">
                                <SelectTrigger className="w-full pl-8 py-6">
                                    <SelectValue placeholder="Escolha uma opção" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fazendinha">Fazendinha</SelectItem>
                                    <SelectItem value="option100">100 números</SelectItem>
                                    <SelectItem value="option1000">1.000 números</SelectItem>
                                    <SelectItem value="option10000">10.000 números</SelectItem>
                                    <SelectItem value="option100000">100.000 números</SelectItem>
                                    <SelectItem value="option500000">Personalizados</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="block mb-2">Valor da cota</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-3.5 text-muted-foreground">R$</span>
                                <Input placeholder="0,00" className="pl-8 py-6 text-lg" />
                            </div>
                        </div>
                    </div>

                    {/* Sorteio */}
                    <div>
                        <Label className="font-bold block mb-4">
                            Por onde será feito o sorteio?
                        </Label>

                        <Select
                            value={drawLocation}
                            onValueChange={(value) => {
                                const selectedOption = drawOptions.find(opt => opt.value === value);
                                setDrawLocation(value);
                                setDrawTime(selectedOption?.time || '');
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Escolha uma opção" />
                            </SelectTrigger>
                            <SelectContent>
                                {drawOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {drawLocation && (
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <Label className="block mb-2">Horário do Sorteio</Label>
                                    <Input
                                        placeholder="Hora:Minuto"
                                        value={drawTime}
                                        onChange={(e) => setDrawTime(e.target.value)}
                                        disabled={!!drawOptions.find(opt => opt.value === drawLocation)?.time}
                                    />
                                </div>

                                <div>
                                    <Label className="block mb-2">Data do Sorteio</Label>
                                    <Input
                                        type="date"
                                        value={drawDate}
                                        onChange={(e) => setDrawDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Prêmios */}
                    <div>
                        <Label className="font-bold block mb-4">Prêmios</Label>
                        <div className="mb-4">
                            <Label className="block mb-2">Quantidade de Prêmios</Label>
                            <Select 
                                value={customPrizes ? 'custom' : numPrizes.toString()}
                                onValueChange={(value) => {
                                    if (value === 'custom') {
                                        setCustomPrizes(true);
                                        setCustomPrizesValue('');
                                    } else {
                                        setCustomPrizes(false);
                                        const numValue = parseInt(value);
                                        setNumPrizes(numValue);
                                        setPrizes(prev => {
                                            const newPrizes = [...prev];
                                            while (newPrizes.length < numValue) {
                                                newPrizes.push('');
                                            }
                                            return newPrizes.slice(0, numValue);
                                        });
                                        setPrizeImages(prev => {
                                            const newImages = [...prev];
                                            while (newImages.length < numValue) {
                                                newImages.push([]);
                                            }
                                            return newImages.slice(0, numValue);
                                        });
                                        setPrizeDragActive(prev => {
                                            const newDragActive = [...prev];
                                            while (newDragActive.length < numValue) {
                                                newDragActive.push(false);
                                            }
                                            return newDragActive.slice(0, numValue);
                                        });
                                    }
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione a quantidade" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                                        <SelectItem key={num} value={num.toString()}>
                                            {num} {num === 1 ? 'prêmio' : 'prêmios'}
                                        </SelectItem>
                                    ))}
                                    <SelectItem value="custom">Personalizado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {customPrizes && (
                            <div className="mb-4">
                                <Label className="block mb-2">Número personalizado de prêmios</Label>
                                <Input
                                    type="number"
                                    min="1"
                                    value={customPrizesValue}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setCustomPrizesValue(value);
                                        const numValue = parseInt(value);
                                        if (!isNaN(numValue) && numValue >= 1) {
                                            setNumPrizes(numValue);
                                            setPrizes(prev => {
                                                const newPrizes = [...prev];
                                                while (newPrizes.length < numValue) {
                                                    newPrizes.push('');
                                                }
                                                return newPrizes.slice(0, numValue);
                                            });
                                            setPrizeImages(prev => {
                                                const newImages = [...prev];
                                                while (newImages.length < numValue) {
                                                    newImages.push([]);
                                                }
                                                return newImages.slice(0, numValue);
                                            });
                                            setPrizeDragActive(prev => {
                                                const newDragActive = [...prev];
                                                while (newDragActive.length < numValue) {
                                                    newDragActive.push(false);
                                                }
                                                return newDragActive.slice(0, numValue);
                                            });
                                        }
                                    }}
                                    placeholder="Digite a quantidade de prêmios"
                                />
                            </div>
                        )}

                        <div className="space-y-6">
                            {prizes.map((prize, index) => (
                                <div key={index} className="border rounded-lg p-4 space-y-4">
                                    <Input
                                        value={prize}
                                        onChange={(e) => {
                                            const newPrizes = [...prizes];
                                            newPrizes[index] = e.target.value;
                                            setPrizes(newPrizes);
                                        }}
                                        placeholder={`Título do prêmio ${index + 1}`}
                                    />
                                    
                                    <div>
                                        <Label className="block mb-2">Imagens do Prêmio {index + 1}</Label>
                                        <div className="space-y-2">
                                            <div 
                                                className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors
                                                    ${prizeDragActive[index] ? "border-primary bg-primary/10" : "border-muted"}`}
                                                onDragEnter={(e) => handlePrizeDrag(index, e)}
                                                onDragLeave={(e) => handlePrizeDrag(index, e)}
                                                onDragOver={(e) => handlePrizeDrag(index, e)}
                                                onDrop={(e) => handlePrizeDrop(index, e)}
                                            >
                                                <div className="flex flex-col items-center gap-2">
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        multiple
                                                        onChange={(e) => handlePrizeImageUpload(index, e)}
                                                        className="hidden"
                                                        id={`prize-file-upload-${index}`}
                                                    />
                                                    <Label
                                                        htmlFor={`prize-file-upload-${index}`}
                                                        className="cursor-pointer font-medium text-primary underline"
                                                    >
                                                        Clique para selecionar imagens
                                                    </Label>
                                                    <span className="text-muted-foreground text-sm">ou arraste e solte aqui</span>
                                                </div>
                                            </div>
                                            
                                            {prizeImages[index] && prizeImages[index].length > 0 && (
                                                <div className="grid grid-cols-3 gap-2">
                                                    {prizeImages[index].map((image, imageIndex) => (
                                                        <div key={imageIndex} className="relative group">
                                                            <img
                                                                src={URL.createObjectURL(image)}
                                                                alt={`Prêmio ${index + 1} - Imagem ${imageIndex + 1}`}
                                                                className="w-full h-20 object-cover rounded-md"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => deletePrizeImage(index, imageIndex)}
                                                                className="absolute -top-1 -right-1 bg-destructive text-white rounded-full p-1
                                                                opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-3 w-3"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Número de celular */}
                    <div>
                        <Label className="block mb-2">Número de celular</Label>
                        <Input placeholder="(00) 00000-0000" />
                    </div>

                    <Button className="w-full py-6 text-lg">Criar Campanha</Button>
                </div>
            </Card>
        </div>
    );
}