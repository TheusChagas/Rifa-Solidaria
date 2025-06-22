import { Afiliado } from "@/types";

export const afiliadosMockBase: Afiliado[] = [
    // Afiliados com nomes específicos
    {
        position: 1,
        sellerName: "João Silva",
        amountCollected: "R$ 2.500,00",
        ticketsSold: 45,
        campaign: "campanha-1"
    },
    {
        position: 2,
        sellerName: "Maria Souza",
        amountCollected: "R$ 2.300,00",
        ticketsSold: 42,
        campaign: "campanha-2"
    },
    {
        position: 3,
        sellerName: "Carlos Lima",
        amountCollected: "R$ 2.100,00",
        ticketsSold: 38,
        campaign: "campanha-3"
    },
    {
        position: 4,
        sellerName: "Ana Costa",
        amountCollected: "R$ 1.950,00",
        ticketsSold: 35,
        campaign: "campanha-1"
    },
    {
        position: 5,
        sellerName: "Pedro Santos",
        amountCollected: "R$ 1.800,00",
        ticketsSold: 32,
        campaign: "campanha-2"
    },
    // Afiliados genéricos
    ...Array.from({ length: 5 }, (_, i) => ({
        position: i + 6,
        sellerName: `Afiliado ${i + 6}`,
        amountCollected: `R$ ${(1750 - i * 100).toLocaleString("pt-BR")},00`,
        ticketsSold: 30 - i * 2,
        campaign: i % 3 === 0 ? "campanha-1" : i % 3 === 1 ? "campanha-2" : "campanha-3",
    }))
];

export async function getAllAfiliados(): Promise<Afiliado[]> {
    // Simula uma chamada assíncrona para buscar dados
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(afiliadosMockBase);
        }, 100);
    });
}

export async function getAfiliadosByCampaign(campaign: string): Promise<Afiliado[]> {
    const allAfiliados = await getAllAfiliados();
    
    if (campaign === "all") {
        return allAfiliados;
    }
    
    return allAfiliados.filter(afiliado => afiliado.campaign === campaign);
}

export async function getTopAfiliados(limit: number = 5): Promise<Afiliado[]> {
    const allAfiliados = await getAllAfiliados();
    return allAfiliados.slice(0, limit);
}

export async function getAfiliadoByPosition(position: number): Promise<Afiliado | null> {
    const allAfiliados = await getAllAfiliados();
    return allAfiliados.find(afiliado => afiliado.position === position) || null;
}
