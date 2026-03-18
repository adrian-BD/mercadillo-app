import { useState } from 'react';
import { MapPin, X, Map as MapIcon } from 'lucide-react';

export function MapSection() {
  const [showMapModal, setShowMapModal] = useState(false);
  const [showPlanoModal, setShowPlanoModal] = useState(false);


  const embedUrl = "https://www.google.com";

  return (
    <section id="mapa" className="py-16 px-6 bg-[#F9F8F6]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">
            Encuéntranos
          </h2>
          
          {/* Botones de Mapas */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <button 
              onClick={() => setShowMapModal(true)}
              className="flex items-center gap-2 bg-[#1E3A8A] hover:bg-[#2563EB] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md transition-all transform hover:scale-105"
            >
              <MapPin className="w-4 h-4" />
              Ubicación Google Maps
            </button>

            <button 
              onClick={() => setShowPlanoModal(true)}
              className="flex items-center gap-2 bg-[#E2725B] hover:bg-[#d15f4a] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md transition-all transform hover:scale-105"
            >
              <MapIcon className="w-4 h-4" />
              Ver Plano de Puestos
            </button>
          </div>

          <p className="text-gray-600 text-lg">
            Av. Elda, 17, Sant Joan d'Alacant, Alicante
          </p>
        </div>

        {/* MODAL 1: Google Maps */}
        {showMapModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowMapModal(false)}>
            <div className="relative bg-white w-full max-w-5xl h-[80vh] rounded-3xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowMapModal(false)} className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-lg text-gray-800"><X /></button>
              <iframe src={embedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
            </div>
          </div>
        )}

        {/* MODAL 2: Plano Interior (Imagen) */}
        {showPlanoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowPlanoModal(false)}>
            <div className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl p-2" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowPlanoModal(false)} className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full shadow-lg text-gray-800"><X /></button>
                <iframe src="https://www.google.com/maps/d/embed?mid=1APxs8s9Ye1z_ZNhPLfQrfgStwfBqiaA&ehbc=2E312F&noprof=1" 
                  width="640" 
                  height="480">
                  allow="geolocation"  
                  </iframe>
              <div className="p-4 text-center">
                <p className="font-bold text-[#1E3A8A]">Distribución de puestos y sectores</p>
              </div>
            </div>
          </div>
        )}

        {/* Tus tarjetas de transporte originales intactas */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="w-12 h-12 bg-[#E2725B] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 className="font-bold text-[#1E3A8A] mb-2">TRAM</h3>
            <p className="text-gray-600 text-sm">Línea 3 - Parada Costa Blanca</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="w-12 h-12 bg-[#E2725B] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            </div>
            <h3 className="font-bold text-[#1E3A8A] mb-2">Autobús</h3>
            <p className="text-gray-600 text-sm">Líneas 21 y 22</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="w-12 h-12 bg-[#E2725B] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="font-bold text-[#1E3A8A] mb-2">Parking</h3>
            <p className="text-gray-600 text-sm">Av. Elda y calles adyacentes</p>
          </div>
        </div>
      </div>
    </section>
  );
}
