import React from 'react';

interface MetricItemProps {
  icon: React.ReactNode; // Permite passar um componente de ícone
  label: string;
  value: string | number;
  unit: string;
}

export const MetricItem = ({ icon, label, value, unit }: MetricItemProps) => {
  return (
    <div className="bg-slate-900/50 p-3 rounded-lg flex items-center gap-3">
      <div className="text-xl text-blue-400">{icon}</div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-md font-bold text-white">
          {value} <span className="text-xs font-normal">{unit}</span>
        </p>
      </div>
    </div>
  );
};