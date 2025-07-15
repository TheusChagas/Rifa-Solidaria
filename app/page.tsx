'use client'

import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { HeroButtons } from "@/components/home/HeroButton";
import { Play, Lightbulb, Send, DollarSign, Phone, Clock, Mail, ChevronDown } from "lucide-react";
import { SupportButton } from "@/components/home/SupportButton";
import { cn } from "@/lib/utils";
import Logo from "@/assets/Logo.png";
import { CarrosselVertical } from "@/components/home/CarroselVertical";
import { CarrosselApoiadores } from "@/components/home/CarrosselApoiadores";
import { Apoiador } from "@/types";
import { getApoiadores } from "@/lib/getApoiadores";

// Custom styles for animations
const customStyles = `
    @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
    
    @keyframes glow {
        0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
        50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.6); }
    }
    
    @keyframes scroll-left {
        0% { transform: translateX(0); }
        100% { transform: translateX(-100%); }
    }
    
    .animate-spin-slow {
        animation: spin-slow 8s linear infinite;
    }
    
    .animate-float {
        animation: float 3s ease-in-out infinite;
    }
    
    .animate-glow {
        animation: glow 2s ease-in-out infinite;
    }
    
    .animate-scroll-left {
        animation: scroll-left 30s linear infinite;
    }
    
    .animate-scroll-left:hover {
        animation-play-state: paused;
    }
    
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
`;

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
        <>
            <style dangerouslySetInnerHTML={{ __html: customStyles }} />
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
                    className="relative w-full text-center min-h-screen flex items-center justify-center py-16 md:py-40 overflow-hidden"
                >
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-slate-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>
                    </div>
                    
                    <div
                        ref={bgRef}
                        className="fixed top-0 left-0 w-full h-full bg-[url('/_next/static/media/test.png')] bg-no-repeat bg-cover bg-center transition-transform duration-200 ease-out"
                        style={{ zIndex: -20, transform: "scale(1.1) translate(0, 0)" }}
                    ></div>
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-white/95 via-emerald-50/90 to-emerald-200/95 backdrop-blur-sm"
                        style={{ zIndex: -10 }}
                    ></div>
                    
                    {/* Main Content */}
                    <div className={`relative max-w-6xl mx-auto px-4 ${isPinging ? 'animate-bounce' : ''}`}>
                        {/* Badge */}
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-700 font-medium text-sm mb-8 backdrop-blur-sm">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                            Plataforma #1 em Rifas Online
                        </div>
                        
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold px-4 text-slate-800 drop-shadow-lg leading-tight mb-6">
                            <span className="block text-center">
                                Desperte o{" "}
                                <span className="relative inline-block font-bold">
                                    <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                        <CarrosselVertical
                                            words={["sucesso", "potencial", "empreendedor"]}
                                            interval={2000}
                                            className="font-bold inline-block"
                                        />
                                    </span>
                                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                </span>
                                {" "}em você
                            </span>
                        </h2>
                        
                        <p className="text-slate-600 text-xl sm:text-2xl font-light mb-4 max-w-3xl mx-auto">
                            e comece a vender rifas de sucesso!
                        </p>
                        
                        <p className="text-slate-600 text-lg sm:text-xl mt-8 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Uma solução <span className="font-semibold text-emerald-600">completa</span> e <span className="font-semibold text-emerald-600">intuitiva</span> para simplificar a criação e gestão das suas rifas.
                        </p>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 mb-12 max-w-lg mx-auto">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-600">1000+</div>
                                <div className="text-sm text-slate-600">Rifas criadas</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-600">98%</div>
                                <div className="text-sm text-slate-600">Satisfação</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-600">24/7</div>
                                <div className="text-sm text-slate-600">Suporte</div>
                            </div>
                        </div>
                        
                        <HeroButtons />
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute top-20 left-10 w-3 h-3 bg-emerald-400 rounded-full animate-bounce delay-300"></div>
                    <div className="absolute top-40 right-16 w-2 h-2 bg-green-500 rounded-full animate-bounce delay-700"></div>
                    <div className="absolute bottom-40 left-20 w-4 h-4 bg-slate-400 rounded-full animate-bounce delay-1000"></div>
                    
                    {/* Down Arrow */}
                    <div 
                        className={`absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer hover:scale-110 transition-all duration-300 ${
                            showArrow 
                                ? 'opacity-100 translate-y-0' 
                                : 'opacity-0 -translate-y-4 pointer-events-none'
                        }`}
                        onClick={scrollToSimplesAssim}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-lg animate-pulse"></div>
                            <ChevronDown className="relative w-10 h-10 text-emerald-600 hover:text-emerald-700 animate-bounce" />
                        </div>
                    </div>
                </section>
                <section 
                    ref={simplesAssimRef}
                    className="relative z-20 w-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-green-600 text-white min-h-screen flex flex-col items-center justify-center py-20 px-6 sm:px-12 overflow-hidden"
                >
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
                        <div className="absolute top-10 left-10 w-32 h-32 border border-white/30 rounded-full animate-spin-slow"></div>
                        <div className="absolute bottom-20 right-20 w-48 h-48 border border-white/20 rounded-full animate-spin-slow delay-1000"></div>
                        <div className="absolute top-1/3 right-1/4 w-24 h-24 border border-white/40 rounded-full animate-spin-slow delay-500"></div>
                    </div>
                    
                    <div className="w-full max-w-6xl mx-auto relative z-10">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium mb-6">
                                <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                                Como funciona
                            </div>
                            
                            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                                Simples <span className="text-emerald-200">assim</span>.
                            </h3>
                            
                            <p className="text-emerald-100 text-xl sm:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
                                Simplicidade e tranquilidade na criação das suas rifas.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                            {[
                                { icon: Play, title: "Comece", description: "Cadastre-se gratuitamente e acesse nossa plataforma" },
                                { icon: Lightbulb, title: "Crie", description: "Configure sua rifa com apenas alguns cliques" },
                                { icon: Send, title: "Compartilhe", description: "Divulgue nas redes sociais e grupos" },
                                { icon: DollarSign, title: "Ganhe", description: "Receba os pagamentos automaticamente" }
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="group relative"
                                >
                                    {/* Step number */}
                                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-emerald-200 text-emerald-800 rounded-full flex items-center justify-center text-sm font-bold z-10">
                                        {index + 1}
                                    </div>
                                    
                                    {/* Card */}
                                    <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:-translate-y-4 hover:scale-105 group overflow-hidden">
                                        {/* Card background glow */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        
                                        <div className="relative flex flex-col items-center space-y-6">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-emerald-300/30 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                                                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-emerald-300/80 to-emerald-400/80 backdrop-blur-sm hover:from-emerald-200/90 hover:to-emerald-300/90 transition-all duration-500 shadow-xl">
                                                    <item.icon className="w-12 h-12 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
                                                </div>
                                            </div>
                                            
                                            <div className="text-center">
                                                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-100 transition-colors duration-300">
                                                    {item.title}
                                                </h4>
                                                <p className="text-emerald-100 text-sm leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Connecting line (except for last item) */}
                                    {index < 3 && (
                                        <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5 bg-white/30">
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white/50 rounded-full"></div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Bottom wave */}
                    <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-zinc-50 to-transparent"></div>
                </section>
                
                <section className="relative w-full py-24 md:py-32 px-4 bg-gradient-to-br from-zinc-50 to-gray-100 overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-green-500 rounded-full blur-3xl"></div>
                    </div>
                    
                    <div className="relative z-10 max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-200 text-emerald-700 font-medium mb-6">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                                Escolha seu plano
                            </div>
                            
                            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
                                SUAS <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">OPÇÕES</span>
                            </h3>
                            
                            <p className="text-gray-600 text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed">
                                Escolha a melhor forma de usar nossa plataforma
                            </p>
                        </div>
                        
                        {/* Plans */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                            {/* Plano Padrão */}
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                                
                                <div className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-emerald-100 overflow-hidden">
                                    {/* Background pattern */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                                    
                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                                            <Play className="w-8 h-8" />
                                        </div>
                                        
                                        {/* Title */}
                                        <h4 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
                                            Plano Padrão
                                        </h4>
                                        
                                        {/* Description */}
                                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                            Pague apenas quando criar, com taxas que diminuem conforme sua ambição.
                                        </p>
                                        
                                        {/* Features */}
                                        <div className="space-y-4 mb-8">
                                            {[
                                                "Rifas ilimitadas",
                                                "Taxa de 2% (Até 1000 números)",
                                                "Taxa de 1.5% (até 10000 números)",
                                                "Taxa de 1% (acima de 10000)"
                                            ].map((feature, index) => (
                                                <div key={index} className="flex items-center">
                                                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                                                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                    </div>
                                                    <span className="text-gray-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        {/* Pricing */}
                                        <div className="border-t border-emerald-100 pt-6">
                                            <div className="text-center">
                                                <div className="text-4xl font-bold text-emerald-600 mb-2">R$ 0,00</div>
                                                <div className="text-gray-500 text-sm">mensais</div>
                                                <div className="text-emerald-600 font-medium text-sm mt-2">Somente taxas na criação</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Plano Mensal */}
                            <div className="group relative">
                                {/* Popular badge */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                                    <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                                        MAIS POPULAR
                                    </div>
                                </div>
                                
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-35 transition-opacity duration-500"></div>
                                
                                <div className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border-2 border-emerald-300 overflow-hidden">
                                    {/* Background pattern */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                                    
                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                                            <DollarSign className="w-8 h-8" />
                                        </div>
                                        
                                        {/* Title */}
                                        <h4 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
                                            Pagamento Mensal
                                        </h4>
                                        
                                        {/* Description */}
                                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                            Pague uma mensalidade fixa e fique isento de taxas.
                                        </p>
                                        
                                        {/* Features */}
                                        <div className="space-y-4 mb-8">
                                            {[
                                                "Rifas ilimitadas",
                                                "0% de taxas por criação",
                                                "Suporte prioritário",
                                                "Relatórios avançados"
                                            ].map((feature, index) => (
                                                <div key={index} className="flex items-center">
                                                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                                                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                    </div>
                                                    <span className="text-gray-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        {/* Pricing */}
                                        <div className="border-t border-emerald-100 pt-6">
                                            <div className="text-center">
                                                <div className="text-4xl font-bold text-emerald-600 mb-2">R$ 49,90</div>
                                                <div className="text-gray-500 text-sm">por mês</div>
                                                <div className="text-emerald-600 font-medium text-sm mt-2">0% de taxas por rifa</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section 
                    ref={afiliadosRef}
                    className="relative w-full py-24 md:py-32 px-4 bg-gradient-to-br from-gray-50 to-emerald-50 overflow-hidden"
                >
                    {/* Background decoration */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-emerald-500 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-green-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    </div>
                    
                    <div className="relative z-10 max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-200 text-emerald-700 font-medium mb-6">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                                Comunidade
                            </div>
                            
                            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
                                NOSSOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">APOIADORES</span>
                            </h3>
                            
                            <p className="text-gray-600 text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed">
                                Conheça quem apoia nossa missão e faz parte dessa jornada
                            </p>
                        </div>
                        
                        <CarrosselApoiadores apoiadores={apoiadores} loading={loading} />
                    </div>
                </section>
                
                <section 
                    ref={contatoRef}
                    className="relative w-full py-24 md:py-32 px-4 bg-gradient-to-br from-emerald-50 via-emerald-100 to-green-200 overflow-hidden"
                >
                    {/* Background decoration */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-slate-400 rounded-full blur-3xl animate-pulse delay-500"></div>
                    </div>
                    
                    <div className="relative z-10 max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-emerald-200 text-emerald-700 font-medium mb-6">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                                Suporte
                            </div>
                            
                            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
                                PRECISA DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">AJUDA?</span>
                            </h3>
                            
                            <p className="text-gray-700 text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed">
                                Estamos aqui para te ajudar a ter sucesso
                            </p>
                        </div>
                        
                        {/* Contact Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
                            {[
                                {
                                    icon: Phone,
                                    title: "Telefone",
                                    value: "(11) 99999-9999",
                                    description: "Atendimento direto",
                                    color: "from-emerald-400 to-green-500"
                                },
                                {
                                    icon: Mail,
                                    title: "E-mail",
                                    value: "suporte@rifafacil.com",
                                    description: "Resposta em até 2h",
                                    color: "from-green-400 to-emerald-500"
                                },
                                {
                                    icon: Clock,
                                    title: "Horário",
                                    value: "24h por dia",
                                    description: "Sempre disponível",
                                    color: "from-emerald-500 to-green-400"
                                }
                            ].map((contact, index) => (
                                <div key={index} className="group relative">
                                    {/* Glow effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${contact.color} rounded-3xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                                    
                                    {/* Card */}
                                    <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:scale-105 border border-emerald-200">
                                        {/* Background pattern */}
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full -translate-y-12 translate-x-12 opacity-50"></div>
                                        
                                        <div className="relative z-10 flex flex-col items-center space-y-6">
                                            {/* Icon */}
                                            <div className="relative">
                                                <div className={`absolute inset-0 bg-gradient-to-br ${contact.color} rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                                                <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${contact.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                                                    <contact.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                                                </div>
                                            </div>
                                            
                                            {/* Content */}
                                            <div className="text-center">
                                                <h4 className="font-bold text-xl text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors duration-300">
                                                    {contact.title}
                                                </h4>
                                                <p className="text-emerald-600 font-bold text-lg mb-2">
                                                    {contact.value}
                                                </p>
                                                <p className="text-gray-600 text-sm">
                                                    {contact.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Contact Form Section */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-500 rounded-3xl blur-lg opacity-10"></div>
                            
                            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border border-emerald-200">
                                <div className="text-center mb-8">
                                    <h4 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4">
                                        Envie sua dúvida
                                    </h4>
                                    <p className="text-gray-600 text-lg">
                                        Ou envie sua dúvida diretamente pelo formulário:
                                    </p>
                                </div>
                                
                                <div className="max-w-md mx-auto">
                                    <div className="group hover:scale-105 transition-transform duration-300">
                                        <SupportButton />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                          {/* Bottom decoration */}
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-green-300 to-transparent"></div>
            </section>
        </main>
        </>
    );
}
