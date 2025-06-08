import { ReactNode } from "react";

// Interface para contatos
export interface Contato {
    nome: string;
    telefone: string;
    avatarUrl?: string;
}

// Interface principal da Rifa, unificando todos os campos usados no projeto
export interface Rifa {
    id: string;
    titulo: string;
    descricao: string;
    metodoPagamento: string;
    disponivel: boolean;
    preco: number;
    totalNumbers: number;
    premio: string | number;
    saleMode: string;
    numerosVendidos: number[];
    dataSorteio: string;
    canalTransmissao: string;
    contatos: Array<{
        nome: string;
        telefone: string;
        avatarUrl?: string;
    }>;
    imagensPremioPrincipal?: string[];
    premios?: Array<{
        nome: string;
        imagens?: string[];
    }>;
    fazendinha?: boolean;
    progresso?: string;
}

export interface RifaConfig extends Rifa {}

export interface RifaBase {
    id: string;
    titulo: string;
    descricao: string;
    metodoPagamento: string;
    disponivel: boolean;
    preco: number;
    totalNumbers: number;
    premio: string | number;
    saleMode: string;
    numerosVendidos: number[];
    dataSorteio: string;
    canalTransmissao: string;
    contatos: Array<{
        nome: string;
        telefone: string;
        avatarUrl?: string;
    }>;
    imagensPremioPrincipal?: string[];
    premios?: Array<{
        nome: string;
        imagens?: string[];
    }>;
    fazendinha?: boolean;
}

export interface Animal {
    id: number;
    nome: string;
    numeros: number[];
    icone: string;
}

export const jogoDoBicho: Animal[] = [
    { id: 1, nome: "Avestruz", numeros: [1, 2, 3, 4], icone: require("@/assets/test.png").default },
    { id: 2, nome: "Águia", numeros: [5, 6, 7, 8], icone: require("@/assets/test.png").default },
    { id: 3, nome: "Burro", numeros: [9, 10, 11, 12], icone: require("@/assets/test.png").default },
    { id: 4, nome: "Borboleta", numeros: [13, 14, 15, 16], icone: require("@/assets/test.png").default },
    { id: 5, nome: "Cachorro", numeros: [17, 18, 19, 20], icone: require("@/assets/test.png").default },
    { id: 6, nome: "Cabra", numeros: [21, 22, 23, 24], icone: require("@/assets/test.png").default },
    { id: 7, nome: "Carneiro", numeros: [25, 26, 27, 28], icone: require("@/assets/test.png").default },
    { id: 8, nome: "Camelo", numeros: [29, 30, 31, 32], icone: require("@/assets/test.png").default },
    { id: 9, nome: "Cobra", numeros: [33, 34, 35, 36], icone: require("@/assets/test.png").default },
    { id: 10, nome: "Coelho", numeros: [37, 38, 39, 40], icone: require("@/assets/test.png").default },
    { id: 11, nome: "Cavalo", numeros: [41, 42, 43, 44], icone: require("@/assets/test.png").default },
    { id: 12, nome: "Elefante", numeros: [45, 46, 47, 48], icone: require("@/assets/test.png").default },
    { id: 13, nome: "Galo", numeros: [49, 50, 51, 52], icone: require("@/assets/test.png").default },
    { id: 14, nome: "Gato", numeros: [53, 54, 55, 56], icone: require("@/assets/test.png").default },
    { id: 15, nome: "Jacaré", numeros: [57, 58, 59, 60], icone: require("@/assets/test.png").default },
    { id: 16, nome: "Leão", numeros: [61, 62, 63, 64], icone: require("@/assets/test.png").default },
    { id: 17, nome: "Macaco", numeros: [65, 66, 67, 68], icone: require("@/assets/test.png").default },
    { id: 18, nome: "Porco", numeros: [69, 70, 71, 72], icone: require("@/assets/test.png").default },
    { id: 19, nome: "Pavão", numeros: [73, 74, 75, 76], icone: require("@/assets/test.png").default },
    { id: 20, nome: "Peru", numeros: [77, 78, 79, 80], icone: require("@/assets/test.png").default },
    { id: 21, nome: "Touro", numeros: [81, 82, 83, 84], icone: require("@/assets/test.png").default },
    { id: 22, nome: "Tigre", numeros: [85, 86, 87, 88], icone: require("@/assets/test.png").default },
    { id: 23, nome: "Urso", numeros: [89, 90, 91, 92], icone: require("@/assets/test.png").default },
    { id: 24, nome: "Veado", numeros: [93, 94, 95, 96], icone: require("@/assets/test.png").default },
    { id: 25, nome: "Vaca", numeros: [97, 98, 99, 0], icone: require("@/assets/test.png").default },
];
