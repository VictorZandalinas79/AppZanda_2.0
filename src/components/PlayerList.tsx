import React from 'react';
import { Goal, Square, ArrowLeftRight } from 'lucide-react';
import type { Player, Event } from '../types/match';

interface PlayerListProps {
  players: Player[];
  events: Event[];
  title: string;
  maxPlayers?: number;
}

export function PlayerList({ players, events, title, maxPlayers = players.length }: PlayerListProps) {
  const getPlayerEvents = (playerNumber: number) => {
    return events.filter(event => event.player.number === playerNumber);
  };

  const renderEventIcon = (event: Event) => {
    switch (event.type) {
      case 'goal':
        return <Goal className="text-green-500" size={16} />;
      case 'yellowCard':
        return <Square className="text-yellow-500" size={16} />;
      case 'redCard':
        return <Square className="text-red-500" size={16} />;
      case 'substitution':
        return <ArrowLeftRight className="text-blue-500" size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-sm font-semibold mb-2">{title}</h3>
      <div className="space-y-1">
        {players.slice(0, maxPlayers).map(player => {
          const playerEvents = getPlayerEvents(player.number);
          return (
            <div key={player.number} className="flex items-center text-sm">
              <span className="w-16">#{player.number}</span>
              <span className="flex-1">{player.name}</span>
              <div className="flex gap-1">
                {playerEvents.map((event, index) => (
                  <div key={index} className="flex items-center gap-1">
                    {renderEventIcon(event)}
                    <span className="text-xs text-gray-500">{event.minute}'</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}