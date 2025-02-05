import { Navbar } from "@/components/Navbar"
import { HeroButtons } from "@/components/HeroButton";
import { Play, Lightbulb, Send, DollarSign, Phone, Clock, Mail } from "lucide-react";
import { SupportButton } from "@/components/SupportButton";
import { cn } from "@/lib/utils";

export default function Home() {
    return (
        <main className="flex flex-col items-center text-center overflow-x-hidden">
            {/* Navbar - Verificar se já é responsivo internamente */}
            <Navbar />

            {/* Hero Section - Ajustes de tamanho e espaçamento */}
            <section className="w-full max-w-4xl text-center mt-8 md:mt-12 py-16 md:py-32">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold px-4">
                    Desperte o <span className="text-green-500">empreendedor</span> em você e comece
                    a vender rifas de sucesso!
                </h2>
                <p className="text-gray-600 text-base sm:text-lg mt-6 md:mt-12 mb-8">
                    Uma solução abrangente para simplificar a criação e gestão das suas rifas.
                </p>

                <HeroButtons />
            </section>

            {/* Features Section - Grid e tamanhos responsivos */}
            <section className="w-full bg-green-500 text-white py-12 md:py-16 px-6 sm:px-12">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Simples assim.</h3>
                <p className="text-gray-200 text-sm sm:text-lg mb-8 sm:mb-12">
                    Simplicidade e tranquilidade na criação das suas rifas.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 max-w-5xl mx-auto">
                    {[Play, Lightbulb, Send, DollarSign].map((Icon, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-6 space-y-4 group transition-all duration-300"
                        >
                            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl">
                                <Icon className={cn(
                                    "w-16 h-16 sm:w-14 sm:h-14 lg:w-16 lg:h-16",
                                    "text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)]",
                                    "transition-transform duration-300",
                                    "md:group-hover:scale-[125%]",
                                    "active:scale-105"
                                )} />
                            </div>
                            <p className="text-sm sm:text-base lg:text-lg font-medium">
                                {["Comece", "Crie", "Compartilhe", "Ganhe"][index]}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Suporte Section - Ajustes de espaçamento */}
            <section className="w-full text-center py-12 md:py-24 px-4 space-y-8">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 md:mb-8">
                    PRECISA DE AJUDA?
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-4 md:mx-auto">
                    <div className="space-y-2 bg-green-50 p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[105%]">
                        <Phone className="h-8 w-8 mx-auto text-green-600 mb-2 hover:scale-[115%] transition-transform" />
                        <p className="font-semibold text-green-900">Telefone</p>
                        <p className="text-gray-600">(11) 99999-9999</p>
                    </div>

                    <div className="space-y-2 bg-green-50 p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[105%]">
                        <Mail className="h-8 w-8 mx-auto text-green-600 mb-2 hover:scale-[115%] transition-transform" />
                        <p className="font-semibold text-green-900">E-mail</p>
                        <p className="text-gray-600">suporte@rifafacil.com</p>
                    </div>

                    <div className="space-y-2 bg-green-50 p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[105%]">
                        <Clock className="h-8 w-8 mx-auto text-green-600 mb-2 hover:scale-[115%] transition-transform" />
                        <p className="font-semibold text-green-900">Horário</p>
                        <p className="text-gray-600">24h por dia</p>
                    </div>
                </div>

                <p className="text-gray-600 max-w-2xl mx-auto mt-8 text-lg">
                    Ou envie sua dúvida diretamente pelo formulário abaixo:
                </p>

                <div className="mt-8 hover:scale-105 transition-transform duration-300">
                    <SupportButton />
                </div>
            </section>
        </main>
    );
}