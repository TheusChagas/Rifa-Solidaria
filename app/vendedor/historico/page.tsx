'use client'

import { useState, useEffect } from "react";
import { useVendorContext } from "@/app/vendedor/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { History, Search, Filter, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HistoricoItem {
  id: string;
  data: string;
  acao: string;
  tipo: 'rifa' | 'pagamento' | 'sistema' | 'compra';
  descricao: string;
  valor?: number;
  rifaId?: string;
  rifaTitulo?: string;
  status?: 'sucesso' | 'erro' | 'pendente';
}

export default function Historico() {
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);
  const [filteredHistorico, setFilteredHistorico] = useState<HistoricoItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('todos');
  const [loading, setLoading] = useState(true);
  
  const { vendorInfo, vendorData, vendorId, loading: vendorLoading } = useVendorContext();

  useEffect(() => {
    if (vendorLoading || !vendorId) return;

    setLoading(true);
    fetch(`/api/historico?vendorId=${vendorId}`)
      .then(res => res.ok ? res.json() : [])
      .then((data: HistoricoItem[]) => {
        // Add vendor's own history to API data
        const vendorHistory = vendorData?.historico?.map((item, index) => ({
          id: `vendor-${index}`,
          data: item.data,
          acao: item.acao,
          tipo: 'sistema' as const,
          descricao: item.detalhes || item.acao,
          status: 'sucesso' as const
        })) || [];
        
        const allHistory = [...data, ...vendorHistory].sort((a, b) => 
          new Date(b.data).getTime() - new Date(a.data).getTime()
        );
        
        setHistorico(allHistory);
        setFilteredHistorico(allHistory);
      })
      .catch(error => {
        console.error('Erro ao carregar histórico:', error);
        setHistorico([]);
        setFilteredHistorico([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [vendorId, vendorLoading, vendorData]);

  useEffect(() => {
    let filtered = historico;
    
    if (filterType !== 'todos') {
      filtered = filtered.filter(item => item.tipo === filterType);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.acao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.rifaTitulo?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredHistorico(filtered);
  }, [searchTerm, filterType, historico]);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'sucesso': return 'bg-green-100 text-green-800';
      case 'erro': return 'bg-red-100 text-red-800';
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'rifa': return 'bg-blue-100 text-blue-800';
      case 'pagamento': return 'bg-green-100 text-green-800';
      case 'compra': return 'bg-purple-100 text-purple-800';
      case 'sistema': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <History size={24} />
          <span>Histórico - {vendorInfo?.name}</span>
        </div>
        <Button className="flex items-center gap-2 bg-verde-500 hover:bg-verde-600">
          <Download size={16} />
          Exportar
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Filtre o histórico por tipo ou busque por ação específica</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar no histórico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="todos">Todos os tipos</option>
              <option value="rifa">Rifas</option>
              <option value="pagamento">Pagamentos</option>
              <option value="compra">Compras</option>
              <option value="sistema">Sistema</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Atividades</CardTitle>
          <CardDescription>
            Acompanhe todas as atividades da sua conta ({filteredHistorico.length} registros)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500">Carregando histórico...</div>
            </div>
          ) : filteredHistorico.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'Nenhuma atividade encontrada' : 'Nenhuma atividade registrada ainda'}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHistorico.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getTipoColor(item.tipo)}>
                          {item.tipo.charAt(0).toUpperCase() + item.tipo.slice(1)}
                        </Badge>
                        {item.status && (
                          <Badge className={getStatusColor(item.status)}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </Badge>
                        )}
                        <span className="text-sm text-gray-500">
                          {new Date(item.data).toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <h3 className="font-medium">{item.acao}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.descricao}</p>
                      {item.rifaTitulo && (
                        <p className="text-sm text-blue-600 mt-1">Rifa: {item.rifaTitulo}</p>
                      )}
                    </div>
                    {item.valor && (
                      <div className="text-right">
                        <div className="font-medium text-lg">
                          R$ {item.valor.toLocaleString('pt-BR')}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
