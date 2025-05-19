import { NextRequest, NextResponse } from 'next/server'
import { getRifaById, RifaRaw } from '@/lib/getRifaID'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params

    // busca via sua função de dados
    const rifa: RifaRaw | null = await getRifaById(id)
    if (!rifa) {
        return NextResponse.json(
            { message: 'Rifa não encontrada.' },
            { status: 404 }
        )
    }

    return NextResponse.json(rifa)
}
