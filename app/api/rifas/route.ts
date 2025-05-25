import { NextResponse } from 'next/server';
import { rifasMockBase } from '@/lib/getRifaID';

export async function GET() {
    return NextResponse.json(Object.values(rifasMockBase));
}
