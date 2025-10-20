// app/components/HeroSection.tsx
'use client';

import { SearchBar } from './SearchBar';

interface HeroSectionProps {
  onSearch: (city: string) => void;
}

export const HeroSection = ({ onSearch }: HeroSectionProps) => {
  return (
    <div className="w-full max-w-2xl text-center">
      <h1 className="text-5xl font-bold mb-4">EcoWise</h1>
      <p className="text-xl text-gray-400 mb-2">
        Entenda a saúde do nosso planeta, uma cidade de cada vez.
      </p>
      <p className="text-md text-gray-500 mb-8">
        Digite o nome de uma cidade para ver, em tempo real, métricas de qualidade do ar,
        poluentes e nosso exclusivo EcoScore, que avalia a saúde ambiental local.
      </p>
      <div className="max-w-md mx-auto">
        <SearchBar onSearch={onSearch} />
      </div>
    </div>
  );
};