import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contacto" className="py-16 px-6 bg-[#1E3A8A] text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Contacto</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#E2725B] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Ubicación</h3>
                  <p className="text-white/80">
                    Av. Elda, 17<br />
                    Sant Joan d'Alacant<br />
                    03550 Alicante
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[#E2725B] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Teléfono</h3>
                  <p className="text-white/80">+34 123 12 12 12</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[#E2725B] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-white/80">adriandigital2026@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold mb-4">Síguenos</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Horarios</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/20">
                <span className="text-white/80">Lunes - Sábado</span>
                <span className="font-semibold">Cerrado</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Domingo</span>
                <span className="font-semibold text-[#E2725B]">8:00 - 14:30</span>
              </div>
            </div>

            <div className="mt-8 bg-[#E2725B] rounded-2xl p-6">
              <h3 className="font-bold text-xl mb-2">¿Quieres un Puesto?</h3>
              <p className="text-white/90 mb-4">
                Si estás interesado en vender en nuestro mercadillo, contáctanos para más información sobre disponibilidad y precios.
              </p>
              <a
                href="mailto:adriandigital2026@gmail.com"
                className="inline-block bg-white text-[#E2725B] px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
              >
                Solicitar Información
              </a>
            </div>
          </div>
        </div>


          <div className="mt-12 pt-8 border-t border-white/20 text-center text-white/60 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
             <p>© 2026 Mercadillo de Muchavista. Todos los derechos reservados.</p>
          
           <p className=" text-sm flex flex-col md:flex-row items-center justify-center gap-1">
            <span>
              Diseño y Desarrollo por <span>Adrian Digital 2026</span>
            </span>
            <span className="hidden md:inline text-gray-700">•</span>
            <span>
              ¿Quieres tu propia web?{' '}
              <a 
                href="mailto:adriandigital2026@gmail.com" 
                className="text-[#ffd000] hover:text-white transition-colors duration-300 underline underline-offset-4 decoration-[#ffd000]/30 hover:decoration-white"
              >
                Contáctame
              </a>
            </span>
          </p>
          </div>
        </div>





      </div>
    </section>
  );
}
