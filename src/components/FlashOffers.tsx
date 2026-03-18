import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { FlashOffer } from '../types/database';
import { Zap, Clock, Loader2 } from 'lucide-react';

export function FlashOffers() {
  const [offers, setOffers] = useState<FlashOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();

    const subscription = supabase
      .channel('flash_offers_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'flash_offers' }, () => {
        fetchOffers();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchOffers = async () => {
    try {
      const { data, error } = await supabase
        .from('flash_offers')
        .select('*')
        .eq('is_active', true)
        .gte('valid_until', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOffers(data || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeRemaining = (validUntil: string) => {
    const now = new Date();
    const end = new Date(validUntil);
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return 'Expirada';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ${minutes}m restantes`;
    }
    return `${minutes}m restantes`;
  };

  if (loading) {
    return (
      <section id="ofertas" className="py-16 px-6 bg-gradient-to-br from-[#E2725B] to-[#d66550]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (offers.length === 0) {
    return null;
  }

  return (
    <section id="ofertas" className="py-16 px-6 bg-gradient-to-br from-[#E2725B] to-[#d66550]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Zap className="w-4 h-4 fill-current animate-pulse" />
            Ofertas Relámpago
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¡Solo por Hoy!
          </h2>
          <p className="text-white/90 text-lg">
            Aprovecha estas ofertas exclusivas de nuestros vendedores
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-[#1E3A8A] text-lg mb-1">
                    {offer.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {offer.description}
                  </p>
                </div>
                {offer.price && (
                  <div className="bg-[#E2725B] text-white px-3 py-1 rounded-full font-bold text-sm ml-2">
                    {offer.price}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Clock className="w-4 h-4" />
                <span>{formatTimeRemaining(offer.valid_until)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
