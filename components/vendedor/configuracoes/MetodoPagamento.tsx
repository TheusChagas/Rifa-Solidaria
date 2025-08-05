import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

interface VendorData {
  configuracoes?: {
    pagamentos?: {
      pixChave?: string;
      dadosBancarios?: {
        banco?: string;
        agencia?: string;
        conta?: string;
        titular?: string;
      };
    };
  };
}

interface MetodoPagamentoProps {
  vendorData?: VendorData;
  vendorId?: string;
}

export default function MetodoPagamento({ vendorData, vendorId }: MetodoPagamentoProps) {
  const [pagamentoData, setPagamentoData] = useState({
    pixChave: "",
    banco: "",
    agencia: "",
    conta: "",
    titular: "",
  });
  const [loading, setLoading] = useState(false);

  // Load vendor payment data when component mounts or vendorData changes
  useEffect(() => {
    if (vendorData?.configuracoes?.pagamentos) {
      const { pixChave, dadosBancarios } = vendorData.configuracoes.pagamentos;
      setPagamentoData({
        pixChave: pixChave || "",
        banco: dadosBancarios?.banco || "",
        agencia: dadosBancarios?.agencia || "",
        conta: dadosBancarios?.conta || "",
        titular: dadosBancarios?.titular || "",
      });
    }
  }, [vendorData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorId) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/vendedor/${vendorId}/pagamento`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pagamentoData),
      });

      if (!response.ok) throw new Error("Erro ao salvar dados de pagamento");
      alert("Dados de pagamento salvos com sucesso!");
    } catch (err) {
      alert("Erro ao salvar dados de pagamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 mb-6">
      <h1 className="text-2xl font-bold mb-6">Métodos de Pagamento</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="pixChave">Chave PIX</Label>
          <Input
            id="pixChave"
            placeholder="CPF, telefone, email ou chave aleatória"
            value={pagamentoData.pixChave}
            onChange={(e) => setPagamentoData({ ...pagamentoData, pixChave: e.target.value })}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Dados Bancários</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="banco">Banco</Label>
              <Input
                id="banco"
                value={pagamentoData.banco}
                onChange={(e) => setPagamentoData({ ...pagamentoData, banco: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="agencia">Agência</Label>
              <Input
                id="agencia"
                value={pagamentoData.agencia}
                onChange={(e) => setPagamentoData({ ...pagamentoData, agencia: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="conta">Conta</Label>
              <Input
                id="conta"
                value={pagamentoData.conta}
                onChange={(e) => setPagamentoData({ ...pagamentoData, conta: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="titular">Titular</Label>
              <Input
                id="titular"
                value={pagamentoData.titular}
                onChange={(e) => setPagamentoData({ ...pagamentoData, titular: e.target.value })}
              />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full md:w-auto" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar dados de pagamento'}
        </Button>
      </form>
    </Card>
  );
}
