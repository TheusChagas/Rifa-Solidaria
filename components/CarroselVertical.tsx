// components/VerticalCarousel.tsx
"use client";

import { useEffect, useState } from "react";

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

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % words.length);
        }, interval);
        return () => clearInterval(timer);
    }, [words, interval]);

    return (
        <span
            className={`inline-block relative ${className}`}
            style={{ 
                height: "1.5em", // Altura aumentada para evitar sobreposição
                overflow: "hidden",
                verticalAlign: "bottom" // Remove espaçamento extra abaixo
            }}
        >
            <span
                className="block transition-transform duration-500"
                style={{ 
                    transform: `translateY(-${currentIndex * 1.5}em)`,
                    lineHeight: "1.5em" // Espaçamento vertical consistente
                }}
            >
                {words.map((word, index) => (
                    <span
                        key={index}
                        className="block leading-none" // Remove espaçamento interno
                        style={{ 
                            height: "1.5em",
                            padding: "0.25em 0" // Espaçamento vertical entre as palavras
                        }}
                    >
                        {word}
                    </span>
                ))}
            </span>
        </span>
    );
}