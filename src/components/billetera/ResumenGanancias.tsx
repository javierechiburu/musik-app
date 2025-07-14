export default function ResumenGanancias() {
  const metricas = [
    {
      icon: "💰",
      label: "Balance Total",
      value: "$4,250",
      description: "Ganancias Acumuladas",
    },
    {
      icon: "💳",
      label: "Disponible",
      value: "$2,140",
      description: "Listo para Retirar",
    },
    {
      icon: "⏳",
      label: "Pendiente",
      value: "$890",
      description: "En Procesamiento",
    },
    {
      icon: "📅",
      label: "Último Retiro",
      value: "15 Jul",
      description: "Hace 2 días",
    },
    {
      icon: "📊",
      label: "Este Mes",
      value: "$1,320",
      description: "Julio 2025",
    },
  ];

  return (
    <div
      className="bg-gradient-to-r from-emerald-900/20 to-green-900/20 rounded-xl border border-green-500/30"
      style={{ boxShadow: "0 8px 32px rgba(16, 185, 129, 0.15)" }}
    >
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {metricas.map((metrica, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl mb-3">{metrica.icon}</div>
              <div className="text-sm text-gray-100 mb-2 font-medium">
                {metrica.label}
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {metrica.value}
              </div>
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