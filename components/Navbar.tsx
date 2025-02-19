"use client";

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Logo from "@/assets/Logo.png"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "Início", href: "/" },
        { name: "Sobre", href: "/sobre" },
        { name: "Contato", href: "/contato" },
        { name: "Preços", href: "/precos" },
    ];

    return (
        <nav className="w-full border-b bg-white">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src={Logo}
                        alt="RifaFácil Logo"
                        className="h-[72px] w-auto"
                    />
                    <div className="flex flex-col hidden">
                        <span className="text-xl font-bold text-green-500 leading-[16px]">Rifa entre</span>
                        <span className="text-xl font-bold text-green-500 leading-[16px] mr-[20px]">Amigos</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="flex gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium hover:text-green-500 transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <Button variant="outline" className="ml-4 bg-green-500 text-white hover:bg-green-600 hover:text-white">
                        <Link href="/login">Login</Link>
                    </Button>
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
                            {/* Itens do menu */}
                            {navItems.map((item) => (
                                <DropdownMenuItem key={item.name} asChild>
                                    <Link
                                        href={item.href}
                                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </DropdownMenuItem>
                            ))}

                            {/* Botão de Login apenas no dropdown mobile */}
                            <DropdownMenuItem className="w-full" asChild>
                                <Link
                                    href="/login"
                                    className="flex justify-center px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded-md mx-2 my-1"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
}