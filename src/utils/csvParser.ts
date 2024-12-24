export function parseCSV(content: string): { number: number; name: string }[] {
  return content
    .split('\n')
    .filter(line => line.trim())
    .map(line => {
      const [number, name] = line.split(',').map(field => field.trim());
      return {
        number: parseInt(number, 10),
        name
      };
    })
    .filter(player => !isNaN(player.number) && player.name);
}