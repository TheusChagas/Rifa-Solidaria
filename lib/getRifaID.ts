import { ReactNode } from "react";

export interface RifaRaw {
    titulo: ReactNode;
    descricao: ReactNode;
    progresso: ReactNode;
    metodoPagamento: ReactNode;
    disponivel: any;
    id: string;
    totalNumbers: number;
    preco: number;
    premio: number;
    saleMode: string;
    numerosVendidos: number[];
    dataSorteio: string;
    canalTransmissao: string;
    contatos: {
        nome: string;
        telefone: string;
        avatarUrl?: string;
    }[];
}

const rifasMock: Record<string, RifaRaw> = {
    "1": {
        id: "1",
        titulo: "Rifa Solidária",
        descricao: "Ajude uma causa e concorra a prêmios incríveis!",
        progresso: "40%",
        metodoPagamento: "Pix, Cartão",
        disponivel: true,
        totalNumbers: 100,
        preco: 3.99,
        premio: 250,
        saleMode: "a dezena",
        numerosVendidos: [1, 5, 17, 42],
        dataSorteio: "2025-05-03T18:55:00Z",
        canalTransmissao: "YouTube – Xerifão JB",
        contatos: [
            { nome: "Sophie", telefone: "22999679484", avatarUrl: "/sophie.png" },
            { nome: "Xerifão", telefone: "22997018404", avatarUrl: "/xerifao.png" },
        ],
    },
    "3": {
        id: "3",
        titulo: "Rifa do Bem",
        descricao: "Participe e ajude a ONG Amigos dos Animais. Prêmio: Bicicleta Aro 29.",
        progresso: "70%",
        metodoPagamento: "Pix, Boleto",
        disponivel: true,
        totalNumbers: 200,
        preco: 5.00,
        premio: 1200,
        saleMode: "por número",
        numerosVendidos: [10, 23, 45, 67, 89, 101, 150],
        dataSorteio: "2025-06-10T20:00:00Z",
        canalTransmissao: "Instagram – @amigosanimais",
        contatos: [
            { nome: "Carlos", telefone: "21999998888", avatarUrl: "/carlos.png" },
            { nome: "Ana", telefone: "21988887777", avatarUrl: "/ana.png" },
        ],
    },
    "5": {
        id: "5",
        titulo: "Rifa Natalina",
        descricao: "Concorra a uma cesta de Natal e ajude famílias carentes.",
        progresso: "55%",
        metodoPagamento: "Cartão, Dinheiro",
        disponivel: false,
        totalNumbers: 150,
        preco: 2.50,
        premio: 500,
        saleMode: "por cota",
        numerosVendidos: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
        dataSorteio: "2024-12-20T19:30:00Z",
        canalTransmissao: "Facebook – Rifa Natalina",
        contatos: [
            { nome: "João", telefone: "21977776666", avatarUrl: "/joao.png" },
            { nome: "Maria", telefone: "21966665555", avatarUrl: "/maria.png" },
        ],
    }
};

export async function getRifaById(id: string): Promise<RifaRaw | null> {
    return rifasMock[id] || null;
}

// ...comentários e código antigo mantidos...