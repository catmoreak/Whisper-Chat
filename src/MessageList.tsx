import React from 'react';
interface Message {
  text: string;
  timestamp: number;
  id: string;
  username: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 message-container">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl max-w-xl shadow-xl border border-blue-400/50 message-bubble hover:shadow-2xl transition-shadow duration-200">         <div className="text-blue-100 text-sm font-semibold mb-1">{msg.username}</div>
          <div className="text-white break-words leading-relaxed">{msg.text}</div>
          <div className="text-xs text-blue-200 mt-2 text-right">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </div>
        </div>     
      ))}
    </div>
  );
};

export default MessageList;