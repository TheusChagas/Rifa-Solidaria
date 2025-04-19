// components/VerticalCarousel.tsx
"use client";

import { useEffect, useState } from "react";

interface VerticalCarouselProps {
    words: string[];
    interval?: number; // Intervalo em milissegundos, padrão 3000ms
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
            style={{ height: "1em", overflow: "hidden" }}
        >
            <span
                className="block transition-transform duration-500"
                style={{ transform: `translateY(-${currentIndex * 100}%)` }}
            >
                {words.map((word, index) => (
                    <span
                        key={index}
                        className="block"
                        style={{ height: "1em", lineHeight: "1em" }}
                    >
                        {word}
                    </span>
                ))}
            </span>
        </span>
    );
}
