import { NextResponse } from 'next/server';
import { getAllRifas } from '@/lib/getRifaID';

export async function GET() {
    try {
        const rifas = await getAllRifas();
        return NextResponse.json(rifas);
    }
    catch (error) {
        console.error('Erro ao buscar rifas:', error);
        return NextResponse.json(
            { message: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
}
