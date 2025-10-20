import React, { useState } from 'react';
import { FaLeaf, FaEye, FaTint, FaWind, FaQuestionCircle } from 'react-icons/fa';
import { MetricItem } from './MetricItem'; 
import { EcoScoreExplainer } from './EcoEscoreExplainer';
import { FaTemperatureFull } from 'react-icons/fa6';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-slate-800 rounded-xl p-6 shadow-lg h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-300">Métricas Ambientais</h3>
          <button onClick={() => setIsModalOpen(true)} className="text-gray-500 hover:text-white">
            <FaQuestionCircle />
          </button>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <MetricItem icon={<FaLeaf />} label="EcoScore" value={data.ecoScore} unit="/ 100" />
           <MetricItem icon={<FaTemperatureFull/>} label="Temperatura" value={tempRound} unit="°C"/>
          <MetricItem icon={<FaEye />} label="Visibilidade" value={(data.visibility / 1000).toFixed(1)} unit="km" />
          <MetricItem icon={<FaTint />} label="Umidade" value={data.humidity} unit="%" />
          <MetricItem icon={<FaWind />} label="Vento" value={data.windSpeed.toFixed(1)} unit="m/s" />
        </div>
      </div>
      
      {isModalOpen && <EcoScoreExplainer onClose={() => setIsModalOpen(false)} />}
    </>
  );
};