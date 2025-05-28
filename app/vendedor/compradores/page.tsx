export default function ClientHistory() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Histórico de clientes</h1>

      <div className="mb-8">
        <label className="block text-gray-700 mb-2">Selecione uma rifa</label>
        <select className="w-full p-2 border rounded-lg">
          <option>RIFA ENTRE AMIGOS CELULAR</option>
        </select>
      </div>

      <div className="mb-4 text-gray-600">
        Mostrando 15 de 100 resultados
      </div>

      <div className="border rounded-lg overflow-hidden mb-4">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">ERICO SILVA PEREIRA</span>
            <span className="text-green-500">Pago</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Valor R$ 10,00</span>
            <span>1 bilhete</span>
          </div>
        </div>

        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 border-b">
            <span className="text-gray-500">NOME COMPRADOR</span>
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-500 mt-4">
        Criada em 07
      </div>
    </div>
  )
}