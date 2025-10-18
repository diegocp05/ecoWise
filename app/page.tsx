'use client';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { SearchBar } from './components/SearchBar';
 import { CityStats } from './components/CityStats'; 
 import { AirQualityCard } from './components/AirQualityCard';
import { MapComponent } from './components/MapComponent';
import { ChartSection } from './components/ChartSection';
import { TopCities } from './components/TopCities';
import { CompareCity } from './components/CompareCity';
import { GreenestCities } from './components/GreenestCities';

interface CityData {
  temperature: number;
  aqi: number;
  mainPollutant: string;
  coordinates: { lat: number; lon: number };
}

export default function Home() {
  const [data, setData] = useState<CityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>(''); // Guarde o nome da cidade pesquisada

  const Map = useMemo(() => dynamic(
    () => import('./components/MapComponent').then((mod) => mod.MapComponent),
    {
      loading: () => <p className="text-center">Carregando mapa...</p>, // Mensagem enquanto o mapa carrega
      ssr: false // A parte mais importante: desativa a renderização no servidor
    }
  ), []);

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      // A URL do seu backend. Em produção, será a URL do Railway.
      const response = await axios.get(`http://localhost:3001/api/weather/${city}`);
      setData(response.data);
    } catch (err) {
      setError('Não foi possível encontrar dados para esta cidade. Tente outra.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">EcoWise</h1>
      <p className="mb-8">Seu mapa interativo de consciência ambiental.</p>
      <div className="w-full max-w-md">
        <SearchBar onSearch={handleSearch} />
    <TopCities onCityClick={handleSearch} />
      </div>

      {loading && <p className="mt-8">Buscando dados...</p>}
      {error && <p className="mt-8 text-red-400">{error}</p>}

      {data && (
        <div className="mt-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {data && (
            <div className="mt-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Substitua o <pre> ou adicione junto */}
    <CityStats data={data} />

    {/* Aqui virão os outros componentes, como AirQualityCard, Map, etc. */}
    <AirQualityCard data={data} /> 
  </div>
)}

          <div className="mt-8 w-full max-w-4xl h-90  md:h-auto">
             <Map coordinates={data.coordinates} cityName={city} />
          </div>
            <GreenestCities onCityClick={handleSearch} />
   <div className="h-full w-full flex ">
    <ChartSection data={data} />
          </div>
            <CompareCity initialCityData={data} initialCityName={city} />
        </div>
      )}
    </main>
  );
}