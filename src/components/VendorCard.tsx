import { MessageCircle, Award, Zap } from 'lucide-react';
import type { Vendor } from '../types/database';

interface VendorCardProps {
  vendor: Vendor;
}

const categoryColors: Record<string, string> = {
  'Gastronomía': 'bg-[#E2725B] text-white',
  'Rastro y Antigüedades': 'bg-amber-100 text-amber-800',
  'Fruta y Verdura': 'bg-green-100 text-green-800',
  'Moda y Outlet': 'bg-purple-100 text-purple-800',
  'Zona de Cafetería': 'bg-orange-100 text-orange-800',
};

const vendorImages: Record<string, string> = {
  'Pollos Asados El Domingo': 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Churros La Playa': 'https://images.pexels.com/photos/4753879/pexels-photo-4753879.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Frankfurt Alemán': 'https://images.pexels.com/photos/4518844/pexels-photo-4518844.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Antigüedades El Rastro': 'https://images.pexels.com/photos/169677/pexels-photo-169677.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Frutas del Levante': 'https://images.pexels.com/photos/1328887/pexels-photo-1328887.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Moda Outlet': 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Café Vista al Mar': 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Quesos Artesanos': 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=800',
};

export function VendorCard({ vendor }: VendorCardProps) {
  const imageUrl = vendorImages[vendor.name] || vendor.image_url || 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800';

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hola, estoy interesado en ${vendor.name} del Mercadillo de Muchavista`);
    window.open(`https://wa.me/${vendor.whatsapp.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={vendor.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {vendor.is_super_offer && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg animate-pulse">
            <Zap className="w-3 h-3 fill-current" />
            Súper Oferta
          </div>
        )}

        {vendor.is_featured && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <Award className="w-3 h-3 fill-current" />
            Recomendado
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">{vendor.name}</h3>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[vendor.category] || 'bg-gray-100 text-gray-800'}`}>
            {vendor.category}
          </span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">
          {vendor.description}
        </p>

        {vendor.whatsapp && (
          <button
            onClick={handleWhatsApp}
            className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Encargar por WhatsApp</span>
          </button>
        )}
      </div>
    </div>
  );
}
