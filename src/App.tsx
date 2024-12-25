import React, { useState, useEffect } from 'react';
import { Timer } from './components/Timer';
import { EventForm } from './components/EventForm';
import { PlayerList } from './components/PlayerList';
import { TeamImport } from './components/TeamImport';
import { ExportButtons } from './components/ExportButtons';
import { MatchSetup } from './components/MatchSetup';
import { PlayerSelection } from './components/PlayerSelection';
import { useMatchData } from './hooks/useMatchData';
import { loadUdAtzenetaPlayers } from './utils/teamUtils';
import { Trophy } from 'lucide-react';
import type { Player } from './types/match';

const MAKE_WEBHOOK_URL = 'https://hook.eu2.make.com/kqow4a7hwp4tfm6mwjq2uj353a1mi637';

export function App() {
  const { matchData, addEvent, toggleTimer, resetTimer, importTeam, updateTeams } = useMatchData();
  const [setupComplete, setSetupComplete] = useState(false);
  const [playerSelectionComplete, setPlayerSelectionComplete] = useState(false);
  const [atzenetaPlayers, setAtzenetaPlayers] = useState<Player[]>([]);

  useEffect(() => {
    loadUdAtzenetaPlayers().then(setAtzenetaPlayers);
  }, []);

  const handleMatchSetup = (data: { homeTeam: string; awayTeam: string; round: string; date: string }) => {
    updateTeams(data);
    setSetupComplete(true);
  };

  const handlePlayerSelection = (starters: Player[], substitutes: Player[]) => {
    const team = matchData.homeTeam.name === 'UD Atzeneta' ? 'home' : 'away';
    importTeam(team, [...starters, ...substitutes]);
    setPlayerSelectionComplete(true);
  };

  if (!setupComplete) {
    return <MatchSetup onSubmit={handleMatchSetup} />;
  }

  if (!playerSelectionComplete) {
    return <PlayerSelection players={atzenetaPlayers} onComplete={handlePlayerSelection} maxSubstitutes={10} />;
  }

  const atzenetaTeam = matchData.homeTeam.name === 'UD Atzeneta' ? matchData.homeTeam : matchData.awayTeam;
  const rivalTeam = matchData.homeTeam.name === 'UD Atzeneta' ? matchData.awayTeam : matchData.homeTeam;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center">
          <div className="flex items-center justify-center gap-2">
            <Trophy size={32} className="text-blue-500" />
            <h1 className="text-3xl font-bold">Seguimiento de Partido</h1>
          </div>
          
          <div className="mt-4">
            <p className="text-lg text-gray-600">
              Jornada {matchData.round} - {matchData.date}
            </p>
            <p className="text-xl font-semibold mt-2">
              {matchData.homeTeam.name} vs {matchData.awayTeam.name}
            </p>
          </div>

          <div className="mt-8 mb-8">
            <Timer
              isActive={matchData.isActive}
              startTime={matchData.startTime}
              period={matchData.period}
              onToggle={toggleTimer}
              onReset={resetTimer}
            />
          </div>
          
          <div className="mt-4 flex justify-center">
            <ExportButtons matchData={matchData} webhookUrl={MAKE_WEBHOOK_URL} />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">{atzenetaTeam.name}</h2>
            <EventForm
              team={matchData.homeTeam.name === 'UD Atzeneta' ? 'home' : 'away'}
              players={atzenetaTeam.players}
              onAddEvent={addEvent}
              currentMinute={Math.floor((Date.now() - matchData.startTime) / 60000)}
            />
            <div className="mt-4 space-y-4">
              <PlayerList
                title="Titulares"
                players={atzenetaTeam.players.slice(0, 11)}
                events={atzenetaTeam.events}
                maxPlayers={11}
              />
              <PlayerList
                title="Suplentes"
                players={atzenetaTeam.players.slice(11)}
                events={atzenetaTeam.events}
                maxPlayers={10}
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">{rivalTeam.name}</h2>
            <EventForm
              team={matchData.homeTeam.name === 'UD Atzeneta' ? 'away' : 'home'}
              players={rivalTeam.players}
              onAddEvent={addEvent}
              currentMinute={Math.floor((Date.now() - matchData.startTime) / 60000)}
            />
            <div className="mt-4">
              <PlayerList
                title="Jugadores"
                players={rivalTeam.players}
                events={rivalTeam.events}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}