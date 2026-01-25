import React from 'react';
import { Terminal } from 'lucide-react';

interface LoadingScreenProps {
  roomCode: string;
  loadingText: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ roomCode, loadingText }) => {
  return (
    <div className="min-h-screen terminal-bg flex items-center justify-center flex-col gap-6">
      <Terminal className="w-16 h-16 text-blue-500 animate-pulse" />
      <div className="terminal-text text-xl font-bold typing-cursor">
        {loadingText}
      </div>
      <div className="text-blue-400 font-mono text-sm glitch-text">
        ROOM ID: {roomCode || '#####'}
      </div>
    </div>
  );
};

export default LoadingScreen;