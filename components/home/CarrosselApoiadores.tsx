'use client';

import { useState, useEffect } from "react";
import CardApoiador from "@/components/home/CardApoiador";
import { ApoiadorProps } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock data for supporters
const apoiadoresMock: ApoiadorProps[] = [
    {
        id: "1",
        nome: "Maria Silva",
        avatar: "https://picsum.photos/100/100?random=1001"
    },
    {
        id: "2",
        nome: "João Santos",
        avatar: "https://picsum.photos/100/100?random=1002"
    },
    {
        id: "3",
        nome: "Ana Beatriz",
        avatar: "https://picsum.photos/100/100?random=1003"
    },
    {
        id: "4",
        nome: "Carlos Medeiros",
        avatar: "https://picsum.photos/100/100?random=1004"
    },
    {
        id: "5",
        nome: "Fernanda Costa",
        avatar: "https://picsum.photos/100/100?random=1005"
    },
    {
        id: "6",
        nome: "Roberto Almeida",
        avatar: "https://picsum.photos/100/100?random=1006"
    }
];

export const CarrosselApoiadores = () => {
    const [apoiadores] = useState<ApoiadorProps[]>(apoiadoresMock);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const getVisibleCards = () => {
        // Responsive: 2 cards on mobile, 3 on tablet, 4 on desktop
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 768) return 2;
            if (window.innerWidth < 1024) return 3;
            return 4;
        }
        return 4;
    };

    const [visibleCards, setVisibleCards] = useState(getVisibleCards);

    useEffect(() => {
        const handleResize = () => {
            setVisibleCards(getVisibleCards());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => {
            const maxIndex = Math.max(0, apoiadores.length - visibleCards);
            return prevIndex >= maxIndex ? 0 : prevIndex + 1;
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => {
            const maxIndex = Math.max(0, apoiadores.length - visibleCards);
            return prevIndex === 0 ? maxIndex : prevIndex - 1;
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[300px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
        );
    }

    if (apoiadores.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[300px] text-slate-500">
                <p>Nenhum apoiador disponível no momento</p>
            </div>
        );
    }

    const maxIndex = Math.max(0, apoiadores.length - visibleCards);
    const translateX = -(currentIndex * (100 / visibleCards));

    return (
        <div className="relative w-full">
            {/* Navigation buttons */}
            <button
                onClick={prevSlide}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110"
                disabled={apoiadores.length <= visibleCards}
            >
                <ChevronLeft className="w-6 h-6 text-slate-600" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-110"
                disabled={apoiadores.length <= visibleCards}
            >
                <ChevronRight className="w-6 h-6 text-slate-600" />
            </button>

            {/* Carousel container */}
            <div className="overflow-hidden rounded-xl">
                <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(${translateX}%)` }}
                >
                    {apoiadores.map((apoiador) => (
                        <div 
                            key={apoiador.id} 
                            className={`flex-shrink-0 flex justify-center px-2 ${
                                visibleCards === 2 ? 'w-1/2' : 
                                visibleCards === 3 ? 'w-1/3' : 'w-1/4'
                            }`}
                        >
                            <CardApoiador apoiador={apoiador} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Indicators */}
            {apoiadores.length > visibleCards && (
                <div className="flex justify-center mt-6 space-x-2">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                index === currentIndex
                                    ? 'bg-green-500 scale-110'
                                    : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
