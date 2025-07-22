import { NextRequest, NextResponse } from 'next/server';
import { getAllRifas } from '@/lib/getRifaID';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const vendorId = searchParams.get('vendorId');
    
    let rifas = await getAllRifas();
    
    // Filter by vendor if vendorId is provided
    if (vendorId) {
      rifas = rifas.filter(rifa => 
        rifa.vendedorId === vendorId || 
        (!rifa.vendedorId && vendorId === 'vendor1') // Default fallback
      );
    }
    
    return NextResponse.json(rifas);
  } catch (error) {
    console.error('Erro ao buscar rifas:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Add vendor ID to new rifa
    const rifaData = {
      ...body,
      vendorId: body.vendorId || 'vendor1'
    };
    
    // Here you would save the rifa to database
    // For now, just return success
    return NextResponse.json({ success: true, data: rifaData });
  } catch (error) {
    console.error('Erro ao criar rifa:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
