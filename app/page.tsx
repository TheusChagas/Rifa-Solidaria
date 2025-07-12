'use client'

import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroButtons } from "@/components/HeroButton";
import { Play, Lightbulb, Send, DollarSign, Phone, Clock, Mail, ChevronDown } from "lucide-react";
import { SupportButton } from "@/components/SupportButton";
import { cn } from "@/lib/utils";
import Logo from "@/assets/Logo.png";
import { CarrosselVertical } from "@/components/CarroselVertical";
import { Apoiador } from "@/types";
import { getApoiadores } from "@/lib/getApoiadores";

export default function Home() {
    const heroRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const simplesAssimRef = useRef<HTMLElement>(null);
    const afiliadosRef = useRef<HTMLElement>(null);
    const contatoRef = useRef<HTMLElement>(null);
    const [isHeroVisible, setIsHeroVisible] = useState(true);
    const [isPinging, setIsPinging] = useState(false);
    const [showArrow, setShowArrow] = useState(true);
    const [apoiadores, setApoiadores] = useState<Apoiador[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsHeroVisible(entry.isIntersecting);
            },
            { threshold: 0, rootMargin: "0px 0px -50% 0px" }
        );

        if (heroRef.current) {
            observer.observe(heroRef.current);
        }

        const handleScroll = () => {
            setShowArrow(window.scrollY < 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            if (heroRef.current) {
                observer.unobserve(heroRef.current);
            }
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const loadApoiadores = async () => {
            try {
                const data = await getApoiadores(6);
                setApoiadores(data);
            } catch (error) {
                console.error("Erro ao carregar apoiadores:", error);
            } finally {
                setLoading(false);
            }
        };

        loadApoiadores();
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const offsetX = (x - rect.width / 2) / (rect.width / 2);
        const offsetY = (y - rect.height / 2) / (rect.height / 2);
        const translateX = offsetX * -20;
        const translateY = offsetY * -20;
        if (bgRef.current) {
            bgRef.current.style.transform = `scale(1.25) translate(${translateX}px, ${translateY}px)`;
        }
    };

    const handleMouseLeave = () => {
        if (bgRef.current) {
            bgRef.current.style.transform = `scale(1.25) translate(0, 0)`;
        }
    };

    const scrollToHero = () => {
        // Only trigger bounce animation if user is at the top of the page
        if (window.scrollY <= 100) {
            setIsPinging(true);
            setTimeout(() => setIsPinging(false), 600);
        }
        
        // Always scroll to hero section
        heroRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    };

    const scrollToSimplesAssim = () => {
        simplesAssimRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    };

    const scrollToAfiliados = () => {
        afiliadosRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    };

    const scrollToContato = () => {
        contatoRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    };

    return (
        <main className="flex flex-col items-center text-center overflow-x-hidden">
            <Navbar 
                isHeroVisible={isHeroVisible} 
                onScrollToSection={scrollToHero}
                onScrollToSobre={scrollToSimplesAssim}
                onScrollToContato={scrollToContato}
            />
            <section
                ref={heroRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full text-center min-h-screen flex items-center justify-center py-16 md:py-40"
            >
                <div
                    ref={bgRef}
                    className="fixed top-0 left-0 w-full h-full bg-[url('/_next/static/media/test.png')] bg-no-repeat bg-cover bg-center transition-transform duration-200 ease-out"
                    style={{ zIndex: -20, transform: "scale(1.1) translate(0, 0)" }}
                ></div>
                <div
                    className="absolute inset-0 bg-gradient-to-b from-white via-slate-200 to-green-500"
                    style={{ zIndex: -10 }}
                ></div>
                <div className={`relative max-w-4xl mx-auto ${isPinging ? 'animate-bounce' : ''}`}>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold px-4 text-slate-800 drop-shadow-lg leading-relaxed">
                        Desperte o{" "}
                        <span className="text-green-600 mt-16">
                            <CarrosselVertical
                                words={["sucesso", "potencial", "empreendedor"]}
                                interval={2500}
                            />
                        </span>{" "}
                        em você e<br />
                        comece a vender rifas de sucesso!
                    </h2>
                    <p className="text-slate-700 text-base sm:text-lg mt-6 md:mt-12 mb-8 drop-shadow">
                        Uma solução abrangente para simplificar a criação e gestão das suas rifas.
                    </p>
                    <HeroButtons />
                </div>
                
                {/* Down Arrow */}
                <div 
                    className={`absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer hover:scale-110 transition-all duration-300 ${
                        showArrow 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 -translate-y-4 pointer-events-none'
                    }`}
                    onClick={scrollToSimplesAssim}
                >
                    <ChevronDown className="w-8 h-8 text-slate-600/70 hover:text-slate-600" />
                </div>
            </section>
            <section 
                ref={simplesAssimRef}
                className="relative z-20 w-full bg-gradient-to-b from-green-500 via-green-500 via-70% to-zinc-50 text-white min-h-screen flex flex-col items-center justify-center py-12 md:pb-[350px] px-6 sm:px-12"
            >
                <div className="w-full max-w-5xl mx-auto">
                    <div className="relative mb-12">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                            Simples assim.
                        </h3>
                        
                        <p className="text-gray-200 text-sm sm:text-lg font-medium">
                            Simplicidade e tranquilidade na criação das suas rifas.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
                        {[Play, Lightbulb, Send, DollarSign].map((Icon, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center p-6 space-y-4 group transition-all duration-300"
                            >
                                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl">
                                    <Icon
                                        className={cn(
                                            "w-16 h-16 sm:w-14 sm:h-14 lg:w-16 lg:h-16",
                                            "text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)]",
                                            "transition-transform duration-300",
                                            "md:group-hover:scale-[125%]",
                                            "active:scale-105"
                                        )}
                                    />
                                </div>
                                <p className="text-sm sm:text-base lg:text-lg font-medium">
                                    {["Comece", "Crie", "Compartilhe", "Ganhe"][index]}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="w-full text-center py-20 md:py-32 px-4 space-y-8 bg-white">
                <div className="relative mb-16">
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl py-6 px-8 mx-auto max-w-2xl shadow-lg border border-white/50 space-y-3">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">
                            SUAS OPÇÕES
                        </h3>
                        <p className="text-gray-600 text-lg font-medium">
                            Escolha a melhor forma de usar nossa plataforma
                        </p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
                    <div className="group p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border border-green-200">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="p-4 rounded-full bg-green-500 group-hover:bg-green-600 transition-colors duration-300">
                                <Play className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <div className="text-center">
                                <h4 className="font-bold text-xl text-slate-800 mb-2">Taxas Regressivas</h4>
                                <p className="text-gray-600 text-sm mb-4">Pague apenas quando criar, com taxas que diminuem conforme sua ambição.</p>
                                <div className="space-y-2">
                                    <p className="text-xs text-gray-500">✓ Rifas ilimitadas</p>
                                    <p className="text-xs text-gray-500">✓ Taxa de 2% (Até 1000 números)</p>
                                    <p className="text-xs text-gray-500">✓ Taxa de 1.5% (até 10000 números)</p>
                                    <p className="text-xs text-gray-500">✓ Taxa de 1% (acima de 10000)</p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-green-200">
                                    <p className="text-lg font-bold text-green-600">R$ 0,00 mensais</p>
                                    <p className="text-xs text-gray-500">Somente taxas na criação</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="group p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border border-emerald-200">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="p-4 rounded-full bg-emerald-500 group-hover:bg-emerald-600 transition-colors duration-300">
                                <DollarSign className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <div className="text-center">
                                <h4 className="font-bold text-xl text-slate-800 mb-2">Pagamento Mensal</h4>
                                <p className="text-gray-600 text-sm mb-4">Pague uma mensalidade fixa e fique isento de taxas.</p>
                                <div className="space-y-2">
                                    <p className="text-xs text-gray-500">✓ Rifas ilimitadas</p>
                                    <p className="text-xs text-gray-500">✓ 0% de taxas por criação</p>
                                    <p className="text-xs text-gray-500">✓ Suporte prioritário</p>
                                    <p className="text-xs text-gray-500">✓ Relatórios avançados</p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-emerald-200">
                                    <p className="text-lg font-bold text-emerald-600">R$ 49,90/mês</p>
                                    <p className="text-xs text-gray-500">0% de taxas por rifa</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section 
                ref={afiliadosRef}
                className="w-full text-center py-20 md:py-32 px-4 space-y-8 bg-zinc-50"
            >
                <div className="relative mb-16">
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl py-6 px-8 mx-auto max-w-2xl shadow-lg border border-white/50 space-y-3">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">
                            NOSSOS APOIADORES
                        </h3>
                        
                        <p className="text-gray-600 text-lg font-medium">
                            Conheça quem apoia nossa missão
                        </p>
                    </div>
                </div>
                
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="text-lg text-gray-600">Carregando apoiadores...</div>
                    </div>
                ) : (
                    <div className="w-full max-w-7xl mx-auto">
                        <div className="overflow-x-auto scrollbar-hide py-4">
                            <div className="flex space-x-4 md:space-x-6 pb-4 px-4" style={{ minWidth: 'max-content' }}>
                                {apoiadores.map((apoiador, index) => (
                                    <div 
                                        key={index}
                                        className="flex-shrink-0 bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 w-[180px] sm:w-[200px] md:w-[220px] border-2 border-green-200"
                                    >
                                        <div className="flex flex-col items-center space-y-3 md:space-y-4">
                                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden bg-gray-200">
                                                <img 
                                                    src={apoiador.imagem} 
                                                    alt={apoiador.nome}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.style.display = 'none';
                                                        target.parentElement!.innerHTML = `<div class="w-full h-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg">${apoiador.nome.charAt(0)}</div>`;
                                                    }}
                                                />
                                            </div>
                                            <div className="text-center">
                                                <h4 className="font-bold text-gray-800 text-sm md:text-lg whitespace-nowrap overflow-hidden text-ellipsis">{apoiador.nome}</h4>
                                                <p className="text-xs md:text-sm text-gray-500">Apoiador</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Mobile scroll hint */}
                        <div className="flex justify-center mt-2 md:hidden">
                            <p className="text-xs text-gray-400">← Deslize para ver mais →</p>
                        </div>
                    </div>
                )}
            </section>
            
            <section 
                ref={contatoRef}
                className="w-full text-center pt-20 pb-20 md:py-32 px-4 space-y-8 bg-gradient-to-b from-zinc-50 via-green-500 via-30% to-green-500"
            >
                <div className="relative mb-16">
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl py-6 px-8 mx-auto max-w-2xl shadow-lg border border-white/50 space-y-3">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">
                            PRECISA DE AJUDA?
                        </h3>
                        <p className="text-gray-600 text-lg font-medium">
                            Estamos aqui para te ajudar a ter sucesso
                        </p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
                    <div className="group p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border border-green-100">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="p-4 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors duration-300">
                                <Phone className="h-8 w-8 text-green-600 group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-lg text-slate-800 mb-1">Telefone</p>
                                <p className="text-green-600 font-semibold text-lg">(11) 99999-9999</p>
                                <p className="text-gray-500 text-sm mt-1">Atendimento direto</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="group p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border border-green-100">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="p-4 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors duration-300">
                                <Mail className="h-8 w-8 text-green-600 group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-lg text-slate-800 mb-1">E-mail</p>
                                <p className="text-green-600 font-semibold text-lg">suporte@rifafacil.com</p>
                                <p className="text-gray-500 text-sm mt-1">Resposta em até 2h</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="group p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border border-green-100">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="p-4 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors duration-300">
                                <Clock className="h-8 w-8 text-green-600 group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-lg text-slate-800 mb-1">Horário</p>
                                <p className="text-green-600 font-semibold text-lg">24h por dia</p>
                                <p className="text-gray-500 text-sm mt-1">Sempre disponível</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="max-w-3xl mx-auto mt-12 space-y-6">
                    <p className="text-gray-700 text-lg font-medium mb-4">
                        Ou envie sua dúvida diretamente pelo formulário:
                    </p>
                    <div className="hover:scale-105 transition-transform duration-300">
                        <SupportButton />
                    </div>
                </div>
            </section>
        </main>
    );
}
