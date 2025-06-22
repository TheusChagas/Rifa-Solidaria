import { Apoiador } from "@/types";

export async function getApoiadores(limit: number = 6): Promise<Apoiador[]> {
    // Mock data for supporters - replace with actual API call
    const apoiadores: Apoiador[] = [
        {
            nome: "João Silva",
            imagem: "/apoiadores/joao.jpg"
        },
        {
            nome: "Maria Santos",
            imagem: "/apoiadores/maria.jpg"
        },
        {
            nome: "Pedro Oliveira",
            imagem: "/apoiadores/pedro.jpg"
        },
        {
            nome: "Ana Costa",
            imagem: "/apoiadores/ana.jpg"
        },
        {
            nome: "Carlos Lima",
            imagem: "/apoiadores/carlos.jpg"
        },
        {
            nome: "Lucia Ferreira",
            imagem: "/apoiadores/lucia.jpg"
        }
    ];

    return apoiadores.slice(0, limit);
}
