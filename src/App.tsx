import React, { useState } from 'react';
import { Timer } from './components/Timer';
import { EventForm } from './components/EventForm';
import { EventList } from './components/EventList';
import { TeamImport } from './components/TeamImport';
import { ExportButtons } from './components/ExportButtons';
import { MatchSetup } from './components/MatchSetup';
import { useMatchData } from './hooks/useMatchData';
import { Trophy } from 'lucide-react';

const MAKE_WEBHOOK_URL = 'https://hook.eu2.make.com/kqow4a7hwp4tfm6mwjq2uj353a1mi637';

export function App() {
  const { matchData, addEvent, toggleTimer, addPlayer, importTeam, updateTeams } = useMatchData();
  const [setupComplete, setSetupComplete] = useState(false);

  const handleMatchSetup = (data: { homeTeam: string; awayTeam: string; round: string; date: string }) => {
    updateTeams(data);
    setSetupComplete(true);
  };

  if (!setupComplete) {
    return <MatchSetup onSubmit={handleMatchSetup} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center">
          <div className="flex items-center justify-center gap-2">
            <Trophy size={32} className="text-blue-500" />
            <h1 className="text-3xl font-bold">Soccer Match Tracker</h1>
          </div>
          
          <div className="mt-4">
            <p className="text-lg text-gray-600">
              Round {matchData.round} - {matchData.date}
            </p>
          </div>

          <div className="mt-8 mb-8">
            <Timer
              isActive={matchData.isActive}
              startTime={matchData.startTime}
              period={matchData.period}
              onToggle={toggleTimer}
            />
          </div>

          <div className="mt-4 flex justify-center gap-4">
            <TeamImport team="home" onImport={importTeam} />
            <TeamImport team="away" onImport={importTeam} />
          </div>
          
          <div className="mt-4 flex justify-center">
            <ExportButtons matchData={matchData} webhookUrl={MAKE_WEBHOOK_URL} />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">{matchData.homeTeam.name}</h2>
            <EventForm
              team="home"
              players={matchData.homeTeam.players}
              onAddEvent={addEvent}
              currentMinute={Math.floor((Date.now() - matchData.startTime) / 60000)}
            />
            <div className="mt-4">
              <EventList events={matchData.homeTeam.events} />
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">{matchData.awayTeam.name}</h2>
            <EventForm
              team="away"
              players={matchData.awayTeam.players}
              onAddEvent={addEvent}
              currentMinute={Math.floor((Date.now() - matchData.startTime) / 60000)}
            />
            <div className="mt-4">
              <EventList events={matchData.awayTeam.events} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}