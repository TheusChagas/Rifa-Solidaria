import { cn } from "@/lib/utils";
import { Card as UiCard, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "./ui/progress";

interface CardProps {
    id: number;
    title: string;
    total?: number;
    progress?: number;
    variant?: "progresso" | "finalizado" | "pagamento";
    paymentDays?: number;
    paymentTime?: string;
    onVisualizar?: (id: number) => void;
}

export default function Card({
    id,
    title,
    progress,
    total,
    variant = "progresso",
    paymentDays = 3,
    paymentTime = "2 horas e 30 minutos",
    onVisualizar,
}: CardProps) {
    const cardVariantStyles = {
        progresso: {
            card: "border border-gray-300 rounded-lg shadow-sm lg:w-[400px] h-auto",
            progressIndicator: "bg-verde-400",
            button: cn(
                buttonVariants({ variant: "outline" }),
                "w-[100px] md:w-[120px] h-[35px] rounded-xl border-2 border-green-500",
                "text-green-500 font-semibold hover:bg-green-500 hover:text-white",
                "hover:scale-[103%] md:hover:scale-[115%] transition-transform"
            ),
        },
        finalizado: {
            card: "border border-green-300 rounded-lg shadow-lg lg:w-[400px] h-auto bg-green-50",
            progressIndicator: "bg-green-500",
            button: cn(
                buttonVariants({ variant: "outline" }),
                "w-[100px] md:w-[120px] h-[35px] rounded-xl border-2 border-green-500",
                "text-green-500 font-semibold hover:bg-green-500 hover:text-white",
                "hover:scale-[103%] md:hover:scale-[115%] transition-transform"
            ),
        },
        pagamento: {
            card: "border border-red-500 rounded-lg shadow-sm lg:w-[400px] h-auto",
            progressIndicator: "bg-red-500",
            button: cn(
                buttonVariants({ variant: "outline" }),
                "w-[100px] md:w-[120px] h-[35px] rounded-xl border-2 border-red-500",
                "text-red-500 font-semibold hover:bg-red-500 hover:text-white",
                "hover:scale-[103%] md:hover:scale-[115%] transition-transform"
            ),
        },
    };

    const styles = cardVariantStyles[variant];

    return (
        <UiCard className={cn(styles.card)}>
            <CardHeader>
                <CardTitle className="text-xl ml-1 font-bold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <Progress value={progress} className="" indicatorColor={styles.progressIndicator} />
                    <p className="text-sm ml-1 text-gray-600">
                        {progress}% de {total} bilhetes vendidos
                    </p>
                    <div className="mt-5 flex gap-4">
                        <Button className={styles.button}>Detalhes</Button>
                        <Button className={styles.button} onClick={() => onVisualizar?.(id)}>
                            Visualizar
                        </Button>
                    </div>
                </div>
            </CardContent>
            {variant === "pagamento" && (
                <div className="bg-red-500 text-white px-4 py-2 rounded-b-lg">
                    Faça o pagamento em até {paymentDays} dias e {paymentTime}
                </div>
            )}
        </UiCard>
    );
}
