'use client'

import { useState, useEffect, useMemo } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { EyeOff, ChevronUp, ChevronDown } from "lucide-react"
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table"

type Row = {
    position: number
    sellerName: string
    amountCollected: string
    ticketsSold: number
    campaign: string
}

// Dados de exemplo
const rankingData: Row[] = [
    { position: 1, sellerName: "João Silva", amountCollected: "R$ 2.500,00", ticketsSold: 45, campaign: "campanha-1" },
    { position: 2, sellerName: "Maria Souza", amountCollected: "R$ 2.300,00", ticketsSold: 42, campaign: "campanha-2" },
    { position: 3, sellerName: "Carlos Lima", amountCollected: "R$ 2.100,00", ticketsSold: 38, campaign: "campanha-3" },
    // … mais itens
    ...Array.from({ length: 27 }, (_, i) => ({
        position: i + 4,
        sellerName: `Afiliado ${i + 4}`,
        amountCollected: `R$ ${(2000 - i * 50).toLocaleString("pt-BR")},00`,
        ticketsSold: 35 - i,
        campaign: i % 3 === 0 ? "campanha-1" : i % 3 === 1 ? "campanha-2" : "campanha-3",
    })),
]

export default function AfiliadosPage() {
    // filtro e paginação
    const [selectedCampaign, setSelectedCampaign] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    // configuração de sort: { key, direction }
    const [sortConfig, setSortConfig] = useState<{
        key: keyof Row
        direction: "asc" | "desc"
    } | null>(null)

    const [hideAmount, setHideAmount] = useState(false);

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedCampaign])

    // 1) Filtra
    const filteredData = useMemo(() => {
        return selectedCampaign === "all"
            ? rankingData
            : rankingData.filter((r) => r.campaign === selectedCampaign)
    }, [selectedCampaign])

    // 2) Ordena
    const sortedData = useMemo(() => {
        if (!sortConfig) return filteredData

        return [...filteredData].sort((a, b) => {
            let aVal: string | number = a[sortConfig.key]
            let bVal: string | number = b[sortConfig.key]

            // special: converter "R$ 1.234,56" para number
            if (sortConfig.key === "amountCollected") {
                const parseAmt = (s: string) =>
                    parseFloat(s.replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", "."))
                aVal = parseAmt(a.amountCollected)
                bVal = parseAmt(b.amountCollected)
            }

            if (typeof aVal === "string" && typeof bVal === "string") {
                return sortConfig.direction === "asc"
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal)
            }
            if (typeof aVal === "number" && typeof bVal === "number") {
                return sortConfig.direction === "asc"
                    ? aVal - bVal
                    : bVal - aVal
            }
            return 0
        })
    }, [filteredData, sortConfig])

    // 3) Paginado sobre sortedData
    const totalPages = Math.ceil(sortedData.length / itemsPerPage)
    const start = (currentPage - 1) * itemsPerPage
    const currentData = sortedData.slice(start, start + itemsPerPage)

    // alterna direção ao clicar no header
    function handleSort(key: keyof Row) {
        const direction =
            !sortConfig || sortConfig.key !== key
                ? "asc"
                : sortConfig.direction === "asc"
                    ? "desc"
                    : "asc"
        setSortConfig({ key, direction })
    }

    // helper para mostrar ícone
    function SortIcon({ column }: { column: keyof Row }) {
        if (!sortConfig || sortConfig.key !== column) return null
        return sortConfig.direction === "asc" ? (
            <ChevronUp className="w-4 h-4 ml-1" />
        ) : (
            <ChevronDown className="w-4 h-4 ml-1" />
        )
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold mb-6">Afiliados</h1>
            <p className="text-gray-700 mb-4">
                Acompanhe seu desempenho como afiliado, visualize comissões e convide novos parceiros para a plataforma.
            </p>
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
                        onClick={() => setHideAmount((v) => !v)}
                    >
                        <EyeOff className="h-5 w-5 mr-2 text-gray-500" />
                        Dados
                    </Button>
                </div>
            </div>

            {/* tabela */}
            <div className="bg-white rounded-xl shadow-md p-6 lg:p-8 space-y-4">
                <div className="overflow-x-auto">
                    <Table className="min-w-[600px]">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">
                                    <button
                                        className="flex items-center"
                                        onClick={() => handleSort("position")}
                                    >
                                        Posição<SortIcon column="position" />
                                    </button>
                                </TableHead>
                                <TableHead>
                                    <button
                                        className="flex items-center"
                                        onClick={() => handleSort("sellerName")}
                                    >
                                        Afiliado<SortIcon column="sellerName" />
                                    </button>
                                </TableHead>
                                <TableHead>
                                    <button
                                        className="flex items-center"
                                        onClick={() => handleSort("amountCollected")}
                                    >
                                        Arrecadação<SortIcon column="amountCollected" />
                                    </button>
                                </TableHead>
                                <TableHead className="text-right">
                                    <button
                                        className="flex items-center justify-end w-full"
                                        onClick={() => handleSort("ticketsSold")}
                                    >
                                        Bilhetes<SortIcon column="ticketsSold" />
                                    </button>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentData.map((item) => (
                                <TableRow key={item.position}>
                                    <TableCell className="font-medium">
                                        {item.position}
                                    </TableCell>
                                    <TableCell>{item.sellerName}</TableCell>
                                    <TableCell>
                                        {hideAmount ? "R$ ****" : item.amountCollected}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {hideAmount ? "****" : item.ticketsSold}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                {/* paginação */}
                <div className="flex justify-end items-center gap-4 pt-4">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50 hover:bg-gray-200"
                    >
                        Anterior
                    </button>
                    <span className="text-sm text-gray-600">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50 hover:bg-gray-200"
                    >
                        Próxima
                    </button>
                </div>
            </div>
        </div>
    )
}
