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
    horarioSorteio: string;
    localSorteio: string;
    canalTransmissao: string;
    quantidadeNumeros: string;
    valorCota: number;
    quantidadePremios: number;
    celularContato: string;
    contatos: Array<{
        nome: string;
        telefone: string;
        avatarUrl?: string;
    }>;
    imagensPremioPrincipal: string[];
    premios: Array<{
        nome: string;
        imagens?: string[];
        descricao?: string;
    }>;
    fazendinha: boolean;
    progresso?: string;
    // Novos atributos identificados no código
    tempoReserva?: number; // em horas
    status?: 'ativo' | 'finalizado' | 'cancelado' | 'pausado';
    vendedorId?: string;
    vendedorNome?: string;
    categoria?: string;
    tags?: string[];
    numerosReservados?: number[];
    valorTotal?: number; // preco * totalNumbers
    percentualVendido?: number;
    dataInicio?: string;
    dataFim?: string;
    regulamento?: string;
    tipoSorteio?: 'loteria-federal' | 'loteria-estadual' | 'manual' | 'online';
    transmissaoAoVivo?: boolean;
    urlTransmissao?: string;
    whatsappGrupo?: string;
    emailContato?: string;
    pixChave?: string;
    dadosBancarios?: {
        banco?: string;
        agencia?: string;
        conta?: string;
        titular?: string;
    };
    configPagamento?: {
        pix?: boolean;
        cartao?: boolean;
        dinheiro?: boolean;
        boleto?: boolean;
    };
    limitePorPessoa?: number;
    permitirReserva?: boolean;
    exibirNumerosVendidos?: boolean;
    exibirCompradores?: boolean;
    notificacoes?: {
        email?: boolean;
        whatsapp?: boolean;
        sms?: boolean;
    };
    configuracaoAvancada?: {
        permitirMultiplasCompras?: boolean;
        desconto?: {
            ativo: boolean;
            quantidade: number;
            percentual: number;
        };
        bonificacao?: {
            ativo: boolean;
            compre: number;
            ganhe: number;
        };
    };
    historico?: Array<{
        data: string;
        acao: string;
        usuario?: string;
        detalhes?: string;
    }>;
    estatisticas?: {
        visualizacoes?: number;
        compartilhamentos?: number;
        tentativasCompra?: number;
    };
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        slug?: string;
    };
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

export interface DrawOption {
    value: string;
    label: string;
    time: string | null;
}

export const drawOptions: DrawOption[] = [
    { value: 'CANTA GALO', label: 'CANTA GALO', time: '09:20' },
    { value: 'PTM', label: 'PTM', time: '11:20' },
    { value: 'PT', label: 'PT', time: '14:20' },
    { value: 'PTV', label: 'PTV', time: '16:20' },
    { value: 'PTN', label: 'PTN', time: '18:20' },
    { value: 'FEDERAL', label: 'FEDERAL', time: '19:00' },
    { value: 'CORUJINHA', label: 'CORUJINHA', time: '21:30' },
    { value: 'tiktok', label: 'TikTok', time: null },
    { value: 'instagram', label: 'Instagram', time: null },
    { value: 'youtube', label: 'YouTube', time: null },
    { value: 'outros', label: 'Outros', time: null },
];

export const jogoDoBicho: Animal[] = [
    { id: 1, nome: "Avestruz", numeros: [1, 2, 3, 4], icone: require("@/assets/Avestruz.png").default },
    { id: 2, nome: "Águia", numeros: [5, 6, 7, 8], icone: require("@/assets/aguia.png").default },
    { id: 3, nome: "Burro", numeros: [9, 10, 11, 12], icone: require("@/assets/burro.png").default },
    { id: 4, nome: "Borboleta", numeros: [13, 14, 15, 16], icone: require("@/assets/borboleta.png").default },
    { id: 5, nome: "Cachorro", numeros: [17, 18, 19, 20], icone: require("@/assets/cachorro.png").default },
    { id: 6, nome: "Cabra", numeros: [21, 22, 23, 24], icone: require("@/assets/Cabra.png").default },
    { id: 7, nome: "Carneiro", numeros: [25, 26, 27, 28], icone: require("@/assets/Carneiro.png").default },
    { id: 8, nome: "Camelo", numeros: [29, 30, 31, 32], icone: require("@/assets/camelo.png").default },
    { id: 9, nome: "Cobra", numeros: [33, 34, 35, 36], icone: require("@/assets/Cobra.png").default },
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

export interface Afiliado {
    position: number;
    sellerName: string;
    amountCollected: string;
    ticketsSold: number;
    campaign: string;
}

export interface Apoiador {
    nome: string;
    imagem: string;
}

export interface Comprador {
    telefone: string; 
    nome: string;
    cidade: string;
    estado: string;
    email: string;
}
