'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLeaf } from 'react-icons/fa'; // Ícone de folha

interface GreenCity {
  id: number;
  name: string;
  ecoScore: number;
}

interface GreenestCitiesProps {
  onCityClick: (city: string) => void;
}

export const GreenestCities = ({ onCityClick }: GreenestCitiesProps) => {
  const [cities, setCities] = useState<GreenCity[]>([]);
  // ... (a lógica de loading e error é idêntica à do TopCities)

  useEffect(() => {
    const fetchGreenestCities = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        // Chame a nova rota
        const response = await axios.get(`${apiUrl}/api/weather/stats/greenest-cities`);
        setCities(response.data);
      } catch (err) { /* ... */ } 
      finally { /* ... */ }
    };
    fetchGreenestCities();
  }, []);

  if (cities.length === 0) return null;

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg w-full">
      <div className="flex items-center gap-2 mb-4">
        <FaLeaf className="text-green-400" />
        <h3 className="text-lg font-semibold text-gray-300">Ranking EcoScore</h3>
      </div>
      <ol className="space-y-3">
        {cities.map((city, index) => (
          <li key={city.id} className="flex justify-between items-center">
            <button
              onClick={() => onCityClick(city.name)}
              className="capitalize font-medium text-blue-400 hover:underline cursor-pointer"
            >
              {index + 1}. {city.name}
            </button>
            <span className="text-lg font-bold text-green-400 bg-green-900/50 px-3 py-1 rounded-full">
              {city.ecoScore}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};