'use client';

import { useState } from 'react';
import axios from 'axios';
import { SearchBar } from './SearchBar';
import { ComparisonRow } from './ComparisonRow';

// Reutilize a interface de dados da sua página principal
interface CityData {
  temperature: number;
  aqi: number;
  mainPollutant: string;
  coordinates: { lat: number; lon: number };
}

interface CompareCityProps {
  initialCityData: CityData;
  initialCityName: string;
}

export const CompareCity = ({ initialCityData, initialCityName }: CompareCityProps) => {
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonData, setComparisonData] = useState<CityData | null>(null);
  const [comparisonCityName, setComparisonCityName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompareSearch = async (city: string) => {
    if (city.toLowerCase() === initialCityName.toLowerCase()) {
      setError('Por favor, escolha uma cidade diferente para comparar.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setComparisonData(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await axios.get(`${apiUrl}/api/weather/${city}`);
      setComparisonData(response.data);
      setComparisonCityName(city);
    } catch (err) {
      setError('Não foi possível encontrar dados para esta cidade.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isComparing) {
    return (
      <div className="text-center">
        <button
          onClick={() => setIsComparing(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Comparar com outra cidade
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg w-full space-y-4">
      <h3 className="text-lg font-semibold text-center text-gray-300">
        Comparar Cidades
      </h3>
      <div className="max-w-md mx-auto">
        <SearchBar onSearch={handleCompareSearch} />
        {isLoading && <p className="text-center mt-2">Buscando...</p>}
        {error && <p className="text-center text-red-400 mt-2">{error}</p>}
      </div>

      {comparisonData && (
        <div className="mt-4">
          <div className="grid grid-cols-3 items-center text-center mb-2">
            <h4 className="font-bold text-xl capitalize">{initialCityName}</h4>
            <span className="text-gray-500 text-xs">(vs)</span>
            <h4 className="font-bold text-xl capitalize">{comparisonCityName}</h4>
          </div>
          
          <ComparisonRow label="Qualidade do Ar (AQI)" valueA={initialCityData.aqi} valueB={comparisonData.aqi} unit="" />
          <ComparisonRow label="Temperatura" valueA={Math.round(initialCityData.temperature)} valueB={Math.round(comparisonData.temperature)} unit="°C" higherIsBetter={true} />
        </div>
      )}
    </div>
  );
};