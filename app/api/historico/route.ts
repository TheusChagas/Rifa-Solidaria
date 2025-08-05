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
    
    // Get vendor's rifas to create realistic history
    const allRifas = await getAllRifas();
    const vendorRifas = allRifas.filter(rifa => rifa.vendorId === vendorId);
    
    // Mock historical data
    const mockHistorico = [
      {
        id: '1',
        data: '2024-01-15T16:30:00Z',
        acao: 'Compra realizada',
        tipo: 'compra',
        descricao: 'João Silva comprou 5 números',
        valor: 25.00,
        rifaId: vendorRifas[0]?.id,
        rifaTitulo: vendorRifas[0]?.titulo,
        status: 'sucesso'
      },
      {
        id: '2',
        data: '2024-01-15T14:20:00Z',
        acao: 'Pagamento recebido',
        tipo: 'pagamento',
        descricao: 'Pagamento PIX confirmado',
        valor: 25.00,
        rifaId: vendorRifas[0]?.id,
        rifaTitulo: vendorRifas[0]?.titulo,
        status: 'sucesso'
      },
      {
        id: '3',
        data: '2024-01-15T10:15:00Z',
        acao: 'Rifa criada',
        tipo: 'rifa',
        descricao: 'Nova rifa publicada',
        rifaId: vendorRifas[0]?.id,
        rifaTitulo: vendorRifas[0]?.titulo,
        status: 'sucesso'
      },
      {
        id: '4',
        data: '2024-01-14T18:45:00Z',
        acao: 'Configurações atualizadas',
        tipo: 'sistema',
        descricao: 'Dados bancários atualizados',
        status: 'sucesso'
      },
      {
        id: '5',
        data: '2024-01-14T09:30:00Z',
        acao: 'Login realizado',
        tipo: 'sistema',
        descricao: 'Acesso ao painel do vendedor',
        status: 'sucesso'
      }
    ];
    
    // Filter and adjust based on vendor
    const vendorHistorico = vendorId === 'vendor1' 
      ? mockHistorico 
      : vendorId === 'vendor2' 
        ? mockHistorico.slice(0, 3)
        : mockHistorico.slice(0, 2);
    
    return NextResponse.json(vendorHistorico);
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
