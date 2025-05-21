// app/compra/[id]/page.tsx
import PaginaRifa, { RifaConfig } from "@/components/PaginaRifa";
import { getRifaById } from "@/lib/getRifaID";

interface Props {
    params: { id: string };
}

export default async function CompraRifaPage(props: Props) {
    const params = await props.params;
    const id = params.id;
    const raw = await getRifaById(id);

    if (!raw) {
        return (
            <div className="p-8 text-center">
                ❌ Rifa com id “{id}” não encontrada.
            </div>
        );
    }

    // mapeia retorno bruto ao formato esperado pelo client
    const config: RifaConfig = {
        id: raw.id,
        titulo: raw.titulo,
        descricao: raw.descricao,
        progresso: raw.progresso,
        metodoPagamento: raw.metodoPagamento,
        disponivel: raw.disponivel,
        totalNumbers: raw.totalNumbers,
        preco: raw.preco,
        premio: raw.premio,
        saleMode: raw.saleMode,
        numerosVendidos: raw.numerosVendidos,
        dataSorteio: raw.dataSorteio,
        canalTransmissao: raw.canalTransmissao,
        contatos: raw.contatos,
    };

    return <PaginaRifa config={config} />;
}
