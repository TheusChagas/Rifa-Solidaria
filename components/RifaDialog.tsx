import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Rifa } from "@/types";

interface RifaDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    rifa: Rifa;
}

export function RifaDialog({ open, onOpenChange, rifa }: RifaDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <h2 className="text-xl font-bold">{rifa.titulo}</h2>
                <p className="text-gray-600">{rifa.descricao}</p>
                <p className="mt-2">Progresso: {rifa.progresso}%</p>
                <p className="mt-1">Preço da rifa: R$ {rifa.preco.toFixed(2)}</p>
                <p className="mt-1">Método de Pagamento: {rifa.metodoPagamento}</p>
                <p className="mt-1">{rifa.disponivel ? "Disponível" : "Indisponível"}</p>
            </DialogContent>
        </Dialog>
    );
}
