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
  imagensPremioPrincipal?: string[]; // nova prop opcional
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
  imagensPremioPrincipal, // nova prop
}: CardProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const cardVariantStyles = {
    progresso: {
      card: "border border-green-400 rounded-lg shadow-sm lg:w-[400px] h-auto", // borda verde
      progressIndicator: "bg-verde-400",
      button: cn(
        buttonVariants({ variant: "outline" }),
        "w-[100px] md:w-[120px] h-[35px] rounded-xl border-2 border-green-500",
        "text-green-500 font-semibold hover:bg-green-500 hover:text-white",
        "hover:scale-[103%] md:hover:scale-[115%] transition-transform"
      ),
    },
    finalizado: {
      card: "border border-green-400 rounded-lg shadow-lg lg:w-[400px] h-auto bg-green-50", // borda verde
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
      <UiCard
        className={cn(
          styles.card,
          "relative overflow-hidden",
          "!border-t-2 !border-r-2 !border-l-2",
          variant === "progresso" || variant === "finalizado"
            ? "!border-green-400 !border-t-green-400 !border-r-green-400 !border-l-green-400"
            : "",
          "!rounded-tl-xl !rounded-tr-xl" // borda igual nos dois lados
        )}
        style={{
          borderTopRightRadius: "1rem",
          borderTopLeftRadius: "1rem",
          borderTopWidth: "2px",
          borderRightWidth: "2px",
          borderLeftWidth: "2px",
          maxWidth: "320px", // reduz o tamanho do card
          ...(variant === "progresso" || variant === "finalizado"
            ? { borderColor: "#4ade80" } // verde-400
            : {}),
        }}
      >
        {/* Imagem de capa da rifa */}
        {imagensPremioPrincipal && imagensPremioPrincipal.length > 0 && (
          <div className="w-full h-28 flex items-center justify-center overflow-hidden rounded-t-xl bg-gray-100">
            <img
              src={imagensPremioPrincipal[0]}
              alt="Imagem da rifa"
              className="object-cover w-full h-full"
              style={{ maxHeight: 112 }}
            />
          </div>
        )}
        <CardHeader className="py-2 mb-0 mt-1">
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
