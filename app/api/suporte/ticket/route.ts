import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const ticketData = await request.json();
    
    // Validate required fields
    const { assunto, categoria, descricao, prioridade, vendorId, vendorEmail, vendorName } = ticketData;
    
    if (!assunto || !categoria || !descricao || !vendorId) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: assunto, categoria, descrição, vendorId' },
        { status: 400 }
      );
    }
    
    // Generate ticket ID
    const ticketId = `TICKET-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create ticket object
    const ticket = {
      id: ticketId,
      assunto,
      categoria,
      descricao,
      prioridade: prioridade || 'media',
      vendorId,
      vendorEmail,
      vendorName,
      status: 'aberto',
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
      respostas: []
    };
    
    // Here you would save the ticket to database
    console.log('Novo ticket criado:', ticket);
    
    // Simulate sending email notification
    console.log(`Email notification sent to: ${vendorEmail}`);
    console.log(`Internal notification sent to support team`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Ticket criado com sucesso',
      ticketId,
      data: ticket
    });
  } catch (error) {
    console.error('Erro ao criar ticket:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

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
    
    // Mock tickets for this vendor
    const mockTickets = [
      {
        id: 'TICKET-001',
        assunto: 'Problema com pagamento PIX',
        categoria: 'pagamento',
        prioridade: 'alta',
        status: 'em-andamento',
        dataCriacao: '2024-01-10T10:30:00Z',
        dataAtualizacao: '2024-01-11T15:20:00Z'
      },
      {
        id: 'TICKET-002',
        assunto: 'Dúvida sobre sorteio',
        categoria: 'geral',
        prioridade: 'media',
        status: 'resolvido',
        dataCriacao: '2024-01-05T14:15:00Z',
        dataAtualizacao: '2024-01-06T09:45:00Z'
      }
    ];
    
    return NextResponse.json(mockTickets);
  } catch (error) {
    console.error('Erro ao buscar tickets:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
