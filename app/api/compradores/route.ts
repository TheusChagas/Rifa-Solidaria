import { NextRequest, NextResponse } from 'next/server';
import { getAllRifas } from '@/lib/getRifaID';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const vendorId = searchParams.get('vendorId');
    
    if (!vendorId) {
      return NextResponse.json(
        { error: 'vendorId é obrigatório' },
        { status: 400 }
      );
    }
    
    // Get all rifas for this vendor
    const allRifas = await getAllRifas();
    const vendorRifas = allRifas.filter(rifa => rifa.vendorId === vendorId);
    
    // Mock compradores data based on vendor's rifas
    const mockCompradores = [
      {
        id: '1',
        nome: 'João Silva',
        telefone: '(21) 99999-1111',
        email: 'joao@email.com',
        cidade: 'Rio de Janeiro',
        estado: 'RJ',
        totalCompras: 3,
        valorTotal: 150.00,
        ultimaCompra: '2024-01-15T10:30:00Z',
        rifasParticipadas: vendorRifas.slice(0, 2).map(r => r.id)
      },
      {
        id: '2',
        nome: 'Maria Santos',
        telefone: '(21) 98888-2222',
        email: 'maria@email.com',
        cidade: 'Niterói',
        estado: 'RJ',
        totalCompras: 5,
        valorTotal: 280.00,
        ultimaCompra: '2024-01-10T14:20:00Z',
        rifasParticipadas: vendorRifas.map(r => r.id)
      },
      {
        id: '3',
        nome: 'Pedro Costa',
        telefone: '(21) 97777-3333',
        email: 'pedro@email.com',
        cidade: 'São Gonçalo',
        estado: 'RJ',
        totalCompras: 1,
        valorTotal: 50.00,
        ultimaCompra: '2024-01-05T09:15:00Z',
        rifasParticipadas: [vendorRifas[0]?.id].filter(Boolean)
      }
    ];
    
    // Filter compradores based on vendor's rifas
    const vendorCompradores = vendorId === 'vendor1' 
      ? mockCompradores 
      : vendorId === 'vendor2' 
        ? mockCompradores.slice(0, 2)
        : mockCompradores.slice(0, 1);
    
    return NextResponse.json(vendorCompradores);
  } catch (error) {
    console.error('Erro ao buscar compradores:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
