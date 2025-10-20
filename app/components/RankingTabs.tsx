// app/components/RankingsTabs.tsx
'use client';

import { useState } from 'react';
import { TopCities } from './TopCities';
import { GreenestCities } from './GreenestCities';

interface RankingsTabsProps {
  onCityClick: (city: string) => void;
}

export const RankingsTabs = ({ onCityClick }: RankingsTabsProps) => {
  const [activeTab, setActiveTab] = useState<'greenest' | 'top'>('greenest');

  const tabStyle = "px-4 py-2 text-sm font-medium rounded-md transition-colors";
  const activeStyle = "bg-blue-600 text-white";
  const inactiveStyle = "text-gray-400 hover:bg-slate-700";

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-300">Rankings</h3>
        <div className="bg-slate-900 p-1 rounded-lg flex gap-1">
          <button 
            onClick={() => setActiveTab('greenest')}
            className={`${tabStyle} ${activeTab === 'greenest' ? activeStyle : inactiveStyle}`}
          >
            Melhor EcoScore
          </button>
          <button
            onClick={() => setActiveTab('top')}
            className={`${tabStyle} ${activeTab === 'top' ? activeStyle : inactiveStyle}`}
          >
            Mais Buscadas
          </button>
        </div>
      </div>

      {/* Renderiza o componente da aba ativa */}
      <div>
        {activeTab === 'greenest' ? (
          <GreenestCities onCityClick={onCityClick} />
        ) : (
          <TopCities onCityClick={onCityClick} />
        )}
      </div>
    </div>
  );
};