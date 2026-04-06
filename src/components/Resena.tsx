export function Resena() {
  return (
    <div className="py-16 px-4 bg-[#F9F8F6] border-t border-[#E5E5E5]">
      <div className="max-w-2xl mx-auto text-center">

        <h3 className="text-2xl md:text-3xl font-black text-[#1E3A8A] mb-3">
          ¿Has estado en el mercadillo?
        </h3>

        <p className="text-gray-600 mb-6">
          Comparte tu experiencia y ayuda a que más gente descubra el ambiente del domingo en Muchavista
        </p>

        {/* ⭐ RATING */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-[#E2725B] text-xl">★★★★★</span>
          <span className="text-gray-700 font-semibold text-sm">
            4.6 (128 reseñas)
          </span>
        </div>

        {/* BOTÓN */}
        <a href="https://search.google.com/local/writereview?placeid=ChIJZb-wYLU5Yg0RQMsnvFKuHzE"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#E2725B] text-white px-8 py-3 rounded-full font-bold shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Escribir reseña en Google
        </a>

        <p className="text-xs text-gray-500 mt-4">
          Solo te llevará 30 segundos 🙌
        </p>

      </div>
    </div>
  );
}