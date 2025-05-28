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

export default function MinhaConta() {
    const [formData, setFormData] = useState({
        nome: "vitória",
        sobrenome: "silva",
        email: "vitoriasenha18@gmail.com",
        telefone: "",
        usuario: "",
        codigoPais: "BR",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Exemplo de chamada para API de atualização de conta
            const res = await fetch("/api/conta", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error("Erro ao salvar dados");
            alert("Dados salvos com sucesso!");
        } catch (err) {
            alert("Erro ao salvar dados.");
        }
    };

    return (
        <div className="bg-stone-100 p-0 m-0 flex flex-col items-center">
            <Card className="p-6 mb-0 rounded-b-none bg-white shadow w-full max-w-2xl">
                <h1 className="text-2xl font-bold mb-6">Conta</h1>
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
            {/* Espaço entre os blocos para mostrar o bg da layout */}
            {/* <div className="h-16" /> */}
            {/* Bloco de exclusão de conta foi movido para page.tsx */}
        </div>
    );
}
