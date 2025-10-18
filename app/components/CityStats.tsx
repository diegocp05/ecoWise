import React from 'react';
import { FaTemperatureHigh } from 'react-icons/fa'; // 1. Importe o ícone

// A interface continua a mesma, está perfeita.
interface CityStatsProps {
  data: {
    name: string;
    temperature: number;
  };
}

export const CityStats = ({ data }: CityStatsProps) => {
  const { temperature, name } = data;

  return (
    // 2. Estrutura de card com fundo, sombra e layout de coluna
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg flex flex-col gap-4 h-full">
      
      {/* 3. Seção do título com ícone e nome da cidade */}
      <div className="flex items-center gap-2">
        <FaTemperatureHigh className="text-blue-400" size={20} />
        <h3 className="text-lg font-semibold text-gray-300 capitalize">
          Clima em {name}
        </h3>
      </div>

      {/* 4. Seção do dado principal, mantendo a temperatura em destaque */}
      <div className="flex items-end gap-2 mt-auto"> {/* mt-auto empurra para baixo */}
        <p className="text-5xl font-bold text-white">
          {Math.round(temperature)}
        </p>
        <span className="text-2xl font-medium text-gray-400 pb-1">
          °C
        </span>
      </div>

    </div>
  );
};