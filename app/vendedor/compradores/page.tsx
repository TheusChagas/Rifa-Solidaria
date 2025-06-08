'use client'

import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rifa } from "@/types";
import { getAllRifas } from "@/lib/getRifaID";

interface Comprador {
  nome: string;
  status: "Pago" | "Pendente" | "Cancelado";
  valor: string;
  bilhetes: number;
  numerosSelecionados: number[];
  dataCompra: string;
  telefone?: string;
  email?: string;
}

export default function ClientHistory() {
  const [selectedRifa, setSelectedRifa] = useState<string>("");
  const [rifas, setRifas] = useState<Rifa[]>([]);
  const [compradores, setCompradores] = useState<Comprador[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCompradores, setLoadingCompradores] = useState(false);

  useEffect(() => {
    const fetchRifas = async () => {
      try {
        setLoading(true);
        const rifasData = await getAllRifas();
        setRifas(rifasData);
        if (rifasData.length > 0) {
          setSelectedRifa(rifasData[0].id);
        }
      } catch (error) {
        console.error('Erro ao carregar rifas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRifas();
  }, []);

  useEffect(() => {
    if (selectedRifa) {
      fetchCompradores(selectedRifa);
    }
  }, [selectedRifa]);

  const fetchCompradores = async (rifaId: string) => {
    setLoadingCompradores(true);
    try {
      // Simulate API call - replace with actual API endpoint
      const rifaSelected = rifas.find(r => r.id === rifaId);
      if (rifaSelected) {
        // Generate mock buyers based on sold numbers
        const mockCompradores: Comprador[] = [];
        const nomes = [
          "ERICO SILVA PEREIRA", "JOANA SOUZA", "CARLOS ALBERTO", 
          "MARIA SANTOS", "JOÃO OLIVEIRA", "ANA COSTA", "PEDRO LIMA"
        ];
        
        let currentIndex = 0;
        for (let i = 0; i < rifaSelected.numerosVendidos.length; i += Math.floor(Math.random() * 3) + 1) {
          const bilhetesComprados = Math.min(
            Math.floor(Math.random() * 3) + 1, 
            rifaSelected.numerosVendidos.length - i
          );
          
          const numerosSelecionados = rifaSelected.numerosVendidos.slice(i, i + bilhetesComprados);
          
          if (numerosSelecionados.length > 0) {
            mockCompradores.push({
              nome: nomes[currentIndex % nomes.length],
              status: Math.random() > 0.2 ? "Pago" : "Pendente",
              valor: `R$ ${(bilhetesComprados * rifaSelected.preco).toFixed(2)}`,
              bilhetes: bilhetesComprados,
              numerosSelecionados,
              dataCompra: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
              telefone: `(11) 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
              email: `${nomes[currentIndex % nomes.length].toLowerCase().replace(/\s+/g, '.')}@email.com`
            });
            currentIndex++;
          }
          
          i += bilhetesComprados - 1;
        }
        
        setCompradores(mockCompradores);
      }
    } catch (error) {
      console.error('Erro ao carregar compradores:', error);
    } finally {
      setLoadingCompradores(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="h-20 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const selectedRifaData = rifas.find(r => r.id === selectedRifa);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Histórico de clientes</h1>
      
      <Card className="mb-8 p-6">
        <label className="block text-gray-700 mb-2 font-medium">Selecione uma rifa</label>
        <Select value={selectedRifa} onValueChange={setSelectedRifa}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione uma rifa" />
          </SelectTrigger>
          <SelectContent>
            {rifas.map((rifa) => (
              <SelectItem key={rifa.id} value={rifa.id}>
                {rifa.titulo} - {rifa.percentualVendido}% vendido
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {selectedRifaData && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Total de números:</span> {selectedRifaData.totalNumbers}
              </div>
              <div>
                <span className="font-medium">Vendidos:</span> {selectedRifaData.numerosVendidos.length}
              </div>
              <div>
                <span className="font-medium">Valor por número:</span> R$ {selectedRifaData.preco.toFixed(2)}
              </div>
              <div>
                <span className="font-medium">Total arrecadado:</span> R$ {(selectedRifaData.numerosVendidos.length * selectedRifaData.preco).toFixed(2)}
              </div>
            </div>
          </div>
        )}
      </Card>

      <div className="mb-4 text-gray-600 text-sm">
        {loadingCompradores ? (
          "Carregando compradores..."
        ) : (
          `Mostrando ${compradores.length} de ${compradores.length} resultados`
        )}
      </div>

      <Card className="mb-4 p-0 overflow-hidden">
        {loadingCompradores ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        ) : compradores.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Nenhum comprador encontrado para esta rifa
          </div>
        ) : (
          compradores.map((c, i) => (
            <div key={i} className="flex flex-col gap-1 p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{c.nome}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  c.status === "Pago" 
                    ? "bg-green-100 text-green-700" 
                    : c.status === "Pendente"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {c.status}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Valor {c.valor}</span>
                <span>{c.bilhetes} bilhete{c.bilhetes > 1 ? "s" : ""}</span>
              </div>
              <div className="text-xs text-gray-400">
                <div>Números: {c.numerosSelecionados.map(n => n.toString().padStart(2, '0')).join(', ')}</div>
                <div className="flex justify-between mt-1">
                  <span>Data: {new Date(c.dataCompra).toLocaleDateString('pt-BR')}</span>
                  {c.telefone && <span>Tel: {c.telefone}</span>}
                </div>
              </div>
            </div>
          ))
        )}
      </Card>

      <div className="flex justify-end mt-4">
        <Button variant="outline" disabled={compradores.length === 0}>
          Exportar dados
        </Button>
      </div>
    </div>
  );
}