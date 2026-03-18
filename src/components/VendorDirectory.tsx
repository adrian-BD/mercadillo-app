import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Vendor } from '../types/database';
import { CategoryFilters } from './CategoryFilters';
import { VendorCard } from './VendorCard';
import { Loader2 } from 'lucide-react';

export function VendorDirectory() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .order('position');

      if (error) throw error;
      setVendors(data || []);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredVendors = selectedCategory === 'all'
    ? vendors
    : vendors.filter(v => v.category === selectedCategory);

  return (
    <section id="puestos" className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">
            Descubre Nuestros Puestos
          </h2>
          <p className="text-gray-600 text-lg">
            Más de 50 vendedores cada domingo con productos únicos
          </p>
        </div>

        <div className="mb-8">
          <CategoryFilters
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#1E3A8A] animate-spin" />
          </div>
        ) : filteredVendors.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No hay puestos en esta categoría</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
