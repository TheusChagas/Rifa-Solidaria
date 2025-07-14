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
        if (words.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % words.length);
        }, interval);

        return () => clearInterval(timer);
    }, [words.length, interval]);

    if (words.length === 0) {
        return <span className={className}></span>;
    }

    if (words.length === 1) {
        return <span className={className}>{words[0]}</span>;
    }

    return (
        <span
            className={`inline-block relative overflow-hidden ${className}`}
            style={{
                height: "1.3em",
                minWidth: "120px",
                verticalAlign: "baseline",
            }}
        >
            <span
                className="block transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateY(-${currentIndex * 1.3}em)`,
                    lineHeight: "1.3em",
                }}
            >
                {words.map((word, index) => (
                    <span
                        key={`${word}-${index}`}
                        className="block leading-none whitespace-nowrap"
                        style={{
                            height: "1.3em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                        }}
                    >
                        {word}
                    </span>
                ))}
            </span>
        </span>
    );
}