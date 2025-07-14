export default function TopRecentMilestones() {
  const milestones = [
    {
      description:
        "clasificado entre los 10 mejores artistas de 'chilean reggaeton' en el mundo",
      rating: 5,
      date: "1 jul 2025",
    },
    {
      description:
        "clasificado entre los 10 mejores artistas de 'chilean hip-hop' en el mundo",
      rating: 5,
      date: "1 jul 2025",
    },
    {
      description:
        "clasificado entre los 50 mejores artistas de 'latin worldbeat' en el mundo",
      rating: 5,
      date: "1 jul 2025",
    },
  ];

  return (
    <div
      className="bg-gradient-to-r from-purple-900/40 to-indigo-900/50 rounded-lg p-6 shadow border border-purple-500/30"
      style={{ boxShadow: "0 8px 32px rgba(139, 92, 246, 0.15)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">
            Top Recent Milestones
          </h3>
        </div>
      </div>

      {/* Descripción */}
      <p className="text-purple-300/80 text-sm mb-6 leading-relaxed">
        Mostramos los logros más significativos del artista, calculados en
        función de factores como el tamaño y la posición de listas de
        reproducción/charts, género, país y el rango de Chartmetric.
      </p>

      {/* Milestones Container */}
      <div
        className="bg-gray-800/90 backdrop-blur border border-purple-500/30 rounded-lg p-6"
        style={{ boxShadow: "0 8px 32px rgba(139, 92, 246, 0.15)" }}
      >
        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="flex items-center space-x-6 py-4 border-b border-gray-700/50 last:border-b-0"
            >
              {/* 2. Imagen del artista + contenido */}
              <div className="flex items-center space-x-4 flex-1">
                {/* Imagen del artista */}
                <div
                  className="w-24 h-24 rounded-lg flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(145deg, #A78BFA 0%, #8B5CF6 100%)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    boxShadow: "0 4px 6px -1px rgba(139, 92, 246, 0.2)",
                  }}
                >
                  <span className="text-2xl font-bold text-white">N</span>
                </div>

                {/* Contenido del logro */}
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-base mb-2">
                    Chartmetric Hito: Noiss
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <a
                      href="#"
                      className="hover:underline"
                      style={{ color: "#8B5CF6" }}
                    >
                      Noiss
                    </a>{" "}
                    {milestone.description}
                  </p>
                </div>
              </div>

              {/* 3. Rating de estrellas */}
              <div className="flex space-x-1">
                {[...Array(milestone.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}