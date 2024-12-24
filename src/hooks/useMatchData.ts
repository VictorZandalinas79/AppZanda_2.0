import { useState, useEffect } from 'react';
import type { MatchData, Event, Player, MatchPeriod } from '../types/match';

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
      period: 'first' as MatchPeriod,
      round: '',
      date: '',
      homeTeam: {
        name: 'Home Team',
        events: [],
        players: [],
      },
      awayTeam: {
        name: 'Away Team',
        events: [],
        players: [],
      },
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(matchData));
  }, [matchData]);

  const updateTeams = (data: { homeTeam: string; awayTeam: string; round: string; date: string }) => {
    setMatchData(prev => ({
      ...prev,
      round: data.round,
      date: data.date,
      homeTeam: { ...prev.homeTeam, name: data.homeTeam },
      awayTeam: { ...prev.awayTeam, name: data.awayTeam },
    }));
  };

  const addEvent = (event: Omit<Event, 'id'>) => {
    setMatchData(prev => ({
      ...prev,
      [event.team === 'home' ? 'homeTeam' : 'awayTeam']: {
        ...prev[event.team === 'home' ? 'homeTeam' : 'awayTeam'],
        events: [
          ...prev[event.team === 'home' ? 'homeTeam' : 'awayTeam'].events,
          { ...event, id: crypto.randomUUID() },
        ],
      },
    }));
  };

  const toggleTimer = async () => {
    if (matchData.isActive) {
      // Timer is running, we're going to pause it
      if (matchData.period === 'first') {
        const confirmed = window.confirm('End of first half?');
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
        const response = window.confirm('Match finished or extra time?');
        if (response) {
          const extraTime = window.confirm('Start extra time?');
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
        const confirmed = window.confirm('End of first extra time?');
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
        const confirmed = window.confirm('End of match?');
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
      // Timer is paused, we're going to start it
      if (matchData.period !== 'finished') {
        setMatchData(prev => ({
          ...prev,
          isActive: true,
          startTime: Date.now(),
        }));
      }
    }
  };

  const addPlayer = (team: 'home' | 'away', player: Player) => {
    setMatchData(prev => ({
      ...prev,
      [`${team}Team`]: {
        ...prev[`${team}Team`],
        players: [...prev[`${team}Team`].players, player],
      },
    }));
  };

  const importTeam = (team: 'home' | 'away', players: Player[]) => {
    setMatchData(prev => ({
      ...prev,
      [`${team}Team`]: {
        ...prev[`${team}Team`],
        players,
      },
    }));
  };

  return {
    matchData,
    addEvent,
    toggleTimer,
    addPlayer,
    importTeam,
    updateTeams,
  };
}