"use client";

import { useState, useEffect } from "react";
import { useVendorContext } from "@/app/vendedor/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  Send,
  Book,
  Video,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Suporte() {
  const { vendorInfo, vendorData, vendorId } = useVendorContext();
  const [ticketForm, setTicketForm] = useState({
    assunto: "",
    categoria: "geral",
    descricao: "",
    prioridade: "media",
  });
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const whatsappUrl =
    "https://wa.me/5511983282956?text=Ol%C3%A1!%20Preciso%20de%20suporte%20com%20o%20sistema%20de%20rifas.%20Poderia%20me%20ajudar%3F";

  const redirectToWhatsApp = () => {
    try {
      window.location.href = whatsappUrl;
    } catch (error) {
      console.error("Erro ao redirecionar para WhatsApp:", error);
      window.open(whatsappUrl, "_blank");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsRedirecting(true);
          setTimeout(() => {
            redirectToWhatsApp();
          }, 500);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [whatsappUrl]);

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/suporte/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...ticketForm,
          vendorId,
          vendorEmail: vendorInfo?.email,
          vendorName: vendorInfo?.name,
        }),
      });

      if (response.ok) {
        alert(
          "Ticket enviado com sucesso! Nossa equipe entrará em contato em breve."
        );
        setTicketForm({
          assunto: "",
          categoria: "geral",
          descricao: "",
          prioridade: "media",
        });
      }
    } catch (error) {
      console.error("Erro ao enviar ticket:", error);
      alert("Erro ao enviar ticket. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const faqItems = [
    {
      pergunta: "Como criar minha primeira rifa?",
      resposta:
        "Acesse a seção 'Criar Rifa' no menu lateral, preencha as informações necessárias como título, descrição, prêmio e valor dos números. Após revisar, publique sua rifa.",
    },
    {
      pergunta: "Como recebo os pagamentos?",
      resposta:
        "Configure suas informações de pagamento em 'Configurações > Pagamentos'. Você pode receber via PIX ou transferência bancária.",
    },
    {
      pergunta: "Posso editar uma rifa após publicar?",
      resposta:
        "Você pode editar informações como descrição e imagens, mas não pode alterar o valor ou quantidade de números após a primeira venda.",
    },
    {
      pergunta: "Como funciona o sorteio?",
      resposta:
        "O sorteio é realizado conforme a modalidade escolhida (loteria federal, manual, etc.). Você pode transmitir ao vivo para maior transparência.",
    },
  ];

  return (
    <div className="absolute top-20 left-8 md:top-16 md:left-72 w-[70%] overflow-x-hidden">
      <div className="flex items-center gap-2 text-lg font-semibold mb-6">
        <HelpCircle size={24} />
        <span>Suporte - {vendorInfo?.name}</span>
      </div>

      <Tabs defaultValue="contato" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contato">Contato</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="tutoriais">Tutoriais</TabsTrigger>
          <TabsTrigger value="ticket">Abrir Ticket</TabsTrigger>
        </TabsList>

        <TabsContent value="contato">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle size={20} />
                  WhatsApp
                </CardTitle>
                <CardDescription>
                  Fale conosco diretamente pelo WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Atendimento de segunda a sexta, das 8h às 18h
                </p>
                <Button
                  onClick={redirectToWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600"
                >
                  <MessageCircle size={16} className="mr-2" />
                  Abrir WhatsApp
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail size={20} />
                  Email
                </CardTitle>
                <CardDescription>Envie sua dúvida por email</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Email:</strong> suporte@rifasolidaria.com
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Resposta em até 24 horas
                </p>
                <Button variant="outline" className="w-full">
                  <Mail size={16} className="mr-2" />
                  Enviar Email
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone size={20} />
                  Telefone
                </CardTitle>
                <CardDescription>Suporte por telefone</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Telefone:</strong> (22) 99967-9484
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Atendimento de segunda a sexta, das 8h às 18h
                </p>
                <Button variant="outline" className="w-full">
                  <Phone size={16} className="mr-2" />
                  Ligar Agora
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Horários de Atendimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Segunda a Sexta:</span>
                    <span>8h às 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado:</span>
                    <span>8h às 12h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo:</span>
                    <span>Fechado</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
              <CardDescription>
                Encontre respostas para as dúvidas mais comuns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b pb-4">
                    <h3 className="font-medium mb-2">{item.pergunta}</h3>
                    <p className="text-sm text-gray-600">{item.resposta}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutoriais">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video size={20} />
                  Vídeo Tutoriais
                </CardTitle>
                <CardDescription>
                  Aprenda assistindo nossos tutoriais em vídeo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Video size={16} className="mr-2" />
                    Como criar sua primeira rifa
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Video size={16} className="mr-2" />
                    Configurando pagamentos
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Video size={16} className="mr-2" />
                    Gerenciando vendas
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Video size={16} className="mr-2" />
                    Realizando sorteios
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book size={20} />
                  Guias Escritos
                </CardTitle>
                <CardDescription>
                  Documentação detalhada e guias passo a passo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Book size={16} className="mr-2" />
                    Manual do vendedor
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Book size={16} className="mr-2" />
                    Boas práticas de venda
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Book size={16} className="mr-2" />
                    Políticas e termos
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Book size={16} className="mr-2" />
                    Dicas de marketing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ticket">
          <Card>
            <CardHeader>
              <CardTitle>Abrir Ticket de Suporte</CardTitle>
              <CardDescription>
                Descreva sua dúvida ou problema e nossa equipe entrará em contato
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="assunto">Assunto</Label>
                    <Input
                      id="assunto"
                      required
                      value={ticketForm.assunto}
                      onChange={(e) =>
                        setTicketForm({ ...ticketForm, assunto: e.target.value })
                      }
                      placeholder="Resumo do problema"
                    />
                  </div>
                  <div>
                    <Label htmlFor="categoria">Categoria</Label>
                    <select
                      id="categoria"
                      required
                      value={ticketForm.categoria}
                      onChange={(e) =>
                        setTicketForm({ ...ticketForm, categoria: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="geral">Geral</option>
                      <option value="tecnico">Problema Técnico</option>
                      <option value="pagamento">Pagamentos</option>
                      <option value="rifa">Rifas</option>
                      <option value="conta">Conta</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="prioridade">Prioridade</Label>
                  <select
                    id="prioridade"
                    value={ticketForm.prioridade}
                    onChange={(e) =>
                      setTicketForm({ ...ticketForm, prioridade: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                    <option value="urgente">Urgente</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    required
                    rows={6}
                    value={ticketForm.descricao}
                    onChange={(e) =>
                      setTicketForm({ ...ticketForm, descricao: e.target.value })
                    }
                    placeholder="Descreva detalhadamente sua dúvida ou problema..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-verde-500 hover:bg-verde-600"
                >
                  <Send size={16} className="mr-2" />
                  {loading ? "Enviando..." : "Enviar Ticket"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 mt-8">
        <p className="text-gray-700 mb-4">
          Você será redirecionado automaticamente para nosso WhatsApp em:
        </p>
        <div className="text-4xl font-bold text-green-600 mb-4">
          {countdown}
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Uma mensagem automática será enviada para agilizar o atendimento.
        </p>
      </div>
    </div>
  );
}
