'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon, Plus, Trash } from 'lucide-react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

type Prize = {
  name: string
  description: string
  image?: File
}

interface CriaRifaDialogProps {
  open: boolean```javascript
// Validações básicas
if (step === 1 && !title) {
  alert('Preencha o título da rifa')
  return
}

// Validações adicionais
if (step === 1 && !numberOfTickets) {
  alert('Selecione a quantidade de números')
  return
}

if (step === 1 && !drawDate) {
  alert('Selecione a data e hora do sorteio')
  return
}

if (step === 2 && prizes.some(prize => !prize.name || !prize.description)) {
  alert('Preencha todos os campos dos prêmios')
  return
}

if (step === 3 && !ticketPrice) {
  alert('Preencha o valor por número')
  return
}

if (step === 3 && !reservationTime) {
  alert('Selecione o tempo para reserva')
  return
}

setStep(step + 1)
```
  onOpenChange: (open: boolean) => void
}

export function CriaRifaDialog({ open, onOpenChange }: CriaRifaDialogProps) {
  const [step, setStep] = useState(1)
  const [title, setTitle] = useState('')
  const [numberOfTickets, setNumberOfTickets] = useState('50')
  const [drawDate, setDrawDate] = useState<Date>()
  const [prizes, setPrizes] = useState<Prize[]>([{ name: '', description: '' }])
  const [ticketPrice, setTicketPrice] = useState('')
  const [reservationTime, setReservationTime] = useState('12')

  const handleAddPrize = () => {
    setPrizes([...prizes, { name: '', description: '' }])
  }

  const handlePrizeChange = (
    index: number,
    field: 'name' | 'description',
    value: string
  ) => {
    const newPrizes = [...prizes]
    newPrizes[index][field] = value
    setPrizes(newPrizes)
  }

  const handleImageUpload = (index: number, file: File) => {
    const newPrizes = [...prizes]
    newPrizes[index].image = file
    setPrizes(newPrizes)
  }

  const validateStep = () => {
    // Validações básicas
    if (step === 1 && !title) {
      alert('Preencha o título da rifa')
      return
    }
    setStep(step + 1)
  }

  const handleOpenChangeWrapper = (isOpen: boolean) => {
    onOpenChange(isOpen)
    if (!isOpen) {
      setStep(1)
      setTitle('')
      setNumberOfTickets('50')
      setDrawDate(undefined)
      setPrizes([{ name: '', description: '' }])
      setTicketPrice('')
      setReservationTime('12')
    }
  }

  const handleSubmit = () => {
    const raffleData = {
      title,
      numberOfTickets: Number(numberOfTickets),
      drawDate,
      prizes: prizes.map(prize => ({
        ...prize,
        image: prize.image?.name || ''
      })),
      ticketPrice: parseFloat(ticketPrice),
      reservationTime: Number(reservationTime)
    }
    
    console.log('Dados da Rifa:', raffleData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChangeWrapper}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Nova Rifa</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <Label>Título da Rifa</Label>
                <Input
                  placeholder="Digite o título da rifa"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <Label>Quantidade de Números</Label>
                <select
                  className="flex h-10 w-full mt-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={numberOfTickets}
                  onChange={(e) => setNumberOfTickets(e.target.value)}
                >
                  {[25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 2000, 5000, 10000, 20000, 200000, 300000, 500000, 1000000].map((num) => (
                    <option key={num} value={num}>
                      {num.toLocaleString('pt-BR')} Números
                    </option>
                  ))}
                  <option value="fazendinha">Fazendinha</option>
                </select>
              </div>

              <div className="space-y-3">
                <Label>Data e Hora do Sorteio</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {drawDate ? format(drawDate, 'dd/MM/yyyy HH:mm') : 'Selecione a data'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={drawDate}
                      onSelect={setDrawDate}
                      disabled={(date) => date < new Date()}
                    />
                    <Input
                      type="time"
                      className="mt-2"
                      value={drawDate?.toTimeString().slice(0, 5) || ''}
                      onChange={(e) => {
                        const [hours, minutes] = e.target.value.split(':')
                        const newDate = drawDate ? new Date(drawDate) : new Date()
                        newDate.setHours(Number(hours))
                        newDate.setMinutes(Number(minutes))
                        setDrawDate(newDate)
                      }}
                      disabled={!drawDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {prizes.map((prize, index) => (
                <div key={index} className="space-y-4 border p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <Label>Prêmio {index + 1}</Label>
                    {index > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPrizes(prizes.filter((_, i) => i !== index))}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <Input
                    placeholder="Nome do prêmio"
                    value={prize.name}
                    onChange={(e) => handlePrizeChange(index, 'name', e.target.value)}
                  />

                  <Input
                    placeholder="Descrição"
                    value={prize.description}
                    onChange={(e) => handlePrizeChange(index, 'description', e.target.value)}
                  />

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(index, e.target.files[0])}
                  />
                </div>
              ))}

              <Button variant="outline" onClick={handleAddPrize}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Prêmio
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <Label>Valor por Número</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(e.target.value)}
                  placeholder="Ex: 10.00"
                />
              </div>

              <div>
                <Label>Tempo para Reserva</Label>
                <select
                  className="custom-select"
                  value={reservationTime}
                  onChange={(e) => setReservationTime(e.target.value)}
                >
                  {[1, 2, 6, 12, 24].map((hours) => (
                    <option key={hours} value={hours}>
                      {hours} hora{hours > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Voltar
              </Button>
            )}

            {step < 3 ? (
              <Button className="ml-auto" onClick={validateStep}>
                Próximo
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Criar Rifa
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}