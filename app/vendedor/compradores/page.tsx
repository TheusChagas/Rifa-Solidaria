'use client'

import { useState, useEffect } from "react";
import { useVendorContext } from "@/app/vendedor/layout";
import { Button } from "@/components/ui/button";
import { Users, Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Comprador {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  cidade: string;
  estado: string;
  totalCompras: number;
  valorTotal: number;
  ultimaCompra: string;
  rifasParticipadas: string[];
}

export default function Compradores() {
  const [compradores, setCompradores] = useState<Comprador[]>([]);
  const [filteredCompradores, setFilteredCompradores] = useState<Comprador[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  const { vendorInfo, vendorData, vendorId, loading: vendorLoading } = useVendorContext();

  useEffect(() => {
    if (vendorLoading || !vendorId) return;

    setLoading(true);
    fetch(`/api/compradores?vendorId=${vendorId}`)
      .then(res => res.ok ? res.json() : [])
      .then((data: Comprador[]) => {
        setCompradores(data);
        setFilteredCompradores(data);
      })
      .catch(error => {
        console.error('Erro ao carregar compradores:', error);
        setCompradores([]);
        setFilteredCompradores([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [vendorId, vendorLoading]);

  useEffect(() => {
    const filtered = compradores.filter(comprador =>
      comprador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comprador.telefone.includes(searchTerm) ||
      comprador.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompradores(filtered);
  }, [searchTerm, compradores]);

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
        <Users size={24} />
        <span>Compradores - {vendorInfo?.name}</span>
      </div>

      {vendorData?.estatisticas && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-gray-500 text-sm">Total de Compradores</div>
            <div className="font-bold text-2xl">{compradores.length}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-gray-500 text-sm">Total de Vendas</div>
            <div className="font-bold text-2xl">{vendorData.estatisticas.totalVendas}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-gray-500 text-sm">Valor Arrecadado</div>
            <div className="font-bold text-2xl">R$ {vendorData.estatisticas.totalArrecadado?.toLocaleString('pt-BR')}</div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Lista de Compradores</h2>
          <Button className="flex items-center gap-2 bg-verde-500 hover:bg-verde-600">
            <Download size={16} />
            Exportar
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar por nome, telefone ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-500">Carregando compradores...</div>
          </div>
        ) : filteredCompradores.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? 'Nenhum comprador encontrado' : 'Nenhum comprador cadastrado ainda'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Nome</th>
                  <th className="text-left p-3">Contato</th>
                  <th className="text-left p-3">Localização</th>
                  <th className="text-left p-3">Compras</th>
                  <th className="text-left p-3">Valor Total</th>
                  <th className="text-left p-3">Última Compra</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompradores.map((comprador) => (
                  <tr key={comprador.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{comprador.nome}</td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div>{comprador.telefone}</div>
                        <div className="text-gray-500">{comprador.email}</div>
                      </div>
                    </td>
                    <td className="p-3 text-sm">{comprador.cidade}, {comprador.estado}</td>
                    <td className="p-3 text-center">{comprador.totalCompras}</td>
                    <td className="p-3 font-medium">R$ {comprador.valorTotal.toLocaleString('pt-BR')}</td>
                    <td className="p-3 text-sm">{new Date(comprador.ultimaCompra).toLocaleDateString('pt-BR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}