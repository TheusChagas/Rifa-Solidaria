'use client'

import { useState } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { EyeOff } from "lucide-react"

export default function Ranking() {
    const [selectedCampaign, setSelectedCampaign] = useState("all")

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                Ranking de Vendedores
            </h1>

            {/* filtro */}
            <div className="bg-white rounded-xl shadow-md p-6 lg:p-8 space-y-6 mb-8">
                <label className="block text-sm font-medium text-gray-700">
                    Selecione uma campanha
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <Select onValueChange={setSelectedCampaign}>
                        <SelectTrigger className="w-full sm:w-80 h-12">
                            <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="campanha-1">Campanha 1</SelectItem>
                                <SelectItem value="campanha-2">Campanha 2</SelectItem>
                                <SelectItem value="campanha-3">Campanha 3</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button
                        variant="outline"
                        className="flex items-center justify-center h-12 px-4 whitespace-nowrap"
                    >
                        <EyeOff className="h-5 w-5 mr-2 text-gray-500" />
                        Dados
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 lg:p-8 space-y-4 text-gray-500 text-center">
                Em breve você poderá acompanhar o ranking dos vendedores nesta página.
            </div>
        </div>
    )
}
