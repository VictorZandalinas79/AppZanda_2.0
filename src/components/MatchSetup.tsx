import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

interface MatchSetupProps {
  onSubmit: (data: {
    homeTeam: string;
    awayTeam: string;
    round: string;
    date: string;
  }) => void;
}

export function MatchSetup({ onSubmit }: MatchSetupProps) {
  const [isHomeTeam, setIsHomeTeam] = useState(true);
  const [awayTeam, setAwayTeam] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      homeTeam: isHomeTeam ? 'UD Atzeneta' : formData.get('awayTeam') as string,
      awayTeam: isHomeTeam ? awayTeam : 'UD Atzeneta',
      round: formData.get('round') as string,
      date: formData.get('date') as string,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Calendar className="w-6 h-6 text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-800">Configuración del Partido</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              UD Atzeneta juega como:
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setIsHomeTeam(true)}
                className={`flex-1 py-2 px-4 rounded-md ${
                  isHomeTeam 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Local
              </button>
              <button
                type="button"
                onClick={() => setIsHomeTeam(false)}
                className={`flex-1 py-2 px-4 rounded-md ${
                  !isHomeTeam 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Visitante
              </button>
            </div>
          </div>
          
          <div>
            <label htmlFor="opponent" className="block text-sm font-medium text-gray-700">
              Equipo {isHomeTeam ? 'Visitante' : 'Local'}
            </label>
            <input
              type="text"
              id="opponent"
              name="awayTeam"
              value={awayTeam}
              onChange={(e) => setAwayTeam(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Nombre del equipo rival"
            />
          </div>
          
          <div>
            <label htmlFor="round" className="block text-sm font-medium text-gray-700">
              Número de Jornada
            </label>
            <input
              type="text"
              id="round"
              name="round"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Fecha del Partido
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Siguiente: Seleccionar Alineación
          </button>
        </form>
      </div>
    </div>
  );
}