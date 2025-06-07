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
        <div className="mt-12 md:mt-24 flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-center md:justify-between md:mx-16">
            <Button onClick={handleStartClick} className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-[75%] md:w-[220px] h-[45px] rounded-xl border-2 border-green-500",
                "text-green-500 font-semibold hover:bg-green-500 hover:text-white",
                "hover:scale-[103%] md:hover:scale-[115%] transition-transform"
            )}>
                Quero começar!
            </Button>
            <Button className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-[75%] md:w-[220px] h-[45px] rounded-xl border-2 border-green-500",
                "text-green-500 font-semibold hover:bg-green-500 hover:text-white",
                "hover:scale-[103%] md:hover:scale-[115%] transition-transform"
            )}>
                Saber mais
            </Button>
        </div>
    );
}