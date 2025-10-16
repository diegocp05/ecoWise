import React from 'react'

interface CityStatsProps {
  data:{
    temperature: number;
  };
};

export const CityStats = ({data}: CityStatsProps) => {
  const {temperature} = data;

  return (
    <div className="flex items-end gap-2">
        {/* Usamos Math.round() para não mostrar casas decimais desnecessárias */}
        <p className="text-5xl font-bold text-white">
          {Math.round(temperature)}
        </p>
        <span className="text-2xl font-medium text-gray-400 pb-1">
          °C
        </span>
      </div>
  )
}
