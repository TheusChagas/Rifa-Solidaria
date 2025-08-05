// app/vendedor/configuracoes/page.tsx

"use client";

import { useState } from "react";
import { useVendorContext } from "@/app/vendedor/layout";
import { Settings, User, CreditCard, Trash2, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Import the configuration components
import MinhaConta from "@/components/vendedor/configuracoes/MinhaConta";
import MinhasRedesSociais from "@/components/vendedor/configuracoes/MinhasRedesSociais";
import MetodoPagamento from "@/components/vendedor/configuracoes/MetodoPagamento";
import MeuPlano from "@/components/vendedor/configuracoes/MeuPlano";

export default function Configuracoes() {
  const { vendorInfo, vendorData, vendorId, loading: vendorLoading } = useVendorContext();
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      // This would be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      alert('Conta deletada com sucesso!');
      window.location.href = '/login';
    } catch (error) {
      console.error('Erro ao deletar conta:', error);
      alert('Erro ao deletar conta');
    } finally {
      setDeleting(false);
    }
  };

  if (vendorLoading) {
    return (
      <div className="absolute top-20 left-8 md:top-16 md:left-72 w-[70%] overflow-x-hidden">
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Carregando dados do vendedor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-20 left-8 md:top-16 md:left-72 w-[70%] overflow-x-hidden">
      <div className="flex items-center gap-2 text-lg font-semibold mb-6">
        <Settings size={24} />
        <span>Configurações - {vendorInfo?.name}</span>
      </div>

      <Tabs defaultValue="conta" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="conta" className="flex items-center gap-2">
            <User size={16} />
            Minha Conta
          </TabsTrigger>
          <TabsTrigger value="redes" className="flex items-center gap-2">
            <Zap size={16} />
            Redes Sociais
          </TabsTrigger>
          <TabsTrigger value="pagamento" className="flex items-center gap-2">
            <CreditCard size={16} />
            Pagamento
          </TabsTrigger>
          <TabsTrigger value="plano" className="flex items-center gap-2">
            <Settings size={16} />
            Meu Plano
          </TabsTrigger>
        </TabsList>

        <TabsContent value="conta">
          <MinhaConta vendorData={vendorData ?? undefined} vendorId={vendorId} />
        </TabsContent>

        <TabsContent value="redes">
          <MinhasRedesSociais vendorData={vendorData ?? undefined} vendorId={vendorId} />
        </TabsContent>

        <TabsContent value="pagamento">
          <MetodoPagamento vendorData={vendorData ?? undefined} vendorId={vendorId} />
        </TabsContent>

        <TabsContent value="plano">
          <MeuPlano vendorData={vendorData ?? undefined} vendorId={vendorId} />
        </TabsContent>
      </Tabs>

      {/* Danger Zone - Account Deletion */}
      <Card className="mt-8 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Trash2 size={20} />
            Zona de Perigo
          </CardTitle>
          <CardDescription>
            Ações irreversíveis que afetarão permanentemente sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
            <div>
              <h4 className="font-medium text-red-800">Deletar Conta</h4>
              <p className="text-sm text-red-600">
                Esta ação removerá permanentemente sua conta e todos os dados associados
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={deleting}>
                  <Trash2 size={16} className="mr-2" />
                  Deletar Conta
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem certeza que deseja deletar sua conta?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser desfeita. Todos os seus dados, incluindo rifas ativas,
                    serão permanentemente removidos de nossos servidores.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="bg-red-600 hover:bg-red-700"
                    disabled={deleting}
                  >
                    {deleting ? 'Deletando...' : 'Sim, deletar conta'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}