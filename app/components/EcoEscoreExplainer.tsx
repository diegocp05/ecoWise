// app/components/EcoScoreExplainer.tsx
'use client';

import { FaTimes } from 'react-icons/fa';

interface ExplainerProps {
  onClose: () => void;
}

export const EcoScoreExplainer = ({ onClose }: ExplainerProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl p-8 shadow-2xl max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-white">Como o EcoScore é Calculado?</h2>
        <p className="text-gray-400 mb-6">
          O EcoScore é uma nota de 0 a 100 que avalia a saúde ambiental de uma cidade em tempo real, baseada em 3 pilares principais:
        </p>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-white">1. Poluentes Específicos (Peso: 55%)</h3>
            <p className="text-sm text-gray-400">Analisamos os níveis de poluentes perigosos como Ozônio (O₃), Dióxido de Nitrogênio (NO₂) e Monóxido de Carbono (CO), diretamente ligados ao trânsito e à indústria. Este é o fator mais importante.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">2. Qualidade do Ar Geral (Peso: 35%)</h3>
            <p className="text-sm text-gray-400">Utilizamos o Índice de Qualidade do Ar (AQI) como um medidor geral da pureza do ar. Quanto menor o índice, maior a pontuação.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">3. Conforto Climático (Peso: 10%)</h3>
            <p className="text-sm text-gray-400">Pontuamos o quão amena está a temperatura, pois climas extremos impactam a qualidade de vida e o consumo de energia.</p>
          </div>
        </div>
      </div>
    </div>
  );
};