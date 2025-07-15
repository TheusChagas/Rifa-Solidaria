// components/VerticalCarousel.tsx
"use client";

import { useEffect, useState, useMemo } from "react";

interface VerticalCarouselProps {
    words: string[];
    interval?: number;
    className?: string;
}

export function CarrosselVertical({
    words,
    interval = 3000,
    className = "",
}: VerticalCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    // Garantir que words seja um array válido
    const validWords = useMemo(() => {
        if (!Array.isArray(words)) return [];
        return words.filter(word => word && typeof word === 'string' && word.trim().length > 0);
    }, [words]);

    // Evitar problemas de hidratação
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted || validWords.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % validWords.length);
        }, interval);

        return () => clearInterval(timer);
    }, [validWords, interval, isMounted]);

    // Casos especiais
    if (validWords.length === 0) {
        return <span className={className}>carregando...</span>;
    }

    if (validWords.length === 1) {
        return <span className={className}>{validWords[0]}</span>;
    }

    // Garantir que apenas uma palavra seja exibida
    const currentWord = validWords[currentIndex] || validWords[0] || "";

    // Mostrar apenas a primeira palavra até o componente ser totalmente carregado
    if (!isMounted) {
        return <span className={className}>{validWords[0]}</span>;
    }

    // Garantir que sempre há uma palavra visível com o gradiente aplicado corretamente
    return (
        <span 
            className={`inline-block ${className}`}
            style={{
                display: 'inline-block',
                whiteSpace: 'nowrap',
                minWidth: 'max-content',
                color: 'inherit', // Herdar a cor do elemento pai
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text'
            }}
        >
            {currentWord}
        </span>
    );
}