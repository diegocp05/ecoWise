"use client"

import { useState } from "react"
import axios from "axios"
import { SearchBar } from "./SearchBar"
import { ComparisonRow } from "./ComparisonRow"

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

interface CompareCityProps {
  initialCityData: CityData
  initialCityName: string
  onComparisonComplete?: (cityName: string, cityData: CityData) => void
}

export const CompareCity = ({ initialCityData, initialCityName, onComparisonComplete }: CompareCityProps) => {
  const [isComparing, setIsComparing] = useState(false)
  const [comparisonData, setComparisonData] = useState<CityData | null>(null)
  const [comparisonCityName, setComparisonCityName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCompareSearch = async (city: string) => {
    if (city.toLowerCase() === initialCityName.toLowerCase()) {
      setError("Por favor, escolha uma cidade diferente para comparar.")
      return
    }
    setIsLoading(true)
    setError(null)
    setComparisonData(null)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
      const response = await axios.get(`${apiUrl}/api/weather/${city}`)
      setComparisonData(response.data)
      setComparisonCityName(city)
      if (onComparisonComplete) {
        onComparisonComplete(city, response.data)
      }
    } catch (err) {
      setError("Não foi possível encontrar dados para esta cidade.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isComparing) {
    return (
      <div className="text-center mt-6">
        <button
          onClick={() => setIsComparing(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Comparar com outra cidade
        </button>
      </div>
    )
  }

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg w-full space-y-4">
      <h3 className="text-lg font-semibold text-center text-gray-300">Comparar Cidades</h3>
      <div className="max-w-md mx-auto">
        <SearchBar onSearch={handleCompareSearch} />
        {isLoading && <p className="text-center mt-2 text-gray-400">Buscando...</p>}
        {error && <p className="text-center text-red-400 mt-2">{error}</p>}
      </div>

      {comparisonData && (
        <div className="mt-4 border text-xs border-slate-700 rounded-lg overflow-hidden">
          <div className="grid grid-cols-3 items-center text-center p-3 bg-slate-900/50">
            <h4 className="font-bold md:text-lg text-sm capitalize">{initialCityName}</h4>
            <span className="text-gray-500 text-xs">(vs)</span>
            <h4 className="font-bold md:text-lg text-sm  capitalize">{comparisonCityName}</h4>
          </div>

          <ComparisonRow
            label="EcoScore"
            valueA={initialCityData.ecoScore}
            valueB={comparisonData.ecoScore}
            unit=""
            higherIsBetter={true}
          />
          <ComparisonRow
            label="Qualidade do Ar (AQI)"
            valueA={initialCityData.aqi}
            valueB={comparisonData.aqi}
            unit=""
            higherIsBetter={false}
          />
          <ComparisonRow
            label="Temperatura"
            valueA={Math.round(initialCityData.temperature)}
            valueB={Math.round(comparisonData.temperature)}
            unit="°C"
            higherIsBetter={true}
          />
          <ComparisonRow
            label="Umidade"
            valueA={initialCityData.humidity}
            valueB={comparisonData.humidity}
            unit="%"
            higherIsBetter={false}
          />
          <ComparisonRow
            label="Vento"
            valueA={initialCityData.windSpeed.toFixed(1)}
            valueB={comparisonData.windSpeed.toFixed(1)}
            unit="m/s"
            higherIsBetter={false}
          />
          <ComparisonRow
            label="Visibilidade"
            valueA={(initialCityData.visibility / 1000).toFixed(1)}
            valueB={(comparisonData.visibility / 1000).toFixed(1)}
            unit="km"
            higherIsBetter={true}
          />
        </div>
      )}
    </div>
  )
}
