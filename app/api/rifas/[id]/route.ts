import { NextRequest, NextResponse } from 'next/server'
import { getRifaById } from '@/lib/getRifaID'
import { Rifa } from '@/types'

export async function GET(
    request: NextRequest,
    context: { params: { id: string } }
) {
    const params = await context.params;
    const id = params.id;

    // busca via sua função de dados
    const rifa: Rifa | null = await getRifaById(id)
    if (!rifa) {
        return NextResponse.json(
            { message: 'Rifa não encontrada.' },
            { status: 404 }
        )
    }

    // Garante que id seja string para consistência na API
    const rifaResponse: Rifa = { ...rifa, id: String(rifa.id) }

    return NextResponse.json(rifaResponse)
}
