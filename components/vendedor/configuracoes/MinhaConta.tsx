import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VendorData {
    nome?: string;
    sobrenome?: string;
    email?: string;
    celular?: string;
    usuario?: string;
    avatar?: string;
}

interface MinhaContaProps {
    vendorData?: VendorData;
    vendorId?: string;
}

export default function MinhaConta({ vendorData, vendorId }: MinhaContaProps) {
    const [formData, setFormData] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        telefone: "",
        usuario: "",
        codigoPais: "+55",
        avatar: undefined as File | undefined,
    });
    const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    // Load vendor data when component mounts or vendorData changes
    useEffect(() => {
        if (vendorData) {
            setFormData({
                nome: vendorData.nome || "",
                sobrenome: vendorData.sobrenome || "",
                email: vendorData.email || "",
                telefone: vendorData.celular || "",
                usuario: vendorData.usuario || "",
                codigoPais: "+55",
                avatar: undefined,
            });

            if (vendorData.avatar) {
                setAvatarPreview(vendorData.avatar);
            }
        }
    }, [vendorData]);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({ ...prev, avatar: file }));
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!vendorId) return;

        setLoading(true);
        try {
            const response = await fetch(`/api/vendedor/${vendorId}/conta`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Erro ao salvar dados");
            alert("Dados salvos com sucesso!");
        } catch (err) {
            alert("Erro ao salvar dados.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-stone-100 p-0 m-0 flex flex-col items-center">
            <Card className="p-6 mb-0 rounded-b-none bg-white shadow w-full max-w-2xl">
                <div className="flex mb-6">
                    <div className="flex flex-col items-start relative" style={{ minWidth: "9.5rem" }}>
                        <label htmlFor="avatar-upload" className="cursor-pointer block">
                            <div className="w-36 h-36 rounded-full overflow-hidden bg-gray-200 mb-2 flex items-center justify-center relative">
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar"
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <span className="text-gray-400">Sem imagem</span>
                                )}
                            </div>
                            {/* Ícone de edição ajustado para fora da imagem, sempre visível */}
                            <span
                                className="absolute z-10 text-xs font-medium"
                                style={{
                                    right: '-12px',
                                    bottom: '10px',
                                    background: '#fff',
                                    borderRadius: '9999px',
                                    padding: '6px 12px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                    border: '1px solid #e5e7eb',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                Editar
                            </span>
                        </label>
                        <Input
                            type="file"
                            accept="image/*"
                            id="avatar-upload"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                        {/* Removido o botão/label separado para alterar imagem */}
                    </div>
                </div>
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
                                <SelectTrigger className="w-20">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="+55">+55</SelectItem>
                                    <SelectItem value="+1">+1</SelectItem>
                                    <SelectItem value="+44">+44</SelectItem>
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

                    {/* Alteração de senha */}
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="senha-atual">Senha atual</Label>
                            <Input
                                id="senha-atual"
                                type="password"
                                placeholder="Digite sua senha atual"
                            />
                        </div>
                        <div>
                            <Label htmlFor="nova-senha">Nova senha</Label>
                            <Input
                                id="nova-senha"
                                type="password"
                                placeholder="Digite sua nova senha"
                            />
                        </div>
                        <div>
                            <Label htmlFor="confirmar-senha">Confirmar nova senha</Label>
                            <Input
                                id="confirmar-senha"
                                type="password"
                                placeholder="Confirme sua nova senha"
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full md:w-auto" disabled={loading}>
                        {loading ? 'Salvando...' : 'Salvar alterações'}
                    </Button>
                </form>
            </Card>
        </div>
    );
}

