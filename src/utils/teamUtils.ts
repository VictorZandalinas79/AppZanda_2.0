import { Player } from '../types/match';

export async function loadUdAtzenetaPlayers(): Promise<Player[]> {
  const response = await fetch('/src/data/ud-atzeneta.csv');
  const content = await response.text();
  
  return content
    .split('\n')
    .slice(1) // Skip header row
    .filter(line => line.trim())
    .map(line => {
      const [number, name] = line.split(',');
      return {
        number: parseInt(number, 10),
        name: name.trim()
      };
    });
}