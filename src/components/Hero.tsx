import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Star } from 'lucide-react';

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
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 bg-white/5 opacity-20 pointer-events-none"></div>

      {/* He reducido el padding vertical de py-20/28 a py-12/16 para quitar espacio vacío */}
      <div className="relative px-6 py-12 md:py-16 max-w-7xl mx-auto">
        <div className="text-center space-y-10">
          
          {/* Badge Dinámico Superior */}
          <div className="inline-block">
            {activeEvent?.tipo === 'aviso' ? (
              <span className="inline-flex items-center gap-2 bg-amber-500 text-white px-6 py-2 rounded-full text-xs font-black shadow-xl animate-bounce uppercase tracking-widest">
                ⚠️ AVISO: {activeEvent.titulo}
              </span>
            ) : isOpen ? (
              <span className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-full text-xs font-black shadow-xl uppercase tracking-widest">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                ¡Estamos abiertos ahora!
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-full text-xs font-bold border border-white/20 uppercase tracking-widest">
                🗓️ Próxima cita: Domingo 08:00h
              </span>
            )}
          </div>

          {/* Bloque Central: Logo y Título GIGANTE */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            
            {/* LOGO con Borde Naranja */}
            <div className="relative flex-shrink-0 group">
              <div className="absolute inset-0 bg-[#E2725B]/20 blur-3xl rounded-full scale-150 group-hover:bg-[#E2725B]/30 transition-all duration-700"></div>
              
              <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-[4px] border-[#E2725B] shadow-2xl bg-white/10 backdrop-blur-sm p-1 transition-transform duration-500 group-hover:scale-105">
                <img 
                  src="/mercadillo.png" 
                  alt="Mercadillo Muchavista"
                  className="w-full h-full object-cover scale-105" 
                />
              </div>
              
              <div className="absolute bottom-3 right-3 bg-white text-[#E2725B] p-1.5 rounded-full shadow-lg border-2 border-[#E2725B] z-10">
                <Star size={12} fill="currentColor" />
              </div>
            </div>

            {/* Título Masivo */}
            <div className="flex flex-col text-center md:text-left">
              <h1 className="text-6xl md:text-[7.5rem] font-black leading-[0.75] tracking-tighter uppercase italic drop-shadow-2xl">
                <span className="text-white block">Mercadillo</span>
                <span className="text-[#E2725B] block -mt-2">Muchavista</span>
              </h1>
              
              <div className="flex items-center justify-center md:justify-start gap-4 mt-8">
                <div className="h-[3px] w-12 bg-[#E2725B]"></div>
                <p className="text-white/80 font-black text-xs md:text-sm uppercase tracking-[0.6em]">
                  Sant Joan d'Alacant
                </p>
              </div>
            </div>
          </div>

          {/* Descripción Inferior */}
          <div className="pt-4">
            <p className="text-xl md:text-3xl text-white/90 max-w-3xl mx-auto font-medium italic leading-tight">
              "Rastro, Gastronomía y Tesoros a un paso de la playa"
            </p>
          </div>

          {/* HE ELIMINADO EL BLOQUE "Info Footer Minimalista" AQUÍ */}

        </div>
      </div>
    </div>
  );
}
