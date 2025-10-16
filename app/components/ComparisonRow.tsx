'use client';

import { FaArrowUp, FaArrowDown, FaEquals } from 'react-icons/fa';

interface ComparisonRowProps {
  label: string; // Ex: "Temperatura"
  valueA: number | string;
  valueB: number | string;
  unit: string; // Ex: "°C" ou ""
  higherIsBetter?: boolean; // Define se um valor mais alto é bom (verde) ou ruim (vermelho)
}

export const ComparisonRow = ({ label, valueA, valueB, unit, higherIsBetter = false }: ComparisonRowProps) => {
  const numA = Number(valueA);
  const numB = Number(valueB);

  // Lógica para determinar as cores e ícones
  let colorA = 'text-gray-300';
  let colorB = 'text-gray-300';
  let IconA, IconB;

  if (numA !== numB) {
    const aIsBetter = higherIsBetter ? numA > numB : numA < numB;
    if (aIsBetter) {
      colorA = 'text-green-400';
      IconA = FaArrowDown; // Seta para baixo pode significar "menor/melhor" para poluição
      colorB = 'text-red-400';
      IconB = FaArrowUp;
    } else {
      colorB = 'text-green-400';
      IconB = FaArrowDown;
      colorA = 'text-red-400';
      IconA = FaArrowUp;
    }
  } else {
    IconA = IconB = FaEquals;
  }
  
  // Invertendo ícones para o caso de 'higherIsBetter'
  if(higherIsBetter){
    [IconA, IconB] = [IconB, IconA]
  }

  return (
    <div className="grid grid-cols-3 items-center text-center py-3 border-b border-slate-700">
      <div className={`flex items-center justify-center gap-2 font-semibold ${colorA}`}>
        {IconA && <IconA />}
        <span>{valueA} {unit}</span>
      </div>
      <p className="text-sm font-medium text-gray-400">{label}</p>
      <div className={`flex items-center justify-center gap-2 font-semibold ${colorB}`}>
        <span>{valueB} {unit}</span>
        {IconB && <IconB />}
      </div>
    </div>
  );
};