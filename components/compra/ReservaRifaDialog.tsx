'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export function ReservarRifaDialog() {
  return (
    <Dialog>
      <DialogContent className="sm:max-w-[425px] z-50">
        <DialogHeader>
          <DialogTitle>Reservar Rifa</DialogTitle>
        </DialogHeader>

        <form className="grid gap-4 py-4">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome ou apelido</Label>
            <Input id="name" />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" />
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <Label>BR</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm">(</span>
              <Input className="w-14" placeholder="dd" />
              <span className="text-sm">)</span>
              <Input className="flex-1" placeholder="______" />
              <span className="text-sm">-</span>
              <Input className="flex-1" placeholder="______" />
            </div>
          </div>

          {/* UF e Cidade */}
          <div className="flex gap-4">
            <div className="space-y-2 flex-1">
              <Label>UF</Label>
              <Input />
            </div>
            <div className="space-y-2 flex-1">
              <Label>Cidade</Label>
              <Input />
            </div>
          </div>

          {/* Bairro */}
          <div className="space-y-2">
            <Label>Bairro</Label>
            <Input />
          </div>

          {/* Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Ao se registrar, você aceita os Termos de Uso e a nossa Política de Privacidade.
            </label>
          </div>

          <Button type="submit" className="w-full">
            RESERVAR
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}