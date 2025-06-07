"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SupportButton() {
    return (
        <Button className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "w-[280px] md:w-[240px] h-[50px] rounded-full",
            "border-2 border-slate-300 text-slate-700 font-semibold text-base",
            "bg-white hover:bg-gray-50 hover:border-slate-400",
            "shadow-lg hover:shadow-xl",
            "hover:scale-105 transition-all duration-300",
            "backdrop-blur-sm"
        )}>
            FALAR COM SUPORTE
        </Button>
    );
}