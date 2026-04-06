export function Resena() {
  return (
    <div className="relative py-14 px-4 text-center overflow-hidden bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]">
      
      {/* glow sutil */}
      <div className="absolute inset-0 bg-[#E2725B]/10 blur-3xl opacity-30 pointer-events-none"></div>

      <div className="relative max-w-2xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
          ¿Has visitado el mercadillo?
        </h3>

        <p className="text-gray-400 mb-6 text-sm md:text-base">
          Tu opinión ayuda a que más gente descubra el ambiente único del Mercadillo Muchavista
        </p>

        <a 
          href="https://search.google.com/local/writereview?placeid=TU_ID"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#E2725B] text-white px-7 py-3 rounded-full font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          ⭐ Escribir reseña en Google
        </a>

        {/* refuerzo psicológico */}
        <p className="text-xs text-gray-500 mt-4">
          Solo te llevará 30 segundos 🙌
        </p>
      </div>
    </div>
  );
}