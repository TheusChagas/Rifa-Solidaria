// app/vendedor/configuracoes/page.tsx

"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import MinhaConta from "@/components/minhaConta";
import MetodoPagamento from "@/components/metodoPagamento";
import MinhasRedesSociais from "@/components/minhasRedesSociais";

export default function ConfiguracoesPage() {
  // Estado para seleção de página
  const [selectedPage, setSelectedPage] = useState<"minhaConta" | "metodoPagamento" | "minhasRedesSociais">("minhaConta");

  return (
    <div className="max-w-2xl mx-auto p-0 bg-[#f7f7f7] min-h-screen">
      {/* Cabeçalho */}
      <h1 className="text-2xl font-bold text-gray-700 mb-2 mt-6 ml-4">
        Configurações
      </h1>
      {/* Tabs */}
      <div className="flex items-center bg-white rounded-t-lg border-b border-gray-200 px-2 pt-2 mb-0">
        <button
          className={`px-6 py-2 rounded-t-lg font-medium text-base focus:outline-none transition-colors
            ${
              selectedPage === "minhaConta"
                ? "text-green-600 border-b-2 border-green-500 bg-white"
                : "text-gray-700 bg-transparent"
            }`}
          onClick={() => setSelectedPage("minhaConta")}
        >
          Minha conta
        </button>
        <button
          className={`px-6 py-2 rounded-t-lg font-medium text-base focus:outline-none transition-colors
            ${
              selectedPage === "metodoPagamento"
                ? "text-green-600 border-b-2 border-green-500 bg-white"
                : "text-gray-700 bg-transparent"
            }`}
          onClick={() => setSelectedPage("metodoPagamento")}
        >
          Métodos de Pagamentos
        </button>
        <button
          className={`px-6 py-2 rounded-t-lg font-medium text-base focus:outline-none transition-colors
            ${
              selectedPage === "minhasRedesSociais"
                ? "text-green-600 border-b-2 border-green-500 bg-white"
                : "text-gray-700 bg-transparent"
            }`}
          onClick={() => setSelectedPage("minhasRedesSociais")}
        >
          Minhas Redes Sociais
        </button>
      </div>

      <div className="bg-white rounded-b-lg shadow p-0 pt-2">
        {selectedPage === "minhaConta" && <MinhaConta />}
        {selectedPage === "metodoPagamento" && <MetodoPagamento />}
        {selectedPage === "minhasRedesSociais" && <MinhasRedesSociais />}
      </div>

      {/* Bloco de exclusão de conta - só exibe se for Minha Conta */}
      {selectedPage === "minhaConta" && (
        <div className="flex flex-col items-center">
          <div className="h-16" />
          <Card className="p-6 mb-6 bg-white shadow w-full max-w-2xl">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-destructive">Excluir conta</h2>
              <p className="text-sm text-muted-foreground">
                Esta ação é irreversível. Todos os seus dados serão permanentemente removidos.
              </p>
              <Button
                variant="destructive"
                className="w-full md:w-auto"
                onClick={() => {
                  if (
                    window.confirm("Tem certeza que deseja excluir sua conta? Esta ação não poderá ser desfeita!")
                  ) {
                    alert("Conta excluída permanentemente (simulação).");
                  }
                }}
              >
                Excluir conta permanentemente
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}