"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SupportButton() {
    return (
        <Button className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "w-[75%] md:w-[300px] h-[55px] rounded-xl border-2 border-green-500",
            "text-green-500 text-lg font-bold hover:bg-green-500 hover:text-white",
            "hover:scale-[103%] md:hover:scale-[110%] transition-transform duration-300",
            "shadow-lg hover:shadow-xl"
        )}>
            FALAR COM SUPORTE
        </Button>
    );
}