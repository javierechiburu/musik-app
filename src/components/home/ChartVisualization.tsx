"use client";

import { useState } from 'react';

interface ChartVisualizationProps {
  title: string;
  type: 'monthly-listeners' | 'chart-evolution' | 'playlist-reach';
  data?: any[];
}

export default function ChartVisualization({ title, type, data }: ChartVisualizationProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const getChartIcon = () => {
    switch (type) {
      case 'monthly-listeners':
        return '📊';
      case 'chart-evolution':
        return '📈';
      case 'playlist-reach':
        return '📋';
      default:
        return '📊';
    }
  };

  const getChartDescription = () => {
    switch (type) {
      case 'monthly-listeners':
        return 'Evolución de oyentes mensuales';
      case 'chart-evolution':
        return 'Evolución en charts principales';
      case 'playlist-reach':
        return 'Alcance de playlists en el tiempo';
      default:
        return 'Datos del gráfico';
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900/40 to-cyan-900/40 backdrop-blur border border-indigo-500/30 rounded-lg p-6 hover:border-indigo-400/50 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-cyan-400">{title}</h3>
        <div className="flex space-x-2">
          {['7d', '30d', '90d'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                selectedPeriod === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-64 bg-gray-700/30 rounded-lg flex items-center justify-center border border-gray-600/50">
        <div className="text-center">
          <div className="text-4xl mb-4">{getChartIcon()}</div>
          <p className="text-gray-300 font-medium mb-2">{getChartDescription()}</p>
          <p className="text-sm text-gray-500 mb-2">Período: {selectedPeriod}</p>
          <p className="text-sm text-gray-500">
            {data && data.length > 0 
              ? `${data.length} puntos de datos disponibles`
              : 'Conecta con la API de Chartmetric para ver los datos'
            }
          </p>
        </div>
      </div>
    </div>
  );
}