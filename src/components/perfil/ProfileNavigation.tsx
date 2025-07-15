"use client";

interface ProfileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function ProfileNavigation({
  activeTab,
  onTabChange,
}: ProfileNavigationProps) {
  const tabs = [
    { id: "personal", label: "Información Personal", icon: "👤" },
    { id: "security", label: "Seguridad", icon: "🔒" },
    { id: "bank", label: "Cuenta Bancaria", icon: "🏦" },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur border border-gray-700/50 rounded-xl p-4 mb-6">
      <nav className="flex space-x-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
