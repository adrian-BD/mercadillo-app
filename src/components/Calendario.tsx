import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Calendar as CalendarIcon, MapPin, Music, Palette, AlertCircle, Star, Eye } from 'lucide-react';

export function Calendario() {
  const [eventos, setEventos] = useState<any[]>([]);

  useEffect(() => {
    const fetchEventos = async () => {
      const { data } = await (supabase.from('eventos') as any)
        .select('*')
        .order('fecha', { ascending: true });
      
      if (data) setEventos(data);
    };
    fetchEventos();
  }, []);

  if (eventos.length === 0) return null;

  const isEventActive = (eventDate: string) => {
    const today = new Date().toISOString().split('T')[0];
    return eventDate === today;
  };

  // Función para obtener el icono según el tipo
  const getEventoIcon = (tipo: string) => {
    switch (tipo) {
      case 'musica': return <Music size={80} className="text-[#1E3A8A]" />;
      case 'taller': return <Palette size={80} className="text-[#E2725B]" />;
      case 'demostracion': return <Eye size={80} className="text-purple-500" />;
      case 'aviso': return <AlertCircle size={80} className="text-amber-500" />;
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventos.map((ev) => {
          const isActive = isEventActive(ev.fecha);
          
          return (
            <div 
              key={ev.id} 
              className={`relative bg-white rounded-3xl p-6 transition-all duration-300 shadow-sm border-2 overflow-hidden
                ${isActive 
                  ? 'border-[#E2725B] shadow-lg scale-[1.02] z-10' 
                  : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
                }`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 bg-[#E2725B] text-white px-4 py-1 rounded-br-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                  <Star size={10} fill="currentColor" /> ¡Este Domingo!
                </div>
              )}

              {/* Icono de fondo dinámico corregido */}
              <div className="absolute -top-2 -right-2 opacity-10 rotate-12 pointer-events-none">
                {getEventoIcon(ev.tipo)}
              </div>

              <div className="flex flex-col h-full mt-4">
                <span className={`font-bold text-xs mb-2 uppercase tracking-wider ${isActive ? 'text-[#E2725B]' : 'text-gray-400'}`}>
                  {new Date(ev.fecha + 'T00:00:00').toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long' 
                  })}
                </span>
                
                <h3 className="text-xl font-bold text-[#1E3A8A] mb-2 pr-8 leading-tight">
                  {ev.titulo}
                </h3>
                
                <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                  {ev.descripcion || "Disfruta de una jornada especial con los mejores puestos y el mejor ambiente de la costa."}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <MapPin size={14} className="text-[#E2725B]" />
                    <span>Muchavista, Sant Joan</span>
                  </div>
                  
                  {ev.tipo === 'aviso' && (
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                      AVISO IMPORTANTE
                    </span>
                  )}
                  {ev.tipo === 'demostracion' && (
                    <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-lg uppercase">
                      Demostración
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
