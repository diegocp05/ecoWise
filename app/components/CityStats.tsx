import { FaLeaf, FaExclamationTriangle, FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import { MdWarning } from "react-icons/md"
import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts"

interface CityStatsProps {
  data: {
    name: string
    temperature: number
    aqi: number
    mainPollutant: string
    ecoScore: number
  }
}

const getAQIStatus = (aqi: number) => {
  if (aqi <= 50)
    return {
      status: "Boa",
      color: "#22c55e", // verde
      recommendation: "Qualidade do ar excelente! Aproveite atividades ao ar livre.",
    };
  if (aqi <= 100)
    return {
      status: "Moderada",
      color: "#eab308", // amarelo
      recommendation: "Qualidade do ar aceitável. Pessoas sensíveis devem considerar reduzir atividades prolongadas ao ar livre.",
    };
  if (aqi <= 150)
    return {
      status: "Insalubre para Grupos Sensíveis",
      color: "#f97316", // laranja
      recommendation: "Grupos sensíveis podem sentir efeitos na saúde. Limite atividades ao ar livre.",
    };
  // ... continue para as outras cores ...
  return {
    status: "Perigosa",
    color: "#7e22ce", // roxo escuro/marrom
    recommendation: "Emergência de saúde! Evite qualquer atividade ao ar livre.",
  };
};

const getEcoScoreStatus = (score: number) => {
  if (score >= 80) return { label: "Excelente", color: "text-green-400" }
  if (score >= 60) return { label: "Bom", color: "text-blue-400" }
  if (score >= 40) return { label: "Regular", color: "text-yellow-400" }
  if (score >= 20) return { label: "Ruim", color: "text-orange-400" }
  return { label: "Crítico", color: "text-red-400" }
}

export const CityStats = ({ data }: CityStatsProps) => {
  const { name, aqi, mainPollutant, ecoScore } = data
  const aqiInfo = getAQIStatus(aqi)
  const ecoInfo = getEcoScoreStatus(ecoScore)
    const chartData = [
    {
      name: 'AQI',
      value: aqi,
      fill: aqiInfo.color, 
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 shadow-2xl border border-slate-700">
      {/* City name header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white capitalize">{name}</h2>
        <FaLeaf className="text-green-400" size={28} />
      </div>

      {/* AQI Status - Main focus */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400 uppercase tracking-wide">Qualidade do Ar</span>
          <div className={`flex items-center gap-2 ${aqiInfo.textColor}`}>{aqiInfo.icon}</div>
        </div>

        <div className="flex items-end gap-3 mb-3">
          <span className="text-5xl font-bold text-white">{aqi}</span>
          <span className="text-lg text-gray-400 pb-2">AQI</span>
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

        <div className={`inline-block px-4 py-2 rounded-full ${aqiInfo.color} text-white font-semibold text-sm mb-3`}>
          {aqiInfo.status}
        </div>

        <p className="text-sm text-gray-300 leading-relaxed">{aqiInfo.recommendation}</p>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-700 my-4"></div>

      {/* Additional metrics grid */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {/* Main Pollutant */}
        <div className="bg-slate-700/50 rounded-lg p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Poluente Principal</p>
          <p className="text-lg font-bold text-white uppercase">{mainPollutant}</p>
        </div>

        {/* EcoScore */}
        <div className="bg-slate-700/50 rounded-lg p-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">EcoScore</p>
          <div className="flex items-end gap-2">
            <p className="text-lg font-bold text-white">{ecoScore}</p>
            <p className={`text-sm font-semibold ${ecoInfo.color} pb-0.5`}>{ecoInfo.label}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
