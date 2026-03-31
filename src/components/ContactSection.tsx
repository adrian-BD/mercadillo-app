import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contacto" className="relative py-16 px-6 bg-[#1E3A8A] text-white overflow-hidden">
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Cuerpo: 4 Columnas para llenar el espacio horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start mb-16">
          
          {/* 1. Logo Protagonista + Texto Oficial */}
          <div className="flex flex-col items-center md:items-start group cursor-default">
            <div className="relative mb-6">
              <img 
                src="/mercadillo.png" 
                alt="Logo Muchavista" 
                className="w-32 h-32 md:w-40 md:h-40 object-contain opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 rounded-xl"
              />
            </div>
            <div className="space-y-1 text-center md:text-left">
              <p className="text-[#E2725B] font-black tracking-[0.2em] text-xs uppercase italic">
                Mercadillo Oficial
              </p>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white/90 group-hover:text-white transition-colors">
                Muchavista
              </h3>
            </div>
          </div>

          {/* 2. Contacto */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold border-b border-white/10 pb-2 inline-block">Contacto</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#E2725B] flex-shrink-0 mt-1" />
                <p className="text-white/80 text-sm">
                  Av. Elda, 17, Sant Joan d'Alacant<br />
                  03550 Alicante
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-[#E2725B]" />
                <p className="text-white/80 text-sm">+34 123 12 12 12</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-[#E2725B]" />
                <p className="text-white/80 text-sm break-all">adriandigital2026@gmail.com</p>
              </div>
            </div>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 3. Horarios */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold border-b border-white/10 pb-2 inline-block">Horarios</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/20">
                <span className="text-white/80 text-sm">Lunes - Sábado</span>
                <span className="font-semibold text-sm">Cerrado</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm">Domingo</span>
                <span className="font-semibold text-[#E2725B] text-sm">8:00 - 14:30</span>
              </div>
            </div>
          </div>

          {/* 4. Quiénes somos / CTA */}
          <div className="bg-[#E2725B] rounded-2xl p-6 self-center md:self-start">
            <h3 className="font-bold text-lg mb-2">¿Quieres un Puesto?</h3>
            <p className="text-white/90 mb-4 text-xs leading-relaxed">
              Si estás interesado en vender en nuestro mercadillo, contáctanos para más información sobre disponibilidad y precios.
            </p>
            <a
              href="mailto:adriandigital2026@gmail.com"
              className="inline-block w-full text-center bg-white text-[#E2725B] px-4 py-3 rounded-full font-bold text-sm hover:bg-white/90 transition-colors"
            >
              Solicitar Información
            </a>
          </div>
        </div>

        {/* FOOTER */}
        <div className="pt-8 border-t border-white/10 text-center text-white/40 text-xs">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 Mercadillo de Muchavista. Todos los derechos reservados.</p>
            
            <p className="flex flex-col md:flex-row items-center justify-center gap-1">
              <span>
                Diseño por <span className="text-white/60">Adrian Digital 2026</span>
              </span>
              <span className="hidden md:inline opacity-30">•</span>
              <span>
                <a 
                  href="mailto:adriandigital2026@gmail.com" 
                  className="text-[#E2725B] hover:text-white transition-colors duration-300 underline underline-offset-4 decoration-[#E2725B]/20"
                >
                  ¿Quieres tu propia web?
                </a>
              </span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
