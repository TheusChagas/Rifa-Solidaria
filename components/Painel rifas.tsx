'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rifa } from "@/types";
import { getRifaById } from "@/lib/getRifaID";

interface BilhetesPageProps {
  rifaId?: string;
}

export default function BilhetesPage({ rifaId = "1" }: BilhetesPageProps) {
  const [rifa, setRifa] = useState<Rifa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("todos");

  useEffect(() => {
    const fetchRifa = async () => {
      try {
        setLoading(true);
        const rifaData = await getRifaById(rifaId);
        if (rifaData) {
          setRifa(rifaData);
        } else {
          setError("Rifa não encontrada");
        }
      } catch (err) {
        setError("Erro ao carregar rifa");
      } finally {
        setLoading(false);
      }
    };

    fetchRifa();
  }, [rifaId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !rifa) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Erro</h2>
          <p className="text-gray-600">{error || "Rifa não encontrada"}</p>
        </div>
      </div>
    );
  }

  const numerosDisponiveis = Array.from({ length: rifa.totalNumbers }, (_, i) => i + 1)
    .filter(num => !rifa.numerosVendidos.includes(num) && !rifa.numerosReservados?.includes(num));

  const getStatusColor = () => {
    switch (rifa.status) {
      case 'finalizado': return 'bg-green-100 text-green-800';
      case 'ativo': return 'bg-blue-100 text-blue-800';
      case 'pausado': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = () => {
    if (rifa.percentualVendido === 100) return "Encerrado. Aguardando Sorteio";
    if (!rifa.disponivel) return "Pausado";
    return "Em Andamento";
  };

  const filteredNumbers = () => {
    switch (selectedTab) {
      case "disponiveis":
        return numerosDisponiveis;
      case "reservados":
        return rifa.numerosReservados || [];
      case "vendidos":
        return rifa.numerosVendidos;
      default:
        return Array.from({ length: rifa.totalNumbers }, (_, i) => i + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{rifa.vendedorNome || "Vendedor"}</h1>
        <h2 className="text-xl text-gray-600 mt-2">Meus Bilhetes - {rifa.titulo}</h2>
      </div>

      {/* Status Section */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">{rifa.categoria || "RIFA"}</span>
            <Badge className={getStatusColor()}>
              {getStatusText()}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Rifa Info Sections */}
      <div className="space-y-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-2">{rifa.titulo}</h3>
            <p className="text-gray-600">{rifa.descricao}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold">Contatos</h3>
            {rifa.contatos.map((contato, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                {contato.avatarUrl && (
                  <img 
                    src={contato.avatarUrl} 
                    alt={contato.nome}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span className="text-gray-600">{contato.nome} - {contato.telefone}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="font-bold">Informações do Prêmio</h3>
              <p className="text-green-600 font-semibold">R$ {typeof rifa.premio === 'number' ? rifa.premio.toFixed(2) : rifa.premio}</p>
              <div className="bg-gray-100 p-3 rounded">
                <p className="font-bold">PRÊMIO PRINCIPAL</p>
                <p className="text-green-600 font-semibold">
                  R$ {typeof rifa.premio === 'number' ? rifa.premio.toFixed(2) : rifa.premio}
                </p>
                <p className="text-sm text-gray-600">
                  {rifa.vendedorNome}/{rifa.categoria}/{new Date(rifa.dataSorteio).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Section */}
      <Card className="mb-6">
        <CardContent className="p-4 space-y-2">
          <p className="text-center font-bold">POR APENAS R$ {rifa.preco.toFixed(2)} {rifa.saleMode.toUpperCase()}</p>
          <p className="text-center text-sm text-gray-600">
            {rifa.seo?.slug || "rifasolidaria.com/rifas"}
          </p>
          <div className="flex justify-between">
            <span className="font-semibold">Valor</span>
            <span className="font-semibold">R$ {rifa.preco.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Prêmio</span>
            <span className="font-semibold text-green-600">
              R$ {typeof rifa.premio === 'number' ? rifa.premio.toFixed(2) : rifa.premio}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Date and Platform */}
      <div className="mb-8">
        <p className="font-semibold">
          DATA: {new Date(rifa.dataSorteio).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}
        </p>
        <p className="font-semibold">SORTEIO: {rifa.canalTransmissao}</p>
      </div>

      {/* Number Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Filtro de números</CardTitle>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value={rifa.totalNumbers.toString()}>{rifa.totalNumbers}</TabsTrigger>
              <TabsTrigger value="disponiveis">Disponíveis</TabsTrigger>
              <TabsTrigger value="reservados">Reservados</TabsTrigger>
              <TabsTrigger value="vendidos">Vendidos</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-2">
            {filteredNumbers().slice(0, 30).map((num) => {
              const isVendido = rifa.numerosVendidos.includes(num);
              const isReservado = rifa.numerosReservados?.includes(num);
              
              return (
                <button
                  key={num}
                  className={`p-2 border rounded text-center hover:bg-gray-100 transition-colors ${
                    isVendido ? 'bg-red-100 text-red-700' : 
                    isReservado ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-green-100 text-green-700'
                  }`}
                  disabled={isVendido || isReservado}
                >
                  {num.toString().padStart(2, '0')}
                </button>
              );
            })}
          </div>
          {filteredNumbers().length > 30 && (
            <div className="mt-4 text-center">
              <Button variant="outline">
                Carregar mais números ({filteredNumbers().length - 30} restantes)
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}