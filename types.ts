export interface Contato {
    nome: string;
    telefone: string;
}

export interface Rifa {
    id: number;
    titulo: string;
    descricao: string;
    progresso: number;
    preco: number;
    metodoPagamento: string;
    disponivel: boolean;

    // Novos campos do RifaDetailsDialog
    saleMode: string;
    totalNumbers: number;
    premio: string;
    numerosVendidos: number[];
    dataSorteio: string;
    canalTransmissao: string;
    contatos: Contato[];
}
