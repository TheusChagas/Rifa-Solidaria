'use client';

import { useState } from "react";
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { Card as UiCard, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "./ui/progress";
import { RifaDetailsDialog } from "./RifaDetailsDialog";

export interface CardProps {
  id: number;
  title: string;
  progress: number;
  variant: "finalizado" | "progresso" | "pagamento";
  onVisualizar?: () => void;
  total?: number;
  paymentDays?: number;
  paymentTime?: string;
}

const Card = ({
  id,
  title,
  progress = 0,
  total = 0,
  variant = "progresso",
  paymentDays = 3,
  paymentTime = "2 horas e 30 minutos",
  onVisualizar,
}: CardProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

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
    <div>
      <UiCard className={cn(styles.card)}>
        <CardHeader>
          <CardTitle className="text-xl ml-1 font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress
            value={progress}
            className=""
            indicatorColor={styles.progressIndicator}
          />
          <p className="text-sm ml-1 text-gray-600">
            {progress}% de {total} bilhetes vendidos
          </p>
          <div className="mt-5 flex gap-4">
            <Button
              className={styles.button}
              onClick={() => setDialogOpen(true)}
            >
              Detalhes
            </Button>
            <Link href={`/compra/${id}`} passHref>
              <Button className={styles.button}>Visualizar</Button>
            </Link>
          </div>
        </CardContent>

        {variant === "pagamento" && (
          <div className="bg-red-500 text-white px-4 py-2 rounded-b-lg">
            Faça o pagamento em até {paymentDays} dias e {paymentTime}
          </div>
        )}
      </UiCard>

      {/* Dialog de detalhes */}
      <RifaDetailsDialog
        id={id}
        open={isDialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default Card;
