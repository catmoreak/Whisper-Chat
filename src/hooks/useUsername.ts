import { useState, useEffect } from 'react';
import { generateUsername } from '../lib/utils';

export function useUsername() {
  const [username, setUsername] = useState<string>(generateUsername());

  useEffect(() => {
    const interval = setInterval(() => {
      setUsername(generateUsername());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return username;
}