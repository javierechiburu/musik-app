import Image from "next/image";

export default function CancionesPrincipales() {
  const canciones = [
    {
      titulo: "PERREA KTM",
      fecha: "18 ago 2022",
      puntaje: 85.2,
      popularidad: 58,
      portada: "/perrea.png",
    },
    {
      titulo: "Apago",
      fecha: "9 ene 2020",
      puntaje: 63.8,
      popularidad: 36,
      publicaciones: 29,
      portada: "/apago.png",
    },
    {
      titulo: "Te Rajo",
      fecha: "1 feb 2024",
      puntaje: 68.4,
      popularidad: 43,
      portada: "/te_rajo.png",
    },
  ];

  return (
    <div
      className="bg-gradient-to-r from-gray-900/60 to-purple-900/50 text-white p-6 rounded-lg shadow border border-purple-500/30"
      style={{
        background:
          "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(99, 102, 241, 0.15) 50%, rgba(124, 58, 237, 0.2) 100%)",
        boxShadow: "0 8px 32px rgba(139, 92, 246, 0.15)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <svg
              className="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          TOP Canciones  
           
        </h2>
        <button
          className="hover:underline text-sm transition-colors text-indigo-500"
        >
          Ver Todo &raquo;
        </button>
      </div>

      {/* Lista horizontal */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto">
          {canciones.map((cancion, index) => (
            <div
              key={index}
              className="flex-shrink-0 2xl:w-[350px] bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-purple-800/40 rounded-xl overflow-hidden border border-purple-500/30 flex"
              style={{ boxShadow: "0 4px 16px rgba(139, 92, 246, 0.2)" }}
            >
              {/* Portada */}
              <div className="relative w-[100px] h-full">
                <Image
                  src={cancion.portada}
                  alt={cancion.titulo}
                  fill
                  className="object-cover"
                />
                {/* Botón play superpuesto */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                    ▶️
                  </div>
                </div>
              </div>

              {/* Detalles */}
              <div className="flex flex-col justify-between p-3 flex-1">
                <div>
                  <h4 className="text-white font-semibold text-sm hover:underline cursor-pointer hover:text-purple-200 transition-colors">
                    {cancion.titulo}
                  </h4>
                  <p className="text-xs text-gray-400 mb-1">
                    Fecha de Lanzamiento: {cancion.fecha}
                  </p>
                  <div className="text-xs space-y-1">
                    <p className="text-purple-300 flex items-center gap-1">
                      🔊 Puntaje:{" "}
                      <span className="text-white">{cancion.puntaje}</span>
                       <svg
                        className="w-4 h-4 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </p>
                    <p className="text-purple-400">
                      <span className="mr-1">🟢</span>Popularidad:{" "}
                      <span className="text-white">{cancion.popularidad}</span>
                    </p>
                    {cancion.publicaciones && (
                      <p className="text-purple-300">
                        <span className="mr-1">🎵</span>Publicaciones:{" "}
                        <span className="text-white">
                          {cancion.publicaciones}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}