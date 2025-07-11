"use client";

interface MarketingStandardsProps {
  standards: Array<{
    platform: string;
    icon: string;
    description: string;
    color: string;
    terms: string[];
  }>;
}

export default function MarketingStandards({
  standards,
}: MarketingStandardsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 rounded-lg p-6 border border-orange-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                Estándares de Marketing
              </h3>
              <p className="text-orange-200">
                Términos y condiciones de plataformas • Cumplimiento normativo
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Standards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {standards.map((standard, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${standard.color} border border-opacity-30 rounded-lg p-6`}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-4xl">{standard.icon}</div>
              <div>
                <h4 className="text-xl font-bold text-white">
                  {standard.platform}
                </h4>
                <p className="text-sm text-gray-300">{standard.description}</p>
              </div>
            </div>

            <div className="bg-black/20 rounded-lg p-4 mb-4">
              <h5 className="text-md font-semibold text-white mb-3">
                Términos y Condiciones Principales:
              </h5>
              <ul className="space-y-2">
                {standard.terms.map((term, termIndex) => (
                  <li key={termIndex} className="flex items-start space-x-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span className="text-sm text-gray-300">{term}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
