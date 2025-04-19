import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function BilhetesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Flor de Lótus</h1>
        <h2 className="text-xl text-gray-600 mt-2">Meus Bilhetes</h2>
      </div>

      {/* Status Section */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">PTN</span>
            <Badge variant="outline">Encerrado. Aguardando Sorteio</Badge>
          </div>
        </CardContent>
      </Card>

      {/* User Info Sections */}
      <div className="space-y-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-2">ES DO XERIFÃO</h3>
            <p className="text-gray-600">@xerifaojb</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold">Rígido</h3>
            <p className="text-gray-600">XERIFÃO JB</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="font-bold">Sophie</h3>
              <p className="text-green-600 font-semibold">RS 1.280,00</p>
              <div className="bg-gray-100 p-3 rounded">
                <p className="font-bold">PREMIO</p>
                <p className="text-green-600 font-semibold">R$ 1.280,00</p>
                <p className="text-sm text-gray-600">Xerifão JB/PTN/XX-MM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Section */}
      <Card className="mb-6">
        <CardContent className="p-4 space-y-2">
          <p className="text-center font-bold">POR APENAS R$ 15,99 A DEZENA</p>
          <p className="text-center text-sm text-gray-600">
            flordelotusoficial.com/rifas
          </p>
          <div className="flex justify-between">
            <span className="font-semibold">Valor</span>
            <span className="font-semibold">R$ 15,99</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Prêmio</span>
            <span className="font-semibold text-green-600">R$ 1.280,00</span>
          </div>
        </CardContent>
      </Card>

      {/* Date and Platform */}
      <div className="mb-8">
        <p className="font-semibold">DATA: 20/03/2025, 18:10</p>
        <p className="font-semibold">SORTEIO: Live Youtube</p>
      </div>

      {/* Number Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Filtro de números</CardTitle>
          <Tabs defaultValue="todos" className="w-full">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="100">100</TabsTrigger>
              <TabsTrigger value="disponiveis">Disponíveis</TabsTrigger>
              <TabsTrigger value="reservados">Reservados</TabsTrigger>
              <TabsTrigger value="vendidos">Vendidos</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 30 }, (_, i) => (
              <button
                key={i}
                className="p-2 border rounded text-center hover:bg-gray-100
                  ${i % 5 === 0 ? 'bg-green-100' : ''}" // Exemplo de estilo condicional
              >
                {i.toString().padStart(2, '0')}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}