"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroButtonsProps {
    onScrollToSection?: () => void;
}

export function HeroButtons({ onScrollToSection }: HeroButtonsProps) {
    const handleStartClick = () => {
        if (onScrollToSection) {
            onScrollToSection();
        }
        // ...any other existing logic...
    };

    return (
        <div className="mt-12 md:mt-16 flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center">
            <Button onClick={handleStartClick} className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "w-[280px] md:w-[240px] h-[50px] rounded-full",
                "bg-green-500 hover:bg-green-600 text-white font-semibold text-base",
                "shadow-lg hover:shadow-xl border-2 border-green-400",
                "hover:scale-105 transition-all duration-300",
                "backdrop-blur-sm"
            )}>
                Quero começar!
            </Button>
            <Button className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-[280px] md:w-[240px] h-[50px] rounded-full",
                "border-2 border-white/60 text-slate-700 font-semibold text-base",
                "bg-white/80 hover:bg-white hover:border-white",
                "shadow-lg hover:shadow-xl",
                "hover:scale-105 transition-all duration-300",
                "backdrop-blur-sm"
            )}>
                Saber mais
            </Button>
        </div>
    );
}