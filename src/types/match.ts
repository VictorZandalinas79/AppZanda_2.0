export interface Player {
  number: number;
  name: string;
}

export type MatchPeriod = 'first' | 'second' | 'extraFirst' | 'extraSecond' | 'finished';

export interface Event {
  id: string;
  timestamp: number;
  type: 'goal' | 'assist' | 'yellowCard' | 'redCard' | 'substitution';
  player: Player;
  minute: number;
  details?: {
    playerIn?: Player;
    playerOut?: Player;
    assistBy?: Player;
  };
  team: 'home' | 'away';
}

export interface MatchData {
  id: string;
  startTime: number;
  isActive: boolean;
  period: MatchPeriod;
  round: string;
  date: string;
  homeTeam: {
    name: string;
    events: Event[];
    players: Player[];
  };
  awayTeam: {
    name: string;
    events: Event[];
    players: Player[];
  };
}