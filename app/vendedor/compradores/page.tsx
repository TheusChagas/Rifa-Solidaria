'use client'

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ClientHistory() {
  const [selectedRifa, setSelectedRifa] = useState("1");

  // Exemplo de rifas e compradores (mock)
  const rifas = [
    { id: "1", nome: "RIFA ENTRE AMIGOS CELULAR" },
    { id: "2", nome: "RIFA SOLIDÁRIA TV" },
  ];
  const compradores = [
    { nome: "ERICO SILVA PEREIRA", status: "Pago", valor: "R$ 10,00", bilhetes: 1 },
    { nome: "JOANA SOUZA", status: "Pendente", valor: "R$ 20,00", bilhetes: 2 },
    { nome: "NOME COMPRADOR", status: "Pago", valor: "R$ 10,00", bilhetes: 1 },
    { nome: "NOME COMPRADOR", status: "Pago", valor: "R$ 10,00", bilhetes: 1 },
    { nome: "NOME COMPRADOR", status: "Pago", valor: "R$ 10,00", bilhetes: 1 },
  ];

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
                {rifa.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>

      <div className="mb-4 text-gray-600 text-sm">
        Mostrando {compradores.length} de {compradores.length} resultados
      </div>

      <Card className="mb-4 p-0 overflow-hidden">
        {compradores.map((c, i) => (
          <div key={i} className={`flex flex-col gap-1 p-4 border-b last:border-b-0`}>
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">{c.nome}</span>
              <span className={c.status === "Pago" ? "text-green-500 font-semibold" : "text-yellow-600 font-semibold"}>
                {c.status}
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Valor {c.valor}</span>
              <span>{c.bilhetes} bilhete{c.bilhetes > 1 ? "s" : ""}</span>
            </div>
          </div>
        ))}
      </Card>

      <div className="flex justify-end mt-4">
        <Button variant="outline" disabled>
          Carregar mais
        </Button>
      </div>
    </div>
  );
}