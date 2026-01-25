import React from 'react';
import { Share2, Users, ShieldCheck } from 'lucide-react';

interface ChatHeaderProps {
  roomCode: string;
  onlineUsers: number;
  username: string;
  shareRoom: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  roomCode,
  onlineUsers,
  username,
  shareRoom,
}) => {
  return (
    <div className="bg-blue-900/20 backdrop-blur-lg px-6 py-4 flex justify-between items-center shadow-lg border-b border-blue-500/20">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-blue-400" />
          <h1 className="text-lg font-semibold text-white">Room: {roomCode}</h1>
        </div>
        <div className="flex items-center gap-2 text-blue-300">
          <Users size={16} />
          <span>{onlineUsers} online</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-blue-300 text-sm">
          You are: {username}
        </div>
        <button
          onClick={shareRoom}
          className="bg-blue-900/40 hover:bg-blue-800/40 text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10"
        >
          <Share2 size={18} />
          Share Room
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;