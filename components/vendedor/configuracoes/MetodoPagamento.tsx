import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MetodoPagamento() {
  // Aqui futuramente será integrado com a API de pagamento
  return (
    <Card className="p-6 mb-6 flex flex-col items-center justify-center min-h-[200px]">
      <h1 className="text-2xl font-bold mb-4">Métodos de Pagamento</h1>
      <p className="text-gray-600 mb-4 text-center">
        Em breve você poderá cadastrar e gerenciar seus métodos de pagamento diretamente por aqui.
      </p>
      <Button disabled variant="outline">
        Integração com API de Pagamento em breve
      </Button>
    </Card>
  );
}
