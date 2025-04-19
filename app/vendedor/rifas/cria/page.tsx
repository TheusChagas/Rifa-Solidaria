"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CreateCampaignPage() {
  return (
    <div className="container max-w-2xl py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Criar Rifa</h1>
        <p className="text-muted-foreground mb-8">
          Insira os dados de como deseja a sua rifa abaixo
        </p>

        <div className="space-y-8">
          {/* Seção Título */}
          <div>
            <Label className="font-bold block mb-4">Título</Label>
            <Input 
              placeholder="Digite o título da sua campanha" 
              className="text-lg py-6"
            />
          </div>

          {/* Tabela de Cotas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block mb-2">Quantidade de números</Label>
              <Select defaultValue="option">
                <SelectTrigger className="w-full pl-8 py-6 ">
                  <SelectValue placeholder="Escolha uma opção"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option25">25 números</SelectItem>
                  <SelectItem value="option50">50 números</SelectItem>
                  <SelectItem value="option100">100 números</SelectItem>
                  <SelectItem value="option200">200 números</SelectItem>
                  <SelectItem value="option300">300 números</SelectItem>
                  <SelectItem value="option400">400 números</SelectItem>
                  <SelectItem value="option500">500 números</SelectItem>
                  <SelectItem value="option600">600 números</SelectItem>
                  <SelectItem value="option700">700 números</SelectItem>
                  <SelectItem value="option800">800 números</SelectItem>
                  <SelectItem value="option900">900 números</SelectItem>
                  <SelectItem value="option1000">1.000 números</SelectItem>
                  <SelectItem value="option2000">2.000 números</SelectItem>
                  <SelectItem value="option3000">3.000 números</SelectItem>
                  <SelectItem value="option4000">4.000 números</SelectItem>
                  <SelectItem value="option5000">5.000 números</SelectItem>
                  <SelectItem value="option6000">6.000 números</SelectItem>
                  <SelectItem value="option10000">10.000 números</SelectItem>
                  <SelectItem value="option20000">20.000 números</SelectItem>
                  <SelectItem value="option30000">30.000 números</SelectItem>
                  <SelectItem value="option50000">50.000 números</SelectItem>
                  <SelectItem value="option92000">92.000 números</SelectItem>
                  <SelectItem value="option96000">96.000 números</SelectItem>
                  <SelectItem value="option100000">100.000 números</SelectItem>
                  <SelectItem value="option500000">500.000 números</SelectItem>
                  <SelectItem value="option1000000">1.000.000 números</SelectItem>
                  <SelectItem value="option1500000">1.500.000 números</SelectItem>
                  <SelectItem value="option10000000">10.000.000 números</SelectItem>
                  <SelectItem value="fazendinha">Fazendinha</SelectItem>
                  
                  
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block mb-2">Valor da cota</Label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-muted-foreground">R$</span>
                <Input placeholder="0,00" className="pl-8 py-6 text-lg"/>
              </div>
            </div>
          </div>

          {/* Sorteio */}
          <div>
            <Label className="font-bold block mb-4">
              Por onde será feito o sorteio?
            </Label>
            <RadioGroup defaultValue="option" className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option" id="option" />
                <Label htmlFor="option">Escolha uma opção</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Número de celular */}
          <div>
            <Label className="block mb-2">Número de celular</Label>
            <Input placeholder="(00) 00000-0000" />
          </div>

          <Button className="w-full py-6 text-lg">Criar Campanha</Button>
        </div>
      </Card>
    </div>
  );
}