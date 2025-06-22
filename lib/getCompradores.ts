import { Comprador } from "@/types";

// Utility functions for phone number validation and formatting
export function validatePhoneNumber(phone: string): boolean {
    // Remove all non-numeric characters and check if it contains only numbers
    const numbersOnly = phone.replace(/\D/g, '');
    // Brazilian phone numbers should have 10 or 11 digits
    return numbersOnly.length >= 10 && numbersOnly.length <= 11;
}

export function formatPhoneNumber(phone: string): string {
    // Remove all non-numeric characters
    const numbersOnly = phone.replace(/\D/g, '');
    
    // Validate the phone number
    if (!validatePhoneNumber(phone)) {
        throw new Error('Número de telefone inválido. Use apenas números com 10 ou 11 dígitos.');
    }
    
    // Format based on length
    if (numbersOnly.length === 10) {
        // Format: (XX) XXXX-XXXX
        return `(${numbersOnly.slice(0, 2)}) ${numbersOnly.slice(2, 6)}-${numbersOnly.slice(6)}`;
    } else if (numbersOnly.length === 11) {
        // Format: (XX) XXXXX-XXXX
        return `(${numbersOnly.slice(0, 2)}) ${numbersOnly.slice(2, 7)}-${numbersOnly.slice(7)}`;
    }
    
    return phone;
}

// Mock data for buyers
export const compradorsMockBase: Comprador[] = [
    {
        telefone: "(11) 99999-1111",
        nome: "Ricardo Oliveira",
        cidade: "São Paulo",
        estado: "SP",
        email: "ricardo@email.com"
    },
    {
        telefone: "(21) 98888-2222",
        nome: "Fernanda Costa",
        cidade: "Rio de Janeiro",
        estado: "RJ",
        email: "fernanda@email.com"
    },
    {
        telefone: "(31) 97777-3333",
        nome: "Lucas Martins",
        cidade: "Belo Horizonte",
        estado: "MG",
        email: "lucas@email.com"
    },
    {
        telefone: "(41) 96666-4444",
        nome: "Patrícia Silva",
        cidade: "Curitiba",
        estado: "PR",
        email: "patricia@email.com"
    },
    {
        telefone: "(51) 95555-5555",
        nome: "Bruno Santos",
        cidade: "Porto Alegre",
        estado: "RS",
        email: "bruno@email.com"
    },
];

export async function getAllCompradores(): Promise<Comprador[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Ensure phone numbers are properly formatted
            const formattedCompradores = compradorsMockBase.map(comprador => ({
                ...comprador,
                telefone: formatPhoneNumber(comprador.telefone)
            }));
            resolve(formattedCompradores);
        }, 100);
    });
}

export async function getCompradoresByCity(cidade: string): Promise<Comprador[]> {
    const allCompradores = await getAllCompradores();
    
    if (cidade === "all") {
        return allCompradores;
    }
    
    return allCompradores.filter(comprador => comprador.cidade === cidade);
}

export async function getCompradorByPhone(telefone: string): Promise<Comprador | null> {
    const allCompradores = await getAllCompradores();
    return allCompradores.find(comprador => comprador.telefone === telefone) || null;
}

export async function addComprador(comprador: Omit<Comprador, 'telefone'> & { telefone: string }): Promise<Comprador> {
    const formattedComprador: Comprador = {
        ...comprador,
        telefone: formatPhoneNumber(comprador.telefone)
    };
    
    // In a real application, this would save to a database
    compradorsMockBase.push(formattedComprador);
    
    return formattedComprador;
}
