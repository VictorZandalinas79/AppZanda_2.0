import React, { useState } from 'react';
import type { Player } from '../types/match';

interface EventFormProps {
  team: 'home' | 'away';
  players: Player[];
  onAddEvent: (event: any) => void;
  currentMinute: number;
}

export function EventForm({ team, players, onAddEvent, currentMinute }: EventFormProps) {
  const [eventType, setEventType] = useState('goal');
  const [player, setPlayer] = useState('');
  const [assistBy, setAssistBy] = useState('');
  const [playerIn, setPlayerIn] = useState('');
  const [playerOut, setPlayerOut] = useState('');
  const [playerNumber, setPlayerNumber] = useState('');

  const isOpposingTeam = team === 'away';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let eventPlayer: Player;
    if (isOpposingTeam) {
      eventPlayer = {
        number: parseInt(playerNumber),
        name: `Jugador ${playerNumber}`,
      };
    } else {
      eventPlayer = players.find(p => p.number.toString() === player)!;
    }

    const event = {
      type: eventType,
      player: eventPlayer,
      team,
      minute: currentMinute,
      timestamp: Date.now(),
      details: eventType === 'goal' && assistBy ? {
        assistBy: players.find(p => p.number.toString() === assistBy),
      } : eventType === 'substitution' ? {
        playerIn: isOpposingTeam ? 
          { number: parseInt(playerIn), name: `Jugador ${playerIn}` } :
          players.find(p => p.number.toString() === playerIn),
        playerOut: isOpposingTeam ?
          { number: parseInt(playerOut), name: `Jugador ${playerOut}` } :
          players.find(p => p.number.toString() === playerOut),
      } : undefined,
    };

    onAddEvent(event);
    setPlayer('');
    setAssistBy('');
    setPlayerIn('');
    setPlayerOut('');
    setPlayerNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="goal">Gol</option>
          <option value="yellowCard">Tarjeta Amarilla</option>
          <option value="redCard">Tarjeta Roja</option>
          <option value="substitution">Sustitución</option>
        </select>
      </div>

      {isOpposingTeam ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dorsal del Jugador
          </label>
          <input
            type="number"
            value={playerNumber}
            onChange={(e) => setPlayerNumber(e.target.value)}
            className="w-full p-2 border rounded"
            required
            min="1"
            max="99"
          />
        </div>
      ) : (
        <div>
          <select
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Seleccionar Jugador</option>
            {players.map((p) => (
              <option key={p.number} value={p.number}>
                #{p.number} - {p.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {eventType === 'substitution' && (
        <>
          {isOpposingTeam ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dorsal del Jugador que Entra
                </label>
                <input
                  type="number"
                  value={playerIn}
                  onChange={(e) => setPlayerIn(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                  min="1"
                  max="99"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dorsal del Jugador que Sale
                </label>
                <input
                  type="number"
                  value={playerOut}
                  onChange={(e) => setPlayerOut(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                  min="1"
                  max="99"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jugador que Entra
                </label>
                <select
                  value={playerIn}
                  onChange={(e) => setPlayerIn(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Seleccionar Jugador</option>
                  {players.map((p) => (
                    <option key={p.number} value={p.number}>
                      #{p.number} - {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jugador que Sale
                </label>
                <select
                  value={playerOut}
                  onChange={(e) => setPlayerOut(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Seleccionar Jugador</option>
                  {players.map((p) => (
                    <option key={p.number} value={p.number}>
                      #{p.number} - {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </>
      )}

      {eventType === 'goal' && !isOpposingTeam && (
        <div>
          <select
            value={assistBy}
            onChange={(e) => setAssistBy(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Asistencia Por (Opcional)</option>
            {players.map((p) => (
              <option key={p.number} value={p.number}>
                #{p.number} - {p.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Añadir Evento
      </button>
    </form>
  );
}