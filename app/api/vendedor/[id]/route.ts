import { NextRequest, NextResponse } from 'next/server';
import { getVendedorById } from '@/lib/getVendorData';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const vendorId = params.id;
    const vendor = await getVendedorById(vendorId);
    
    if (!vendor) {
      return NextResponse.json(
        { error: 'Vendedor não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(vendor);
  } catch (error) {
    console.error('Erro ao buscar vendedor:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const vendorId = params.id;
    const updates = await request.json();
    
    // Here you would update the vendor in the database
    // For now, we'll simulate a successful update
    
    console.log(`Updating vendor ${vendorId} with:`, updates);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Vendedor atualizado com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao atualizar vendedor:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
