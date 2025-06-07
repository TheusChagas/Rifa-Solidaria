'use client'

import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroButtons } from "@/components/HeroButton";
import { Play, Lightbulb, Send, DollarSign, Phone, Clock, Mail } from "lucide-react";
import { SupportButton } from "@/components/SupportButton";
import { cn } from "@/lib/utils";
import Logo from "@/assets/Logo.png";
import { CarrosselVertical } from "@/components/CarroselVertical";

export default function Home() {
    const heroRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const simplesAssimRef = useRef<HTMLElement>(null);
    const contatoRef = useRef<HTMLElement>(null);
    const [isHeroVisible, setIsHeroVisible] = useState(true);
    const [isPinging, setIsPinging] = useState(false);

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

        return () => {
            if (heroRef.current) {
                observer.unobserve(heroRef.current);
            }
        };
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

    const scrollToContato = () => {
        contatoRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    };

    return (
        <main className="flex flex-col items-center text-center overflow-x-hidden">
            <style jsx>{`
                .smooth-bounce {
                    animation: smoothBounce 0.6s ease-in-out;
                }
                
                @keyframes smoothBounce {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    30% {
                        transform: translateY(-6px);
                    }
                }
            `}</style>
            
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
                    className="absolute inset-0 bg-gradient-to-b from-slate-100 to-zinc-900 opacity-80"
                    style={{ zIndex: -10 }}
                ></div>
                <div className={`relative max-w-4xl mx-auto ${isPinging ? 'smooth-bounce' : ''}`}>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold px-4 text-white drop-shadow-lg leading-relaxed">
                        Desperte o{" "}
                        <span className="text-green-300 mt-16">
                            <CarrosselVertical
                                words={["sucesso", "potencial", "lucro"]}
                                interval={2500} // opcional, pois o padrão é 3000ms
                            />
                        </span>{" "}
                        em você e<br />
                        comece a vender rifas de sucesso!
                    </h2>
                    <p className="text-gray-100 text-base sm:text-lg mt-6 md:mt-12 mb-8 drop-shadow">
                        Uma solução abrangente para simplificar a criação e gestão das suas rifas.
                    </p>
                    <HeroButtons />
                </div>
            </section>
            <section 
                ref={simplesAssimRef}
                className="relative z-20 w-full bg-green-500 text-white min-h-screen flex flex-col items-center justify-center py-12 md:py-16 px-6 sm:px-12"
            >
                <div className="w-full max-w-5xl mx-auto">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Simples assim.</h3>
                    <p className="text-gray-200 text-sm sm:text-lg mb-8 sm:mb-12">
                        Simplicidade e tranquilidade na criação das suas rifas.
                    </p>
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
            <section 
                ref={contatoRef}
                className="w-full text-center py-20 md:py-32 px-4 space-y-8 bg-zinc-50"
            >
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
