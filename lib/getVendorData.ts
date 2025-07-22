import { Vendedor, VendedorPublico } from "@/types";

export const vendedoresMock: Record<string, Vendedor> = {
    "vendor1": {
        id: "vendor1",
        secretId: "sec_vendor1_2025",
        nome: "Sophie",
        sobrenome: "Silva",
        nomeCompleto: "Sophie Silva",
        email: "sophie@rifasolidaria.com",
        cpf: "123.456.789-01",
        celular: "22999679484",
        cidade: "Campos dos Goytacazes",
        cep: "28010-000",
        dataCadastro: "2024-01-15T10:30:00Z",
        dataUltimoLogin: "2025-01-10T14:20:00Z",
        status: "ativo",
        emailVerificado: true,
        celularVerificado: true,
        configuracoes: {
            notificacoes: {
                email: true,
                whatsapp: true,
                sms: false
            },
            privacidade: {
                exibirNome: true,
                exibirContato: true
            },
            pagamentos: {
                pixChave: "22999679484",
                dadosBancarios: {
                    banco: "Nubank",
                    agencia: "0001",
                    conta: "123456-7",
                    titular: "Sophie Silva"
                }
            }
        },
        estatisticas: {
            totalRifas: 4,
            rifasAtivas: 3,
            totalArrecadado: 15750.50,
            totalVendas: 1247,
            mediaAvaliacoes: 4.8,
            numeroAvaliacoes: 156
        },
        plano: {
            tipo: "premium",
            dataInicio: "2024-01-15T00:00:00Z",
            dataVencimento: "2025-01-15T00:00:00Z",
            limitesUtilizados: {
                rifasAtivas: 3,
                limiteRifas: 20,
                limiteFaturamento: 50000
            }
        },
        endereco: {
            logradouro: "Rua das Flores",
            numero: "123",
            bairro: "Centro",
            cidade: "Campos dos Goytacazes",
            estado: "RJ",
            cep: "28010-000",
            pais: "Brasil"
        },
        redesSociais: {
            instagram: "@sophie_rifas",
            facebook: "Sophie Rifas Solidárias",
            whatsapp: "22999679484",
            youtube: "@sophierifas"
        },
        verificacao: {
            documentoEnviado: true,
            documentoAprovado: true,
            dataVerificacao: "2024-01-20T16:45:00Z",
            observacoes: "Documentos aprovados - vendedor verificado"
        },
        historico: [
            {
                data: "2024-01-15T10:30:00Z",
                acao: "Cadastro realizado",
                detalhes: "Conta criada com sucesso"
            },
            {
                data: "2024-01-20T16:45:00Z",
                acao: "Documentos verificados",
                detalhes: "Verificação de identidade aprovada"
            },
            {
                data: "2024-02-01T09:15:00Z",
                acao: "Primeira rifa criada",
                detalhes: "Rifa Solidária criada"
            }
        ],
        criadoPor: "sistema",
        dataAtualizacao: "2025-01-10T14:20:00Z",
        versao: 3
    },
    "vendor2": {
        id: "vendor2",
        secretId: "sec_vendor2_2025",
        nome: "Lucas",
        sobrenome: "Santos",
        nomeCompleto: "Lucas Santos",
        email: "lucas@rifaesperanca.com",
        cpf: "987.654.321-09",
        celular: "21955554444",
        cidade: "Rio de Janeiro",
        cep: "22071-900",
        dataCadastro: "2024-03-10T15:45:00Z",
        dataUltimoLogin: "2025-01-09T11:30:00Z",
        status: "ativo",
        emailVerificado: true,
        celularVerificado: true,
        configuracoes: {
            notificacoes: {
                email: true,
                whatsapp: true,
                sms: true
            },
            privacidade: {
                exibirNome: true,
                exibirContato: false
            },
            pagamentos: {
                pixChave: "lucas@pix.com",
                dadosBancarios: {
                    banco: "Caixa Econômica Federal",
                    agencia: "1234",
                    conta: "567890-1",
                    titular: "Lucas Santos"
                }
            }
        },
        estatisticas: {
            totalRifas: 2,
            rifasAtivas: 1,
            totalArrecadado: 5700.00,
            totalVendas: 387,
            mediaAvaliacoes: 4.6,
            numeroAvaliacoes: 43
        },
        plano: {
            tipo: "basico",
            dataInicio: "2024-03-10T00:00:00Z",
            dataVencimento: "2025-03-10T00:00:00Z",
            limitesUtilizados: {
                rifasAtivas: 1,
                limiteRifas: 5,
                limiteFaturamento: 10000
            }
        },
        endereco: {
            logradouro: "Avenida Copacabana",
            numero: "456",
            complemento: "Apt 301",
            bairro: "Copacabana",
            cidade: "Rio de Janeiro",
            estado: "RJ",
            cep: "22071-900",
            pais: "Brasil"
        },
        redesSociais: {
            instagram: "@lucas_esperanca",
            whatsapp: "21955554444",
            tiktok: "@lucasrifas"
        },
        verificacao: {
            documentoEnviado: true,
            documentoAprovado: true,
            dataVerificacao: "2024-03-15T14:20:00Z",
            observacoes: "Verificação concluída com sucesso"
        },
        historico: [
            {
                data: "2024-03-10T15:45:00Z",
                acao: "Cadastro realizado",
                detalhes: "Conta criada via indicação"
            },
            {
                data: "2024-03-15T14:20:00Z",
                acao: "Documentos verificados",
                detalhes: "Documentação aprovada"
            },
            {
                data: "2024-04-01T10:00:00Z",
                acao: "Primeira rifa criada",
                detalhes: "Rifa Esperança criada"
            }
        ],
        criadoPor: "sistema",
        dataAtualizacao: "2025-01-09T11:30:00Z",
        versao: 2
    }
};

export async function getVendedorById(id: string): Promise<Vendedor | null> {
    return vendedoresMock[id] || null;
}

export async function getVendedorPublicoById(id: string): Promise<VendedorPublico | null> {
    const vendedor = vendedoresMock[id];
    if (!vendedor) return null;

    return {
        id: vendedor.id,
        nome: vendedor.nome,
        sobrenome: vendedor.sobrenome,
        nomeCompleto: vendedor.nomeCompleto,
        cidade: vendedor.cidade,
        celular: vendedor.configuracoes?.privacidade?.exibirContato ? vendedor.celular : undefined,
        email: vendedor.configuracoes?.privacidade?.exibirContato ? vendedor.email : undefined,
        dataCadastro: vendedor.dataCadastro,
        estatisticas: {
            totalRifas: vendedor.estatisticas?.totalRifas,
            mediaAvaliacoes: vendedor.estatisticas?.mediaAvaliacoes,
            numeroAvaliacoes: vendedor.estatisticas?.numeroAvaliacoes
        },
        redesSociais: vendedor.redesSociais,
        verificacao: {
            documentoAprovado: vendedor.verificacao?.documentoAprovado
        }
    };
}

export async function getAllVendedores(): Promise<VendedorPublico[]> {
    const vendedores = Object.values(vendedoresMock);
    return Promise.all(
        vendedores.map(async (vendedor) => {
            const vendedorPublico = await getVendedorPublicoById(vendedor.id);
            return vendedorPublico!;
        })
    );
}

export function getVendedorName(vendorId: string): string {
    const vendedor = vendedoresMock[vendorId];
    return vendedor?.nomeCompleto || 'Vendedor';
}
