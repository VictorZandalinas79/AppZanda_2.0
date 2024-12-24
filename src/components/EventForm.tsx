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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPlayer = players.find(p => p.number.toString() === player);
    if (!selectedPlayer) return;

    const event = {
      type: eventType,
      player: selectedPlayer,
      team,
      minute: currentMinute,
      timestamp: Date.now(),
      details: eventType === 'goal' && assistBy ? {
        assistBy: players.find(p => p.number.toString() === assistBy),
      } : undefined,
    };

    onAddEvent(event);
    setPlayer('');
    setAssistBy('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="goal">Goal</option>
          <option value="yellowCard">Yellow Card</option>
          <option value="redCard">Red Card</option>
          <option value="substitution">Substitution</option>
        </select>
      </div>

      <div>
        <select
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Player</option>
          {players.map((p) => (
            <option key={p.number} value={p.number}>
              #{p.number} - {p.name}
            </option>
          ))}
        </select>
      </div>

      {eventType === 'goal' && (
        <div>
          <select
            value={assistBy}
            onChange={(e) => setAssistBy(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Assist By (Optional)</option>
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
        Add Event
      </button>
    </form>
  );
}