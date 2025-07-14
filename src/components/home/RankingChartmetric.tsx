export default function RankingChartmetric() {
  const rankings = [
    {
      label: "Rank de Artista de Cha...",
      value: "#4237",
      type: "global",
      icon: null,
    },
    {
      label: "Chile",
      value: "#17",
      type: "country",
      icon: "🇨🇱",
    },
    {
      label: "Hip-Hop/Rap",
      value: "#1470",
      type: "genre",
      icon: null,
    },
    {
      label: "Worldbeat",
      value: "#172",
      type: "genre",
      icon: null,
    },
    {
      label: "Dance",
      value: "#1256",
      type: "genre",
      icon: null,
    },
  ];

  const MiniChart = () => (
    <svg width="60" height="40" viewBox="0 0 60 40" className="mt-2">
      <polyline
        points="5,35 15,30 25,25 35,20 45,15 55,10"
        fill="none"
        stroke="#8B5CF6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-bold">
              Ranking del Artista
            </h3>
          </div>
        </div>
      </div>

      {/* Grid de Rankings */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rankings.map((rank, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/20 to-purple-800/20 rounded-xl p-5 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-purple-500/30"
              style={{ boxShadow: "0 4px 16px rgba(139, 92, 246, 0.1)" }}
            >
              {/* Header con icono Chartmetric */}
              <div className="flex justify-between items-start mb-4">
                <div></div>
                <div className="flex items-center space-x-1">
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center text-white"
                 
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                  </div>
                  {rank.icon && <span className="text-lg">{rank.icon}</span>}
                </div>
              </div>

              {/* Ranking número */}
              <div className="mb-2">
                <div
                  className="text-3xl font-bold"
                >
                  {rank.value}
                </div>
              </div>

              {/* Descripción */}
              <div className="mb-3">
                <div className="text-sm text-gray-300">{rank.label}</div>
              </div>

              {/* Mini gráfico */}
              <div className="flex justify-start">
                <MiniChart />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}