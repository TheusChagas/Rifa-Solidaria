import { cn } from "@/lib/utils";
import { Card as UiCard, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CardProps {
    title: string;
    variant?: "rifa" | "destaque" | "simples";
    description?: string;
    progress?: number;
}

export default function Card({ title, variant = "simples", description, progress }: CardProps) {
    return (
        <UiCard className={cn("border border-gray-300 rounded-lg shadow-sm p-4", {
            "border-green-500": variant === "destaque",
        })}>
            <CardHeader>
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {variant === "rifa" && (
                    <div>
                        <p className="text-sm text-gray-600">{progress}% de 100 bilhetes</p>
                        <div className="mt-3 flex gap-2">
                            <Button className="bg-black text-white text-sm">Publicar</Button>
                            <Button variant="outline" className="text-sm">Visualizar</Button>
                        </div>
                    </div>
                )}

                {variant === "destaque" && (
                    <p className="text-sm font-medium text-green-600">Esta rifa está em destaque!</p>
                )}

                {variant === "simples" && description && (
                    <p className="text-sm text-gray-500">{description}</p>
                )}
            </CardContent>
        </UiCard>
    );
}
