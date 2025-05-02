// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";

interface Seat {
  id: string;
  row: string;
  number: number;
  status: "available" | "occupied" | "selected";
}

export default function CinemaPage() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState("");

  const movies = [
    { value: "avatar", label: "Avatar: O Caminho da Água" },
    { value: "john-wick", label: "John Wick 4" },
    { value: "mario", label: "Super Mario Bros" },
  ];

  useEffect(() => {
    const generateSeats = () => {
      const arr: Seat[] = [];
      const rows = ["A", "B", "C", "D", "E", "F"];
      const seatsPerRow = 8;

      rows.forEach((row) => {
        for (let i = 1; i <= seatsPerRow; i++) {
          // usamos 'as const' para manter o tipo de status como literal
          arr.push({
            id: `${row}-${i}`,
            row,
            number: i,
            status: Math.random() > 0.5 ? "available" : "occupied",
          } as const);
        }
      });

      setSeats(arr);
    };

    generateSeats();
  }, []);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "occupied") return;

    // Anotamos o tipo de newStatus para garantir literal union
    const newStatus: Seat["status"] =
      seat.status === "available" ? "selected" : "available";

    // Atualizamos o array (e fazemos type assertion para Seat[])
    const updatedSeats = seats.map((s) =>
      s.id === seat.id ? { ...s, status: newStatus } : s
    ) as Seat[];

    setSeats(updatedSeats);

    if (newStatus === "selected") {
      setSelectedSeats((prev) => [...prev, seat.id]);
    } else {
      setSelectedSeats((prev) => prev.filter((id) => id !== seat.id));
    }
  };

  useEffect(() => {
    setTotalPrice(selectedSeats.length * 35);
  }, [selectedSeats]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Escolha seu filme</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <Combobox
            options={movies}
            value={selectedMovie}
            onChange={setSelectedMovie}
            placeholder="Selecione um filme..."
            className="mb-6"
          />

          {/* Tela do cinema */}
          <div className="mb-8 text-center">
            <div className="h-4 bg-gray-300 w-3/4 mx-auto rounded-lg mb-12 shadow-md" />
            <div className="text-gray-600 mb-4">TELA</div>
          </div>

          {/* Grade de assentos */}
          <div className="grid grid-cols-8 gap-4 mb-8">
            {seats.map((seat) => (
              <button
                key={seat.id}
                onClick={() => handleSeatClick(seat)}
                disabled={seat.status === "occupied"}
                className={`
                  h-10 w-10 rounded-lg flex items-center justify-center transition-colors
                  ${
                    seat.status === "available"
                      ? "bg-green-100 hover:bg-green-200"
                      : seat.status === "selected"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 cursor-not-allowed"
                  }
                  ${seat.number === 4 || seat.number === 5 ? "ml-8" : ""}
                `}
              >
                {seat.row}
                {seat.number}
              </button>
            ))}
          </div>

          {/* Legenda */}
          <div className="flex justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-green-100 rounded" />
              <span>Disponível</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-blue-500 rounded" />
              <span>Selecionado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-300 rounded" />
              <span>Ocupado</span>
            </div>
          </div>

          {/* Resumo da compra */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Resumo da Compra</h2>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">
                  Assentos selecionados:{" "}
                  {selectedSeats.length > 0
                    ? selectedSeats.join(", ")
                    : "nenhum"}
                </p>
                <p className="text-gray-600">
                  Total: R$ {totalPrice.toFixed(2)}
                </p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline">Cancelar</Button>
                <Button disabled={selectedSeats.length === 0}>
                  Confirmar Compra
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
