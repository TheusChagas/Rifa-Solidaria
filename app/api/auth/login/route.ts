import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Usuário de teste
const TEST_USER = {
    email: 'usuario@teste.com',
    senha: '12345678',
    name: 'Usuário Teste'
};

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, senha } = body;

        // Validar credenciais do usuário de teste
        if (email === TEST_USER.email && senha === TEST_USER.senha) {
            // Definir cookie de sessão
            const response = NextResponse.json({ 
                success: true, 
                message: 'Login realizado com sucesso!',
                user: {
                    email: TEST_USER.email,
                    name: TEST_USER.name
                }
            });
            
            response.cookies.set('user-session', 'logged-in', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7 // 7 dias
            });
            
            return response;
        }

        return NextResponse.json({ 
            success: false, 
            message: 'Credenciais inválidas' 
        }, { status: 401 });

    } catch (error) {
        console.error('Erro no login:', error);
        return NextResponse.json({ 
            success: false, 
            message: 'Erro interno do servidor' 
        }, { status: 500 });
    }
}
