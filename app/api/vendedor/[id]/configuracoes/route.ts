import { NextRequest, NextResponse } from 'next/server';
import { getVendedorById } from '@/lib/getVendorData';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const vendorId = params.id;
    const configData = await request.json();
    
    // Validate vendor exists
    const vendor = await getVendedorById(vendorId);
    if (!vendor) {
      return NextResponse.json(
        { error: 'Vendedor não encontrado' },
        { status: 404 }
      );
    }
    
    // Structure the configuration update
    const updateData = {
      nome: configData.nome,
      sobrenome: configData.sobrenome,
      email: configData.email,
      celular: configData.celular,
      cidade: configData.cidade,
      cep: configData.cep,
      configuracoes: {
        notificacoes: {
          email: configData.notificacaoEmail,
          whatsapp: configData.notificacaoWhatsapp,
          sms: configData.notificacaoSms
        },
        privacidade: {
          exibirNome: configData.exibirNome,
          exibirContato: configData.exibirContato
        },
        pagamentos: {
          pixChave: configData.pixChave,
          dadosBancarios: {
            banco: configData.banco,
            agencia: configData.agencia,
            conta: configData.conta,
            titular: configData.titular
          }
        }
      },
      redesSociais: {
        instagram: configData.instagram,
        facebook: configData.facebook,
        whatsapp: configData.whatsapp,
        youtube: configData.youtube
      },
      dataAtualizacao: new Date().toISOString()
    };
    
    // Here you would update the vendor in the database
    console.log(`Updating vendor ${vendorId} configurations:`, updateData);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Configurações atualizadas com sucesso',
      data: updateData
    });
  } catch (error) {
    console.error('Erro ao atualizar configurações:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
