import { Rifa } from "@/types";

export const rifasMockBase: Record<string, Rifa> = {
    "1": {
        id: "1",
        titulo: "Rifa Solidária",
        descricao: "Ajude uma causa e concorra a prêmios incríveis!",
        metodoPagamento: "Pix, Cartão",
        disponivel: true,
        preco: 3.99,
        totalNumbers: 100,
        premio: 250,
        saleMode: "a dezena",
        numerosVendidos: Array.from({length: 73}, (_, i) => i + 1),
        dataSorteio: "2025-05-03T18:55:00Z",
        canalTransmissao: "YouTube – Xerifão JB",
        contatos: [
            { nome: "Sophie", telefone: "22999679484", avatarUrl: "/sophie.png" },
            { nome: "Xerifão", telefone: "22997018404", avatarUrl: "/xerifao.png" },
        ],
        imagensPremioPrincipal: [
            "https://picsum.photos/400/400?random=1",
            "https://picsum.photos/400/400?random=101",
        ],
        premios: [
            { 
                nome: "Pix R$250", 
                imagens: ["https://picsum.photos/200/200?random=2"]
            },
            { 
                nome: "Brinde surpresa", 
                imagens: ["https://picsum.photos/200/200?random=3"]
            }
        ],
        fazendinha: true,
    },
    "2": {
        id: "2",
        titulo: "Rifa Esperança",
        descricao: "Ajude a comunidade local e concorra a um smartphone novo.",
        metodoPagamento: "Pix, Dinheiro",
        disponivel: false,
        preco: 8.00,
        totalNumbers: 150,
        premio: "Smartphone",
        saleMode: "por número",
        numerosVendidos: [],
        dataSorteio: "2025-07-15T19:00:00Z",
        canalTransmissao: "YouTube – Esperança",
        contatos: [
            { nome: "Lucas", telefone: "21955554444" },
        ],
        imagensPremioPrincipal: [
            "https://picsum.photos/400/400?random=4",
        ],
        premios: [
            { 
                nome: "Smartphone", 
                imagens: ["https://picsum.photos/200/200?random=5"]
            }
        ],
        fazendinha: true,
    },
    "3": {
        id: "3",
        titulo: "Rifa do Bem",
        descricao: "Participe e ajude a ONG Amigos dos Animais. Prêmio: Bicicleta Aro 29.",
        metodoPagamento: "Pix, Boleto",
        disponivel: true,
        preco: 5.00,
        totalNumbers: 200,
        premio: "Bicicleta Aro 29",
        saleMode: "por número",
        numerosVendidos: Array.from({length: 118}, (_, i) => i + 1), // 59% vendidos
        dataSorteio: "2025-06-10T20:00:00Z",
        canalTransmissao: "Instagram – @amigosanimais",
        contatos: [
            { nome: "Carlos", telefone: "21999998888", avatarUrl: "/carlos.png" },
            { nome: "Ana", telefone: "21988887777", avatarUrl: "/ana.png" },
        ],
        imagensPremioPrincipal: [
            "https://picsum.photos/400/400?random=7",
            "https://picsum.photos/400/400?random=107",
            "https://picsum.photos/400/400?random=207",
            "https://picsum.photos/400/400?random=307",
            "https://picsum.photos/400/400?random=407"
        ],
        premios: [
            { 
                nome: "Bicicleta Aro 29", 
                imagens: [
                    "https://picsum.photos/200/200?random=8",
                    "https://picsum.photos/200/200?random=108",
                    "https://picsum.photos/200/200?random=208",
                    "https://picsum.photos/200/200?random=308"
                ]
            },
            { 
                nome: "Vale-compras R$100", 
                imagens: [
                    "https://picsum.photos/200/200?random=9",
                    "https://picsum.photos/200/200?random=109"
                ]
            },
            { 
                nome: "Kit ciclismo", 
                imagens: [
                    "https://picsum.photos/200/200?random=23",
                    "https://picsum.photos/200/200?random=123",
                    "https://picsum.photos/200/200?random=223"
                ]
            },
            { 
                nome: "Capacete profissional", 
                imagens: [
                    "https://picsum.photos/200/200?random=24",
                    "https://picsum.photos/200/200?random=124"
                ]
            },
            { 
                nome: "Garrafa térmica premium", 
                imagens: [
                    "https://picsum.photos/200/200?random=28",
                    "https://picsum.photos/200/200?random=128",
                    "https://picsum.photos/200/200?random=228"
                ]
            },
            { 
                nome: "Kit ferramentas bike", 
                imagens: [
                    "https://picsum.photos/200/200?random=29",
                    "https://picsum.photos/200/200?random=129"
                ]
            }
        ],
        fazendinha: false,
    },
    "4": {
        id: "4",
        titulo: "Rifa dos Sonhos",
        descricao: "Concorra a uma viagem e ajude projetos sociais.",
        metodoPagamento: "Cartão, Pix",
        disponivel: true,
        preco: 15.00,
        totalNumbers: 300,
        premio: "Viagem",
        saleMode: "por cota",
        numerosVendidos: Array.from({length: 87}, (_, i) => i + 1), // 29% vendidos
        dataSorteio: "2025-08-01T21:00:00Z",
        canalTransmissao: "Facebook – Rifa dos Sonhos",
        contatos: [
            { nome: "Fernanda", telefone: "21933332222", avatarUrl: "/fernanda.png" },
            { nome: "Rafael", telefone: "21922221111", avatarUrl: "/rafael.png" },
        ],
        imagensPremioPrincipal: [
            "https://picsum.photos/400/400?random=10",
            "https://picsum.photos/400/400?random=110",
            "https://picsum.photos/400/400?random=210"
        ],
        premios: [
            { 
                nome: "Viagem", 
                imagens: [
                    "https://picsum.photos/200/200?random=11",
                    "https://picsum.photos/200/200?random=111",
                    "https://picsum.photos/200/200?random=211",
                    "https://picsum.photos/200/200?random=311",
                    "https://picsum.photos/200/200?random=411"
                ]
            },
            { 
                nome: "Voucher R$500", 
                imagens: [
                    "https://picsum.photos/200/200?random=12",
                    "https://picsum.photos/200/200?random=112"
                ]
            },
            { 
                nome: "Premiação especial", 
                imagens: [
                    "https://picsum.photos/200/200?random=13",
                    "https://picsum.photos/200/200?random=113",
                    "https://picsum.photos/200/200?random=213"
                ]
            },
            { 
                nome: "Hospedagem 2 noites", 
                imagens: [
                    "https://picsum.photos/200/200?random=25",
                    "https://picsum.photos/200/200?random=125"
                ]
            },
            { 
                nome: "Jantar romântico", 
                imagens: [
                    "https://picsum.photos/200/200?random=26",
                    "https://picsum.photos/200/200?random=126"
                ]
            }
        ],
        fazendinha: false,
    },
    "5": {
        id: "5",
        titulo: "Rifa Natalina",
        descricao: "Concorra a uma cesta de Natal e ajude famílias carentes.",
        metodoPagamento: "Cartão, Dinheiro",
        disponivel: true,
        preco: 2.50,
        totalNumbers: 150,
        premio: "Cesta de Natal",
        saleMode: "por cota",
        numerosVendidos: Array.from({length: 150}, (_, i) => i + 1), // 100% vendidos
        dataSorteio: "2024-12-20T19:30:00Z",
        canalTransmissao: "Facebook – Rifa Natalina",
        contatos: [
            { nome: "João", telefone: "21977776666", avatarUrl: "/joao.png" },
            { nome: "Maria", telefone: "21966665555", avatarUrl: "/maria.png" },
        ],
        imagensPremioPrincipal: [
            "https://picsum.photos/400/400?random=14",
            "https://picsum.photos/400/400?random=114",
            "https://picsum.photos/400/400?random=214",
            "https://picsum.photos/400/400?random=314"
        ],
        premios: [
            { 
                nome: "Cesta de Natal", 
                imagens: [
                    "https://picsum.photos/200/200?random=15",
                    "https://picsum.photos/200/200?random=115",
                    "https://picsum.photos/200/200?random=215"
                ]
            },
            { 
                nome: "Panetone", 
                imagens: [
                    "https://picsum.photos/200/200?random=16",
                    "https://picsum.photos/200/200?random=116"
                ]
            },
            { 
                nome: "Vale-presente", 
                imagens: [
                    "https://picsum.photos/200/200?random=17",
                    "https://picsum.photos/200/200?random=117"
                ]
            },
            { 
                nome: "Vinho especial", 
                imagens: [
                    "https://picsum.photos/200/200?random=27",
                    "https://picsum.photos/200/200?random=127",
                    "https://picsum.photos/200/200?random=227"
                ]
            }
        ],
        fazendinha: false,
    }
};

const rifasMock = rifasMockBase;

export async function getRifaById(id: string): Promise<Rifa | null> {
    const rifa = rifasMock[id];
    if (!rifa) return null;
    
    // Se a rifa não está disponível, não pode ter números vendidos
    const numerosVendidos = rifa.disponivel ? rifa.numerosVendidos : [];
    
    // Calculate progress based on sold numbers percentage
    const progressPercentage = Math.round((numerosVendidos.length / rifa.totalNumbers) * 100);
    
    return {
        ...rifa,
        numerosVendidos,
        progresso: `${progressPercentage}%`
    };
}

export async function getAllRifas(): Promise<Rifa[]> {
    const rifas = Object.values(rifasMockBase);
    return rifas.map(rifa => {
        const numerosVendidos = rifa.disponivel ? rifa.numerosVendidos : [];
        const progressPercentage = Math.round((numerosVendidos.length / rifa.totalNumbers) * 100);
        
        return {
            ...rifa,
            numerosVendidos,
            progresso: `${progressPercentage}%`
        };
    });
}