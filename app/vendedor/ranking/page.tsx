import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const invoices = [
    { invoice: "INV001", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" },
    { invoice: "INV002", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal" },
    { invoice: "INV003", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
    { invoice: "INV004", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" },
    { invoice: "INV005", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal" },
    { invoice: "INV006", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
    { invoice: "INV007", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" },
    { invoice: "INV008", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal" },
    { invoice: "INV009", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer" },

]

export default function ranking() {
    return (
        <div className="absolute top-20 left-8 md:top-24 md:left-[22%] md:w-[70%] overflow-x-hidden">
            <h1 className='font-semibold text-2xl text-black'>
                Ranking entre Vendedores
            </h1>

            <Select>
                <SelectTrigger className="mt-6 w-[220px]">
                    <SelectValue placeholder="Selecione um filtro" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>filtros</SelectLabel>
                        <SelectItem className="hover:bg-verde-200 hover:font-semibold hover:scale-[108%] transition" value="todos">Todos</SelectItem>
                        <SelectItem className="hover:bg-verde-200 hover:font-semibold hover:scale-[108%] transition" value="contatos">Contatos</SelectItem>
                        <SelectItem className="hover:bg-verde-200 hover:font-semibold hover:scale-[108%] transition" value="amigos">Amigos</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>


            <div className="w-[95%]">
                <Table className="min-w-[600px]">
                    <TableCaption>Lista com rifas de outros usuarios</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.invoice}>
                                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                <TableCell>{invoice.paymentStatus}</TableCell>
                                <TableCell>{invoice.paymentMethod}</TableCell>
                                <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>

        </div>
    )
}