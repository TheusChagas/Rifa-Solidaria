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
import { Checkbox } from "@/components/ui/checkbox";
import { Rifa } from "@/types";
import { getAllRifas } from "@/lib/getRifaID";

const drawOptions = [
    { value: "loteria-federal", label: "LOTERIA FEDERAL", time: "19:00" },
    { value: "canta-galo", label: "CANTA GALO", time: "09:20" },
    { value: "ptm", label: "PTM", time: "11:20" },
    { value: "pt", label: "PT", time: "14:20" },
    { value: "ptv", label: "PTV", time: "16:20" },
    { value: "ptn", label: "PTN", time: "18:20" },
    { value: "corujinha", label: "CORUJINHA", time: "21:30" },
    { value: "tiktok", label: "TIKTOK" },
    { value: "youtube", label: "YOUTUBE" },
    { value: "instagram", label: "INSTAGRAM" },
    { value: "kwai", label: "KWAI" }
];

export default function CreateCampaignPage() {
    const [numPrizes, setNumPrizes] = useState(1);
    const [prizes, setPrizes] = useState<string[]>(['']);
    const [drawLocation, setDrawLocation] = useState('');
    const [drawTime, setDrawTime] = useState('');
    const [drawDate, setDrawDate] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [description, setDescription] = useState('');
    const [prizeImages, setPrizeImages] = useState<File[][]>([[]]);
    const [prizeDragActive, setPrizeDragActive] = useState<boolean[]>([false]);

    const [title, setTitle] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');
    const [ticketQuantity, setTicketQuantity] = useState('');
    const [isCustomQuantity, setIsCustomQuantity] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // New fields based on Rifa interface
    const [vendedorNome, setVendedorNome] = useState('');
    const [fazendinha, setFazendinha] = useState(false);
    const [pixChave, setPixChave] = useState('');
    const [emailContato, setEmailContato] = useState('');
    const [regulamento, setRegulamento] = useState('');
    const [tempoReserva, setTempoReserva] = useState('10');
    const [isCustomReserva, setIsCustomReserva] = useState(false);
    const [customReservaValue, setCustomReservaValue] = useState('');
    const [customReservaUnit, setCustomReservaUnit] = useState('minutos');
    const [porcentagemMaxima, setPorcentagemMaxima] = useState('10');
    const [numerosPremiados, setNumerosPremiados] = useState('1');
    const [isCustomNumerosPremiados, setIsCustomNumerosPremiados] = useState(false);
    const [customNumerosPremiados, setCustomNumerosPremiados] = useState('');
    const [numPromocoes, setNumPromocoes] = useState(0);
    const [promocoes, setPromocoes] = useState<{quantidade: string, valor: string}[]>([]);

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

    // Formatação do telefone
    const formatPhoneNumber = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length <= 11) {
            if (cleaned.length <= 2) {
                return cleaned;
            } else if (cleaned.length <= 7) {
                return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
            } else {
                return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
            }
        }
        return phoneNumber;
    };

    // Formatação do preço
    const formatPrice = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        const number = parseFloat(cleaned) / 100;
        return number.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    // Formatação do horário
    const formatTime = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length >= 4) {
            return `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
        }
        return cleaned;
    };

    // Validação dos campos
    const validateFields = () => {
        const newErrors: { [key: string]: string } = {};

        if (!title.trim()) {
            newErrors.title = 'Título é obrigatório';
        } else if (title.trim().length < 10) {
            newErrors.title = 'Título deve ter pelo menos 10 caracteres';
        }

        if (!description.trim()) {
            newErrors.description = 'Descrição é obrigatória';
        } else if (description.trim().length < 50) {
            newErrors.description = 'Descrição deve ter pelo menos 50 caracteres';
        }

        if (!vendedorNome.trim()) {
            newErrors.vendedorNome = 'Nome do vendedor é obrigatório';
        }

        if (!regulamento.trim()) {
            newErrors.regulamento = 'Regulamento é obrigatório';
        } else if (regulamento.trim().length < 50) {
            newErrors.regulamento = 'Regulamento deve ter pelo menos 50 caracteres';
        }

        const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
        if (!phoneNumber) {
            newErrors.phoneNumber = 'Telefone é obrigatório';
        } else if (!phoneRegex.test(phoneNumber)) {
            newErrors.phoneNumber = 'Formato de telefone inválido';
        }

        if (!ticketQuantity) {
            newErrors.ticketQuantity = 'Quantidade de números é obrigatória';
        }

        if (!ticketPrice) {
            newErrors.ticketPrice = 'Valor da cota é obrigatório';
        } else {
            const price = parseFloat(ticketPrice.replace(',', '.'));
            if (price <= 0) {
                newErrors.ticketPrice = 'Valor deve ser maior que zero';
            }
        }

        if (!drawLocation) {
            newErrors.drawLocation = 'Local do sorteio é obrigatório';
        }

        if (!drawDate) {
            newErrors.drawDate = 'Data do sorteio é obrigatória';
        } else {
            const selectedDate = new Date(drawDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                newErrors.drawDate = 'Data não pode ser anterior a hoje';
            }
        }

        const selectedOption = drawOptions.find(opt => opt.value === drawLocation);
        if (drawLocation && !selectedOption?.time) {
            if (!drawTime) {
                newErrors.drawTime = 'Horário é obrigatório';
            } else {
                const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
                if (!timeRegex.test(drawTime)) {
                    newErrors.drawTime = 'Formato de horário inválido (HH:MM)';
                }
            }
        }

        const emptyPrizes = prizes.filter(prize => !prize.trim());
        if (emptyPrizes.length > 0) {
            newErrors.prizes = 'Todos os prêmios devem ter um título';
        }

        const prizesWithoutImages = prizeImages.filter(images => images.length === 0);
        if (prizesWithoutImages.length > 0) {
            newErrors.prizeImages = 'Todos os prêmios devem ter pelo menos uma imagem';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateFields()) {
            return;
        }

        setIsSubmitting(true);
        try {
            // Create Rifa object based on the interface
            const novaRifa: Partial<Rifa> = {
                titulo: title,
                descricao: description,
                vendedorNome,
                categoria: 'Outros',
                metodoPagamento: 'Pix',
                disponivel: true,
                preco: parseFloat(ticketPrice.replace(',', '.')),
                totalNumbers: parseInt(ticketQuantity),
                premio: prizes[0], // First prize as main prize
                saleMode: fazendinha ? "a dezena" : "por número",
                numerosVendidos: [],
                dataSorteio: `${drawDate}T${drawTime || '19:00'}:00Z`,
                canalTransmissao: drawLocation,
                contatos: [
                    {
                        nome: vendedorNome,
                        telefone: phoneNumber,
                    }
                ],
                premios: prizes.map((prize, index) => ({
                    nome: prize,
                    imagens: prizeImages[index]?.map(file => URL.createObjectURL(file)) || [],
                })),
                fazendinha,
                horarioSorteio: drawTime,
                localSorteio: drawLocation,
                status: 'ativo',
                tags: ['outros'],
                numerosReservados: [],
                valorTotal: parseFloat(ticketPrice.replace(',', '.')) * parseInt(ticketQuantity),
                percentualVendido: 0,
                dataInicio: new Date().toISOString(),
                dataFim: `${drawDate}T${drawTime || '19:00'}:00Z`,
                tipoSorteio: drawLocation as any,
                transmissaoAoVivo: true,
                emailContato,
                pixChave,
                regulamento,
                configPagamento: {
                    pix: true,
                    cartao: false,
                    dinheiro: false,
                    boleto: false,
                },
                limitePorPessoa: 10,
                permitirReserva: true,
                exibirNumerosVendidos: true,
                exibirCompradores: false,
            };

            console.log('Nova rifa criada:', novaRifa);

            // Here you would typically send this to your API
            // await createRifa(novaRifa);

            alert('Rifa criada com sucesso!');

            // Reset form or redirect
            // router.push('/vendedor/rifas');

        } catch (error) {
            alert('Erro ao criar rifa. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container max-w-4xl py-8">
            <Card className="p-8 shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Nova Rifa</h1>
                    <p className="text-muted-foreground text-lg">
                        Configure sua rifa seguindo os passos abaixo
                    </p>
                </div>

                <div className="space-y-10">
                    {/* Seção 1: Informações Básicas */}
                    <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                            <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
                            Informações Básicas
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <Label className="text-base font-semibold text-gray-700 mb-3 block">Título da Rifa</Label>
                                <Input
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                        if (errors.title) {
                                            setErrors({ ...errors, title: '' });
                                        }
                                    }}
                                    placeholder="Digite um título atrativo para sua rifa"
                                    className={`text-lg py-3 h-12 border-2 transition-colors ${errors.title ? 'border-red-500 focus:border-red-500' : 'focus:border-green-600'
                                        }`}
                                    maxLength={100}
                                />
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                                <p className="text-gray-500 text-xs mt-1">{title.length}/100 caracteres</p>
                            </div>

                            <div>
                                <Label className="text-base font-semibold text-gray-700 mb-3 block">Descrição Detalhada</Label>
                                <Textarea
                                    placeholder="Descreva sua rifa: objetivo, beneficiário, detalhes importantes..."
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                        if (errors.description) {
                                            setErrors({ ...errors, description: '' });
                                        }
                                    }}
                                    className={`min-h-[120px] border-2 transition-colors resize-none ${errors.description ? 'border-red-500 focus:border-red-500' : 'focus:border-green-600'
                                        }`}
                                    maxLength={500}
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                                <p className="text-gray-500 text-xs mt-1">{description.length}/500 caracteres</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label className="text-base font-semibold text-gray-700 mb-3 block">Nome do Vendedor</Label>
                                    <Input
                                        value={vendedorNome}
                                        onChange={(e) => {
                                            setVendedorNome(e.target.value);
                                            if (errors.vendedorNome) {
                                                setErrors({ ...errors, vendedorNome: '' });
                                            }
                                        }}
                                        placeholder="Seu nome ou da organização"
                                        className={`h-12 border-2 transition-colors ${errors.vendedorNome ? 'border-red-500 focus:border-red-500' : 'focus:border-green-600'
                                            }`}
                                    />
                                    {errors.vendedorNome && <p className="text-red-500 text-sm mt-1">{errors.vendedorNome}</p>}
                                </div>

                                <div>
                                    <Label className="text-base font-semibold text-gray-700 mb-3 block">Número de Contato</Label>
                                    <Input
                                        value={phoneNumber}
                                        onChange={(e) => {
                                            const formatted = formatPhoneNumber(e.target.value);
                                            setPhoneNumber(formatted);
                                            if (errors.phoneNumber) {
                                                setErrors({ ...errors, phoneNumber: '' });
                                            }
                                        }}
                                        placeholder="(00) 00000-0000"
                                        className={`h-12 border-2 transition-colors ${errors.phoneNumber ? 'border-red-500 focus:border-red-500' : 'focus:border-green-600'
                                            }`}
                                        maxLength={15}
                                    />
                                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label className="text-base font-semibold text-gray-700 mb-3 block">Email de Contato</Label>
                                    <Input
                                        type="email"
                                        value={emailContato}
                                        onChange={(e) => setEmailContato(e.target.value)}
                                        placeholder="seu@email.com"
                                        className="h-12 border-2 focus:border-green-600 transition-colors"
                                    />
                                </div>

                                <div>
                                    <Label className="text-base font-semibold text-gray-700 mb-3 block">Chave PIX (opcional)</Label>
                                    <Input
                                        value={pixChave}
                                        onChange={(e) => setPixChave(e.target.value)}
                                        placeholder="CPF, Email, Telefone ou Chave Aleatória"
                                        className="h-12 border-2 focus:border-green-600 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="fazendinha"
                                    checked={fazendinha}
                                    onCheckedChange={(checked) => setFazendinha(checked as boolean)}
                                />
                                <Label htmlFor="fazendinha" className="text-sm font-medium">
                                    Esta é uma rifa do tipo Fazendinha (Jogo do Bicho)
                                </Label>
                            </div>

                            <div>
                                <Label className="text-base font-semibold text-gray-700 mb-3 block">Regulamento do Sorteio</Label>
                                <Textarea
                                    placeholder="Descreva as regras do sorteio: como será realizado, critérios de participação, condições de entrega do prêmio, etc..."
                                    value={regulamento}
                                    onChange={(e) => {
                                        setRegulamento(e.target.value);
                                        if (errors.regulamento) {
                                            setErrors({ ...errors, regulamento: '' });
                                        }
                                    }}
                                    className={`min-h-[100px] border-2 transition-colors resize-none ${errors.regulamento ? 'border-red-500 focus:border-red-500' : 'focus:border-green-600'
                                        }`}
                                    maxLength={1000}
                                />
                                {errors.regulamento && <p className="text-red-500 text-sm mt-1">{errors.regulamento}</p>}
                                <p className="text-gray-500 text-xs mt-1">{regulamento.length}/1000 caracteres</p>
                            </div>
                        </div>
                    </div>

                    {/* Seção 2: Configuração da Rifa */}
                    <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                            <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
                            Configuração da Rifa
                        </h2>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label className="text-base font-semibold text-gray-700 mb-3 block">Quantidade de Números</Label>
                                    <Select
                                        value={isCustomQuantity ? 'custom' : ticketQuantity}
                                        onValueChange={(value) => {
                                            if (value === 'custom') {
                                                setIsCustomQuantity(true);
                                                setTicketQuantity('');
                                            } else {
                                                setIsCustomQuantity(false);
                                                setTicketQuantity(value);
                                            }
                                            if (errors.ticketQuantity) {
                                                setErrors({ ...errors, ticketQuantity: '' });
                                            }
                                        }}
                                    >
                                        <SelectTrigger className={`h-12 border-2 ${errors.ticketQuantity ? 'border-red-500 focus:border-red-500' : 'focus:border-green-600'
                                            }`}>
                                            <SelectValue placeholder="Escolha uma opção" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="25">Fazendinha (25 números)</SelectItem>
                                            <SelectItem value="100">100 números</SelectItem>
                                            <SelectItem value="1000">1.000 números</SelectItem>
                                            <SelectItem value="10000">10.000 números</SelectItem>
                                            <SelectItem value="100000">100.000 números</SelectItem>
                                            <SelectItem value="custom">Personalizado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {isCustomQuantity && (
                                        <Input
                                            type="number"
                                            value={ticketQuantity}
                                            onChange={(e) => {
                                                setTicketQuantity(e.target.value);
                                                if (errors.ticketQuantity) {
                                                    setErrors({ ...errors, ticketQuantity: '' });
                                                }
                                            }}
                                            placeholder="Digite a quantidade"
                                            className="mt-2 h-12 border-2 focus:border-green-600"
                                            min="1"
                                            max="1000000"
                                        />
                                    )}
                                    {errors.ticketQuantity && <p className="text-red-500 text-sm mt-1">{errors.ticketQuantity}</p>}
                                </div>

                                <div>
                                    <Label className="text-base font-semibold text-gray-700 mb-3 block">Valor da Cota</Label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">R$</span>
                                        <Input
                                            value={ticketPrice}
                                            onChange={(e) => {
                                                const formatted = formatPrice(e.target.value);
                                                setTicketPrice(formatted);
                                                if (errors.ticketPrice) {
                                                    setErrors({ ...errors, ticketPrice: '' });
                                                }
                                            }}
                                            placeholder="0,00"
                                            className={`pl-12 h-12 text-lg border-2 transition-colors ${errors.ticketPrice ? 'border-red-500 focus:border-red-500' : 'focus:border-green-600'
                                                }`}
                                        />
                                    </div>
                                    {errors.ticketPrice && <p className="text-red-500 text-sm mt-1">{errors.ticketPrice}</p>}
                                </div>
                            </div>

                            {/* Aviso para rifas com mais de 10.000 números */}
                            {parseInt(ticketQuantity) > 10000 && (
                                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                    <div className="flex items-start gap-2">
                                        <div className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center mt-0.5">
                                            <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-amber-800">
                                                Atenção: Compra Aleatória de Números
                                            </p>
                                            <p className="text-xs text-amber-700 mt-1">
                                                Para rifas com mais de 10.000 números, a compra dos números será feita de forma aleatória para melhor experiência do usuário.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div>
                                <Label className="text-base font-semibold text-gray-700 mb-3 block">Números Premiados</Label>
                                <Select 
                                    value={isCustomNumerosPremiados ? 'custom' : numerosPremiados} 
                                    onValueChange={(value) => {
                                        if (value === 'custom') {
                                            setIsCustomNumerosPremiados(true);
                                            setNumerosPremiados('');
                                        } else {
                                            setIsCustomNumerosPremiados(false);
                                            setNumerosPremiados(value);
                                        }
                                    }}
                                >
                                    <SelectTrigger className="h-12 border-2 focus:border-green-600">
                                        <SelectValue placeholder="Selecione quantos números serão premiados" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">0 números premiados (sem ganhadores)</SelectItem>
                                        {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
                                            <SelectItem key={num} value={num.toString()}>
                                                {num} {num === 1 ? 'número premiado' : 'números premiados'}
                                            </SelectItem>
                                        ))}
                                        <SelectItem value="custom">Personalizado</SelectItem>
                                    </SelectContent>
                                </Select>
                                {isCustomNumerosPremiados && (
                                    <Input
                                        type="number"
                                        value={customNumerosPremiados}
                                        onChange={(e) => setCustomNumerosPremiados(e.target.value)}
                                        placeholder="Digite a quantidade de números premiados"
                                        className="mt-2 h-12 border-2 focus:border-green-600"
                                        min="0"
                                        max="100"
                                    />
                                )}
                                <p className="text-gray-500 text-xs mt-1">
                                    Quantidade de números que serão sorteados como ganhadores
                                </p>
                            </div>

                            <div>
                                <Label className="text-base font-semibold text-gray-700 mb-3 block">Tempo para Reserva</Label>
                                <Select
                                    value={isCustomReserva ? 'custom' : tempoReserva}
                                    onValueChange={(value) => {
                                        if (value === 'custom') {
                                            setIsCustomReserva(true);
                                            setTempoReserva('');
                                        } else {
                                            setIsCustomReserva(false);
                                            setTempoReserva(value);
                                        }
                                    }}
                                >
                                    <SelectTrigger className="h-12 border-2 focus:border-green-600">
                                        <SelectValue placeholder="Escolha o tempo de reserva" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">0 minutos (sem reserva)</SelectItem>
                                        <SelectItem value="10">10 minutos</SelectItem>
                                        <SelectItem value="30">30 minutos</SelectItem>
                                        <SelectItem value="60">1 hora</SelectItem>
                                        <SelectItem value="1440">1 dia</SelectItem>
                                        <SelectItem value="10080">7 dias</SelectItem>
                                        <SelectItem value="custom">Personalizado</SelectItem>
                                    </SelectContent>
                                </Select>
                                {isCustomReserva && (
                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                        <Input
                                            type="number"
                                            value={customReservaValue}
                                            onChange={(e) => setCustomReservaValue(e.target.value)}
                                            placeholder="Digite o tempo"
                                            className="h-12 border-2 focus:border-green-600"
                                            min="0"
                                        />
                                        <Select value={customReservaUnit} onValueChange={setCustomReservaUnit}>
                                            <SelectTrigger className="h-12 border-2 focus:border-green-600">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="minutos">Minutos</SelectItem>
                                                <SelectItem value="horas">Horas</SelectItem>
                                                <SelectItem value="dias">Dias</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                                <p className="text-gray-500 text-xs mt-1">
                                    Tempo que o número ficará reservado para pagamento
                                </p>
                            </div>

                            <div>
                                <Label className="text-base font-semibold text-gray-700 mb-3 block">Porcentagem Máxima de Compra</Label>
                                <Select
                                    value={porcentagemMaxima}
                                    onValueChange={setPorcentagemMaxima}
                                >
                                    <SelectTrigger className="h-12 border-2 focus:border-green-600">
                                        <SelectValue placeholder="Escolha a porcentagem máxima" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10% da rifa total</SelectItem>
                                        <SelectItem value="15">15% da rifa total</SelectItem>
                                        <SelectItem value="20">20% da rifa total</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-gray-500 text-xs mt-1">
                                    Porcentagem máxima que uma pessoa pode comprar da rifa total
                                </p>
                            </div>

                            <div>
                                <Label className="text-base font-semibold text-gray-700 mb-3 block">Promoções de Pacotes</Label>
                                <Select 
                                    value={numPromocoes.toString()}
                                    onValueChange={(value) => {
                                        const numValue = parseInt(value);
                                        setNumPromocoes(numValue);
                                        setPromocoes(prev => {
                                            const newPromocoes = [...prev];
                                            while (newPromocoes.length < numValue) {
                                                newPromocoes.push({quantidade: '', valor: ''});
                                            }
                                            return newPromocoes.slice(0, numValue);
                                        });
                                    }}
                                >
                                    <SelectTrigger className="h-12 border-2 focus:border-green-600">
                                        <SelectValue placeholder="Selecione quantas promoções terá" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">Sem promoções</SelectItem>
                                        {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                                            <SelectItem key={num} value={num.toString()}>
                                                {num} {num === 1 ? 'promoção' : 'promoções'}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <p className="text-gray-500 text-xs mt-1">
                                    Promoções de pacotes com desconto para incentivar compras maiores
                                </p>

                                {numPromocoes > 0 && (
                                    <div className="mt-4 space-y-4">
                                        {promocoes.map((promocao, index) => (
                                            <div key={index} className="bg-green-50 border border-green-200 p-4">
                                                <div className="flex items-center mb-3">
                                                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 font-semibold">
                                                        {index + 1}
                                                    </span>
                                                    <h4 className="text-lg font-semibold text-green-800">Promoção {index + 1}</h4>
                                                </div>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <Label className="text-sm font-medium text-green-700 mb-2 block">Quantidade de Bilhetes</Label>
                                                        <Input
                                                            type="number"
                                                            value={promocao.quantidade}
                                                            onChange={(e) => {
                                                                const newPromocoes = [...promocoes];
                                                                newPromocoes[index].quantidade = e.target.value;
                                                                setPromocoes(newPromocoes);
                                                            }}
                                                            placeholder="Ex: 10"
                                                            className="h-11 border-2 focus:border-green-600 transition-colors"
                                                            min="1"
                                                        />
                                                    </div>
                                                    
                                                    <div>
                                                        <Label className="text-sm font-medium text-green-700 mb-2 block">Valor Total do Pacote</Label>
                                                        <div className="relative">
                                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 font-medium text-sm">R$</span>
                                                            <Input
                                                                value={promocao.valor}
                                                                onChange={(e) => {
                                                                    const formatted = formatPrice(e.target.value);
                                                                    const newPromocoes = [...promocoes];
                                                                    newPromocoes[index].valor = formatted;
                                                                    setPromocoes(newPromocoes);
                                                                }}
                                                                placeholder="0,00"
                                                                className="pl-10 h-11 border-2 focus:border-green-600 transition-colors"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Seção 3: Data e Local do Sorteio */}
                    <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                            <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">3</span>
                            Data e Local do Sorteio
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <Label className="text-base font-semibold text-gray-700 mb-3 block">
                                    Local do Sorteio
                                </Label>
                                <Select
                                    value={drawLocation}
                                    onValueChange={(value) => {
                                        const selectedOption = drawOptions.find(opt => opt.value === value);
                                        setDrawLocation(value);
                                        // Set default time only if option has a predefined time and current time is empty
                                        if (selectedOption?.time && !drawTime) {
                                            setDrawTime(selectedOption.time);
                                        }
                                        if (errors.drawLocation) {
                                            setErrors({ ...errors, drawLocation: '' });
                                        }
                                    }}
                                >
                                    <SelectTrigger className={`h-12 border-2 ${errors.drawLocation ? 'border-red-500 focus:border-red-500' : 'focus:border-green-600'
                                        }`}>
                                        <SelectValue placeholder="Escolha onde será realizado o sorteio" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {drawOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.drawLocation && <p className="text-red-500 text-sm mt-1">{errors.drawLocation}</p>}
                            </div>

                            {drawLocation && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label className="text-base font-semibold text-gray-700 mb-3 block">Horário do Sorteio</Label>
                                        <Input
                                            placeholder="HH:MM"
                                            value={drawTime}
                                            onChange={(e) => {
                                                const formatted = formatTime(e.target.value);
                                                setDrawTime(formatted);
                                                if (errors.drawTime) {
                                                    setErrors({ ...errors, drawTime: '' });
                                                }
                                            }}
                                            className={`h-12 border-2 transition-colors ${errors.drawTime ? 'border-red-500 focus:border-red-500' : 'focus:border-green-600'
                                                }`}
                                            maxLength={5}
                                        />
                                        {errors.drawTime && <p className="text-red-500 text-sm mt-1">{errors.drawTime}</p>}
                                        {drawOptions.find(opt => opt.value === drawLocation)?.time && (
                                            <p className="text-gray-500 text-xs mt-1">
                                                Horário padrão: {drawOptions.find(opt => opt.value === drawLocation)?.time} (pode ser alterado)
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Label className="text-base font-semibold text-gray-700 mb-3 block">Data do Sorteio</Label>
                                        <Input
                                            type="date"
                                            value={drawDate}
                                            onChange={(e) => {
                                                setDrawDate(e.target.value);
                                                if (errors.drawDate) {
                                                    setErrors({ ...errors, drawDate: '' });
                                                }
                                            }}
                                            min={new Date().toISOString().split('T')[0]}
                                            required
                                            className={`h-12 border-2 transition-colors ${errors.drawDate ? 'border-red-500 focus:border-red-500' : 'focus:border-green-600'
                                                }`}
                                        />
                                        {errors.drawDate && <p className="text-red-500 text-sm mt-1">{errors.drawDate}</p>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Seção 4: Prêmios */}
                    <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                            <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">4</span>
                            Prêmios da Rifa
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <Label className="text-base font-semibold text-gray-700 mb-3 block">Quantidade de Prêmios</Label>
                                <Select
                                    value={numPrizes.toString()}
                                    onValueChange={(value) => {
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
                                    }}
                                >
                                    <SelectTrigger className="h-12 border-2 focus:border-green-600">
                                        <SelectValue placeholder="Selecione quantos prêmios terá" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                                            <SelectItem key={num} value={num.toString()}>
                                                {num} {num === 1 ? 'prêmio' : 'prêmios'}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-6">
                                {prizes.map((prize, index) => (
                                    <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center mb-4">
                                            <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 font-semibold">
                                                {index + 1}
                                            </span>
                                            <h3 className="text-lg font-semibold text-gray-800">Prêmio {index + 1}</h3>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <Label className="text-sm font-medium text-gray-700 mb-2 block">Título do Prêmio</Label>
                                                <Input
                                                    value={prize}
                                                    onChange={(e) => {
                                                        const newPrizes = [...prizes];
                                                        newPrizes[index] = e.target.value;
                                                        setPrizes(newPrizes);
                                                    }}
                                                    placeholder={`Ex: iPhone 15, R$ 1.000 em dinheiro, Notebook...`}
                                                    className="h-11 border-2 focus:border-green-600 transition-colors"
                                                />
                                            </div>

                                            <div>
                                                <Label className="text-sm font-medium text-gray-700 mb-3 block">Imagens do Prêmio</Label>
                                                <div className="space-y-3">
                                                    <div
                                                        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200
                                                            ${prizeDragActive[index]
                                                                ? "border-green-600 bg-green-50 scale-[1.02]"
                                                                : "border-gray-300 hover:border-green-500 hover:bg-green-25"
                                                            }`}
                                                        onDragEnter={(e) => handlePrizeDrag(index, e)}
                                                        onDragLeave={(e) => handlePrizeDrag(index, e)}
                                                        onDragOver={(e) => handlePrizeDrag(index, e)}
                                                        onDrop={(e) => handlePrizeDrop(index, e)}
                                                    >
                                                        <div className="flex flex-col items-center gap-3">
                                                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                            </div>
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
                                                                className="cursor-pointer font-semibold text-green-700 hover:text-green-800 transition-colors"
                                                            >
                                                                Clique para selecionar imagens
                                                            </Label>
                                                            <span className="text-gray-500 text-sm">ou arraste e solte aqui</span>
                                                            <span className="text-xs text-gray-400">PNG, JPG até 10MB cada</span>
                                                        </div>
                                                    </div>

                                                    {prizeImages[index] && prizeImages[index].length > 0 && (
                                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                                            {prizeImages[index].map((image, imageIndex) => (
                                                                <div key={imageIndex} className="relative group">
                                                                    <img
                                                                        src={URL.createObjectURL(image)}
                                                                        alt={`Prêmio ${index + 1} - Imagem ${imageIndex + 1}`}
                                                                        className="w-full h-24 object-cover rounded-lg border-2 border-gray-200 group-hover:border-green-400 transition-colors"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => deletePrizeImage(index, imageIndex)}
                                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg
                                                                        opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 hover:scale-110"
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
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Botão de Criação */}
                    <div className="pt-6 border-t-2 border-gray-200">
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Criando Rifa...
                                </div>
                            ) : (
                                "🎯 Criar Minha Rifa"
                            )}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}