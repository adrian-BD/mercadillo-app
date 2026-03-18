import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState<any>(null);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const isSunday = now.getDay() === 0;
      const totalMinutes = now.getHours() * 60 + now.getMinutes();
      const isOpenTime = totalMinutes >= 8 * 60 && totalMinutes < 14 * 60 + 30;
      setIsOpen(isSunday && isOpenTime);
    };

    const fetchEvent = async () => {
      const { data } = await (supabase.from('eventos') as any)
        .select('*')
        .eq('es_destacado', true)
        .limit(1)
        .maybeSingle();
      
      if (data) setActiveEvent(data);
    };

    checkStatus();
    fetchEvent();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#1E3A8A] text-white overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg- opacity-20"></div>

      <div className="relative px-6 py-16 max-w-6xl mx-auto">
        <div className="text-center space-y-8">
          
          {/* Badge Dinámico */}
          <div className="inline-block">
            {activeEvent?.tipo === 'aviso' ? (
              <span className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
                ⚠️ AVISO: {activeEvent.titulo}
              </span>
            ) : isOpen ? (
              <span className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                ¡Estamos abiertos!
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                🗓️ Te esperamos el próximo domingo
              </span>
            )}
          </div>

          {/* Título y Descripción */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">
              Mercadillo <span className="text-[#E2725B]">Muchavista</span>
            </h1>
            
            <div className="space-y-2">
              <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed">
                Rastro, Gastronomía y Tesoros a un paso de la playa
              </p>
              
              {/* Dirección con aspecto de "Tag" minimalista */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-[1px] w-4 bg-[#E2725B]/40"></div>
                <p className="text-xs md:text-sm text-[#E2725B] font-bold uppercase tracking-[0.3em]">
                  Av. Elda, 17 · Sant Joan d'Alacant
                </p>
                <div className="h-[1px] w-4 bg-[#E2725B]/40"></div>
              </div>
            </div>
          </div>


          {/* Info Footer */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-8 text-xs font-bold uppercase tracking-widest text-white/60">
            <div className="flex items-center gap-2">
              <span className="text-[#E2725B]">●</span> Domingos 8:00 - 14:30
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#E2725B]">●</span> Muchavista, Sant Joan
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
