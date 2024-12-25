import React from 'react';
import { FileDown, Sheet } from 'lucide-react';
import { exportToPDF } from '../utils/pdfExport';
import { exportToSheets } from '../utils/sheetsExport';
import type { MatchData } from '../types/match';

interface ExportButtonsProps {
  matchData: MatchData;
  webhookUrl: string;
}

export function ExportButtons({ matchData, webhookUrl }: ExportButtonsProps) {
  const handlePDFExport = () => {
    exportToPDF(matchData);
  };

  const handleSheetsExport = async () => {
    try {
      await exportToSheets(matchData, webhookUrl);
      alert('¡Datos exportados exitosamente a Google Sheets!');
    } catch (error) {
      alert('Error al exportar a Google Sheets. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={handlePDFExport}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        <FileDown size={16} />
        Exportar PDF
      </button>
      <button
        onClick={handleSheetsExport}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        <Sheet size={16} />
        Exportar a Sheets
      </button>
    </div>
  );
}