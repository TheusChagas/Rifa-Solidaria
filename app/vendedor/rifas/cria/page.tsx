"use client";
import { useState, useCallback } from "react";
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
import { Textarea } from "@/components/ui/textarea";

export default function CreateCampaignPage() {
  const [numPrizes, setNumPrizes] = useState(1);
  const [prizes, setPrizes] = useState<string[]>(['']);
  const [drawLocation, setDrawLocation] = useState('');
  const [drawTime, setDrawTime] = useState('');
  const [drawDate, setDrawDate] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [description, setDescription] = useState('');

  const drawOptions = [
    { value: 'CANTA GALO', label: 'CANTA GALO', time: '09:20' },
    { value: 'PTM', label: 'PTM', time: '11:20' },
    { value: 'PT', label: 'PT', time: '14:20' },
    { value: 'PTV', label: 'PTV', time: '16:20' },
    { value: 'PTN', label: 'PTN', time: '18:20' },
    { value: 'FEDERAL', label: 'FEDERAL', time: '19:00' },
    { value: 'CORUJINHA', label: 'CORUJINHA', time: '21:30' },
    { value: 'tiktok', label: 'TikTok', time: null },
    { value: 'instagram', label: 'Instagram', time: null },
    { value: 'youtube', label: 'YouTube', time: null },
    { value: 'outros', label: 'Outros', time: null },

  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newImages = Array.from(e.dataTransfer.files);
      setImages(prev => [...prev, ...newImages]);
    }
  }, []);

  const deleteImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

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
          {/* Seção Descricao */}
          <div>
            <Label className="font-bold block mb-4">Descrição</Label>
            <Textarea
              placeholder="Digite a descrição detalhada da sua campanha..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Tabela de Cotas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block mb-2">Quantidade de números</Label>
              <Select defaultValue="option">
                <SelectTrigger className="w-full pl-8 py-6">
                  <SelectValue placeholder="Escolha uma opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fazendinha">Fazendinha</SelectItem>
                  <SelectItem value="option100">100 números</SelectItem>
                  <SelectItem value="option1000">1.000 números</SelectItem>
                  <SelectItem value="option10000">10.000 números</SelectItem>
                  <SelectItem value="option100000">100.000 números</SelectItem>
                  <SelectItem value="option500000">Personalizados</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block mb-2">Valor da cota</Label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-muted-foreground">R$</span>
                <Input placeholder="0,00" className="pl-8 py-6 text-lg" />
              </div>
            </div>
          </div>

          {/* Sorteio */}
          <div>
            <Label className="font-bold block mb-4">
              Por onde será feito o sorteio?
            </Label>

            <Select
              value={drawLocation}
              onValueChange={(value) => {
                const selectedOption = drawOptions.find(opt => opt.value === value);
                setDrawLocation(value);
                setDrawTime(selectedOption?.time || '');
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Escolha uma opção" />
              </SelectTrigger>
              <SelectContent>
                {drawOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {drawLocation && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Label className="block mb-2">Horário do Sorteio</Label>
                  <Input
                    placeholder="Hora:Minuto"
                    value={drawTime}
                    onChange={(e) => setDrawTime(e.target.value)}
                    disabled={!!drawOptions.find(opt => opt.value === drawLocation)?.time}
                  />
                </div>

                <div>
                  <Label className="block mb-2">Data do Sorteio</Label>
                  <Input
                    type="date"
                    value={drawDate}
                    onChange={(e) => setDrawDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
            )}
          </div>

          {/* Prêmios */}
          <div>
            <Label className="font-bold block mb-4">Prêmios</Label>
            <div className="mb-4">
              <Label className="block mb-2">Quantidade de Prêmios</Label>
              <Input
                type="number"
                min="1"
                value={numPrizes}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 1) {
                    setNumPrizes(value);
                    setPrizes(prev => {
                      const newPrizes = [...prev];
                      while (newPrizes.length < value) {
                        newPrizes.push('');
                      }
                      return newPrizes.slice(0, value);
                    });
                  }
                }}
                placeholder="Digite a quantidade de prêmios"
              />
            </div>

            <div className="space-y-2">
              {prizes.map((prize, index) => (
                <Input
                  key={index}
                  value={prize}
                  onChange={(e) => {
                    const newPrizes = [...prizes];
                    newPrizes[index] = e.target.value;
                    setPrizes(newPrizes);
                  }}
                  placeholder={`Descrição do prêmio ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Seção de Imagens */}
          <div>
            <Label className="font-bold block mb-4">Imagens</Label>
            <div className="space-y-4">
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
                  ${dragActive ? "border-primary bg-primary/10" : "border-muted"}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Label
                    htmlFor="file-upload"
                    className="cursor-pointer font-medium text-primary underline"
                  >
                    Clique para selecionar
                  </Label>
                  <span className="text-muted-foreground">ou arraste e solte aqui</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => deleteImage(index)}
                      className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1
                        opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
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