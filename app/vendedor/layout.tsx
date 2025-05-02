import type { Metadata } from "next";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/Sidebar"

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
    title: "Rifa Solidaria",
    description: "Venda suas rifas de forma facil e rapida!",
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
    return (
        <div className="flex min-h-screen bg-stone-100">
            <Sidebar />
            <main className="flex-1 md:ml-[264px] md:mt-[20px]">
                {children}
            </main>
        </div>
    );
}
