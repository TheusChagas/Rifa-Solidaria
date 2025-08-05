import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const rifaData = await request.json();
    
    // Validate required fields
    const { titulo, descricao, preco, totalNumbers, dataSorteio, vendorId } = rifaData;
    
    if (!titulo || !descricao || !preco || !totalNumbers || !dataSorteio || !vendorId) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: titulo, descricao, preco, totalNumbers, dataSorteio, vendorId' },
        { status: 400 }
      );
    }
    
    // Generate new rifa ID
    const newRifaId = `rifa-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create rifa object
    const novaRifa = {
      id: newRifaId,
      titulo,
      descricao,
      metodoPagamento: rifaData.metodoPagamento || 'Pix',
      disponivel: true,
      preco: Number(preco),
      totalNumbers: Number(totalNumbers),
      premio: rifaData.premio || rifaData.premios?.[0]?.nome || 'Prêmio não especificado',
      saleMode: rifaData.saleMode || 'por número',
      numerosVendidos: [],
      dataSorteio,
      horarioSorteio: rifaData.horarioSorteio || '19:00',
      localSorteio: rifaData.localSorteio || 'Online',
      canalTransmissao: rifaData.canalTransmissao || 'YouTube',
      contatos: rifaData.contatos || [],
      imagensPremioPrincipal: rifaData.imagensPremioPrincipal || [],
      premios: rifaData.premios || [],
      fazendinha: rifaData.fazendinha || false,
      status: 'ativo',
      vendorId,
      vendedorNome: rifaData.vendedorNome || 'Vendedor',
      categoria: rifaData.categoria || 'Outros',
      tags: rifaData.tags || [],
      numerosReservados: [],
      valorTotal: Number(preco) * Number(totalNumbers),
      percentualVendido: 0,
      dataInicio: new Date().toISOString(),
      dataFim: dataSorteio,
      regulamento: rifaData.regulamento || 'Regulamento padrão',
      tipoSorteio: 'online',
      transmissaoAoVivo: true,
      emailContato: rifaData.emailContato,
      pixChave: rifaData.pixChave,
      configPagamento: {
        pix: true,
        cartao: false,
        dinheiro: false,
        boleto: false
      },
      limitePorPessoa: rifaData.limitePorPessoa || 10,
      permitirReserva: true,
      exibirNumerosVendidos: true,
      exibirCompradores: false,
      notificacoes: {
        email: true,
        whatsapp: true,
        sms: false
      },
      configuracaoAvancada: {
        permitirMultiplasCompras: true,
        desconto: {
          ativo: false,
          quantidade: 0,
          percentual: 0
        },
        bonificacao: {
          ativo: false,
          compre: 0,
          ganhe: 0
        }
      },
      historico: [
        {
          data: new Date().toISOString(),
          acao: 'Rifa criada',
          usuario: rifaData.vendedorNome || 'Vendedor',
          detalhes: 'Rifa criada via painel do vendedor'
        }
      ],
      estatisticas: {
        visualizacoes: 0,
        compartilhamentos: 0,
        tentativasCompra: 0
      }
    };
    
    // Here you would save the rifa to database
    console.log('Nova rifa criada:', novaRifa);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Rifa criada com sucesso',
      rifaId: newRifaId,
      data: novaRifa
    });
  } catch (error) {
    console.error('Erro ao criar rifa:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
