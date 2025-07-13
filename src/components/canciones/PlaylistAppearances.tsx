"use client";

interface PlaylistAppearance {
  id: string;
  playlistName: string;
  platform: string;
  curator: string;
  followers: string;
  trackTitle: string;
  position: number;
  dateAdded: string;
  streams: string;
  playlistType: "editorial" | "user" | "algorithmic";
  isActive: boolean;
}

interface PlaylistAppearancesProps {
  appearances: PlaylistAppearance[];
}

export default function PlaylistAppearances({
  appearances,
}: PlaylistAppearancesProps) {
  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "spotify":
        return "text-green-400 bg-green-500/20";
      case "apple music":
        return "text-gray-400 bg-gray-500/20";
      case "youtube music":
        return "text-red-400 bg-red-500/20";
      case "deezer":
        return "text-purple-400 bg-purple-500/20";
      default:
        return "text-blue-400 bg-blue-500/20";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "editorial":
        return "text-yellow-400 bg-yellow-500/20";
      case "user":
        return "text-blue-400 bg-blue-500/20";
      case "algorithmic":
        return "text-purple-400 bg-purple-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
              Activas
            </span>
          </div>
          <p className="text-2xl font-bold text-green-400">
            {appearances.filter((a) => a.isActive).length}
          </p>
          <p className="text-sm text-green-300">Playlists Activas</p>
        </div>

        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
              Total
            </span>
          </div>
          <p className="text-2xl font-bold text-blue-400">
            {appearances
              .reduce(
                (sum, a) => sum + parseInt(a.followers.replace(/[^0-9]/g, "")),
                0
              )
              .toLocaleString()}
          </p>
          <p className="text-sm text-blue-300">Seguidores Totales</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/40 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
              Editorial
            </span>
          </div>
          <p className="text-2xl font-bold text-yellow-400">
            {appearances.filter((a) => a.playlistType === "editorial").length}
          </p>
          <p className="text-sm text-yellow-300">Playlists Editoriales</p>
        </div>

        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 border border-purple-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
              Streams
            </span>
          </div>
          <p className="text-2xl font-bold text-purple-400">
            {appearances
              .reduce(
                (sum, a) => sum + parseInt(a.streams.replace(/[^0-9]/g, "")),
                0
              )
              .toLocaleString()}
          </p>
          <p className="text-sm text-purple-300">Streams Totales</p>
        </div>
      </div>

      {/* Playlist Appearances Table */}
      <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700/50 border-b border-gray-600/50">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Playlist
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Track
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Posición
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Seguidores
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Streams
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {appearances.map((appearance) => (
                <tr
                  key={appearance.id}
                  className="hover:bg-gray-700/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {appearance.playlistName}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getPlatformColor(
                              appearance.platform
                            )}`}
                          >
                            {appearance.platform}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getTypeColor(
                              appearance.playlistType
                            )}`}
                          >
                            {appearance.playlistType}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          Por {appearance.curator}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-white font-medium">
                      {appearance.trackTitle}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400 font-bold">
                        #{appearance.position}
                      </span>
                      <span className="text-xs text-gray-400">posición</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-white font-medium">
                      {appearance.followers}
                    </div>
                    <div className="text-xs text-gray-400">seguidores</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-green-400 font-medium">
                      {appearance.streams}
                    </div>
                    <div className="text-xs text-gray-400">streams</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-300">{appearance.dateAdded}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        appearance.isActive
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {appearance.isActive ? "Activa" : "Inactiva"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
