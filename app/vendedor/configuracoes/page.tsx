// app/vendedor/configuracoes/page.tsx

"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";
import MinhaConta from "@/components/minhaConta";
import MetodoPagamento from "@/components/metodoPagamento";
import MinhasRedesSociais from "@/components/minhasRedesSociais";
import MeuPlano from "@/components/meuPlano";

export default function ConfiguracoesPage() {
  // Estado para seleção de página
  const [selectedPage, setSelectedPage] = useState<"minhaConta" | "metodoPagamento" | "minhasRedesSociais" | "meuPlano">("minhaConta");
  const [confirmationText, setConfirmationText] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteAccount = () => {
    if (confirmationText === "excluir conta") {
      alert("Conta excluída permanentemente (simulação).");
      setConfirmationText("");
      setIsDialogOpen(false);
    }
  };

  const handleDialogClose = () => {
    setConfirmationText("");
    setIsDialogOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-0 bg-[#f7f7f7] min-h-screen">
      {/* Cabeçalho */}
      <h1 className="text-2xl font-bold text-gray-700 mb-2 mt-6 ml-4">
        Configurações
      </h1>
      {/* Tabs */}
      <div className="flex items-center bg-white rounded-t-lg border-b border-gray-200 px-2 pt-2 mb-0">
        <button
          className={`px-6 py-2 rounded-t-lg font-medium text-sm focus:outline-none transition-colors
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
          className={`px-6 py-2 rounded-t-lg font-medium text-sm focus:outline-none transition-colors
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
          className={`px-6 py-2 rounded-t-lg font-medium text-sm focus:outline-none transition-colors
            ${
              selectedPage === "minhasRedesSociais"
                ? "text-green-600 border-b-2 border-green-500 bg-white"
                : "text-gray-700 bg-transparent"
            }`}
          onClick={() => setSelectedPage("minhasRedesSociais")}
        >
          Minhas Redes Sociais
        </button>
        <button
          className={`px-6 py-2 rounded-t-lg font-medium text-sm focus:outline-none transition-colors
            ${
              selectedPage === "meuPlano"
                ? "text-green-600 border-b-2 border-green-500 bg-white"
                : "text-gray-700 bg-transparent"
            }`}
          onClick={() => setSelectedPage("meuPlano")}
        >
          Meu Plano
        </button>
      </div>

      <div className="bg-white rounded-b-lg shadow p-0 pt-2">
        {selectedPage === "minhaConta" && <MinhaConta />}
        {selectedPage === "metodoPagamento" && <MetodoPagamento />}
        {selectedPage === "minhasRedesSociais" && <MinhasRedesSociais />}
        {selectedPage === "meuPlano" && <MeuPlano />}
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
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="w-full md:w-auto"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Excluir conta permanentemente
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza que deseja excluir sua conta?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não poderá ser desfeita. Todos os seus dados, rifas e histórico serão permanentemente removidos dos nossos servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="py-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Para confirmar, digite <span className="font-mono font-bold bg-gray-100 px-1 rounded">excluir conta</span> no campo abaixo:
                    </p>
                    <Input
                      placeholder="Digite: excluir conta"
                      value={confirmationText}
                      onChange={(e) => setConfirmationText(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleDialogClose}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      disabled={confirmationText !== "excluir conta"}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Excluir permanentemente
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}