// app/vendedor/configuracoes/page.tsx

"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function ConfiguracoesPage() {
  const [formData, setFormData] = useState({
    nome: "vitória",
    sobrenome: "silva",
    email: "vitoriasenha18@gmail.com",
    telefone: "",
    usuario: "",
    codigoPais: "BR",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para salvar alterações
    console.log("Dados salvos:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Seção da Conta */}
      <Card className="p-6 mb-6">
        <h1 className="text-2xl font-bold mb-6">Conta</h1>

        {/* Foto do Perfil */}
        <div className="mb-8">
          <Label className="block mb-4">Foto</Label>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-600">V</span>
            </div>
            <Button variant="outline">Alterar</Button>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome e Sobrenome */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>Nome</Label>
              <Input
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />
            </div>
            <div>
              <Label>Sobrenome</Label>
              <Input
                value={formData.sobrenome}
                onChange={(e) => setFormData({ ...formData, sobrenome: e.target.value })}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input
              value={formData.email}
              disabled
            />
          </div>

          {/* Telefone */}
          <div>
            <Label>Número de celular</Label>
            <div className="flex gap-2">
              <Select
                value={formData.codigoPais}
                onValueChange={(value) => setFormData({ ...formData, codigoPais: value })}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="País" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BR">BR</SelectItem>
                  <SelectItem value="US">US</SelectItem>
                  <SelectItem value="PT">PT</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Número"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              />
            </div>
          </div>

          {/* Nome de Usuário */}
          <div>
            <Label>Nome de usuário</Label>
            <Input
              value={formData.usuario}
              onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
            />
          </div>

          <Button type="submit" className="w-full md:w-auto">
            Salvar alterações
          </Button>
        </form>
      </Card>

      {/* Seção de Exclusão de Conta */}
      <Card className="p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-destructive">Excluir conta</h2>
          <p className="text-sm text-muted-foreground">
            Esta ação é irreversível. Todos os seus dados serão permanentemente removidos.
          </p>
          <Button variant="destructive" className="w-full md:w-auto">
            Excluir conta permanentemente
          </Button>
        </div>
      </Card>
    </div>
  );
}