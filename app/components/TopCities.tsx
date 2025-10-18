'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
// Ícone para dar um toque especial

interface TopCity {
  id: number;
  name: string;
  count: number;
}

interface TopCityProps{
     onCityClick: (city: string) => void; // É uma função que recebe uma string e não retorna nada
}

export const TopCities = ({onCityClick} : TopCityProps) => {
  //  Estados para gerenciar os dados, o carregamento e possíveis erros
  const [cities, setCities] = useState<TopCity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //  useEffect para buscar os dados assim que o componente for montado
  useEffect(() => {
    const fetchTopCities = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await axios.get(`${apiUrl}/api/weather/stats/top-cities`);
        setCities(response.data);
      } catch (err) {
        setError('Não foi possível carregar o ranking.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopCities();
  }, []); // O array vazio [] garante que este efeito rode apenas UMA VEZ

  // Renderização condicional baseada no estado
  if (loading) {
    return (
      <div className="bg-slate-800 rounded-xl p-4 text-center text-gray-400">
        Carregando ranking...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/50 border border-red-700 rounded-xl p-4 text-center text-red-300">
        {error}
      </div>
    );
  }
  
  // Se não houver cidades, podemos mostrar uma mensagem
  if (cities.length === 0) {
    return null; // Ou uma mensagem como "Nenhuma cidade pesquisada ainda."
  }

  // Renderização da lista de cidades
  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg w-full mt-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-yellow-400" />
        <h3 className="text-lg font-semibold text-gray-300">
          Cidades Mais Buscadas
        </h3>
      </div>
      <ol className="space-y-3">
        {cities.map((city, index) => (
          <li key={city.id} className="flex justify-between items-baseline text-gray-300">
            <span className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-500">{index + 1}</span>
              
              <button
                onClick={() => onCityClick(city.name)} // Ao clicar, chama a função do pai!
                className="capitalize font-medium text-left text-blue-400 hover:underline cursor-pointer"
              >
                {city.name}
              </button>

            </span>
            <span className="text-sm font-mono bg-slate-700 px-2 py-1 rounded-md">
              {city.count} {city.count > 1 ? 'buscas' : 'busca'}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};