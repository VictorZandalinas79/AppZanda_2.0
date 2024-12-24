import React from 'react';
import type { Event } from '../types/match';
import { Goal, Square, ArrowLeftRight } from 'lucide-react';

interface EventListProps {
  events: Event[];
}

export function EventList({ events }: EventListProps) {
  return (
    <div className="space-y-2">
      {events.map((event) => (
        <div
          key={event.id}
          className="flex items-center gap-2 p-2 bg-white rounded shadow"
        >
          <span className="text-gray-500 w-12">{event.minute}'</span>
          {event.type === 'goal' && <Goal className="text-green-500" size={20} />}
          {event.type === 'yellowCard' && <Square className="text-yellow-500" size={20} />}
          {event.type === 'redCard' && <Square className="text-red-500" size={20} />}
          {event.type === 'substitution' && <ArrowLeftRight className="text-blue-500" size={20} />}
          <span>
            #{event.player.number} {event.player.name}
            {event.details?.assistBy && (
              <span className="text-gray-500">
                {' '}
                (Assist: #{event.details.assistBy.number} {event.details.assistBy.name})
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}