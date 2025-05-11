
export interface RifaRaw {
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

export async function getRifaById(id: string): Promise<RifaRaw | null> {
    // enquanto não tiver BD, devolve rifa mock:
    return {
        id,
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
    };
}


{/*
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export interface RifaRaw {
    id: string;
    totalNumbers: number;
    preco: number;
    premio: number;
    saleMode: string;
    numerosVendidos: number[];
    // campos extras:
    dataSorteio: string;
    canalTransmissao: string;
    contatos: {
        nome: string;
        telefone: string;
        avatarUrl?: string;
    }[];
}

export async function getRifaById(id: string): Promise<RifaRaw | null> {
    // enquanto não tiver BD, devolve rifa mock:
    return {
      id,
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
    };
  }

export async function getRifaById(id: string): Promise<RifaRaw | null> {
    return prisma.rifa.findUnique({
        where: { id },
        select: {
            id: true,
            totalNumbers: true,
            preco: true,
            premio: true,
            saleMode: true,
            numerosVendidos: true,
            dataSorteio: true,
            canalTransmissao: true,
            contatos: true,
        },
    });
}
*/}