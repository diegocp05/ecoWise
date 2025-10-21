"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

interface CityData {
  temperature: number
  aqi: number
  mainPollutant: string
  coordinates: { lat: number; lon: number }
  humidity: number
  windSpeed: number
  visibility: number
  ecoScore: number
  name: string
}

interface ComparisonChartsProps {
  cityA: CityData
  cityAName: string
  cityB: CityData
  cityBName: string
}

export const ComparisonCharts = ({ cityA, cityAName, cityB, cityBName }: ComparisonChartsProps) => {
  // Prepare data for bar charts
  const barChartData = [
    {
      metric: "EcoScore",
      [cityAName]: cityA.ecoScore,
      [cityBName]: cityB.ecoScore,
    },
    {
      metric: "Temperatura (°C)",
      [cityAName]: Math.round(cityA.temperature),
      [cityBName]: Math.round(cityB.temperature),
    },
    {
      metric: "Umidade (%)",
      [cityAName]: cityA.humidity,
      [cityBName]: cityB.humidity,
    },
    {
      metric: "Vento (m/s)",
      [cityAName]: Number.parseFloat(cityA.windSpeed.toFixed(1)),
      [cityBName]: Number.parseFloat(cityB.windSpeed.toFixed(1)),
    },
    {
      metric: "Visibilidade (km)",
      [cityAName]: Number.parseFloat((cityA.visibility / 1000).toFixed(1)),
      [cityBName]: Number.parseFloat((cityB.visibility / 1000).toFixed(1)),
    },
  ]

  // Prepare data for radar chart (normalized values 0-100)
  const radarData = [
    {
      metric: "EcoScore",
      [cityAName]: (cityA.ecoScore / 100) * 100,
      [cityBName]: (cityB.ecoScore / 100) * 100,
    },
    {
      metric: "Qualidade do Ar",
      [cityAName]: Math.max(0, 100 - (cityA.aqi / 300) * 100),
      [cityBName]: Math.max(0, 100 - (cityB.aqi / 300) * 100),
    },
    {
      metric: "Temperatura",
      [cityAName]: Math.min(100, (cityA.temperature / 40) * 100),
      [cityBName]: Math.min(100, (cityB.temperature / 40) * 100),
    },
    {
      metric: "Umidade",
      [cityAName]: Math.max(0, 100 - cityA.humidity),
      [cityBName]: Math.max(0, 100 - cityB.humidity),
    },
    {
      metric: "Visibilidade",
      [cityAName]: Math.min(100, (cityA.visibility / 10000) * 100),
      [cityBName]: Math.min(100, (cityB.visibility / 10000) * 100),
    },
  ]

  // AQI comparison data
  const aqiData = [
    {
      metric: "AQI",
      [cityAName]: cityA.aqi,
      [cityBName]: cityB.aqi,
    },
  ]

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg w-full space-y-6">
      <h3 className="text-xl font-semibold text-center text-gray-300">Comparação Visual entre Cidades</h3>

      {/* Radar Chart - Overall Comparison */}
      <div className="bg-slate-900/50 rounded-lg p-4">
        <h4 className="text-md font-semibold text-gray-300 mb-4 text-center">Visão Geral (Normalizado)</h4>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#475569" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#94a3b8" }} />
            <Radar name={cityAName} dataKey={cityAName} stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
            <Radar name={cityBName} dataKey={cityBName} stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
            <Legend wrapperStyle={{ color: "#e2e8f0" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
                color: "#e2e8f0",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart - Metrics Comparison */}
      <div className="bg-slate-900/50 rounded-lg p-4">
        <h4 className="text-md font-semibold text-gray-300 mb-4 text-center">Comparação de Métricas</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="metric" tick={{ fill: "#94a3b8", fontSize: 11 }} angle={-15} textAnchor="end" height={80} />
            <YAxis tick={{ fill: "#94a3b8" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
                color: "#e2e8f0",
              }}
            />
            <Legend wrapperStyle={{ color: "#e2e8f0" }} />
            <Bar dataKey={cityAName} fill="#3b82f6" radius={[8, 8, 0, 0]} />
            <Bar dataKey={cityBName} fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* AQI Comparison */}
      <div className="bg-slate-900/50 rounded-lg p-4">
        <h4 className="text-md font-semibold text-gray-300 mb-4 text-center">Índice de Qualidade do Ar (AQI)</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={aqiData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis type="number" tick={{ fill: "#94a3b8" }} />
            <YAxis type="category" dataKey="metric" tick={{ fill: "#94a3b8" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
                color: "#e2e8f0",
              }}
            />
            <Legend wrapperStyle={{ color: "#e2e8f0" }} />
            <Bar dataKey={cityAName} fill="#3b82f6" radius={[0, 8, 8, 0]} />
            <Bar dataKey={cityBName} fill="#10b981" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-400 text-center mt-2">Valores mais baixos indicam melhor qualidade do ar</p>
      </div>
    </div>
  )
}
