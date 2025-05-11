// app/reserva/page.tsx
import { ReservarRifaDialog } from "@/components/ReservaRifa";

export default function ReservaPage() {
  return (
    <div className="p-4">
      {/* Seu conteúdo principal da página */}
      <h1 className="text-2xl font-bold">Faça sua reserva</h1>
      
      {/* Dialog deve ser acionado por um botão ou estado */}
      <ReservarRifaDialog />
    </div>
  );
}