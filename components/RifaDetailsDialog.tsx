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
import { RifaRaw } from '@/lib/getRifaID';

interface RifaDetailsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: number;
}

export function RifaDetailsDialog({
    open,
    onOpenChange,
    id,
}: RifaDetailsDialogProps) {
    const [rifa, setRifa] = React.useState<RifaRaw | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (!open) return;
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
    }, [open, id]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detalhes da Rifa #{id}</DialogTitle>
                </DialogHeader>

                {loading && <p>Carregando...</p>}
                {error && <p className="text-red-500">Erro: {error}</p>}
                {rifa && (
                    <div className="space-y-2">
                        <p><strong>Título:</strong> {rifa.titulo}</p>
                        <p><strong>ID:</strong> {rifa.id}</p>
                        <p><strong>Modo de Venda:</strong> {rifa.saleMode}</p>
                        <p><strong>Total de Números:</strong> {rifa.totalNumbers}</p>
                        <p><strong>Preço:</strong> R$ {rifa.preco.toFixed(2)}</p>
                        <p><strong>Prêmio:</strong> {rifa.premio}</p>
                        <p><strong>Números Vendidos:</strong> {rifa.numerosVendidos.join(', ')}</p>
                        <p><strong>Data Sorteio:</strong> {new Date(rifa.dataSorteio).toLocaleString()}</p>
                        <p><strong>Canal:</strong> {rifa.canalTransmissao}</p>
                        <p><strong>Descrição:</strong> {rifa.descricao}</p>
                        <p><strong>Progresso:</strong> {rifa.progresso}%</p>
                        <p><strong>Método de Pagamento:</strong> {rifa.metodoPagamento}</p>
                        <p><strong>Disponível:</strong> {rifa.disponivel ? 'Sim' : 'Não'}</p>
                        <div>
                            <strong>Contatos:</strong>
                            {rifa.contatos.map((c) => (
                                <div key={c.telefone} className="ml-4">
                                    {c.nome} ({c.telefone})
                                </div>
                            ))}
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
