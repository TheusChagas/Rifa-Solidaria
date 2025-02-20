"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"
import Logo from "@/assets/Logo.png"
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "Rifas", href: "/vendedor/rifas" },
        { name: "Ranking Vendedores", href: "/vendedor/ranking" },
        { name: "Histórico de clientes", href: "/vendedor/historico" },
        { name: "Configurações", href: "/vendedor/configuracoes" },
        { name: "Suporte", href: "" },
    ];

    return (
        <>
            {/* Mobile Sidebar */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="focus:outline-none"
                        >
                            {isOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="left" className="w-64">
                        <div className="flex flex-col h-full pt-6">
                            <div className="flex flex-col gap-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="px-4 py-2 text-sm font-medium hover:bg-verde-300 rounded-md transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="absolute bottom-4">
                                <Button
                                    asChild
                                    className="w-[128px] h-[44px] bg-green-500 hover:bg-green-600 text-white"
                                >
                                    <Link href="/login">Sair</Link>
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden md:block fixed left-0 top-0 h-screen w-[252px] border-r bg-white p-6">
                <Link href="/" className="flex items-center mb-16">
                    <Image
                        src={Logo}
                        alt="RifaFácil Logo"
                        className="h-[160px] w-auto"
                    />
                </Link>
                <div className="flex flex-col h-full">
                    {/* Itens de navegação */}
                    <nav className="flex flex-col gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="relative px-4 py-2 text-sm font-medium rounded-md transition-colors overflow-hidden
                                before:absolute before:inset-0 before:bg-verde-200 before:scale-x-0 before:origin-left
                                before:transition-transform before:duration-300 hover:before:scale-x-100"
                            >
                                <span className="relative z-10 text-black transition-colors duration-300 hover:text-white">
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                    </nav>

                    {/* Botão Login */}
                    <div className="absolute bottom-4">
                        <Button
                            asChild
                            className="w-[128px] h-[44px] bg-green-500 hover:bg-green-600 text-white"
                        >
                            <Link href="/login">Sair</Link>
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    );
}