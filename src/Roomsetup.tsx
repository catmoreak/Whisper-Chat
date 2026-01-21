import React from 'react';
import { Shield, ShieldCheck } from 'lucide-react';

interface RoomSetupProps {
  inputRoom: string;
  setInputRoom: (value: string) => void;
  createRoom: () => void;
  joinRoom: () => void;
}

const RoomSetup: React.FC<RoomSetupProps> = ({
  inputRoom,
      setInputRoom,
               createRoom,
  joinRoom,
}) => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-purple-900/20 backdrop-blur-lg p-8 rounded-xl shadow-2xl max-w-md w-full border border-purple-500/20">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="relative">
            <Shield className="w-12 h-12 text-purple-500 absolute animate-pulse" style={{ opacity: 0.5 }} />
            <ShieldCheck className="w-12 h-12 text-purple-400 relative z-10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Whisper<span className="text-purple-400">Chat</span>
            </h1>
            <p className="text-purple-300/60 text-sm">Untraceable. Unfiltered. Unstoppable.</p>
          </div>
        </div>

        <div className="space-y-6">
          <button
            onClick={createRoom}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            Create New Room
          </button>

          <div className="space-y-3">
            <input
              type="text"
              value={inputRoom}
              onChange={(e) => setInputRoom(e.target.value)}
              placeholder="Enter 5-digit room code"
              className="w-full bg-purple-900/30 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-purple-300/40"
              maxLength={5}
            />
            <button
              onClick={joinRoom}
              className="w-full bg-purple-900/40 hover:bg-purple-800/40 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium hover:shadow-lg hover:shadow-purple-500/10"
            >
              Join Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSetup;