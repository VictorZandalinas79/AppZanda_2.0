import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { parseCSV } from '../utils/csvParser';
import type { Player } from '../types/match';

interface TeamImportProps {
  team: 'home' | 'away';
  onImport: (team: 'home' | 'away', players: Player[]) => void;
}

export function TeamImport({ team, onImport }: TeamImportProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const players = parseCSV(content);
      onImport(team, players);
      if (fileRef.current) {
        fileRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={fileRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => fileRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
      >
        <Upload size={16} />
        Importar Equipo {team === 'home' ? 'Local' : 'Visitante'}
      </button>
    </div>
  );
}