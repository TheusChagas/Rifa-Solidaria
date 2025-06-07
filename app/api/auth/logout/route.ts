import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
    try {
        const response = NextResponse.json({ 
            success: true, 
            message: 'Logout realizado com sucesso!' 
        });
        
        // Remover cookie de sessão
        response.cookies.delete('user-session');
        
        return response;
    } catch (error) {
        console.error('Erro no logout:', error);
        return NextResponse.json({ 
            success: false, 
            message: 'Erro interno do servidor' 
        }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    return POST(request);
}
