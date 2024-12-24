import React from 'react';
import { Calendar } from 'lucide-react';

interface MatchSetupProps {
  onSubmit: (data: {
    homeTeam: string;
    awayTeam: string;
    round: string;
    date: string;
  }) => void;
}

export function MatchSetup({ onSubmit }: MatchSetupProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      homeTeam: formData.get('homeTeam') as string,
      awayTeam: formData.get('awayTeam') as string,
      round: formData.get('round') as string,
      date: formData.get('date') as string,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Calendar className="w-6 h-6 text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-800">Match Setup</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="homeTeam" className="block text-sm font-medium text-gray-700">
              Home Team
            </label>
            <input
              type="text"
              id="homeTeam"
              name="homeTeam"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="awayTeam" className="block text-sm font-medium text-gray-700">
              Away Team
            </label>
            <input
              type="text"
              id="awayTeam"
              name="awayTeam"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="round" className="block text-sm font-medium text-gray-700">
              Round Number
            </label>
            <input
              type="text"
              id="round"
              name="round"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Match Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Start Match
          </button>
        </form>
      </div>
    </div>
  );
}