'use client';

import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { getAqiInfo } from '../lib/aquiHelper'; // Importe a função que acabamos de criar

interface ChartSectionProps {
  data: {
    aqi: number;
  };
}

export const ChartSection = ({ data }: ChartSectionProps) => {
  const { aqi } = data;
  const aqiInfo = getAqiInfo(aqi);

  // Recharts espera os dados em um formato de array de objetos
  const chartData = [
    {
      name: 'AQI',
      value: aqi,
      fill: aqiInfo.color, // A cor da barra virá da nossa lógica!
    },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg h-full flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-300">
          Índice de Qualidade do Ar (AQI)
        </h3>
        <p className="text-sm text-gray-400">
          Baseado no poluente principal
        </p>
      </div>

      <div className="w-full h-48 relative">
        {/* Gráfico Radial */}
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="80%" // Cria o efeito de "rosca"
            outerRadius="100%"
            data={chartData}
            startAngle={90}
            endAngle={-270}
            barSize={20}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 301]} // Define a escala máxima do gráfico
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background // Mostra um fundo cinza para a barra
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Texto centralizado sobre o gráfico */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-4xl font-bold" style={{ color: aqiInfo.color }}>
            {aqi}
          </p>
          <p className="text-md font-semibold" style={{ color: aqiInfo.color }}>
            {aqiInfo.level}
          </p>
        </div>
      </div>

      {/* Recomendação de Saúde */}
      <p className="text-center text-sm text-gray-300 mt-4">
        {aqiInfo.recommendation}
      </p>
    </div>
  );
};