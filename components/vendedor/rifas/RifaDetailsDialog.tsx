'use client';

import * as React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Rifa } from '@/types';

interface RifaDetailsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id?: number;
    rifa?: Rifa; // Add rifa prop to avoid fetching
}

export function RifaDetailsDialog({
    open,
    onOpenChange,
    id,
    rifa: rifaProp,
}: RifaDetailsDialogProps) {
    const [rifa, setRifa] = React.useState<Rifa | null>(rifaProp || null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    
    // Editing states
    const [editingDrawDate, setEditingDrawDate] = React.useState(false);
    const [editingChannel, setEditingChannel] = React.useState(false);
    const [editingContacts, setEditingContacts] = React.useState(false);
    
    // Temporary editing values
    const [tempDrawDate, setTempDrawDate] = React.useState('');
    const [tempChannel, setTempChannel] = React.useState('');
    const [tempContacts, setTempContacts] = React.useState<any[]>([]);
    
    // Saving states
    const [savingDrawDate, setSavingDrawDate] = React.useState(false);
    const [savingChannel, setSavingChannel] = React.useState(false);
    const [savingContacts, setSavingContacts] = React.useState(false);

    React.useEffect(() => {
        // Only fetch if no rifa prop is provided and dialog is open
        if (!open || rifaProp || !id) return;
        
        setLoading(true);
        setError(null);

        fetch(`/api/rifas/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error('Erro ao carregar rifa');
                return res.json();
            })
            .then(setRifa)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [open, id, rifaProp]);

    // Update rifa when rifaProp changes
    React.useEffect(() => {
        if (rifaProp) {
            setRifa(rifaProp);
        }
    }, [rifaProp]);

    // Helper function to format date for input
    const formatDateForInput = (date: string | Date) => {
        const d = new Date(date);
        return d.toISOString().slice(0, 16);
    };

    // Save functions
    const saveDrawDate = async () => {
        if (!rifa || !tempDrawDate) return;
        
        setSavingDrawDate(true);
        try {
            const response = await fetch(`/api/rifas/${rifa.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dataSorteio: tempDrawDate })
            });
            
            if (!response.ok) throw new Error('Erro ao salvar data');
            
            const updatedRifa = await response.json();
            setRifa(updatedRifa);
            setEditingDrawDate(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao salvar data');
        } finally {
            setSavingDrawDate(false);
        }
    };

    const saveChannel = async () => {
        if (!rifa || !tempChannel) return;
        
        setSavingChannel(true);
        try {
            const response = await fetch(`/api/rifas/${rifa.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ canalTransmissao: tempChannel })
            });
            
            if (!response.ok) throw new Error('Erro ao salvar canal');
            
            const updatedRifa = await response.json();
            setRifa(updatedRifa);
            setEditingChannel(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao salvar canal');
        } finally {
            setSavingChannel(false);
        }
    };

    const saveContacts = async () => {
        if (!rifa) return;
        
        setSavingContacts(true);
        try {
            const response = await fetch(`/api/rifas/${rifa.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contatos: tempContacts })
            });
            
            if (!response.ok) throw new Error('Erro ao salvar contatos');
            
            const updatedRifa = await response.json();
            setRifa(updatedRifa);
            setEditingContacts(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao salvar contatos');
        } finally {
            setSavingContacts(false);
        }
    };

    // Start editing functions
    const startEditingDrawDate = () => {
        setTempDrawDate(formatDateForInput(rifa!.dataSorteio));
        setEditingDrawDate(true);
    };

    const startEditingChannel = () => {
        setTempChannel(rifa!.canalTransmissao);
        setEditingChannel(true);
    };

    const startEditingContacts = () => {
        setTempContacts([...rifa!.contatos]);
        setEditingContacts(true);
    };

    // Contact management functions
    const addContact = () => {
        setTempContacts([...tempContacts, { nome: '', telefone: '', avatarUrl: '' }]);
    };

    const updateContact = (index: number, field: string, value: string) => {
        const updated = [...tempContacts];
        updated[index] = { ...updated[index], [field]: value };
        setTempContacts(updated);
    };

    const removeContact = (index: number) => {
        setTempContacts(tempContacts.filter((_, i) => i !== index));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Detalhes da Rifa #{rifa?.id || id}</DialogTitle>
                </DialogHeader>

                {loading && <p>Carregando...</p>}
                {error && <p className="text-red-500">Erro: {error}</p>}
                {rifa && (
                    <div className="space-y-6">
                        {/* Cabeçalho da Rifa */}
                        <div className="border-b pb-4">
                            <h3 className="font-bold text-xl text-gray-800 mb-2">{typeof rifa.titulo === "string" ? rifa.titulo : ""}</h3>
                            <p className="text-gray-600">{typeof rifa.descricao === "string" ? rifa.descricao : ""}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-sm text-gray-500">Status:</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${rifa.disponivel ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {rifa.disponivel ? 'Disponível' : 'Indisponível'}
                                </span>
                            </div>
                        </div>

                        {/* Informações do Prêmio */}
                        <div>
                            <h4 className="font-semibold text-lg text-gray-800 mb-3 flex items-center gap-2">
                                🏆 Prêmios
                            </h4>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <p className="font-medium text-green-800 mb-2">Prêmio Principal: {rifa.premio}</p>
                                
                                {rifa.imagensPremioPrincipal && rifa.imagensPremioPrincipal.length > 0 && (
                                    <div className="flex gap-2 mt-2 flex-wrap">
                                        {rifa.imagensPremioPrincipal.map((img, i) => (
                                            <img key={i} src={img} alt={`Imagem principal ${i + 1}`} className="h-20 w-20 object-cover rounded-md border-2 border-green-200" />
                                        ))}
                                    </div>
                                )}

                                {rifa.premios && rifa.premios.length > 0 && (
                                    <div className="mt-4">
                                        <p className="font-medium text-green-700 mb-2">Prêmios Adicionais:</p>
                                        <div className="space-y-2">
                                            {rifa.premios.map((p, i) => (
                                                <div key={i} className="flex items-center gap-3 bg-white p-2 rounded border border-green-200">
                                                    {p.imagens && p.imagens.length > 0 && (
                                                        <div className="flex gap-1">
                                                            {p.imagens.map((img, imgIdx) => (
                                                                <img
                                                                    key={imgIdx}
                                                                    src={img}
                                                                    alt={`Prêmio ${i + 1} - Imagem ${imgIdx + 1}`}
                                                                    className="h-8 w-8 object-cover rounded border"
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                    <span className="text-green-700 font-medium">{p.nome}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Informações de Venda */}
                        <div>
                            <h4 className="font-semibold text-lg text-gray-800 mb-3 flex items-center gap-2">
                                💰 Informações de Venda
                            </h4>
                            <div className="grid grid-cols-2 gap-4 bg-green-50 p-4 rounded-lg">
                                <div>
                                    <p className="text-sm text-gray-600">Preço por bilhete</p>
                                    <p className="font-bold text-lg text-green-700">R$ {Number(rifa.preco).toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Total de números</p>
                                    <p className="font-bold text-lg text-green-700">{rifa.totalNumbers}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Modo de venda</p>
                                    <p className="font-medium text-green-700">{rifa.saleMode}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Progresso</p>
                                    <p className="font-medium text-green-700">
                                        {rifa.disponivel 
                                            ? `${Math.round((rifa.numerosVendidos.length / rifa.totalNumbers) * 100)}%`
                                            : "Indisponível"
                                        }
                                    </p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-600">Métodos de pagamento</p>
                                    <p className="font-medium text-green-700">{typeof rifa.metodoPagamento === "string" ? rifa.metodoPagamento : ""}</p>
                                </div>
                            </div>
                        </div>

                        {/* Números Vendidos */}
                        <div>
                            <h4 className="font-semibold text-lg text-gray-800 mb-3 flex items-center gap-2">
                                🎫 Números Vendidos ({rifa.disponivel ? rifa.numerosVendidos.length : 0})
                            </h4>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="max-h-24 overflow-y-auto">
                                    {rifa.disponivel && rifa.numerosVendidos.length > 0 ? (
                                        <div className="flex flex-wrap gap-1">
                                            {rifa.numerosVendidos.map((num, i) => (
                                                <span key={i} className="bg-gray-700 text-white px-2 py-1 rounded text-xs font-medium">
                                                    {num}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 italic">
                                            {rifa.disponivel ? "Nenhum número vendido ainda" : "Rifa indisponível - nenhum número pode ser vendido"}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Informações do Sorteio */}
                        <div>
                            <h4 className="font-semibold text-lg text-gray-800 mb-3 flex items-center gap-2">
                                📅 Sorteio
                            </h4>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <div className="space-y-2">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm text-gray-600">Data e horário</p>
                                            {!editingDrawDate && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={startEditingDrawDate}
                                                >
                                                    Editar
                                                </Button>
                                            )}
                                        </div>
                                        {editingDrawDate ? (
                                            <div className="space-y-2">
                                                <Input
                                                    type="datetime-local"
                                                    value={tempDrawDate}
                                                    onChange={(e) => setTempDrawDate(e.target.value)}
                                                />
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={saveDrawDate}
                                                        disabled={savingDrawDate}
                                                    >
                                                        {savingDrawDate ? 'Salvando...' : 'Salvar'}
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => setEditingDrawDate(false)}
                                                    >
                                                        Cancelar
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="font-medium text-green-700">{new Date(rifa.dataSorteio).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</p>
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm text-gray-600">Canal de transmissão</p>
                                            {!editingChannel && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={startEditingChannel}
                                                >
                                                    Editar
                                                </Button>
                                            )}
                                        </div>
                                        {editingChannel ? (
                                            <div className="space-y-2">
                                                <Input
                                                    value={tempChannel}
                                                    onChange={(e) => setTempChannel(e.target.value)}
                                                    placeholder="Digite o canal de transmissão"
                                                />
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={saveChannel}
                                                        disabled={savingChannel}
                                                    >
                                                        {savingChannel ? 'Salvando...' : 'Salvar'}
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => setEditingChannel(false)}
                                                    >
                                                        Cancelar
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="font-medium text-green-700">{rifa.canalTransmissao}</p>
                                        )}
                                    </div>
                                    {rifa.fazendinha !== undefined && (
                                        <div>
                                            <p className="text-sm text-gray-600">Fazendinha</p>
                                            <p className="font-medium text-green-700">{rifa.fazendinha ? 'Sim' : 'Não'}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Contatos */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
                                    📞 Contatos
                                </h4>
                                {!editingContacts && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={startEditingContacts}
                                    >
                                        Editar
                                    </Button>
                                )}
                            </div>
                            {editingContacts ? (
                                <div className="space-y-3">
                                    {tempContacts.map((contact, index) => (
                                        <div key={index} className="bg-green-50 p-3 rounded-lg border border-green-200">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                                                <div>
                                                    <Label htmlFor={`name-${index}`} className="text-xs">Nome</Label>
                                                    <Input
                                                        id={`name-${index}`}
                                                        value={contact.nome}
                                                        onChange={(e) => updateContact(index, 'nome', e.target.value)}
                                                        placeholder="Nome"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor={`phone-${index}`} className="text-xs">Telefone</Label>
                                                    <Input
                                                        id={`phone-${index}`}
                                                        value={contact.telefone}
                                                        onChange={(e) => updateContact(index, 'telefone', e.target.value)}
                                                        placeholder="Telefone"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor={`avatar-${index}`} className="text-xs">Avatar URL</Label>
                                                    <Input
                                                        id={`avatar-${index}`}
                                                        value={contact.avatarUrl}
                                                        onChange={(e) => updateContact(index, 'avatarUrl', e.target.value)}
                                                        placeholder="URL do Avatar"
                                                    />
                                                </div>
                                            </div>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => removeContact(index)}
                                            >
                                                Remover
                                            </Button>
                                        </div>
                                    ))}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={addContact}
                                    >
                                        Adicionar Contato
                                    </Button>
                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            onClick={saveContacts}
                                            disabled={savingContacts}
                                        >
                                            {savingContacts ? 'Salvando...' : 'Salvar Contatos'}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => setEditingContacts(false)}
                                        >
                                            Cancelar
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {rifa.contatos.map((c) => (
                                        <div key={c.telefone} className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-200">
                                            {c.avatarUrl && (
                                                <img src={c.avatarUrl} alt={c.nome} className="h-10 w-10 rounded-full border-2 border-green-300" />
                                            )}
                                            <div>
                                                <p className="font-medium text-green-800">{c.nome}</p>
                                                <p className="text-sm text-green-600">{c.telefone}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Informações Técnicas */}
                        <div className="border-t pt-4">
                            <h4 className="font-semibold text-sm text-gray-500 mb-2">Informações Técnicas</h4>
                            <p className="text-xs text-gray-400">ID da Rifa: {rifa.id}</p>
                        </div>
                    </div>
                )}

                <DialogClose asChild>
                    <Button className="mt-4">Fechar</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
