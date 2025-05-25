// app/compra/[id]/page.tsx
import PaginaRifa from "@/components/PaginaRifa";
import PaginaFazendinha from "@/components/PaginaFazendinha";
import { getRifaById } from "@/lib/getRifaID";
import { Rifa } from "@/types";

interface Props {
    params: { id: string };
}

export default async function CompraRifaPage(props: Props) {
    const params = await props.params;
    const id = params.id;
    const rifa = await getRifaById(id);

    if (!rifa) {
        return (
            <div className="p-8 text-center">
                ❌ Rifa com id “{id}” não encontrada.
            </div>
        );
    }

    if (rifa.fazendinha) {
        return <PaginaFazendinha config={rifa} />;
    }

    return <PaginaRifa config={{ ...rifa, id: String(rifa.id), premio: Number(rifa.premio) }} />;
}
