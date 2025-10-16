'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
// Ícone para dar um toque especial

// 1. Definir a "forma" dos dados que esperamos receber do backend
interface TopCity {
  id: number;
  name: string;
  count: number;
}

export const TopCities = () => {
  // 2. Estados para gerenciar os dados, o carregamento e possíveis erros
  const [cities, setCities] = useState<TopCity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 3. useEffect para buscar os dados assim que o componente for montado
  useEffect(() => {
    const fetchTopCities = async () => {
      try {
        // IMPORTANTE: Use uma variável de ambiente para a URL da API
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

  // 4. Renderização condicional baseada no estado
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

  // 5. Renderização da lista de cidades
  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg w-full">
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
              <p className="capitalize font-medium">{city.name}</p>
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