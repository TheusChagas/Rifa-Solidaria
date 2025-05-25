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
import { Rifa } from '@/types';

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
    const [rifa, setRifa] = React.useState<Rifa | null>(null);
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
                        <p><strong>Título:</strong> {typeof rifa.titulo === "string" ? rifa.titulo : ""}</p>
                        <p><strong>ID:</strong> {rifa.id}</p>
                        <p><strong>Modo de Venda:</strong> {rifa.saleMode}</p>
                        <p><strong>Total de Números:</strong> {rifa.totalNumbers}</p>
                        <p><strong>Preço:</strong> R$ {Number(rifa.preco).toFixed(2)}</p>
                        <p><strong>Prêmio:</strong> {rifa.premio}</p>
                        <p><strong>Números Vendidos:</strong> {rifa.numerosVendidos.join(', ')}</p>
                        <p><strong>Data Sorteio:</strong> {new Date(rifa.dataSorteio).toLocaleString()}</p>
                        <p><strong>Canal:</strong> {rifa.canalTransmissao}</p>
                        <p><strong>Descrição:</strong> {typeof rifa.descricao === "string" ? rifa.descricao : ""}</p>
                        <p><strong>Progresso:</strong> {typeof rifa.progresso === "string" || typeof rifa.progresso === "number" ? rifa.progresso : ""}%</p>
                        <p><strong>Método de Pagamento:</strong> {typeof rifa.metodoPagamento === "string" ? rifa.metodoPagamento : ""}</p>
                        <p><strong>Disponível:</strong> {rifa.disponivel ? 'Sim' : 'Não'}</p>
                        <div>
                            <strong>Contatos:</strong>
                            {rifa.contatos.map((c) => (
                                <div key={c.telefone} className="ml-4">
                                    {c.nome} ({c.telefone}){c.avatarUrl && <> <img src={c.avatarUrl} alt={c.nome} className="inline-block h-5 w-5 rounded-full ml-1" /></>}
                                </div>
                            ))}
                        </div>
                        {/* Prêmios adicionais */}
                        {rifa.premios && (
                            <div>
                                <strong>Prêmios adicionais:</strong>
                                <ul>
                                    {rifa.premios.map((p, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            {p.imagens && p.imagens.length > 0 && (
                                                <div className="flex gap-1">
                                                    {p.imagens.map((img, imgIdx) => (
                                                        <img
                                                            key={imgIdx}
                                                            src={img}
                                                            alt={`Imagem prêmio adicional ${i + 1} - ${imgIdx + 1}`}
                                                            className="h-8 w-8 object-cover rounded"
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
                        {/* Imagens do prêmio principal */}
                        {rifa.imagensPremioPrincipal && (
                            <div>
                                <strong>Imagens do prêmio principal:</strong>
                                <div className="flex gap-2 mt-1">
                                    {rifa.imagensPremioPrincipal.map((img, i) => (
                                        <img key={i} src={img} alt={`Imagem principal ${i + 1}`} className="h-12 w-12 object-cover rounded" />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <DialogClose asChild>
                    <Button className="mt-4">Fechar</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
