import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const userSession = cookieStore.get('user-session');
        
        if (userSession && userSession.value === 'logged-in') {
            return NextResponse.json({ 
                isLoggedIn: true,
                user: {
                    email: 'usuario@teste.com',
                    name: 'Usuário Teste'
                }
            });
        }
        
        return NextResponse.json({ isLoggedIn: false });
    } catch (error) {
        console.error('Erro ao verificar sessão:', error);
        return NextResponse.json({ isLoggedIn: false });
    }
}
