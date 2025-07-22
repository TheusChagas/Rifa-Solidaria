import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Vendedor } from '@/types';
import { getVendedorById } from '@/lib/getVendorData';

interface VendorInfo {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

export const useVendor = () => {
  const [vendorInfo, setVendorInfo] = useState<VendorInfo | null>(null);
  const [vendorData, setVendorData] = useState<Vendedor | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadVendorData = async () => {
      const urlVendorId = searchParams.get('vendorId');
      const storedVendorId = typeof window !== 'undefined' ? localStorage.getItem('vendorId') : null;
      const currentVendorId = urlVendorId || storedVendorId || 'vendor1';

      // Store vendor ID for future use
      if (typeof window !== 'undefined' && currentVendorId) {
        localStorage.setItem('vendorId', currentVendorId);
      }

      try {
        const vendor = await getVendedorById(currentVendorId);
        if (vendor) {
          setVendorData(vendor);
          setVendorInfo({
            id: vendor.id,
            name: vendor.nomeCompleto || `${vendor.nome} ${vendor.sobrenome}`,
            email: vendor.email,
            phone: vendor.celular
          });
        } else {
          // Fallback to vendor1 if not found
          const fallbackVendor = await getVendedorById('vendor1');
          if (fallbackVendor) {
            setVendorData(fallbackVendor);
            setVendorInfo({
              id: fallbackVendor.id,
              name: fallbackVendor.nomeCompleto || `${fallbackVendor.nome} ${fallbackVendor.sobrenome}`,
              email: fallbackVendor.email,
              phone: fallbackVendor.celular
            });
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados do vendedor:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVendorData();
  }, [searchParams]);

  const setVendorId = async (vendorId: string) => {
    setLoading(true);
    try {
      const vendor = await getVendedorById(vendorId);
      if (vendor) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('vendorId', vendorId);
        }
        setVendorData(vendor);
        setVendorInfo({
          id: vendor.id,
          name: vendor.nomeCompleto || `${vendor.nome} ${vendor.sobrenome}`,
          email: vendor.email,
          phone: vendor.celular
        });
      }
    } catch (error) {
      console.error('Erro ao definir vendedor:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    vendorInfo,
    vendorData,
    loading,
    setVendorId,
    vendorId: vendorInfo?.id || 'vendor1'
  };
};
