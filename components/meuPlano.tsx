import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Check, X, Star, CreditCard, Zap } from "lucide-react";

export default function MeuPlano() {
    const [planoAtual, setPlanoAtual] = useState<"padrao" | "premium">("padrao");
    const [showUpgrade, setShowUpgrade] = useState(false);

    const planos = {
        padrao: {
            nome: "Plano Padrão",
            preco: "R$ 0,00",
            periodo: "Grátis",
            descricao: "Pague apenas quando criar, com taxas que diminuem conforme sua ambição",
            cor: "bg-green-50 border-green-200",
            corTexto: "text-green-800",
            corBadge: "bg-green-100 text-green-800",
            icone: <Check className="h-5 w-5" />,
            beneficios: [
                "Rifas ilimitadas",
                "Taxa de 2% (até 1.000 números)",
                "Taxa de 1.5% (até 10.000 números)",
                "Taxa de 1% (acima de 10.000)",
                "Suporte básico",
                "Relatórios simples"
            ]
        },
        premium: {
            nome: "Plano Premium",
            preco: "R$ 49,90",
            periodo: "por mês",
            descricao: "Pague uma mensalidade fixa e fique isento de taxas",
            cor: "bg-blue-50 border-blue-200",
            corTexto: "text-blue-800",
            corBadge: "bg-blue-100 text-blue-800",
            icone: <Star className="h-5 w-5" />,
            beneficios: [
                "Rifas ilimitadas",
                "0% de taxas por criação",
                "Suporte prioritário",
                "Relatórios avançados",
                "Personalização avançada",
                "Analytics detalhados",
                "Backup automático",
                "Integração com redes sociais"
            ]
        }
    };

    const handleUpgrade = () => {
        setShowUpgrade(true);
        // Aqui seria implementada a lógica de upgrade
        setTimeout(() => {
            alert("Redirecionando para o pagamento...");
            setShowUpgrade(false);
        }, 2000);
    };

    const handleDowngrade = () => {
        if (window.confirm("Tem certeza que deseja fazer downgrade para o plano padrão? Você perderá os benefícios premium.")) {
            setPlanoAtual("padrao");
            alert("Plano alterado para Padrão com sucesso!");
        }
    };

    return (
        <div className="bg-stone-100 p-6 m-0 flex flex-col items-center space-y-6">
            {/* Plano Atual */}
            <Card className={`p-6 w-full max-w-2xl ${planos[planoAtual].cor} border-2`}>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${planos[planoAtual].corBadge}`}>
                            {planos[planoAtual].icone}
                        </div>
                        <div>
                            <h2 className={`text-xl font-bold ${planos[planoAtual].corTexto}`}>
                                {planos[planoAtual].nome}
                            </h2>
                            <p className="text-gray-600">Plano atual</p>
                        </div>
                    </div>
                    <Badge className={planos[planoAtual].corBadge}>
                        Ativo
                    </Badge>
                </div>

                <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                        <span className={`text-3xl font-bold ${planos[planoAtual].corTexto}`}>
                            {planos[planoAtual].preco}
                        </span>
                        <span className="text-gray-600">
                            {planos[planoAtual].periodo}
                        </span>
                    </div>
                    <p className="text-gray-600 mt-2">
                        {planos[planoAtual].descricao}
                    </p>
                </div>

                <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800">Benefícios inclusos:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {planos[planoAtual].beneficios.map((beneficio, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                <span className="text-sm text-gray-700">{beneficio}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Estatísticas de uso */}
                <div className="mt-6 p-4 bg-white rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-3">Estatísticas do mês</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-2xl font-bold text-green-600">12</p>
                            <p className="text-sm text-gray-600">Rifas criadas</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-blue-600">R$ 2.450</p>
                            <p className="text-sm text-gray-600">Arrecadado</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-purple-600">R$ 49,00</p>
                            <p className="text-sm text-gray-600">Taxas pagas</p>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Comparação de Planos */}
            <Card className="p-6 w-full max-w-2xl">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Comparar Planos</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(planos).map(([key, plano]) => (
                        <div
                            key={key}
                            className={`p-4 rounded-lg border-2 transition-all ${planoAtual === key
                                    ? `${plano.cor} border-opacity-100`
                                    : "bg-gray-50 border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <div className={`p-2 rounded-full ${plano.corBadge}`}>
                                    {plano.icone}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">{plano.nome}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-lg font-bold text-gray-800">{plano.preco}</span>
                                        <span className="text-sm text-gray-600">{plano.periodo}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 mb-4">
                                {plano.beneficios.map((beneficio, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Check className="h-3 w-3 text-green-500" />
                                        <span className="text-xs text-gray-700">{beneficio}</span>
                                    </div>
                                ))}
                            </div>

                            {planoAtual !== key && (
                                <Button
                                    className="w-full"
                                    variant={key === "premium" ? "default" : "outline"}
                                    onClick={() => key === "premium" ? handleUpgrade() : handleDowngrade()}
                                    disabled={showUpgrade}
                                >
                                    {showUpgrade && key === "premium" ? (
                                        <>
                                            <Zap className="h-4 w-4 mr-2 animate-spin" />
                                            Processando...
                                        </>
                                    ) : (
                                        <>
                                            {key === "premium" ? (
                                                <>
                                                    <CreditCard className="h-4 w-4 mr-2" />
                                                    Fazer Upgrade
                                                </>
                                            ) : (
                                                "Fazer Downgrade"
                                            )}
                                        </>
                                    )}
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Histórico de Pagamentos */}
            <Card className="p-6 w-full max-w-2xl">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Histórico de Pagamentos</h2>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-800">Taxas de Dezembro</p>
                            <p className="text-sm text-gray-600">15/12/2024</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-gray-800">R$ 49,00</p>
                            <Badge className="bg-green-100 text-green-800">Pago</Badge>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-800">Taxas de Novembro</p>
                            <p className="text-sm text-gray-600">15/11/2024</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-gray-800">R$ 32,50</p>
                            <Badge className="bg-green-100 text-green-800">Pago</Badge>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-800">Taxas de Outubro</p>
                            <p className="text-sm text-gray-600">15/10/2024</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-gray-800">R$ 28,75</p>
                            <Badge className="bg-green-100 text-green-800">Pago</Badge>
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                    <Button variant="outline" className="w-full">
                        Ver histórico completo
                    </Button>
                </div>
            </Card>

            {/* Ajuda */}
            <Card className="p-6 w-full max-w-2xl bg-green-50 border-green-200">
                <h2 className="text-xl font-bold text-green-800 mb-4">Precisa de ajuda?</h2>
                <p className="text-green-700 mb-4">
                    Tem dúvidas sobre os planos ou precisa de suporte? Nossa equipe está aqui para ajudar!
                </p>
                <div className="flex justify-start">
                    <Button
                        className="w-full md:w-auto transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        onClick={() => {
                            const whatsappUrl = "https://wa.me/5511983282956?text=Ol%C3%A1!%20Preciso%20de%20suporte%20com%20o%20sistema%20de%20rifas.%20Poderia%20me%20ajudar%3F";
                            try {
                                window.location.href = whatsappUrl;
                            } catch (error) {
                                console.error('Erro ao redirecionar para WhatsApp:', error);
                                window.open(whatsappUrl, '_blank');
                            }
                        }}
                    >
                        Falar com Suporte
                    </Button>
                </div>
            </Card>
        </div>
    );
}
