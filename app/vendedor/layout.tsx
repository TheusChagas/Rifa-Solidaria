import type { Metadata } from "next";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/Sidebar"

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
    title: "Rifa Solidaria",
    description: "Venda suas rifas de forma facil e rapida!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt">
            <body className={`${inter.className} antialiased bg-branco-200`}>
                <div className="flex">
                    <Sidebar />

                    <main className="flex-1 md:ml-64">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
