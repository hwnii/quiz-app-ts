import { useEffect, useState } from 'react';

interface QuestionTimerProps {
  readonly timeout: number;
  readonly mode: string;
  readonly onTimeout: (() => void) | null;
}

export default function QuestionTimer({ timeout, mode, onTimeout }: QuestionTimerProps) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log('SETTING TIMEOUT');
    if (onTimeout !== null) {
      const timer = setTimeout(onTimeout, timeout);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [timeout, onTimeout]);

  useEffect(() => {
    console.log('SETTING INTERVAL');
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress id="question-time" max={timeout} value={remainingTime} className={mode} />;
}
