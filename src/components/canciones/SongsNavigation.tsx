"use client";

interface SongsNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function SongsNavigation({
  activeTab,
  onTabChange,
}: SongsNavigationProps) {
  const tabs = [
    { id: "overview", label: "Resumen", icon: "📊" },
    { id: "mis-tracks", label: "Todas las Canciones", icon: "🎵" },
    { id: "playlists", label: "Todos los Álbumes", icon: "💿" },
  ];

  return (
    <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-2 mb-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700/70"
            }`}
          >
            <span className="text-sm">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
