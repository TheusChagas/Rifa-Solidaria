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
  open: boolean
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

  // Função de validação de etapa
  const validateStep = () => {
    if (step === 1 && !title) {
      alert('Preencha o título da rifa')
      return
    }
    if (step === 1 && !numberOfTickets) {
      alert('Selecione a quantidade de números')
      return
    }
    if (step === 1 && !drawDate) {
      alert('Selecione a data e hora do sorteio')
      return
    }
    if (step === 2 && prizes.some(p => !p.name || !p.description)) {
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
  }

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

  const handleOpenChangeWrapper = (isOpen: boolean) => {
    onOpenChange(isOpen)
    if (!isOpen) {
      // resetar estado
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
      prizes: prizes.map(p => ({
        ...p,
        image: p.image?.name || ''
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
          {/* ... restante do JSX (passos 1, 2, 3 e botões) */}
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
