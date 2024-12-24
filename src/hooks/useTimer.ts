import { useState, useEffect } from 'react';

export function useTimer(isActive: boolean, startTime: number) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTime(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, startTime]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return {
    minutes,
    seconds,
    formatted: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
  };
}