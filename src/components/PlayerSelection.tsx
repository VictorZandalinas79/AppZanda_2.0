import React, { useState } from 'react';
import type { Player } from '../types/match';

interface PlayerSelectionProps {
  players: Player[];
  onComplete: (starters: Player[], substitutes: Player[]) => void;
}

export function PlayerSelection({ players, onComplete }: PlayerSelectionProps) {
  const [starters, setStarters] = useState<Player[]>([]);
  const [substitutes, setSubstitutes] = useState<Player[]>([]);

  const handlePlayerSelect = (player: Player, isStarter: boolean) => {
    if (isStarter) {
      if (starters.length < 11) {
        setStarters([...starters, player]);
        setSubstitutes(substitutes.filter(p => p.number !== player.number));
      }
    } else {
      if (substitutes.length < 7) {
        setSubstitutes([...substitutes, player]);
        setStarters(starters.filter(p => p.number !== player.number));
      }
    }
  };

  const handleSubmit = () => {
    if (starters.length === 11) {
      onComplete(starters, substitutes);
    } else {
      alert('Debes seleccionar 11 jugadores titulares');
    }
  };

  const availablePlayers = players.filter(
    player => !starters.includes(player) && !substitutes.includes(player)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Selección de Jugadores</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Jugadores Disponibles</h3>
            <div className="space-y-2">
              {availablePlayers.map(player => (
                <div
                  key={player.number}
                  className="flex justify-between items-center p-2 bg-gray-50 rounded"
                >
                  <span>
                    #{player.number} {player.name}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => handlePlayerSelect(player, true)}
                      disabled={starters.length >= 11}
                      className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                    >
                      Titular
                    </button>
                    <button
                      onClick={() => handlePlayerSelect(player, false)}
                      disabled={substitutes.length >= 7}
                      className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                      Suplente
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">
              Titulares ({starters.length}/11)
            </h3>
            <div className="space-y-2">
              {starters.map(player => (
                <div
                  key={player.number}
                  className="flex justify-between items-center p-2 bg-green-50 rounded"
                >
                  <span>
                    #{player.number} {player.name}
                  </span>
                  <button
                    onClick={() => setStarters(starters.filter(p => p.number !== player.number))}
                    className="text-red-500 hover:text-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">
              Suplentes ({substitutes.length}/7)
            </h3>
            <div className="space-y-2">
              {substitutes.map(player => (
                <div
                  key={player.number}
                  className="flex justify-between items-center p-2 bg-blue-50 rounded"
                >
                  <span>
                    #{player.number} {player.name}
                  </span>
                  <button
                    onClick={() => setSubstitutes(substitutes.filter(p => p.number !== player.number))}
                    className="text-red-500 hover:text-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleSubmit}
            disabled={starters.length !== 11}
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            Comenzar Partido
          </button>
        </div>
      </div>
    </div>
  );
}