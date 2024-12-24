import type { MatchData } from '../types/match';

export async function exportToSheets(matchData: MatchData, webhookUrl: string) {
  const events = [...matchData.homeTeam.events, ...matchData.awayTeam.events]
    .sort((a, b) => a.minute - b.minute)
    .map(event => ({
      minute: event.minute,
      team: event.team === 'home' ? matchData.homeTeam.name : matchData.awayTeam.name,
      type: event.type,
      player: `#${event.player.number} ${event.player.name}`,
      details: event.details?.assistBy ? 
        `Assist: #${event.details.assistBy.number} ${event.details.assistBy.name}` : ''
    }));

  const data = {
    matchInfo: {
      homeTeam: matchData.homeTeam.name,
      awayTeam: matchData.awayTeam.name,
      date: new Date().toISOString(),
    },
    events
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to export to Google Sheets');
    }

    return true;
  } catch (error) {
    console.error('Export error:', error);
    throw error;
  }
}