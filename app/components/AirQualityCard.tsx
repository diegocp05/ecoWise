import React from 'react';
import { FaWind } from 'react-icons/fa'; // Ícone para representar o ar
import { getAqiInfo } from '../lib/aquiHelper'; // 1. Reutilize a lógica que já criamos

interface AqiProps {
  data: {
    aqi: number;
    mainPollutant: string;
  };
}

export const AirQualityCard = ({ data }: AqiProps) => {
  const { aqi, mainPollutant } = data;
  
  // 2. Obtem o nível, cor e recomendação com base no valor do AQI
  const aqiInfo = getAqiInfo(aqi);

  return (
    // 3. Estrutura de card consistente com o resto do app
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg flex flex-col gap-4 h-full">
      
      {/* Seção do Título */}
      <div className="flex items-center gap-2">
        <FaWind className="text-cyan-400" size={20} />
        <h3 className="text-lg font-semibold text-gray-300">
          Qualidade do Ar
        </h3>
      </div>

      {/* Seção Principal de Dados */}
      <div className="flex items-baseline gap-3 mt-auto">
        {/* O valor do AQI com cor dinâmica */}
        <p className="text-5xl font-bold" style={{ color: aqiInfo.color }}>
          {aqi}
        </p>
        {/* O nível correspondente, também com cor */}
        <span className="font-semibold" style={{ color: aqiInfo.color }}>
          {aqiInfo.level}
        </span>
      </div>
      
      {/* Informação Adicional */}
      <p className="text-sm text-gray-400">
        Poluente Principal: <span className="font-medium text-gray-300">{mainPollutant}</span>
      </p>

    </div>
  );
};