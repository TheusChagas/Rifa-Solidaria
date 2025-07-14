// components/VerticalCarousel.tsx
"use client";

import { useEffect, useState, useRef } from "react";

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
    const [wordWidths, setWordWidths] = useState<number[]>([]);
    const measureRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        // Measure width of each word
        if (measureRef.current) {
            const widths = words.map((word) => {
                measureRef.current!.textContent = word;
                return measureRef.current!.offsetWidth;
            });
            setWordWidths(widths);
        }
    }, [words]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % words.length);
        }, interval);
        return () => clearInterval(timer);
    }, [words, interval]);

    const currentWidth = wordWidths[currentIndex] || 0;

    return (
        <>
            {/* Hidden element for measuring text width */}
            <span
                ref={measureRef}
                className={`absolute opacity-0 pointer-events-none ${className}`}
                style={{ top: "-9999px" }}
            />

            <span
                className={`inline-block relative transition-all duration-500 ${className}`}
                style={{
                    height: "1.2em",
                    width: `${currentWidth}px`,
                    overflow: "hidden",
                    verticalAlign: "bottom",
                }}
            >
                <span
                    className="block transition-transform duration-500"
                    style={{
                        transform: `translateY(-${currentIndex * 1.2}em)`,
                        lineHeight: "1.2em",
                    }}
                >
                    {words.map((word, index) => (
                        <span
                            key={index}
                            className="block leading-none"
                            style={{
                                height: "1.2em",
                                padding: "0.1em 0",
                            }}
                        >
                            {word}
                        </span>
                    ))}
                </span>
            </span>
        </>
    );
}