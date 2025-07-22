// app/vendedor/configuracoes/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useVendorContext } from "@/app/vendedor/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings, User, CreditCard, Bell, Shield, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Configuracoes() {
  const { vendorInfo, vendorData, vendorId, loading: vendorLoading } = useVendorContext();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    celular: '',
    cidade: '',
    cep: '',
    pixChave: '',
    banco: '',
    agencia: '',
    conta: '',
    titular: '',
    notificacaoEmail: true,
    notificacaoWhatsapp: true,
    notificacaoSms: false,
    exibirNome: true,
    exibirContato: true,
    instagram: '',
    facebook: '',
    whatsapp: '',
    youtube: ''
  });

  useEffect(() => {
    if (vendorData) {
      setFormData({
        nome: vendorData.nome || '',
        sobrenome: vendorData.sobrenome || '',
        email: vendorData.email || '',
        celular: vendorData.celular || '',
        cidade: vendorData.cidade || '',
        cep: vendorData.cep || '',
        pixChave: vendorData.configuracoes?.pagamentos?.pixChave || '',
        banco: vendorData.configuracoes?.pagamentos?.dadosBancarios?.banco || '',
        agencia: vendorData.configuracoes?.pagamentos?.dadosBancarios?.agencia || '',
        conta: vendorData.configuracoes?.pagamentos?.dadosBancarios?.conta || '',
        titular: vendorData.configuracoes?.pagamentos?.dadosBancarios?.titular || '',
        notificacaoEmail: vendorData.configuracoes?.notificacoes?.email ?? true,
        notificacaoWhatsapp: vendorData.configuracoes?.notificacoes?.whatsapp ?? true,
        notificacaoSms: vendorData.configuracoes?.notificacoes?.sms ?? false,
        exibirNome: vendorData.configuracoes?.privacidade?.exibirNome ?? true,
        exibirContato: vendorData.configuracoes?.privacidade?.exibirContato ?? true,
        instagram: vendorData.redesSociais?.instagram || '',
        facebook: vendorData.redesSociais?.facebook || '',
        whatsapp: vendorData.redesSociais?.whatsapp || '',
        youtube: vendorData.redesSociais?.youtube || ''
      });
    }
  }, [vendorData]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/vendedor/${vendorId}/configuracoes`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Configurações salvas com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      alert('Erro ao salvar configurações');
    } finally {
      setLoading(false);
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
          <Settings size={24} />
          <span>Configurações - {vendorInfo?.name}</span>
        </div>
        <Button onClick={handleSave} disabled={loading} className="bg-verde-500 hover:bg-verde-600">
          <Save size={16} className="mr-2" />
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </div>

      <Tabs defaultValue="perfil" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="privacidade">Privacidade</TabsTrigger>
        </TabsList>

        <TabsContent value="perfil">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User size={20} />
                Informações Pessoais
              </CardTitle>
              <CardDescription>
                Atualize suas informações pessoais e de contato
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="sobrenome">Sobrenome</Label>
                  <Input
                    id="sobrenome"
                    value={formData.sobrenome}
                    onChange={(e) => setFormData({ ...formData, sobrenome: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="celular">Celular</Label>
                  <Input
                    id="celular"
                    value={formData.celular}
                    onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    value={formData.cidade}
                    onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    value={formData.cep}
                    onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Redes Sociais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      placeholder="@usuario"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={formData.facebook}
                      onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input
                      id="whatsapp"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="youtube">YouTube</Label>
                    <Input
                      id="youtube"
                      value={formData.youtube}
                      onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pagamentos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard size={20} />
                Dados de Pagamento
              </CardTitle>
              <CardDescription>
                Configure suas informações de recebimento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="pixChave">Chave PIX</Label>
                <Input
                  id="pixChave"
                  placeholder="CPF, telefone, email ou chave aleatória"
                  value={formData.pixChave}
                  onChange={(e) => setFormData({ ...formData, pixChave: e.target.value })}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Dados Bancários</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="banco">Banco</Label>
                    <Input
                      id="banco"
                      value={formData.banco}
                      onChange={(e) => setFormData({ ...formData, banco: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="agencia">Agência</Label>
                    <Input
                      id="agencia"
                      value={formData.agencia}
                      onChange={(e) => setFormData({ ...formData, agencia: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="conta">Conta</Label>
                    <Input
                      id="conta"
                      value={formData.conta}
                      onChange={(e) => setFormData({ ...formData, conta: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="titular">Titular</Label>
                    <Input
                      id="titular"
                      value={formData.titular}
                      onChange={(e) => setFormData({ ...formData, titular: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell size={20} />
                Preferências de Notificação
              </CardTitle>
              <CardDescription>
                Configure como deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Notificações por Email</Label>
                  <p className="text-sm text-gray-500">Receba atualizações por email</p>
                </div>
                <Switch
                  checked={formData.notificacaoEmail}
                  onCheckedChange={(checked) => setFormData({ ...formData, notificacaoEmail: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Notificações por WhatsApp</Label>
                  <p className="text-sm text-gray-500">Receba mensagens no WhatsApp</p>
                </div>
                <Switch
                  checked={formData.notificacaoWhatsapp}
                  onCheckedChange={(checked) => setFormData({ ...formData, notificacaoWhatsapp: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Notificações por SMS</Label>
                  <p className="text-sm text-gray-500">Receba SMS para atualizações importantes</p>
                </div>
                <Switch
                  checked={formData.notificacaoSms}
                  onCheckedChange={(checked) => setFormData({ ...formData, notificacaoSms: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacidade">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield size={20} />
                Configurações de Privacidade
              </CardTitle>
              <CardDescription>
                Controle quais informações são exibidas publicamente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Exibir Nome Publicamente</Label>
                  <p className="text-sm text-gray-500">Seu nome será exibido nas rifas</p>
                </div>
                <Switch
                  checked={formData.exibirNome}
                  onCheckedChange={(checked) => setFormData({ ...formData, exibirNome: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Exibir Informações de Contato</Label>
                  <p className="text-sm text-gray-500">Email e telefone serão visíveis</p>
                </div>
                <Switch
                  checked={formData.exibirContato}
                  onCheckedChange={(checked) => setFormData({ ...formData, exibirContato: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}