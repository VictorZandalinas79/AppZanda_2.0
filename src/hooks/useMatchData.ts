import { useState, useEffect } from 'react';
import type { MatchData, Event, Player } from '../types/match';
import { createEvent } from '../utils/eventUtils';

const STORAGE_KEY = 'soccer-match-data';

export function useMatchData() {
  const [matchData, setMatchData] = useState<MatchData>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      id: crypto.randomUUID(),
      startTime: Date.now(),
      isActive: false,
      period: 'first',
      round: '',
      date: '',
      homeTeam: {
        name: 'Equipo Local',
        events: [],
        players: [],
      },
      awayTeam: {
        name: 'Equipo Visitante',
        events: [],
        players: [],
      },
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(matchData));
  }, [matchData]);

  const addEvent = (eventData: Omit<Event, 'id'>) => {
    const event = createEvent(eventData);
    setMatchData(prev => {
      const team = eventData.team === 'home' ? 'homeTeam' : 'awayTeam';
      return {
        ...prev,
        [team]: {
          ...prev[team],
          events: [...prev[team].events, event],
        },
      };
    });
  };

  const resetTimer = () => {
    setMatchData(prev => ({
      ...prev,
      startTime: Date.now(),
      isActive: false,
    }));
  };

  const toggleTimer = () => {
    if (matchData.isActive) {
      if (matchData.period === 'first') {
        const confirmed = window.confirm('¿Fin de la primera parte?');
        if (confirmed) {
          setMatchData(prev => ({
            ...prev,
            isActive: false,
            period: 'second',
            startTime: Date.now(),
          }));
        } else {
          setMatchData(prev => ({ ...prev, isActive: false }));
        }
      } else if (matchData.period === 'second') {
        const response = window.confirm('¿Fin del partido o prórroga?');
        if (response) {
          const extraTime = window.confirm('¿Comenzar prórroga?');
          if (extraTime) {
            setMatchData(prev => ({
              ...prev,
              isActive: false,
              period: 'extraFirst',
              startTime: Date.now(),
            }));
          } else {
            setMatchData(prev => ({
              ...prev,
              isActive: false,
              period: 'finished',
            }));
          }
        } else {
          setMatchData(prev => ({ ...prev, isActive: false }));
        }
      } else if (matchData.period === 'extraFirst') {
        const confirmed = window.confirm('¿Fin de la primera parte de la prórroga?');
        if (confirmed) {
          setMatchData(prev => ({
            ...prev,
            isActive: false,
            period: 'extraSecond',
            startTime: Date.now(),
          }));
        } else {
          setMatchData(prev => ({ ...prev, isActive: false }));
        }
      } else if (matchData.period === 'extraSecond') {
        const confirmed = window.confirm('¿Fin del partido?');
        if (confirmed) {
          setMatchData(prev => ({
            ...prev,
            isActive: false,
            period: 'finished',
          }));
        } else {
          setMatchData(prev => ({ ...prev, isActive: false }));
        }
      }
    } else {
      if (matchData.period !== 'finished') {
        setMatchData(prev => ({
          ...prev,
          isActive: true,
          startTime: Date.now(),
        }));
      }
    }
  };

  const importTeam = (team: 'home' | 'away', players: Player[]) => {
    setMatchData(prev => ({
      ...prev,
      [team === 'home' ? 'homeTeam' : 'awayTeam']: {
        ...prev[team === 'home' ? 'homeTeam' : 'awayTeam'],
        players,
      },
    }));
  };

  const updateTeams = (data: { homeTeam: string; awayTeam: string; round: string; date: string }) => {
    setMatchData(prev => ({
      ...prev,
      round: data.round,
      date: data.date,
      homeTeam: {
        ...prev.homeTeam,
        name: data.homeTeam,
      },
      awayTeam: {
        ...prev.awayTeam,
        name: data.awayTeam,
      },
    }));
  };

  return {
    matchData,
    addEvent,
    toggleTimer,
    resetTimer,
    importTeam,
    updateTeams,
  };
}