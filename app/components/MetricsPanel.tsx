import React from 'react';
import { FaLeaf, FaEye, FaTint, FaWind } from 'react-icons/fa';
import { MetricItem } from './MetricItem'; // Importe o sub-componente

interface MetricsPanelProps {
  data: {
    temperature: number;
    ecoScore: number;
    visibility: number;
    humidity: number;
    windSpeed: number;
  };
}

export const MetricsPanel = ({ data }: MetricsPanelProps) => {
  let tempRound = Math.round(data.temperature);
  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg h-full">
      <h3 className="text-lg font-semibold text-gray-300 mb-4">
        Métricas Ambientais
      </h3>
      <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
        {/* Usamos nosso novo sub-componente para cada métrica */}
        
        <MetricItem 
          icon={<FaLeaf />}
          label="EcoScore"
          value={data.ecoScore}
          unit="/ 100"
        />

        <MetricItem 
          icon=''
          label="Temperatura"
          value={tempRound}
          unit="°C"
        />
        
        <MetricItem 
          icon={<FaEye />}
          label="Visibilidade"
          value={(data.visibility / 1000).toFixed(1)} // Converte de metros para km
          unit="km"
        />

        <MetricItem 
          icon={<FaTint />}
          label="Umidade"
          value={data.humidity}
          unit="%"
        />

        <MetricItem 
          icon={<FaWind />}
          label="Vento"
          value={data.windSpeed.toFixed(1)} // Arredonda para 1 casa decimal
          unit="m/s"
        />
      </div>
    </div>
  );
};