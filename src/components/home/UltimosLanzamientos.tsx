import Image from "next/image";

export default function UltimosLanzamientos() {
  const albums = [
    {
      titulo: "BB Bandia",
      fecha: "20 jun 2025",
      puntaje: 32,
      popularidad: "32/100",
      alcance: "159 MI",
      portada: "/bb_bandia.png",
    },
    {
      titulo: "Dedicatoria",
      fecha: "22 may 2025",
      puntaje: 32,
      popularidad: "32/100",
      alcance: "489,8 MI",
      portada: "/dedicatoria.png",
    },
    {
      titulo: "Te Rajo",
      fecha: "1 feb 2024",
      puntaje: 29,
      popularidad: "29/100",
      alcance: "89,2 MI",
      portada: "/te_rajo.png",
    },
    {
      titulo: "Apago",
      fecha: "9 ene 2020",
      puntaje: 23,
      popularidad: "23/100",
      alcance: "111,3 MI",
      portada: "/apago.png",
    },
  ];

  return (
    <div
      className="bg-gradient-to-br from-gray-900/20 to-purple-900/20 text-white p-6 rounded-lg shadow border border-purple-500/30"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">💿 Álbumes</h2>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Últimos lanzamientos
          </p>
        </div>
        <button
          className="hover:underline text-sm transition-colors text-indigo-500"
          
        >
          Ver Todo &raquo;
        </button>
      </div>

      {/* Último lanzamiento */}
      <div className="mb-8">
        <div
          className="bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-purple-800/30 rounded-lg p-4 flex gap-4 items-center border border-purple-500/30"
          style={{ boxShadow: "0 4px 16px rgba(139, 92, 246, 0.15)" }}
        >
          <div className="w-24 h-24 relative">
            <Image
              src="/bb_bandia.png"
              alt="BB Bandia"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-semibold text-lg">BB Bandia</h4>
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Fecha de Lanzamiento: 20 jun 2025
            </p>
            <div className="mt-2 text-xs space-y-1">
              <p className="flex gap-1 items-center">
                Puntaje:{" "} 
                <span className="text-purple-300 font-semibold">{albums[0].puntaje}</span>
                <svg
                  className="w-4 h-4 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </p>
              <p>
                Popularidad:{" "}
                <span className="text-purple-300">{albums[0].popularidad}</span>
              </p>
              <p>
                Alcance de Playlists:{" "}
                <span className="text-purple-300">{albums[0].alcance}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Carrusel horizontal */}
      <div className="overflow-x-auto">
        <div className="flex gap-6">
          {albums.map((album, index) => (
            <div
              key={index}
              className="min-w-[200px] bg-gradient-to-br from-violet-900/20 to-indigo-800/20 border border-purple-500/30 rounded-lg p-3 flex-shrink-0"
              style={{ boxShadow: "0 4px 8px rgba(139, 92, 246, 0.1)" }}
            >
              <div className="w-full aspect-square mb-3 relative">
                <Image
                  src={album.portada}
                  alt={album.titulo}
                  fill
                  className="rounded-md object-cover"
                />
              </div>
              <h4 className="text-white font-semibold">{album.titulo}</h4>
              <p className="text-sm text-gray-400 mb-2">{album.fecha}</p>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Puntaje:</span>
                  <span className="text-purple-200">{album.puntaje}</span>
                </div>
                <div className="flex justify-between">
                  <span>Popularidad:</span>
                  <span className="text-purple-200">{album.popularidad}</span>
                </div>
                <div className="flex justify-between">
                  <span>Alcance:</span>
                  <span className="text-purple-200">{album.alcance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}