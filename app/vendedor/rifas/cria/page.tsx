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
import { Rifa } from "@/types";

export default function CreateCampaignPage() {
  const [prizes, setPrizes] = useState<string[]>(['', '', '', '', '', '']);
  const [drawLocation, setDrawLocation] = useState('');
  const [drawTime, setDrawTime] = useState('');
  const [drawDate, setDrawDate] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [totalNumbers, setTotalNumbers] = useState<number>(100);
  const [preco, setPreco] = useState<number>(0);
  const [metodoPagamento, setMetodoPagamento] = useState('');
  const [disponivel, setDisponivel] = useState(true);
  const [saleMode, setSaleMode] = useState('');
  const [contatoNome, setContatoNome] = useState('');
  const [contatoTelefone, setContatoTelefone] = useState('');
  const [contatoAvatarUrl, setContatoAvatarUrl] = useState('');
  const [contatos, setContatos] = useState<{ nome: string; telefone: string; avatarUrl?: string }[]>([]);
  const [numerosVendidos, setNumerosVendidos] = useState<number[]>([]);
  const [canalTransmissao, setCanalTransmissao] = useState('');
  const [premio, setPremio] = useState<string | number>('');
  const [fazendinha, setFazendinha] = useState<boolean>(false); // novo estado

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

  function handleAddContato() {
    if (contatoNome && contatoTelefone) {
      setContatos(prev => [
        ...prev,
        { nome: contatoNome, telefone: contatoTelefone, avatarUrl: contatoAvatarUrl || undefined }
      ]);
      setContatoNome('');
      setContatoTelefone('');
      setContatoAvatarUrl('');
    }
  }

  function generateRandomId() {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Filtra apenas prêmios preenchidos
    const premiosAdicionais = prizes.filter(p => p.trim() !== "");
    // Monta objeto Rifa
    const rifa: Rifa = {
      id: generateRandomId(),
      titulo: title,
      descricao: description,
      metodoPagamento,
      disponivel,
      preco,
      totalNumbers,
      premio: premio || premiosAdicionais[0] || 0,
      saleMode,
      numerosVendidos,
      dataSorteio: drawDate ? new Date(`${drawDate}T${drawTime || "00:00"}`).toISOString() : "",
      canalTransmissao,
      contatos,
      imagens: images.map(img => URL.createObjectURL(img)),
      prêmios: premiosAdicionais,
      fazendinha,
      progresso: undefined
    };
    alert("Rifa criada!\n" + JSON.stringify(rifa, null, 2));
  }

  return (
    <div className="container max-w-2xl py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Criar Rifa</h1>
        <p className="text-muted-foreground mb-8">
          Insira os dados de como deseja a sua rifa abaixo
        </p>
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Título */}
          <div>
            <Label className="font-bold block mb-4">Título</Label>
            <Input
              placeholder="Digite o título da sua campanha"
              className="text-lg py-6"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          {/* Descrição */}
          <div>
            <Label className="font-bold block mb-4">Descrição</Label>
            <Textarea
              placeholder="Digite a descrição detalhada da sua campanha..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
              required
            />
          </div>
          {/* Total de Números */}
          <div>
            <Label className="block mb-2">Quantidade de números</Label>
            <Select
              value={totalNumbers.toString()}
              onValueChange={value => setTotalNumbers(Number(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a quantidade de números" />
              </SelectTrigger>
              <SelectContent>
                {[10, 50, 100, 200, 500, 1000, 5000, 10000].map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Valor da cota */}
          <div>
            <Label className="block mb-2">Valor da cota</Label>
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-muted-foreground">R$</span>
              <Input
                placeholder="0,00"
                className="pl-8 py-6 text-lg"
                type="number"
                min={0}
                value={preco}
                onChange={e => setPreco(Number(e.target.value))}
                required
              />
            </div>
          </div>
          {/* Prêmio principal */}
          <div>
            <Label className="block mb-2">Prêmio principal</Label>
            <Input
              placeholder="Ex: Bicicleta, 1000 reais"
              value={premio}
              onChange={e => setPremio(e.target.value)}
              required
            />
          </div>
          {/* Prêmios adicionais */}
          <div>
            <Label className="font-bold block mb-4">Prêmios adicionais</Label>
            <div className="grid grid-cols-2 gap-4">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <Input
                  key={index}
                  value={prizes[index] || ""}
                  onChange={e => {
                    const newPrizes = [...prizes];
                    newPrizes[index] = e.target.value;
                    setPrizes(newPrizes);
                  }}
                  placeholder={`Nome do prêmio adicional ${index + 1}`}
                  disabled={index > 0 && !prizes[index - 1].trim()}
                />
              ))}
            </div>
          </div>
          {/* Método de Pagamento */}
          <div>
            <Label className="block mb-2">Método de Pagamento</Label>
            <Input
              placeholder="Ex: Pix, Cartão"
              value={metodoPagamento}
              onChange={e => setMetodoPagamento(e.target.value)}
              required
            />
          </div>
          {/* Disponível e Fazendinha */}
          <div className="flex gap-4">
            <div>
              <Label className="block mb-2">Disponível?</Label>
              <select
                value={disponivel ? "sim" : "nao"}
                onChange={e => setDisponivel(e.target.value === "sim")}
                className="border rounded px-2 py-1"
              >
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </div>
            <div>
              <Label className="block mb-2">Rifa do tipo Fazendinha?</Label>
              <select
                value={fazendinha ? "sim" : "nao"}
                onChange={e => setFazendinha(e.target.value === "sim")}
                className="border rounded px-2 py-1"
              >
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </div>
          </div>
          {/* Sale Mode */}
          <div>
            <Label className="block mb-2">Modo de venda</Label>
            <Input
              placeholder="Ex: por número, por cota, a dezena"
              value={saleMode}
              onChange={e => setSaleMode(e.target.value)}
              required
            />
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
          {/* Canal de Transmissão */}
          <div>
            <Label className="block mb-2">Canal de Transmissão</Label>
            <Input
              placeholder="Ex: YouTube, Instagram, Facebook"
              value={canalTransmissao}
              onChange={e => setCanalTransmissao(e.target.value)}
              required
            />
          </div>
          {/* Números vendidos */}
          <div>
            <Label className="block mb-2">Números vendidos (separados por vírgula)</Label>
            <Input
              placeholder="Ex: 1,2,3"
              value={numerosVendidos.join(",")}
              onChange={e => setNumerosVendidos(
                e.target.value
                  .split(",")
                  .map(s => s.trim())
                  .filter(Boolean)
                  .map(Number)
                  .filter(n => !isNaN(n))
              )}
            />
          </div>
          {/* Contatos */}
          <div>
            <Label className="block mb-2">Contatos</Label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Nome"
                value={contatoNome}
                onChange={e => setContatoNome(e.target.value)}
              />
              <Input
                placeholder="Telefone"
                value={contatoTelefone}
                onChange={e => setContatoTelefone(e.target.value)}
              />
              <Input
                placeholder="Avatar URL (opcional)"
                value={contatoAvatarUrl}
                onChange={e => setContatoAvatarUrl(e.target.value)}
              />
              <Button type="button" onClick={handleAddContato}>Adicionar</Button>
            </div>
            <ul>
              {contatos.map((c, i) => (
                <li key={i}>{c.nome} - {c.telefone} {c.avatarUrl && `(${c.avatarUrl})`}</li>
              ))}
            </ul>
          </div>
          {/* Imagens */}
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
          <Button className="w-full py-6 text-lg" type="submit">Criar Campanha</Button>
        </form>
      </Card>
    </div>
  );
}