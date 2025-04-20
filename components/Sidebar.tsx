"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
    const pathname = usePathname();

    const navItems = [
        { name: "Rifas", href: "/vendedor/rifas" },
        { name: "Ranking Vendedores", href: "/vendedor/ranking" },
        { name: "Histórico de clientes", href: "/vendedor/historico" },
        { name: "Configurações", href: "/vendedor/configuracoes" },
        { name: "Suporte", href: "" },
        { name: "Afiliações", href: ""},
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
                        <div className="flex flex-col gap-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`px-4 py-2 text-[16px] font-semibold rounded-lg relative
                                                    hover:bg-gray-300 transition-colors duration-200
                                                    ${isActive ? 'text-green-400 font-semibold' : 'text-gray-600'}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {isActive && (
                                            <div className="absolute inset-0 bg-green-300 rounded-lg
                                                            left-1 right-1 top-1 bottom-1 w-[calc(100%-8px)]" />
                                        )}
                                        <span className="relative z-10">
                                            {item.name}
                                        </span>
                                    </Link>
                                );
                            })}
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
                    <nav className="flex flex-col gap-6">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="relative px-2 py-2 text-sm rounded-lg
                                                hover:bg-gray-300 transition-colors duration-200"
                                >
                                    {/* Fundo verde para estado ativo */}
                                    {isActive && (
                                        <div className="absolute inset-0 bg-green-300 rounded-lg
                                                        w-[calc(100%)] hover:scale-[110%] duration-500"/>
                                    )}

                                    <span className={`relative z-10 ${isActive
                                        ? 'text-green-600 font-semibold'
                                        : 'text-gray-600 hover:text-gray-800'
                                        }`}>
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

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