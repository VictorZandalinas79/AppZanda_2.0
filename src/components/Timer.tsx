import React from 'react';
import { Timer as TimerIcon, Pause, RotateCcw } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';
import type { MatchPeriod } from '../types/match';

interface TimerProps {
  isActive: boolean;
  startTime: number;
  period: MatchPeriod;
  onToggle: () => void;
  onReset: () => void;
}

export function Timer({ isActive, startTime, period, onToggle, onReset }: TimerProps) {
  const timer = useTimer(isActive, startTime);

  const getPeriodLabel = (period: MatchPeriod) => {
    switch (period) {
      case 'first': return '1ª Parte';
      case 'second': return '2ª Parte';
      case 'extraFirst': return 'Prórroga 1ª Parte';
      case 'extraSecond': return 'Prórroga 2ª Parte';
      case 'finished': return 'Fin del Partido';
      default: return '';
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-lg font-semibold text-gray-600">
        {getPeriodLabel(period)}
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onReset}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          disabled={period === 'finished'}
        >
          <RotateCcw size={24} />
        </button>
        <button
          onClick={onToggle}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          disabled={period === 'finished'}
        >
          {isActive ? <Pause size={24} /> : <TimerIcon size={24} />}
        </button>
        <span className="text-4xl font-mono font-bold">{timer.formatted}</span>
      </div>
    </div>
  );
}