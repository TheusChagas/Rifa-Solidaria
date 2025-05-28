'use client'

export default function SuportePage() {
    return (
        <div className="max-w-2xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Suporte</h1>
            <p className="text-gray-700 mb-4">
                Esta é a página de suporte. Em breve você poderá tirar dúvidas, abrir chamados e acessar nossa central de ajuda.
            </p>
            <div className="text-gray-500">
                Para dúvidas urgentes, envie um e-mail para <a href="mailto:suporte@rifafacil.com" className="text-green-600 underline">suporte@rifafacil.com</a>.
            </div>
        </div>
    );
}
