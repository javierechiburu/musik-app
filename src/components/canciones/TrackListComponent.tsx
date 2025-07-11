"use client";

interface Track {
  id: string;
  title: string;
  album: string;
  releaseDate: string;
  duration: string;
  streams: string;
  chartPosition?: number;
  previousPosition?: number;
  spotifyStreams: string;
  appleStreams: string;
  youtubeViews: string;
  saves: string;
  isrc: string;
  mood: string;
  genre: string;
}

interface TrackListComponentProps {
  tracks: Track[];
}

export default function TrackListComponent({
  tracks,
}: TrackListComponentProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-6 border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Mis Tracks</h3>
              <p className="text-blue-200">
                Catálogo completo de canciones • {tracks.length} tracks
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tracks List */}
      <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700/50 border-b border-gray-600/50">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Track
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Streams
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Charts
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Plataformas
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Métricas
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {tracks.map((track, index) => (
                <tr
                  key={track.id}
                  className="hover:bg-gray-700/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400 text-sm">{index + 1}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium">{track.title}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <span>{track.album}</span>
                          <span>•</span>
                          <span>{track.releaseDate}</span>
                          <span>•</span>
                          <span>{track.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs bg-gray-600/50 text-gray-300 px-2 py-1 rounded">
                            {track.genre}
                          </span>
                          <span className="text-xs bg-blue-600/50 text-blue-300 px-2 py-1 rounded">
                            {track.mood}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-white font-medium">
                      {track.streams}
                    </div>
                    <div className="text-sm text-gray-400">total streams</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {track.chartPosition ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-400 font-bold">
                          #{track.chartPosition}
                        </span>
                        {track.previousPosition && (
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              track.chartPosition < track.previousPosition
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {track.chartPosition < track.previousPosition
                              ? "↑"
                              : "↓"}
                            {Math.abs(
                              track.chartPosition - track.previousPosition
                            )}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400 text-xs">Spotify:</span>
                        <span className="text-white text-xs">
                          {track.spotifyStreams}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-xs">Apple:</span>
                        <span className="text-white text-xs">
                          {track.appleStreams}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-red-400 text-xs">YouTube:</span>
                        <span className="text-white text-xs">
                          {track.youtubeViews}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="text-center">
                        <div className="text-pink-400 font-medium text-sm">
                          {track.saves}
                        </div>
                        <div className="text-xs text-gray-400">saves</div>
                      </div>
                    </div>
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
