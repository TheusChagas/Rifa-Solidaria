'use client'

import { createContext, useContext } from 'react';
import { useVendor } from '@/hooks/useVendor';
import { Sidebar } from '@/components/vendedor/Sidebar';
import { Vendedor } from '@/types';
import "@/app/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });

interface VendorContextType {
    vendorInfo: {
        id: string;
        name: string;
        email?: string;
        phone?: string;
    } | null;
    vendorData: Vendedor | null;
    vendorId: string;
    setVendorId: (vendorId: string) => void;
    loading: boolean;
}

const VendorContext = createContext<VendorContextType | null>(null);

export const useVendorContext = () => {
    const context = useContext(VendorContext);
    if (!context) {
        throw new Error('useVendorContext must be used within VendorLayout');
    }
    return context;
};

export default function VendorLayout({ children }: { children: React.ReactNode; }) {
    const { vendorInfo, vendorData, vendorId, setVendorId, loading } = useVendor();

    return (
        <VendorContext.Provider value={{ vendorInfo, vendorData, vendorId, setVendorId, loading }}>
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <main className="flex-1 md:ml-[264px] md:mt-[20px]">
                    {children}
                </main>
            </div>
        </VendorContext.Provider>
    );
}