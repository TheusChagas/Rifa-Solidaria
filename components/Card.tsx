import { cn } from "@/lib/utils";
import { Card as UiCard, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "./ui/progress";

interface CardProps {
    id: number;
    title: string;
    total?: number;
    progress?: number;
}

export default function Card({ title, progress, total }: CardProps) {
    return (
        <UiCard className={cn("border border-gray-300 rounded-lg shadow-sm lg:w-[400px] h-auto",
        )}>
            <CardHeader>
                <CardTitle className="text-xl ml-1 font-bold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <Progress value={progress} className="" indicatorColor="bg-verde-400"/>
                    <p className="text-sm ml-1 text-gray-600">{progress}% de {total} bilhetes vendidos</p>
                    <div className="mt-5 flex gap-4">
                        <Button className={cn(
                            buttonVariants({ variant: "outline"}),
                            "w-[100px] md:w-[120px] h-[35px] rounded-xl border-2 border-green-500",
                            "text-green-500 font-semibold hover:bg-green-500 hover:text-white",
                            "hover:scale-[103%] md:hover:scale-[115%] transition-transform"
                        )}>
                            Detalhes
                        </Button>
                        <Button className={cn(
                            buttonVariants({ variant: "outline"}),
                            "w-[100px] md:w-[120px] h-[35px] rounded-xl border-2 border-green-500",
                            "text-green-500 font-semibold hover:bg-green-500 hover:text-white",
                            "hover:scale-[103%] md:hover:scale-[115%] transition-transform"
                        )}>
                            Visualizar
                        </Button>
                    </div>
                </div>
            </CardContent>
        </UiCard>
    );
}
