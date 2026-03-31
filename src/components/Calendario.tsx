import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Calendar as CalendarIcon, MapPin, Music, Palette, AlertCircle, Star, Eye } from 'lucide-react';

export function Calendario() {
  const [eventos, setSetEventos] = useState<any[]>([]);

  useEffect(() => {
    const fetchEventos = async () => {
      const { data } = await (supabase.from('eventos') as any)
        .select('*')
        .order('fecha', { ascending: true });
      
      if (data) setSetEventos(data);
    };
    fetchEventos();
  }, []);

  if (eventos.length === 0) return null;

  const isEventActive = (eventDate: string) => {
    const today = new Date().toISOString().split('T')[0];
    return eventDate === today;
  };

  const getEventoIcon = (tipo: string) => {
    switch (tipo) {
      case 'musica': return <Music size={60} className="text-[#1E3A8A]" />;
      case 'taller': return <Palette size={60} className="text-[#E2725B]" />;
      case 'demostracion': return <Eye size={60} className="text-purple-500" />;
      case 'aviso': return <AlertCircle size={60} className="text-amber-500" />;
      default: return null;
    }
  };

  return (
    <section id="calendario" className="py-12 px-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <CalendarIcon className="text-[#E2725B]" size={28} />
          <h2 className="text-3xl font-bold text-[#1E3A8A]">Agenda del Mercadillo</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {eventos.map((ev) => {
          const isActive = isEventActive(ev.fecha);
          const hasImage = !!ev.imagen_url;
          
          return (
            <div 
              key={ev.id} 
              className={`group relative bg-white rounded-2xl transition-all duration-500 shadow-sm border-2 overflow-hidden 
                grid grid-rows-[auto_1fr_auto] h-full
                ${isActive 
                  ? 'border-[#E2725B] shadow-lg scale-[1.02] z-10' 
                  : 'border-gray-100 hover:border-gray-200 hover:shadow-md hover:-translate-y-1'
                }`}
            >
              {/* 1. SECCIÓN IMAGEN */}
              {hasImage && (
                <div className="h-36 w-full overflow-hidden relative">
                  <img 
                    src={ev.imagen_url} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    alt={ev.titulo}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              )}

              {isActive && (
                <div className="absolute top-0 left-0 bg-[#E2725B] text-white px-3 py-1 rounded-br-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1 z-20">
                  <Star size={10} fill="currentColor" /> ¡Hoy!
                </div>
              )}

              {/* Icono de fondo decorativo más pequeño */}
              <div className={`absolute ${hasImage ? 'top-40' : 'top-4'} -right-2 opacity-10 rotate-12 pointer-events-none transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-110`}>
                {getEventoIcon(ev.tipo)} 
              </div>

              {/* 2. SECCIÓN CONTENIDO (Este div crece para empujar el footer) */}
              <div className="p-5 flex flex-col">
                <span className={`font-bold text-[10px] mb-1 uppercase tracking-wider ${isActive ? 'text-[#E2725B]' : 'text-gray-400'}`}>
                  {new Date(ev.fecha + 'T00:00:00').toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long' 
                  })}
                </span>
                
                <h3 className="text-lg font-bold text-[#1E3A8A] mb-1 leading-tight">
                  {ev.titulo}
                </h3>
                
                <p className="text-gray-600 text-xs leading-relaxed font-medium line-clamp-3">
                  {ev.descripcion || "Disfruta de una jornada especial con los mejores puestos y el mejor ambiente de la costa."}
                </p>
              </div>

              {/* 3. SECCIÓN FOOTER (Siempre pegado abajo) */}
              <div className="px-5 pb-5">
                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-1.5 text-gray-400 text-[10px]">
                    <MapPin size={12} className="text-[#E2725B]" />
                    <span>Muchavista, Sant Joan</span>
                  </div>
                  
                  <div className="flex gap-1">
                    {ev.tipo === 'aviso' && (
                      <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">AVISO</span>
                    )}
                    {ev.tipo === 'demostracion' && (
                      <span className="text-[9px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">DEMO</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
