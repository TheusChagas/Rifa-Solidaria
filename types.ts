import { ReactNode } from "react";

// Interface para contatos
export interface Contato {
    nome: string;
    telefone: string;
    avatarUrl?: string;
}

// Interface principal da Rifa, unificando todos os campos usados no projeto
export interface Rifa {
    id: string | number;
    titulo: string | ReactNode;
    descricao: string | ReactNode;
    progresso: string | number | ReactNode;
    metodoPagamento: string | ReactNode;
    disponivel: boolean | any;
    preco: number;
    totalNumbers: number;
    premio: number | string;
    saleMode: string;
    numerosVendidos: number[];
    dataSorteio: string;
    canalTransmissao: string;
    contatos: Contato[];
    imagens?: string[];
    prêmios?: string[];
    fazendinha?: boolean; // novo campo
}
