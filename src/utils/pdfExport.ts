import { jsPDF } from 'jspdf';
import type { MatchData } from '../types/match';

export function exportToPDF(matchData: MatchData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header
  doc.setFontSize(20);
  doc.text('Match Report', pageWidth / 2, 20, { align: 'center' });
  
  // Teams
  doc.setFontSize(16);
  doc.text(`${matchData.homeTeam.name} vs ${matchData.awayTeam.name}`, pageWidth / 2, 35, { align: 'center' });
  
  // Events
  doc.setFontSize(12);
  let yPos = 50;
  
  ['homeTeam', 'awayTeam'].forEach((team) => {
    doc.text(`${matchData[team].name} Events:`, 20, yPos);
    yPos += 10;
    
    matchData[team].events.forEach((event) => {
      const eventText = `${event.minute}' - ${event.type} - #${event.player.number} ${event.player.name}`;
      doc.text(eventText, 30, yPos);
      yPos += 7;
      
      if (yPos > 280) {
        doc.addPage();
        yPos = 20;
      }
    });
    
    yPos += 10;
  });
  
  doc.save('match-report.pdf');
}