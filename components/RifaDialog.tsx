import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Rifa } from "@/types";

interface RifaDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    rifa: Rifa;
}

export function RifaDialog({ open, onOpenChange, rifa }: RifaDialogProps) {
    // Função utilitária para exibir ReactNode como texto
    function renderNode(node: React.ReactNode) {
        if (typeof node === "string" || typeof node === "number") return node;
        if (Array.isArray(node)) return node.join(" ");
        // Para outros casos, pode-se customizar conforme necessário
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <h2 className="text-xl font-bold">{renderNode(rifa.titulo)}</h2>
                <p className="text-gray-600">{renderNode(rifa.descricao)}</p>
                {/* Imagens do prêmio principal */}
                {rifa.imagensPremioPrincipal && rifa.imagensPremioPrincipal.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center my-2">
                        {rifa.imagensPremioPrincipal.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`Imagem prêmio principal ${idx + 1}`}
                                width={80}
                                height={80}
                                className="object-contain rounded"
                            />
                        ))}
                    </div>
                )}
                {/* Prêmios adicionais */}
                {rifa.premios && rifa.premios.length > 0 && (
                    <div className="my-2">
                        <strong>Prêmios adicionais:</strong>
                        <ul>
                            {rifa.premios.map((premio, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    {premio.imagens && premio.imagens.length > 0 && (
                                        <div className="flex gap-1">
                                            {premio.imagens.map((img, imgIdx) => (
                                                <img
                                                    key={imgIdx}
                                                    src={img}
                                                    alt={`Imagem prêmio adicional ${idx + 1} - ${imgIdx + 1}`}
                                                    width={40}
                                                    height={40}
                                                    className="object-contain rounded"
                                                />
                                            ))}
                                        </div>
                                    )}
                                    <span>{premio.nome}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <p className="mt-2">Progresso: {renderNode(rifa.progresso)}</p>
                <p className="mt-1">Preço da rifa: R$ {Number(rifa.preco).toFixed(2)}</p>
                <p className="mt-1">Método de Pagamento: {renderNode(rifa.metodoPagamento)}</p>
                <p className="mt-1">{rifa.disponivel ? "Disponível" : "Indisponível"}</p>
                <p className="mt-1">Total de Números: {rifa.totalNumbers}</p>
                <p className="mt-1">Prêmio: R$ {Number(rifa.premio).toFixed(2)}</p>
                <p className="mt-1">Modo de venda: {rifa.saleMode}</p>
                <p className="mt-1">Números vendidos: {rifa.numerosVendidos && rifa.numerosVendidos.length > 0 ? rifa.numerosVendidos.join(", ") : "Nenhum"}</p>
                <p className="mt-1">Data do sorteio: {new Date(rifa.dataSorteio).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</p>
                <p className="mt-1">Transmissão: {rifa.canalTransmissao}</p>
                <div className="mt-2">
                    <strong>Contatos:</strong>
                    <ul className="mt-1 space-y-1">
                        {rifa.contatos.map((c) => (
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
            </DialogContent>
        </Dialog>
    );
}
