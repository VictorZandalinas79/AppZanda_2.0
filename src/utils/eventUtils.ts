import type { Event } from '../types/match';

export function createEvent(eventData: Omit<Event, 'id'>): Event {
  return {
    ...eventData,
    id: crypto.randomUUID(),
  };
}