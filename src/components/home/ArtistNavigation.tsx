"use client";

interface ArtistNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function ArtistNavigation({
  activeTab,
  onTabChange,
}: ArtistNavigationProps) {
  const tabs = [
    { id: "overview", label: "Resumen", icon: "📊" },
    { id: "social", label: "Redes Sociales", icon: "👥" },
    { id: "streaming", label: "Streaming", icon: "🎵" },
    { id: "charts", label: "Charts", icon: "📈" },
  ];

  return (
    <div className="bg-gray-800/80 backdrop-blur border border-gray-700/50 rounded-lg p-4 mb-6">
      <nav className="flex space-x-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
