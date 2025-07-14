export default function MovimientosMetricas() {
  const metricas = [
    { nombre: "Transmisiones de por vida", valor: "+2,22%", positivo: true },
    { nombre: "Seguidores", valor: "+0,48%", positivo: true },
    { nombre: "Listas de reproducción", valor: "+0,37%", positivo: true },
    { nombre: "Alcance de lista editorial", valor: "+0,07%", positivo: true },
    { nombre: "Contar", valor: "+0,03%", positivo: true },
    { nombre: "Oyentes mensuales", valor: "-1,35%", positivo: false },
    { nombre: "Alcance total de lista", valor: "-1,97%", positivo: false },
  ];

  return (
    <div
      className="bg-gradient-to-br from-gray-900/80 to-indigo-900/20 text-white rounded-xl p-6 shadow-md backdrop-blur border border-purple-500/30"
      style={{ boxShadow: "0 8px 32px rgba(139, 92, 246, 0.15)" }}
    >
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📊</span>
          <div>
            <h2 className="text-xl font-bold">Movimientos de Métricas</h2>
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Cambio porcentual por 1 semana
            </p>
          </div>
        </div>
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metricas.map((m, i) => (
          <div
            key={i}
            className="bg-gray-800/80 rounded-lg p-5 shadow hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-purple-500/30"
            style={{ boxShadow: "0 4px 16px rgba(139, 92, 246, 0.1)" }}
          >
            <h4 className="text-sm text-gray-300 mb-2">{m.nombre}</h4>
            <div className="flex items-center gap-2">
              <span
                className={`text-xl animate-pulse ${
                  m.positivo ? "text-green-400" : "text-red-400"
                }`}
                style={{
                  filter: "drop-shadow(0 0 4px rgba(139, 92, 246, 0.3))",
                }}
              >
                {m.positivo ? "⬤" : "⬤"}
              </span>
              <p
                className={`text-2xl font-semibold ${
                  m.positivo ? "text-green-300" : "text-red-300"
                }`}
                style={{ color: m.positivo ? "#10B981" : "#EF4444" }}
              >
                {m.valor}
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-1">Cambio semanal</p>
          </div>
        ))}
      </div>
    </div>
  );
}