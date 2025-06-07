// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import logo from "@/assets/Logo.png";

interface NavbarProps {
    // A propriedade isHeroVisible permanece na interface para compatibilidade, 
    // mas não é mais utilizada para alterar o estilo da Navbar.
    isHeroVisible: boolean;
    onScrollToSection?: () => void;
    onScrollToSobre?: () => void;
    onScrollToContato?: () => void;
}

export function Navbar({ isHeroVisible, onScrollToSection, onScrollToSobre, onScrollToContato }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Verificar sessão do usuário
    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch('/api/auth/session');
                const data = await response.json();
                setIsLoggedIn(data.isLoggedIn || false);
            } catch (error) {
                console.error('Erro ao verificar sessão:', error);
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();
    }, []);

    const navItems = [
        { name: "Início", href: "/" },
        { name: "Sobre", href: "/sobre" },
        { name: "Contato", href: "/contato" },
    ];

    // A Navbar agora tem sempre background branco, com borda inferior e sombra para destacá-la
    const navbarStyle = "fixed top-0 left-0 w-full z-50 bg-white border-b shadow-md transition-all duration-300";

    const handleInicioClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onScrollToSection) {
            onScrollToSection();
        }
    };

    const handleSobreClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onScrollToSobre) {
            onScrollToSobre();
        }
    };

    const handleContatoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onScrollToContato) {
            onScrollToContato();
        }
    };

    return (
        <nav className={navbarStyle}>
            <div className="container mx-auto flex h-[4rem] items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex flex-row text-xl font-bold text-green-500">
                    <Image src={logo} alt="Logo do Site" width={75} height={75} />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1">
                    <div className="flex gap-6">
                        <button
                            onClick={handleInicioClick}
                            className="text-sm font-medium hover:text-green-500 transition-colors cursor-pointer"
                        >
                            Início
                        </button>
                        <button
                            onClick={handleSobreClick}
                            className="text-sm font-medium hover:text-green-500 transition-colors cursor-pointer"
                        >
                            Sobre
                        </button>
                        <button
                            onClick={handleContatoClick}
                            className="text-sm font-medium hover:text-green-500 transition-colors cursor-pointer"
                        >
                            Contato
                        </button>
                    </div>
                    <div className="flex gap-0">
                        {!isLoading && isLoggedIn && (
                            <Button
                                variant="ghost"
                                className="text-sm font-medium hover:text-green-500 transition-colors"
                            >
                                <Link href="/vendedor/rifas" className="font-bold">Vendedor</Link>
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            className="bg-green-500 text-white hover:bg-green-600 hover:text-white ml-6"
                        >
                            <Link href={isLoggedIn ? "/logout" : "/login"}>
                                {isLoggedIn ? "Sair" : "Login"}
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                <div className="md:hidden flex items-center">
                    <DropdownMenu onOpenChange={setIsOpen}>
                        <DropdownMenuTrigger className="focus:outline-none">
                            {isOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48 mt-2 mr-4">
                            <DropdownMenuItem asChild>
                                <button
                                    onClick={(e) => {
                                        handleInicioClick(e);
                                        setIsOpen(false);
                                    }}
                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100 w-full text-left"
                                >
                                    Início
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <button
                                    onClick={(e) => {
                                        handleSobreClick(e);
                                        setIsOpen(false);
                                    }}
                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100 w-full text-left"
                                >
                                    Sobre
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <button
                                    onClick={(e) => {
                                        handleContatoClick(e);
                                        setIsOpen(false);
                                    }}
                                    className="cursor-pointer px-4 py-2 hover:bg-gray-100 w-full text-left"
                                >
                                    Contato
                                </button>
                            </DropdownMenuItem>

                            {/* Botão Vendedor apenas no dropdown mobile - só aparece se logado */}
                            {!isLoading && isLoggedIn && (
                                <DropdownMenuItem className="w-full" asChild>
                                    <Link
                                        href="/vendedor/rifas"
                                        className="flex justify-center px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md mx-2 my-1 font-bold"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Vendedor
                                    </Link>
                                </DropdownMenuItem>
                            )}

                            {/* Botão de Login/Logout apenas no dropdown mobile */}
                            <DropdownMenuItem className="w-full" asChild>
                                <Link
                                    href={isLoggedIn ? "/logout" : "/login"}
                                    className="flex justify-center px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded-md mx-2 my-1"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {isLoggedIn ? "Sair" : "Login"}
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
}
