'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon, Plus, Trash } from 'lucide-react'

type Prize = {
  name: string
  description: string
  image?: File
}

type RaffleType = 'NUMERIC' | 'NAMES' | 'RANDOM'

export default function CreateRafflePage() {
  const [step, setStep] = useState(1)
  const [raffleType, setRaffleType] = useState<RaffleType>('NUMERIC')
  const [drawDate, setDrawDate] = useState<Date>()
  const [prizes, setPrizes] = useState<Prize[]>([{ name: '', description: '' }])
  const [ticketQuantity, setTicketQuantity] = useState('')
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
    // Adicione validações aqui
    setStep(step + 1)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Criar Nova Rifa</CardTitle>
        </CardHeader>

        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <Label>Tipo de Rifa</Label>
                <div className="flex gap-4 mt-2">
                  <Button
                    variant={raffleType === 'NUMERIC' ? 'default' : 'outline'}
                    onClick={() => setRaffleType('NUMERIC')}
                  >
                    Numérica
                  </Button>
                  <Button
                    variant={raffleType === 'NAMES' ? 'default' : 'outline'}
                    onClick={() => setRaffleType('NAMES')}
                  >
                    Nomes
                  </Button>
                  <Button
                    variant={raffleType === 'RANDOM' ? 'default' : 'outline'}
                    onClick={() => setRaffleType('RANDOM')}
                  >
                    Aleatória
                  </Button>
                </div>
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
                        const newDate = drawDate || new Date()
                        newDate.setHours(Number(hours))
                        newDate.setMinutes(Number(minutes))
                        setDrawDate(newDate)
                      }}
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
                <Label>Quantidade de Bilhetes</Label>
                <Input
                  type="number"
                  value={ticketQuantity}
                  onChange={(e) => setTicketQuantity(e.target.value)}
                />
              </div>

              <div>
                <Label>Valor por Número</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(e.target.value)}
                />
              </div>

              <div>
                <Label>Tempo para Reserva</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={reservationTime}
                  onChange={(e) => setReservationTime(e.target.value)}
                >
                  <option value="1">1 hora</option>
                  <option value="2">2 horas</option>
                  <option value="6">6 horas</option>
                  <option value="12">12 horas</option>
                  <option value="24">24 horas</option>
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
              <Button onClick={() => console.log({
                raffleType,
                drawDate,
                prizes,
                ticketQuantity,
                ticketPrice,
                reservationTime
              })}>
                Criar Rifa
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}