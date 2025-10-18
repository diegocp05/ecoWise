'use client';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Digite uma cidade..."
        className="p-2 border rounded-md w-full text-white md:text-lg text-sm"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        Buscar
      </button>
    </form>
  );
};
