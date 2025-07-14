export default function EstadisticasPlataformas() {
  const plataformas = [
    {
      nombre: "Spotify",
      seguidores: "4,59 MI",
      oyentes: "345,15 MI",
      popularidad: "43/100",
      alcance: "2,56 M",
      conversion: "1,33%",
      ratio: "557,03x",
      icon: "🎵",
    },
    {
      nombre: "TikTok",
      views: "1,18 M",
      posts: "545",
      icon: "📱",
    },
    {
      nombre: "Shazam",
      total: "84,28 MI",
      icon: "🔍",
    },
    {
      nombre: "Deezer",
      fans: "139",
      icon: "🎼",
    },
    {
      nombre: "Genius",
      views: "6,47 MI",
      icon: "🧠",
    },
  ];

  return (
    <div
      className="bg-gradient-to-br from-gray-900/80 to-purple-900/40 backdrop-blur rounded-xl p-6 text-white shadow-md border border-purple-500/30"
      style={{ boxShadow: "0 8px 32px rgba(139, 92, 246, 0.15)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📊</span>
          <div>
            <h2 className="text-xl font-bold">Estadísticas por Plataforma</h2>
            <p className="text-sm text-purple-300">
              Rendimiento multiplataforma
            </p>
          </div>
        </div>
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {plataformas.map((p, i) => (
          <div
            key={i}
            style={{
              background: "rgba(31, 41, 55, 0.8)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 4px 16px rgba(139, 92, 246, 0.1)",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 20px 25px -5px rgba(139, 92, 246, 0.3), 0 10px 10px -5px rgba(139, 92, 246, 0.1)";
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.5)";
              e.currentTarget.style.background = "rgba(31, 41, 55, 0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 4px 16px rgba(139, 92, 246, 0.1)";
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.3)";
              e.currentTarget.style.background = "rgba(31, 41, 55, 0.8)";
            }}
            className={`${
              p.nombre.toLowerCase() === "spotify" ? "xl:col-span-2" : ""
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                style={{
                  background:
                    "linear-gradient(90deg, #7C3AED 0%, #8B5CF6 100%)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  filter: "drop-shadow(0 0 4px rgba(139, 92, 246, 0.3))",
                }}
              >
                {p.icon}
              </div>
              <h3 className="text-base font-semibold text-white">{p.nombre}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300">
              {p.seguidores && (
                <div className="flex justify-between">
                  <span>Seguidores:</span>
                  <span>{p.seguidores}</span>
                </div>
              )}
              {p.oyentes && (
                <div className="flex justify-between">
                  <span>Oyentes Mensuales:</span>
                  <span>{p.oyentes}</span>
                </div>
              )}
              {p.popularidad && (
                <div className="flex justify-between">
                  <span>Popularidad:</span>
                  <span>{p.popularidad}</span>
                </div>
              )}
              {p.alcance && (
                <div className="flex justify-between">
                  <span>Alcance:</span>
                  <span>{p.alcance}</span>
                </div>
              )}
              {p.conversion && (
                <div className="flex justify-between">
                  <span>Conversión:</span>
                  <span>{p.conversion}</span>
                </div>
              )}
              {p.ratio && (
                <div className="flex justify-between">
                  <span>Ratio:</span>
                  <span>{p.ratio}</span>
                </div>
              )}
              {p.views && (
                <div className="flex justify-between">
                  <span>Views:</span>
                  <span>{p.views}</span>
                </div>
              )}
              {p.posts && (
                <div className="flex justify-between">
                  <span>Posts:</span>
                  <span>{p.posts}</span>
                </div>
              )}
              {p.total && (
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span>{p.total}</span>
                </div>
              )}
              {p.fans && (
                <div className="flex justify-between">
                  <span>Fans:</span>
                  <span>{p.fans}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}