import React from 'react'

interface CityStatsProps {
  data:{
    name: string,
    temperature: number;
  };
};

export const CityStats = ({data}: CityStatsProps) => {
  const {temperature, name} = data;

  return (
    <div className="flex items-end gap-2">
        <p className="text-5xl font-bold text-white">
          {Math.round(temperature)}
        </p>
        <span className="text-2xl font-medium text-gray-400 pb-1">
          °C
        </span>
        <span className="text-2xl font-medium text-gray-400 pb-1">
          {name}
        </span>
      </div>
  )
}
