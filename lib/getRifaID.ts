import { Rifa } from "@/types";
// Make sure 'horarioSorteio' exists in the Rifa type in '@/types'

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
        horarioSorteio: "18:55",
        localSorteio: "PTN",
        canalTransmissao: "YouTube – Xerifão JB",
        quantidadeNumeros: "fazendinha",
        valorCota: 3.99,
        quantidadePremios: 2,
        celularContato: "22999679484",
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
                imagens: ["https://picsum.photos/200/200?random=2"],
                descricao: "Transferência via Pix do valor de R$ 250,00"
            },
            { 
                nome: "Brinde surpresa", 
                imagens: ["https://picsum.photos/200/200?random=3"],
                descricao: "Brinde especial da casa"
            }
        ],
        fazendinha: true,
        tempoReserva: 24,
        status: "ativo",
        vendedorId: "vendor1",
        vendedorNome: "Sophie & Xerifão",
        categoria: "Solidária",
        tags: ["solidária", "ajuda", "comunidade"],
        numerosReservados: [74, 75, 76],
        valorTotal: 399,
        dataInicio: "2025-04-01T00:00:00Z",
        dataFim: "2025-05-03T18:55:00Z",
        regulamento: "Regulamento completo disponível no site",
        tipoSorteio: "online",
        transmissaoAoVivo: true,
        urlTransmissao: "https://youtube.com/live/123",
        whatsappGrupo: "https://chat.whatsapp.com/123",
        emailContato: "contato@rifasolidaria.com",
        pixChave: "22999679484",
        dadosBancarios: {
            banco: "Nubank",
            agencia: "0001",
            conta: "123456-7",
            titular: "Sophie Silva"
        },
        configPagamento: {
            pix: true,
            cartao: true,
            dinheiro: false,
            boleto: false
        },
        limitePorPessoa: 10,
        permitirReserva: true,
        exibirNumerosVendidos: true,
        exibirCompradores: false,
        notificacoes: {
            email: true,
            whatsapp: true,
            sms: false
        },
        configuracaoAvancada: {
            permitirMultiplasCompras: true,
            desconto: {
                ativo: true,
                quantidade: 5,
                percentual: 10
            },
            bonificacao: {
                ativo: false,
                compre: 0,
                ganhe: 0
            }
        },
        historico: [
            {
                data: "2025-04-01T00:00:00Z",
                acao: "Rifa criada",
                usuario: "Sophie",
                detalhes: "Rifa solidária iniciada"
            }
        ],
        estatisticas: {
            visualizacoes: 1250,
            compartilhamentos: 45,
            tentativasCompra: 89
        },
        seo: {
            metaTitle: "Rifa Solidária - Ajude e Concorra",
            metaDescription: "Participe da rifa solidária e ajude uma causa importante",
            slug: "rifa-solidaria-1"
        }
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
        horarioSorteio: "19:00",
        localSorteio: "FEDERAL",
        canalTransmissao: "YouTube – Esperança",
        quantidadeNumeros: "150",
        valorCota: 8.00,
        quantidadePremios: 1,
        celularContato: "21955554444",
        contatos: [
            { nome: "Lucas", telefone: "21955554444" },
        ],
        imagensPremioPrincipal: [
            "https://picsum.photos/400/400?random=4",
        ],
        premios: [
            { 
                nome: "Smartphone", 
                imagens: ["https://picsum.photos/200/200?random=5"],
                descricao: "Smartphone último modelo"
            }
        ],
        fazendinha: true,
        tempoReserva: 12,
        status: "pausado",
        vendedorId: "vendor2",
        vendedorNome: "Lucas",
        categoria: "Eletrônicos",
        tags: ["smartphone", "tecnologia", "esperança"],
        numerosReservados: [],
        valorTotal: 1200,
        dataInicio: "2025-06-01T00:00:00Z",
        dataFim: "2025-07-15T19:00:00Z",
        regulamento: "Conforme regulamento geral",
        tipoSorteio: "online",
        transmissaoAoVivo: true,
        urlTransmissao: "https://youtube.com/live/456",
        whatsappGrupo: "https://chat.whatsapp.com/456",
        emailContato: "lucas@rifaesperanca.com",
        pixChave: "21955554444",
        dadosBancarios: {
            banco: "Caixa",
            agencia: "1234",
            conta: "567890-1",
            titular: "Lucas Santos"
        },
        configPagamento: {
            pix: true,
            cartao: false,
            dinheiro: true,
            boleto: false
        },
        limitePorPessoa: 5,
        permitirReserva: false,
        exibirNumerosVendidos: true,
        exibirCompradores: true,
        notificacoes: {
            email: false,
            whatsapp: true,
            sms: false
        },
        configuracaoAvancada: {
            permitirMultiplasCompras: false,
            desconto: {
                ativo: false,
                quantidade: 0,
                percentual: 0
            },
            bonificacao: {
                ativo: false,
                compre: 0,
                ganhe: 0
            }
        },
        historico: [
            {
                data: "2025-06-01T00:00:00Z",
                acao: "Rifa criada",
                usuario: "Lucas",
                detalhes: "Rifa da esperança criada"
            }
        ],
        estatisticas: {
            visualizacoes: 234,
            compartilhamentos: 12,
            tentativasCompra: 8
        },
        seo: {
            metaTitle: "Rifa Esperança - Smartphone",
            metaDescription: "Concorra a um smartphone e ajude a comunidade",
            slug: "rifa-esperanca-smartphone"
        }
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
        numerosVendidos: Array.from({length: 118}, (_, i) => i + 1),
        dataSorteio: "2025-06-10T20:00:00Z",
        horarioSorteio: "20:00",
        localSorteio: "CANTA GALO",
        canalTransmissao: "Instagram – @amigosanimais",
        quantidadeNumeros: "200",
        valorCota: 5.00,
        quantidadePremios: 6,
        celularContato: "21999998888",
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
                ],
                descricao: "Bicicleta mountain bike aro 29 profissional"
            },
            { 
                nome: "Vale-compras R$100", 
                imagens: [
                    "https://picsum.photos/200/200?random=9",
                    "https://picsum.photos/200/200?random=109"
                ],
                descricao: "Vale-compras para loja de esportes"
            },
            { 
                nome: "Kit ciclismo", 
                imagens: [
                    "https://picsum.photos/200/200?random=23",
                    "https://picsum.photos/200/200?random=123",
                    "https://picsum.photos/200/200?random=223"
                ],
                descricao: "Kit completo para ciclismo"
            },
            { 
                nome: "Capacete profissional", 
                imagens: [
                    "https://picsum.photos/200/200?random=24",
                    "https://picsum.photos/200/200?random=124"
                ],
                descricao: "Capacete profissional para ciclismo"
            },
            { 
                nome: "Garrafa térmica premium", 
                imagens: [
                    "https://picsum.photos/200/200?random=28",
                    "https://picsum.photos/200/200?random=128",
                    "https://picsum.photos/200/200?random=228"
                ],
                descricao: "Garrafa térmica de alta qualidade"
            },
            { 
                nome: "Kit ferramentas bike", 
                imagens: [
                    "https://picsum.photos/200/200?random=29",
                    "https://picsum.photos/200/200?random=129"
                ],
                descricao: "Kit de ferramentas para manutenção"
            }
        ],
        fazendinha: false,
        tempoReserva: 48,
        status: "ativo",
        vendedorId: "vendor3",
        vendedorNome: "ONG Amigos dos Animais",
        categoria: "Esportes",
        tags: ["bicicleta", "esportes", "ong", "animais"],
        numerosReservados: [119, 120],
        valorTotal: 1000,
        dataInicio: "2025-05-01T00:00:00Z",
        dataFim: "2025-06-10T20:00:00Z",
        regulamento: "Regulamento da ONG disponível no site",
        tipoSorteio: "online",
        transmissaoAoVivo: true,
        urlTransmissao: "https://instagram.com/live/789",
        whatsappGrupo: "https://chat.whatsapp.com/789",
        emailContato: "contato@amigosanimais.org",
        pixChave: "amigosanimais@pix.com",
        dadosBancarios: {
            banco: "Bradesco",
            agencia: "5678",
            conta: "987654-3",
            titular: "ONG Amigos dos Animais"
        },
        configPagamento: {
            pix: true,
            cartao: false,
            dinheiro: false,
            boleto: true
        },
        limitePorPessoa: 20,
        permitirReserva: true,
        exibirNumerosVendidos: true,
        exibirCompradores: true,
        notificacoes: {
            email: true,
            whatsapp: true,
            sms: true
        },
        configuracaoAvancada: {
            permitirMultiplasCompras: true,
            desconto: {
                ativo: true,
                quantidade: 10,
                percentual: 15
            },
            bonificacao: {
                ativo: true,
                compre: 10,
                ganhe: 1
            }
        },
        historico: [
            {
                data: "2025-05-01T00:00:00Z",
                acao: "Rifa criada",
                usuario: "Carlos",
                detalhes: "Rifa para ajuda aos animais"
            }
        ],
        estatisticas: {
            visualizacoes: 3450,
            compartilhamentos: 189,
            tentativasCompra: 234
        },
        seo: {
            metaTitle: "Rifa do Bem - Bicicleta Aro 29",
            metaDescription: "Ajude os animais e concorra a uma bicicleta aro 29",
            slug: "rifa-do-bem-bicicleta"
        }
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
        numerosVendidos: Array.from({length: 87}, (_, i) => i + 1),
        dataSorteio: "2025-08-01T21:00:00Z",
        horarioSorteio: "21:00",
        localSorteio: "instagram",
        canalTransmissao: "Facebook – Rifa dos Sonhos",
        quantidadeNumeros: "300",
        valorCota: 15.00,
        quantidadePremios: 5,
        celularContato: "21933332222",
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
                ],
                descricao: "Viagem completa para destino paradisíaco"
            },
            { 
                nome: "Voucher R$500", 
                imagens: [
                    "https://picsum.photos/200/200?random=12",
                    "https://picsum.photos/200/200?random=112"
                ],
                descricao: "Voucher para agência de viagens"
            },
            { 
                nome: "Premiação especial", 
                imagens: [
                    "https://picsum.photos/200/200?random=13",
                    "https://picsum.photos/200/200?random=113",
                    "https://picsum.photos/200/200?random=213"
                ],
                descricao: "Prêmio surpresa especial"
            },
            { 
                nome: "Hospedagem 2 noites", 
                imagens: [
                    "https://picsum.photos/200/200?random=25",
                    "https://picsum.photos/200/200?random=125"
                ],
                descricao: "Hospedagem em hotel 4 estrelas"
            },
            { 
                nome: "Jantar romântico", 
                imagens: [
                    "https://picsum.photos/200/200?random=26",
                    "https://picsum.photos/200/200?random=126"
                ],
                descricao: "Jantar romântico para duas pessoas"
            }
        ],
        fazendinha: false,
        tempoReserva: 72,
        status: "ativo",
        vendedorId: "vendor4",
        vendedorNome: "Fernanda & Rafael",
        categoria: "Viagem",
        tags: ["viagem", "sonhos", "férias", "turismo"],
        numerosReservados: [88, 89, 90],
        valorTotal: 4500,
        dataInicio: "2025-06-15T00:00:00Z",
        dataFim: "2025-08-01T21:00:00Z",
        regulamento: "Regulamento detalhado sobre a viagem",
        tipoSorteio: "online",
        transmissaoAoVivo: true,
        urlTransmissao: "https://facebook.com/live/101112",
        whatsappGrupo: "https://chat.whatsapp.com/101112",
        emailContato: "contato@rifasonhos.com",
        pixChave: "21933332222",
        dadosBancarios: {
            banco: "Santander",
            agencia: "9012",
            conta: "345678-9",
            titular: "Fernanda Costa"
        },
        configPagamento: {
            pix: true,
            cartao: true,
            dinheiro: false,
            boleto: false
        },
        limitePorPessoa: 30,
        permitirReserva: true,
        exibirNumerosVendidos: false,
        exibirCompradores: false,
        notificacoes: {
            email: true,
            whatsapp: true,
            sms: false
        },
        configuracaoAvancada: {
            permitirMultiplasCompras: true,
            desconto: {
                ativo: true,
                quantidade: 20,
                percentual: 20
            },
            bonificacao: {
                ativo: false,
                compre: 0,
                ganhe: 0
            }
        },
        historico: [
            {
                data: "2025-06-15T00:00:00Z",
                acao: "Rifa criada",
                usuario: "Fernanda",
                detalhes: "Rifa dos sonhos para viagem"
            }
        ],
        estatisticas: {
            visualizacoes: 5670,
            compartilhamentos: 234,
            tentativasCompra: 345
        },
        seo: {
            metaTitle: "Rifa dos Sonhos - Viagem dos Sonhos",
            metaDescription: "Realize o sonho da viagem perfeita",
            slug: "rifa-dos-sonhos-viagem"
        }
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
        numerosVendidos: Array.from({length: 150}, (_, i) => i + 1),
        dataSorteio: "2024-12-20T19:30:00Z",
        horarioSorteio: "19:30",
        localSorteio: "CORUJINHA",
        canalTransmissao: "Facebook – Rifa Natalina",
        quantidadeNumeros: "150",
        valorCota: 2.50,
        quantidadePremios: 4,
        celularContato: "21977776666",
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
                ],
                descricao: "Cesta natalina completa com todos os itens tradicionais"
            },
            { 
                nome: "Panetone", 
                imagens: [
                    "https://picsum.photos/200/200?random=16",
                    "https://picsum.photos/200/200?random=116"
                ],
                descricao: "Panetone artesanal gourmet"
            },
            { 
                nome: "Vale-presente", 
                imagens: [
                    "https://picsum.photos/200/200?random=17",
                    "https://picsum.photos/200/200?random=117"
                ],
                descricao: "Vale-presente para supermercado"
            },
            { 
                nome: "Vinho especial", 
                imagens: [
                    "https://picsum.photos/200/200?random=27",
                    "https://picsum.photos/200/200?random=127",
                    "https://picsum.photos/200/200?random=227"
                ],
                descricao: "Vinho especial para as festividades"
            }
        ],
        fazendinha: false,
        tempoReserva: 6,
        status: "finalizado",
        vendedorId: "vendor5",
        vendedorNome: "João & Maria",
        categoria: "Natal",
        tags: ["natal", "cesta", "família", "caridade"],
        numerosReservados: [],
        valorTotal: 375,
        dataInicio: "2024-11-01T00:00:00Z",
        dataFim: "2024-12-20T19:30:00Z",
        regulamento: "Regulamento específico para época natalina",
        tipoSorteio: "online",
        transmissaoAoVivo: true,
        urlTransmissao: "https://facebook.com/live/131415",
        whatsappGrupo: "https://chat.whatsapp.com/131415",
        emailContato: "contato@rifanatalina.com",
        pixChave: "21977776666",
        dadosBancarios: {
            banco: "Itaú",
            agencia: "3456",
            conta: "123456-0",
            titular: "João Silva"
        },
        configPagamento: {
            pix: false,
            cartao: true,
            dinheiro: true,
            boleto: false
        },
        limitePorPessoa: 15,
        permitirReserva: false,
        exibirNumerosVendidos: true,
        exibirCompradores: true,
        notificacoes: {
            email: true,
            whatsapp: true,
            sms: true
        },
        configuracaoAvancada: {
            permitirMultiplasCompras: true,
            desconto: {
                ativo: false,
                quantidade: 0,
                percentual: 0
            },
            bonificacao: {
                ativo: true,
                compre: 5,
                ganhe: 1
            }
        },
        historico: [
            {
                data: "2024-11-01T00:00:00Z",
                acao: "Rifa criada",
                usuario: "João",
                detalhes: "Rifa natalina para ajuda às famílias"
            },
            {
                data: "2024-12-20T19:30:00Z",
                acao: "Sorteio realizado",
                usuario: "Sistema",
                detalhes: "Sorteio concluído com sucesso"
            }
        ],
        estatisticas: {
            visualizacoes: 2890,
            compartilhamentos: 156,
            tentativasCompra: 187
        },
        seo: {
            metaTitle: "Rifa Natalina - Cesta de Natal",
            metaDescription: "Concorra a uma cesta natalina e ajude famílias carentes",
            slug: "rifa-natalina-cesta"
        }
    },
    "6": {
        id: "6",
        titulo: "Rifa Tecnológica Premium",
        descricao: "Concorra a um setup gamer completo e ajude jovens carentes a ter acesso à tecnologia. Inclui PC Gamer, monitor 4K, teclado mecânico, mouse gamer e headset profissional.",
        metodoPagamento: "Pix, Cartão, Boleto, Dinheiro",
        disponivel: true,
        preco: 25.00,
        totalNumbers: 500,
        premio: "Setup Gamer Completo",
        saleMode: "por número",
        numerosVendidos: Array.from({length: 287}, (_, i) => i + 1),
        dataSorteio: "2025-09-15T20:30:00Z",
        horarioSorteio: "20:30",
        localSorteio: "MEGA SENA",
        canalTransmissao: "Twitch – TechRifas",
        quantidadeNumeros: "500",
        valorCota: 25.00,
        quantidadePremios: 8,
        celularContato: "11987654321",
        contatos: [
            { nome: "Pedro Tech", telefone: "11987654321", avatarUrl: "/pedro.png" },
            { nome: "Ana Gamer", telefone: "11976543210", avatarUrl: "/ana-gamer.png" },
            { nome: "Suporte Tech", telefone: "11965432109", avatarUrl: "/suporte.png" },
        ],
        imagensPremioPrincipal: [
            "https://picsum.photos/400/400?random=500",
            "https://picsum.photos/400/400?random=501",
            "https://picsum.photos/400/400?random=502",
            "https://picsum.photos/400/400?random=503",
            "https://picsum.photos/400/400?random=504",
            "https://picsum.photos/400/400?random=505"
        ],
        premios: [
            { 
                nome: "PC Gamer Completo", 
                imagens: [
                    "https://picsum.photos/200/200?random=600",
                    "https://picsum.photos/200/200?random=601",
                    "https://picsum.photos/200/200?random=602",
                    "https://picsum.photos/200/200?random=603",
                    "https://picsum.photos/200/200?random=604"
                ],
                descricao: "PC Gamer com RTX 4080, i7-13700K, 32GB RAM, SSD 2TB NVMe, fonte 850W modular"
            },
            { 
                nome: "Monitor 4K 32 polegadas", 
                imagens: [
                    "https://picsum.photos/200/200?random=605",
                    "https://picsum.photos/200/200?random=606",
                    "https://picsum.photos/200/200?random=607"
                ],
                descricao: "Monitor gamer 4K 144Hz com HDR e tecnologia G-Sync"
            },
            { 
                nome: "Teclado Mecânico RGB", 
                imagens: [
                    "https://picsum.photos/200/200?random=608",
                    "https://picsum.photos/200/200?random=609"
                ],
                descricao: "Teclado mecânico premium com switches Cherry MX e RGB customizável"
            },
            { 
                nome: "Mouse Gamer Pro", 
                imagens: [
                    "https://picsum.photos/200/200?random=610",
                    "https://picsum.photos/200/200?random=611"
                ],
                descricao: "Mouse gamer profissional com sensor óptico de alta precisão"
            },
            { 
                nome: "Headset 7.1 Surround", 
                imagens: [
                    "https://picsum.photos/200/200?random=612",
                    "https://picsum.photos/200/200?random=613"
                ],
                descricao: "Headset gamer com som surround 7.1 e microfone noise cancelling"
            },
            { 
                nome: "Cadeira Gamer Premium", 
                imagens: [
                    "https://picsum.photos/200/200?random=614",
                    "https://picsum.photos/200/200?random=615"
                ],
                descricao: "Cadeira gamer ergonômica com ajustes profissionais"
            },
            { 
                nome: "Webcam 4K", 
                imagens: [
                    "https://picsum.photos/200/200?random=616",
                    "https://picsum.photos/200/200?random=617"
                ],
                descricao: "Webcam 4K para streaming profissional"
            },
            { 
                nome: "Kit RGB Iluminação", 
                imagens: [
                    "https://picsum.photos/200/200?random=618",
                    "https://picsum.photos/200/200?random=619"
                ],
                descricao: "Kit completo de iluminação RGB para setup"
            }
        ],
        fazendinha: false,
        tempoReserva: 120,
        status: "ativo",
        vendedorId: "vendor6",
        vendedorNome: "Tech4All Foundation",
        categoria: "Tecnologia",
        tags: ["tecnologia", "gamer", "pc", "setup", "inclusão digital", "jovens"],
        numerosReservados: [288, 289, 290, 291, 292],
        valorTotal: 12500,
        dataInicio: "2025-07-01T00:00:00Z",
        dataFim: "2025-09-15T20:30:00Z",
        regulamento: "Regulamento completo disponível em nosso site. Rifa licenciada e registrada. Todos os prêmios com garantia de 2 anos.",
        tipoSorteio: "online",
        transmissaoAoVivo: true,
        urlTransmissao: "https://twitch.tv/techrifas",
        whatsappGrupo: "https://chat.whatsapp.com/techrifas2025",
        emailContato: "contato@tech4all.org",
        pixChave: "tech4all@pix.com.br",
        dadosBancarios: {
            banco: "Banco Inter",
            agencia: "0001",
            conta: "98765432-1",
            titular: "Tech4All Foundation LTDA"
        },
        configPagamento: {
            pix: true,
            cartao: true,
            dinheiro: true,
            boleto: true
        },
        limitePorPessoa: 50,
        permitirReserva: true,
        exibirNumerosVendidos: true,
        exibirCompradores: true,
        notificacoes: {
            email: true,
            whatsapp: true,
            sms: true
        },
        configuracaoAvancada: {
            permitirMultiplasCompras: true,
            desconto: {
                ativo: true,
                quantidade: 25,
                percentual: 25
            },
            bonificacao: {
                ativo: true,
                compre: 20,
                ganhe: 3
            }
        },
        historico: [
            {
                data: "2025-07-01T00:00:00Z",
                acao: "Rifa criada",
                usuario: "Pedro Tech",
                detalhes: "Rifa tecnológica para inclusão digital criada"
            },
            {
                data: "2025-07-15T10:30:00Z",
                acao: "Meta 50% atingida",
                usuario: "Sistema",
                detalhes: "250 números vendidos - meta intermediária alcançada"
            }
        ],
        estatisticas: {
            visualizacoes: 15840,
            compartilhamentos: 892,
            tentativasCompra: 1247
        },
        seo: {
            metaTitle: "Rifa Tecnológica Premium - Setup Gamer Completo",
            metaDescription: "Concorra a um setup gamer completo e ajude na inclusão digital de jovens carentes",
            slug: "rifa-tecnologica-setup-gamer"
        }
    },
    "7": {
        id: "7",
        titulo: "Rifa Casa dos Sonhos",
        descricao: "A maior rifa do ano! Concorra a uma casa mobiliada no valor de R$ 850.000 e ajude na construção de um orfanato. Casa com 3 quartos, 2 banheiros, garagem para 2 carros, quintal amplo e toda mobiliada com eletrodomésticos de primeira linha.",
        metodoPagamento: "Pix, Cartão, Boleto, Transferência",
        disponivel: true,
        preco: 100.00,
        totalNumbers: 10000,
        premio: "Casa Mobiliada R$ 850.000",
        saleMode: "por cota",
        numerosVendidos: Array.from({length: 1247}, (_, i) => i + 1),
        dataSorteio: "2025-12-31T22:00:00Z",
        horarioSorteio: "22:00",
        localSorteio: "LOTERIA FEDERAL",
        canalTransmissao: "Globo, YouTube, Instagram Live",
        quantidadeNumeros: "10.000",
        valorCota: 100.00,
        quantidadePremios: 15,
        celularContato: "21987654321",
        contatos: [
            { nome: "Roberto Construtor", telefone: "21987654321", avatarUrl: "/roberto.png" },
            { nome: "Mariana Arquiteta", telefone: "21976543210", avatarUrl: "/mariana.png" },
            { nome: "Carlos Vendas", telefone: "21965432109", avatarUrl: "/carlos-vendas.png" },
            { nome: "Suporte Premium", telefone: "21954321098", avatarUrl: "/suporte-premium.png" },
        ],
        imagensPremioPrincipal: [
            "https://picsum.photos/400/400?random=700",
            "https://picsum.photos/400/400?random=701",
            "https://picsum.photos/400/400?random=702",
            "https://picsum.photos/400/400?random=703",
            "https://picsum.photos/400/400?random=704",
            "https://picsum.photos/400/400?random=705",
            "https://picsum.photos/400/400?random=706",
            "https://picsum.photos/400/400?random=707",
            "https://picsum.photos/400/400?random=708",
            "https://picsum.photos/400/400?random=709"
        ],
        premios: [
            { 
                nome: "Casa Mobiliada Completa", 
                imagens: [
                    "https://picsum.photos/200/200?random=800",
                    "https://picsum.photos/200/200?random=801",
                    "https://picsum.photos/200/200?random=802",
                    "https://picsum.photos/200/200?random=803",
                    "https://picsum.photos/200/200?random=804",
                    "https://picsum.photos/200/200?random=805",
                    "https://picsum.photos/200/200?random=806",
                    "https://picsum.photos/200/200?random=807",
                    "https://picsum.photos/200/200?random=808",
                    "https://picsum.photos/200/200?random=809"
                ],
                descricao: "Casa de 120m² com 3 quartos, 2 banheiros, sala, cozinha, área de serviço, garagem para 2 carros, quintal de 200m², totalmente mobiliada e decorada"
            },
            { 
                nome: "Carro 0KM", 
                imagens: [
                    "https://picsum.photos/200/200?random=810",
                    "https://picsum.photos/200/200?random=811",
                    "https://picsum.photos/200/200?random=812"
                ],
                descricao: "Veículo 0KM popular, emplacado e com seguro por 1 ano"
            },
            { 
                nome: "Moto 0KM", 
                imagens: [
                    "https://picsum.photos/200/200?random=813",
                    "https://picsum.photos/200/200?random=814"
                ],
                descricao: "Motocicleta 150cc 0KM com documentação completa"
            },
            { 
                nome: "Pix R$ 50.000", 
                imagens: [
                    "https://picsum.photos/200/200?random=815"
                ],
                descricao: "Transferência via Pix do valor de R$ 50.000,00"
            },
            { 
                nome: "Pix R$ 25.000", 
                imagens: [
                    "https://picsum.photos/200/200?random=816"
                ],
                descricao: "Transferência via Pix do valor de R$ 25.000,00"
            },
            { 
                nome: "Pix R$ 15.000", 
                imagens: [
                    "https://picsum.photos/200/200?random=817"
                ],
                descricao: "Transferência via Pix do valor de R$ 15.000,00"
            },
            { 
                nome: "Pix R$ 10.000", 
                imagens: [
                    "https://picsum.photos/200/200?random=818"
                ],
                descricao: "Transferência via Pix do valor de R$ 10.000,00"
            },
            { 
                nome: "Smart TV 75 polegadas", 
                imagens: [
                    "https://picsum.photos/200/200?random=819",
                    "https://picsum.photos/200/200?random=820"
                ],
                descricao: "Smart TV 75\" 4K com HDR e sistema Android"
            },
            { 
                nome: "Geladeira Duplex Inox", 
                imagens: [
                    "https://picsum.photos/200/200?random=821",
                    "https://picsum.photos/200/200?random=822"
                ],
                descricao: "Geladeira duplex inox 540L com dispenser"
            },
            { 
                nome: "Fogão 6 Bocas Inox", 
                imagens: [
                    "https://picsum.photos/200/200?random=823"
                ],
                descricao: "Fogão 6 bocas inox com forno duplo"
            },
            { 
                nome: "Micro-ondas Premium", 
                imagens: [
                    "https://picsum.photos/200/200?random=824"
                ],
                descricao: "Micro-ondas 45L com grill e painel digital"
            },
            { 
                nome: "Máquina de Lavar 15kg", 
                imagens: [
                    "https://picsum.photos/200/200?random=825"
                ],
                descricao: "Máquina de lavar roupas 15kg com tecnologia inverter"
            },
            { 
                nome: "Ar Condicionado Split", 
                imagens: [
                    "https://picsum.photos/200/200?random=826"
                ],
                descricao: "Ar condicionado split 18.000 BTUs inverter"
            },
            { 
                nome: "Smartphone Premium", 
                imagens: [
                    "https://picsum.photos/200/200?random=827",
                    "https://picsum.photos/200/200?random=828"
                ],
                descricao: "Smartphone top de linha 256GB com câmera profissional"
            },
            { 
                nome: "Notebook Gamer", 
                imagens: [
                    "https://picsum.photos/200/200?random=829",
                    "https://picsum.photos/200/200?random=830"
                ],
                descricao: "Notebook gamer com placa de vídeo dedicada e 16GB RAM"
            }
        ],
        fazendinha: false,
        tempoReserva: 240,
        status: "ativo",
        vendedorId: "vendor7",
        vendedorNome: "Construindo Sonhos Imobiliária",
        categoria: "Imóveis",
        tags: ["casa", "imóvel", "mobiliada", "sonhos", "orfanato", "caridade", "mega rifa"],
        numerosReservados: [1248, 1249, 1250, 1251, 1252],
        valorTotal: 1000000,
        dataInicio: "2025-09-01T00:00:00Z",
        dataFim: "2025-12-31T22:00:00Z",
        regulamento: "Regulamento registrado em cartório. Rifa autorizada pelos órgãos competentes. Casa localizada em condomínio fechado. Documentação quitada. IPTU e condomínio pagos por 1 ano. Todos os eletrodomésticos com garantia estendida.",
        tipoSorteio: "loteria-federal",
        transmissaoAoVivo: true,
        urlTransmissao: "https://youtube.com/construindosonhos",
        whatsappGrupo: "https://chat.whatsapp.com/casasonhos2025",
        emailContato: "contato@construindosonhos.com.br",
        pixChave: "construindosonhos@pix.com.br",
        dadosBancarios: {
            banco: "Banco do Brasil",
            agencia: "1234-5",
            conta: "87654321-0",
            titular: "Construindo Sonhos Imobiliária LTDA"
        },
        configPagamento: {
            pix: true,
            cartao: true,
            dinheiro: false,
            boleto: true
        },
        limitePorPessoa: 100,
        permitirReserva: true,
        exibirNumerosVendidos: false,
        exibirCompradores: false,
        notificacoes: {
            email: true,
            whatsapp: true,
            sms: true
        },
        configuracaoAvancada: {
            permitirMultiplasCompras: true,
            desconto: {
                ativo: true,
                quantidade: 50,
                percentual: 30
            },
            bonificacao: {
                ativo: true,
                compre: 100,
                ganhe: 10
            }
        },
        historico: [
            {
                data: "2025-09-01T00:00:00Z",
                acao: "Rifa criada",
                usuario: "Roberto Construtor",
                detalhes: "Mega rifa da casa dos sonhos criada"
            },
            {
                data: "2025-09-15T14:20:00Z",
                acao: "Rifa pausada",
                usuario: "Roberto Construtor",
                detalhes: "Rifa pausada para ajustes na documentação"
            }
        ],
        estatisticas: {
            visualizacoes: 89750,
            compartilhamentos: 4567,
            tentativasCompra: 12849
        },
        seo: {
            metaTitle: "Mega Rifa Casa dos Sonhos - Casa R$ 850.000 Mobiliada",
            metaDescription: "A maior rifa do ano! Concorra a uma casa mobiliada no valor de R$ 850.000 e ajude na construção de um orfanato",
            slug: "mega-rifa-casa-dos-sonhos"
        }
    }
};

const rifasMock = rifasMockBase;

export async function getRifaById(id: string): Promise<Rifa | null> {
    const rifa = rifasMock[id];
    if (!rifa) return null;
    
    // Se a rifa não está disponível, não pode ter números vendidos
    const numerosVendidos = rifa.disponivel ? rifa.numerosVendidos : [];
    
    // Calculate progress and percentage based on sold numbers
    const progressPercentage = Math.round((numerosVendidos.length / rifa.totalNumbers) * 100);
    
    return {
        ...rifa,
        numerosVendidos,
        progresso: `${progressPercentage}%`,
        percentualVendido: progressPercentage
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
            progresso: `${progressPercentage}%`,
            percentualVendido: progressPercentage
        };
    });
}