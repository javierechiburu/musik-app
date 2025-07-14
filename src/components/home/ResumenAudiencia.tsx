export default function ResumenAudiencia() {
  const metricas = [
    {
      icon: "👥",
      label: "Huella Social",
      value: "4,6 MI",
      description: "Base Total de Fans",
    },
    {
      icon: "🌍",
      label: "Mercado Principal",
      value: "Chile",
      description: null,
    },
    {
      icon: "🎯",
      label: "Mercado Secundario",
      value: "______",
      description: null,
    },
    {
      icon: "🎵",
      label: "Género Principal",
      value: "______",
      description: null,
    },
    {
      icon: "📊",
      label: "Edad Principal",
      value: "______",
      description: null,
    },
  ];

  return (
    <div
      className="bg-gradient-to-r from-indigo-900/20 to-violet-900/20 rounded-xl border border-purple-500/30"
      style={{ boxShadow: "0 8px 32px rgba(139, 92, 246, 0.15)" }}
    >
      {/* Grid de Métricas */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {metricas.map((metrica, index) => (
            <div key={index} className="text-center">
              {/* Icono */}
              <div className="text-3xl mb-3">{metrica.icon}</div>

              {/* Label */}
              <div className="text-sm text-gray-100 mb-2 font-medium">
                {metrica.label}
              </div>

              {/* Valor principal */}
              <div className="text-2xl font-bold text-white mb-1">
                {metrica.value}
              </div>

              {/* Descripción */}
              {metrica.description && (
                <div className="text-xs text-gray-500">
                  {metrica.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}