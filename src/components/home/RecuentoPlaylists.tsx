export default function RecuentoPlaylists() {
  const playlists = [
    { plataforma: "Spotify", editorial: "2", total: "20 MI" },
    { plataforma: "Apple Music", editorial: "N/A", total: "1" },
    { plataforma: "Deezer", editorial: "2", total: "3" },
    { plataforma: "Amazon Music", editorial: "1", total: "1" },
    { plataforma: "YouTube", editorial: "N/A", total: "N/A" },
  ];

  return (
    <div
      className="bg-gradient-to-br from-gray-900/60 to-purple-900/30 backdrop-blur shadow rounded-lg border border-purple-500/30"
      style={{ boxShadow: "0 8px 32px rgba(139, 92, 246, 0.15)" }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(90deg, #7C3AED 0%, #8B5CF6 100%)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                filter: "drop-shadow(0 0 4px rgba(139, 92, 246, 0.3))",
              }}
            >
              <span className="text-xl font-bold text-white">📋</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Recuento de Playlists
              </h3>
              <p className="text-purple-100">
                Última actualización: 12 jul 2025
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody className="">
                {playlists.map((playlist, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
                      {playlist.plataforma}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {playlist.editorial}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {playlist.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}